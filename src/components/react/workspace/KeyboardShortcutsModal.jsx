// ─── Keyboard Shortcuts reference modal ──────────────────────────────────────
export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const SHORTCUT_GROUPS = [
    {
      group: 'Navigation',
      items: [
        { keys: ['Ctrl', 'K'],    mac: ['⌘', 'K'],   desc: 'Quick launch — search & navigate tools' },
        { keys: ['?'],            mac: ['?'],          desc: 'Show keyboard shortcuts' },
        { keys: ['Escape'],       mac: ['Escape'],     desc: 'Close any modal or overlay' },
      ],
    },
    {
      group: 'Drop Zone',
      items: [
        { keys: ['Tab', '→', 'Enter'], mac: ['Tab', '→', 'Enter'], desc: 'Focus drop zone, then open file browser' },
        { keys: ['Space'],              mac: ['Space'],              desc: 'Open file browser (when drop zone focused)' },
      ],
    },
    {
      group: 'Command Palette',
      items: [
        { keys: ['↑'],       mac: ['↑'],     desc: 'Move selection up' },
        { keys: ['↓'],       mac: ['↓'],     desc: 'Move selection down' },
        { keys: ['Enter'],   mac: ['↵'],     desc: 'Open selected tool' },
        { keys: ['Escape'],  mac: ['Escape'], desc: 'Close palette' },
      ],
    },
    {
      group: 'Sidebar',
      items: [
        { keys: ['Alt', 'S'], mac: ['⌥', 'S'], desc: 'Toggle sidebar collapse / expand' },
      ],
    },
    {
      group: 'Activity Log',
      items: [
        { keys: ['Click log bar'], mac: ['Click log bar'], desc: 'Expand / collapse the activity log drawer' },
      ],
    },
  ]

  const isMac = typeof navigator !== 'undefined' &&
    /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)

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
        aria-modal="true"
        aria-label="Keyboard shortcuts reference"
        style={styles.modal}
      >
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={styles.headerIcon}>⌨️</span>
            <span style={styles.headerTitle}>Keyboard Shortcuts</span>
          </div>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            aria-label="Close keyboard shortcuts"
          >
            ✕
          </button>
        </div>

        <div style={styles.divider} />

        {/* Shortcut groups */}
        <div style={styles.body}>
          {SHORTCUT_GROUPS.map((group) => (
            <div key={group.group} style={styles.group}>
              <div style={styles.groupLabel}>{group.group}</div>
              <div style={styles.groupItems}>
                {group.items.map((item, i) => (
                  <div key={i} style={styles.row}>
                    <div style={styles.keysGroup}>
                      {(isMac ? item.mac : item.keys).map((k, ki) => (
                        <span key={ki}>
                          <kbd style={styles.kbd}>{k}</kbd>
                          {ki < (isMac ? item.mac : item.keys).length - 1 && (
                            <span style={styles.plus}>+</span>
                          )}
                        </span>
                      ))}
                    </div>
                    <span style={styles.desc}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <span style={styles.footerNote}>
            Press <kbd style={styles.footerKbd}>Escape</kbd> or click outside to close
          </span>
        </div>
      </div>
    </>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 9998,
    animation: 'fadeIn 150ms ease',
  },
  modal: {
    position: 'fixed',
    top: '15%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 520,
    maxHeight: '70vh',
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 18,
    boxShadow: '0 32px 64px -16px rgba(0,0,0,0.5)',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'scaleIn 150ms ease-out',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: { fontSize: 18 },
  headerTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: 'var(--ink)',
  },
  closeBtn: {
    width: 28,
    height: 28,
    border: '1px solid var(--panel-border)',
    borderRadius: 7,
    background: 'var(--btn-idle-bg)',
    color: 'var(--ink-faint)',
    fontSize: 12,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: { height: 1, background: 'var(--panel-border)' },
  body: {
    overflowY: 'auto',
    padding: '12px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    flex: 1,
  },
  group: {},
  groupLabel: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '1px',
    color: 'var(--ink-faint)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  groupItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '7px 10px',
    borderRadius: 8,
  },
  keysGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    minWidth: 140,
    flexShrink: 0,
  },
  kbd: {
    padding: '3px 7px',
    border: '1px solid var(--panel-border)',
    borderBottom: '2px solid var(--panel-border)',
    borderRadius: 6,
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    color: 'var(--ink)',
    background: 'var(--btn-idle-bg)',
    display: 'inline-block',
  },
  plus: {
    fontSize: 10,
    color: 'var(--ink-faint)',
    margin: '0 2px',
  },
  desc: {
    fontSize: 12,
    color: 'var(--ink-dim)',
    flex: 1,
  },
  footer: {
    borderTop: '1px solid var(--panel-border)',
    padding: '10px 20px',
    background: 'var(--btn-idle-bg)',
    textAlign: 'center',
  },
  footerNote: {
    fontSize: 11,
    color: 'var(--ink-faint)',
  },
  footerKbd: {
    padding: '2px 6px',
    border: '1px solid var(--panel-border)',
    borderRadius: 4,
    fontSize: 10,
    fontFamily: 'var(--font-mono)',
    color: 'var(--ink-dim)',
    background: 'var(--panel-bg)',
  },
}
