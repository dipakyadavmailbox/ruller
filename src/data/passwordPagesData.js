// ─── Password Checker & Generator Sub-Pages Data for Programmatic SEO ─────────

export const PASSWORD_PAGES_DATA = [
  {
    slug: 'password-generator',
    genType: 'random',
    genLength: 16,
    name: 'Random Password Generator',
    title: 'Random Password Generator — Secure, Customizable & Free | Rocking Tools',
    description: 'Generate strong, uncrackable random passwords with uppercase, lowercase, numbers, and symbols. 100% in-browser cryptographic security.',
    keywords: 'random password generator, password generator online, secure password maker, generate password, random strong password',
    intro: 'Create high-entropy cryptographically secure random passwords using your browser\'s Web Crypto API. Zero server storage, completely safe.',
    useCases: [
      { title: 'New Account Creation', desc: 'Generate unique, complex passwords for banking, social media, and email accounts.' },
      { title: 'Wi-Fi Network Passwords', desc: 'Create 20+ character random alphanumeric keys for secure home or office routers.' },
      { title: 'Database & Server Credentials', desc: 'Produce high-entropy master secrets for API keys, SSH configs, and database users.' },
    ],
    faqs: [
      { q: 'How does this password generator create random characters?', a: 'It utilizes the standard window.crypto.getRandomValues API, providing cryptographically strong pseudo-random numbers.' },
      { q: 'Can anyone on your team see generated passwords?', a: 'Never. Generation occurs 100% in your local browser memory and is never logged or transmitted over any network.' },
    ],
  },
  {
    slug: 'strong-password-generator',
    genType: 'random',
    genLength: 24,
    name: 'Strong Password Generator (24+ Characters)',
    title: 'Strong Password Generator — 24+ Character Max Security | Rocking Tools',
    description: 'Generate military-grade 24+ character passwords designed to withstand brute-force attacks and quantum dictionary cracking.',
    keywords: 'strong password generator, 20 character password generator, 24 char password, unhackable password generator, high entropy password',
    intro: 'Generate maximum-strength 24-character passwords with combined uppercase, lowercase, digits, and special symbols to prevent brute force cracking.',
    useCases: [
      { title: 'Master Passwords for Password Managers', desc: 'Secure your 1Password, Bitwarden, or KeePass vault with an ultra-strong master key.' },
      { title: 'Root Server & Cloud Admin Access', desc: 'Protect AWS, Google Cloud, and root Linux servers against automated dictionary attacks.' },
    ],
    faqs: [
      { q: 'How long would a 24-character random password take to crack?', a: 'A 24-character password with mixed cases, numbers, and symbols would take trillions of centuries for modern supercomputers to brute-force.' },
    ],
  },
  {
    slug: 'pin-generator',
    genType: 'pin',
    genLength: 6,
    name: 'Random PIN Generator (4 & 6 Digits)',
    title: 'Random PIN Generator — 4-Digit & 6-Digit Numeric PINs | Rocking Tools',
    description: 'Generate secure random numeric PIN codes for ATM cards, door locks, voicemail, SIM cards, and phone passcodes.',
    keywords: 'pin generator, random pin generator, 4 digit pin generator, 6 digit pin generator, atm pin generator, random numbers pin',
    intro: 'Generate cryptographically random 4-digit and 6-digit numeric PIN codes for debit cards, mobile locks, and security keypads.',
    useCases: [
      { title: 'ATM & Debit Card PINs', desc: 'Select an unpredictable 4-digit numeric code without common patterns like birth years or 1234.' },
      { title: 'Smartphone & App Passcodes', desc: 'Generate high-security 6-digit numeric locks for iOS and Android devices.' },
      { title: 'Smart Door & Keypad Locks', desc: 'Produce temporary guest passcodes for Airbnb properties and office security pads.' },
    ],
    faqs: [
      { q: 'Why avoid birth years and repeating numbers in PINs?', a: 'Attackers always test dates, 1111, 1234, and 0000 first. A true random PIN eliminates predictability.' },
    ],
  },
  {
    slug: 'passphrase-generator',
    genType: 'passphrase',
    genLength: 4,
    name: 'Memorable Passphrase Generator',
    title: 'Passphrase Generator — Memorable Diceware-Style Passwords | Rocking Tools',
    description: 'Generate easy-to-remember, highly secure multi-word passphrases (e.g. correct-horse-battery-staple). 100% private in-browser.',
    keywords: 'passphrase generator, memorable password generator, diceware generator, multi word password, secure passphrase maker',
    intro: 'Generate secure multi-word passphrases that are easy for humans to type and remember, but mathematically impossible for computers to guess.',
    useCases: [
      { title: 'Everyday Work Logins', desc: 'Use 4 to 6 dictionary words separated by dashes for accounts you have to type manually every day.' },
      { title: 'Disk Encryption Keys', desc: 'Protect FileVault and BitLocker hard drive encryption with memorable phrases.' },
    ],
    faqs: [
      { q: 'Are passphrases as secure as random character strings?', a: 'Yes! A 4-word passphrase has ~50-60 bits of entropy, and a 6-word passphrase exceeds 80 bits of entropy — vastly exceeding brute-force limits.' },
    ],
  },
  {
    slug: 'password-strength-test',
    genType: 'random',
    genLength: 16,
    name: 'Password Strength Test & Crack Time Estimator',
    title: 'Password Strength Test — Calculate Brute-Force Crack Time | Rocking Tools',
    description: 'Test how secure your password is and see estimated time to crack against GPU clusters and offline dictionary attacks. 100% private.',
    keywords: 'password strength test, check password strength, how strong is my password, test password security, password crack time calculator',
    intro: 'Audit your existing passwords for entropy, length, character diversity, and vulnerability to common wordlist leaks — without anything leaving your browser.',
    useCases: [
      { title: 'Security Audits', desc: 'Audit personal and company passwords against modern security benchmarks (NIST 800-63B guidelines).' },
    ],
    faqs: [
      { q: 'Is it safe to test my real password here?', a: 'Yes. Our strength algorithm runs entirely on your local device via JavaScript. No data is stored, cached, or transmitted.' },
    ],
  },
]

export function getPasswordPageBySlug(slug) {
  return PASSWORD_PAGES_DATA.find((p) => p.slug === slug)
}
