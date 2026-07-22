import { useEffect, useState } from 'react'
import { pxPerUnit } from '../../units.js'

export const RULER_THICKNESS = 32

// Metric rulers (mm/cm) share one physical grid — millimetre ticks — and
// only differ in whether the printed number is a millimetre or centimetre
// value, exactly like a real dual-marked ruler. Inches use a base-2
// fractional grid (halves, quarters, eighths, sixteenths).
function buildTicks(lengthPx, effectivePPI, unit) {
  const ticks = []
  if (unit === 'in') {
    const pxPerInch = pxPerUnit(effectivePPI, 'in')
    const pxPerSixteenth = pxPerInch / 16
    const count = Math.ceil(lengthPx / pxPerSixteenth)
    for (let i = 0; i <= count; i++) {
      const pos = i * pxPerSixteenth
      if (pos > lengthPx) break
      let tier = 0 // 0 = smallest (1/16), 1 = 1/8, 2 = 1/4, 3 = 1/2, 4 = whole inch (labeled)
      if (i % 16 === 0) tier = 4
      else if (i % 8 === 0) tier = 3
      else if (i % 4 === 0) tier = 2
      else if (i % 2 === 0) tier = 1
      ticks.push({ pos, tier, label: tier === 4 ? String(i / 16) : null })
    }
  } else {
    const pxPerMm = pxPerUnit(effectivePPI, 'mm')
    const count = Math.ceil(lengthPx / pxPerMm)
    const labelDivisor = unit === 'cm' ? 10 : 1 // cm mode labels every 10mm as "1"; mm mode labels every 10mm as "10"
    for (let i = 0; i <= count; i++) {
      const pos = i * pxPerMm
      if (pos > lengthPx) break
      let tier = 0 // 0 = 1mm, 1 = 5mm, 2 = 10mm (labeled)
      if (i % 10 === 0) tier = 2
      else if (i % 5 === 0) tier = 1
      ticks.push({ pos, tier, label: tier === 2 && i !== 0 ? String(i / labelDivisor) : (tier === 2 ? '0' : null) })
    }
  }
  return ticks
}

const TIER_HEIGHT = {
  0: 6,
  1: 10,
  2: 14,
  3: 18,
  4: 24,
}

export default function Ruler({ edge, unit, effectivePPI }) {
  const isHorizontal = edge === 'top' || edge === 'bottom'
  const [length, setLength] = useState(() => (isHorizontal ? window.innerWidth : window.innerHeight))

  useEffect(() => {
    function onResize() {
      setLength(isHorizontal ? window.innerWidth : window.innerHeight)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isHorizontal])

  const ticks = buildTicks(length, effectivePPI, unit)

  const wrapperStyle = {
    position: 'fixed',
    zIndex: 30,
    background: 'var(--canvas)',
    ...(isHorizontal
      ? { left: 0, right: 0, height: RULER_THICKNESS, [edge]: 0 }
      : { top: 0, bottom: 0, width: RULER_THICKNESS, [edge]: 0 }),
    borderTop: edge === 'bottom' ? '1px solid var(--divider)' : undefined,
    borderBottom: edge === 'top' ? '1px solid var(--divider)' : undefined,
    borderRight: edge === 'left' ? '1px solid var(--divider)' : undefined,
    borderLeft: edge === 'right' ? '1px solid var(--divider)' : undefined,
    pointerEvents: 'none',
    userSelect: 'none',
  }

  return (
    <div style={wrapperStyle} aria-hidden="true">
      {ticks.map((t, i) => {
        const h = TIER_HEIGHT[t.tier]
        const tickStyle = isHorizontal
          ? {
              position: 'absolute',
              left: t.pos,
              width: 1,
              background: t.tier >= 2 ? 'var(--tick)' : 'var(--tick-dim)',
              ...(edge === 'top' ? { top: 0, height: h } : { bottom: 0, height: h }),
            }
          : {
              position: 'absolute',
              top: t.pos,
              height: 1,
              background: t.tier >= 2 ? 'var(--tick)' : 'var(--tick-dim)',
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
                        [edge === 'top' ? 'top' : 'bottom']: 2,
                        fontSize: 11,
                        lineHeight: 1,
                        color: 'var(--ink)',
                        fontWeight: 700,
                        letterSpacing: 0.3,
                        textShadow: 'var(--tick-label-shadow)',
                      }
                    : {
                        position: 'absolute',
                        top: t.pos + 3,
                        [edge === 'left' ? 'left' : 'right']: 2,
                        fontSize: 11,
                        lineHeight: 1,
                        color: 'var(--ink)',
                        fontWeight: 700,
                        letterSpacing: 0.3,
                        textShadow: 'var(--tick-label-shadow)',
                      }
                }
              >
                {t.label}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
