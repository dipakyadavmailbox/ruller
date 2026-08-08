import { writeHandoff } from './handoff.js'

// ─── MultiDropPanel — shown after 2+ files are dropped ───────────────────────
export default function MultiDropPanel({ multiResult, onClear, onNavigate }) {
  if (!multiResult) return null

  const { detections, groups, batchSuggestion, totalCount, isHomogeneous } = multiResult

  const handleBatchNavigate = () => {
    if (!batchSuggestion?.tool) return
    writeHandoff({
      fileName:  `${totalCount} files`,
      fileType:  batchSuggestion.label,
      fileSize:  null,
      mime:      null,
      icon:      batchSuggestion.icon,
      toolSlug:  batchSuggestion.tool.slug,
      tabTarget: batchSuggestion.tabTarget || null,
    })
    onNavigate?.(batchSuggestion.tool)
    window.location.href = batchSuggestion.tool.slug
  }

  const handleSingleNavigate = (tool) => {
    onNavigate?.(tool)
    window.location.href = tool.slug
  }

  return (
    <div
      style={styles.root}
      role="region"
      aria-label="Multi-file detection result"
      aria-live="polite"
    >
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.countBadge}>{totalCount}</span>
          <span style={styles.headerText}>files detected</span>
          {isHomogeneous && (
            <span style={styles.homoBadge}>all same type</span>
          )}
        </div>
        <button onClick={onClear} style={styles.clearBtn} aria-label="Clear files and reset">
          ✕ Clear
        </button>
      </div>

      {/* File chips */}
      <div
        style={styles.chipsRow}
        role="list"
        aria-label="Dropped files"
      >
        {detections.map((d, i) => (
          <div key={i} role="listitem" style={styles.chip}>
            <span style={styles.chipIcon}>{d.icon}</span>
            <span style={styles.chipName} title={d.fileName}>
              {d.fileName.length > 18 ? d.fileName.slice(0, 15) + '…' : d.fileName}
            </span>
          </div>
        ))}
      </div>

      {/* Batch suggestion (homogeneous) */}
      {batchSuggestion && (
        <div
          style={{
            ...styles.batchCard,
            borderColor: batchSuggestion.accentColor + '44',
            background:  batchSuggestion.accentColor + '0C',
          }}
        >
          <div style={styles.batchTop}>
            <span style={styles.batchIcon}>{batchSuggestion.icon}</span>
            <div>
              <div style={styles.batchLabel}>{batchSuggestion.label}</div>
              <div style={styles.batchSublabel}>{batchSuggestion.sublabel}</div>
            </div>
          </div>
          <button
            id="multi-drop-primary-action"
            onClick={handleBatchNavigate}
            style={{
              ...styles.batchBtn,
              background: batchSuggestion.accentColor,
            }}
            aria-label={batchSuggestion.ctaText}
          >
            {batchSuggestion.ctaText}
          </button>
        </div>
      )}

      {/* Heterogeneous / per-type breakdown */}
      {!isHomogeneous && (
        <div style={styles.mixedSection}>
          <div style={styles.mixedLabel}>Mixed file types — open each individually:</div>
          <div style={styles.mixedRows}>
            {Object.entries(groups).map(([cat, items]) => {
              // Find best tool for this category group
              const representative = items[0]
              const tool = representative.primaryTool
              if (!tool) return null
              return (
                <button
                  key={cat}
                  onClick={() => handleSingleNavigate(tool)}
                  style={styles.mixedRow}
                  aria-label={`Open ${tool.name} for ${cat} files`}
                >
                  <span style={styles.mixedIcon}>{representative.icon}</span>
                  <div style={styles.mixedInfo}>
                    <div style={styles.mixedCat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</div>
                    <div style={styles.mixedToolName}>{tool.name}</div>
                  </div>
                  <span style={{ color: tool.color, fontWeight: 800 }}>→</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Process individually link */}
      <div style={styles.footer}>
        <button onClick={onClear} style={styles.individualLink}>
          Drop files individually instead →
        </button>
      </div>
    </div>
  )
}

const styles = {
  root: {
    padding: 20,
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 16,
    width: '100%',
    boxSizing: 'border-box',
    animation: 'slideUp 300ms ease-out',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  countBadge: {
    width: 26,
    height: 26,
    borderRadius: '50%',
    background: 'var(--accent)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 800,
    fontFamily: 'var(--font-mono)',
    flexShrink: 0,
  },
  headerText: {
    fontSize: 13,
    fontWeight: 700,
    color: 'var(--ink)',
  },
  homoBadge: {
    fontSize: 10,
    fontWeight: 700,
    color: '#10b981',
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.3)',
    borderRadius: 10,
    padding: '1px 7px',
    fontFamily: 'var(--font-mono)',
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
  },
  chipsRow: {
    display: 'flex',
    gap: 6,
    overflowX: 'auto',
    padding: '2px 0 6px',
    flexWrap: 'wrap',
  },
  chip: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '4px 10px',
    border: '1px solid var(--panel-border)',
    borderRadius: 20,
    background: 'var(--btn-idle-bg)',
    flexShrink: 0,
  },
  chipIcon: { fontSize: 13 },
  chipName: {
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--ink-dim)',
    fontFamily: 'var(--font-mono)',
    maxWidth: 140,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  batchCard: {
    border: '1px solid',
    borderRadius: 12,
    padding: 16,
  },
  batchTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  batchIcon: { fontSize: 28, flexShrink: 0 },
  batchLabel: {
    fontSize: 14,
    fontWeight: 800,
    color: 'var(--ink)',
    marginBottom: 3,
  },
  batchSublabel: {
    fontSize: 12,
    color: 'var(--ink-dim)',
    lineHeight: 1.4,
  },
  batchBtn: {
    width: '100%',
    padding: '11px 20px',
    border: 'none',
    borderRadius: 10,
    color: '#fff',
    fontSize: 13,
    fontWeight: 800,
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    transition: 'opacity 150ms ease',
  },
  mixedSection: { display: 'flex', flexDirection: 'column', gap: 8 },
  mixedLabel: {
    fontSize: 11,
    fontWeight: 800,
    color: 'var(--ink-faint)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  mixedRows: { display: 'flex', flexDirection: 'column', gap: 4 },
  mixedRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    border: '1px solid var(--panel-border)',
    borderRadius: 10,
    background: 'var(--btn-idle-bg)',
    cursor: 'pointer',
    transition: 'border-color 150ms ease',
    textAlign: 'left',
  },
  mixedIcon: { fontSize: 20, flexShrink: 0 },
  mixedInfo: { flex: 1, minWidth: 0 },
  mixedCat: {
    fontSize: 10,
    fontWeight: 800,
    color: 'var(--ink-faint)',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  mixedToolName: {
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--ink)',
  },
  footer: { display: 'flex', justifyContent: 'center' },
  individualLink: {
    border: 'none',
    background: 'transparent',
    color: 'var(--ink-faint)',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    textDecoration: 'underline',
    textDecorationStyle: 'dotted',
    padding: '4px 0',
  },
}
