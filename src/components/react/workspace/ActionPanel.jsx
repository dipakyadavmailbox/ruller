import FilePreview from './FilePreview.jsx'
import { writeHandoff } from './handoff.js'

// ─── ActionPanel — shown after file drop ─────────────────────────────────────
// Shows the detected file, suggested primary tool, and secondary alternatives.
export default function ActionPanel({ detection, onClear, onToolSelect }) {
  if (!detection) return null
  const { primaryTool, otherTools, hasTools, fileType, color, confidence } = detection

  const handleNavigate = (tool) => {
    // Write handoff so the tool page can show context
    writeHandoff({
      fileName:  detection.fileName,
      fileType:  detection.fileType,
      fileSize:  detection.fileSize,
      mime:      detection.mime,
      icon:      detection.icon,
      toolSlug:  tool.slug,
      tabTarget: tool.tabs ? Object.values(tool.tabs)[0] : null,
    })
    onToolSelect?.(tool)
    window.location.href = tool.slug
  }

  return (
    <div style={styles.root} role="region" aria-label="File detection result" aria-live="polite">
      {/* Clear button */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={{ ...styles.dot, background: color }} />
          <span style={styles.detected}>
            Detected: <strong>{fileType}</strong>
          </span>
          {confidence === 'low' && (
            <span style={styles.lowConf}>low confidence</span>
          )}
        </div>
        <button onClick={onClear} style={styles.clearBtn} aria-label="Clear file and reset drop zone">
          ✕ Clear
        </button>
      </div>

      {/* File preview */}
      <FilePreview detection={detection} />

      {hasTools ? (
        <>
          {/* Primary action */}
          {primaryTool && (
            <div style={styles.primaryCard}>
              <div style={styles.primaryTop}>
                <span style={styles.primaryIcon}>{primaryTool.icon}</span>
                <div>
                  <div style={styles.primaryName}>{primaryTool.name}</div>
                  <div style={styles.primaryCategory}>{primaryTool.category}</div>
                </div>
              </div>
              <div style={styles.primaryActions}>
                {primaryTool.actions.map((action) => (
                  <button
                    key={action}
                    id={`action-${action.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleNavigate(primaryTool)}
                    style={styles.primaryBtn}
                    aria-label={`${action} — open ${primaryTool.name}`}
                  >
                    {action} →
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Secondary tools */}
          {otherTools.length > 0 && (
            <div>
              <div style={styles.alsoLabel}>Also try:</div>
              <div style={styles.pillRow}>
                {otherTools.map((tool) => (
                  <button
                    key={tool.slug}
                    onClick={() => handleNavigate(tool)}
                    style={styles.pill}
                    aria-label={`Open ${tool.name}`}
                  >
                    {tool.icon} {tool.actions[0]} →
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={styles.noMatch}>
          <span style={{ fontSize: 24 }}>🤷</span>
          <div>
            <div style={styles.noMatchTitle}>No tools match this file type yet</div>
            <div style={styles.noMatchSub}>Browse all tools below — or drop a PDF, image, or data file.</div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  root: {
    padding: '20px',
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 16,
    width: '100%',
    boxSizing: 'border-box',
    animation: 'slideUp 300ms ease-out',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    flexShrink: 0,
  },
  detected: {
    fontSize: 13,
    color: 'var(--ink-dim)',
  },
  lowConf: {
    fontSize: 10,
    fontFamily: 'var(--font-mono)',
    color: '#f59e0b',
    background: 'rgba(245,158,11,0.1)',
    border: '1px solid rgba(245,158,11,0.25)',
    borderRadius: 4,
    padding: '1px 6px',
  },
  clearBtn: {
    padding: '4px 10px',
    border: '1px solid var(--panel-border)',
    borderRadius: 6,
    background: 'var(--btn-idle-bg)',
    color: 'var(--ink-faint)',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    transition: 'color 150ms ease',
  },
  primaryCard: {
    border: '1px solid var(--panel-border)',
    borderRadius: 12,
    padding: '16px',
    marginBottom: 12,
    background: 'var(--btn-idle-bg)',
  },
  primaryTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  primaryIcon: { fontSize: 28 },
  primaryName: { fontSize: 14, fontWeight: 800, color: 'var(--ink)' },
  primaryCategory: { fontSize: 11, color: 'var(--ink-faint)', marginTop: 2 },
  primaryActions: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  primaryBtn: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: 10,
    background: 'var(--accent)',
    color: '#fff',
    fontSize: 13,
    fontWeight: 800,
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    transition: 'opacity 150ms ease',
    flex: 1,
    minWidth: 120,
  },
  alsoLabel: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: '0.6px',
    color: 'var(--ink-faint)',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  pillRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  pill: {
    padding: '8px 14px',
    border: '1px solid var(--panel-border)',
    borderRadius: 20,
    background: 'var(--btn-idle-bg)',
    color: 'var(--ink)',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    transition: 'border-color 150ms ease',
  },
  noMatch: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 14,
    padding: '16px',
    border: '1px dashed var(--panel-border)',
    borderRadius: 10,
  },
  noMatchTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: 'var(--ink)',
    marginBottom: 4,
  },
  noMatchSub: {
    fontSize: 12,
    color: 'var(--ink-faint)',
    lineHeight: 1.5,
  },
}
