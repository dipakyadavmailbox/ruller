# Free Tools — 8-Tool Toolkit

A single Vite + React site bundling eight small, single-purpose tools:

| Route | Tool | SEO angle | Affiliate angle |
|---|---|---|---|
| `/ruler` | On-screen ruler, calibrated to true mm/cm/in scale | "online ruler", "screen ruler" | low direct, drives branded/repeat traffic |
| `/password-checker` | Password strength checker + generator, 100% client-side | "password strength checker" — huge volume | password managers, $20-50+ per signup |
| `/calorie-calculator` | TDEE + macro calculator (Mifflin-St Jeor) | "calorie calculator", "tdee calculator" — very high volume | supplements, meal kits, kitchen scales |
| `/regex-tester` | Live regex tester + cheatsheet | steady dev-audience search volume | IDEs, dev courses, hosting |
| `/data-converter` | JSON ⇄ CSV ⇄ YAML converter | huge long-tail ("convert json to csv") | low direct, strong ad/upsell traffic |
| `/pregnancy-calculator` | Due date (Naegele's rule) + ovulation/fertile window | evergreen, very high volume | prenatal vitamins, ovulation kits, baby products |
| `/aspect-ratio-calculator` | Ratio dimensions + center-crop calculator | "4:5 vs 9:16 calculator" | camera gear, tripods, editing software |
| `/dpi-calculator` | Print size ⇄ pixel resolution ⇄ DPI | "what resolution do I need to print 24x36" | printers, photo paper, print services |
| `/image-resizer` | Client-side image resize + compress (Canvas API) | "resize image online", "compress image without losing quality" — very high volume | cloud storage, editing software, CDN/hosting |

## Why they're bundled together

Same domain, shared nav, and a home page (`/`) that links to all three —
this is deliberate for SEO. Internal links between related tools help
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
    │   │   ├── AffiliateCard.jsx   – reusable recommendation block
    │   │   └── FormKit.jsx         – shared inputs/buttons/cards for the calculator-style tools
    │   ├── ruler/                  – the ruler tool
    │   ├── password/                – strength checker + generator
    │   ├── calorie/                 – TDEE + macro calculator
    │   ├── regex/                   – regex tester + cheatsheet
    │   ├── converter/               – JSON/CSV/YAML converter (uses papaparse + js-yaml)
    │   ├── pregnancy/               – due date + ovulation calculator
    │   ├── aspect/                  – aspect ratio + crop calculator
    │   ├── dpi/                     – DPI/PPI print size calculator
    │   └── imagetool/               – image resizer/compressor (Canvas API, no uploads)
    └── pages/                      – thin route wrappers, one per URL
```

## Before you launch: plug in real affiliate links

`AffiliateCard` is reused across five of the eight tools. Each tool file
has its own `AFFILIATE_ITEMS` array at the top with placeholder `href: '#'`
values — search each tool's main component file for `AFFILIATE_ITEMS` and
swap in your real links (password managers, Amazon Associates for camera
gear/printers, prenatal vitamin brands, etc). Since they all share one
`AffiliateCard` component, styling stays consistent automatically.

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
