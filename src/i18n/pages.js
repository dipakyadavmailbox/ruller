// ─────────────────────────────────────────────────────────────────────────
// CORE PAGE REGISTRY — the pages that get a real translated URL per locale.
//
// Deliberately NOT the whole site. The ~300 programmatic long-tail pages
// (/kg-to-lbs, /aspect-ratio/16-9, …) stay English-only: bulk-translating
// them would produce thin near-duplicate pages at a scale Google treats as
// scaled content abuse, which is a far bigger risk than the traffic gained.
// Those pages self-canonicalise and emit a self-referencing hreflang.
//
// `key`      matches the key used in ./content/{locale}.js
// `path`     canonical English path (the locale prefix is added by routing)
// `island`   React component mounted on the page, or null for prose pages
// `layout`   'base' renders nav + footer + ads; 'minimal' is the full-bleed
//            viewport shell the screen ruler needs.
// ─────────────────────────────────────────────────────────────────────────

export const CORE_PAGES = [
  { key: 'home', path: '/', island: 'ToolGrid', layout: 'base', og: 'home' },
  { key: 'ruler', path: '/ruler', island: 'RulerApp', layout: 'minimal', og: 'ruler' },
  { key: 'aspectRatio', path: '/aspect-ratio-calculator', island: 'AspectRatioCalculator', layout: 'base', og: 'aspect-ratio-calculator' },
  { key: 'dpi', path: '/dpi-calculator', island: 'DpiCalculator', layout: 'base', og: 'dpi-calculator' },
  { key: 'imageResizer', path: '/image-resizer', island: 'ImageResizer', layout: 'base', og: 'image-resizer' },
  { key: 'colorTools', path: '/color-tools', island: 'ColorTools', layout: 'base', og: 'color-tools' },
  { key: 'password', path: '/password-checker', island: 'PasswordChecker', layout: 'base', og: 'password-checker' },
  { key: 'calorie', path: '/calorie-calculator', island: 'CalorieCalculator', layout: 'base', og: 'calorie-calculator' },
  { key: 'pregnancy', path: '/pregnancy-calculator', island: 'PregnancyCalculator', layout: 'base', og: 'pregnancy-calculator' },
  { key: 'regex', path: '/regex-tester', island: 'RegexTester', layout: 'base', og: 'regex-tester' },
  { key: 'cron', path: '/cron-expression-builder', island: 'CronBuilder', layout: 'base', og: 'cron-expression-builder' },
  { key: 'dataConverter', path: '/data-converter', island: 'DataConverter', layout: 'base', og: 'data-converter' },
  { key: 'qr', path: '/qr-code-generator', island: 'QrCodeGenerator', layout: 'base', og: 'qr-code-generator' },
  { key: 'pdf', path: '/pdf-tools', island: 'PdfTools', layout: 'base', og: 'pdf-tools' },
  { key: 'unitConverter', path: '/unit-converter', island: 'UnitConverter', layout: 'base', og: 'unit-converter' },
  { key: 'about', path: '/about', island: null, layout: 'base', og: 'about' },
  { key: 'faq', path: '/faq', island: null, layout: 'base', og: 'faq' },
]

const BY_KEY = new Map(CORE_PAGES.map((p) => [p.key, p]))
const BY_PATH = new Map(CORE_PAGES.map((p) => [p.path, p]))

export function getCorePage(key) {
  return BY_KEY.get(key)
}

/**
 * True when `path` (locale-free, normalised) has translated versions.
 * Drives whether a page emits full hreflang alternates or just a
 * self-referencing one.
 */
export function isCorePath(path) {
  return BY_PATH.has(path)
}

/** URL slug used under /{locale}/ — '' for the home page. */
export function coreSlug(page) {
  return page.path === '/' ? '' : page.path.replace(/^\//, '')
}
