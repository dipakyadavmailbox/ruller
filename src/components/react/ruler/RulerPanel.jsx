import { useState } from 'react'
import { useDraggable } from './useDraggable.js'
import { pxPerUnit, UNITS } from './units.js'

const EDGE_CONFIG = {
  top:    { label: 'Top',    icon: '↑', axis: 'H' },
  bottom: { label: 'Bottom', icon: '↓', axis: 'H' },
  left:   { label: 'Left',   icon: '←', axis: 'V' },
  right:  { label: 'Right',  icon: '→', axis: 'V' },
}

const SHORTCUT_KEYS = [
  { key: 'G', desc: 'Toggle guides' },
  { key: 'M', desc: 'Measure mode' },
  { key: 'C', desc: 'Clear guides' },
  { key: 'Esc', desc: 'Cancel / exit' },
]

export default function RulerPanel({
  unit, setUnit,
  edges, toggleEdge,
  theme, setTheme,
  isCalibrated, rawPPI, zoomPercent,
  onOpenCalibration,
  guides, setGuides,
  guidesVisible, setGuidesVisible,
  measureMode, setMeasureMode,
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [tab, setTab] = useState('controls') // 'controls' | 'guides' | 'shortcuts'
  const { position, handlers } = useDraggable({ x: 52, y: 52 })
  const pxPerU = pxPerUnit(rawPPI, unit)

  function clearGuides() {
    setGuides([])
  }

  function deleteGuide(id) {
    setGuides((prev) => prev.filter((g) => g.id !== id))
  }

  return (
    <div
      {...handlers}
      data-panel
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 260,
        background: 'rgba(8, 12, 28, 0.92)',
        border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: 14,
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(99,102,241,0.15) inset',
        backdropFilter: 'blur(16px)',
        zIndex: 100,
        fontFamily: 'var(--font-mono)',
        cursor: 'grab',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 14px',
          borderBottom: collapsed ? 'none' : '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(99,102,241,0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 6,
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, flexShrink: 0,
          }}>
            📏
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: '#f8fafc' }}>RULER</div>
            <div style={{ fontSize: 9, color: 'rgba(148,163,184,0.6)', letterSpacing: 0.3 }}>
              {isCalibrated ? `${Math.round(rawPPI)} PPI · CALIBRATED` : `${Math.round(rawPPI)} PPI · UNCALIBRATED`}
            </div>
          </div>
        </div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand panel' : 'Collapse panel'}
          style={{ background: 'transparent', border: 'none', color: 'rgba(148,163,184,0.6)', cursor: 'pointer', fontSize: 14, padding: '0 2px' }}
        >
          {collapsed ? '▾' : '▴'}
        </button>
      </div>

      {!collapsed && (
        <>
          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {[
              { id: 'controls', label: 'Controls' },
              { id: 'guides', label: `Guides (${guides.length})` },
              { id: 'shortcuts', label: 'Keys' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: tab === t.id ? '2px solid #6366f1' : '2px solid transparent',
                  color: tab === t.id ? '#f8fafc' : 'rgba(148,163,184,0.5)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 0.3,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 120ms ease',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 14 }}>

            {tab === 'controls' && (
              <>
                {/* Unit selector */}
                <section>
                  <SectionLabel>UNIT</SectionLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                    {UNITS.map((u) => (
                      <SegBtn key={u} active={unit === u} onClick={() => setUnit(u)}>
                        {u}
                      </SegBtn>
                    ))}
                  </div>
                </section>

                {/* Ruler edges */}
                <section>
                  <SectionLabel>RULERS</SectionLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                    {Object.entries(EDGE_CONFIG).map(([key, { label, icon }]) => (
                      <SegBtn key={key} active={edges[key]} onClick={() => toggleEdge(key)}>
                        <span style={{ marginRight: 4 }}>{icon}</span>{label}
                      </SegBtn>
                    ))}
                  </div>
                </section>

                {/* Quick actions */}
                <section>
                  <SectionLabel>ACTIONS</SectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {/* Measure mode toggle */}
                    <button
                      onClick={() => setMeasureMode((m) => !m)}
                      style={{
                        ...actionBtn,
                        background: measureMode ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.05)',
                        borderColor: measureMode ? 'rgba(251,191,36,0.5)' : 'rgba(255,255,255,0.1)',
                        color: measureMode ? 'rgba(251,191,36,0.95)' : 'rgba(148,163,184,0.8)',
                      }}
                    >
                      <span>⬚</span>
                      {measureMode ? 'Exit Measure Mode' : 'Measure Area (M)'}
                    </button>

                    {/* Toggle guides */}
                    <button
                      onClick={() => setGuidesVisible((v) => !v)}
                      style={{
                        ...actionBtn,
                        background: guidesVisible ? 'rgba(99,240,140,0.08)' : 'rgba(255,255,255,0.05)',
                        borderColor: guidesVisible ? 'rgba(99,240,140,0.35)' : 'rgba(255,255,255,0.1)',
                        color: guidesVisible ? 'rgba(99,240,140,0.9)' : 'rgba(148,163,184,0.8)',
                      }}
                    >
                      <span>{guidesVisible ? '◈' : '◇'}</span>
                      {guidesVisible ? 'Guides On (G)' : 'Guides Off (G)'}
                    </button>

                    {/* Clear guides */}
                    {guides.length > 0 && (
                      <button
                        onClick={clearGuides}
                        style={{
                          ...actionBtn,
                          borderColor: 'rgba(239,68,68,0.3)',
                          color: 'rgba(239,68,68,0.8)',
                        }}
                      >
                        <span>✕</span>
                        Clear {guides.length} guide{guides.length !== 1 ? 's' : ''} (C)
                      </button>
                    )}
                  </div>
                </section>

                {/* Divider */}
                <div style={{ borderTop: '1px dashed rgba(255,255,255,0.08)' }} />

                {/* Theme + Calibration */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    style={{
                      ...actionBtn,
                      flex: 1,
                      justifyContent: 'center',
                    }}
                  >
                    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                  </button>
                  <button
                    onClick={onOpenCalibration}
                    style={{
                      ...actionBtn,
                      flex: 1,
                      justifyContent: 'center',
                      borderColor: isCalibrated ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.5)',
                      color: isCalibrated ? 'rgba(148,163,184,0.8)' : 'rgba(99,102,241,0.9)',
                    }}
                    title="Calibrate against a physical object for true scale"
                  >
                    {isCalibrated ? '✓ Calibrated' : '⟳ Calibrate'}
                  </button>
                </div>

                <div style={{ fontSize: 9, color: 'rgba(100,116,139,0.6)', textAlign: 'center' }}>
                  zoom {zoomPercent}% · click ruler edges to add guides
                </div>
              </>
            )}

            {tab === 'guides' && (
              <>
                {guides.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px 0', color: 'rgba(100,116,139,0.6)', fontSize: 11 }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>◇</div>
                    No guides yet.<br />Click on a ruler edge to place one.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 220, overflowY: 'auto' }}>
                    {guides.map((g) => {
                      const pxPerU = pxPerUnit(rawPPI, unit)
                      const measurement = (g.pos / pxPerU).toFixed(unit === 'in' ? 3 : unit === 'px' ? 0 : 1)
                      return (
                        <div key={g.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '7px 10px',
                          background: 'rgba(99,240,140,0.06)',
                          border: '1px solid rgba(99,240,140,0.2)',
                          borderRadius: 7,
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 10, color: 'rgba(99,240,140,0.6)' }}>
                              {g.orientation === 'h' ? '— H' : '| V'}
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(99,240,140,0.9)', fontFamily: 'var(--font-mono)' }}>
                              {measurement} {unit}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteGuide(g.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'rgba(239,68,68,0.7)',
                              cursor: 'pointer',
                              fontSize: 12,
                              padding: '2px 4px',
                              lineHeight: 1,
                            }}
                            title="Delete guide"
                          >
                            ×
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )}
                {guides.length > 0 && (
                  <button onClick={clearGuides} style={{ ...actionBtn, borderColor: 'rgba(239,68,68,0.3)', color: 'rgba(239,68,68,0.8)', justifyContent: 'center' }}>
                    Clear all guides
                  </button>
                )}
              </>
            )}

            {tab === 'shortcuts' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {SHORTCUT_KEYS.map(({ key, desc }) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.7)' }}>{desc}</span>
                    <kbd style={{
                      fontSize: 10, fontWeight: 700,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderBottom: '2px solid rgba(255,255,255,0.1)',
                      borderRadius: 5,
                      padding: '3px 8px',
                      color: '#f8fafc',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {key}
                    </kbd>
                  </div>
                ))}
                <div style={{ marginTop: 4, borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: 10 }}>
                  <div style={{ fontSize: 10, color: 'rgba(100,116,139,0.6)', lineHeight: 1.6 }}>
                    Double-click any guide to delete it.<br />
                    Drag guides to reposition.
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 9,
      fontWeight: 800,
      letterSpacing: 1.2,
      color: 'rgba(100,116,139,0.7)',
      marginBottom: 7,
      textTransform: 'uppercase',
    }}>
      {children}
    </div>
  )
}

function SegBtn({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7px 4px',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 0.3,
        borderRadius: 6,
        border: `1px solid ${active ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'}`,
        cursor: 'pointer',
        background: active ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
        color: active ? '#a5b4fc' : 'rgba(148,163,184,0.7)',
        transition: 'all 120ms ease',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {children}
    </button>
  )
}

const actionBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: 7,
  padding: '8px 10px',
  borderRadius: 7,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.05)',
  color: 'rgba(148,163,184,0.8)',
  fontSize: 10,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'var(--font-mono)',
  letterSpacing: 0.3,
  transition: 'all 120ms ease',
  width: '100%',
}
