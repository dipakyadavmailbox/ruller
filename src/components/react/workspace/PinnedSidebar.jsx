import { useState } from 'react'
import { WORKSPACE_TOOLS } from './toolRoutes.js'
import { getPinned, unpinTool, pinTool, setPinned } from './workspaceStorage.js'

// ─── PinnedSidebar — left rail with pinned + full tool list ──────────────────
export default function PinnedSidebar({ collapsed, onToggleCollapse, onPinChange }) {
  const [pinnedSlugs, setPinnedSlugs] = useState(() => getPinned())
  const [hover,        setHover]       = useState(null)
  const [dragIndex,    setDragIndex]   = useState(null)
  const [dragOver,     setDragOver]    = useState(null)

  const refresh = () => {
    setPinnedSlugs(getPinned())
    onPinChange?.()
  }

  const handleUnpin = (slug) => {
    unpinTool(slug)
    refresh()
  }

  // ─── Drag-to-reorder ──────────────────────────────────────────────────────
  const handleDragStart = (e, idx) => {
    setDragIndex(idx)
    e.dataTransfer.effectAllowed = 'move'
  }
  const handleDragOver = (e, idx) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOver(idx)
  }
  const handleDrop = (e, idx) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === idx) {
      setDragIndex(null); setDragOver(null); return
    }
    const reordered = [...pinnedSlugs]
    const [moved]   = reordered.splice(dragIndex, 1)
    reordered.splice(idx, 0, moved)
    setPinnedSlugs(reordered)
    setPinned(reordered)
    setDragIndex(null)
    setDragOver(null)
  }
  const handleDragEnd = () => { setDragIndex(null); setDragOver(null) }

  const pinnedTools = WORKSPACE_TOOLS.filter((t) => pinnedSlugs.includes(t.slug))
  const unpinnedTools = WORKSPACE_TOOLS.filter((t) => !pinnedSlugs.includes(t.slug))

  if (collapsed) {
    return (
      <div style={styles.collapsed}>
        <button
          onClick={onToggleCollapse}
          style={styles.collapseBtn}
          title="Expand sidebar"
          aria-label="Expand sidebar"
          aria-expanded="false"
        >
          ▶
        </button>
        {/* Icon-only tool list when collapsed */}
        <div style={styles.iconRail}>
          {WORKSPACE_TOOLS.map((tool) => (
            <a
              key={tool.slug}
              href={tool.slug}
              title={tool.name}
              aria-label={tool.name}
              style={styles.railIcon}
            >
              {tool.icon}
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <nav
      aria-label="Pinned Tools sidebar"
      style={styles.sidebar}
    >
      {/* Header */}
      <div style={styles.sidebarHeader}>
        <span style={styles.sidebarTitle}>WORKSPACE</span>
        <button
          onClick={onToggleCollapse}
          style={styles.collapseBtn}
          title="Collapse sidebar"
          aria-label="Collapse sidebar"
          aria-expanded="true"
        >
          ◀
        </button>
      </div>

      {/* Pinned section */}
      {pinnedTools.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionLabel}>📌 PINNED</div>
          <ul style={styles.toolList} aria-label="Pinned tools">
            {pinnedTools.map((tool, idx) => (
              <li
                key={tool.slug}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e)  => handleDragOver(e, idx)}
                onDrop={(e)      => handleDrop(e, idx)}
                onDragEnd={handleDragEnd}
                onMouseEnter={() => setHover(tool.slug)}
                onMouseLeave={() => setHover(null)}
                style={{
                  ...styles.listItem,
                  opacity:   dragIndex === idx ? 0.4 : 1,
                  borderTop: dragOver === idx && dragIndex !== idx
                    ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'opacity 150ms ease, border-color 80ms ease',
                }}
              >
                {/* Drag grip */}
                <span
                  style={{
                    ...styles.grip,
                    opacity: hover === tool.slug ? 1 : 0,
                  }}
                  aria-hidden="true"
                  title="Drag to reorder"
                >
                  ⠿
                </span>
                <a href={tool.slug} style={styles.toolLink} aria-label={`Open ${tool.name}`}>
                  <span style={{ ...styles.toolDot, background: tool.color + '30', borderColor: tool.color + '55' }}>
                    {tool.icon}
                  </span>
                  <span style={styles.toolName}>{tool.navLabel}</span>
                </a>
                <button
                  onClick={() => handleUnpin(tool.slug)}
                  style={styles.unpinBtn}
                  title={`Unpin ${tool.navLabel}`}
                  aria-label={`Unpin ${tool.navLabel}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {pinnedTools.length === 0 && (
        <div style={styles.emptyPins}>
          <span style={{ fontSize: 20 }}>📍</span>
          <span style={{ fontSize: 12, color: 'var(--ink-faint)', lineHeight: 1.4, textAlign: 'center' }}>
            Pin tools from the grid below for quick access
          </span>
        </div>
      )}

      <div style={styles.divider} />

      {/* All tools section */}
      <div style={styles.section}>
        <div style={styles.sectionLabel}>ALL TOOLS</div>
        <ul style={styles.toolList} aria-label="All tools">
          {unpinnedTools.map((tool) => (
            <li key={tool.slug} style={styles.listItem}>
              <a href={tool.slug} style={styles.toolLink} aria-label={`Open ${tool.name}`}>
                <span style={{ ...styles.toolDot, background: 'var(--btn-idle-bg)', borderColor: 'var(--panel-border)' }}>
                  {tool.icon}
                </span>
                <span style={styles.toolName}>{tool.navLabel}</span>
              </a>
              <button
                onClick={() => { pinTool(tool.slug); refresh() }}
                style={styles.pinBtn}
                title={`Pin ${tool.navLabel}`}
                aria-label={`Pin ${tool.navLabel}`}
              >
                📌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

const styles = {
  sidebar: {
    width: 220,
    flexShrink: 0,
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 16,
    padding: '12px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 80px)',
    position: 'sticky',
    top: 80,
  },
  collapsed: {
    width: 52,
    flexShrink: 0,
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 16,
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 80px)',
    position: 'sticky',
    top: 80,
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 14px 8px',
    borderBottom: '1px solid var(--panel-border)',
    marginBottom: 4,
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '1.2px',
    color: 'var(--ink-faint)',
    fontFamily: 'var(--font-mono)',
  },
  collapseBtn: {
    width: 28,
    height: 28,
    border: '1px solid var(--panel-border)',
    borderRadius: 6,
    background: 'var(--btn-idle-bg)',
    color: 'var(--ink-faint)',
    fontSize: 10,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  section: {
    padding: '8px 0',
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: '1.2px',
    color: 'var(--ink-faint)',
    fontFamily: 'var(--font-mono)',
    padding: '0 14px 6px',
  },
  toolList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    padding: '0 8px',
  },
  toolLink: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 8px',
    borderRadius: 8,
    textDecoration: 'none',
    transition: 'background 120ms ease',
    minWidth: 0,
  },
  toolDot: {
    width: 28,
    height: 28,
    borderRadius: 7,
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    flexShrink: 0,
  },
  toolName: {
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--ink)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  unpinBtn: {
    width: 22,
    height: 22,
    border: 'none',
    background: 'transparent',
    color: 'var(--ink-faint)',
    fontSize: 16,
    cursor: 'pointer',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    lineHeight: 1,
  },
  pinBtn: {
    width: 22,
    height: 22,
    border: 'none',
    background: 'transparent',
    color: 'var(--ink-faint)',
    fontSize: 12,
    cursor: 'pointer',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    opacity: 0,
    transition: 'opacity 150ms ease',
  },
  emptyPins: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: '16px 14px',
    textAlign: 'center',
  },
  iconRail: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '100%',
    alignItems: 'center',
  },
  railIcon: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    fontSize: 18,
    textDecoration: 'none',
    transition: 'background 120ms ease',
  },
  divider: {
    height: 1,
    background: 'var(--panel-border)',
    margin: '4px 14px',
  },
  grip: {
    fontSize: 14,
    color: 'var(--ink-faint)',
    cursor: 'grab',
    padding: '0 4px',
    flexShrink: 0,
    transition: 'opacity 150ms ease',
    userSelect: 'none',
    lineHeight: 1,
  },
}
