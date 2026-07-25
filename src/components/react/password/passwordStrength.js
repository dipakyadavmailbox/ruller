const COMMON_PASSWORDS = new Set([
  '123456', '123456789', 'password', '12345678', 'qwerty', '123456789',
  '12345', '1234', '111111', '1234567', 'dragon', '123123', 'baseball',
  'abc123', 'football', 'monkey', 'letmein', 'shadow', 'master', '666666',
  'qwertyuiop', '123321', 'mustang', '1234567890', 'michael', '654321',
  'superman', '1qaz2wsx', '7777777', 'fuckyou', '121212', '000000',
  'qazwsx', '123qwe', 'killer', 'trustno1', 'jordan', 'jennifer', 'zxcvbnm',
  'asdfgh', 'hunter', 'buster', 'soccer', 'harley', 'batman', 'andrew',
  'tigger', 'sunshine', 'iloveyou', 'princess', 'admin', 'welcome', 'login',
  'passw0rd', 'password1', 'starwars', 'hello', 'charlie', 'donald', 'password123',
  'qwerty123', 'iloveyou1', 'admin123', 'monkey123', 'letmein1', '1q2w3e4r',
  'superman1', 'pokemon', 'test', 'test123', 'guest', 'guest123', 'default',
])

const KEYBOARD_RUNS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm', '1234567890']

export const WORD_LIST = [
  'solar', 'amber', 'beacon', 'breeze', 'canvas', 'canyon', 'castle', 'cedar',
  'charm', 'clover', 'cobalt', 'comet', 'coral', 'crystal', 'delta', 'dragon',
  'echo', 'ember', 'falcon', 'forest', 'fossil', 'galaxy', 'glacier', 'granite',
  'harbor', 'island', 'jungle', 'lagoon', 'lantern', 'legend', 'meadow', 'meteor',
  'mirage', 'monarch', 'mountain', 'nebula', 'oasis', 'orchid', 'phoenix', 'planet',
  'prism', 'quantum', 'radiant', 'river', 'shadow', 'sierra', 'silver', 'summit',
  'timber', 'topaz', 'velvet', 'vortex', 'whisper', 'willow', 'winter', 'zenith',
  'anchor', 'archer', 'aurora', 'axiom', 'blossom', 'border', 'bucket', 'bundle',
  'candle', 'capsule', 'carbon', 'cinder', 'cipher', 'citrus', 'clever', 'clockwork',
  'cosmos', 'crimson', 'dagger', 'dancer', 'dawnlight', 'depth', 'desert', 'diamond',
  'diesel', 'drifter', 'eclipse', 'elixir', 'empire', 'engine', 'enigma', 'epoch',
  'feline', 'fender', 'fission', 'flame', 'flicker', 'flint', 'flower', 'flute',
  'fusion', 'garnet', 'gem', 'ghost', 'glacier', 'glimmer', 'golden', 'gravel',
  'gust', 'hammer', 'haven', 'herald', 'hollow', 'horizon', 'hunter', 'hydra',
  'ignite', 'impact', 'inferno', 'inertia', 'knight', 'lantern', 'laser', 'launch',
  'lemon', 'lightning', 'linen', 'locket', 'lotus', 'lunar', 'marble', 'mango',
  'mantle', 'maple', 'marble', 'marsh', 'matrix', 'mirror', 'mist', 'motion',
  'nautical', 'nexus', 'night', 'nimble', 'noble', 'north', 'nova', 'nymph',
  'ocean', 'olive', 'onyx', 'oracle', 'orbit', 'osprey', 'oxford', 'oxygen',
  'pacific', 'palette', 'paragon', 'pebble', 'pepper', 'phantom', 'pilot', 'pine',
  'pivot', 'plasma', 'plateau', 'plover', 'plume', 'polaris', 'powder', 'prowl',
  'pulsar', 'puzzle', 'quartz', 'quasar', 'raven', 'razor', 'reef', 'reflect',
  'refuge', 'relic', 'remedy', 'renew', 'resin', 'ripple', 'rocket', 'rogue',
  'rose', 'ruby', 'rush', 'rustle', 'sage', 'sail', 'sapphire', 'satin',
  'scout', 'scroll', 'seeker', 'serene', 'signal', 'silk', 'sketch', 'slate',
  'smoke', 'snapper', 'solace', 'song', 'spark', 'spectrum', 'sphinx', 'spiral',
  'spring', 'stable', 'static', 'steel', 'stellar', 'steppe', 'stone', 'storm',
  'strand', 'stream', 'strike', 'surge', 'swift', 'symbol', 'syntax', 'table',
  'talon', 'tempest', 'terra', 'thistle', 'thorn', 'thunder', 'tidal', 'tide',
  'tiger', 'token', 'torch', 'tower', 'trace', 'trail', 'trance', 'treble',
  'trident', 'tundra', 'tunnel', 'turbine', 'twilight', 'type', 'ultima', 'ultra',
  'umbra', 'unity', 'universe', 'uplift', 'vault', 'vector', 'venture', 'verge',
  'vertex', 'vessel', 'vibrant', 'violet', 'vision', 'vista', 'vital', 'vivid',
  'void', 'volcano', 'voltage', 'vulcan', 'wave', 'wedge', 'weight', 'westward',
  'whale', 'whirl', 'wind', 'wing', 'wire', 'wonder', 'wood', 'world',
  'worth', 'wren', 'xenon', 'xeric', 'yacht', 'yarn', 'yield', 'zero',
  'zeal', 'zephyr', 'zinc', 'zone', 'zoom', 'lark', 'finch', 'swift',
]

function hasSequentialRun(lower, minRun = 4) {
  for (const run of KEYBOARD_RUNS) {
    for (let i = 0; i <= run.length - minRun; i++) {
      if (lower.includes(run.slice(i, i + minRun))) return true
    }
  }
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

  const guesses = Math.pow(2, entropyBits)
  const scenarios = [
    { label: 'Online attack (throttled, 100 guesses/hr)', perSecond: 100 / 3600, severity: 'high' },
    { label: 'Online attack (unthrottled, 10k/sec)', perSecond: 10_000, severity: 'medium' },
    { label: 'Offline, slow hash — bcrypt (10k/sec)', perSecond: 10_000, severity: 'medium' },
    { label: 'Offline, fast hash — MD5/SHA1 (10B/sec)', perSecond: 10_000_000_000, severity: 'low' },
    { label: 'Offline, GPU cluster (100T/sec)', perSecond: 100_000_000_000_000, severity: 'critical' },
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
  const isBreached = COMMON_PASSWORDS.has(lower)

  return {
    length,
    checks,
    entropyBits,
    scenarios,
    score,
    label: labels[score],
    isBreached,
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

// Color-coded crack time severity
export function crackTimeSeverity(seconds) {
  if (seconds < 60) return { color: '#e04b3f', label: 'Instant' }
  if (seconds < 86400) return { color: '#e08b3f', label: 'Hours' }
  if (seconds < 31536000) return { color: '#e0c93f', label: 'Days–Months' }
  if (seconds < 31536000 * 100) return { color: '#6fbf5c', label: 'Years' }
  return { color: '#3fae6f', label: 'Centuries+' }
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
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 4294967295)
  }
  let result = ''
  for (let i = 0; i < length; i++) {
    result += pool[bytes[i] % pool.length]
  }
  return result
}

export function generatePIN(length = 4) {
  const digits = '0123456789'
  const bytes = new Uint32Array(length)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 4294967295)
  }
  return Array.from(bytes).map(b => digits[b % 10]).join('')
}

export function generatePassphrase(wordCount = 4, separator = '-', capitalize = false) {
  const words = []
  for (let i = 0; i < wordCount; i++) {
    const idx = Math.floor(Math.random() * WORD_LIST.length)
    let word = WORD_LIST[idx]
    if (capitalize) word = word.charAt(0).toUpperCase() + word.slice(1)
    words.push(word)
  }
  return words.join(separator)
}
