// ─────────────────────────────────────────────────────────────────────────
// ADSENSE CONFIG — the only place ad identifiers live.
//
// HOW TO GO LIVE
//   1. In AdSense → Ads → By ad unit, create a display unit per placement
//      below and copy its numeric data-ad-slot value.
//   2. Paste it into the matching `slot` field. That placement starts
//      serving on the next build.
//   3. Leave `slot: ''` for placements you have not created yet — AdUnit
//      renders nothing at all rather than requesting an invalid slot.
//
// WHY EMPTY SLOTS RENDER NOTHING
//   The previous implementation shipped data-ad-slot="auto", which is not a
//   valid slot id. Every such <ins> is a failed ad request; a review crawl
//   that sees a page full of them reads as a broken or policy-violating
//   implementation. An absent unit is strictly safer than a broken one.
// ─────────────────────────────────────────────────────────────────────────

export const ADS_CONFIG = {
  // Your publisher id, without the 'ca-' prefix handled below.
  publisherId: 'ca-pub-1415591576482669',

  // Master switch. Set false to strip every ad script and unit from the
  // build — useful for a staging deploy that must not serve ads.
  enabled: true,

  // Auto ads let Google place units itself, in addition to the manual
  // placements below. Keep this off while manual slots are being tuned:
  // running both tends to over-stuff pages, which is its own policy risk.
  autoAds: false,

  /**
   * Named placements. `name` is what pages pass to <AdUnit placement="…" />.
   *
   * format:
   *   'auto'      responsive display banner
   *   'fluid'     in-article native unit
   *   'rectangle' fixed 300x250
   *
   * minHeight reserves space before the ad loads. Getting this right is
   * what keeps Cumulative Layout Shift out of the red, and CLS is a
   * ranking factor as well as an ad-viewability one.
   */
  placements: {
    inArticle: { slot: '', format: 'fluid', minHeight: 250 },
    belowTool: { slot: '', format: 'auto', minHeight: 100 },
    footer: { slot: '', format: 'auto', minHeight: 100 },
    sidebar: { slot: '', format: 'rectangle', minHeight: 250 },
  },
}

/** Resolve a placement name to its config, or null if it is not defined. */
export function getPlacement(name) {
  return ADS_CONFIG.placements[name] || null
}

/**
 * True when this placement should actually render. Requires the master
 * switch, a known placement, and a non-empty slot id.
 */
export function isPlacementLive(name) {
  if (!ADS_CONFIG.enabled) return false
  const placement = getPlacement(name)
  return Boolean(placement && placement.slot)
}

/** True when any placement at all is configured, or auto ads are on. */
export function hasLiveAds() {
  if (!ADS_CONFIG.enabled) return false
  if (ADS_CONFIG.autoAds) return true
  return Object.keys(ADS_CONFIG.placements).some((name) => isPlacementLive(name))
}

/**
 * Whether the adsbygoogle loader belongs in <head>.
 *
 * Deliberately NOT gated on hasLiveAds(): AdSense verifies site ownership
 * and reviews the site by finding this script on the pages. Pulling it
 * while slot ids are still blank would stall the review that produces
 * those very slot ids.
 */
export function shouldLoadAdsScript() {
  return ADS_CONFIG.enabled
}

export const ADSENSE_SCRIPT_URL =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' +
  ADS_CONFIG.publisherId
