import { useMemo, useState } from 'react'
import { QUALITY_PRESETS, STANDARD_PRINT_SIZES, printSizeFromPixels, pixelsNeededForPrint, dpiFromPixelsAndSize, optimalDpiForDistance, inToCm, cmToIn } from './dpiMath.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { Field, ResultCard, inputStyle, selectStyle, segBtn } from '../shared/FormKit.jsx'
import { makeFormatters } from '../shared/useLocale.js'

const AFFILIATE_ITEMS = [
  { name: 'Photo printer', blurb: 'Print at true photo-lab quality from home for any size below.', href: '#', cta: 'Shop →' },
  { name: 'Archival photo paper', blurb: 'Acid-free, fade-resistant paper that matches your target DPI.', href: '#', cta: 'Shop →' },
  { name: 'Printful / Shutterfly', blurb: 'Send your file out for large-format prints, canvases, or posters.', href: '#', cta: 'Order prints →' },
]

export default function DpiCalculator({
  lang = 'en',
  initialMode = 'size-from-pixels',
  initialDpi = 300,
  initialPixelWidth = 3000,
  initialPixelHeight = 2000,
  initialPrintWidth = 10,
  initialPrintHeight = 8,
  initialUnit = 'in',
} = {}) {
  const fmt = useMemo(() => makeFormatters(lang), [lang])
  const [mode, setMode] = useState(initialMode || 'size-from-pixels') // 'size-from-pixels' | 'pixels-from-size' | 'dpi-from-both' | 'distance'
  // An explicit initialUnit from a preset page wins; otherwise follow the locale.
  const [unit, setUnit] = useState(initialUnit || (fmt.units === 'metric' ? 'cm' : 'in'))

  const [pixelWidth, setPixelWidth] = useState(initialPixelWidth || 3000)
  const [pixelHeight, setPixelHeight] = useState(initialPixelHeight || 2000)
  const [dpi, setDpi] = useState(initialDpi || 300)

  const [printWidth, setPrintWidth] = useState(initialPrintWidth || 10)
  const [printHeight, setPrintHeight] = useState(initialPrintHeight || 8)

  const [viewDistanceFeet, setViewDistanceFeet] = useState(2) // 2 feet

  const printWidthInches = unit === 'in' ? Number(printWidth) || 0 : cmToIn(Number(printWidth) || 0)
  const printHeightInches = unit === 'in' ? Number(printHeight) || 0 : cmToIn(Number(printHeight) || 0)

  const sizeResult = useMemo(
    () => printSizeFromPixels(Number(pixelWidth) || 0, Number(pixelHeight) || 0, Number(dpi) || 1),
    [pixelWidth, pixelHeight, dpi]
  )
  const pixelsResult = useMemo(
    () => pixelsNeededForPrint(printWidthInches, printHeightInches, Number(dpi) || 1),
    [printWidthInches, printHeightInches, dpi]
  )
  const dpiResult = useMemo(
    () => dpiFromPixelsAndSize(Number(pixelWidth) || 0, Number(pixelHeight) || 0, printWidthInches || 1, printHeightInches || 1),
    [pixelWidth, pixelHeight, printWidthInches, printHeightInches]
  )
  const distanceOptimalDpi = useMemo(
    () => optimalDpiForDistance(Number(viewDistanceFeet) || 1),
    [viewDistanceFeet]
  )

  function applyPreset(preset) {
    if (unit === 'in') {
      setPrintWidth(preset.wIn)
      setPrintHeight(preset.hIn)
    } else {
      setPrintWidth(preset.wCm)
      setPrintHeight(preset.hCm)
    }
  }

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 20px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button onClick={() => setMode('size-from-pixels')} style={segBtn(mode === 'size-from-pixels')}>Max Print Size</button>
          <button onClick={() => setMode('pixels-from-size')} style={segBtn(mode === 'pixels-from-size')}>Pixels Needed</button>
          <button onClick={() => setMode('dpi-from-both')} style={segBtn(mode === 'dpi-from-both')}>Calculate DPI</button>
          <button onClick={() => setMode('distance')} style={segBtn(mode === 'distance')}>Viewing Distance</button>
        </div>

        {(mode === 'pixels-from-size' || mode === 'dpi-from-both') && (
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setUnit('in')} style={segBtn(unit === 'in')}>Inches</button>
            <button onClick={() => setUnit('cm')} style={segBtn(unit === 'cm')}>CM</button>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
        {mode !== 'pixels-from-size' && mode !== 'distance' && (
          <>
            <Field label="Image width (px)">
              <input type="number" min={1} value={pixelWidth} onChange={(e) => setPixelWidth(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Image height (px)">
              <input type="number" min={1} value={pixelHeight} onChange={(e) => setPixelHeight(e.target.value)} style={inputStyle} />
            </Field>
          </>
        )}

        {(mode === 'pixels-from-size' || mode === 'dpi-from-both') && (
          <>
            <Field label={`Print width (${unit})`}>
              <input type="number" min={0.1} step={0.1} value={printWidth} onChange={(e) => setPrintWidth(e.target.value)} style={inputStyle} />
            </Field>
            <Field label={`Print height (${unit})`}>
              <input type="number" min={0.1} step={0.1} value={printHeight} onChange={(e) => setPrintHeight(e.target.value)} style={inputStyle} />
            </Field>
          </>
        )}

        {mode !== 'dpi-from-both' && mode !== 'distance' && (
          <Field label="Target Quality (DPI)">
            <select value={dpi} onChange={(e) => setDpi(Number(e.target.value))} style={selectStyle}>
              {QUALITY_PRESETS.map((p) => (
                <option key={p.dpi} value={p.dpi}>{p.label}</option>
              ))}
            </select>
          </Field>
        )}

        {mode === 'distance' && (
          <Field label="Viewing Distance (feet)">
            <input type="number" min={0.5} max={100} step={0.5} value={viewDistanceFeet} onChange={(e) => setViewDistanceFeet(e.target.value)} style={inputStyle} />
          </Field>
        )}
      </div>

      {(mode === 'pixels-from-size' || mode === 'dpi-from-both') && (
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)', display: 'block', marginBottom: 8 }}>
            Quick Standard Print Size Presets
          </label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {STANDARD_PRINT_SIZES.map((preset) => (
              <button key={preset.label} onClick={() => applyPreset(preset)} style={segBtn(false)}>
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        {mode === 'size-from-pixels' && (
          <>
            <ResultCard
              label="Maximum Print Size in Inches"
              value={`${sizeResult.widthIn.toFixed(1)}" × ${sizeResult.heightIn.toFixed(1)}"`}
              sub={`At ${dpi} DPI resolution`}
              highlight
            />
            <ResultCard
              label="Maximum Print Size in Centimeters"
              value={`${inToCm(sizeResult.widthIn).toFixed(1)} × ${inToCm(sizeResult.heightIn).toFixed(1)} cm`}
              sub="Metric conversion"
            />
          </>
        )}

        {mode === 'pixels-from-size' && (
          <ResultCard
            label="Required Pixel Resolution"
            value={`${fmt.integer(pixelsResult.widthPx)} × ${fmt.integer(pixelsResult.heightPx)} px`}
            sub={`For ${printWidth} × ${printHeight} ${unit} at ${dpi} DPI`}
            highlight
          />
        )}

        {mode === 'dpi-from-both' && (
          <ResultCard
            label="Effective Print Resolution"
            value={`${Math.round(dpiResult.dpiWidth)} × ${Math.round(dpiResult.dpiHeight)} DPI`}
            sub={
              dpiResult.dpiWidth >= 250
                ? '✅ Excellent photo-lab quality print sharpness'
                : dpiResult.dpiWidth >= 120
                ? '⚠️ Acceptable quality for medium viewing distance'
                : '❌ Low resolution — print may appear pixelated up close'
            }
            highlight
          />
        )}

        {mode === 'distance' && (
          <>
            <ResultCard
              label="Recommended Resolution"
              value={`${distanceOptimalDpi} DPI`}
              sub={`For viewing from ${viewDistanceFeet} ft (${(viewDistanceFeet * 0.3048).toFixed(1)}m)`}
              highlight
            />
            <ResultCard
              label="Visual Perception"
              value={viewDistanceFeet <= 1.5 ? 'Close Photo Reading' : viewDistanceFeet <= 4 ? 'Wall Art / Poster' : 'Banner / Signage'}
              sub="Human eye resolving power limit"
            />
          </>
        )}
      </div>

      <p style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 24, lineHeight: 1.6 }}>
        💡 <strong>Pro Tip:</strong> 300 DPI is the industry standard for photo books and prints held close in hand. For large wall frames or posters viewed from a few feet away, 150 DPI yields crisp, professional results.
      </p>

      <AffiliateCard heading="BRING YOUR PHOTOS TO PRINT" items={AFFILIATE_ITEMS} />
    </div>
  )
}
