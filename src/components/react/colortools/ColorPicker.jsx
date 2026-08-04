import { useState, useCallback } from 'react'
import {
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToHsv,
  formatHex, formatRgb, formatHsl, formatHsv,
  getShades,
} from './colorUtils.js'

const INITIAL_HEX = '#6366F1'

export default function ColorPicker() {
  const initRgb = hexToRgb(INITIAL_HEX)
  const initHsl = rgbToHsl(initRgb.r, initRgb.g, initRgb.b)
  const initHsv = rgbToHsv(initRgb.r, initRgb.g, initRgb.b)

  const [hex, setHex] = useState(INITIAL_HEX)
  const [rgb, setRgb] = useState(initRgb)
  const [hsl, setHsl] = useState(initHsl)
  const [hsv, setHsv] = useState(initHsv)
  const [hexInput, setHexInput] = useState(INITIAL_HEX)
  const [copied, setCopied] = useState(null) // which format was copied

  // ─── Sync all values from an RGB source ──────────────────────────────────────
  const syncFromRgb = useCallback((r, g, b) => {
    const newHex = rgbToHex(r, g, b)
    const newHsl = rgbToHsl(r, g, b)
    const newHsv = rgbToHsv(r, g, b)
    setHex(newHex)
    setHexInput(newHex.toUpperCase())
    setRgb({ r, g, b })
    setHsl(newHsl)
    setHsv(newHsv)
  }, [])

  // ─── Input handlers ──────────────────────────────────────────────────────────
  const handleColorPicker = (e) => {
    const newHex = e.target.value
    const rgb = hexToRgb(newHex)
    if (rgb) syncFromRgb(rgb.r, rgb.g, rgb.b)
    setHexInput(newHex.toUpperCase())
  }

  const handleHexInput = (val) => {
    setHexInput(val)
    const cleaned = val.startsWith('#') ? val : '#' + val
    const rgb = hexToRgb(cleaned)
    if (rgb) syncFromRgb(rgb.r, rgb.g, rgb.b)
  }

  const handleRgb = (channel, val) => {
    const v = Math.max(0, Math.min(255, Number(val) || 0))
    const newRgb = { ...rgb, [channel]: v }
    syncFromRgb(newRgb.r, newRgb.g, newRgb.b)
  }

  const handleHsl = (channel, val) => {
    const max = channel === 'h' ? 360 : 100
    const v = Math.max(0, Math.min(max, Number(val) || 0))
    const newHsl = { ...hsl, [channel]: v }
    const { r, g, b } = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    syncFromRgb(r, g, b)
  }

  const handleShadeClick = (shadeHex) => {
    const rgb = hexToRgb(shadeHex)
    if (rgb) syncFromRgb(rgb.r, rgb.g, rgb.b)
  }

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  const outputs = [
    { key: 'hex',  label: 'HEX',  value: formatHex(rgb.r, rgb.g, rgb.b) },
    { key: 'rgb',  label: 'RGB',  value: formatRgb(rgb.r, rgb.g, rgb.b) },
    { key: 'hsl',  label: 'HSL',  value: formatHsl(hsl.h, hsl.s, hsl.l) },
    { key: 'hsv',  label: 'HSV',  value: formatHsv(hsv.h, hsv.s, hsv.v) },
    { key: 'css',  label: 'CSS',  value: `--color-primary: ${formatHex(rgb.r, rgb.g, rgb.b)};` },
  ]

  const shades = getShades(hex)

  // ─── Determine text color for swatch (dark or light) ─────────────────────
  const swatchTextColor = hsl.l > 55 ? '#111' : '#fff'

  return (
    <div>
      <p style={descStyle}>
        Click the color swatch or enter a value in any format — all other fields update instantly.
      </p>

      {/* ─── Top Row: Swatch + Inputs ─────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 20 }}>
        {/* Swatch + native color picker */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 120, height: 120, borderRadius: 14,
            background: hex,
            border: '2px solid var(--panel-border)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            paddingBottom: 8,
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-mono)', color: swatchTextColor, opacity: 0.8 }}>
              {formatHex(rgb.r, rgb.g, rgb.b)}
            </span>
          </div>
          <input
            type="color"
            value={hex}
            onChange={handleColorPicker}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
            aria-label="Open color picker"
            title="Click to open color picker"
          />
        </div>

        {/* Input fields */}
        <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* HEX */}
          <div>
            <label style={labelStyle} htmlFor="hex-input">HEX</label>
            <input
              id="hex-input"
              type="text"
              value={hexInput}
              onChange={(e) => handleHexInput(e.target.value)}
              maxLength={7}
              style={inputStyle}
              placeholder="#000000"
            />
          </div>

          {/* RGB */}
          <div>
            <label style={labelStyle}>RGB</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {['r', 'g', 'b'].map((ch) => (
                <input
                  key={ch}
                  type="number"
                  min={0}
                  max={255}
                  value={rgb[ch]}
                  onChange={(e) => handleRgb(ch, e.target.value)}
                  style={{ ...inputStyle, flex: 1, textAlign: 'center', minWidth: 0 }}
                  aria-label={`RGB ${ch.toUpperCase()} channel`}
                  id={`rgb-${ch}`}
                />
              ))}
            </div>
          </div>

          {/* HSL */}
          <div>
            <label style={labelStyle}>HSL</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['h', 360, '°'], ['s', 100, '%'], ['l', 100, '%']].map(([ch, max, unit]) => (
                <div key={ch} style={{ flex: 1, minWidth: 0, position: 'relative' }}>
                  <input
                    type="number"
                    min={0}
                    max={max}
                    value={hsl[ch]}
                    onChange={(e) => handleHsl(ch, e.target.value)}
                    style={{ ...inputStyle, width: '100%', paddingRight: 20, minWidth: 0, boxSizing: 'border-box' }}
                    aria-label={`HSL ${ch.toUpperCase()} channel`}
                    id={`hsl-${ch}`}
                  />
                  <span style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--ink-faint)', pointerEvents: 'none' }}>{unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Output Rows ──────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {outputs.map(({ key, label, value }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--btn-idle-bg)', borderRadius: 10, border: '1px solid var(--panel-border)' }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-faint)', letterSpacing: '0.6px', minWidth: 36 }}>{label}</span>
            <code style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink)', wordBreak: 'break-all' }}>{value}</code>
            <button
              onClick={() => copyToClipboard(value, key)}
              style={copyBtnStyle}
              aria-label={`Copy ${label} value`}
              title={`Copy ${label}`}
            >
              {copied === key ? '✓' : '📋'}
            </button>
          </div>
        ))}
      </div>

      {/* ─── Shade Strip ──────────────────────────────────────────────────── */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.8px', color: 'var(--ink-faint)', marginBottom: 8 }}>
          SHADES
        </div>
        <div style={{ display: 'flex', gap: 4, borderRadius: 12, overflow: 'hidden' }}>
          {shades.map(({ hex: shadeHex, label }) => (
            <button
              key={shadeHex}
              onClick={() => handleShadeClick(shadeHex)}
              title={shadeHex}
              aria-label={`Select shade ${label}: ${shadeHex}`}
              style={{
                flex: 1, height: 40,
                background: shadeHex,
                border: shadeHex.toUpperCase() === hex.toUpperCase() ? '3px solid var(--ink)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'transform 100ms ease',
                minWidth: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Shared mini-styles ───────────────────────────────────────────────────────
const descStyle = {
  color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: 16, marginTop: 0,
}

const labelStyle = {
  display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.6px',
  color: 'var(--ink-faint)', marginBottom: 4, textTransform: 'uppercase',
}

const inputStyle = {
  padding: '9px 12px', border: '1px solid var(--panel-border)',
  borderRadius: 8, background: 'var(--panel-bg)', color: 'var(--ink)',
  fontSize: 13, fontFamily: 'var(--font-mono)', outline: 'none',
  width: '100%', boxSizing: 'border-box',
}

const copyBtnStyle = {
  padding: '4px 8px', border: '1px solid var(--panel-border)',
  borderRadius: 6, background: 'var(--btn-idle-bg)', color: 'var(--ink)',
  cursor: 'pointer', fontSize: 13, flexShrink: 0,
}
