# Free Upkaran — Ruler, Password Checker, Calorie Calculator

A single Vite + React site bundling three small, single-purpose Upkaran:

| Route | Tool | SEO angle | Affiliate angle |
|---|---|---|---|
| `/ruler` | On-screen ruler, calibrated to true mm/cm/in scale | "online ruler", "screen ruler" — steady search volume | low direct, but drives repeat/branded traffic |
| `/password-checker` | Password strength checker + generator, 100% client-side | "password strength checker" — huge volume | password managers pay $20-50+ per signup, some of the best payouts in SaaS affiliate |
| `/calorie-calculator` | TDEE + macro calculator (Mifflin-St Jeor) | "calorie calculator", "tdee calculator" — very high, evergreen volume | supplements, meal kits, kitchen scales — mature, high-converting niche |

## Why they're bundled together

Same domain, shared nav, and a home page (`/`) that links to all three —
this is deliberate for SEO. Internal links between related upkaran help
search engines understand your site's topical breadth, and visitors who
land on one tool via search are one click from discovering another
(reduces bounce rate, increases pages/session — both indirectly help
rankings, and directly help revenue since more page views = more
affiliate impressions).

## Project structure

```
toolkit/
├── index.html
├── package.json / vite.config.js / vercel.json
├── public/
│   ├── robots.txt        – points crawlers at sitemap.xml
│   └── sitemap.xml       – replace YOUR-DOMAIN.com once you have one
└── src/
    ├── App.jsx                     – route table
    ├── index.css                   – shared design tokens (dark/light)
    ├── units.js                    – ruler unit math
    ├── hooks/
    │   ├── useTheme.js             – site-wide dark/light, persisted
    │   ├── usePageMeta.js          – sets <title>/<meta description> per page
    │   ├── useCalibratedPPI.js     – ruler calibration + zoom compensation
    │   └── useDraggable.js         – ruler panel dragging
    ├── components/
    │   ├── shared/
    │   │   ├── Layout.jsx          – header nav + footer (wraps every page except /ruler)
    │   │   └── AffiliateCard.jsx   – reusable recommendation block
    │   ├── ruler/                  – the ruler tool (unchanged from the standalone version)
    │   ├── password/
    │   │   ├── passwordStrength.js – scoring, entropy, crack-time, generator
    │   │   └── PasswordChecker.jsx
    │   └── calorie/
    │       ├── calorieMath.js      – Mifflin-St Jeor + macro split
    │       └── CalorieCalculator.jsx
    └── pages/                      – thin route wrappers, one per URL
```

## Before you launch: plug in real affiliate links

`AffiliateCard` is used on both the password checker and calorie
calculator pages. Right now every `href` is a placeholder (`'#'`). Open:

- `src/components/password/PasswordChecker.jsx` → `AFFILIATE_ITEMS`
- `src/components/calorie/CalorieCalculator.jsx` → `AFFILIATE_ITEMS`

and swap in your actual affiliate links (1Password/Dashlane/NordPass
partner programs, Amazon Associates for kitchen scales, etc). Since both
pages share the one `AffiliateCard` component, styling stays consistent
automatically.

## Run it locally

```bash
npm install
npm run dev
```

```bash
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Deploy to Vercel

**CLI (fastest):**
```bash
npm install -g vercel
vercel          # first deploy, asks setup questions, auto-detects Vite
vercel --prod   # promote to production URL
```

**Git + dashboard (recommended for ongoing work):**
1. Push this folder to a GitHub repo.
2. On vercel.com → **Add New → Project** → import the repo.
3. Vercel auto-detects Vite (build: `npm run build`, output: `dist`) —
   also pinned explicitly in `vercel.json` so it's correct either way.
4. Deploy. Every push to `main` redeploys automatically.

No environment variables or backend needed — fully static/client-side.

## An honest note on SEO and this architecture

This is a client-rendered single-page app (Vite + React Router, no
server-side rendering). Google's crawler does execute JavaScript and can
index SPA content today, so this will get indexed — but a
server-rendered or statically-generated site (Next.js `next export`,
Astro, etc.) will generally index faster, more reliably, and rank
slightly better, because search engines get fully-formed HTML on the
first request instead of having to render JS first. Bing and most other
crawlers are considerably worse at JS rendering than Google.

For validating the idea and getting initial traffic, this SPA is fine —
that's exactly what it's built for. If a tool takes off and organic
search becomes your primary channel, migrating that page's content to a
statically-generated framework is the highest-leverage next step. The
`usePageMeta` hook is deliberately isolated to make eventually swapping
in per-route static HTML (with real `<title>`/`<meta>` at request time
instead of set via `useEffect`) a smaller, one-file-at-a-time job rather
than a rewrite.

## What changed on the ruler itself

Two fixes since the standalone version:
1. **Tick label legibility** — labels were 9px at a dim gray, hard to
   read at a glance. Now 11px, full-contrast ink color, bolder weight,
   plus a subtle contrasting shadow so numbers stay legible over any
   background.
2. **Zoom-fixed measurement** (from the previous conversation) — the
   ruler's physical size on your monitor no longer changes as you zoom
   or pan the browser; only recalibrating changes it.
