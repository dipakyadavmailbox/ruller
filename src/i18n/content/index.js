// ─────────────────────────────────────────────────────────────────────────
// CONTENT REGISTRY + BUILD-TIME VALIDATOR
//
// Astro imports this at build time, so validate() runs once per build. A
// locale that is missing a page, a field, or a FAQ entry throws here rather
// than shipping a page with a blank <h1> or an empty meta description —
// both of which are AdSense review failures, not cosmetic problems.
// ─────────────────────────────────────────────────────────────────────────

import en from './en.js'
import es from './es.js'
import fr from './fr.js'
import de from './de.js'
import ptBR from './pt-BR.js'
import hi from './hi.js'
import id from './id.js'
import ja from './ja.js'

import { DEFAULT_LOCALE, LOCALE_CODES } from '../config.js'
import { CORE_PAGES } from '../pages.js'

export const CONTENT = {
  en,
  es,
  fr,
  de,
  'pt-BR': ptBR,
  hi,
  id,
  ja,
}

const REQUIRED_STRING_FIELDS = [
  'title',
  'description',
  'keywords',
  'h1',
  'intro',
  'bodyHeading',
  'body',
]

function validate() {
  const problems = []

  for (const code of LOCALE_CODES) {
    const dict = CONTENT[code]
    if (!dict) {
      problems.push(`locale "${code}" is declared in config.js but has no content file`)
      continue
    }

    for (const page of CORE_PAGES) {
      const entry = dict[page.key]
      if (!entry) {
        problems.push(`${code}: missing page "${page.key}"`)
        continue
      }

      for (const field of REQUIRED_STRING_FIELDS) {
        const value = entry[field]
        if (typeof value !== 'string' || value.trim() === '') {
          problems.push(`${code}.${page.key}.${field} is empty or not a string`)
        }
      }

      if (!Array.isArray(entry.bullets) || entry.bullets.length < 3) {
        problems.push(`${code}.${page.key}.bullets needs at least 3 entries`)
      }

      if (!Array.isArray(entry.faq) || entry.faq.length < 3) {
        problems.push(`${code}.${page.key}.faq needs at least 3 entries`)
      } else {
        entry.faq.forEach((item, index) => {
          if (!item || !item.q || !item.a) {
            problems.push(`${code}.${page.key}.faq[${index}] is missing q or a`)
          }
        })
      }

      // A meta description longer than ~160 chars gets truncated in the SERP.
      // Not fatal, but worth catching before it ships across eight locales.
      if (typeof entry.description === 'string' && entry.description.length > 200) {
        problems.push(`${code}.${page.key}.description is ${entry.description.length} chars (max 200)`)
      }
    }

    // Catch keys that exist in a translation but no longer in the registry —
    // usually a page that was renamed and left an orphan behind.
    const known = new Set(CORE_PAGES.map((p) => p.key))
    for (const key of Object.keys(dict)) {
      if (!known.has(key)) {
        problems.push(`${code}: orphan page key "${key}" is not in CORE_PAGES`)
      }
    }
  }

  if (problems.length > 0) {
    throw new Error(
      'i18n content validation failed:\n  - ' + problems.join('\n  - ')
    )
  }
}

validate()

/**
 * Content for one core page in one locale, falling back to English so a
 * partially translated locale degrades to English copy instead of a blank
 * page. In practice validate() means this fallback should never fire.
 */
export function getContent(localeCode, pageKey) {
  const dict = CONTENT[localeCode] || CONTENT[DEFAULT_LOCALE]
  return dict[pageKey] || CONTENT[DEFAULT_LOCALE][pageKey]
}
