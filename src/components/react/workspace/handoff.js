// ─── File Handoff Bridge — sessionStorage between workspace and tool pages ─────
// TTL: 60 seconds. Only metadata stored — no file bytes.

const KEY = 'rkt:handoff'
const TTL = 60_000 // 60 seconds

/**
 * Write handoff payload to sessionStorage before navigating to a tool page.
 * @param {{ fileName, fileType, fileSize, mime, toolSlug, tabTarget? }} payload
 */
export function writeHandoff(payload) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ ...payload, timestamp: Date.now() }))
  } catch { /* quota or private mode */ }
}

/**
 * Read and validate handoff from sessionStorage.
 * Returns null if: key missing, wrong tool slug, or entry older than 60s.
 * @param {string} expectedSlug — the slug of the current tool page
 */
export function readHandoff(expectedSlug) {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const entry = JSON.parse(raw)
    const isValid = entry.toolSlug === expectedSlug
    const isFresh = Date.now() - entry.timestamp < TTL
    if (isValid && isFresh) return entry
  } catch { /* malformed JSON */ }
  return null
}

/**
 * Clear the handoff from sessionStorage after it has been consumed.
 * Call this after the tool page has read and acted on the handoff.
 */
export function clearHandoff() {
  try { sessionStorage.removeItem(KEY) } catch {}
}
