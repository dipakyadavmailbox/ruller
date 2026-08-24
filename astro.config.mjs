import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { CONVERSIONS_DATA } from './src/data/conversionsData.js'
import { LOCALES, DEFAULT_LOCALE } from './src/i18n/config.js'

const siteUrl = process.env.PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://www.rockingtools.com')

// Pages that carry a noindex meta tag — excluded from the XML sitemap so we
// never advertise a URL we have also told Google to drop.
//
// /privacy, /terms and /contact are deliberately NOT in this list any more.
// AdSense review expects those pages to be public and reachable, and having
// them in the sitemap is the clearest signal that they are.
const EXCLUDED_SLUGS = [
  '/accessibility',
  '/dmca',
  '/donate',
  '/sitemap',
  '/404',
]

// Build a set of /unit-converter/{slug} paths that are duplicate conversion pair
// pages (the standalone /{slug} version is the canonical). Category index pages
// like /unit-converter/weight are NOT excluded — they have unique content.
const DUPLICATE_CONVERTER_PATHS = new Set(
  CONVERSIONS_DATA.map((conv) => `/unit-converter/${conv.slug}`)
)

// The locale segment set, used to strip a prefix before matching a path
// against the priority and exclusion lists below. Without this, /es/ruler
// would be scored as a generic page rather than as the tool hub it is.
const LOCALE_SEGMENTS = new Set(
  LOCALES.filter((l) => l.path).map((l) => l.path)
)

function stripLocale(pathname) {
  const [, first, ...rest] = pathname.split('/')
  if (LOCALE_SEGMENTS.has(first)) {
    return '/' + rest.join('/')
  }
  return pathname
}

// Maps a URL path segment to the hreflang value emitted in the sitemap's
// xhtml:link alternates. @astrojs/sitemap groups pages that share a path
// once the locale segment is removed.
const sitemapLocales = LOCALES.reduce((acc, locale) => {
  acc[locale.path || DEFAULT_LOCALE] = locale.hreflang
  return acc
}, {})

const TOOL_HUBS = [
  '/ruler', '/password-checker', '/calorie-calculator', '/pregnancy-calculator',
  '/dpi-calculator', '/image-resizer', '/conversions', '/pdf-tools',
  '/qr-code-generator', '/unit-converter', '/aspect-ratio-calculator',
  '/regex-tester', '/cron-expression-builder', '/data-converter', '/color-tools',
]

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      // Emits <xhtml:link rel="alternate" hreflang="…"> for each translated
      // page, which is the second half of the hreflang signal — the first
      // half is the <link> tags rendered by HeadMeta.astro.
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: sitemapLocales,
      },
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, '') || '/'
        const bare = stripLocale(pathname) || '/'
        // Exclude noindex pages, in any language
        if (EXCLUDED_SLUGS.some((slug) => bare === slug)) return false
        // Exclude duplicate /unit-converter/{conversion} pages
        if (DUPLICATE_CONVERTER_PATHS.has(bare)) return false
        return true
      },
      serialize: (item) => {
        // Normalize trailing slashes for cleaner URLs in the sitemap
        const url = item.url.endsWith('/') && item.url !== `${siteUrl}/`
          ? item.url.slice(0, -1)
          : item.url
        const pathname = new URL(url).pathname.replace(/\/$/, '') || '/'
        const bare = stripLocale(pathname) || '/'

        // Translated pages sit one notch below their English original, so
        // that the canonical English hub is what gets crawled first.
        const isLocalized = bare !== pathname
        let priority
        if (bare === '/') priority = isLocalized ? 0.9 : 1.0
        else if (TOOL_HUBS.includes(bare)) priority = isLocalized ? 0.8 : 0.9
        else if (bare === '/faq' || bare === '/about') priority = 0.7
        else priority = 0.8

        return {
          ...item,
          url,
          lastmod: new Date().toISOString().split('T')[0],
          changefreq: bare === '/' ? 'weekly' : 'monthly',
          priority,
        }
      },
    }),
  ],
})
