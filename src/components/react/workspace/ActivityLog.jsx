import { useState } from 'react'

// ─── ActivityLog — ephemeral session log (cleared on page reload) ─────────────
// Uses component state only — intentionally NOT persisted to localStorage.
export default function ActivityLog({ entries }) {
  const [expanded, setExpanded] = useState(false)

  const TYPE_ICONS = {
    drop:     '📂',
    navigate: '🚀',
    pin:      '📌',
    copy:     '📋',
    clear:    '🗑️',
    search:   '🔍',
  }

  return (
    <div
      role="log"
      aria-label="Session activity log"
      aria-live="polite"
      style={{
        ...styles.root,
        maxHeight: expanded ? 200 : 48,
        transition: 'max-height 200ms ease',
      }}
    >
      {/* Header bar — always visible */}
      <div style={styles.bar} onClick={() => setExpanded((e) => !e)}>
        <div style={styles.barLeft}>
          <span style={styles.barIcon}>📋</span>
          <span style={styles.barLabel}>Activity Log</span>
          {entries.length > 0 && (
            <span style={styles.count}>{entries.length}</span>
          )}
          {entries.length > 0 && (
            <span style={styles.lastEntry} aria-hidden="true">
              — {entries[0]?.message}
            </span>
          )}
        </div>
        <button
          style={styles.toggleBtn}
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse activity log' : 'Expand activity log'}
          onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v) }}
        >
          {expanded ? '▾' : '▴'}
        </button>
      </div>

      {/* Scrollable log */}
      {expanded && (
        <div style={styles.logBody}>
          {entries.length === 0 ? (
            <div style={styles.empty}>No activity yet this session.</div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} style={styles.entry}>
                <span style={styles.entryIcon}>{TYPE_ICONS[entry.type] || '•'}</span>
                <span style={styles.entryTime}>
                  {new Date(entry.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span style={styles.entryMsg}>{entry.message}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

const styles = {
  root: {
    background: 'var(--canvas)',
    border: '1px solid var(--panel-border)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  bar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 14px',
    height: 48,
    cursor: 'pointer',
    flexShrink: 0,
  },
  barLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    overflow: 'hidden',
    flex: 1,
    minWidth: 0,
  },
  barIcon: { fontSize: 14, flexShrink: 0 },
  barLabel: {
    fontSize: 11,
    fontWeight: 800,
    color: 'var(--ink-faint)',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.6px',
    flexShrink: 0,
  },
  count: {
    fontSize: 10,
    fontWeight: 800,
    background: 'var(--accent-light)',
    color: 'var(--accent)',
    border: '1px solid rgba(99,102,241,0.3)',
    borderRadius: 10,
    padding: '1px 6px',
    fontFamily: 'var(--font-mono)',
    flexShrink: 0,
  },
  lastEntry: {
    fontSize: 11,
    color: 'var(--ink-faint)',
    fontFamily: 'var(--font-mono)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    minWidth: 0,
  },
  toggleBtn: {
    border: 'none',
    background: 'transparent',
    color: 'var(--ink-faint)',
    fontSize: 14,
    cursor: 'pointer',
    padding: '4px 8px',
    flexShrink: 0,
  },
  logBody: {
    overflowY: 'auto',
    maxHeight: 152,
    borderTop: '1px solid var(--panel-border)',
    padding: '6px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  entry: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    padding: '4px 6px',
    borderRadius: 6,
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
    lineHeight: 1.4,
  },
  entryIcon: { flexShrink: 0, fontSize: 12 },
  entryTime: { color: 'var(--ink-faint)', flexShrink: 0 },
  entryMsg:  { color: 'var(--ink-dim)', wordBreak: 'break-word' },
  empty: {
    padding: '16px',
    textAlign: 'center',
    color: 'var(--ink-faint)',
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
  },
}
