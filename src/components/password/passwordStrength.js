// A compact, dependency-free password strength estimator. Runs entirely in
// the browser — the password is never sent anywhere, which is worth saying
// out loud in the UI since it's a real trust/conversion signal for this
// kind of tool.

const COMMON_PASSWORDS = new Set([
  '123456', '123456789', 'password', '12345678', 'qwerty', '123456789',
  '12345', '1234', '111111', '1234567', 'dragon', '123123', 'baseball',
  'abc123', 'football', 'monkey', 'letmein', 'shadow', 'master', '666666',
  'qwertyuiop', '123321', 'mustang', '1234567890', 'michael', '654321',
  'superman', '1qaz2wsx', '7777777', 'fuckyou', '121212', '000000',
  'qazwsx', '123qwe', 'killer', 'trustno1', 'jordan', 'jennifer', 'zxcvbnm',
  'asdfgh', 'hunter', 'buster', 'soccer', 'harley', 'batman', 'andrew',
  'tigger', 'sunshine', 'iloveyou', 'princess', 'admin', 'welcome', 'login',
  'passw0rd', 'password1', 'starwars',
])

const KEYBOARD_RUNS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm', '1234567890']

function hasSequentialRun(lower, minRun = 4) {
  for (const run of KEYBOARD_RUNS) {
    for (let i = 0; i <= run.length - minRun; i++) {
      if (lower.includes(run.slice(i, i + minRun))) return true
    }
  }
  // ascending/descending numeric or alphabetic sequences, e.g. "abcd", "4321"
  for (let i = 0; i <= lower.length - minRun; i++) {
    const slice = lower.slice(i, i + minRun)
    let ascending = true
    let descending = true
    for (let j = 1; j < slice.length; j++) {
      if (slice.charCodeAt(j) !== slice.charCodeAt(j - 1) + 1) ascending = false
      if (slice.charCodeAt(j) !== slice.charCodeAt(j - 1) - 1) descending = false
    }
    if (ascending || descending) return true
  }
  return false
}

function hasRepeatedRun(str, minRun = 4) {
  let run = 1
  for (let i = 1; i < str.length; i++) {
    run = str[i] === str[i - 1] ? run + 1 : 1
    if (run >= minRun) return true
  }
  return false
}

export function analyzePassword(password) {
  const length = password.length
  const lower = password.toLowerCase()

  const checks = {
    length8: length >= 8,
    length12: length >= 12,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasDigit: /[0-9]/.test(password),
    hasSymbol: /[^a-zA-Z0-9]/.test(password),
    notCommon: !COMMON_PASSWORDS.has(lower),
    noSequence: !hasSequentialRun(lower),
    noRepeats: !hasRepeatedRun(lower),
  }

  let charsetSize = 0
  if (checks.hasLower) charsetSize += 26
  if (checks.hasUpper) charsetSize += 26
  if (checks.hasDigit) charsetSize += 10
  if (checks.hasSymbol) charsetSize += 32

  const entropyBits = length > 0 ? length * Math.log2(Math.max(charsetSize, 1)) : 0

  // Crack-time estimates at three attacker speeds, in seconds.
  const guesses = Math.pow(2, entropyBits)
  const scenarios = [
    { label: 'Online (throttled, 100 guesses/hr)', perSecond: 100 / 3600 },
    { label: 'Offline, slow hash (10k/sec)', perSecond: 10_000 },
    { label: 'Offline, fast hash / GPU (10B/sec)', perSecond: 10_000_000_000 },
  ].map((s) => ({ ...s, seconds: guesses / s.perSecond / 2 }))

  let score = 0
  if (checks.notCommon && !hasSequentialRun(lower, 5) && !hasRepeatedRun(lower, 3)) {
    if (entropyBits >= 90) score = 4
    else if (entropyBits >= 65) score = 3
    else if (entropyBits >= 45) score = 2
    else if (entropyBits >= 28) score = 1
  }
  if (!checks.notCommon) score = 0
  if (length === 0) score = 0

  const labels = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong']

  return {
    length,
    checks,
    entropyBits,
    scenarios,
    score,
    label: labels[score],
  }
}

export function formatDuration(seconds) {
  if (!isFinite(seconds) || seconds < 0) return 'instantly'
  const units = [
    { name: 'century', secs: 3153600000 },
    { name: 'year', secs: 31536000 },
    { name: 'month', secs: 2592000 },
    { name: 'day', secs: 86400 },
    { name: 'hour', secs: 3600 },
    { name: 'minute', secs: 60 },
    { name: 'second', secs: 1 },
  ]
  if (seconds < 1) return 'instantly'
  for (const u of units) {
    const value = seconds / u.secs
    if (value >= 1) {
      const rounded = Math.round(value)
      if (u.name === 'century' && rounded > 1000) return 'trillions of years'
      return `${rounded.toLocaleString()} ${u.name}${rounded === 1 ? '' : 's'}`
    }
  }
  return 'instantly'
}

const SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?',
}
const AMBIGUOUS = 'il1Lo0OI'

export function generatePassword({ length = 16, lower = true, upper = true, digits = true, symbols = true, avoidAmbiguous = true }) {
  let pool = ''
  if (lower) pool += SETS.lower
  if (upper) pool += SETS.upper
  if (digits) pool += SETS.digits
  if (symbols) pool += SETS.symbols
  if (!pool) pool = SETS.lower + SETS.digits

  if (avoidAmbiguous) {
    pool = [...pool].filter((c) => !AMBIGUOUS.includes(c)).join('')
  }

  const bytes = new Uint32Array(length)
  crypto.getRandomValues(bytes)
  let result = ''
  for (let i = 0; i < length; i++) {
    result += pool[bytes[i] % pool.length]
  }
  return result
}
