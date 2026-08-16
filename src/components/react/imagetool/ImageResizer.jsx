import { useCallback, useEffect, useRef, useState } from 'react'
import { formatBytes, loadImageFromFile, resolveOutputType, extensionForType, renderToBlob } from './imageUtils.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { Field, ResultCard, inputStyle, selectStyle, segBtn, secondaryBtn } from '../shared/FormKit.jsx'
import { readHandoff, clearHandoff } from '../workspace/handoff.js'
import HandoffBanner from '../workspace/HandoffBanner.jsx'

const AFFILIATE_ITEMS = [
  { name: 'Cloud photo storage', blurb: 'Back up your originals before compressing copies for the web.', href: '#', cta: 'Try free →' },
  { name: 'Adobe Lightroom / Photoshop', blurb: 'Batch-resize and export whole shoots at once.', href: '#', cta: 'Try free →' },
  { name: 'CDN / image hosting', blurb: 'Serve your resized images fast on your own site.', href: '#', cta: 'Get started →' },
]

const FORMAT_OPTIONS = [
  { value: 'original', label: 'Keep original format' },
  { value: 'image/jpeg', label: 'JPEG (best for photos)' },
  { value: 'image/webp', label: 'WebP (smaller, modern)' },
  { value: 'image/png', label: 'PNG (lossless, transparency)' },
]

const PRESET_PERCENTS = [100, 75, 50, 25]

export default function ImageResizer({
  initialWidth = 0,
  initialHeight = 0,
  initialFormat = 'original',
  initialQuality = 80,
} = {}) {
  const [file, setFile] = useState(null)
  const [handoff, setHandoff] = useState(() => readHandoff('/image-resizer'))
  const [sourceImg, setSourceImg] = useState(null)
  const [sourceUrl, setSourceUrl] = useState(null)
  const [originalWidth, setOriginalWidth] = useState(0)
  const [originalHeight, setOriginalHeight] = useState(0)

  const [targetWidth, setTargetWidth] = useState(initialWidth || 0)
  const [targetHeight, setTargetHeight] = useState(initialHeight || 0)
  const [lockAspect, setLockAspect] = useState(initialWidth > 0 && initialHeight > 0 ? false : true)
  const [outputFormat, setOutputFormat] = useState(initialFormat || 'original')
  const [quality, setQuality] = useState(initialQuality || 80)

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
    if (!newFile) return
    if (!newFile.type.startsWith('image/')) {
      setError('Please choose a valid image file (JPEG, PNG, WebP, GIF, etc.).')
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
      
      if (initialWidth > 0 && initialHeight > 0) {
        setTargetWidth(initialWidth)
        setTargetHeight(initialHeight)
        setLockAspect(false)
      } else {
        setTargetWidth(img.naturalWidth)
        setTargetHeight(img.naturalHeight)
        setLockAspect(true)
      }
      
      setOutputFormat(initialFormat || 'original')
      setResultUrl(null)
    } catch (e) {
      setError(e.message || 'Error loading image.')
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
    if (!originalWidth || !originalHeight) return
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
      setError(e.message || 'Error processing image.')
    } finally {
      setBusy(false)
    }
  }, [sourceImg, targetWidth, targetHeight, outputType, quality])

  useEffect(() => {
    if (sourceImg) generate()
  }, [sourceImg, targetWidth, targetHeight, outputType, quality, generate])

  useEffect(() => {
    clearHandoff() // consume handoff token on mount (image resizer has no tab target)
  }, [])

  useEffect(() => {
    return () => {
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current)
      if (sourceUrlRef.current) URL.revokeObjectURL(sourceUrlRef.current)
    }
  }, [])

  function onDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  function onDragLeave(e) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  function onDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) handleFile(droppedFile)
  }

  const reduction = file && resultSize ? Math.round((1 - resultSize / file.size) * 100) : null

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px 60px' }}>
      {/* Handoff banner from workspace */}
      <HandoffBanner handoff={handoff} onDismiss={() => setHandoff(null)} />
      {!sourceImg && (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          style={{
            border: `2px dashed ${isDragging ? 'var(--accent)' : 'var(--panel-border)'}`,
            borderRadius: 14,
            padding: '56px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDragging ? 'rgba(92,140,224,0.08)' : 'var(--panel-bg)',
            transition: 'all 150ms ease',
          }}
        >
          <div style={{ fontSize: 42, marginBottom: 14 }} aria-hidden="true">🗜️</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>
            Click to select an image, or drag & drop one here
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 20 }}>
            Supports JPEG, PNG, WebP, GIF, SVG — processed 100% in your browser
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              fileInputRef.current?.click()
            }}
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--btn-active-bg)',
              color: 'var(--btn-active-ink)',
              fontWeight: 800,
              fontSize: 13.5,
              cursor: 'pointer',
            }}
          >
            Browse Image File
          </button>
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
        <div style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(224,75,63,0.12)', color: '#e04b3f', fontSize: 13, marginTop: 16 }}>
          {error}
        </div>
      )}

      {sourceImg && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)' }}>{file.name}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-dim)', marginTop: 2 }}>
                Original: {originalWidth} × {originalHeight}px · {formatBytes(file.size)}
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null)
                setSourceImg(null)
                setResultUrl(null)
              }}
              style={secondaryBtn}
            >
              Choose another image
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
            <Field label="Target Width (px)">
              <input type="number" min={1} value={targetWidth} onChange={(e) => onWidthChange(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Target Height (px)">
              <input type="number" min={1} value={targetHeight} onChange={(e) => onHeightChange(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Format">
              <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} style={selectStyle}>
                {FORMAT_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </Field>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink)', fontWeight: 600, cursor: 'pointer' }}>
              <input type="checkbox" checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} style={{ width: 16, height: 16 }} />
              Lock Aspect Ratio
            </label>

            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 700 }}>Presets:</span>
              {PRESET_PERCENTS.map((p) => (
                <button key={p} onClick={() => applyPreset(p)} style={segBtn(targetWidth === Math.round((originalWidth * p) / 100))}>
                  {p}%
                </button>
              ))}
            </div>
          </div>

          {showQuality && (
            <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, padding: 16, marginBottom: 24 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)', display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Quality / Compression level</span>
                <span style={{ color: 'var(--accent)', fontWeight: 800 }}>{quality}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <div style={{ fontSize: 11, color: 'var(--ink-dim)', marginTop: 6 }}>
                80–85% recommended for small file size with crisp photo quality.
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
            <ResultCard label="New Dimensions" value={`${targetWidth} × ${targetHeight} px`} />
            <ResultCard
              label="Compressed Size"
              value={resultSize ? formatBytes(resultSize) : '—'}
              sub={reduction !== null ? (reduction >= 0 ? `🎉 ${reduction}% file size saved` : `⚠️ ${Math.abs(reduction)}% larger than original`) : undefined}
              highlight
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 10 }}>
                ORIGINAL IMAGE ({formatBytes(file.size)})
              </div>
              <img src={sourceUrl} alt="Original" style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 6 }} />
            </div>

            <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 10 }}>
                RESIZED & COMPRESSED {busy && '(Processing...)'}
              </div>
              {resultUrl && (
                <img src={resultUrl} alt="Resized result" style={{ width: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 6 }} />
              )}
            </div>
          </div>

          {resultUrl && (
            <a
              href={resultUrl}
              download={`${file.name.replace(/\.[^/.]+$/, '')}-resized.${extensionForType(outputType)}`}
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                borderRadius: 8,
                background: 'var(--btn-active-bg)',
                color: 'var(--btn-active-ink)',
                fontWeight: 800,
                fontSize: 14,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              }}
            >
              📥 Download Resized Image
            </a>
          )}
        </>
      )}

      <AffiliateCard heading="MANAGE YOUR PHOTOS" items={AFFILIATE_ITEMS} />
    </div>
  )
}
