import { useMemo, useState } from 'react'
import { CHEATSHEET_GROUPS } from './regexCheatsheet.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { textareaStyle, inputStyle, segBtn } from '../shared/FormKit.jsx'

const AFFILIATE_ITEMS = [
  { name: 'JetBrains All Products Pack', blurb: 'IDEs with built-in regex debugging, refactoring, and inspections.', href: '#', cta: 'Try free →' },
  { name: 'Regex course on Udemy', blurb: 'Go from this cheatsheet to writing complex patterns confidently.', href: '#', cta: 'View course →' },
  { name: 'DigitalOcean / hosting credit', blurb: 'Deploy the scripts you are testing patterns for.', href: '#', cta: 'Get credit →' },
]

const FLAG_OPTIONS = [
  { flag: 'g', label: 'Global' },
  { flag: 'i', label: 'Case-insensitive' },
  { flag: 'm', label: 'Multiline' },
  { flag: 's', label: 'Dot matches newline' },
]

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default function RegexTester() {
  usePageMeta({
    title: 'Regex Tester & Cheatsheet — Free Online Tool',
    description: 'Test regular expressions live with match highlighting and capture groups, plus a quick-reference regex cheatsheet for common patterns and syntax.',
  })

  const [pattern, setPattern] = useState('\\b[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}\\b')
  const [flags, setFlags] = useState(['g', 'i'])
  const [testString, setTestString] = useState('Contact us at hello@example.com or support@test.co.uk for help.')

  function toggleFlag(f) {
    setFlags((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))
  }

  const { error, matches, highlighted } = useMemo(() => {
    if (!pattern) return { error: null, matches: [], highlighted: escapeHtml(testString) }
    try {
      const re = new RegExp(pattern, flags.join(''))
      const isGlobal = flags.includes('g')
      const found = []
      let html = ''
      let lastIndex = 0

      if (isGlobal) {
        let m
        const globalRe = new RegExp(pattern, flags.join(''))
        while ((m = globalRe.exec(testString)) !== null) {
          found.push(m)
          if (m[0].length === 0) globalRe.lastIndex++
        }
      } else {
        const m = testString.match(re)
        if (m) found.push(m)
      }

      for (const m of found) {
        html += escapeHtml(testString.slice(lastIndex, m.index))
        html += `<mark style="background:var(--accent);color:#fff;border-radius:3px;padding:0 2px;">${escapeHtml(m[0])}</mark>`
        lastIndex = m.index + m[0].length
      }
      html += escapeHtml(testString.slice(lastIndex))

      return { error: null, matches: found, highlighted: html }
    } catch (e) {
      return { error: e.message, matches: [], highlighted: escapeHtml(testString) }
    }
  }, [pattern, flags, testString])

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 20px 60px' }}>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
        Regex Tester
      </h1>
      <p style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        Test JavaScript-flavored regular expressions live, with match
        highlighting, capture groups, and a syntax cheatsheet below.
      </p>

      <label style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)', display: 'block', marginBottom: 6 }}>
        Pattern
      </label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: '1 1 320px', border: '1px solid var(--panel-border)', borderRadius: 6, background: 'var(--panel-bg)', padding: '0 10px' }}>
          <span style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>/</span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            spellCheck={false}
            style={{ ...inputStyle, border: 'none', background: 'transparent', flex: 1 }}
          />
          <span style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>/{flags.join('')}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {FLAG_OPTIONS.map((f) => (
          <button key={f.flag} onClick={() => toggleFlag(f.flag)} style={segBtn(flags.includes(f.flag))} title={f.label}>
            {f.flag}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ padding: '10px 14px', borderRadius: 6, background: 'rgba(224,75,63,0.12)', color: '#e04b3f', fontSize: 12.5, marginBottom: 16 }}>
          Invalid pattern: {error}
        </div>
      )}

      <label style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)', display: 'block', marginBottom: 6 }}>
        Test string
      </label>
      <textarea
        value={testString}
        onChange={(e) => setTestString(e.target.value)}
        rows={5}
        spellCheck={false}
        style={{ ...textareaStyle, marginBottom: 16 }}
      />

      <label style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)', display: 'block', marginBottom: 6 }}>
        Result ({matches.length} match{matches.length === 1 ? '' : 'es'})
      </label>
      <div
        style={{
          padding: '14px 16px',
          borderRadius: 8,
          border: '1px solid var(--panel-border)',
          background: 'var(--panel-bg)',
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          marginBottom: 20,
        }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />

      {matches.length > 0 && matches.some((m) => m.length > 1) && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 10 }}>
            CAPTURE GROUPS
          </div>
          <div style={{ border: '1px solid var(--panel-border)', borderRadius: 8, overflow: 'hidden' }}>
            {matches.map((m, i) => (
              <div key={i} style={{ padding: '10px 14px', fontSize: 12.5, borderTop: i ? '1px solid var(--panel-border)' : 'none' }}>
                <span style={{ color: 'var(--ink-dim)' }}>Match {i + 1}: </span>
                {m.slice(1).map((g, gi) => (
                  <span key={gi} style={{ marginRight: 10 }}>
                    <span style={{ color: 'var(--ink-faint)' }}>${gi + 1}=</span>
                    <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{g ?? '(none)'}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ borderTop: '1px dashed var(--divider)', margin: '8px 0 28px' }} />

      <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>Cheatsheet</h2>
      {CHEATSHEET_GROUPS.map((group) => (
        <div key={group.heading} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 8 }}>
            {group.heading.toUpperCase()}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 8 }}>
            {group.items.map((item) => (
              <button
                key={item.name}
                onClick={() => setPattern(item.pattern)}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--panel-border)',
                  background: 'var(--panel-bg)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-dim)', fontFamily: 'var(--font-mono)', marginTop: 2, wordBreak: 'break-all' }}>
                  {item.pattern}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <AffiliateCard heading="TOOLS FOR WRITING BETTER CODE" items={AFFILIATE_ITEMS} />
    </div>
  )
}
