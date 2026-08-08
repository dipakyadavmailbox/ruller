import { useState, useEffect } from 'react'

// ─── HandoffBanner — shown at top of tool pages after workspace handoff ────────
// Reads from sessionStorage via the handoff prop (already consumed by parent).
// Auto-dismisses after 30 seconds.

export default function HandoffBanner({ handoff, onDismiss }) {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  // Auto-dismiss after 30 seconds
  useEffect(() => {
    if (!handoff) return
    const timer = setTimeout(() => dismiss(), 30_000)
    return () => clearTimeout(timer)
  }, [handoff])

  const dismiss = () => {
    setExiting(true)
    setTimeout(() => { setVisible(false); onDismiss?.() }, 220)
  }

  if (!handoff || !visible) return null

  return (
    <>
      <style>{`
        @keyframes handoffSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes handoffSlideUp {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .handoff-banner { animation: none !important; }
        }
      `}</style>
      <div
        className="handoff-banner"
        role="status"
        aria-label="File detected from Workspace"
        style={{
          ...styles.banner,
          animation: exiting
            ? 'handoffSlideUp 220ms ease-in forwards'
            : 'handoffSlideDown 250ms ease-out',
        }}
      >
        <span style={styles.fileIcon}>{handoff.icon || '📂'}</span>

        <div style={styles.info}>
          <span style={styles.fileName}>{handoff.fileName}</span>
          <span style={styles.fileMeta}>
            {handoff.fileType}
            {handoff.fileSize ? ` · ${handoff.fileSize}` : ''}
            {' '}— drop it below to continue
          </span>
        </div>

        <div style={styles.actions}>
          <a
            href="/workspace"
            style={styles.backLink}
            aria-label="Back to Workspace"
          >
            ← Workspace
          </a>
          <button
            onClick={dismiss}
            style={styles.dismissBtn}
            aria-label="Dismiss handoff banner"
          >
            ×
          </button>
        </div>
      </div>
    </>
  )
}

const styles = {
  banner: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    background: 'var(--accent-light)',
    border: '1px solid rgba(99,102,241,0.3)',
    borderRadius: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  fileIcon: { fontSize: 20, flexShrink: 0 },
  info: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
    flex: 1,
    flexWrap: 'wrap',
    minWidth: 0,
  },
  fileName: {
    fontSize: 13,
    fontWeight: 800,
    color: 'var(--accent)',
    fontFamily: 'var(--font-mono)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 240,
  },
  fileMeta: {
    fontSize: 12,
    color: 'var(--ink-dim)',
    lineHeight: 1.4,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  backLink: {
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--accent)',
    textDecoration: 'none',
    fontFamily: 'var(--font-mono)',
    padding: '4px 10px',
    border: '1px solid rgba(99,102,241,0.3)',
    borderRadius: 7,
    background: 'rgba(99,102,241,0.08)',
    transition: 'background 150ms ease',
  },
  dismissBtn: {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    color: 'var(--ink-faint)',
    fontSize: 18,
    cursor: 'pointer',
    borderRadius: 5,
    lineHeight: 1,
    flexShrink: 0,
  },
}
