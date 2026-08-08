// ─── i18n translation helper ──────────────────────────────────────────────────
// Usage (Astro .astro files):
//   import { useTranslations, SUPPORTED_LANGS } from '../i18n/ui.js'
//   const t = useTranslations(lang)
//   t('nav.allTools')  →  "All Tools" (or translated equivalent)

import en from './locales/en.json' with { type: 'json' }
import es from './locales/es.json' with { type: 'json' }
import fr from './locales/fr.json' with { type: 'json' }
import de from './locales/de.json' with { type: 'json' }
import pt from './locales/pt.json' with { type: 'json' }
import hi from './locales/hi.json' with { type: 'json' }
import ja from './locales/ja.json' with { type: 'json' }
import ar from './locales/ar.json' with { type: 'json' }
import zh from './locales/zh.json' with { type: 'json' }
import it from './locales/it.json' with { type: 'json' }

/** All locales shipped with the site. English is the default and has no URL prefix. */
export const SUPPORTED_LANGS = ['es', 'fr', 'de', 'pt', 'hi', 'ja', 'ar', 'zh', 'it']
export const ALL_LANGS       = ['en', ...SUPPORTED_LANGS]

/** Language display names (native script) */
export const LANG_NAMES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  hi: 'हिन्दी',
  ja: '日本語',
  ar: 'العربية',
  zh: '中文',
  it: 'Italiano',
}

/** Language flag emojis */
export const LANG_FLAGS = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  pt: '🇧🇷',
  hi: '🇮🇳',
  ja: '🇯🇵',
  ar: '🇸🇦',
  zh: '🇨🇳',
  it: '🇮🇹',
}

/** RTL languages */
export const RTL_LANGS = new Set(['ar'])

const dictionaries = { en, es, fr, de, pt, hi, ja, ar, zh, it }

/**
 * Returns a t() function bound to the given locale.
 * Falls back to English if a key is missing in the locale.
 */
export function useTranslations(lang = 'en') {
  const dict = dictionaries[lang] ?? dictionaries.en
  return function t(key) {
    return dict[key] ?? dictionaries.en[key] ?? key
  }
}

/**
 * Given the current path and locale, return the URL for a different locale.
 * /fr/ruler + 'de' → /de/ruler
 * /ruler    + 'fr' → /fr/ruler
 * /fr/ruler + 'en' → /ruler
 */
export function switchLocaleUrl(currentPath, targetLang) {
  // Strip existing locale prefix
  const strippedPath = currentPath.replace(/^\/(es|fr|de|pt|hi|ja|ar|zh|it)(\/|$)/, '/')
  const cleanPath    = strippedPath === '' ? '/' : strippedPath

  if (targetLang === 'en') return cleanPath
  return `/${targetLang}${cleanPath === '/' ? '' : cleanPath}`
}

/** Extract current language from URL path or URL object */
export function getLangFromUrl(url) {
  const pathname = typeof url === 'string' ? url : url.pathname
  const firstSeg = pathname.split('/')[1]
  if (ALL_LANGS.includes(firstSeg)) {
    return firstSeg
  }
  return 'en'
}

/** Given a path and lang, return localized path */
export function getLocalePath(path, lang = 'en') {
  const stripped = path.replace(/^\/(es|fr|de|pt|hi|ja|ar|zh|it)(\/|$)/, '/')
  const clean = stripped === '' ? '/' : stripped

  if (lang === 'en' || !SUPPORTED_LANGS.includes(lang)) {
    return clean
  }
  return `/${lang}${clean === '/' ? '' : clean}`
}
