import { useMemo, useState } from 'react'
import {
  convert,
  FORMATS,
  DATA_UNITS,
  convertDataUnits,
  textToBase64,
  base64ToText,
  textToHex,
  hexToText,
  textToBinary,
  binaryToText,
  SAMPLE_JSON,
  SAMPLE_JWT,
  convertAllBases,
  NUMBER_BASES,
  parseColorInput,
  decodeJWT,
} from './convert.js'
import { textareaStyle, selectStyle, inputStyle, secondaryBtn, segBtn } from '../shared/FormKit.jsx'

export default function DataConverter() {
  const [tab, setTab] = useState('structure') // 'structure' | 'storage' | 'encoding' | 'numbers' | 'color' | 'jwt'

  // Structural Converter State
  const [fromFormat, setFromFormat] = useState('JSON')
  const [toFormat, setToFormat] = useState('CSV')
  const [input, setInput] = useState(SAMPLE_JSON)
  const [copied, setCopied] = useState(false)
  const [copiedLabel, setCopiedLabel] = useState('')

  // Storage Converter State
  const [storageVal, setStorageVal] = useState(1024)
  const [storageUnit, setStorageUnit] = useState('MB')

  // Encoding Converter State
  const [encodingMode, setEncodingMode] = useState('base64-enc')
  const [encInput, setEncInput] = useState('Hello World!')

  // Number Base Converter State
  const [numInput, setNumInput] = useState('255')
  const [numFromBase, setNumFromBase] = useState(10)

  // Color Converter State
  const [colorInput, setColorInput] = useState('#5C8CE0')

  // JWT Decoder State
  const [jwtInput, setJwtInput] = useState(SAMPLE_JWT)

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: null }
    try {
      return { output: convert(input, fromFormat, toFormat), error: null }
    } catch (e) {
      return { output: '', error: e.message }
    }
  }, [input, fromFormat, toFormat])

  const storageResults = useMemo(() => convertDataUnits(Number(storageVal) || 0, storageUnit), [storageVal, storageUnit])

  const encodingResult = useMemo(() => {
    if (!encInput) return ''
    try {
      if (encodingMode === 'base64-enc') return textToBase64(encInput)
      if (encodingMode === 'base64-dec') return base64ToText(encInput)
      if (encodingMode === 'hex-enc') return textToHex(encInput)
      if (encodingMode === 'hex-dec') return hexToText(encInput)
      if (encodingMode === 'binary-enc') return textToBinary(encInput)
      if (encodingMode === 'binary-dec') return binaryToText(encInput)
      if (encodingMode === 'url-enc') return encodeURIComponent(encInput)
      if (encodingMode === 'url-dec') return decodeURIComponent(encInput)
    } catch (e) {
      return `Error: ${e.message}`
    }
    return ''
  }, [encodingMode, encInput])

  const numResult = useMemo(() => {
    try {
      return convertAllBases(numInput, numFromBase)
    } catch (e) {
      return null
    }
  }, [numInput, numFromBase])

  const colorResult = useMemo(() => {
    try {
      return parseColorInput(colorInput)
    } catch {
      return { valid: false }
    }
  }, [colorInput])

  const jwtResult = useMemo(() => {
    if (!jwtInput.trim()) return null
    try {
      return decodeJWT(jwtInput)
    } catch (e) {
      return { error: e.message }
    }
  }, [jwtInput])

  function swapFormats() {
    setFromFormat(toFormat)
    setToFormat(fromFormat)
    if (output) setInput(output)
  }

  async function copyText(text, label = 'Copied!') {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLabel(label)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { }
  }

  const TABS = [
    { id: 'structure', label: '📄 Data Formats' },
    { id: 'storage', label: '💾 Storage Size' },
    { id: 'encoding', label: '🔐 Encoding' },
    { id: 'numbers', label: '🔢 Number Base' },
    { id: 'color', label: '🎨 Color Converter' },
    { id: 'jwt', label: '🪙 JWT Decoder' },
  ]

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px 60px' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={segBtn(tab === t.id)}>{t.label}</button>
        ))}
      </div>

      {/* ── Structure Tab ─────────────────────────────────────────── */}
      {tab === 'structure' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <Field label="From Format">
              <select value={fromFormat} onChange={(e) => setFromFormat(e.target.value)} style={{ ...selectStyle, width: 'auto' }}>
                {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
            <button onClick={swapFormats} style={{ ...secondaryBtn, marginTop: 18 }} title="Swap direction">⇄ Swap</button>
            <Field label="To Format">
              <select value={toFormat} onChange={(e) => setToFormat(e.target.value)} style={{ ...selectStyle, width: 'auto' }}>
                {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-faint)', marginBottom: 6 }}>INPUT ({fromFormat})</div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={18}
                spellCheck={false}
                style={{ ...textareaStyle, fontFamily: 'var(--font-mono)' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-faint)' }}>OUTPUT ({toFormat})</span>
                {output && (
                  <button onClick={() => copyText(output)} style={{ ...segBtn(false), padding: '4px 12px' }}>
                    {copied ? `✓ ${copiedLabel}` : '📋 Copy Output'}
                  </button>
                )}
              </div>
              <textarea
                value={error ? `Error: ${error}` : output}
                readOnly
                rows={18}
                spellCheck={false}
                style={{ ...textareaStyle, fontFamily: 'var(--font-mono)', color: error ? '#e04b3f' : 'var(--ink)' }}
              />
            </div>
          </div>
        </>
      )}

      {/* ── Storage Tab ─────────────────────────────────────────── */}
      {tab === 'storage' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
            <Field label="Input Value">
              <input type="number" min={0} value={storageVal} onChange={(e) => setStorageVal(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="From Unit">
              <select value={storageUnit} onChange={(e) => setStorageUnit(e.target.value)} style={selectStyle}>
                {DATA_UNITS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
              </select>
            </Field>
          </div>

          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>Equivalent Sizes</h3>
          <div style={{ border: '1px solid var(--panel-border)', borderRadius: 10, overflow: 'hidden' }}>
            {storageResults.map((u, i) => (
              <div
                key={u.id}
                style={{
                  display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: 13.5,
                  borderTop: i ? '1px solid var(--panel-border)' : 'none',
                  background: u.id === storageUnit ? 'rgba(92,140,224,0.08)' : 'transparent',
                }}
              >
                <span style={{ color: 'var(--ink-dim)', fontWeight: 600 }}>{u.label}</span>
                <span style={{ fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>{u.converted} {u.id}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Encoding Tab ─────────────────────────────────────────── */}
      {tab === 'encoding' && (
        <>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              { id: 'base64-enc', label: 'Text → Base64' },
              { id: 'base64-dec', label: 'Base64 → Text' },
              { id: 'hex-enc', label: 'Text → Hex' },
              { id: 'hex-dec', label: 'Hex → Text' },
              { id: 'binary-enc', label: 'Text → Binary' },
              { id: 'binary-dec', label: 'Binary → Text' },
              { id: 'url-enc', label: 'URL Encode' },
              { id: 'url-dec', label: 'URL Decode' },
            ].map(({ id, label }) => (
              <button key={id} onClick={() => setEncodingMode(id)} style={segBtn(encodingMode === id)}>{label}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-faint)', marginBottom: 6 }}>INPUT</div>
              <textarea
                value={encInput}
                onChange={(e) => setEncInput(e.target.value)}
                rows={12}
                spellCheck={false}
                style={{ ...textareaStyle, fontFamily: 'var(--font-mono)' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-faint)' }}>OUTPUT</span>
                {encodingResult && (
                  <button onClick={() => copyText(encodingResult, 'Copied!')} style={{ ...segBtn(false), padding: '4px 12px' }}>
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                )}
              </div>
              <textarea
                value={encodingResult}
                readOnly
                rows={12}
                spellCheck={false}
                style={{ ...textareaStyle, fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>
        </>
      )}

      {/* ── Number Base Tab ─────────────────────────────────────── */}
      {tab === 'numbers' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
            <Field label="Number Input">
              <input
                value={numInput}
                onChange={(e) => setNumInput(e.target.value)}
                spellCheck={false}
                style={{ ...inputStyle, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}
                placeholder="e.g. 255"
              />
            </Field>
            <Field label="Input Base">
              <select value={numFromBase} onChange={(e) => setNumFromBase(Number(e.target.value))} style={selectStyle}>
                {NUMBER_BASES.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
              </select>
            </Field>
          </div>

          {numResult ? (
            <div style={{ border: '1px solid var(--panel-border)', borderRadius: 10, overflow: 'hidden' }}>
              {[
                { label: 'Decimal (Base 10)', value: numResult.decimal, base: 10 },
                { label: 'Hexadecimal (Base 16)', value: numResult.hex, base: 16 },
                { label: 'Octal (Base 8)', value: numResult.octal, base: 8 },
                { label: 'Binary (Base 2)', value: numResult.binary, base: 2 },
              ].map((row, i) => (
                <div
                  key={row.base}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px',
                    borderTop: i ? '1px solid var(--panel-border)' : 'none',
                    background: row.base === numFromBase ? 'rgba(92,140,224,0.08)' : 'transparent',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 700 }}>{row.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                      {row.base === 16 && <span style={{ color: 'var(--ink-faint)' }}>0x</span>}
                      {row.base === 2 && <span style={{ color: 'var(--ink-faint)' }}>0b</span>}
                      {row.base === 8 && <span style={{ color: 'var(--ink-faint)' }}>0o</span>}
                      {row.value}
                    </div>
                  </div>
                  <button
                    onClick={() => copyText(row.value, `${row.label} copied!`)}
                    style={{ ...segBtn(false), padding: '6px 12px', fontSize: 12 }}
                  >
                    {copied && copiedLabel.startsWith(row.label) ? '✓' : '📋'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '16px', color: '#e04b3f', fontSize: 13 }}>
              ⚠️ Invalid number for base {numFromBase}. Check your input.
            </div>
          )}
        </>
      )}

      {/* ── Color Converter Tab ─────────────────────────────────── */}
      {tab === 'color' && (
        <>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
            <Field label="Color Input (HEX, RGB, or HSL)">
              <input
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                spellCheck={false}
                style={{ ...inputStyle, fontFamily: 'var(--font-mono)', maxWidth: 320 }}
                placeholder="e.g. #FF5733 or rgb(255,87,51) or hsl(11,100%,60%)"
              />
            </Field>
            {colorResult.valid && (
              <div
                style={{
                  width: 56, height: 56, borderRadius: 12, flexShrink: 0, marginTop: 18,
                  background: colorResult.hex,
                  border: '2px solid var(--panel-border)',
                  boxShadow: `0 4px 20px ${colorResult.hex}55`,
                }}
              />
            )}
          </div>

          {colorResult.valid ? (
            <div style={{ border: '1px solid var(--panel-border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
              {[
                { label: 'HEX', value: colorResult.hex, desc: 'Hexadecimal — for CSS and web' },
                { label: 'RGB', value: `rgb(${colorResult.r}, ${colorResult.g}, ${colorResult.b})`, desc: 'Red, Green, Blue — for CSS and canvas' },
                { label: 'HSL', value: `hsl(${colorResult.h}, ${colorResult.s}%, ${colorResult.l}%)`, desc: 'Hue, Saturation, Lightness — great for theming' },
                { label: 'Raw R/G/B', value: `R: ${colorResult.r}  G: ${colorResult.g}  B: ${colorResult.b}`, desc: 'Raw component values (0–255)' },
              ].map((row, i) => (
                <div
                  key={row.label}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px',
                    borderTop: i ? '1px solid var(--panel-border)' : 'none',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--ink-faint)', fontWeight: 800 }}>{row.label} — {row.desc}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--ink)', marginTop: 2 }}>{row.value}</div>
                  </div>
                  <button onClick={() => copyText(row.value)} style={{ ...segBtn(false), padding: '6px 12px', fontSize: 12 }}>
                    {copied ? '✓' : '📋'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            colorInput && (
              <div style={{ padding: '12px 14px', borderRadius: 8, background: 'rgba(224,75,63,0.1)', color: '#e04b3f', fontSize: 13 }}>
                ⚠️ Could not parse color. Try: #FF5733, rgb(255,87,51), or hsl(11,100%,60%)
              </div>
            )
          )}

          {/* Color swatches for quick testing */}
          <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 800, color: 'var(--ink-faint)' }}>SAMPLE COLORS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#5C8CE0', '#E0A05C'].map(hex => (
              <button
                key={hex}
                onClick={() => setColorInput(hex)}
                style={{
                  width: 40, height: 40, borderRadius: 8, border: colorInput === hex ? '3px solid var(--ink)' : '2px solid var(--panel-border)',
                  background: hex, cursor: 'pointer',
                }}
                title={hex}
              />
            ))}
          </div>
        </>
      )}

      {/* ── JWT Decoder Tab ─────────────────────────────────────── */}
      {tab === 'jwt' && (
        <>
          <p style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 16, lineHeight: 1.6 }}>
            Paste a JSON Web Token to decode its header and payload. Decoding is done entirely in your browser — nothing is sent to any server.
          </p>
          <Field label="JWT Token">
            <textarea
              value={jwtInput}
              onChange={(e) => setJwtInput(e.target.value)}
              rows={4}
              spellCheck={false}
              style={{ ...textareaStyle, fontFamily: 'var(--font-mono)', fontSize: 12 }}
              placeholder="Paste your JWT here..."
            />
          </Field>

          {jwtResult && (
            jwtResult.error ? (
              <div style={{ marginTop: 16, padding: '12px 14px', borderRadius: 8, background: 'rgba(224,75,63,0.1)', color: '#e04b3f', fontSize: 13 }}>
                ⚠️ {jwtResult.error}
              </div>
            ) : (
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Header */}
                <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--panel-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: '#e0a05c' }}>HEADER</span>
                    <button onClick={() => copyText(JSON.stringify(jwtResult.header, null, 2))} style={{ ...segBtn(false), padding: '4px 10px', fontSize: 11 }}>📋 Copy</button>
                  </div>
                  <pre style={{ margin: 0, padding: '14px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--ink)', overflowX: 'auto' }}>
                    {JSON.stringify(jwtResult.header, null, 2)}
                  </pre>
                </div>

                {/* Payload */}
                <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--panel-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: '#6fbf5c' }}>PAYLOAD</span>
                    <button onClick={() => copyText(JSON.stringify(jwtResult.payload, null, 2))} style={{ ...segBtn(false), padding: '4px 10px', fontSize: 11 }}>📋 Copy</button>
                  </div>
                  <pre style={{ margin: 0, padding: '14px 16px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--ink)', overflowX: 'auto' }}>
                    {JSON.stringify(jwtResult.payload, null, 2)}
                  </pre>
                </div>

                {/* Timestamps */}
                {(jwtResult.payload.iat || jwtResult.payload.exp) && (
                  <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 10 }}>TIMESTAMPS</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {jwtResult.payload.iat && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                          <span style={{ color: 'var(--ink-dim)' }}>Issued at (iat)</span>
                          <span style={{ fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
                            {new Date(jwtResult.payload.iat * 1000).toLocaleString()}
                          </span>
                        </div>
                      )}
                      {jwtResult.payload.exp && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                          <span style={{ color: 'var(--ink-dim)' }}>Expires at (exp)</span>
                          <span style={{
                            fontWeight: 700, fontFamily: 'var(--font-mono)',
                            color: new Date(jwtResult.payload.exp * 1000) < new Date() ? '#e04b3f' : '#3fae6f',
                          }}>
                            {new Date(jwtResult.payload.exp * 1000).toLocaleString()}
                            {new Date(jwtResult.payload.exp * 1000) < new Date() ? ' (EXPIRED)' : ' (Valid)'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Signature note */}
                <div style={{ fontSize: 11.5, color: 'var(--ink-faint)', padding: '10px 14px', borderRadius: 8, background: 'var(--panel-bg)', border: '1px solid var(--panel-border)' }}>
                  🔒 <strong>Signature:</strong> {jwtResult.signature.slice(0, 20)}... — The signature can only be verified server-side with the secret key.
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5, fontWeight: 800, color: 'var(--ink-faint)' }}>
      {label}
      {children}
    </label>
  )
}
