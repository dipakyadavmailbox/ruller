import { useMemo, useState, useRef } from 'react'
import { COMMON_RATIOS, PRESET_SIZES, simplifyRatio, dimensionsForRatio, heightToWidthForRatio, centerCropForRatio } from './aspectMath.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { Field, ResultCard, inputStyle, segBtn, secondaryBtn } from '../shared/FormKit.jsx'

const AFFILIATE_ITEMS = [
  { name: 'Camera tripod', blurb: 'Get consistent framing so cropping to any ratio needs less correction.', href: '#', cta: 'Shop →' },
  { name: 'Adobe Lightroom / Photoshop', blurb: 'Non-destructive cropping with saved aspect-ratio presets.', href: '#', cta: 'Try free →' },
  { name: 'Mirrorless camera bodies', blurb: 'Shoot in-camera aspect-ratio guides for social-ready framing.', href: '#', cta: 'Shop →' },
]

export default function AspectRatioCalculator() {
  const [mode, setMode] = useState('dimensions') // 'dimensions' | 'crop' | 'presets'

  // Dimension Calculator state
  const [calcBase, setCalcBase] = useState('width') // 'width' | 'height'
  const [knownValue, setKnownValue] = useState(1920)
  const [customRatioW, setCustomRatioW] = useState(16)
  const [customRatioH, setCustomRatioH] = useState(9)

  // Crop Calculator state
  const [origWidth, setOrigWidth] = useState(4000)
  const [origHeight, setOrigHeight] = useState(3000)
  const [cropRatioIndex, setCropRatioIndex] = useState(1) // 4:5

  // Image preview state
  const [imageSrc, setImageSrc] = useState(null)
  const fileInputRef = useRef(null)

  const simplifiedInput = useMemo(() => simplifyRatio(customRatioW, customRatioH), [customRatioW, customRatioH])
  const simplifiedCrop = useMemo(() => simplifyRatio(origWidth, origHeight), [origWidth, origHeight])

  const dimensionResults = useMemo(() => {
    const customRatio = { w: Number(customRatioW) || 1, h: Number(customRatioH) || 1 }
    const knownVal = Number(knownValue) || 0
    return COMMON_RATIOS.map((r) => {
      const dims = calcBase === 'width' ? dimensionsForRatio(r, knownVal) : heightToWidthForRatio(r, knownVal)
      return { ...r, ...dims }
    }).concat([
      {
        label: `Custom ${customRatio.w}:${customRatio.h}`,
        ...(calcBase === 'width' ? dimensionsForRatio(customRatio, knownVal) : heightToWidthForRatio(customRatio, knownVal)),
      },
    ])
  }, [knownValue, customRatioW, customRatioH, calcBase])

  const cropResult = useMemo(() => {
    const ratio = COMMON_RATIOS[cropRatioIndex] || COMMON_RATIOS[0]
    return centerCropForRatio(Number(origWidth) || 1, Number(origHeight) || 1, ratio)
  }, [origWidth, origHeight, cropRatioIndex])

  function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      setOrigWidth(img.naturalWidth)
      setOrigHeight(img.naturalHeight)
      setImageSrc(url)
    }
    img.src = url
  }

  // Calculate visual aspect ratio box style
  const currentRatioW = Number(customRatioW) || 16
  const currentRatioH = Number(customRatioH) || 9
  const boxMaxW = 280
  const boxMaxH = 180
  const scale = Math.min(boxMaxW / currentRatioW, boxMaxH / currentRatioH)
  const previewW = Math.round(currentRatioW * scale)
  const previewH = Math.round(currentRatioH * scale)

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px 60px' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        <button onClick={() => setMode('dimensions')} style={segBtn(mode === 'dimensions')}>Dimension Calculator</button>
        <button onClick={() => setMode('crop')} style={segBtn(mode === 'crop')}>Center Crop Calculator</button>
        <button onClick={() => setMode('presets')} style={segBtn(mode === 'presets')}>Social Media Presets</button>
      </div>

      {mode === 'dimensions' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, alignItems: 'center', marginBottom: 24 }}>
            <div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                <button onClick={() => setCalcBase('width')} style={segBtn(calcBase === 'width')}>Lock Width</button>
                <button onClick={() => setCalcBase('height')} style={segBtn(calcBase === 'height')}>Lock Height</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <Field label={calcBase === 'width' ? 'Known Width (px)' : 'Known Height (px)'}>
                  <input type="number" min={1} value={knownValue} onChange={(e) => setKnownValue(e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Aspect Ratio (W:H)">
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <input type="number" min={1} value={customRatioW} onChange={(e) => setCustomRatioW(e.target.value)} style={inputStyle} />
                    <span style={{ color: 'var(--ink-faint)', fontWeight: 800 }}>:</span>
                    <input type="number" min={1} value={customRatioH} onChange={(e) => setCustomRatioH(e.target.value)} style={inputStyle} />
                  </div>
                </Field>
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-dim)' }}>
                Simplified ratio: <strong style={{ color: 'var(--ink)' }}>{simplifiedInput.w}:{simplifiedInput.h}</strong>
              </div>
            </div>

            {/* Visual Box Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 12, padding: 20, minHeight: 200 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)', marginBottom: 12 }}>VISUAL RATIO PREVIEW ({simplifiedInput.w}:{simplifiedInput.h})</div>
              <div
                style={{
                  width: previewW,
                  height: previewH,
                  border: '2px dashed var(--accent)',
                  borderRadius: 6,
                  background: 'rgba(92,140,224,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--accent)',
                  transition: 'all 200ms ease',
                }}
              >
                {previewW} × {previewH}
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>Common Ratios for {knownValue}px {calcBase}</h3>
          <div style={{ border: '1px solid var(--panel-border)', borderRadius: 8, overflow: 'hidden' }}>
            {dimensionResults.map((r, i) => (
              <div
                key={r.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  fontSize: 13,
                  borderTop: i ? '1px solid var(--panel-border)' : 'none',
                  background: i === dimensionResults.length - 1 ? 'rgba(92,140,224,0.06)' : 'transparent',
                }}
              >
                <span style={{ color: 'var(--ink-dim)', fontWeight: 600 }}>{r.label}</span>
                <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{r.width} × {r.height} px</span>
              </div>
            ))}
          </div>
        </>
      )}

      {mode === 'crop' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 16 }}>
            <Field label="Original width (px)">
              <input type="number" min={1} value={origWidth} onChange={(e) => setOrigWidth(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Original height (px)">
              <input type="number" min={1} value={origHeight} onChange={(e) => setOrigHeight(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Upload image to test (optional)">
              <button onClick={() => fileInputRef.current?.click()} style={{ ...secondaryBtn, width: '100%' }}>
                {imageSrc ? 'Change Image' : 'Choose File'}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </Field>
          </div>

          <div style={{ fontSize: 12, color: 'var(--ink-dim)', marginBottom: 16 }}>
            Original aspect ratio: <strong style={{ color: 'var(--ink)' }}>{simplifiedCrop.w}:{simplifiedCrop.h}</strong>
          </div>

          <label style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)', display: 'block', marginBottom: 8 }}>
            Target Crop Aspect Ratio
          </label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
            {COMMON_RATIOS.map((r, i) => (
              <button key={r.label} onClick={() => setCropRatioIndex(i)} style={segBtn(cropRatioIndex === i)}>
                {r.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
            <ResultCard label="Center Crop Dimensions" value={`${cropResult.cropWidth} × ${cropResult.cropHeight} px`} highlight />
            <ResultCard label="Top / Left Offset" value={`X: ${cropResult.offsetX}px, Y: ${cropResult.offsetY}px`} />
            <ResultCard label="Retained Image Area" value={`${cropResult.cropPercent}%`} sub="Percentage of original pixels kept" />
          </div>

          {/* Visual Crop Overlay */}
          <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)', marginBottom: 12 }}>VISUAL CROP OVERLAY</div>
            <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%', maxHeight: 260, border: '1px solid var(--panel-border)', overflow: 'hidden', background: '#222' }}>
              {imageSrc ? (
                <img src={imageSrc} alt="Preview" style={{ display: 'block', maxWidth: '100%', maxHeight: 260, opacity: 0.5 }} />
              ) : (
                <div style={{ width: 320, height: 200, background: '#333', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
                  Original Image Area ({origWidth}×{origHeight})
                </div>
              )}
              {/* Highlight Crop Box */}
              <div
                style={{
                  position: 'absolute',
                  top: `${(cropResult.offsetY / (origHeight || 1)) * 100}%`,
                  left: `${(cropResult.offsetX / (origWidth || 1)) * 100}%`,
                  width: `${(cropResult.cropWidth / (origWidth || 1)) * 100}%`,
                  height: `${(cropResult.cropHeight / (origHeight || 1)) * 100}%`,
                  border: '2px solid var(--accent)',
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </>
      )}

      {mode === 'presets' && (
        <>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>Popular Platform Presets</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {PRESET_SIZES.map((preset) => (
              <div key={preset.name} style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{preset.name}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)', marginBottom: 4 }}>
                  {preset.w} × {preset.h} <span style={{ fontSize: 12, color: 'var(--ink-dim)', fontWeight: 600 }}>px</span>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-faint)' }}>Aspect Ratio: {preset.ratio}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <AffiliateCard heading="GEAR FOR BETTER SHOTS" items={AFFILIATE_ITEMS} />
    </div>
  )
}
