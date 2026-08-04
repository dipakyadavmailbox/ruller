import { useState, useRef, useCallback } from 'react'
import { mergePdfs, getPdfPageCount } from './pdfUtils.js'
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

export default function MergeTab() {
  const [pdfs, setPdfs]         = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  // ─── Add PDFs ───────────────────────────────────────────────────────────────
  const addFiles = useCallback(async (files) => {
    const valid = Array.from(files).filter((f) => f.type === 'application/pdf')
    if (!valid.length) {
      setError('Please select PDF files only (.pdf).')
      return
    }
    setError(null)

    // Read page counts concurrently for UX display
    const items = await Promise.all(
      valid.map(async (file) => ({
        id:    crypto.randomUUID(),
        file,
        name:  file.name,
        size:  file.size > 1024 * 1024
               ? (file.size / 1024 / 1024).toFixed(1) + ' MB'
               : (file.size / 1024).toFixed(0) + ' KB',
        pages: await getPdfPageCount(file),
      }))
    )
    setPdfs((prev) => [...prev, ...items])
  }, [])

  const handleDragOver  = (e) => { e.preventDefault(); setDragOver(true) }
  const handleDragLeave = ()  => setDragOver(false)
  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  // ─── List manipulation ──────────────────────────────────────────────────────
  const moveItem = (from, to) =>
    setPdfs((prev) => {
      const arr = [...prev]
      const [item] = arr.splice(from, 1)
      arr.splice(to, 0, item)
      return arr
    })

  const removeItem = (id) => setPdfs((prev) => prev.filter((p) => p.id !== id))

  // ─── Merge action ───────────────────────────────────────────────────────────
  const handleMerge = async () => {
    if (pdfs.length < 2) { setError('Please add at least 2 PDF files to merge.'); return }
    setLoading(true)
    setError(null)
    try {
      const blob = await mergePdfs(pdfs.map((p) => p.file))
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = 'merged.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError('Merge failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = pdfs.reduce((sum, p) => sum + (p.pages || 0), 0)

  return (
    <div>
      <p style={descStyle}>
        Upload <strong>2 or more PDF files</strong>. Reorder them using the arrows, then click{' '}
        <strong>Merge PDFs</strong> to download a single combined file.
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
        aria-label="Click or drag PDF files here to merge"
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <span style={{ fontSize: '36px', lineHeight: 1 }}>📑</span>
        <span style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '14px' }}>
          Click to browse or drag PDFs here
        </span>
        <span style={{ color: 'var(--ink-faint)', fontSize: '12px' }}>
          PDF only · Multiple files supported
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          hidden
          id="merge-file-input"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* ─── PDF List ──────────────────────────────────────────────────────── */}
      {pdfs.length > 0 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <p style={{ fontSize: '12px', color: 'var(--ink-faint)', margin: 0 }}>
              {pdfs.length} file{pdfs.length !== 1 ? 's' : ''} · {totalPages} total page{totalPages !== 1 ? 's' : ''}
            </p>
          </div>
          <ul style={fileListStyle} aria-label="PDFs to merge in order">
            {pdfs.map((pdf, idx) => (
              <li key={pdf.id} style={fileItemStyle}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>📄</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={fileNameStyle} title={pdf.name}>{pdf.name}</div>
                  <div style={fileMetaStyle}>
                    {pdf.size}
                    {pdf.pages > 0 && ` · ${pdf.pages} page${pdf.pages !== 1 ? 's' : ''}`}
                  </div>
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
                    disabled={idx === pdfs.length - 1}
                    onClick={() => moveItem(idx, idx + 1)}
                    style={{ ...iconBtnStyle, opacity: idx === pdfs.length - 1 ? 0.35 : 1 }}
                    aria-label="Move down"
                    title="Move down"
                  >↓</button>
                  <button
                    onClick={() => removeItem(pdf.id)}
                    style={iconBtnDangerStyle}
                    aria-label={`Remove ${pdf.name}`}
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
        id="merge-pdf-btn"
        onClick={handleMerge}
        disabled={pdfs.length < 2 || loading}
        style={{
          ...actionBtnStyle,
          opacity: (pdfs.length < 2 || loading) ? 0.5 : 1,
          cursor: (pdfs.length < 2 || loading) ? 'not-allowed' : 'pointer',
        }}
        aria-busy={loading}
      >
        {loading ? '⏳ Merging…' : '🔗 Merge PDFs'}
      </button>
    </div>
  )
}
