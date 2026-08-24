// ─────────────────────────────────────────────────────────────────────────
// Maps the English strings already in src/data/tools.js onto UI dictionary
// keys, so Nav and Footer can render translated labels without rewriting
// the tool data (which the English pages and the sitemap still read from).
//
// Anything not listed here falls through to its original English string,
// which is the correct behaviour for a tool that has not been translated.
// ─────────────────────────────────────────────────────────────────────────

import { t } from './ui.js'

const CATEGORY_KEYS = {
  'Design & Photography': 'cat.design',
  'Security & Health': 'cat.security',
  'Developer Tools': 'cat.developer',
  'PDF Tools': 'cat.pdf',
  'Utility Tools': 'cat.utility',
}

const TOOL_KEYS = {
  '/ruler': 'tool.ruler',
  '/aspect-ratio-calculator': 'tool.aspectRatio',
  '/dpi-calculator': 'tool.dpi',
  '/image-resizer': 'tool.imageResizer',
  '/color-tools': 'tool.colorTools',
  '/password-checker': 'tool.password',
  '/calorie-calculator': 'tool.calorie',
  '/pregnancy-calculator': 'tool.pregnancy',
  '/regex-tester': 'tool.regex',
  '/cron-expression-builder': 'tool.cron',
  '/data-converter': 'tool.dataConverter',
  '/qr-code-generator': 'tool.qr',
  '/pdf-tools': 'tool.pdf',
  '/unit-converter': 'tool.unitConverter',
}

/** Translated category heading, or the original English if unmapped. */
export function categoryLabel(heading, localeCode) {
  const key = CATEGORY_KEYS[heading]
  return key ? t(localeCode, key) : heading
}

/** Translated short nav label for a tool slug, or its English fallback. */
export function toolLabel(slug, fallback, localeCode) {
  const key = TOOL_KEYS[slug]
  return key ? t(localeCode, key) : fallback
}
