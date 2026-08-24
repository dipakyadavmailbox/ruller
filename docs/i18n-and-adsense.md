# Internationalization & AdSense

Two things live here because they overlap: the locale system decides which
URLs exist, and AdSense compliance depends on those URLs being crawlable and
honestly described.

---

## 1. Locales

Eight locales ship. They are declared once, in `src/i18n/config.js`:

| Code    | URL prefix | Currency | Number grouping | Date         |
| ------- | ---------- | -------- | --------------- | ------------ |
| `en`    | *(none)*   | USD      | 1,234,567.89    | Jan 5, 2026  |
| `es`    | `/es`      | EUR      | 1.234.567,89    | 5 ene 2026   |
| `fr`    | `/fr`      | EUR      | 1 234 567,89    | 5 janv. 2026 |
| `de`    | `/de`      | EUR      | 1.234.567,89    | 5. Jan. 2026 |
| `pt-BR` | `/pt-br`   | BRL      | 1.234.567,89    | 5 de jan. de 2026 |
| `hi`    | `/hi`      | INR      | 12,34,567.89    | 5 जन॰ 2026   |
| `id`    | `/id`      | IDR      | 1.234.567,89    | 5 Jan 2026   |
| `ja`    | `/ja`      | JPY      | 1,234,567.89    | 2026年1月5日  |

English is the default and has no prefix, so existing URLs are unchanged.

### What is translated, and what is not

**Translated** — the 17 core pages listed in `src/i18n/pages.js`: the home
page, all 15 tool hubs, plus `/about` and `/faq`. That is 17 × 7 = 119 new
pages, each with hand-written copy in `src/i18n/content/{locale}.js`.

**Not translated** — the ~300 programmatic long-tail pages (`/kg-to-lbs`,
`/aspect-ratio/16-9`, `/unit-converter/…`). This is deliberate. Bulk-
translating near-identical pages across eight languages produces thin
duplicate content at a scale Google classifies as *scaled content abuse*,
which risks both search ranking and AdSense approval. Those pages emit no
hreflang and canonicalise to themselves.

**Also not translated** — the strings *inside* the React tool widgets
(button labels, field names, validation text). The page chrome, headings,
body copy, and FAQ around each tool are translated; the tool UI itself is
still English. Numbers, dates, currency, and default measurement units
inside the tools *do* follow the locale. See "Known gaps" below.

### Adding a locale

1. Add an entry to `LOCALES` in `src/i18n/config.js`.
2. Add its strings to `UI` in `src/i18n/ui.js`.
3. Create `src/i18n/content/{code}.js` mirroring `en.js`.
4. Register it in `src/i18n/content/index.js`.

The validator in `content/index.js` runs at build time and **fails the
build** if a locale is missing a page, a field, or a FAQ entry. A half-added
locale cannot ship a blank `<h1>` or an empty meta description.

### Formatting

`src/i18n/format.js` wraps `Intl` with cached formatters. In `.astro` files
call it directly; in React islands use `makeFormatters(lang)` from
`src/components/react/shared/useLocale.js`.

Islands take a `lang` prop rather than reading `document.documentElement.lang`
during render. That is not incidental — these islands are server-rendered at
build time and hydrated in the browser, so reading the DOM during render
would give `en` on the server and `ja` on the client, and React would discard
the server markup as a hydration mismatch.

### Language discovery

- `<link rel="alternate" hreflang>` on every core page, plus `x-default`.
- `<xhtml:link>` alternates in `sitemap-0.xml`.
- A crawlable `<a>`-based language switcher in the nav.
- A dismissible suggestion banner (`LocaleSuggestion.astro`) that *offers* a
  switch based on `navigator.languages`. It never redirects automatically —
  Googlebot crawls from the US with an `en-US` header, so auto-redirecting
  would hide every translated page from it.

---

## 2. AdSense

### Before this work

Four issues would each have been enough to fail a review:

1. `robots.txt` disallowed `/privacy`, `/terms`, and `/contact`. AdSense
   requires those to be reachable. Worse, a disallowed page can never have
   its `noindex` tag read, because the crawler cannot fetch the page to see
   it — blocking and noindexing the same URL is self-defeating.
2. Every ad unit shipped `data-ad-slot="auto"`, which is not a valid slot
   id, so every ad request on the site was malformed.
3. The `push({})` call lived in a bundled `<script>`, which Astro
   deduplicates. On a page with two ad units the module ran once, so the
   second unit never filled.
4. `/privacy` stated "we don't set our own tracking or advertising cookies"
   while AdSense and GA4 loaded on every page.

Also fixed: `public/_headers` sent `noindex, nofollow` on `/*`. Vercel
ignores that file, so it was inert on the current host — but it would have
deindexed the entire site on Netlify or Cloudflare Pages.

### Configuring ad slots

All ad identifiers live in `src/adsConfig.js`. Four named placements exist:
`inArticle`, `belowTool`, `footer`, `sidebar`.

Each ships with `slot: ''`, and **a placement with no slot id renders
nothing at all**. That is intentional: an absent unit is strictly safer than
a broken one during review.

To go live:

1. AdSense → Ads → By ad unit → create a display unit per placement.
2. Copy its numeric `data-ad-slot` value into the matching `slot` field.
3. Rebuild.

The AdSense loader script is *always* present when `ADS_CONFIG.enabled` is
true, independent of whether any slot is filled — AdSense needs to find it
to verify and review the site in the first place.

### Consent (required before EEA/UK traffic sees ads)

`ConsentMode.astro` sets Google Consent Mode v2 defaults: denied for the
EEA, UK, and Switzerland; granted elsewhere. It runs before gtag.js and
before the AdSense loader, which is the only order in which those defaults
apply.

**This is not a CMP and does not by itself make the site compliant.** Google
requires a *certified* CMP to serve ads to EEA/UK visitors, and a homegrown
banner does not qualify. The remaining step is manual:

> AdSense console → Privacy & messaging → GDPR → create and publish the
> message. Do the same under CCPA for US state privacy laws.

Google's own CMP is free and certified. Once published it loads on every
page, shows the message, and calls `gtag('consent', 'update', …)` itself —
the defaults set here are exactly what it expects to find already in place.

Until that CMP is published, EEA visitors see **no ads at all**. That is the
correct compliant failure mode, not a bug to work around.

The **Cookie Settings** control in the footer calls
`googlefc.showRevocationMessage()` so visitors can withdraw consent as
easily as they gave it, which GDPR requires. It stays hidden until the CMP
reports itself present, so it never renders as a dead control.

---

## Known gaps

- **Tool widget UI is still English.** Translating the ~30 React components'
  internal strings is a separate piece of work; the scaffolding
  (`makeFormatters`, the `lang` prop) is already threaded through the five
  islands that display numbers and dates, so extending it is mechanical.
- **Legal pages are English-only.** They are jurisdiction-specific and
  translating them without legal review would be worse than not translating
  them. Every localized footer links to them and says so.
- **No RTL locale ships yet.** `dir` is driven from the locale table and
  already renders on `<html>`, but no stylesheet work has been done for
  Arabic or Hebrew.
- **OG images are English.** Every locale shares `/og/{tool}.png`.
