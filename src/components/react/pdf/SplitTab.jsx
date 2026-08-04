import { useState, useRef } from 'react'
import { splitPdfAllPages, splitPdfRange, getPdfPageCount } from './pdfUtils.js'
import { dropZoneStyle, actionBtnStyle, errorStyle, descStyle } from './sharedStyles.js'

export default function SplitTab() {
  const [pdfFile, setPdfFile]       = useState(null)
  const [pageCount, setPageCount]   = useState(0)
  const [fileSize, setFileSize]     = useState('')
  const [mode, setMode]             = useState('all')    // 'all' | 'range'
  const [rangeInput, setRangeInput] = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)
  const [dragOver, setDragOver]     = useState(false)
  const inputRef = useRef(null)

  // ─── Load a PDF file ─────────────────────────────────────────────────────────
  const loadFile = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Please select a PDF file (.pdf).')
      return
    }
    setError(null)
    const count = await getPdfPageCount(file)
    setPdfFile(file)
    setPageCount(count)
    setFileSize(
      file.size > 1024 * 1024
        ? (file.size / 1024 / 1024).toFixed(1) + ' MB'
        : (file.size / 1024).toFixed(0) + ' KB'
    )
  }

  const handleDragOver  = (e) => { e.preventDefault(); setDragOver(true) }
  const handleDragLeave = ()  => setDragOver(false)
  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    loadFile(e.dataTransfer.files[0])
  }

  const clearFile = () => { setPdfFile(null); setPageCount(0); setFileSize(''); setError(null); setRangeInput('') }

  // ─── Split action ────────────────────────────────────────────────────────────
  const handleSplit = async () => {
    if (!pdfFile) return
    setLoading(true)
    setError(null)
    try {
      if (mode === 'all') {
        const blob = await splitPdfAllPages(pdfFile)
        triggerDownload(blob, 'split-pages.zip')
      } else {
        const blob = await splitPdfRange(pdfFile, rangeInput, pageCount)
        triggerDownload(blob, 'extracted-pages.pdf')
      }
    } catch (err) {
      setError('Split failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p style={descStyle}>
        Upload <strong>one PDF</strong>. Extract all pages as separate files (ZIP) or specify a
        custom page range to download as a single PDF.
      </p>

      {/* ─── Drop Zone (hidden once file is loaded) ──────────────────────── */}
      {!pdfFile ? (
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
          aria-label="Click or drag a PDF here to split"
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        >
          <span style={{ fontSize: '36px', lineHeight: 1 }}>✂️</span>
          <span style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '14px' }}>
            Click to browse or drag a PDF here
          </span>
          <span style={{ color: 'var(--ink-faint)', fontSize: '12px' }}>
            PDF only · Single file
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            hidden
            id="split-file-input"
            onChange={(e) => loadFile(e.target.files[0])}
          />
        </div>
      ) : (
        /* ─── Loaded File Bar ──────────────────────────────────────────────── */
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: '12px', marginBottom: '16px' }}>
          <span style={{ fontSize: '28px', flexShrink: 0 }}>📄</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={pdfFile.name}>
              {pdfFile.name}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--ink-faint)', marginTop: '2px' }}>
              {fileSize} · {pageCount} page{pageCount !== 1 ? 's' : ''}
            </div>
          </div>
          <button
            onClick={clearFile}
            style={{ padding: '5px 9px', border: '1px solid var(--panel-border)', borderRadius: '6px', background: 'var(--btn-idle-bg)', color: '#ef4444', cursor: 'pointer', fontSize: '12px', flexShrink: 0 }}
            aria-label="Remove file"
            title="Remove"
          >✕ Remove</button>
        </div>
      )}

      {/* ─── Mode Selector ───────────────────────────────────────────────── */}
      {pdfFile && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          {[
            { val: 'all',   icon: '📑', label: 'All Pages',    hint: 'One PDF per page → downloaded as .zip' },
            { val: 'range', icon: '✏️', label: 'Custom Range', hint: 'e.g. 1-3, 5, 7-9 → single PDF' },
          ].map((opt) => (
            <label
              key={opt.val}
              htmlFor={`split-mode-${opt.val}`}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', gap: '4px',
                padding: '12px 14px', borderRadius: '10px', cursor: 'pointer',
                border: `1px solid ${mode === opt.val ? 'var(--accent)' : 'var(--panel-border)'}`,
                background: mode === opt.val ? 'var(--accent-light)' : 'var(--panel-bg)',
                transition: 'border-color 150ms ease, background 150ms ease',
              }}
            >
              <input
                type="radio"
                name="split-mode"
                id={`split-mode-${opt.val}`}
                value={opt.val}
                checked={mode === opt.val}
                onChange={() => setMode(opt.val)}
                style={{ display: 'none' }}
              />
              <span style={{ fontSize: '13px', fontWeight: 700, color: mode === opt.val ? 'var(--accent)' : 'var(--ink)' }}>
                {opt.icon} {opt.label}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--ink-faint)' }}>{opt.hint}</span>
            </label>
          ))}
        </div>
      )}

      {/* ─── Range Input ─────────────────────────────────────────────────── */}
      {pdfFile && mode === 'range' && (
        <div style={{ marginBottom: '4px' }}>
          <label
            htmlFor="page-range-input"
            style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}
          >
            Page range{' '}
            <span style={{ color: 'var(--ink-faint)', fontWeight: 400 }}>
              (1–{pageCount}, comma-separated)
            </span>
          </label>
          <input
            id="page-range-input"
            type="text"
            placeholder={pageCount > 4 ? `e.g. 1-3, 5, 7-${pageCount}` : `e.g. 1-${Math.min(2, pageCount)}`}
            value={rangeInput}
            onChange={(e) => setRangeInput(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: '10px',
              border: '1px solid var(--panel-border)', background: 'var(--panel-bg)',
              color: 'var(--ink)', fontSize: '14px', fontFamily: 'var(--font-mono)',
              boxSizing: 'border-box', outline: 'none',
              transition: 'border-color 150ms ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e)  => (e.target.style.borderColor = 'var(--panel-border)')}
          />
        </div>
      )}

      {/* ─── Error ───────────────────────────────────────────────────────── */}
      {error && <p role="alert" style={errorStyle}>{error}</p>}

      {/* ─── Action Button ───────────────────────────────────────────────── */}
      <button
        id="split-pdf-btn"
        onClick={handleSplit}
        disabled={!pdfFile || loading || (mode === 'range' && !rangeInput.trim())}
        style={{
          ...actionBtnStyle,
          opacity: (!pdfFile || loading || (mode === 'range' && !rangeInput.trim())) ? 0.5 : 1,
          cursor: (!pdfFile || loading || (mode === 'range' && !rangeInput.trim())) ? 'not-allowed' : 'pointer',
        }}
        aria-busy={loading}
      >
        {loading
          ? '⏳ Splitting…'
          : mode === 'all'
          ? '📑 Split All Pages (ZIP)'
          : '✂️ Extract Range to PDF'}
      </button>
    </div>
  )
}

// ─── Utility: trigger browser download ────────────────────────────────────────
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a   = document.createElement('a')
  a.href    = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
