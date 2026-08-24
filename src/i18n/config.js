// ─────────────────────────────────────────────────────────────────────────
// I18N CONFIG — the single source of truth for every locale the site ships.
//
// Adding a locale here is enough to generate its routes, hreflang tags,
// language switcher entry, sitemap entries and Intl formatting defaults.
// You must also add a matching file in ./content/{code}.js — the build
// throws if it's missing, so a half-added locale can never ship.
// ─────────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Locale
 * @property {string} code        BCP-47 tag used for <html lang> and Intl.
 * @property {string} path        URL segment. Always lowercase, no trailing slash.
 * @property {string} label       Name in English, for aria labels and docs.
 * @property {string} nativeLabel Name in the language itself, shown in the switcher.
 * @property {'ltr'|'rtl'} dir    Writing direction, drives <html dir>.
 * @property {string} ogLocale    Facebook/OpenGraph locale format (underscore).
 * @property {string} currency    ISO 4217 code used by formatCurrency().
 * @property {'metric'|'imperial'} units Default measurement system for tools.
 * @property {string} hreflang    Value emitted in <link rel="alternate">.
 * @property {string} flag        Emoji shown next to the switcher entry.
 */

/** @type {Locale[]} */
export const LOCALES = [
  {
    code: 'en',
    path: '',
    label: 'English',
    nativeLabel: 'English',
    dir: 'ltr',
    ogLocale: 'en_US',
    currency: 'USD',
    units: 'imperial',
    hreflang: 'en',
    flag: '🇺🇸',
  },
  {
    code: 'es',
    path: 'es',
    label: 'Spanish',
    nativeLabel: 'Español',
    dir: 'ltr',
    ogLocale: 'es_ES',
    currency: 'EUR',
    units: 'metric',
    hreflang: 'es',
    flag: '🇪🇸',
  },
  {
    code: 'fr',
    path: 'fr',
    label: 'French',
    nativeLabel: 'Français',
    dir: 'ltr',
    ogLocale: 'fr_FR',
    currency: 'EUR',
    units: 'metric',
    hreflang: 'fr',
    flag: '🇫🇷',
  },
  {
    code: 'de',
    path: 'de',
    label: 'German',
    nativeLabel: 'Deutsch',
    dir: 'ltr',
    ogLocale: 'de_DE',
    currency: 'EUR',
    units: 'metric',
    hreflang: 'de',
    flag: '🇩🇪',
  },
  {
    code: 'pt-BR',
    path: 'pt-br',
    label: 'Portuguese (Brazil)',
    nativeLabel: 'Português (Brasil)',
    dir: 'ltr',
    ogLocale: 'pt_BR',
    currency: 'BRL',
    units: 'metric',
    hreflang: 'pt-BR',
    flag: '🇧🇷',
  },
  {
    code: 'hi',
    path: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    dir: 'ltr',
    ogLocale: 'hi_IN',
    currency: 'INR',
    units: 'metric',
    hreflang: 'hi',
    flag: '🇮🇳',
  },
  {
    code: 'id',
    path: 'id',
    label: 'Indonesian',
    nativeLabel: 'Bahasa Indonesia',
    dir: 'ltr',
    ogLocale: 'id_ID',
    currency: 'IDR',
    units: 'metric',
    hreflang: 'id',
    flag: '🇮🇩',
  },
  {
    code: 'ja',
    path: 'ja',
    label: 'Japanese',
    nativeLabel: '日本語',
    dir: 'ltr',
    ogLocale: 'ja_JP',
    currency: 'JPY',
    units: 'metric',
    hreflang: 'ja',
    flag: '🇯🇵',
  },
]

export const DEFAULT_LOCALE = 'en'

/** Locales that get a URL prefix — everything except the default. */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE)

export const LOCALE_CODES = LOCALES.map((l) => l.code)
export const LOCALE_PATHS = PREFIXED_LOCALES.map((l) => l.path)

const BY_CODE = new Map(LOCALES.map((l) => [l.code, l]))
const BY_PATH = new Map(LOCALES.map((l) => [l.path, l]))

/** Look up a locale by BCP-47 code. Falls back to the default locale. */
export function getLocale(code) {
  return BY_CODE.get(code) || BY_CODE.get(DEFAULT_LOCALE)
}

/** Look up a locale by its URL segment ('' for English). */
export function getLocaleByPath(path) {
  return BY_PATH.get(path || '') || BY_CODE.get(DEFAULT_LOCALE)
}

export function isLocalePath(segment) {
  return BY_PATH.has(segment) && segment !== ''
}

/**
 * Resolve a raw Accept-Language / navigator.language value to a shipped
 * locale. Matches the exact tag first, then the bare language subtag, so
 * 'pt-PT' lands on 'pt-BR' rather than falling through to English.
 */
export function matchLocale(raw) {
  if (!raw) return DEFAULT_LOCALE
  const tag = String(raw).trim()
  const exact = LOCALES.find((l) => l.code.toLowerCase() === tag.toLowerCase())
  if (exact) return exact.code
  const base = tag.split('-')[0].toLowerCase()
  const partial = LOCALES.find((l) => l.code.split('-')[0].toLowerCase() === base)
  return partial ? partial.code : DEFAULT_LOCALE
}
