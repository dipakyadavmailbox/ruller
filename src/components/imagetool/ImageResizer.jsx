import { useCallback, useEffect, useRef, useState } from 'react'
import { formatBytes, loadImageFromFile, resolveOutputType, extensionForType, renderToBlob } from './imageUtils.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { Field, ResultCard, inputStyle, selectStyle, segBtn, secondaryBtn } from '../shared/FormKit.jsx'

const AFFILIATE_ITEMS = [
  { name: 'Cloud photo storage', blurb: 'Back up your originals before compressing copies for the web.', href: '#', cta: 'Try free →' },
  { name: 'Adobe Lightroom / Photoshop', blurb: 'Batch-resize and export whole shoots at once.', href: '#', cta: 'Try free →' },
  { name: 'CDN / image hosting', blurb: 'Serve your resized images fast on your own site.', href: '#', cta: 'Get started →' },
]

const FORMAT_OPTIONS = [
  { value: 'original', label: 'Keep original format' },
  { value: 'image/jpeg', label: 'JPEG' },
  { value: 'image/webp', label: 'WebP (smaller, modern)' },
  { value: 'image/png', label: 'PNG (lossless)' },
]

const PRESET_PERCENTS = [100, 75, 50, 25]

export default function ImageResizer() {
  usePageMeta({
    title: 'Image Compressor & Resizer — Free Online Tool',
    description: 'Resize and compress an image right in your browser — adjust dimensions and quality, preview the result and file size, and download. Nothing is uploaded to a server.',
  })

  const [file, setFile] = useState(null)
  const [sourceImg, setSourceImg] = useState(null)
  const [sourceUrl, setSourceUrl] = useState(null)
  const [originalWidth, setOriginalWidth] = useState(0)
  const [originalHeight, setOriginalHeight] = useState(0)

  const [targetWidth, setTargetWidth] = useState(0)
  const [targetHeight, setTargetHeight] = useState(0)
  const [lockAspect, setLockAspect] = useState(true)
  const [outputFormat, setOutputFormat] = useState('original')
  const [quality, setQuality] = useState(85)

  const [resultUrl, setResultUrl] = useState(null)
  const [resultSize, setResultSize] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const fileInputRef = useRef(null)
  const resultUrlRef = useRef(null)
  const sourceUrlRef = useRef(null)

  const outputType = sourceImg ? resolveOutputType(outputFormat, file?.type) : 'image/jpeg'
  const showQuality = outputType === 'image/jpeg' || outputType === 'image/webp'

  async function handleFile(newFile) {
    if (!newFile || !newFile.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    setError(null)
    setBusy(true)
    try {
      const { img, url } = await loadImageFromFile(newFile)
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current)
      sourceUrlRef.current = url

      setFile(newFile)
      setSourceImg(img)
      setSourceUrl(url)
      setOriginalWidth(img.naturalWidth)
      setOriginalHeight(img.naturalHeight)
      setTargetWidth(img.naturalWidth)
      setTargetHeight(img.naturalHeight)
      setOutputFormat('original')
      setResultUrl(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  function onWidthChange(value) {
    const w = Math.max(1, Number(value) || 0)
    setTargetWidth(w)
    if (lockAspect && originalWidth > 0) {
      setTargetHeight(Math.round((w * originalHeight) / originalWidth))
    }
  }

  function onHeightChange(value) {
    const h = Math.max(1, Number(value) || 0)
    setTargetHeight(h)
    if (lockAspect && originalHeight > 0) {
      setTargetWidth(Math.round((h * originalWidth) / originalHeight))
    }
  }

  function applyPreset(percent) {
    const w = Math.round((originalWidth * percent) / 100)
    const h = Math.round((originalHeight * percent) / 100)
    setTargetWidth(w)
    setTargetHeight(h)
  }

  const generate = useCallback(async () => {
    if (!sourceImg || !targetWidth || !targetHeight) return
    setBusy(true)
    setError(null)
    try {
      const blob = await renderToBlob({
        img: sourceImg,
        width: targetWidth,
        height: targetHeight,
        mimeType: outputType,
        quality,
      })
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
      const url = URL.createObjectURL(blob)
      resultUrlRef.current = url
      setResultUrl(url)
      setResultSize(blob.size)
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }, [sourceImg, targetWidth, targetHeight, outputType, quality])

  // Re-render automatically whenever the relevant settings change, once an
  // image is loaded — cheap enough for single-image use.
  useEffect(() => {
    if (sourceImg) generate()
  }, [sourceImg, targetWidth, targetHeight, outputType, quality, generate])

  useEffect(() => {
    return () => {
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current)
    }
  }, [])

  function onDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) handleFile(dropped)
  }

  const reduction = file && resultSize ? Math.round((1 - resultSize / file.size) * 100) : null

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '32px 20px 60px' }}>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
        Image Compressor & Resizer
      </h1>
      <p style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        Resize and compress an image entirely in your browser — nothing is
        uploaded anywhere. Adjust dimensions or quality and download the
        result.
      </p>

      {!sourceImg && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          style={{
            border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--panel-border)'}`,
            borderRadius: 12,
            padding: '48px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: 'var(--panel-bg)',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">🖼️</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
            Click to choose an image, or drag one here
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-dim)' }}>JPEG, PNG, WebP, GIF — up to your browser's memory limit</div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {error && (
        <div style={{ padding: '10px 14px', borderRadius: 6, background: 'rgba(224,75,63,0.12)', color: '#e04b3f', fontSize: 12.5, marginTop: 16 }}>
          {error}
        </div>
      )}

      {sourceImg && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--ink-dim)' }}>
              {file.name} · {originalWidth} × {originalHeight}px · {formatBytes(file.size)}
            </div>
            <button
              onClick={() => {
                setFile(null)
                setSourceImg(null)
                setResultUrl(null)
              }}
              style={secondaryBtn}
            >
              Choose different image
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 12 }}>
            <Field label="Width (px)">
              <input type="number" min={1} value={targetWidth} onChange={(e) => onWidthChange(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Height (px)">
              <input type="number" min={1} value={targetHeight} onChange={(e) => onHeightChange(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Output format">
              <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} style={selectStyle}>
                {FORMAT_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </Field>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-dim)', marginBottom: 16 }}>
            <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} />
            Lock aspect ratio
          </label>

          <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
            {PRESET_PERCENTS.map((p) => (
              <button key={p} onClick={() => applyPreset(p)} style={segBtn(targetWidth === Math.round((originalWidth * p) / 100))}>
                {p}%
              </button>
            ))}
          </div>

          {showQuality && (
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Quality</span>
                <span>{quality}%</span>
              </label>
              <input
                type="range"
                min={10}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 4 }}>
                Lower quality = smaller file, more compression artifacts. 80-90% is
                usually visually indistinguishable from the original for photos.
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)', marginBottom: 8 }}>ORIGINAL</div>
              <img src={sourceUrl} alt="Original" style={{ width: '100%', borderRadius: 8, border: '1px solid var(--panel-border)' }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)', marginBottom: 8 }}>
                RESULT {busy && '(processing…)'}
              </div>
              {resultUrl && (
                <img src={resultUrl} alt="Resized result" style={{ width: '100%', borderRadius: 8, border: '1px solid var(--panel-border)' }} />
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
            <ResultCard label="New dimensions" value={`${targetWidth} × ${targetHeight}px`} />
            <ResultCard
              label="New file size"
              value={resultSize ? formatBytes(resultSize) : '—'}
              sub={reduction !== null ? (reduction >= 0 ? `${reduction}% smaller` : `${Math.abs(reduction)}% larger`) : undefined}
              highlight
            />
          </div>

          {resultUrl && (
            <a
              href={resultUrl}
              download={`resized.${extensionForType(outputType)}`}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: 6,
                background: 'var(--btn-active-bg)',
                color: 'var(--btn-active-ink)',
                fontWeight: 700,
                fontSize: 13,
                textDecoration: 'none',
              }}
            >
              Download image
            </a>
          )}

          <p style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 20 }}>
            Resizing to smaller dimensions doesn't itself degrade per-pixel
            quality — it's the quality slider (for JPEG/WebP) that trades
            file size for visual fidelity. PNG output is always lossless
            regardless of the slider.
          </p>
        </>
      )}

      <AffiliateCard heading="MANAGE YOUR PHOTOS" items={AFFILIATE_ITEMS} />
    </div>
  )
}
