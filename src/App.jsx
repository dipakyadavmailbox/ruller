import { useEffect, useState } from 'react'
import Ruler from './components/Ruler.jsx'
import RulerPanel from './components/RulerPanel.jsx'
import CalibrationModal from './components/CalibrationModal.jsx'
import { useCalibratedPPI } from './hooks/useCalibratedPPI.js'

export default function App() {
  const [unit, setUnit] = useState('cm')
  const [edges, setEdges] = useState({ top: true, bottom: true, left: true, right: true })
  const [theme, setTheme] = useState('dark')
  const [calibrationOpen, setCalibrationOpen] = useState(false)

  const { isCalibrated, effectivePPI, rawPPI, zoomPercent, saveCalibration } = useCalibratedPPI()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggleEdge(edge) {
    setEdges((prev) => ({ ...prev, [edge]: !prev[edge] }))
  }

  const activeEdges = Object.entries(edges)
    .filter(([, on]) => on)
    .map(([edge]) => edge)

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'var(--canvas)' }}>
      {activeEdges.map((edge) => (
        <Ruler key={edge} edge={edge} unit={unit} effectivePPI={effectivePPI} />
      ))}

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
        <div
          style={{
            color: 'var(--accent)',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 3,
            marginBottom: 18,
          }}
        >
          {isCalibrated ? 'PHYSICAL SCALE' : 'UNCALIBRATED SCALE'} · {Math.round(rawPPI)} DPI
        </div>
        <h1
          style={{
            fontSize: 'clamp(32px, 6vw, 64px)',
            lineHeight: 1.15,
            fontWeight: 800,
            color: 'var(--ink)',
            margin: 0,
            maxWidth: 900,
          }}
        >
          Measure anything<br />on your screen.
        </h1>
        <p
          style={{
            marginTop: 20,
            fontSize: 15,
            color: 'var(--ink-dim)',
            maxWidth: 520,
            lineHeight: 1.6,
          }}
        >
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
