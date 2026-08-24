// ─────────────────────────────────────────────────────────────────────────
// Locale-aware formatting. Thin wrappers over Intl so that number, currency,
// date and unit output follows the reader locale instead of en-US.
//
// Runs identically at build time (Astro/Node) and in the browser (React
// islands), so a server-rendered value and its hydrated counterpart match.
// Every Intl constructor is cached — building one per render is the single
// most expensive thing you can do with Intl.
// ─────────────────────────────────────────────────────────────────────────

import { DEFAULT_LOCALE, getLocale } from './config.js'

const cache = new Map()

function memo(key, build) {
  let hit = cache.get(key)
  if (!hit) {
    hit = build()
    cache.set(key, hit)
  }
  return hit
}

/**
 * Intl throws a RangeError on a tag it cannot parse, and some runtimes ship
 * without data for a locale. Either way English is a safer answer than a
 * blank page, so every formatter funnels through this.
 */
function safe(build, fallbackBuild) {
  try {
    return build()
  } catch {
    return fallbackBuild()
  }
}

export function numberFormatter(localeCode, options = {}) {
  const key = 'n:' + localeCode + ':' + JSON.stringify(options)
  return memo(key, () =>
    safe(
      () => new Intl.NumberFormat(localeCode, options),
      () => new Intl.NumberFormat(DEFAULT_LOCALE, options)
    )
  )
}

export function formatNumber(value, localeCode = DEFAULT_LOCALE, options) {
  if (value == null || Number.isNaN(Number(value))) return ''
  return numberFormatter(localeCode, options).format(Number(value))
}

/**
 * Format money in the currency of the locale. Zero-decimal currencies (JPY,
 * IDR) are handled by Intl itself, so do not hardcode fraction digits.
 */
export function formatCurrency(amount, localeCode = DEFAULT_LOCALE, currencyCode, options = {}) {
  const locale = getLocale(localeCode)
  const currency = currencyCode || locale.currency
  return formatNumber(amount, localeCode, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    ...options,
  })
}

/**
 * Currency symbol on its own, for progress bars and table cells where the
 * full formatted amount would be too wide.
 */
export function currencySymbol(localeCode = DEFAULT_LOCALE, currencyCode) {
  const locale = getLocale(localeCode)
  const currency = currencyCode || locale.currency
  const parts = numberFormatter(localeCode, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).formatToParts(0)
  const match = parts.find((p) => p.type === 'currency')
  return match ? match.value : currency
}

export function formatPercent(ratio, localeCode = DEFAULT_LOCALE, options = {}) {
  return formatNumber(ratio, localeCode, { style: 'percent', maximumFractionDigits: 0, ...options })
}

export function dateFormatter(localeCode, options = {}) {
  const key = 'd:' + localeCode + ':' + JSON.stringify(options)
  return memo(key, () =>
    safe(
      () => new Intl.DateTimeFormat(localeCode, options),
      () => new Intl.DateTimeFormat(DEFAULT_LOCALE, options)
    )
  )
}

function toDate(value) {
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

/**
 * Medium-length date — 'Jan 5, 2026' in en, '5 janv. 2026' in fr,
 * '2026年1月5日' in ja. This is the default for every user-visible date.
 */
export function formatDate(value, localeCode = DEFAULT_LOCALE, options) {
  const date = toDate(value)
  if (!date) return ''
  const opts = options || { year: 'numeric', month: 'short', day: 'numeric' }
  return dateFormatter(localeCode, opts).format(date)
}

export function formatLongDate(value, localeCode = DEFAULT_LOCALE) {
  return formatDate(value, localeCode, { year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatDateTime(value, localeCode = DEFAULT_LOCALE) {
  return formatDate(value, localeCode, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatTime(value, localeCode = DEFAULT_LOCALE, options) {
  const date = toDate(value)
  if (!date) return ''
  return dateFormatter(localeCode, options || { hour: '2-digit', minute: '2-digit' }).format(date)
}

/**
 * The date order the locale actually uses, e.g. 'DD/MM/YYYY'. Used as the
 * placeholder on date inputs so people know what shape to type.
 */
export function datePattern(localeCode = DEFAULT_LOCALE) {
  return memo('p:' + localeCode, () => {
    const parts = dateFormatter(localeCode, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date(Date.UTC(2026, 0, 5)))
    return parts
      .map((part) => {
        if (part.type === 'year') return 'YYYY'
        if (part.type === 'month') return 'MM'
        if (part.type === 'day') return 'DD'
        return part.value
      })
      .join('')
      .trim()
  })
}

const RELATIVE_UNITS = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
]

/** 'in 3 days' / 'dentro de 3 días'. */
export function formatRelative(value, localeCode = DEFAULT_LOCALE, now = Date.now()) {
  const date = toDate(value)
  if (!date) return ''
  const rtf = memo('r:' + localeCode, () =>
    safe(
      () => new Intl.RelativeTimeFormat(localeCode, { numeric: 'auto' }),
      () => new Intl.RelativeTimeFormat(DEFAULT_LOCALE, { numeric: 'auto' })
    )
  )
  const diffSeconds = Math.round((date.getTime() - now) / 1000)
  for (const [unit, seconds] of RELATIVE_UNITS) {
    if (Math.abs(diffSeconds) >= seconds) {
      return rtf.format(Math.round(diffSeconds / seconds), unit)
    }
  }
  return rtf.format(diffSeconds, 'second')
}

/**
 * Format a measurement with its unit, e.g. '12.5 cm' / '12,5 cm'.
 * `unit` is an Intl sanctioned unit identifier ('centimeter', 'kilogram').
 * Unsupported units degrade to number + raw suffix rather than throwing.
 */
export function formatUnit(value, unit, localeCode = DEFAULT_LOCALE, options = {}) {
  if (value == null || Number.isNaN(Number(value))) return ''
  try {
    return formatNumber(value, localeCode, {
      style: 'unit',
      unit,
      unitDisplay: 'short',
      ...options,
    })
  } catch {
    return formatNumber(value, localeCode, options) + ' ' + unit
  }
}

/** 'a, b and c' in the conjunction style of the locale. */
export function formatList(items, localeCode = DEFAULT_LOCALE, type = 'conjunction') {
  const list = (items || []).filter(Boolean).map(String)
  if (list.length === 0) return ''
  const formatter = memo('l:' + localeCode + ':' + type, () =>
    safe(
      () => new Intl.ListFormat(localeCode, { style: 'long', type }),
      () => new Intl.ListFormat(DEFAULT_LOCALE, { style: 'long', type })
    )
  )
  return formatter.format(list)
}

/**
 * Read the active locale in a browser context. React islands are mounted by
 * pages that already set <html lang>, so this keeps them in sync without
 * threading a prop through every component.
 */
export function activeLocale() {
  if (typeof document === 'undefined') return DEFAULT_LOCALE
  return document.documentElement.getAttribute('lang') || DEFAULT_LOCALE
}

/** Whether the active locale should default tools to metric. */
export function prefersMetric(localeCode = DEFAULT_LOCALE) {
  return getLocale(localeCode).units === 'metric'
}
