import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { pxPerUnit } from './units.js'

// A single draggable guide line (horizontal or vertical).
// orientation: 'h' = horizontal (top/bottom from ruler), 'v' = vertical (left/right from ruler)
// pos: CSS pixel position from the relevant edge
function Guide({ id, orientation, pos, unit, effectivePPI, onDrag, onDelete }) {
  const isH = orientation === 'h'
  const dragging = useRef(false)
  const startRef = useRef(null)

  const pxPerU = pxPerUnit(effectivePPI, unit)
  const measurement = (pos / pxPerU).toFixed(unit === 'in' ? 3 : unit === 'px' ? 0 : 1)
  const label = `${measurement} ${unit}`

  function onPointerDown(e) {
    e.stopPropagation()
    dragging.current = true
    startRef.current = isH ? e.clientY - pos : e.clientX - pos
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function onPointerMove(e) {
    if (!dragging.current) return
    const next = isH ? e.clientY - startRef.current : e.clientX - startRef.current
    onDrag(id, Math.max(0, next))
  }

  function onPointerUp() {
    dragging.current = false
  }

  function onDblClick(e) {
    e.stopPropagation()
    onDelete(id)
  }

  const lineStyle = isH
    ? {
        position: 'fixed',
        left: 0,
        right: 0,
        top: pos,
        height: 1,
        background: 'rgba(99,240,140,0.7)',
        zIndex: 25,
        cursor: 'ns-resize',
        pointerEvents: 'auto',
      }
    : {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: pos,
        width: 1,
        background: 'rgba(99,240,140,0.7)',
        zIndex: 25,
        cursor: 'ew-resize',
        pointerEvents: 'auto',
      }

  const hitZoneStyle = isH
    ? {
        position: 'fixed',
        left: 0,
        right: 0,
        top: pos - 5,
        height: 11,
        zIndex: 26,
        cursor: 'ns-resize',
        pointerEvents: 'auto',
      }
    : {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: pos - 5,
        width: 11,
        zIndex: 26,
        cursor: 'ew-resize',
        pointerEvents: 'auto',
      }

  const labelOffset = 8
  const labelStyle = isH
    ? {
        position: 'fixed',
        left: 12,
        top: pos + labelOffset,
        background: 'rgba(0,0,0,0.75)',
        color: 'rgba(99,240,140,0.95)',
        fontSize: 10,
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        padding: '2px 6px',
        borderRadius: 4,
        letterSpacing: 0.3,
        pointerEvents: 'none',
        zIndex: 27,
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }
    : {
        position: 'fixed',
        left: pos + labelOffset,
        top: 12,
        background: 'rgba(0,0,0,0.75)',
        color: 'rgba(99,240,140,0.95)',
        fontSize: 10,
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        padding: '2px 6px',
        borderRadius: 4,
        letterSpacing: 0.3,
        pointerEvents: 'none',
        zIndex: 27,
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }

  return (
    <>
      {/* Visible line */}
      <div style={lineStyle} />
      {/* Hit area for dragging */}
      <div
        style={hitZoneStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={onDblClick}
        title="Drag to move · Double-click to delete"
      />
      {/* Label */}
      <div style={labelStyle}>{label}</div>
    </>
  )
}

let guideIdCounter = 1

export default function GuideLayer({
  guides,
  setGuides,
  unit,
  effectivePPI,
  visible,
}) {
  function dragGuide(id, newPos) {
    setGuides((prev) => prev.map((g) => (g.id === id ? { ...g, pos: newPos } : g)))
  }

  function deleteGuide(id) {
    setGuides((prev) => prev.filter((g) => g.id !== id))
  }

  if (!visible) return null

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 25 }}>
      {guides.map((g) => (
        <Guide
          key={g.id}
          id={g.id}
          orientation={g.orientation}
          pos={g.pos}
          unit={unit}
          effectivePPI={effectivePPI}
          onDrag={dragGuide}
          onDelete={deleteGuide}
        />
      ))}
    </div>
  )
}

export function createGuide(orientation, pos) {
  return { id: guideIdCounter++, orientation, pos }
}
