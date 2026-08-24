// ─────────────────────────────────────────────────────────────────────────
// Locale plumbing for the React islands.
//
// Islands take an optional `lang` prop that the page passes down, rather
// than reading document.documentElement.lang during render. That matters
// because these islands are server-rendered at build time and hydrated in
// the browser: reading the DOM during render would produce 'en' on the
// server and 'ja' on the client for a /ja/ page, and React would flag the
// hydration mismatch and throw the server markup away.
//
// Passing the locale in as a prop keeps both renders identical.
// ─────────────────────────────────────────────────────────────────────────

import { DEFAULT_LOCALE, getLocale } from '../../../i18n/config.js'
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatLongDate,
  formatNumber,
  formatTime,
  formatUnit,
  datePattern,
} from '../../../i18n/format.js'

/**
 * Bundle of formatters bound to one locale. Build it once per island with
 * useMemo and pass it down, so nested components do not each rebuild the
 * underlying Intl objects.
 */
export function makeFormatters(lang = DEFAULT_LOCALE) {
  const locale = getLocale(lang)
  return {
    locale: locale.code,
    /** Locale's preferred measurement system, for choosing default units. */
    units: locale.units,
    /** Locale's default currency, for any price display. */
    currency: locale.currency,
    /** Placeholder text for date inputs, e.g. 'DD/MM/YYYY'. */
    datePattern: datePattern(locale.code),
    number: (value, options) => formatNumber(value, locale.code, options),
    integer: (value) => formatNumber(value, locale.code, { maximumFractionDigits: 0 }),
    decimal: (value, digits = 2) =>
      formatNumber(value, locale.code, { maximumFractionDigits: digits }),
    currencyValue: (value, code) => formatCurrency(value, locale.code, code),
    date: (value) => formatDate(value, locale.code),
    longDate: (value) => formatLongDate(value, locale.code),
    dateTime: (value) => formatDateTime(value, locale.code),
    time: (value, options) => formatTime(value, locale.code, options),
    unit: (value, unit, options) => formatUnit(value, unit, locale.code, options),
  }
}
