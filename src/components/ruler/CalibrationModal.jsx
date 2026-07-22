import { useMemo, useState } from 'react'
import { REFERENCE_OBJECTS } from '../../units.js'

export default function CalibrationModal({ onSave, onClose }) {
  const [refId, setRefId] = useState(REFERENCE_OBJECTS[0].id)
  const [boxWidthPx, setBoxWidthPx] = useState(320)

  const reference = useMemo(
    () => REFERENCE_OBJECTS.find((r) => r.id === refId) ?? REFERENCE_OBJECTS[0],
    [refId]
  )

  const impliedPPI = (boxWidthPx / reference.mm) * 25.4

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 420,
          maxWidth: 'calc(100vw - 32px)',
          background: 'var(--panel-bg)',
          border: '1px solid var(--panel-border)',
          borderRadius: 12,
          padding: 24,
          color: 'var(--ink)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, marginBottom: 4 }}>
          CALIBRATE TRUE SCALE
        </div>
        <p style={{ fontSize: 12, color: 'var(--ink-dim)', lineHeight: 1.5, marginTop: 8 }}>
          Browsers don't expose a monitor's real size, so ticks default to a
          96 DPI guess. Hold a physical object against the screen and drag
          the slider until the box below matches it exactly — the ruler will
          then be accurate to your display.
        </p>

        <div style={{ margin: '18px 0 8px', fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: 'var(--ink-faint)' }}>
          REFERENCE OBJECT
        </div>
        <select
          value={refId}
          onChange={(e) => setRefId(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 10px',
            borderRadius: 6,
            border: '1px solid var(--panel-border)',
            background: 'var(--btn-idle-bg)',
            color: 'var(--ink)',
            fontSize: 12,
            marginBottom: 18,
          }}
        >
          {REFERENCE_OBJECTS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label} — {r.mm} mm
            </option>
          ))}
        </select>

        <div
          style={{
            height: 90,
            background: 'var(--canvas)',
            border: '1px solid var(--divider)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: boxWidthPx,
              maxWidth: '100%',
              height: 48,
              background: 'var(--accent)',
              borderRadius: 4,
              transition: 'width 30ms linear',
            }}
          />
        </div>

        <input
          type="range"
          min={100}
          max={700}
          value={boxWidthPx}
          onChange={(e) => setBoxWidthPx(Number(e.target.value))}
          style={{ width: '100%', marginBottom: 6 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--ink-dim)', marginBottom: 20 }}>
          <span>Drag until the bar matches the {reference.label.toLowerCase()}</span>
          <span>{Math.round(impliedPPI)} PPI</span>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={secondaryBtn}>
            Use default (96 DPI)
          </button>
          <button onClick={() => onSave(impliedPPI)} style={primaryBtn}>
            Save calibration
          </button>
        </div>
      </div>
    </div>
  )
}

const primaryBtn = {
  padding: '9px 16px',
  borderRadius: 6,
  border: 'none',
  background: 'var(--btn-active-bg)',
  color: 'var(--btn-active-ink)',
  fontWeight: 700,
  fontSize: 12,
  cursor: 'pointer',
}

const secondaryBtn = {
  padding: '9px 16px',
  borderRadius: 6,
  border: '1px solid var(--panel-border)',
  background: 'transparent',
  color: 'var(--ink-dim)',
  fontWeight: 600,
  fontSize: 12,
  cursor: 'pointer',
}
