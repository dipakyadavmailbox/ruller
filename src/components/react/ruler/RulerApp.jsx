import { useEffect, useRef, useState } from 'react'
import Ruler, { RULER_THICKNESS } from './Ruler.jsx'
import RulerPanel from './RulerPanel.jsx'
import CalibrationModal from './CalibrationModal.jsx'
import GuideLayer, { createGuide } from './GuideLayer.jsx'
import MeasureOverlay from './MeasureOverlay.jsx'
import { useCalibratedPPI } from './useCalibratedPPI.js'
import { pxPerUnit } from './units.js'

export default function RulerApp() {
  const [unit, setUnit] = useState('cm')
  const [edges, setEdges] = useState({ top: true, bottom: false, left: true, right: false })
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  )
  const [calibrationOpen, setCalibrationOpen] = useState(false)
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 })
  const [showCrosshair, setShowCrosshair] = useState(false)

  // Guide system
  const [guides, setGuides] = useState([])
  const [guidesVisible, setGuidesVisible] = useState(true)

  // Measure mode
  const [measureMode, setMeasureMode] = useState(false)

  const { isCalibrated, effectivePPI, rawPPI, zoomPercent, saveCalibration } = useCalibratedPPI()

  // Update the badge in the static HTML
  useEffect(() => {
    const badge = document.getElementById('scale-badge')
    if (badge) {
      badge.textContent = `${isCalibrated ? 'PHYSICAL SCALE' : 'UNCALIBRATED'} · ${Math.round(rawPPI)} DPI`
    }
  }, [isCalibrated, rawPPI])

  // Mouse tracking
  useEffect(() => {
    function onMouseMove(e) {
      setMousePos({ x: e.clientX, y: e.clientY })
      setShowCrosshair(true)
    }
    function onMouseLeave() {
      setShowCrosshair(false)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    function onKeyDown(e) {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      switch (e.key.toLowerCase()) {
        case 'g':
          setGuidesVisible((v) => !v)
          break
        case 'm':
          setMeasureMode((m) => !m)
          break
        case 'c':
          setGuides([])
          break
        case 'escape':
          setMeasureMode(false)
          break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function updateTheme(next) {
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('toolkit:theme', next)
    } catch {}
  }

  function toggleEdge(edge) {
    setEdges((prev) => ({ ...prev, [edge]: !prev[edge] }))
  }

  // Drop a guide from clicking a ruler edge
  function handleDropGuide(orientation, pos) {
    if (measureMode) return // don't drop guides in measure mode
    setGuides((prev) => [...prev, createGuide(orientation, pos)])
  }

  const activeEdges = Object.entries(edges)
    .filter(([, on]) => on)
    .map(([edge]) => edge)

  // Convert px position to the current unit for readout
  const pxPerU = pxPerUnit(effectivePPI, unit)
  const readoutX = (mousePos.x / pxPerU).toFixed(unit === 'in' ? 2 : unit === 'px' ? 0 : 1)
  const readoutY = (mousePos.y / pxPerU).toFixed(unit === 'in' ? 2 : unit === 'px' ? 0 : 1)

  const crosshairColor = theme === 'dark' ? 'rgba(99,102,241,0.5)' : 'rgba(60,100,200,0.45)'
  const readoutBg = theme === 'dark' ? 'rgba(8,12,28,0.92)' : 'rgba(240,244,255,0.95)'
  const readoutInk = theme === 'dark' ? '#c8d8f8' : '#1a2040'

  // CSS custom props for ruler theme
  const rulerCssVars = {
    '--ruler-bg-near': theme === 'dark' ? '#0f1628' : '#e8edf8',
    '--ruler-bg-far':  theme === 'dark' ? '#070b18' : '#d4daf0',
    '--ruler-border':  theme === 'dark' ? 'rgba(99,102,241,0.25)' : 'rgba(79,70,229,0.2)',
    '--tick':     theme === 'dark' ? 'rgba(148,163,184,0.75)' : 'rgba(51,65,85,0.7)',
    '--tick-dim': theme === 'dark' ? 'rgba(71,85,105,0.5)' : 'rgba(148,163,184,0.6)',
  }

  return (
    <div style={rulerCssVars}>
      {/* Rulers at edges */}
      {activeEdges.map((edge) => (
        <Ruler
          key={edge}
          edge={edge}
          unit={unit}
          effectivePPI={effectivePPI}
          mousePos={mousePos}
          onDropGuide={handleDropGuide}
        />
      ))}

      {/* Draggable guide lines */}
      <GuideLayer
        guides={guides}
        setGuides={setGuides}
        unit={unit}
        effectivePPI={effectivePPI}
        visible={guidesVisible}
      />

      {/* Measurement overlay */}
      <MeasureOverlay
        active={measureMode}
        unit={unit}
        effectivePPI={effectivePPI}
        onFinish={() => setMeasureMode(false)}
      />

      {/* Crosshair (only when not in measure mode) */}
      {showCrosshair && !measureMode && (
        <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: mousePos.x,
              top: 0,
              bottom: 0,
              width: 1,
              background: crosshairColor,
            }}
          />
          {/* Horizontal line */}
          <div
            style={{
              position: 'absolute',
              top: mousePos.y,
              left: 0,
              right: 0,
              height: 1,
              background: crosshairColor,
            }}
          />
          {/* Position readout tooltip */}
          <div
            style={{
              position: 'absolute',
              left: mousePos.x + 16,
              top: mousePos.y + 16,
              background: readoutBg,
              border: '1px solid rgba(99,102,241,0.35)',
              borderRadius: 7,
              padding: '5px 10px',
              fontSize: 10,
              fontWeight: 700,
              color: readoutInk,
              fontFamily: 'var(--font-mono)',
              letterSpacing: 0.2,
              whiteSpace: 'nowrap',
              boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
            }}
          >
            {readoutX} {unit}  ·  {readoutY} {unit}
          </div>
        </div>
      )}

      {/* Back to all tools button */}
      <a
        href="/"
        style={{
          position: 'fixed',
          top: edges.top ? RULER_THICKNESS + 10 : 10,
          right: edges.right ? RULER_THICKNESS + 10 : 10,
          zIndex: 100,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 0.5,
          color: 'rgba(148,163,184,0.7)',
          background: 'rgba(8,12,28,0.85)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 7,
          padding: '7px 12px',
          textDecoration: 'none',
          backdropFilter: 'blur(8px)',
          transition: 'all 120ms ease',
        }}
      >
        ← All tools
      </a>

      {/* Control panel */}
      <RulerPanel
        unit={unit}
        setUnit={setUnit}
        edges={edges}
        toggleEdge={toggleEdge}
        theme={theme}
        setTheme={updateTheme}
        isCalibrated={isCalibrated}
        rawPPI={rawPPI}
        zoomPercent={zoomPercent}
        onOpenCalibration={() => setCalibrationOpen(true)}
        guides={guides}
        setGuides={setGuides}
        guidesVisible={guidesVisible}
        setGuidesVisible={setGuidesVisible}
        measureMode={measureMode}
        setMeasureMode={setMeasureMode}
      />

      {/* Calibration modal */}
      {calibrationOpen && (
        <CalibrationModal
          onClose={() => setCalibrationOpen(false)}
          onSave={(ppi) => {
            saveCalibration(ppi)
            setCalibrationOpen(false)
          }}
        />
      )}
    </div>
  )
}
