import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

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

export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !EXCLUDED_SLUGS.some((slug) => new URL(page).pathname === slug || new URL(page).pathname === slug + '/'),
      serialize: (item) => ({
        ...item,
        // Normalize trailing slashes for cleaner URLs in sitemap
        url: item.url.endsWith('/') && item.url !== `${siteUrl}/`
          ? item.url.slice(0, -1)
          : item.url,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: item.url === siteUrl + '/' ? 'weekly' : 'monthly',
        priority: item.url === siteUrl + '/' ? 1.0
          : ['/ruler', '/password-checker', '/calorie-calculator', '/dpi-calculator', '/image-resizer'].some(p => item.url.includes(p)) ? 0.9
            : ['/faq', '/about'].some(p => item.url.includes(p)) ? 0.7
              : 0.8,
      }),
    }),
  ],
})

