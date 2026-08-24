import { formatDate, activeLocale } from '../../../i18n/format.js'

// ─── Workspace localStorage Storage Helpers ───────────────────────────────────
// All keys prefixed `rkt:` to avoid collisions with other site localStorage usage.
// No file content is EVER stored — only metadata.

const KEY = {
  pinned:           'rkt:pinnedTools',
  recent:           'rkt:recentFiles',
  visited:          'rkt:workspaceVisited',
  sidebarCollapsed: 'rkt:sidebarCollapsed',
  lastTool:         'rkt:lastActiveTool',
}

// ─── Safe JSON helpers ────────────────────────────────────────────────────────
function safeGet(key, fallback) {
  try   { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback }
  catch { return fallback }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) }
  catch { /* quota exceeded or private mode */ }
}

// ─── Pinned Tools ─────────────────────────────────────────────────────────────
export function getPinned()         { return safeGet(KEY.pinned, []) }
export function setPinned(slugs)    { safeSet(KEY.pinned, slugs.slice(0, 8)) }

export function pinTool(slug) {
  const current = getPinned()
  if (current.includes(slug) || current.length >= 8) return
  safeSet(KEY.pinned, [...current, slug])
}

export function unpinTool(slug) {
  safeSet(KEY.pinned, getPinned().filter((s) => s !== slug))
}

export function isPinned(slug) {
  return getPinned().includes(slug)
}

// ─── Recent Files ─────────────────────────────────────────────────────────────
// Stores metadata ONLY — no file bytes.
export function getRecent()         { return safeGet(KEY.recent, []) }

export function addRecent(entry) {
  // entry: { id, name, size, rawSize, mimeType, fileType, icon, toolSlug, toolName, timestamp }
  const list = getRecent().filter((e) => e.name !== entry.name) // dedupe by name
  list.unshift(entry)
  safeSet(KEY.recent, list.slice(0, 10)) // max 10
}

export function clearRecent()       { safeSet(KEY.recent, []) }
export function removeRecent(id)    { safeSet(KEY.recent, getRecent().filter((e) => e.id !== id)) }

// ─── Visit flag ───────────────────────────────────────────────────────────────
export function isFirstVisit() {
  const v = localStorage.getItem(KEY.visited)
  if (!v) { safeSet(KEY.visited, true); return true }
  return false
}

// ─── Sidebar state ────────────────────────────────────────────────────────────
export function getSidebarCollapsed()        { return safeGet(KEY.sidebarCollapsed, false) }
export function setSidebarCollapsed(val)     { safeSet(KEY.sidebarCollapsed, val) }

// ─── Last active tool ─────────────────────────────────────────────────────────
export function getLastTool()               { return safeGet(KEY.lastTool, null) }
export function setLastTool(slug)           { safeSet(KEY.lastTool, slug) }

// ─── Relative timestamp formatting ───────────────────────────────────────────
export function relativeTime(timestamp) {
  const diff = Date.now() - timestamp
  const s    = Math.floor(diff / 1000)
  if (s < 10)   return 'Just now'
  if (s < 60)   return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60)   return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24)   return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d === 1)  return 'Yesterday'
  if (d < 7)    return `${d}d ago`
  return formatDate(new Date(timestamp), activeLocale(), { month: 'short', day: 'numeric' })
}

// ─── Onboarding ───────────────────────────────────────────────────────────────
export function isOnboardingDone() { return safeGet('rkt:onboardingDone', false) }
export function markOnboardingDone() { safeSet('rkt:onboardingDone', true) }

