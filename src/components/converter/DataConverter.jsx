import { useMemo, useState } from 'react'
import { convert, FORMATS, SAMPLE_JSON } from './convert.js'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { textareaStyle, selectStyle, secondaryBtn, segBtn } from '../shared/FormKit.jsx'

export default function DataConverter() {
  usePageMeta({
    title: 'JSON, CSV & YAML Converter — Free Online Tool',
    description: 'Convert between JSON, CSV, and YAML instantly in your browser. Paste data in any of the three formats and get the other two, no upload required.',
  })

  const [fromFormat, setFromFormat] = useState('JSON')
  const [toFormat, setToFormat] = useState('CSV')
  const [input, setInput] = useState(SAMPLE_JSON)
  const [copied, setCopied] = useState(false)

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: null }
    try {
      return { output: convert(input, fromFormat, toFormat), error: null }
    } catch (e) {
      return { output: '', error: e.message }
    }
  }, [input, fromFormat, toFormat])

  function swapFormats() {
    setFromFormat(toFormat)
    setToFormat(fromFormat)
    if (output) setInput(output)
  }

  async function copyOutput() {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — user can still select/copy manually
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px 60px' }}>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
        JSON ⇄ CSV ⇄ YAML Converter
      </h1>
      <p style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        Paste data in any of the three formats below — conversion happens
        instantly in your browser, nothing is uploaded anywhere.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <select value={fromFormat} onChange={(e) => setFromFormat(e.target.value)} style={{ ...selectStyle, width: 'auto' }}>
          {FORMATS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <button onClick={swapFormats} style={secondaryBtn} title="Swap direction">⇄</button>
        <select value={toFormat} onChange={(e) => setToFormat(e.target.value)} style={{ ...selectStyle, width: 'auto' }}>
          {FORMATS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)', marginBottom: 6 }}>INPUT ({fromFormat})</div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={18}
            spellCheck={false}
            style={textareaStyle}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)' }}>OUTPUT ({toFormat})</span>
            {output && (
              <button onClick={copyOutput} style={{ ...segBtn(false), padding: '4px 10px' }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            value={error ? `Error: ${error}` : output}
            readOnly
            rows={18}
            spellCheck={false}
            style={{ ...textareaStyle, color: error ? '#e04b3f' : 'var(--ink)' }}
          />
        </div>
      </div>

      <p style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 16 }}>
        Note: CSV is flat by nature, so converting nested JSON/YAML to CSV
        works best with an array of flat objects (like the sample above).
      </p>
    </div>
  )
}
