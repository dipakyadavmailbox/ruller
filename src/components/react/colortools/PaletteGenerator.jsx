import { useState, useCallback } from 'react'
import {
  hexToRgb, rgbToHsl,
  complementary, analogous, triadic, tetradic, monochromatic,
  randomColor, exportCss, exportTailwind, exportJson,
} from './colorUtils.js'

const MODES = [
  { id: 'complementary', label: 'Complementary', icon: '☯' },
  { id: 'analogous',     label: 'Analogous',     icon: '🌈' },
  { id: 'triadic',       label: 'Triadic',        icon: '△' },
  { id: 'tetradic',      label: 'Tetradic',       icon: '◻' },
  { id: 'monochromatic', label: 'Monochromatic',  icon: '◐' },
]

const GENERATORS = {
  complementary,
  analogous,
  triadic,
  tetradic,
  monochromatic,
}

const INITIAL_HEX = '#6366F1'

export default function PaletteGenerator() {
  const [baseHex, setBaseHex]     = useState(INITIAL_HEX)
  const [baseInput, setBaseInput] = useState(INITIAL_HEX)
  const [mode, setMode]           = useState('complementary')
  const [exportMode, setExportMode] = useState('css')
  const [copied, setCopied]       = useState(null)

  // ─── Generate palette ────────────────────────────────────────────────────────
  const palette = GENERATORS[mode](baseHex)

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const applyHex = useCallback((hex) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return
    setBaseHex(hex.startsWith('#') ? hex : '#' + hex)
    setBaseInput((hex.startsWith('#') ? hex : '#' + hex).toUpperCase())
  }, [])

  const handleColorPicker = (e) => applyHex(e.target.value)

  const handleHexInput = (val) => {
    setBaseInput(val)
    const cleaned = val.startsWith('#') ? val : '#' + val
    if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) applyHex(cleaned)
  }

  const handleRandomize = () => {
    const hex = randomColor()
    applyHex(hex)
  }

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex).catch(() => {})
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }

  // ─── Export text ─────────────────────────────────────────────────────────────
  const exportText = {
    css:      exportCss(palette),
    tailwind: exportTailwind(palette),
    json:     exportJson(palette),
  }

  const handleCopyExport = () => {
    navigator.clipboard.writeText(exportText[exportMode]).catch(() => {})
    setCopied('export')
    setTimeout(() => setCopied(null), 1500)
  }

  // ─── Determine base HSL for display ──────────────────────────────────────────
  const baseRgb = hexToRgb(baseHex) || { r: 99, g: 102, b: 241 }
  const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b)
  const baseTextColor = baseHsl.l > 55 ? '#111' : '#fff'

  return (
    <div>
      <p style={descStyle}>
        Enter a base color, choose a <strong>harmony mode</strong>, and get an instant palette.
        Export to CSS variables, Tailwind config, or JSON.
      </p>

      {/* ─── Base Color Input Row ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 20 }}>
        {/* Swatch + native picker */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 10,
            background: baseHex, border: '2px solid var(--panel-border)',
            cursor: 'pointer',
          }} />
          <input
            type="color"
            value={baseHex}
            onChange={handleColorPicker}
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
            aria-label="Select base color"
          />
        </div>

        {/* HEX Input */}
        <div style={{ flex: 1, minWidth: 120 }}>
          <label style={labelStyle} htmlFor="palette-hex-input">Base Color</label>
          <input
            id="palette-hex-input"
            type="text"
            value={baseInput}
            onChange={(e) => handleHexInput(e.target.value)}
            maxLength={7}
            placeholder="#6366F1"
            style={inputStyle}
          />
        </div>

        {/* Randomize */}
        <button
          onClick={handleRandomize}
          id="randomize-palette-btn"
          style={randomBtnStyle}
          aria-label="Randomize base color"
        >
          🎲 Random
        </button>
      </div>

      {/* ─── Mode Pills ───────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.8px', color: 'var(--ink-faint)', marginBottom: 8 }}>
          HARMONY MODE
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {MODES.map((m) => {
            const active = mode === m.id
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                id={`palette-mode-${m.id}`}
                aria-pressed={active}
                style={{
                  padding: '7px 14px',
                  border: `1px solid ${active ? 'var(--accent)' : 'var(--panel-border)'}`,
                  borderRadius: 20,
                  background: active ? 'var(--accent-light)' : 'var(--btn-idle-bg)',
                  color: active ? 'var(--accent)' : 'var(--ink-dim)',
                  fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {m.icon} {m.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── Palette Swatches ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        {palette.map((color, idx) => {
          const rgb = hexToRgb(color) || { r: 0, g: 0, b: 0 }
          const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
          const textColor = hsl.l > 55 ? '#111' : '#fff'
          const isCopied = copied === color
          return (
            <div
              key={idx}
              style={{
                flex: 1, minWidth: 80,
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid var(--panel-border)',
                cursor: 'pointer',
                transition: 'transform 100ms ease, box-shadow 100ms ease',
              }}
              onClick={() => copyColor(color)}
              title={`Click to copy ${color}`}
              role="button"
              aria-label={`Copy color ${color}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && copyColor(color)}
            >
              <div style={{
                height: 80, background: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {isCopied && (
                  <span style={{ color: textColor, fontSize: 22, fontWeight: 800 }}>✓</span>
                )}
              </div>
              <div style={{
                padding: '8px 10px', background: 'var(--panel-bg)',
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                color: 'var(--ink)', textAlign: 'center', letterSpacing: '0.5px',
              }}>
                {color}
              </div>
            </div>
          )
        })}
      </div>

      {/* ─── Export Panel ─────────────────────────────────────────────────── */}
      <div style={{ border: '1px solid var(--panel-border)', borderRadius: 14, overflow: 'hidden' }}>
        {/* Export Tab Bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--panel-border)', background: 'var(--btn-idle-bg)' }}>
          {[
            { id: 'css',      label: 'CSS Variables' },
            { id: 'tailwind', label: 'Tailwind' },
            { id: 'json',     label: 'JSON' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setExportMode(tab.id)}
              id={`export-tab-${tab.id}`}
              style={{
                flex: 1, padding: '10px 8px',
                border: 'none',
                borderBottom: exportMode === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
                background: 'transparent',
                color: exportMode === tab.id ? 'var(--accent)' : 'var(--ink-dim)',
                fontSize: 12, fontWeight: 800, fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                transition: 'color 150ms ease',
              }}
              aria-selected={exportMode === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Preview */}
        <pre style={{
          margin: 0, padding: '16px',
          fontFamily: 'var(--font-mono)', fontSize: 13,
          color: 'var(--ink)', background: 'var(--panel-bg)',
          lineHeight: 1.7, overflowX: 'auto',
          whiteSpace: 'pre-wrap',
        }}>
          {exportText[exportMode]}
        </pre>

        {/* Copy Export Button */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--panel-border)', background: 'var(--btn-idle-bg)' }}>
          <button
            onClick={handleCopyExport}
            id="copy-export-btn"
            style={exportCopyBtnStyle}
            aria-label={`Copy ${exportMode} export code`}
          >
            {copied === 'export' ? '✓ Copied!' : '📋 Copy Code'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const descStyle = {
  color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: 16, marginTop: 0,
}

const labelStyle = {
  display: 'block', fontSize: 11, fontWeight: 800, letterSpacing: '0.6px',
  color: 'var(--ink-faint)', marginBottom: 4, textTransform: 'uppercase',
}

const inputStyle = {
  padding: '10px 12px', border: '1px solid var(--panel-border)',
  borderRadius: 8, background: 'var(--panel-bg)', color: 'var(--ink)',
  fontSize: 13, fontFamily: 'var(--font-mono)', outline: 'none',
  width: '100%', boxSizing: 'border-box',
}

const randomBtnStyle = {
  padding: '10px 16px', border: '1px solid var(--panel-border)',
  borderRadius: 10, background: 'var(--btn-idle-bg)', color: 'var(--ink)',
  fontSize: 13, fontWeight: 700, cursor: 'pointer', flexShrink: 0,
  transition: 'all 150ms ease',
}

const exportCopyBtnStyle = {
  padding: '8px 18px', border: '1px solid var(--panel-border)',
  borderRadius: 8, background: 'var(--panel-bg)', color: 'var(--ink)',
  fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)',
  cursor: 'pointer', transition: 'all 150ms ease',
}
