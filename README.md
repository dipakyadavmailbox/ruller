# Free Tools — Astro MPA

Migrated from the original Vite/React SPA to a true Astro multi-page
app: every route ships full static HTML by default, with React islands
used only for the 9 actually-interactive tools.

## Run it locally

```bash
npm install
npm run dev
```

```bash
npm run build     # static output → dist/
npm run preview   # serve the production build locally
```

## What changed vs. the React SPA

- **Real navigation.** Every route is its own `.astro` page under
  `src/pages/` — clicking a nav link is a normal browser navigation,
  not a client-side route swap.
- **Static-first.** `/`, `/contact`, `/terms`, `/privacy`, `/donate`
  ship **zero JavaScript** beyond the shared theme-toggle script. The
  donate page's FAQ accordion uses plain `<details>/<summary>` — no JS
  needed for that either.
- **Islands only where needed.** The 9 tools (ruler, password checker,
  calorie calculator, regex tester, data converter, pregnancy
  calculator, aspect ratio calculator, DPI calculator, image resizer)
  are React islands with `client:load`. Each page's `<h1>` and intro
  paragraph were deliberately pulled OUT of the React component into
  static Astro markup — that's the actual point of this migration: an
  AI crawler that doesn't run JS still sees the real heading and
  description, not an empty shell.
- **SEO added:** per-page canonical URLs, Open Graph + Twitter Card
  tags, `SoftwareApplication` JSON-LD on every tool, `FAQPage` JSON-LD
  on `/donate`, `BreadcrumbList` JSON-LD site-wide, auto-generated
  `sitemap-index.xml` via `@astrojs/sitemap`, and a `robots.txt` that
  explicitly allows GPTBot/ClaudeBot/PerplexityBot/Google-Extended.

## US SEO/legal compliance pages

Added on top of the original Terms/Privacy/robots/sitemap:

- **`/privacy`** — rewritten with a CCPA/CPRA section (California),
  a general section covering Virginia/Colorado/Connecticut/Utah state
  privacy laws, an explicit COPPA (children's privacy) section, and a
  Do Not Track note. Still accurately reflects that this codebase
  collects no personal information server-side.
- **`/terms`** — expanded with eligibility (age 13+), indemnification,
  a DMCA/IP section linking to `/dmca`, a governing-law/dispute-
  resolution section, severability, and entire-agreement clauses. The
  arbitration clause is deliberately left as a bracketed placeholder —
  that's binding legal language with state-specific enforceability
  rules, not something to fill in from a template.
- **`/dmca`** — a standard notice-and-takedown policy (17 U.S.C. §
  512(c) style) with the required elements for a valid takedown notice
  and counter-notice.
- **`/accessibility`** — an ADA/WCAG 2.1 AA accessibility statement:
  what's implemented, known limitations, and a feedback contact. US web
  accessibility lawsuits are common enough that having this page, even
  as an honest checklist rather than a certified audit, is worth doing.
- **`/sitemap`** — human-readable HTML sitemap (distinct from the
  auto-generated `sitemap-index.xml`), also linked from the footer.
- **`/404`** — custom not-found page listing every tool, so a broken
  link doesn't dead-end a visitor (or a crawler).
- **`robots.txt`** — unchanged from before (already had the AI-crawler
  allowlist), still points at `sitemap-index.xml`.
- **US geo-targeting markup** in both layouts: `lang="en-US"`,
  `hreflang="en-us"`, `geo.region`/`geo.placename` meta tags, and
  `og:locale="en_US"`. Also added site-wide `Organization` JSON-LD.

New `siteConfig.js` fields: `legal.privacyEmail`, `legal.dmcaEmail`,
`legal.accessibilityEmail` (all fall back to `contactEmail` if left
blank), and `legal.jurisdiction` now defaults to a real placeholder
state instead of a bracket — update it to your actual state.

## Before you deploy

1. Set your real domain in `astro.config.mjs` (`site:`) and
   `public/robots.txt` (`Sitemap:` line) — both currently say
   `YOUR-DOMAIN.com`.
2. `src/siteConfig.js` still has the same placeholders as before
   (contact email, donation methods, legal dates) — same config file,
   same "fill this in later" pattern.
3. Add a real `public/og-image.png` (referenced by every page's Open
   Graph tags) — currently that path isn't populated with an actual
   file.
4. Affiliate `AFFILIATE_ITEMS` placeholders are unchanged from the
   original build — still need real links.

## Deploy to Vercel

Static output, same as before — `vercel` or connect the repo in the
Vercel dashboard, it auto-detects Astro. No server functions needed.

## What I could NOT verify in this environment

I built this without network access, so `npm install` / `astro build`
/ `astro dev` were never actually run here. Everything was validated
statically instead: every import resolves against the real filesystem,
every route referenced in navigation/data has a matching page file,
and every ported tool's `client:load` directive was checked. That is
not a substitute for a real build — please run `npm install && npm run
build` and fix whatever that turns up (Astro/React version mismatches,
typos in `.astro` frontmatter TypeScript, etc.) before deploying.
