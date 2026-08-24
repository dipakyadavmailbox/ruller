// ─────────────────────────────────────────────────────────────────────────
// URL helpers for the locale-prefixed route tree.
//
// English lives at the bare path (/ruler) and every other locale sits under
// its segment (/es/ruler). Only the "core" pages listed in ./pages.js are
// translated; the long-tail programmatic pages stay English-only and point
// their hreflang at themselves.
// ─────────────────────────────────────────────────────────────────────────

import { DEFAULT_LOCALE, LOCALES, getLocale, getLocaleByPath, isLocalePath } from './config.js'

/** Strip trailing slash and .html so every path compares as '/foo' or '/'. */
export function normalizePath(pathname) {
  const clean = String(pathname || '/')
    .replace(/\.html$/, '')
    .replace(/\/+$/, '')
  return clean || '/'
}

/**
 * Split a request path into its locale and the locale-free remainder.
 * '/es/ruler'  -> { locale: 'es', path: '/ruler' }
 * '/kg-to-lbs' -> { locale: 'en', path: '/kg-to-lbs' }
 */
export function parsePath(pathname) {
  const normalized = normalizePath(pathname)
  const [, first, ...rest] = normalized.split('/')
  if (isLocalePath(first)) {
    return {
      locale: getLocaleByPath(first).code,
      path: '/' + rest.join('/'),
    }
  }
  return { locale: DEFAULT_LOCALE, path: normalized }
}

/**
 * Build the URL for `path` in `localeCode`. `path` must be the locale-free
 * canonical path ('/ruler'), which is what parsePath() hands back.
 */
export function localizePath(path, localeCode) {
  const locale = getLocale(localeCode)
  const clean = normalizePath(path)
  if (!locale.path) return clean
  return clean === '/' ? '/' + locale.path : '/' + locale.path + clean
}

/**
 * hreflang alternates for a page.
 *
 * `translatedLocales` limits the set to locales that actually have content —
 * pointing hreflang at a page that does not exist is worse than omitting it.
 * Always includes x-default, which Google uses for unmatched languages.
 */
export function buildAlternates(path, origin, translatedLocales = null) {
  const allowed = translatedLocales
    ? LOCALES.filter((l) => translatedLocales.includes(l.code))
    : LOCALES
  const alternates = allowed.map((locale) => ({
    hreflang: locale.hreflang,
    href: origin + localizePath(path, locale.code),
  }))
  alternates.push({
    hreflang: 'x-default',
    href: origin + localizePath(path, DEFAULT_LOCALE),
  })
  return alternates
}
