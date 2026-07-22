import { useMemo, useState } from 'react'
import { COMMON_RATIOS, simplifyRatio, dimensionsForRatio, centerCropForRatio } from './aspectMath.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { Field, ResultCard, inputStyle, segBtn } from '../shared/FormKit.jsx'

const AFFILIATE_ITEMS = [
  { name: 'Camera tripod', blurb: 'Get consistent framing so cropping to any ratio needs less correction.', href: '#', cta: 'Shop →' },
  { name: 'Adobe Lightroom / Photoshop', blurb: 'Non-destructive cropping with saved aspect-ratio presets.', href: '#', cta: 'Try free →' },
  { name: 'Mirrorless camera bodies', blurb: 'Shoot in-camera aspect-ratio guides for social-ready framing.', href: '#', cta: 'Shop →' },
]

export default function AspectRatioCalculator() {
  usePageMeta({
    title: 'Aspect Ratio & Crop Calculator — Free Online Tool',
    description: 'Calculate matching dimensions for any aspect ratio (1:1, 4:5, 9:16, 16:9, and more), or find the center-crop size and offset to fit your image to a target ratio.',
  })

  const [mode, setMode] = useState('dimensions') // 'dimensions' | 'crop'

  const [knownWidth, setKnownWidth] = useState(1080)
  const [customRatioW, setCustomRatioW] = useState(4)
  const [customRatioH, setCustomRatioH] = useState(5)

  const [origWidth, setOrigWidth] = useState(4000)
  const [origHeight, setOrigHeight] = useState(3000)
  const [cropRatioIndex, setCropRatioIndex] = useState(1)

  const simplified = useMemo(() => simplifyRatio(origWidth, origHeight), [origWidth, origHeight])

  const dimensionResults = useMemo(() => {
    const ratio = { w: Number(customRatioW) || 1, h: Number(customRatioH) || 1 }
    return COMMON_RATIOS.map((r) => ({ ...r, ...dimensionsForRatio(r, Number(knownWidth) || 0) }))
      .concat([{ label: `Custom ${ratio.w}:${ratio.h}`, ...dimensionsForRatio(ratio, Number(knownWidth) || 0) }])
  }, [knownWidth, customRatioW, customRatioH])

  const cropResult = useMemo(() => {
    const ratio = COMMON_RATIOS[cropRatioIndex]
    return centerCropForRatio(Number(origWidth) || 1, Number(origHeight) || 1, ratio)
  }, [origWidth, origHeight, cropRatioIndex])

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '32px 20px 60px' }}>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
        Aspect Ratio & Crop Calculator
      </h1>
      <p style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        Find matching dimensions for a target aspect ratio, or calculate the
        largest center-crop of a given ratio that fits your image.
      </p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        <button onClick={() => setMode('dimensions')} style={segBtn(mode === 'dimensions')}>Get dimensions</button>
        <button onClick={() => setMode('crop')} style={segBtn(mode === 'crop')}>Crop calculator</button>
      </div>

      {mode === 'dimensions' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
            <Field label="Known width (px)">
              <input type="number" min={1} value={knownWidth} onChange={(e) => setKnownWidth(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Custom ratio W">
              <input type="number" min={1} value={customRatioW} onChange={(e) => setCustomRatioW(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Custom ratio H">
              <input type="number" min={1} value={customRatioH} onChange={(e) => setCustomRatioH(e.target.value)} style={inputStyle} />
            </Field>
          </div>

          <div style={{ border: '1px solid var(--panel-border)', borderRadius: 8, overflow: 'hidden' }}>
            {dimensionResults.map((r, i) => (
              <div
                key={r.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  fontSize: 12.5,
                  borderTop: i ? '1px solid var(--panel-border)' : 'none',
                  background: i === dimensionResults.length - 1 ? 'var(--panel-bg)' : 'transparent',
                }}
              >
                <span style={{ color: 'var(--ink-dim)' }}>{r.label}</span>
                <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{r.width} × {r.height} px</span>
              </div>
            ))}
          </div>
        </>
      )}

      {mode === 'crop' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 8 }}>
            <Field label="Original width (px)">
              <input type="number" min={1} value={origWidth} onChange={(e) => setOrigWidth(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Original height (px)">
              <input type="number" min={1} value={origHeight} onChange={(e) => setOrigHeight(e.target.value)} style={inputStyle} />
            </Field>
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginBottom: 16 }}>
            Original ratio: {simplified.w}:{simplified.h}
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
            {COMMON_RATIOS.map((r, i) => (
              <button key={r.label} onClick={() => setCropRatioIndex(i)} style={segBtn(cropRatioIndex === i)}>
                {r.label.split(' ')[0]}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            <ResultCard label="Crop size" value={`${cropResult.cropWidth} × ${cropResult.cropHeight} px`} highlight />
            <ResultCard label="Offset from top-left" value={`${cropResult.offsetX}, ${cropResult.offsetY} px`} />
          </div>
        </>
      )}

      <AffiliateCard heading="GEAR FOR BETTER SHOTS" items={AFFILIATE_ITEMS} />
    </div>
  )
}
