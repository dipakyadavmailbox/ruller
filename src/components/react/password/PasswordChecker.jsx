import { useMemo, useState } from 'react'
import {
  analyzePassword,
  formatDuration,
  crackTimeSeverity,
  generatePassword,
  generatePassphrase,
  generatePIN,
} from './passwordStrength.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'

const AFFILIATE_ITEMS = [
  { name: '1Password', blurb: 'Generates and stores strong unique passwords for every site automatically.', href: '#', cta: 'Try free →' },
  { name: 'Dashlane', blurb: 'Password manager with built-in dark web breach monitoring.', href: '#', cta: 'Try free →' },
  { name: 'NordPass', blurb: 'Affordable password manager with secure sharing for teams/families.', href: '#', cta: 'Try free →' },
]

const SCORE_COLORS = ['#e04b3f', '#e08b3f', '#e0c93f', '#6fbf5c', '#3fae6f']
const SCORE_LABELS = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong']

const CHECK_LABELS = {
  length8: 'At least 8 characters',
  length12: 'At least 12 characters (recommended)',
  hasLower: 'Contains lowercase letters',
  hasUpper: 'Contains uppercase letters',
  hasDigit: 'Contains a number',
  hasSymbol: 'Contains a special symbol',
  notCommon: 'Not a known breached password',
  noSequence: 'No obvious sequence (abcd, 1234, qwerty)',
  noRepeats: 'No long repeated-character runs',
}

const SEPARATOR_OPTIONS = [
  { value: '-', label: 'Dash  (word-word)' },
  { value: '.', label: 'Dot   (word.word)' },
  { value: '_', label: 'Under (word_word)' },
  { value: ' ', label: 'Space (word word)' },
  { value: '#', label: 'Hash  (word#word)' },
]

export default function PasswordChecker({
  initialGenType = 'random',
  initialGenLength = 16,
  initialPassword = '',
} = {}) {
  const [password, setPassword] = useState(initialPassword || '')
  const [visible, setVisible] = useState(false)

  // Generator state
  const [genType, setGenType] = useState(initialGenType || 'random') // 'random' | 'passphrase' | 'pin'
  const [genLength, setGenLength] = useState(initialGenLength || 16)
  const [genLower, setGenLower] = useState(true)
  const [genUpper, setGenUpper] = useState(true)
  const [genDigits, setGenDigits] = useState(true)
  const [genSymbols, setGenSymbols] = useState(true)
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(true)
  const [wordCount, setWordCount] = useState(4)
  const [separator, setSeparator] = useState('-')
  const [capitalize, setCapitalize] = useState(false)
  const [pinLength, setPinLength] = useState(initialGenType === 'pin' ? (initialGenLength || 6) : 6)

  const [generated, setGenerated] = useState('')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => analyzePassword(password), [password])

  function handleGenerate() {
    let pw = ''
    if (genType === 'random') {
      pw = generatePassword({ length: genLength, lower: genLower, upper: genUpper, digits: genDigits, symbols: genSymbols, avoidAmbiguous })
    } else if (genType === 'passphrase') {
      pw = generatePassphrase(wordCount, separator, capitalize)
    } else {
      pw = generatePIN(pinLength)
    }
    setGenerated(pw)
    setCopied(false)
  }

  async function copyText(text) {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard API unavailable
    }
  }

  const strengthColor = password ? SCORE_COLORS[result.score] : 'var(--ink-faint)'

  return (
    <div style={{ maxWidth: 740, margin: '0 auto', padding: '0 20px 60px' }}>
      {/* Password input */}
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <input
          type={visible ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type or paste a password to analyze its strength..."
          autoComplete="off"
          spellCheck={false}
          style={{
            width: '100%',
            padding: '16px 90px 16px 18px',
            fontSize: 16,
            borderRadius: 10,
            border: `2px solid ${password ? strengthColor : 'var(--panel-border)'}`,
            background: 'var(--panel-bg)',
            color: 'var(--ink)',
            fontFamily: 'var(--font-mono)',
            boxSizing: 'border-box',
            transition: 'border-color 200ms ease',
            outline: 'none',
          }}
        />
        <button
          onClick={() => setVisible((v) => !v)}
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
            bottom: 10,
            padding: '0 14px',
            border: 'none',
            borderRadius: 6,
            background: 'var(--btn-idle-bg)',
            color: 'var(--ink)',
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          {visible ? 'HIDE' : 'SHOW'}
        </button>
      </div>

      {/* Breach badge */}
      {password && result.isBreached && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
          borderRadius: 8, background: 'rgba(224,75,63,0.12)', border: '1px solid rgba(224,75,63,0.4)',
          color: '#e04b3f', fontSize: 13, fontWeight: 700, marginBottom: 12,
        }}>
          🚨 This password appears in known breach databases. Never use it!
        </div>
      )}

      {/* Strength meter */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              height: 6,
              flex: 1,
              borderRadius: 4,
              background: i <= result.score && password ? SCORE_COLORS[result.score] : 'var(--panel-border)',
              transition: 'background 200ms ease',
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: password ? strengthColor : 'var(--ink-faint)' }}>
          {password ? SCORE_LABELS[result.score] : 'Enter a password above to evaluate it'}
        </div>
        {password && (
          <div style={{ fontSize: 13, color: 'var(--ink-dim)', fontFamily: 'var(--font-mono)' }}>
            ~{Math.round(result.entropyBits)} bits entropy · {result.length} chars
          </div>
        )}
      </div>

      {/* Checklist */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 32 }}>
        {Object.entries(CHECK_LABELS).map(([key, label]) => {
          const pass = result.checks[key]
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: pass ? 'var(--ink)' : 'var(--ink-faint)' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 18, height: 18, borderRadius: '50%',
                background: pass ? 'rgba(63,174,111,0.15)' : 'transparent',
                border: `1.5px solid ${pass ? '#3fae6f' : 'var(--panel-border)'}`,
                color: pass ? '#3fae6f' : 'var(--ink-faint)',
                fontWeight: 800, fontSize: 11, flexShrink: 0,
              }}>
                {pass ? '✓' : ''}
              </span>
              {label}
            </div>
          )
        })}
      </div>

      {/* Crack time table */}
      {password && (
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 10 }}>
            ESTIMATED TIME TO CRACK BY ATTACK SCENARIO
          </div>
          <div style={{ border: '1px solid var(--panel-border)', borderRadius: 10, overflow: 'hidden' }}>
            {result.scenarios.map((s, i) => {
              const sev = crackTimeSeverity(s.seconds)
              const isInstant = s.seconds < 1
              return (
                <div
                  key={s.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    fontSize: 13,
                    borderTop: i ? '1px solid var(--panel-border)' : 'none',
                    background: isInstant ? 'rgba(224,75,63,0.06)' : 'transparent',
                  }}
                >
                  <span style={{ color: 'var(--ink-dim)' }}>{s.label}</span>
                  <span style={{
                    fontWeight: 800, color: sev.color, fontFamily: 'var(--font-mono)',
                    padding: '3px 10px', borderRadius: 20, background: `${sev.color}18`, fontSize: 12,
                  }}>
                    {formatDuration(s.seconds)}
                  </span>
                </div>
              )
            })}
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 8 }}>
            ⚡ Based on entropy estimate. Real-world time varies with hash algorithm and hardware.
          </div>
        </div>
      )}

      <div style={{ borderTop: '1px dashed var(--divider)', margin: '16px 0 32px' }} />

      {/* Generator */}
      <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>
        Generate a Strong Password
      </h2>

      {/* Type tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { id: 'random', label: '🔀 Random Characters' },
          { id: 'passphrase', label: '📖 Passphrase' },
          { id: 'pin', label: '🔢 PIN Code' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setGenType(id)}
            style={{
              padding: '9px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: genType === id ? 'var(--btn-active-bg)' : 'var(--btn-idle-bg)',
              color: genType === id ? 'var(--btn-active-ink)' : 'var(--ink-dim)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Random options */}
      {genType === 'random' && (
        <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {[
              { state: genLower, set: setGenLower, label: 'a-z Lowercase' },
              { state: genUpper, set: setGenUpper, label: 'A-Z Uppercase' },
              { state: genDigits, set: setGenDigits, label: '0-9 Numbers' },
              { state: genSymbols, set: setGenSymbols, label: '!@#$ Symbols' },
              { state: avoidAmbiguous, set: setAvoidAmbiguous, label: 'Avoid ambiguous (il1O0)' },
            ].map(({ state, set, label }) => (
              <label key={label} style={toggleStyle}>
                <input type="checkbox" checked={state} onChange={(e) => set(e.target.checked)} style={{ width: 14, height: 14 }} />
                {label}
              </label>
            ))}
          </div>
          <label style={{ ...toggleStyle, width: '100%', justifyContent: 'space-between' }}>
            <span>Length: <strong style={{ color: 'var(--accent)' }}>{genLength}</strong> characters</span>
            <input
              type="range" min={8} max={64} value={genLength}
              onChange={(e) => setGenLength(Number(e.target.value))}
              style={{ marginLeft: 12, flex: 1, maxWidth: 200 }}
            />
          </label>
        </div>
      )}

      {/* Passphrase options */}
      {genType === 'passphrase' && (
        <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 14 }}>
            <label style={{ ...toggleStyle, gap: 10 }}>
              Words: <strong style={{ color: 'var(--accent)' }}>{wordCount}</strong>
              <input
                type="range" min={3} max={8} value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                style={{ marginLeft: 4, width: 100 }}
              />
            </label>
            <label style={toggleStyle}>
              <input type="checkbox" checked={capitalize} onChange={(e) => setCapitalize(e.target.checked)} />
              Capitalize Words
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 700 }}>Separator:</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {SEPARATOR_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSeparator(value)}
                  style={{
                    padding: '6px 12px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'monospace',
                    background: separator === value ? 'var(--btn-active-bg)' : 'var(--btn-idle-bg)',
                    color: separator === value ? 'var(--btn-active-ink)' : 'var(--ink-dim)',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PIN options */}
      {genType === 'pin' && (
        <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'var(--ink-dim)', fontWeight: 700 }}>PIN Length:</span>
            {[4, 6, 8, 10].map((n) => (
              <button
                key={n}
                onClick={() => setPinLength(n)}
                style={{
                  padding: '8px 16px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  background: pinLength === n ? 'var(--btn-active-bg)' : 'var(--btn-idle-bg)',
                  color: pinLength === n ? 'var(--btn-active-ink)' : 'var(--ink-dim)',
                }}
              >
                {n} digits
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 10 }}>
            ⚠️ PINs are numerically weak. Use only where a full password isn't possible (device unlock, ATM).
          </div>
        </div>
      )}

      {/* Generate button */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <button
          onClick={handleGenerate}
          style={{
            padding: '12px 24px', borderRadius: 8, border: 'none',
            background: 'var(--btn-active-bg)', color: 'var(--btn-active-ink)',
            fontWeight: 800, fontSize: 13.5, cursor: 'pointer',
          }}
        >
          ⚡ Generate
        </button>
        {generated && (
          <>
            <button
              onClick={() => copyText(generated)}
              style={{
                padding: '12px 24px', borderRadius: 8, border: '1px solid var(--panel-border)',
                background: 'var(--panel-bg)', color: 'var(--ink)', fontWeight: 800, fontSize: 13.5, cursor: 'pointer',
              }}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
            <button
              onClick={() => setPassword(generated)}
              style={{
                padding: '12px 24px', borderRadius: 8, border: '1px solid var(--panel-border)',
                background: 'var(--panel-bg)', color: 'var(--ink)', fontWeight: 800, fontSize: 13.5, cursor: 'pointer',
              }}
            >
              🔍 Test Strength
            </button>
          </>
        )}
      </div>

      {generated && (
        <div
          style={{
            padding: '16px 18px',
            borderRadius: 10,
            background: 'var(--panel-bg)',
            border: '2px solid var(--accent)',
            fontSize: 18,
            fontWeight: 700,
            wordBreak: 'break-all',
            color: 'var(--ink)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: genType === 'pin' ? 8 : 0.5,
            textAlign: genType === 'pin' ? 'center' : 'left',
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
  gap: 8,
  fontSize: 13,
  color: 'var(--ink)',
  background: 'transparent',
  cursor: 'default',
  fontWeight: 600,
}
