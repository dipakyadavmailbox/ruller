import { useState } from 'react'
import { getRecent, clearRecent, removeRecent, relativeTime } from './workspaceStorage.js'

// ─── RecentFilesPanel ─────────────────────────────────────────────────────────
export default function RecentFilesPanel({ refreshKey }) {
  const [items, setItems] = useState(() => getRecent())

  // Refresh list when parent signals a new file was added
  const refresh = () => setItems(getRecent())

  // Expose refresh via key change effect
  useState(() => { refresh() }, [refreshKey])

  const handleClear = () => {
    clearRecent()
    setItems([])
  }

  const handleRemove = (id) => {
    removeRecent(id)
    setItems(getRecent())
  }

  return (
    <aside aria-label="Recent files" style={styles.panel}>
      <div style={styles.header}>
        <span style={styles.heading}>RECENT FILES</span>
        {items.length > 0 && (
          <button onClick={handleClear} style={styles.clearBtn} aria-label="Clear all recent files">
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div style={styles.empty}>
          <span style={{ fontSize: 28 }}>📂</span>
          <div style={styles.emptyTitle}>No recent files</div>
          <div style={styles.emptySub}>Drop a file to get started</div>
        </div>
      ) : (
        <ul style={styles.list} aria-label="Recent file list">
          {items.map((item) => (
            <li key={item.id} style={styles.item}>
              <div style={styles.itemLeft}>
                <span style={{ ...styles.itemIcon, color: item.color || 'var(--ink-dim)' }}>
                  {item.icon || '📁'}
                </span>
                <div style={styles.itemInfo}>
                  <div style={styles.itemName} title={item.name}>{item.name}</div>
                  <div style={styles.itemMeta}>
                    <a href={item.toolSlug} style={styles.toolLink} aria-label={`Reopen ${item.toolName}`}>
                      {item.toolName}
                    </a>
                    <span style={styles.dot}>·</span>
                    <span style={styles.time}>{relativeTime(item.timestamp)}</span>
                  </div>
                  <div style={styles.itemSize}>{item.size}</div>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                style={styles.removeBtn}
                aria-label={`Remove ${item.name} from recent files`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Privacy note */}
      <div style={styles.privacyNote}>
        🔒 Stored locally · Nothing uploaded
      </div>
    </aside>
  )
}

const styles = {
  panel: {
    width: 240,
    flexShrink: 0,
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 16,
    padding: '12px 0',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 80px)',
    position: 'sticky',
    top: 80,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 14px 10px',
    borderBottom: '1px solid var(--panel-border)',
    marginBottom: 4,
  },
  heading: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '1.2px',
    color: 'var(--ink-faint)',
    fontFamily: 'var(--font-mono)',
  },
  clearBtn: {
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--ink-faint)',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    transition: 'color 120ms ease',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 8,
    padding: '32px 16px',
    textAlign: 'center',
  },
  emptyTitle: { fontSize: 13, fontWeight: 700, color: 'var(--ink-dim)' },
  emptySub:   { fontSize: 11, color: 'var(--ink-faint)', lineHeight: 1.5 },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: '4px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 6,
    padding: '8px 6px',
    borderRadius: 9,
    transition: 'background 120ms ease',
    cursor: 'default',
  },
  itemLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    flex: 1,
    minWidth: 0,
  },
  itemIcon: {
    fontSize: 18,
    flexShrink: 0,
    marginTop: 1,
  },
  itemInfo: { flex: 1, minWidth: 0 },
  itemName: {
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--ink)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: 3,
  },
  itemMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
  },
  toolLink: {
    fontSize: 10,
    fontWeight: 700,
    color: 'var(--accent)',
    textDecoration: 'none',
    fontFamily: 'var(--font-mono)',
  },
  dot: { fontSize: 10, color: 'var(--ink-faint)' },
  time: { fontSize: 10, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' },
  itemSize: { fontSize: 10, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)', marginTop: 1 },
  removeBtn: {
    width: 20,
    height: 20,
    border: 'none',
    background: 'transparent',
    color: 'var(--ink-faint)',
    fontSize: 16,
    cursor: 'pointer',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    flexShrink: 0,
    transition: 'color 120ms ease',
  },
  privacyNote: {
    fontSize: 10,
    color: 'var(--ink-faint)',
    textAlign: 'center',
    padding: '10px 14px 4px',
    borderTop: '1px solid var(--panel-border)',
    marginTop: 4,
    fontFamily: 'var(--font-mono)',
  },
}
