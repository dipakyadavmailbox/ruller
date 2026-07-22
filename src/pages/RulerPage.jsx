import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Ruler from '../components/ruler/Ruler.jsx'
import RulerPanel from '../components/ruler/RulerPanel.jsx'
import CalibrationModal from '../components/ruler/CalibrationModal.jsx'
import { useCalibratedPPI } from '../hooks/useCalibratedPPI.js'
import { useTheme } from '../hooks/useTheme.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

// The ruler stays outside the shared <Layout> on purpose: any header/nav
// chrome above it would push the "top" ruler away from the browser's true
// physical top edge, throwing off measurements. It gets its own minimal
// "back to upkarans" link instead. Theme still comes from the shared hook so
// it stays in sync with the rest of the site.
export default function RulerPage() {
  usePageMeta({
    title: 'Online Screen Ruler — Measure Anything on Your Screen',
    description: 'A free on-screen ruler in mm, cm, or inches, calibrated to your real display so it measures true physical size — even as you zoom.',
  })

  const [unit, setUnit] = useState('cm')
  const [edges, setEdges] = useState({ top: true, bottom: true, left: true, right: true })
  const [calibrationOpen, setCalibrationOpen] = useState(false)

  const { theme, setTheme } = useTheme()
  const { isCalibrated, effectivePPI, rawPPI, zoomPercent, saveCalibration } = useCalibratedPPI()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  function toggleEdge(edge) {
    setEdges((prev) => ({ ...prev, [edge]: !prev[edge] }))
  }

  const activeEdges = Object.entries(edges)
    .filter(([, on]) => on)
    .map(([edge]) => edge)

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'var(--canvas)' }}>
      {activeEdges.map((edge) => (
        <Ruler key={edge} edge={edge} unit={unit} effectivePPI={effectivePPI} />
      ))}

      <Link
        to="/"
        style={{
          position: 'fixed',
          top: 14,
          right: 14,
          zIndex: 100,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 0.5,
          color: 'var(--ink-dim)',
          background: 'var(--panel-bg)',
          border: '1px solid var(--panel-border)',
          borderRadius: 6,
          padding: '8px 12px',
          textDecoration: 'none',
        }}
      >
        ← All Upkarans
      </Link>

      <RulerPanel
        unit={unit}
        setUnit={setUnit}
        edges={edges}
        toggleEdge={toggleEdge}
        theme={theme}
        setTheme={setTheme}
        isCalibrated={isCalibrated}
        rawPPI={rawPPI}
        zoomPercent={zoomPercent}
        onOpenCalibration={() => setCalibrationOpen(true)}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 48px',
          pointerEvents: 'none',
        }}
      >
        <div style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 800, letterSpacing: 3, marginBottom: 18 }}>
          {isCalibrated ? 'PHYSICAL SCALE' : 'UNCALIBRATED SCALE'} · {Math.round(rawPPI)} DPI
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', lineHeight: 1.15, fontWeight: 800, color: 'var(--ink)', margin: 0, maxWidth: 900 }}>
          Measure anything<br />on your screen.
        </h1>
        <p style={{ marginTop: 20, fontSize: 15, color: 'var(--ink-dim)', maxWidth: 520, lineHeight: 1.6 }}>
          Rulers pinned to the edges of the viewport at true millimetre / inch
          scale. Physically fixed even when you zoom your browser.
        </p>
      </div>

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
