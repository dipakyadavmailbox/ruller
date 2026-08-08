import { useState, useMemo } from 'react'
import { WORKSPACE_TOOLS, TOOL_CATEGORIES } from './toolRoutes.js'
import { isPinned, pinTool, unpinTool } from './workspaceStorage.js'

// ─── ToolGrid — filterable card grid of all tools ────────────────────────────
export default function ToolGrid({ onPinChange }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [pinnedState, setPinnedState]       = useState(() =>
    WORKSPACE_TOOLS.reduce((acc, t) => ({ ...acc, [t.slug]: isPinned(t.slug) }), {})
  )

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? WORKSPACE_TOOLS
      : WORKSPACE_TOOLS.filter((t) => t.category === activeCategory),
    [activeCategory]
  )

  const handlePin = (slug) => {
    const nowPinned = !pinnedState[slug]
    if (nowPinned) pinTool(slug)
    else           unpinTool(slug)
    setPinnedState((prev) => ({ ...prev, [slug]: nowPinned }))
    onPinChange?.()
  }

  return (
    <div>
      {/* ─── Category tabs ──────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Filter tools by category"
        style={styles.tabBar}
      >
        {TOOL_CATEGORIES.map((cat) => {
          const isActive = cat === activeCategory
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              id={`tool-category-${cat.toLowerCase().replace(/[^a-z]/g, '-')}`}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.tab,
                background:  isActive ? 'var(--accent-light)' : 'transparent',
                color:       isActive ? 'var(--accent)'       : 'var(--ink-dim)',
                border:      `1px solid ${isActive ? 'rgba(99,102,241,0.3)' : 'transparent'}`,
                fontWeight:  isActive ? 800 : 600,
              }}
            >
              {cat}
              <span style={{ ...styles.count, background: isActive ? 'var(--accent)' : 'var(--btn-idle-bg)', color: isActive ? '#fff' : 'var(--ink-faint)' }}>
                {cat === 'All' ? WORKSPACE_TOOLS.length : WORKSPACE_TOOLS.filter((t) => t.category === cat).length}
              </span>
            </button>
          )
        })}
      </div>

      {/* ─── Cards ──────────────────────────────────────────────────────── */}
      <div style={styles.grid}>
        {filtered.map((tool) => (
          <ToolCard
            key={tool.slug}
            tool={tool}
            pinned={!!pinnedState[tool.slug]}
            onPin={() => handlePin(tool.slug)}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Individual tool card ──────────────────────────────────────────────────────
function ToolCard({ tool, pinned, onPin }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      style={{
        ...styles.card,
        borderColor:  hover ? tool.color + '55' : 'var(--panel-border)',
        background:   hover ? tool.color + '0A' : 'var(--panel-bg)',
        transform:    hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow:    hover ? `0 8px 24px -8px ${tool.color}33` : 'none',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Pin button — visible on hover */}
      <button
        onClick={(e) => { e.preventDefault(); onPin() }}
        title={pinned ? 'Unpin tool' : 'Pin to sidebar'}
        aria-label={pinned ? `Unpin ${tool.name}` : `Pin ${tool.name} to sidebar`}
        style={{
          ...styles.pinBtn,
          opacity:    hover || pinned ? 1 : 0,
          color:      pinned ? 'var(--accent)' : 'var(--ink-faint)',
          background: pinned ? 'var(--accent-light)' : 'var(--btn-idle-bg)',
          border:     `1px solid ${pinned ? 'rgba(99,102,241,0.3)' : 'var(--panel-border)'}`,
        }}
      >
        {pinned ? '📌' : '📍'}
      </button>

      {/* Navigate to tool */}
      <a
        href={tool.slug}
        style={styles.cardLink}
        aria-label={`Open ${tool.name}`}
        id={`tool-card-${tool.slug.replace('/', '')}`}
      >
        <div style={{ ...styles.iconBox, background: tool.color + '20', borderColor: tool.color + '40' }}>
          <span style={styles.icon}>{tool.icon}</span>
        </div>
        <div style={styles.cardBody}>
          <div style={styles.cardName}>{tool.name}</div>
          <div style={styles.cardCategory}>{tool.category}</div>
          {tool.actions.length > 0 && (
            <div style={styles.actionPills}>
              {tool.actions.slice(0, 3).map((a) => (
                <span key={a} style={{ ...styles.actionPill, color: tool.color, borderColor: tool.color + '40', background: tool.color + '10' }}>
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>
        <span style={{ ...styles.arrow, color: hover ? tool.color : 'var(--ink-faint)' }}>→</span>
      </a>
    </div>
  )
}

const styles = {
  tabBar: {
    display: 'flex',
    gap: 4,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 12px',
    borderRadius: 8,
    fontSize: 12,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    fontFamily: 'var(--font-mono)',
    whiteSpace: 'nowrap',
  },
  count: {
    fontSize: 10,
    fontWeight: 800,
    padding: '1px 6px',
    borderRadius: 10,
    transition: 'all 150ms ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 10,
  },
  card: {
    position: 'relative',
    borderRadius: 14,
    border: '1px solid',
    transition: 'all 180ms ease',
    overflow: 'hidden',
  },
  pinBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    cursor: 'pointer',
    fontSize: 13,
    transition: 'opacity 150ms ease, background 150ms ease',
    zIndex: 1,
  },
  cardLink: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '14px',
    textDecoration: 'none',
    color: 'inherit',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: { fontSize: 22, lineHeight: 1 },
  cardBody: { flex: 1, minWidth: 0 },
  cardName: {
    fontSize: 13,
    fontWeight: 800,
    color: 'var(--ink)',
    lineHeight: 1.3,
    marginBottom: 3,
    paddingRight: 30,
  },
  cardCategory: {
    fontSize: 10,
    fontWeight: 700,
    color: 'var(--ink-faint)',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  actionPills: { display: 'flex', gap: 4, flexWrap: 'wrap' },
  actionPill: {
    fontSize: 10,
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    padding: '2px 7px',
    border: '1px solid',
    borderRadius: 10,
  },
  arrow: {
    fontSize: 16,
    fontWeight: 800,
    transition: 'color 150ms ease',
    flexShrink: 0,
    alignSelf: 'center',
  },
}
