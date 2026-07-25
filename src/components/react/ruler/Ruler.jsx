import { useEffect, useState } from 'react'
import { pxPerUnit } from './units.js'

export const RULER_THICKNESS = 44

// Height of each tick tier in pixels
const TIER_HEIGHT = {
  0: 5,   // 1mm / 1/16"
  1: 9,   // 5mm / 1/8"
  2: 16,  // 10mm / 1/4"
  3: 22,  // 1/2"
  4: 30,  // 1 inch (labeled) / 1cm (labeled)
}

// Metric rulers (mm/cm) share one physical grid — millimetre ticks.
// Inches use a base-2 fractional grid (halves, quarters, eighths, sixteenths).
function buildTicks(lengthPx, effectivePPI, unit) {
  const ticks = []
  if (unit === 'in') {
    const pxPerInch = pxPerUnit(effectivePPI, 'in')
    const pxPerSixteenth = pxPerInch / 16
    const count = Math.ceil(lengthPx / pxPerSixteenth)
    for (let i = 0; i <= count; i++) {
      const pos = i * pxPerSixteenth
      if (pos > lengthPx) break
      let tier = 0
      if (i % 16 === 0) tier = 4
      else if (i % 8 === 0) tier = 3
      else if (i % 4 === 0) tier = 2
      else if (i % 2 === 0) tier = 1
      ticks.push({ pos, tier, label: tier === 4 ? String(i / 16) : null })
    }
  } else if (unit === 'px') {
    // Every 10px gets a minor tick; every 50px gets a labeled tick
    const count = Math.ceil(lengthPx / 10)
    for (let i = 0; i <= count; i++) {
      const pos = i * 10
      if (pos > lengthPx) break
      let tier = 0
      if (i % 5 === 0) tier = 1
      if (i % 10 === 0) tier = 2
      if (i % 50 === 0) tier = 4
      ticks.push({ pos, tier, label: tier === 4 && i !== 0 ? String(pos) : (tier === 4 ? '0' : null) })
    }
  } else {
    const pxPerMm = pxPerUnit(effectivePPI, 'mm')
    const count = Math.ceil(lengthPx / pxPerMm)
    const labelDivisor = unit === 'cm' ? 10 : 1
    for (let i = 0; i <= count; i++) {
      const pos = i * pxPerMm
      if (pos > lengthPx) break
      let tier = 0
      if (i % 10 === 0) tier = 4
      else if (i % 5 === 0) tier = 2
      ticks.push({ pos, tier, label: tier === 4 && i !== 0 ? String(i / labelDivisor) : (tier === 4 ? '0' : null) })
    }
  }
  return ticks
}

export default function Ruler({ edge, unit, effectivePPI, mousePos, onDropGuide }) {
  const isHorizontal = edge === 'top' || edge === 'bottom'
  const [length, setLength] = useState(() => isHorizontal ? window.innerWidth : window.innerHeight)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    function onResize() {
      setLength(isHorizontal ? window.innerWidth : window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isHorizontal])

  const ticks = buildTicks(length, effectivePPI, unit)
  const cursorPx = mousePos ? (isHorizontal ? mousePos.x : mousePos.y) : -1

  // The ruler gradient background — premium look
  const gradientDir = isHorizontal
    ? (edge === 'top' ? 'to bottom' : 'to top')
    : (edge === 'left' ? 'to right' : 'to left')

  const wrapperStyle = {
    position: 'fixed',
    zIndex: 30,
    backgroundImage: `linear-gradient(${gradientDir}, var(--ruler-bg-near, #10172a) 0%, var(--ruler-bg-far, #060c1a) 100%)`,
    ...(isHorizontal
      ? { left: 0, right: 0, height: RULER_THICKNESS, [edge]: 0 }
      : { top: 0, bottom: 0, width: RULER_THICKNESS, [edge]: 0 }),
    borderTop: edge === 'bottom' ? '1px solid var(--ruler-border, rgba(99,102,241,0.3))' : undefined,
    borderBottom: edge === 'top' ? '1px solid var(--ruler-border, rgba(99,102,241,0.3))' : undefined,
    borderRight: edge === 'left' ? '1px solid var(--ruler-border, rgba(99,102,241,0.3))' : undefined,
    borderLeft: edge === 'right' ? '1px solid var(--ruler-border, rgba(99,102,241,0.3))' : undefined,
    pointerEvents: 'auto',
    userSelect: 'none',
    cursor: 'crosshair',
    overflow: 'hidden',
  }

  // Subtle glow highlight at cursor position
  const glowStyle = cursorPx >= 0 ? (
    isHorizontal
      ? { backgroundImage: `radial-gradient(ellipse 60px 100% at ${cursorPx}px 50%, rgba(99,102,241,0.18) 0%, transparent 100%)` }
      : { backgroundImage: `radial-gradient(ellipse 100% 60px at 50% ${cursorPx}px, rgba(99,102,241,0.18) 0%, transparent 100%)` }
  ) : {}

  function handleClick(e) {
    // On clicking the ruler itself, drop a guide
    const pos = isHorizontal ? e.clientX : e.clientY
    onDropGuide?.(isHorizontal ? 'v' : 'h', pos)
  }

  return (
    <div
      style={wrapperStyle}
      aria-hidden="true"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', ...glowStyle }} />

      {/* Tick marks */}
      {ticks.map((t, i) => {
        const h = TIER_HEIGHT[t.tier] ?? 5
        const isLabeled = t.tier >= 4
        const tickColor = isLabeled
          ? 'rgba(148,163,184,0.8)'
          : t.tier >= 2
          ? 'rgba(100,116,139,0.6)'
          : 'rgba(71,85,105,0.4)'

        const tickStyle = isHorizontal
          ? {
              position: 'absolute',
              left: t.pos,
              width: isLabeled ? 1.5 : 1,
              background: tickColor,
              ...(edge === 'top' ? { top: 0, height: h } : { bottom: 0, height: h }),
            }
          : {
              position: 'absolute',
              top: t.pos,
              height: isLabeled ? 1.5 : 1,
              background: tickColor,
              ...(edge === 'left' ? { left: 0, width: h } : { right: 0, width: h }),
            }

        return (
          <div key={i}>
            <div style={tickStyle} />
            {t.label !== null && (
              <span
                style={
                  isHorizontal
                    ? {
                        position: 'absolute',
                        left: t.pos + 3,
                        [edge === 'top' ? 'top' : 'bottom']: h + 1,
                        fontSize: 9,
                        lineHeight: 1,
                        color: 'rgba(148,163,184,0.7)',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: 0,
                        userSelect: 'none',
                      }
                    : {
                        position: 'absolute',
                        top: t.pos + 3,
                        [edge === 'left' ? 'left' : 'right']: h + 1,
                        fontSize: 9,
                        lineHeight: 1,
                        color: 'rgba(148,163,184,0.7)',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: 0,
                        userSelect: 'none',
                        writingMode: edge === 'left' || edge === 'right' ? 'vertical-rl' : undefined,
                        transform: edge === 'left' ? 'rotate(180deg)' : undefined,
                      }
                }
              >
                {t.label}
              </span>
            )}
          </div>
        )
      })}

      {/* Cursor position indicator — bright line */}
      {cursorPx >= 0 && (
        <div
          style={
            isHorizontal
              ? {
                  position: 'absolute',
                  left: cursorPx,
                  top: 0,
                  bottom: 0,
                  width: 1,
                  background: 'rgba(99,102,241,0.95)',
                  pointerEvents: 'none',
                  boxShadow: '0 0 6px rgba(99,102,241,0.6)',
                }
              : {
                  position: 'absolute',
                  top: cursorPx,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: 'rgba(99,102,241,0.95)',
                  pointerEvents: 'none',
                  boxShadow: '0 0 6px rgba(99,102,241,0.6)',
                }
          }
        />
      )}

      {/* "Click to add guide" hint on hover */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          ...(isHorizontal
            ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
            : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', writingMode: 'vertical-rl' }),
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 0.5,
          color: 'rgba(99,102,241,0.5)',
          fontFamily: 'var(--font-mono)',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}>
          CLICK TO ADD GUIDE
        </div>
      )}
    </div>
  )
}
