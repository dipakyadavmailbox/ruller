import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { CONVERSIONS_DATA } from './src/data/conversionsData.js'

const siteUrl = process.env.PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://www.rockingtools.com')

// Pages that are noindex — exclude from XML sitemap to avoid crawl budget waste
const EXCLUDED_SLUGS = [
  '/privacy',
  '/terms',
  '/dmca',
  '/accessibility',
  '/donate',
  '/contact',
  '/sitemap',
  '/404',
]

// Build a set of /unit-converter/{slug} paths that are duplicate conversion pair
// pages (the standalone /{slug} version is the canonical). Category index pages
// like /unit-converter/weight are NOT excluded — they have unique content.
const DUPLICATE_CONVERTER_PATHS = new Set(
  CONVERSIONS_DATA.map((conv) => `/unit-converter/${conv.slug}`)
)

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, '') || '/'
        // Exclude noindex pages
        if (EXCLUDED_SLUGS.some((slug) => pathname === slug)) return false
        // Exclude duplicate /unit-converter/{conversion} pages
        if (DUPLICATE_CONVERTER_PATHS.has(pathname)) return false
        return true
      },
      serialize: (item) => ({
        ...item,
        // Normalize trailing slashes for cleaner URLs in sitemap
        url: item.url.endsWith('/') && item.url !== `${siteUrl}/`
          ? item.url.slice(0, -1)
          : item.url,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: item.url === siteUrl + '/' ? 'weekly' : 'monthly',
        priority: item.url === siteUrl + '/' ? 1.0
          : ['/ruler', '/password-checker', '/calorie-calculator', '/pregnancy-calculator', '/dpi-calculator', '/image-resizer', '/conversions', '/pdf-tools', '/qr-code-generator', '/unit-converter', '/aspect-ratio-calculator', '/regex-tester', '/cron-expression-builder', '/data-converter', '/color-tools'].some(p => item.url.includes(p)) ? 0.9
            : ['/faq', '/about'].some(p => item.url.includes(p)) ? 0.7
              : 0.8,
      }),
    }),
  ],
})

