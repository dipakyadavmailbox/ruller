// ─── FilePreview — shows inside the drop zone after file drop ─────────────────
// Renders an icon or actual image thumbnail, file name, size, and type.

export default function FilePreview({ detection }) {
  if (!detection) return null
  const { fileName, fileSize, fileType, icon, color, category, mime } = detection
  const isImage = category === 'image' && detection.file

  return (
    <div style={styles.card}>
      {/* Preview */}
      <div style={{ ...styles.preview, borderColor: color + '55', background: color + '15' }}>
        {isImage ? (
          <img
            src={URL.createObjectURL(detection.file)}
            alt={fileName}
            style={styles.imgThumb}
          />
        ) : (
          <span style={styles.bigIcon}>{icon}</span>
        )}
      </div>

      {/* Info */}
      <div style={styles.info}>
        <div style={styles.fileName} title={fileName}>{fileName}</div>
        <div style={styles.meta}>
          <span style={{ ...styles.badge, borderColor: color + '55', color }}>{fileType}</span>
          <span style={styles.size}>{fileSize}</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '16px 20px',
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 14,
    marginBottom: 16,
    width: '100%',
    boxSizing: 'border-box',
  },
  preview: {
    width: 60,
    height: 60,
    borderRadius: 10,
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  imgThumb: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  bigIcon: {
    fontSize: 28,
    lineHeight: 1,
  },
  info: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  fileName: {
    fontSize: 14,
    fontWeight: 800,
    color: 'var(--ink)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  badge: {
    fontSize: 11,
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    padding: '2px 8px',
    border: '1px solid',
    borderRadius: 20,
    letterSpacing: '0.3px',
  },
  size: {
    fontSize: 12,
    color: 'var(--ink-faint)',
    fontFamily: 'var(--font-mono)',
  },
}
