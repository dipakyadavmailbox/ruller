import { useMemo, useState } from 'react'
import { analyzePassword, formatDuration, generatePassword } from './passwordStrength.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { usePageMeta } from '../../hooks/usePageMeta.js'

const AFFILIATE_ITEMS = [
  { name: '1Password', blurb: 'Generates and stores strong unique passwords for every site automatically.', href: '#', cta: 'Try free →' },
  { name: 'Dashlane', blurb: 'Password manager with built-in dark web breach monitoring.', href: '#', cta: 'Try free →' },
  { name: 'NordPass', blurb: 'Affordable password manager with secure sharing for teams/families.', href: '#', cta: 'Try free →' },
]

const SCORE_COLORS = ['#e04b3f', '#e08b3f', '#e0c93f', '#6fbf5c', '#3fae6f']

const CHECK_LABELS = {
  length8: 'At least 8 characters',
  length12: 'At least 12 characters (recommended)',
  hasLower: 'Contains lowercase letters',
  hasUpper: 'Contains uppercase letters',
  hasDigit: 'Contains a number',
  hasSymbol: 'Contains a symbol',
  notCommon: 'Not a known common password',
  noSequence: 'No obvious sequence (abcd, 1234, qwerty)',
  noRepeats: 'No long repeated-character runs',
}

export default function PasswordChecker() {
  usePageMeta({
    title: 'Password Strength Checker — Free, Private, No Signup',
    description: 'Check how strong your password is instantly, 100% in your browser — nothing is sent or stored. Includes a secure password generator.',
  })

  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const [genLength, setGenLength] = useState(16)
  const [genLower, setGenLower] = useState(true)
  const [genUpper, setGenUpper] = useState(true)
  const [genDigits, setGenDigits] = useState(true)
  const [genSymbols, setGenSymbols] = useState(true)
  const [generated, setGenerated] = useState('')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => analyzePassword(password), [password])

  function handleGenerate() {
    const pw = generatePassword({
      length: genLength,
      lower: genLower,
      upper: genUpper,
      digits: genDigits,
      symbols: genSymbols,
    })
    setGenerated(pw)
    setCopied(false)
  }

  async function copyGenerated() {
    if (!generated) return
    try {
      await navigator.clipboard.writeText(generated)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API unavailable — user can still select/copy manually
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px 60px' }}>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
        Password Strength Checker
      </h1>
      <p style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
        Checked entirely in your browser — your password is never sent
        anywhere, logged, or stored.
      </p>

      <div style={{ position: 'relative', marginBottom: 12 }}>
        <input
          type={visible ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type a password to check its strength"
          autoComplete="off"
          spellCheck={false}
          style={{
            width: '100%',
            padding: '14px 90px 14px 16px',
            fontSize: 15,
            borderRadius: 8,
            border: '1px solid var(--panel-border)',
            background: 'var(--panel-bg)',
            color: 'var(--ink)',
          }}
        />
        <button
          onClick={() => setVisible((v) => !v)}
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
            bottom: 8,
            padding: '0 12px',
            border: 'none',
            borderRadius: 6,
            background: 'var(--btn-idle-bg)',
            color: 'var(--ink-dim)',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {visible ? 'HIDE' : 'SHOW'}
        </button>
      </div>

      {/* strength meter */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              height: 6,
              flex: 1,
              borderRadius: 3,
              background: i <= result.score && password ? SCORE_COLORS[result.score] : 'var(--panel-border)',
              transition: 'background 150ms ease',
            }}
          />
        ))}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: password ? SCORE_COLORS[result.score] : 'var(--ink-faint)', marginBottom: 24 }}>
        {password ? result.label : 'Waiting for input…'}
        {password && <span style={{ color: 'var(--ink-dim)', fontWeight: 500 }}> · ~{Math.round(result.entropyBits)} bits of entropy</span>}
      </div>

      {/* checklist */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8, marginBottom: 28 }}>
        {Object.entries(CHECK_LABELS).map(([key, label]) => {
          const pass = result.checks[key]
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: pass ? 'var(--ink)' : 'var(--ink-faint)' }}>
              <span style={{ color: pass ? '#3fae6f' : 'var(--ink-faint)' }}>{pass ? '✓' : '○'}</span>
              {label}
            </div>
          )
        })}
      </div>

      {/* crack time table */}
      {password && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 10 }}>
            ESTIMATED TIME TO CRACK
          </div>
          <div style={{ border: '1px solid var(--panel-border)', borderRadius: 8, overflow: 'hidden' }}>
            {result.scenarios.map((s) => (
              <div
                key={s.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  fontSize: 12.5,
                  borderTop: '1px solid var(--panel-border)',
                }}
              >
                <span style={{ color: 'var(--ink-dim)' }}>{s.label}</span>
                <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{formatDuration(s.seconds)}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 8 }}>
            Rough estimates based on entropy, not a guarantee — a leaked or
            reused password can be compromised instantly regardless of
            strength.
          </div>
        </div>
      )}

      <div style={{ borderTop: '1px dashed var(--divider)', margin: '8px 0 28px' }} />

      {/* generator */}
      <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
        Generate a strong password
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
        <label style={toggleStyle}>
          <input type="checkbox" checked={genLower} onChange={(e) => setGenLower(e.target.checked)} /> a-z
        </label>
        <label style={toggleStyle}>
          <input type="checkbox" checked={genUpper} onChange={(e) => setGenUpper(e.target.checked)} /> A-Z
        </label>
        <label style={toggleStyle}>
          <input type="checkbox" checked={genDigits} onChange={(e) => setGenDigits(e.target.checked)} /> 0-9
        </label>
        <label style={toggleStyle}>
          <input type="checkbox" checked={genSymbols} onChange={(e) => setGenSymbols(e.target.checked)} /> !@#$
        </label>
        <label style={{ ...toggleStyle, marginLeft: 'auto' }}>
          Length {genLength}
          <input
            type="range"
            min={8}
            max={32}
            value={genLength}
            onChange={(e) => setGenLength(Number(e.target.value))}
            style={{ marginLeft: 8, width: 120 }}
          />
        </label>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleGenerate} style={primaryBtn}>Generate</button>
        {generated && (
          <button onClick={copyGenerated} style={secondaryBtn}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {generated && (
        <div
          style={{
            marginTop: 12,
            padding: '14px 16px',
            borderRadius: 8,
            background: 'var(--panel-bg)',
            border: '1px solid var(--panel-border)',
            fontSize: 15,
            wordBreak: 'break-all',
            color: 'var(--ink)',
          }}
        >
          {generated}
        </div>
      )}

      <AffiliateCard heading="STOP REUSING PASSWORDS — USE A MANAGER" items={AFFILIATE_ITEMS} />
    </div>
  )
}

const toggleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 12.5,
  color: 'var(--ink-dim)',
  background: 'var(--panel-bg)',
  border: '1px solid var(--panel-border)',
  padding: '6px 10px',
  borderRadius: 6,
}

const primaryBtn = {
  padding: '10px 20px',
  borderRadius: 6,
  border: 'none',
  background: 'var(--btn-active-bg)',
  color: 'var(--btn-active-ink)',
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer',
}

const secondaryBtn = {
  padding: '10px 20px',
  borderRadius: 6,
  border: '1px solid var(--panel-border)',
  background: 'transparent',
  color: 'var(--ink)',
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer',
}
