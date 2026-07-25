import { useEffect, useRef, useState } from 'react'
import { pxPerUnit } from './units.js'

// Measure overlay: click+drag on the canvas to draw a measurement rectangle.
// Returns measurement in the current unit.

export default function MeasureOverlay({ active, unit, effectivePPI, onFinish }) {
  const [rect, setRect] = useState(null)
  const [done, setDone] = useState(null)
  const startRef = useRef(null)
  const isDragging = useRef(false)

  const pxPerU = pxPerUnit(effectivePPI, unit)

  useEffect(() => {
    if (!active) {
      setRect(null)
      setDone(null)
      startRef.current = null
      isDragging.current = false
    }
  }, [active])

  function onPointerDown(e) {
    if (!active) return
    // Ignore clicks on panels (higher z-index elements)
    if (e.target.closest('[data-panel]')) return
    isDragging.current = true
    setDone(null)
    startRef.current = { x: e.clientX, y: e.clientY }
    setRect({ x: e.clientX, y: e.clientY, w: 0, h: 0 })
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e) {
    if (!isDragging.current || !startRef.current) return
    const x = Math.min(startRef.current.x, e.clientX)
    const y = Math.min(startRef.current.y, e.clientY)
    const w = Math.abs(e.clientX - startRef.current.x)
    const h = Math.abs(e.clientY - startRef.current.y)
    setRect({ x, y, w, h })
  }

  function onPointerUp(e) {
    if (!isDragging.current) return
    isDragging.current = false
    if (rect && (rect.w > 4 || rect.h > 4)) {
      setDone(rect)
    } else {
      setRect(null)
      setDone(null)
    }
    onFinish?.()
  }

  if (!active && !done) return null

  const displayRect = done || rect

  const wMeasured = displayRect ? (displayRect.w / pxPerU).toFixed(unit === 'in' ? 3 : unit === 'px' ? 0 : 1) : null
  const hMeasured = displayRect ? (displayRect.h / pxPerU).toFixed(unit === 'in' ? 3 : unit === 'px' ? 0 : 1) : null
  const diagonal = displayRect ? (Math.sqrt(displayRect.w ** 2 + displayRect.h ** 2) / pxPerU).toFixed(unit === 'in' ? 3 : unit === 'px' ? 0 : 1) : null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 18,
        cursor: active ? 'crosshair' : 'default',
        pointerEvents: active ? 'auto' : 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {displayRect && displayRect.w > 0 && displayRect.h > 0 && (
        <>
          {/* Selection rectangle */}
          <div
            style={{
              position: 'absolute',
              left: displayRect.x,
              top: displayRect.y,
              width: displayRect.w,
              height: displayRect.h,
              border: '1.5px solid rgba(251,191,36,0.9)',
              background: 'rgba(251,191,36,0.08)',
              boxSizing: 'border-box',
              pointerEvents: 'none',
            }}
          />
          {/* Corner dots */}
          {[[0, 0], [displayRect.w, 0], [0, displayRect.h], [displayRect.w, displayRect.h]].map(([dx, dy], i) => (
            <div key={i} style={{
              position: 'absolute',
              left: displayRect.x + dx - 3,
              top: displayRect.y + dy - 3,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(251,191,36,0.95)',
              pointerEvents: 'none',
            }} />
          ))}
          {/* Width label on top edge */}
          {displayRect.w > 60 && (
            <div style={{
              position: 'absolute',
              left: displayRect.x + displayRect.w / 2,
              top: displayRect.y - 18,
              transform: 'translateX(-50%)',
              background: 'rgba(0,0,0,0.8)',
              color: 'rgba(251,191,36,0.95)',
              fontSize: 10,
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              padding: '2px 6px',
              borderRadius: 4,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}>
              {wMeasured} {unit}
            </div>
          )}
          {/* Height label on right edge */}
          {displayRect.h > 40 && (
            <div style={{
              position: 'absolute',
              left: displayRect.x + displayRect.w + 6,
              top: displayRect.y + displayRect.h / 2,
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.8)',
              color: 'rgba(251,191,36,0.95)',
              fontSize: 10,
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              padding: '2px 6px',
              borderRadius: 4,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}>
              {hMeasured} {unit}
            </div>
          )}
          {/* Summary card (bottom right of rect) */}
          {done && (
            <div style={{
              position: 'absolute',
              left: Math.min(displayRect.x + displayRect.w + 10, window.innerWidth - 200),
              top: Math.min(displayRect.y + displayRect.h + 10, window.innerHeight - 120),
              background: 'rgba(10,14,24,0.92)',
              border: '1px solid rgba(251,191,36,0.5)',
              borderRadius: 8,
              padding: '10px 14px',
              pointerEvents: 'auto',
              zIndex: 30,
              minWidth: 160,
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            }}>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1, color: 'rgba(251,191,36,0.7)', marginBottom: 8 }}>MEASUREMENT</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#f8fafc' }}>
                <span style={{ color: 'rgba(251,191,36,0.7)', fontSize: 9 }}>WIDTH</span>
                <span style={{ color: 'rgba(251,191,36,0.7)', fontSize: 9 }}>HEIGHT</span>
                <span style={{ fontWeight: 700 }}>{wMeasured} {unit}</span>
                <span style={{ fontWeight: 700 }}>{hMeasured} {unit}</span>
                <span style={{ color: 'rgba(251,191,36,0.7)', fontSize: 9, marginTop: 4 }}>DIAGONAL</span>
                <span />
                <span style={{ fontWeight: 700 }}>{diagonal} {unit}</span>
              </div>
              <button
                data-panel
                onClick={() => { setRect(null); setDone(null) }}
                style={{
                  marginTop: 10,
                  width: '100%',
                  padding: '5px 0',
                  border: '1px solid rgba(251,191,36,0.4)',
                  borderRadius: 5,
                  background: 'transparent',
                  color: 'rgba(251,191,36,0.85)',
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: 0.5,
                }}
              >
                CLEAR ×
              </button>
            </div>
          )}
        </>
      )}
      {/* Crosshair cursor hint */}
      {active && !isDragging.current && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(10,14,24,0.85)',
          border: '1px solid rgba(251,191,36,0.4)',
          borderRadius: 8,
          padding: '6px 14px',
          fontSize: 11,
          color: 'rgba(251,191,36,0.9)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          pointerEvents: 'none',
          letterSpacing: 0.5,
        }}>
          Click + drag to measure · Esc to cancel
        </div>
      )}
    </div>
  )
}
