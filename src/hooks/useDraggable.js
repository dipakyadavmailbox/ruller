import { useCallback, useRef, useState } from 'react'

export function useDraggable(initial) {
  const [position, setPosition] = useState(initial)
  const dragState = useRef(null)

  const onPointerDown = useCallback((e) => {
    // Ignore drags that start on interactive controls inside the header.
    if (e.target.closest('button, input, select')) return
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [position])

  const onPointerMove = useCallback((e) => {
    if (!dragState.current) return
    const dx = e.clientX - dragState.current.startX
    const dy = e.clientY - dragState.current.startY
    setPosition({
      x: dragState.current.originX + dx,
      y: dragState.current.originY + dy,
    })
  }, [])

  const onPointerUp = useCallback(() => {
    dragState.current = null
  }, [])

  return { position, handlers: { onPointerDown, onPointerMove, onPointerUp } }
}
