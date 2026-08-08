import { useState, useRef, useCallback } from 'react'
import { detectFile } from './detectFile.js'
import { detectMultiple } from './detectMultiple.js'

// ─── DropZone — full-area drag-and-drop target ────────────────────────────────
export default function DropZone({ onFileDetected, onMultiFileDetected }) {
  const [dragState, setDragState] = useState('idle') // idle | over | success | error
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef   = useRef(null)
  const dragCount  = useRef(0) // track nested drag enter/leave

  // ─── Drag events ────────────────────────────────────────────────────────────
  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    dragCount.current += 1
    if (dragCount.current === 1) setDragState('over')
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    dragCount.current -= 1
    if (dragCount.current === 0) setDragState('idle')
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }, [])

  const processFiles = useCallback(async (files) => {
    if (!files.length) return
    setIsProcessing(true)
    try {
      if (files.length === 1) {
        // Single file path
        const result = await detectFile(files[0])
        setDragState('success')
        setTimeout(() => {
          setDragState('idle')
          setIsProcessing(false)
          onFileDetected?.(result)
        }, 600)
      } else {
        // Multi-file path
        const result = await detectMultiple(files)
        setDragState('success')
        setTimeout(() => {
          setDragState('idle')
          setIsProcessing(false)
          onMultiFileDetected?.(result)
        }, 600)
      }
    } catch {
      setDragState('error')
      setTimeout(() => { setDragState('idle'); setIsProcessing(false) }, 1200)
    }
  }, [onFileDetected, onMultiFileDetected])

  const handleDrop = useCallback(async (e) => {
    e.preventDefault()
    dragCount.current = 0
    const files = Array.from(e.dataTransfer.files)
    await processFiles(files)
  }, [processFiles])

  const handleInputChange = useCallback(async (e) => {
    const files = Array.from(e.target.files || [])
    await processFiles(files)
    e.target.value = ''
  }, [processFiles])

  const handleClick = () => inputRef.current?.click()
  const handleKeyDown = (e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }

  // ─── Visual state logic ──────────────────────────────────────────────────────
  const isOver    = dragState === 'over'
  const isSuccess = dragState === 'success'
  const isError   = dragState === 'error'

  const borderColor = isSuccess
    ? '#10b981'
    : isError
    ? '#ef4444'
    : isOver
    ? 'var(--accent)'
    : 'var(--panel-border)'

  const bgColor = isSuccess
    ? 'rgba(16,185,129,0.06)'
    : isError
    ? 'rgba(239,68,68,0.06)'
    : isOver
    ? 'var(--accent-light)'
    : 'transparent'

  return (
    <div
      id="workspace-drop-zone"
      role="button"
      tabIndex={0}
      aria-label="Drop files here or click to browse. Accepts PDF, images, JSON, CSV, YAML."
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        ...styles.zone,
        borderColor,
        background: bgColor,
        transform:    isOver ? 'scale(1.005)' : 'scale(1)',
        boxShadow:    isOver ? '0 0 0 4px var(--accent-light), var(--glow-accent)' : 'none',
        animation:    isError ? 'shake 300ms ease' : 'none',
        cursor:       isProcessing ? 'wait' : 'pointer',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleInputChange}
        style={{ display: 'none' }}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Content */}
      {isProcessing ? (
        <div style={styles.content}>
          <div style={styles.spinner} />
          <div style={styles.processingText}>Detecting file type…</div>
        </div>
      ) : isSuccess ? (
        <div style={styles.content}>
          <span style={{ fontSize: 44, animation: 'popIn 300ms ease' }}>✅</span>
          <div style={{ ...styles.label, color: '#10b981' }}>File detected!</div>
        </div>
      ) : isError ? (
        <div style={styles.content}>
          <span style={{ fontSize: 44 }}>❌</span>
          <div style={{ ...styles.label, color: '#ef4444' }}>Something went wrong</div>
        </div>
      ) : (
        <div style={styles.content}>
          <div
            style={{
              ...styles.iconWrap,
              transform: isOver ? 'scale(1.12) translateY(-4px)' : 'scale(1)',
              transition: 'transform 200ms ease',
            }}
          >
            <span style={styles.bigIcon}>{isOver ? '📂' : '📁'}</span>
          </div>
          <div style={styles.label}>
            {isOver ? 'Drop to detect & route' : 'Drop any file here'}
          </div>
          <div style={styles.sub}>
            {isOver
              ? 'We\'ll auto-detect the type and suggest the right tool'
              : 'or click to browse — PDF · Images · JSON · CSV · YAML'}
          </div>
          {!isOver && (
            <div style={styles.supportedRow}>
              {['📄 PDF', '🖼️ Images', '📊 JSON', '📋 CSV', '📝 YAML'].map((t) => (
                <span key={t} style={styles.tag}>{t}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const styles = {
  zone: {
    width: '100%',
    minHeight: 200,
    borderRadius: 16,
    border: '1.5px dashed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
    boxSizing: 'border-box',
    transition: 'background 200ms ease, border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease',
    userSelect: 'none',
    position: 'relative',
    outline: 'none',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    textAlign: 'center',
    pointerEvents: 'none',
  },
  iconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigIcon: {
    fontSize: 48,
    lineHeight: 1,
    display: 'block',
  },
  label: {
    fontSize: 16,
    fontWeight: 800,
    color: 'var(--ink)',
    letterSpacing: '-0.2px',
  },
  sub: {
    fontSize: 13,
    color: 'var(--ink-dim)',
    lineHeight: 1.5,
    maxWidth: 340,
  },
  supportedRow: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 4,
  },
  tag: {
    padding: '3px 10px',
    border: '1px solid var(--panel-border)',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: 'var(--ink-faint)',
    background: 'var(--btn-idle-bg)',
  },
  processingText: {
    fontSize: 14,
    fontWeight: 700,
    color: 'var(--ink-dim)',
    fontFamily: 'var(--font-mono)',
  },
  spinner: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: '3px solid var(--panel-border)',
    borderTopColor: 'var(--accent)',
    animation: 'spin 600ms linear infinite',
  },
}
