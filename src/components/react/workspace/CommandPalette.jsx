import { useState, useEffect, useCallback, useRef } from 'react'
import { WORKSPACE_TOOLS } from './toolRoutes.js'

// ─── Fuzzy search scorer ──────────────────────────────────────────────────────
function score(query, tool) {
  if (!query) return 0
  const q       = query.toLowerCase().trim()
  const target  = `${tool.name} ${tool.category} ${tool.keywords.join(' ')}`.toLowerCase()

  // Exact substring — highest score
  if (target.includes(q)) return 100

  // Word-start match
  const words = target.split(/\s+/)
  if (words.some((w) => w.startsWith(q))) return 70

  // Sequential character match
  let i = 0, pts = 0
  for (const ch of target) {
    if (ch === q[i]) { pts++; i++ }
    if (i === q.length) return pts
  }
  return i > 0 ? pts : -1
}

// ─── CommandPalette ────────────────────────────────────────────────────────────
export default function CommandPalette({ isOpen, onClose }) {
  const [query,    setQuery]    = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef   = useRef(null)
  const listRef    = useRef(null)

  // Filtered + sorted results
  const results = query.trim()
    ? WORKSPACE_TOOLS
        .map((t) => ({ tool: t, s: score(query, t) }))
        .filter(({ s }) => s >= 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 8)
        .map(({ tool }) => tool)
    : WORKSPACE_TOOLS.slice(0, 8)

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Clamp selected index when results change
  useEffect(() => {
    setSelected((s) => Math.min(s, Math.max(0, results.length - 1)))
  }, [results.length])

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelected((s) => (s + 1) % results.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelected((s) => (s - 1 + results.length) % results.length)
        break
      case 'Enter':
        e.preventDefault()
        if (results[selected]) {
          window.location.href = results[selected].slug
        }
        break
      case 'Escape':
        onClose()
        break
    }
  }, [isOpen, results, selected, onClose])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        style={styles.overlay}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-label="Quick launch — search tools"
        aria-modal="true"
        style={styles.modal}
      >
        {/* Search input */}
        <div style={styles.searchRow}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            ref={inputRef}
            id="command-palette-input"
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
            placeholder="Search tools…"
            style={styles.input}
            aria-label="Search tools"
            aria-autocomplete="list"
            aria-controls="command-palette-list"
            aria-activedescendant={results[selected] ? `cmd-item-${selected}` : undefined}
          />
          <kbd style={styles.escKbd} onClick={onClose}>Esc</kbd>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Results */}
        <ul
          id="command-palette-list"
          ref={listRef}
          role="listbox"
          aria-label="Tool results"
          style={styles.list}
        >
          {results.length === 0 ? (
            <li style={styles.empty}>No tools match "{query}"</li>
          ) : (
            results.map((tool, idx) => {
              const isSelected = idx === selected
              return (
                <li
                  key={tool.slug}
                  id={`cmd-item-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setSelected(idx)}
                  onClick={() => { window.location.href = tool.slug }}
                  style={{
                    ...styles.item,
                    background:  isSelected ? 'var(--accent-light)' : 'transparent',
                    borderLeft:  isSelected ? `3px solid var(--accent)` : '3px solid transparent',
                    cursor:      'pointer',
                  }}
                >
                  <span style={{ ...styles.itemIcon, background: tool.color + '20' }}>
                    {tool.icon}
                  </span>
                  <div style={styles.itemBody}>
                    <span style={{ ...styles.itemName, color: isSelected ? 'var(--accent)' : 'var(--ink)' }}>
                      {tool.name}
                    </span>
                    <span style={styles.itemCat}>{tool.category}</span>
                  </div>
                  {isSelected && <span style={styles.enterHint}>↵</span>}
                </li>
              )
            })
          )}
        </ul>

        {/* Footer hint */}
        <div style={styles.footer}>
          <span style={styles.hint}><kbd style={styles.kbd}>↑↓</kbd> navigate</span>
          <span style={styles.hint}><kbd style={styles.kbd}>↵</kbd> open</span>
          <span style={styles.hint}><kbd style={styles.kbd}>Esc</kbd> close</span>
        </div>
      </div>
    </>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.55)',
    backdropFilter: 'blur(4px)',
    zIndex: 9998,
    animation: 'fadeIn 150ms ease',
  },
  modal: {
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 560,
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 18,
    boxShadow: '0 32px 64px -16px rgba(0,0,0,0.6), var(--glow-accent)',
    zIndex: 9999,
    overflow: 'hidden',
    animation: 'scaleIn 150ms ease-out',
  },
  searchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 16px',
  },
  searchIcon: { fontSize: 16, flexShrink: 0 },
  input: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    color: 'var(--ink)',
    fontSize: 16,
    fontWeight: 600,
    fontFamily: 'var(--font-sans)',
    outline: 'none',
  },
  escKbd: {
    padding: '3px 8px',
    border: '1px solid var(--panel-border)',
    borderRadius: 5,
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
    color: 'var(--ink-faint)',
    background: 'var(--btn-idle-bg)',
    cursor: 'pointer',
    flexShrink: 0,
  },
  divider: {
    height: 1,
    background: 'var(--panel-border)',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: '6px',
    maxHeight: 340,
    overflowY: 'auto',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 9,
    borderLeft: '3px solid transparent',
    transition: 'background 80ms ease',
  },
  itemIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    flexShrink: 0,
  },
  itemBody: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  itemName: {
    fontSize: 13,
    fontWeight: 700,
    transition: 'color 80ms ease',
  },
  itemCat: {
    fontSize: 11,
    color: 'var(--ink-faint)',
    letterSpacing: '0.3px',
  },
  enterHint: {
    fontSize: 14,
    color: 'var(--accent)',
    fontWeight: 800,
    flexShrink: 0,
  },
  empty: {
    padding: '24px',
    textAlign: 'center',
    color: 'var(--ink-faint)',
    fontSize: 13,
  },
  footer: {
    borderTop: '1px solid var(--panel-border)',
    padding: '10px 16px',
    display: 'flex',
    gap: 16,
    background: 'var(--btn-idle-bg)',
  },
  hint: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 11,
    color: 'var(--ink-faint)',
  },
  kbd: {
    padding: '2px 5px',
    border: '1px solid var(--panel-border)',
    borderRadius: 4,
    fontSize: 10,
    fontFamily: 'var(--font-mono)',
    color: 'var(--ink-dim)',
    background: 'var(--panel-bg)',
  },
}
