import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

const siteUrl = process.env.PUBLIC_SITE_URL || 
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://rockingtools.com')

export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [react(), sitemap()],
})
