import { useState, useRef, useCallback } from 'react'
import { imagesToPdf } from './pdfUtils.js'
import {
  dropZoneStyle,
  fileListStyle,
  fileItemStyle,
  iconBtnStyle,
  iconBtnDangerStyle,
  actionBtnStyle,
  errorStyle,
  descStyle,
  fileNameStyle,
  fileMetaStyle,
} from './sharedStyles.js'

export default function ConvertTab() {
  const [images, setImages]     = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  // ─── Add files ──────────────────────────────────────────────────────────────
  const addFiles = useCallback((files) => {
    const valid = Array.from(files).filter((f) =>
      ['image/jpeg', 'image/png', 'image/webp'].includes(f.type)
    )
    if (!valid.length) {
      setError('Please select JPEG, PNG, or WebP image files.')
      return
    }
    setError(null)
    const items = valid.map((file) => ({
      id:      crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      name:    file.name,
      size:    file.size > 1024 * 1024
               ? (file.size / 1024 / 1024).toFixed(1) + ' MB'
               : (file.size / 1024).toFixed(0) + ' KB',
    }))
    setImages((prev) => [...prev, ...items])
  }, [])

  // ─── Drag-and-drop handlers ─────────────────────────────────────────────────
  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true)  }
  const handleDragLeave = ()  => setDragOver(false)
  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  // ─── List manipulation ──────────────────────────────────────────────────────
  const moveItem = (from, to) =>
    setImages((prev) => {
      const arr = [...prev]
      const [item] = arr.splice(from, 1)
      arr.splice(to, 0, item)
      return arr
    })

  const removeItem = (id) => {
    setImages((prev) => {
      const item = prev.find((i) => i.id === id)
      if (item) URL.revokeObjectURL(item.preview)
      return prev.filter((i) => i.id !== id)
    })
  }

  // ─── Convert action ─────────────────────────────────────────────────────────
  const handleConvert = async () => {
    if (!images.length) return
    setLoading(true)
    setError(null)
    try {
      const blob = await imagesToPdf(images.map((i) => i.file))
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = 'converted.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError('Conversion failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p style={descStyle}>
        Select or drag <strong>JPEG, PNG, or WebP</strong> images. Each image becomes one PDF page.
        Reorder as needed, then click <strong>Convert to PDF</strong>.
      </p>

      {/* ─── Drop Zone ─────────────────────────────────────────────────────── */}
      <div
        style={{
          ...dropZoneStyle,
          borderColor: dragOver ? 'var(--accent)' : 'var(--panel-border)',
          background:  dragOver ? 'var(--accent-light)' : 'transparent',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Click or drag images here to convert to PDF"
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <span style={{ fontSize: '36px', lineHeight: 1 }}>🖼️</span>
        <span style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '14px' }}>
          Click to browse or drag images here
        </span>
        <span style={{ color: 'var(--ink-faint)', fontSize: '12px' }}>
          JPEG · PNG · WebP — multiple files supported
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          id="convert-file-input"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* ─── Image List ────────────────────────────────────────────────────── */}
      {images.length > 0 && (
        <>
          <p style={{ fontSize: '12px', color: 'var(--ink-faint)', margin: '0 0 8px' }}>
            {images.length} image{images.length !== 1 ? 's' : ''} · {images.length} page{images.length !== 1 ? 's' : ''} in output
          </p>
          <ul style={fileListStyle} aria-label="Images to convert">
            {images.map((img, idx) => (
              <li key={img.id} style={fileItemStyle}>
                <img
                  src={img.preview}
                  alt={img.name}
                  style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={fileNameStyle} title={img.name}>{img.name}</div>
                  <div style={fileMetaStyle}>Page {idx + 1} · {img.size}</div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  <button
                    disabled={idx === 0}
                    onClick={() => moveItem(idx, idx - 1)}
                    style={{ ...iconBtnStyle, opacity: idx === 0 ? 0.35 : 1 }}
                    aria-label="Move up"
                    title="Move up"
                  >↑</button>
                  <button
                    disabled={idx === images.length - 1}
                    onClick={() => moveItem(idx, idx + 1)}
                    style={{ ...iconBtnStyle, opacity: idx === images.length - 1 ? 0.35 : 1 }}
                    aria-label="Move down"
                    title="Move down"
                  >↓</button>
                  <button
                    onClick={() => removeItem(img.id)}
                    style={iconBtnDangerStyle}
                    aria-label={`Remove ${img.name}`}
                    title="Remove"
                  >✕</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* ─── Error ─────────────────────────────────────────────────────────── */}
      {error && <p role="alert" style={errorStyle}>{error}</p>}

      {/* ─── Action Button ─────────────────────────────────────────────────── */}
      <button
        id="convert-pdf-btn"
        onClick={handleConvert}
        disabled={!images.length || loading}
        style={{
          ...actionBtnStyle,
          opacity: (!images.length || loading) ? 0.5 : 1,
          cursor: (!images.length || loading) ? 'not-allowed' : 'pointer',
        }}
        aria-busy={loading}
      >
        {loading ? '⏳ Converting…' : '📄 Convert to PDF'}
      </button>
    </div>
  )
}
