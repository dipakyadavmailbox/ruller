import { useState, useEffect, useCallback } from 'react'
import DropZone                from './DropZone.jsx'
import ActionPanel             from './ActionPanel.jsx'
import MultiDropPanel          from './MultiDropPanel.jsx'
import ToolGrid                from './ToolGrid.jsx'
import CommandPalette          from './CommandPalette.jsx'
import KeyboardShortcutsModal  from './KeyboardShortcutsModal.jsx'
import PinnedSidebar           from './PinnedSidebar.jsx'
import RecentFilesPanel        from './RecentFilesPanel.jsx'
import ActivityLog             from './ActivityLog.jsx'
import OnboardingOverlay       from './OnboardingOverlay.jsx'
import { addRecent, getSidebarCollapsed, setSidebarCollapsed } from './workspaceStorage.js'

// Helper: is cursor inside an editable element?
function isInputFocused() {
  const tag = document.activeElement?.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' ||
    document.activeElement?.contentEditable === 'true'
}

// ─── Workspace root ────────────────────────────────────────────────────────────
export default function Workspace() {
  const [detection,        setDetection]       = useState(null)    // single file
  const [multiResult,      setMultiResult]     = useState(null)    // multi-file
  const [paletteOpen,      setPaletteOpen]     = useState(false)
  const [shortcutsOpen,    setShortcutsOpen]   = useState(false)
  const [sidebarCollapsed, _setSidebarCollapsed] = useState(() => getSidebarCollapsed())
  const [activityLog,      setActivityLog]     = useState([])
  const [recentKey,        setRecentKey]       = useState(0)
  const [isFirstVisit,     setIsFirstVisit]    = useState(false)
  const [showOnboarding,   setShowOnboarding]  = useState(false)
  const [pinVersion,       setPinVersion]      = useState(0)

  // ─── First visit + onboarding ────────────────────────────────────────────────
  useEffect(() => {
    try {
      const visited = localStorage.getItem('rkt:workspaceVisited')
      const done    = localStorage.getItem('rkt:onboardingDone')
      if (!visited) {
        localStorage.setItem('rkt:workspaceVisited', 'true')
        setIsFirstVisit(true)
        if (!done) {
          setTimeout(() => setShowOnboarding(true), 900)
        }
      }
    } catch { /* private mode */ }
  }, [])

  // ─── Sidebar collapse ────────────────────────────────────────────────────────
  const toggleSidebar = useCallback(() => {
    _setSidebarCollapsed((prev) => { setSidebarCollapsed(!prev); return !prev })
  }, [])

  // ─── Activity log ────────────────────────────────────────────────────────────
  const log = useCallback((type, message) => {
    const entry = { id: Math.random().toString(36).slice(2), timestamp: Date.now(), type, message }
    setActivityLog((prev) => [entry, ...prev].slice(0, 50))
  }, [])

  // ─── Global keyboard shortcuts ────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      // ⌘K / Ctrl+K — command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShortcutsOpen(false)
        setPaletteOpen(true)
        log('search', 'Opened quick launch (⌘K)')
        return
      }
      // Alt+S — toggle sidebar
      if (e.altKey && e.key === 's') {
        e.preventDefault()
        toggleSidebar()
        return
      }
      // ? — shortcuts modal (only when not in an input)
      if (e.key === '?' && !isInputFocused()) {
        e.preventDefault()
        setPaletteOpen(false)
        setShortcutsOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [log, toggleSidebar])

  // ─── Single-file detected callback ───────────────────────────────────────────
  const handleFileDetected = useCallback((result) => {
    setMultiResult(null)
    setDetection(result)
    log('drop', `Dropped: ${result.fileName} (${result.fileType}, ${result.fileSize})`)

    if (result.primaryTool) {
      addRecent({
        id:        Math.random().toString(36).slice(2),
        name:      result.fileName,
        size:      result.fileSize,
        rawSize:   result.rawSize,
        mime:      result.mime,
        fileType:  result.fileType,
        icon:      result.icon,
        color:     result.color,
        toolSlug:  result.primaryTool.slug,
        toolName:  result.primaryTool.navLabel || result.primaryTool.name,
        timestamp: Date.now(),
      })
      setRecentKey((k) => k + 1)
    }
  }, [log])

  // ─── Multi-file detected callback ────────────────────────────────────────────
  const handleMultiFileDetected = useCallback((result) => {
    setDetection(null)
    setMultiResult(result)
    log('drop', `Dropped ${result.totalCount} files (${Object.keys(result.groups).join(', ')})`)
  }, [log])

  const handleToolSelect = useCallback((tool) => {
    log('navigate', `Opened ${tool.name}`)
  }, [log])

  const handleClear = () => {
    setDetection(null)
    setMultiResult(null)
    log('clear', 'Cleared file selection')
  }

  const showDropZone = !detection && !multiResult

  return (
    <div className="workspace-root" style={styles.root}>
      {/* ─── Animations + responsive CSS ────────────────────────────────── */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: translateX(-50%) scale(0.94); }
          to   { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes popIn {
          0%   { transform: scale(0.5); }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        .workspace-tool-link:hover { background: var(--btn-idle-bg); }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration:  0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
        @media (max-width: 1100px) { .ws-recent-panel { display: none !important; } }
        @media (max-width: 768px)  { .ws-sidebar { display: none !important; } .ws-main { padding: 12px !important; } }
      `}</style>

      {/* ─── Top bar ────────────────────────────────────────────────────── */}
      <div style={styles.topBar}>
        <div style={styles.topLeft}>
          <span style={styles.topTitle}>🚀 Workspace</span>
          {isFirstVisit && <span style={styles.newBadge}>Welcome!</span>}
        </div>
        <div style={styles.topRight}>
          <button
            id="workspace-search-btn"
            onClick={() => { setShortcutsOpen(false); setPaletteOpen(true) }}
            style={styles.kbdBtn}
            aria-label="Open quick launch (Ctrl+K)"
            title="Quick launch (Ctrl+K / ⌘K)"
          >
            <span>🔍 Search tools</span>
            <kbd style={styles.kbd}>⌘K</kbd>
          </button>
          <button
            id="workspace-shortcuts-btn"
            onClick={() => { setPaletteOpen(false); setShortcutsOpen((v) => !v) }}
            style={styles.shortcutsBtn}
            aria-label="Keyboard shortcuts (?)"
            title="Keyboard shortcuts (?)"
          >
            <kbd style={styles.questionKbd}>?</kbd>
          </button>
        </div>
      </div>

      {/* ─── 3-column body ──────────────────────────────────────────────── */}
      <div style={styles.body}>
        {/* Sidebar */}
        <div className="ws-sidebar">
          <PinnedSidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={toggleSidebar}
            onPinChange={() => setPinVersion((v) => v + 1)}
          />
        </div>

        {/* Main */}
        <div className="ws-main" style={styles.main}>
          {/* Drop zone / Action panel / Multi panel */}
          <section aria-label="File drop area" style={{ marginBottom: 24 }}>
            {detection && (
              <ActionPanel
                detection={detection}
                onClear={handleClear}
                onToolSelect={handleToolSelect}
              />
            )}
            {multiResult && (
              <MultiDropPanel
                multiResult={multiResult}
                onClear={handleClear}
                onNavigate={handleToolSelect}
              />
            )}
            {showDropZone && (
              <DropZone
                onFileDetected={handleFileDetected}
                onMultiFileDetected={handleMultiFileDetected}
              />
            )}
          </section>

          {/* Tool grid */}
          <section aria-label="All tools" style={{ marginBottom: 16 }}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>All Tools</h2>
              <span style={styles.sectionCount}>14 tools</span>
            </div>
            <div id="tool-grid-root">
              <ToolGrid
                key={pinVersion}
                onPinChange={() => setPinVersion((v) => v + 1)}
              />
            </div>
          </section>

          {/* Activity log */}
          <ActivityLog entries={activityLog} />
        </div>

        {/* Recent files panel */}
        <div className="ws-recent-panel">
          <RecentFilesPanel refreshKey={recentKey} />
        </div>
      </div>

      {/* ─── Modals ─────────────────────────────────────────────────────── */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
      <KeyboardShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
      {showOnboarding && (
        <OnboardingOverlay onDismiss={() => setShowOnboarding(false)} />
      )}
    </div>
  )
}

const styles = {
  root: {
    minHeight: '100vh',
    background: 'var(--bg)',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    borderBottom: '1px solid var(--panel-border)',
    background: 'var(--panel-bg)',
    backdropFilter: 'blur(12px)',
    flexShrink: 0,
  },
  topLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  topTitle: {
    fontSize: 15,
    fontWeight: 900,
    color: 'var(--ink)',
    letterSpacing: '-0.3px',
  },
  newBadge: {
    fontSize: 10,
    fontWeight: 800,
    color: 'var(--accent)',
    background: 'var(--accent-light)',
    border: '1px solid rgba(99,102,241,0.3)',
    borderRadius: 10,
    padding: '2px 8px',
    fontFamily: 'var(--font-mono)',
  },
  topRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  kbdBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '7px 14px',
    border: '1px solid var(--panel-border)',
    borderRadius: 10,
    background: 'var(--btn-idle-bg)',
    color: 'var(--ink-dim)',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'border-color 150ms ease',
  },
  shortcutsBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    border: '1px solid var(--panel-border)',
    borderRadius: 10,
    background: 'var(--btn-idle-bg)',
    cursor: 'pointer',
    transition: 'border-color 150ms ease',
  },
  questionKbd: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--ink-dim)',
    background: 'transparent',
    border: 'none',
    padding: 0,
  },
  kbd: {
    padding: '2px 6px',
    border: '1px solid var(--panel-border)',
    borderRadius: 5,
    fontSize: 10,
    fontFamily: 'var(--font-mono)',
    color: 'var(--ink-faint)',
    background: 'var(--panel-bg)',
  },
  body: {
    display: 'flex',
    gap: 16,
    padding: '16px 24px',
    flex: 1,
    alignItems: 'flex-start',
    overflow: 'auto',
  },
  main: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 800,
    color: 'var(--ink)',
    margin: 0,
  },
  sectionCount: {
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--ink-faint)',
    fontFamily: 'var(--font-mono)',
    background: 'var(--btn-idle-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 10,
    padding: '1px 7px',
  },
}
