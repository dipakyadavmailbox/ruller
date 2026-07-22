import { useState } from 'react'
import { useDraggable } from '../../hooks/useDraggable.js'
import SegButton from './SegButton.jsx'

const EDGE_LABELS = {
  top: { label: 'Top', icon: '↑' },
  bottom: { label: 'Bottom', icon: '↓' },
  left: { label: 'Left', icon: '←' },
  right: { label: 'Right', icon: '→' },
}

export default function RulerPanel({
  unit, setUnit,
  edges, toggleEdge,
  theme, setTheme,
  isCalibrated, rawPPI, zoomPercent,
  onOpenCalibration,
}) {
  const [collapsed, setCollapsed] = useState(false)
  const { position, handlers } = useDraggable({ x: 24, y: 24 })

  return (
    <div
      {...handlers}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 240,
        background: 'var(--panel-bg)',
        border: '1px solid var(--panel-border)',
        borderRadius: 12,
        boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
        zIndex: 100,
        fontFamily: 'var(--font-mono)',
        cursor: 'grab',
        overflow: 'hidden',
      }}
    >
      {/* header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          borderBottom: collapsed ? 'none' : '1px solid var(--divider)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 800, letterSpacing: 1, color: 'var(--ink)' }}>
          <span aria-hidden="true">📏</span>
          FIXED RULER
        </div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand panel' : 'Collapse panel'}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--ink-dim)',
            cursor: 'pointer',
            fontSize: 12,
            padding: 4,
          }}
        >
          {collapsed ? '▾' : '▴'}
        </button>
      </div>

      {!collapsed && (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* unit */}
          <section>
            <div style={sectionLabelStyle}>UNIT</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['mm', 'cm', 'in'].map((u) => (
                <SegButton key={u} active={unit === u} onClick={() => setUnit(u)}>
                  {u.toUpperCase()}
                </SegButton>
              ))}
            </div>
          </section>

          {/* ruler position */}
          <section>
            <div style={sectionLabelStyle}>RULER POSITION</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {Object.entries(EDGE_LABELS).map(([key, { label, icon }]) => (
                <SegButton key={key} active={edges[key]} onClick={() => toggleEdge(key)} icon={<span>{icon}</span>}>
                  {label}
                </SegButton>
              ))}
            </div>
          </section>

          {/* theme */}
          <section>
            <div style={sectionLabelStyle}>THEME</div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: 6,
                border: 'none',
                background: 'var(--btn-idle-bg)',
                color: 'var(--ink)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {theme === 'dark' ? 'Dark' : 'Light'}
              <span aria-hidden="true">{theme === 'dark' ? '🌙' : '☀️'}</span>
            </button>
          </section>

          <div style={{ borderTop: '1px dashed var(--divider)' }} />

          {/* footer / calibration */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10, color: 'var(--ink-dim)' }}>
            <span>zoom {zoomPercent}%</span>
            <button
              onClick={onOpenCalibration}
              style={{
                background: 'transparent',
                border: 'none',
                color: isCalibrated ? 'var(--ink-dim)' : 'var(--accent)',
                cursor: 'pointer',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 0.5,
                padding: 0,
              }}
              title="Calibrate against a physical object for true scale"
            >
              {isCalibrated ? `${Math.round(rawPPI)} PPI` : 'CALIBRATE →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const sectionLabelStyle = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: 1,
  color: 'var(--ink-faint)',
  marginBottom: 8,
}
