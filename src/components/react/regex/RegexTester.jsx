import { useMemo, useState } from 'react'
import { CHEATSHEET_GROUPS } from './regexCheatsheet.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { textareaStyle, inputStyle, segBtn, secondaryBtn } from '../shared/FormKit.jsx'

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

// Common validation patterns for quick insert
const VALIDATION_PATTERNS = [
  { name: 'Email address', pattern: '^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$', example: 'user@example.com' },
  { name: 'URL (http/https)', pattern: '^https?:\\/\\/[\\w.-]+(:[0-9]+)?(\\/[\\w\\-./?%&=]*)?$', example: 'https://example.com' },
  { name: 'Phone (US)', pattern: '^\\+?1?\\s?\\(?[2-9][0-9]{2}\\)?[\\s.-]?[0-9]{3}[\\s.-]?[0-9]{4}$', example: '(555) 555-1234' },
  { name: 'Phone (International)', pattern: '^\\+?[1-9]\\d{6,14}$', example: '+919876543210' },
  { name: 'IPv4 Address', pattern: '^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$', example: '192.168.1.1' },
  { name: 'IPv6 Address', pattern: '^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$', example: '2001:0db8:85a3:0000:0000:8a2e:0370:7334' },
  { name: 'UUID v4', pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', example: '550e8400-e29b-41d4-a716-446655440000' },
  { name: 'Date (YYYY-MM-DD)', pattern: '^(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$', example: '2024-07-25' },
  { name: 'Date (DD/MM/YYYY)', pattern: '^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/(19|20)\\d{2}$', example: '25/07/2024' },
  { name: 'Time (HH:MM)', pattern: '^([01]\\d|2[0-3]):[0-5]\\d$', example: '14:30' },
  { name: 'Zip code (US 5-digit)', pattern: '^\\d{5}(-\\d{4})?$', example: '10001-4567' },
  { name: 'PIN code (India)', pattern: '^[1-9][0-9]{5}$', example: '400001' },
  { name: 'Credit card (16 digits)', pattern: '^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$', example: '4111-1111-1111-1111' },
  { name: 'Hex color', pattern: '^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$', example: '#FF5733' },
  { name: 'Positive integer', pattern: '^[1-9]\\d*$', example: '42' },
  { name: 'Decimal number', pattern: '^-?\\d+(\\.\\d+)?$', example: '-3.14' },
  { name: 'Username (alphanumeric)', pattern: '^[a-zA-Z][a-zA-Z0-9_]{2,19}$', example: 'user_name123' },
  { name: 'Strong password', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$', example: 'P@ssw0rd!' },
  { name: 'Markdown heading', pattern: '^#{1,6}\\s.+$', example: '## My Heading' },
  { name: 'HTML tag', pattern: '<([a-zA-Z][a-zA-Z0-9]*)(\\s[^>]*)?>.*?<\\/\\1>', example: '<p class="x">Hello</p>' },
]

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default function RegexTester() {
  const [subMode, setSubMode] = useState('match') // 'match' | 'validate'
  const [pattern, setPattern] = useState('[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}')
  const [flags, setFlags] = useState(['g', 'i'])
  const [testString, setTestString] = useState('Contact us at hello@example.com or support@test.co.uk for help.')
  const [replacePattern, setReplacePattern] = useState('[contact-email]')
  const [showReplace, setShowReplace] = useState(false)
  const [showValidationPatterns, setShowValidationPatterns] = useState(false)
  const [copiedMsg, setCopiedMsg] = useState('')

  function toggleFlag(f) {
    setFlags((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))
  }

  const { error, matches, highlighted, replacedText, isFullMatch } = useMemo(() => {
    if (!pattern) return { error: null, matches: [], highlighted: escapeHtml(testString), replacedText: testString, isFullMatch: false }
    try {
      const flagStr = flags.join('')
      const re = new RegExp(pattern, flagStr)
      const isGlobal = flags.includes('g')
      const found = []
      let html = ''
      let lastIndex = 0

      // Full match validation: test if each line is an exact match
      const validateRe = new RegExp(`^(?:${pattern})$`, flags.filter(f => f !== 'g').join(''))
      const lines = testString.split('\n')
      const lineResults = lines.map(line => ({
        line,
        valid: validateRe.test(line.trim()),
      }))
      const allValid = testString.trim() && lines.every(l => !l.trim() || validateRe.test(l.trim()))
      const anyValid = lines.some(l => l.trim() && validateRe.test(l.trim()))

      if (isGlobal) {
        let m
        const globalRe = new RegExp(pattern, flagStr)
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
        html += `<mark style="background:var(--accent);color:#fff;border-radius:3px;padding:0 3px;font-weight:700;">${escapeHtml(m[0])}</mark>`
        lastIndex = m.index + m[0].length
      }
      html += escapeHtml(testString.slice(lastIndex))

      const replaced = testString.replace(re, replacePattern)

      return {
        error: null,
        matches: found,
        highlighted: html,
        replacedText: replaced,
        isFullMatch: anyValid,
        lineResults,
        allValid,
      }
    } catch (e) {
      return { error: e.message, matches: [], highlighted: escapeHtml(testString), replacedText: testString, isFullMatch: false, lineResults: [], allValid: false }
    }
  }, [pattern, flags, testString, replacePattern])

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMsg('Copied!')
      setTimeout(() => setCopiedMsg(''), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 20px 60px' }}>
      {/* Match / Validate sub-mode */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        <button onClick={() => setSubMode('match')} style={segBtn(subMode === 'match')}>🔍 Match & Highlight</button>
        <button onClick={() => setSubMode('validate')} style={segBtn(subMode === 'validate')}>✅ Validate Input</button>
      </div>

          {/* Pattern input */}
          <label style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)', display: 'block', marginBottom: 6 }}>
            PATTERN
          </label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: '1 1 320px', border: '1px solid var(--panel-border)', borderRadius: 6, background: 'var(--panel-bg)', padding: '0 10px' }}>
              <span style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>/</span>
              <input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                spellCheck={false}
                style={{ ...inputStyle, border: 'none', background: 'transparent', flex: 1, fontFamily: 'var(--font-mono)' }}
              />
              <span style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>/{flags.join('')}</span>
            </div>
          </div>

          {/* Flags + actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {FLAG_OPTIONS.map((f) => (
                <button key={f.flag} onClick={() => toggleFlag(f.flag)} style={segBtn(flags.includes(f.flag))} title={f.label}>
                  {f.flag} ({f.label})
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setShowValidationPatterns(v => !v)} style={secondaryBtn}>
                {showValidationPatterns ? 'Hide Patterns' : '📋 Common Patterns'}
              </button>
              {subMode === 'match' && (
                <button onClick={() => setShowReplace((v) => !v)} style={secondaryBtn}>
                  {showReplace ? 'Hide Replace' : '+ Regex Replace'}
                </button>
              )}
            </div>
          </div>

          {/* Common validation patterns quick-insert */}
          {showValidationPatterns && (
            <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 12 }}>
                COMMON VALIDATION PATTERNS — click to load
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
                {VALIDATION_PATTERNS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setPattern(p.pattern)
                      setTestString(p.example)
                      setFlags(['i'])
                    }}
                    style={{
                      textAlign: 'left', padding: '10px 12px', borderRadius: 6,
                      border: '1px solid var(--panel-border)', background: 'transparent',
                      cursor: 'pointer', transition: 'background 150ms',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--btn-idle-bg)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ fontSize: 12.5, color: 'var(--ink)', fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)', marginTop: 3, wordBreak: 'break-all' }}>
                      example: {p.example}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div style={{ padding: '10px 14px', borderRadius: 6, background: 'rgba(224,75,63,0.12)', color: '#e04b3f', fontSize: 12.5, marginBottom: 16 }}>
              ⚠️ Invalid Regex Pattern: {error}
            </div>
          )}

          {showReplace && subMode === 'match' && (
            <div style={{ marginBottom: 16, background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 8, padding: 14 }}>
              <label style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)', display: 'block', marginBottom: 6 }}>
                REPLACEMENT STRING
              </label>
              <input
                value={replacePattern}
                onChange={(e) => setReplacePattern(e.target.value)}
                style={{ ...inputStyle, fontFamily: 'var(--font-mono)' }}
              />
            </div>
          )}

          {/* Test string input */}
          <label style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)', display: 'block', marginBottom: 6 }}>
            {subMode === 'validate' ? 'TEST INPUTS (one per line)' : 'TEST STRING'}
          </label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            rows={5}
            spellCheck={false}
            style={{ ...textareaStyle, marginBottom: 16 }}
            placeholder={subMode === 'validate' ? 'Enter one value per line to validate...' : 'Enter text to test your regex against...'}
          />

          {/* VALIDATE mode results */}
          {subMode === 'validate' && !error && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 10 }}>
                VALIDATION RESULTS (full string match — pattern anchored with ^ and $)
              </div>
              {(matches, error, isFullMatch, testString) => null /* unused expr hack */}
              {testString.split('\n').filter(l => l.trim()).map((line, i) => {
                let valid = false
                try {
                  valid = new RegExp(`^(?:${pattern})$`, flags.filter(f => f !== 'g').join('')).test(line.trim())
                } catch { valid = false }
                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                      borderRadius: 8, marginBottom: 6,
                      background: valid ? 'rgba(63,174,111,0.08)' : 'rgba(224,75,63,0.08)',
                      border: `1px solid ${valid ? 'rgba(63,174,111,0.3)' : 'rgba(224,75,63,0.3)'}`,
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 800, color: valid ? '#3fae6f' : '#e04b3f', flexShrink: 0 }}>
                      {valid ? '✓' : '✗'}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5, color: 'var(--ink)', flex: 1, wordBreak: 'break-all' }}>
                      {line}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: valid ? '#3fae6f' : '#e04b3f', flexShrink: 0 }}>
                      {valid ? 'VALID' : 'INVALID'}
                    </span>
                  </div>
                )
              })}
              {testString.split('\n').filter(l => l.trim()).length === 0 && (
                <div style={{ color: 'var(--ink-faint)', fontSize: 13, padding: '10px 14px' }}>
                  Enter one value per line above to validate against your pattern.
                </div>
              )}
            </div>
          )}

          {/* MATCH mode results */}
          {subMode === 'match' && (
            <>
              <label style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)', display: 'block', marginBottom: 6 }}>
                HIGHLIGHTED MATCHES ({matches.length} match{matches.length === 1 ? '' : 'es'})
              </label>
              <div
                style={{
                  padding: '14px 16px', borderRadius: 8, border: '1px solid var(--panel-border)',
                  background: 'var(--panel-bg)', fontFamily: 'var(--font-mono)', fontSize: 13.5,
                  lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginBottom: 20,
                }}
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />

              {showReplace && (
                <>
                  <label style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)', display: 'block', marginBottom: 6 }}>
                    REPLACED RESULT
                  </label>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div
                      style={{
                        flex: 1, padding: '14px 16px', borderRadius: 8, border: '1px solid var(--panel-border)',
                        background: 'var(--panel-bg)', fontFamily: 'var(--font-mono)', fontSize: 13.5,
                        lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginBottom: 20,
                      }}
                    >
                      {replacedText}
                    </div>
                    <button onClick={() => copyToClipboard(replacedText)} style={{ ...secondaryBtn, padding: '10px 14px', whiteSpace: 'nowrap' }}>
                      {copiedMsg || '📋 Copy'}
                    </button>
                  </div>
                </>
              )}

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
                          <span key={gi} style={{ marginRight: 12 }}>
                            <span style={{ color: 'var(--ink-faint)' }}>${gi + 1}=</span>
                            <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{g ?? '(none)'}</span>
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div style={{ borderTop: '1px dashed var(--divider)', margin: '8px 0 28px' }} />

          {/* Regex cheatsheet */}
          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>Regex Cheatsheet</h2>
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
                      textAlign: 'left', padding: '10px 12px', borderRadius: 6,
                      border: '1px solid var(--panel-border)', background: 'var(--panel-bg)',
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
