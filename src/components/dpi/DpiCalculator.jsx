import { useMemo, useState } from 'react'
import { QUALITY_PRESETS, printSizeFromPixels, pixelsNeededForPrint, dpiFromPixelsAndSize, inToCm } from './dpiMath.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { Field, ResultCard, inputStyle, selectStyle, segBtn } from '../shared/FormKit.jsx'

const AFFILIATE_ITEMS = [
  { name: 'Photo printer', blurb: 'Print at true photo-lab quality from home for any size below.', href: '#', cta: 'Shop →' },
  { name: 'Archival photo paper', blurb: 'Acid-free, fade-resistant paper that matches your target DPI.', href: '#', cta: 'Shop →' },
  { name: 'Printful / Shutterfly', blurb: 'Send your file out for large-format prints, canvases, or posters.', href: '#', cta: 'Order prints →' },
]

export default function DpiCalculator() {
  usePageMeta({
    title: 'DPI / PPI Print Size Calculator — Free Online Tool',
    description: 'Find out what print size your image resolution supports, or how many pixels you need for a target print size at a given DPI/PPI.',
  })

  const [mode, setMode] = useState('size-from-pixels') // 'size-from-pixels' | 'pixels-from-size' | 'dpi-from-both'

  const [pixelWidth, setPixelWidth] = useState(3000)
  const [pixelHeight, setPixelHeight] = useState(2000)
  const [dpi, setDpi] = useState(300)

  const [printWidthIn, setPrintWidthIn] = useState(10)
  const [printHeightIn, setPrintHeightIn] = useState(8)

  const sizeResult = useMemo(
    () => printSizeFromPixels(Number(pixelWidth) || 0, Number(pixelHeight) || 0, Number(dpi) || 1),
    [pixelWidth, pixelHeight, dpi]
  )
  const pixelsResult = useMemo(
    () => pixelsNeededForPrint(Number(printWidthIn) || 0, Number(printHeightIn) || 0, Number(dpi) || 1),
    [printWidthIn, printHeightIn, dpi]
  )
  const dpiResult = useMemo(
    () => dpiFromPixelsAndSize(Number(pixelWidth) || 0, Number(pixelHeight) || 0, Number(printWidthIn) || 1, Number(printHeightIn) || 1),
    [pixelWidth, pixelHeight, printWidthIn, printHeightIn]
  )

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px 60px' }}>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
        DPI / PPI Print Size Calculator
      </h1>
      <p style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        Figure out what print size your image supports, or how many pixels
        you need to hit a target print size and quality.
      </p>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
        <button onClick={() => setMode('size-from-pixels')} style={segBtn(mode === 'size-from-pixels')}>Max print size</button>
        <button onClick={() => setMode('pixels-from-size')} style={segBtn(mode === 'pixels-from-size')}>Pixels needed</button>
        <button onClick={() => setMode('dpi-from-both')} style={segBtn(mode === 'dpi-from-both')}>Check my DPI</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 8 }}>
        {mode !== 'pixels-from-size' && (
          <>
            <Field label="Image width (px)">
              <input type="number" min={1} value={pixelWidth} onChange={(e) => setPixelWidth(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Image height (px)">
              <input type="number" min={1} value={pixelHeight} onChange={(e) => setPixelHeight(e.target.value)} style={inputStyle} />
            </Field>
          </>
        )}
        {mode !== 'size-from-pixels' && (
          <>
            <Field label="Print width (in)">
              <input type="number" min={0.1} step={0.1} value={printWidthIn} onChange={(e) => setPrintWidthIn(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Print height (in)">
              <input type="number" min={0.1} step={0.1} value={printHeightIn} onChange={(e) => setPrintHeightIn(e.target.value)} style={inputStyle} />
            </Field>
          </>
        )}
        {mode !== 'dpi-from-both' && (
          <Field label="Target quality">
            <select value={dpi} onChange={(e) => setDpi(Number(e.target.value))} style={selectStyle}>
              {QUALITY_PRESETS.map((p) => (
                <option key={p.dpi} value={p.dpi}>{p.label}</option>
              ))}
            </select>
          </Field>
        )}
      </div>

      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        {mode === 'size-from-pixels' && (
          <>
            <ResultCard
              label="Max print size"
              value={`${sizeResult.widthIn.toFixed(1)}" × ${sizeResult.heightIn.toFixed(1)}"`}
              sub={`${inToCm(sizeResult.widthIn).toFixed(1)} × ${inToCm(sizeResult.heightIn).toFixed(1)} cm`}
              highlight
            />
          </>
        )}
        {mode === 'pixels-from-size' && (
          <ResultCard
            label="Pixels needed"
            value={`${pixelsResult.widthPx.toLocaleString()} × ${pixelsResult.heightPx.toLocaleString()} px`}
            highlight
          />
        )}
        {mode === 'dpi-from-both' && (
          <ResultCard
            label="Your effective resolution"
            value={`${Math.round(dpiResult.dpiWidth)} × ${Math.round(dpiResult.dpiHeight)} DPI`}
            sub={dpiResult.dpiWidth >= 250 ? 'Good for standard photo printing' : dpiResult.dpiWidth >= 100 ? 'OK for large-format / viewed from a distance' : 'Likely to look pixelated at this size'}
            highlight
          />
        )}
      </div>

      <p style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 20 }}>
        300 DPI is the standard for close-up photo prints; large-format
        prints (posters, banners) viewed from a distance can look sharp at
        100-150 DPI.
      </p>

      <AffiliateCard heading="BRING YOUR PHOTOS TO PRINT" items={AFFILIATE_ITEMS} />
    </div>
  )
}
