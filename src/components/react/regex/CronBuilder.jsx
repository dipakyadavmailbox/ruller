import { useMemo, useState } from 'react'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { ResultCard, inputStyle, segBtn, secondaryBtn } from '../shared/FormKit.jsx'

const AFFILIATE_ITEMS = [
  { name: 'JetBrains All Products Pack', blurb: 'IDEs with built-in cron task debugging and scheduled job management.', href: '#', cta: 'Try free →' },
  { name: 'DigitalOcean Cloud Cron', blurb: 'Deploy worker nodes and scheduled cron jobs with free cloud credit.', href: '#', cta: 'Get credit →' },
  { name: 'Datadog Cron Monitoring', blurb: 'Monitor cron job health, failures, and execution latencies in real-time.', href: '#', cta: 'Start free →' },
]

const PRESET_CRONS = [
  { label: 'Every minute', expr: '* * * * *' },
  { label: 'Every 5 minutes', expr: '*/5 * * * *' },
  { label: 'Every 15 minutes', expr: '*/15 * * * *' },
  { label: 'Every hour', expr: '0 * * * *' },
  { label: 'Every 2 hours', expr: '0 */2 * * *' },
  { label: 'Every day at midnight', expr: '0 0 * * *' },
  { label: 'Every day at 9:00 AM', expr: '0 9 * * *' },
  { label: 'Every Monday at 9:00 AM', expr: '0 9 * * 1' },
  { label: 'Every weekday at 8:00 AM', expr: '0 8 * * 1-5' },
  { label: '1st of every month', expr: '0 0 1 * *' },
]

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function translateCron(cronStr) {
  const parts = cronStr.trim().split(/\s+/)
  if (parts.length !== 5) return 'Invalid cron syntax — must contain exactly 5 space-separated parts (* * * * *)'

  const [min, hour, dom, mon, dow] = parts

  try {
    let text = 'Runs '
    if (min === '*' && hour === '*') text += 'every minute'
    else if (min.startsWith('*/')) text += `every ${min.slice(2)} minutes`
    else if (min === '0' && hour === '*') text += 'every hour on the hour'
    else if (min !== '*' && hour === '*') text += `at minute ${min} of every hour`
    else if (hour !== '*') {
      const h = Number(hour)
      const m = Number(min) || 0
      const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
      text += `at ${timeStr}`
    }

    if (dow !== '*') {
      if (dow.includes('-')) {
        const [start, end] = dow.split('-').map(Number)
        text += `, ${DAY_NAMES[start] || start} through ${DAY_NAMES[end] || end}`
      } else {
        const d = Number(dow)
        const dayName = DAY_NAMES[d] || `day ${dow}`
        text += `, on ${dayName}`
      }
    } else if (dom !== '*') {
      text += `, on day ${dom} of the month`
    } else {
      text += ', every day'
    }

    if (mon !== '*') {
      const m = Number(mon)
      const monName = MONTH_NAMES[m - 1] || `month ${mon}`
      text += ` in ${monName}`
    }

    return text
  } catch {
    return 'Custom cron expression'
  }
}

export function getNextOccurrences(cronStr, count = 5) {
  const parts = cronStr.trim().split(/\s+/)
  if (parts.length !== 5) return []

  const [minStr, hourStr, domStr, monStr, dowStr] = parts

  const parseRangeOrValue = (valStr, val) => {
    if (valStr === '*') return true
    if (valStr.startsWith('*/')) return val % Number(valStr.slice(2)) === 0
    if (valStr.includes('-')) {
      const [start, end] = valStr.split('-').map(Number)
      return val >= start && val <= end
    }
    if (valStr.includes(',')) {
      return valStr.split(',').map(Number).includes(val)
    }
    return Number(valStr) === val
  }

  const dates = []
  let current = new Date()
  current.setSeconds(0, 0)

  // Step forward minute by minute to find matching times
  for (let i = 0; i < 525600 && dates.length < count; i++) {
    current = new Date(current.getTime() + 60 * 1000)

    const m = current.getMinutes()
    const h = current.getHours()
    const dom = current.getDate()
    const mon = current.getMonth() + 1
    const dow = current.getDay()

    const matchMin = parseRangeOrValue(minStr, m)
    const matchHour = parseRangeOrValue(hourStr, h)
    const matchDom = parseRangeOrValue(domStr, dom)
    const matchMon = parseRangeOrValue(monStr, mon)
    const matchDow = parseRangeOrValue(dowStr, dow)

    if (matchMin && matchHour && matchDom && matchMon && matchDow) {
      dates.push(new Date(current))
    }
  }

  return dates
}

export function validateCron(cronStr) {
  const parts = cronStr.trim().split(/\s+/)
  if (parts.length !== 5) return { valid: false, message: 'Must contain exactly 5 space-separated parts (* * * * *)' }

  const [min, hour, dom, mon, dow] = parts
  const isPartValid = (str, minVal, maxVal) => {
    if (str === '*') return true
    if (str.startsWith('*/')) {
      const step = Number(str.slice(2))
      return !isNaN(step) && step > 0 && step <= maxVal
    }
    if (str.includes('-')) {
      const [a, b] = str.split('-').map(Number)
      return !isNaN(a) && !isNaN(b) && a >= minVal && b <= maxVal && a <= b
    }
    if (str.includes(',')) {
      return str.split(',').every(numStr => {
        const n = Number(numStr)
        return !isNaN(n) && n >= minVal && n <= maxVal
      })
    }
    const n = Number(str)
    return !isNaN(n) && n >= minVal && n <= maxVal
  }

  if (!isPartValid(min, 0, 59)) return { valid: false, message: 'Invalid Minute field (must be 0-59, *, */n, or ranges)' }
  if (!isPartValid(hour, 0, 23)) return { valid: false, message: 'Invalid Hour field (must be 0-23, *, */n, or ranges)' }
  if (!isPartValid(dom, 1, 31)) return { valid: false, message: 'Invalid Day of Month field (must be 1-31, *, */n, or ranges)' }
  if (!isPartValid(mon, 1, 12)) return { valid: false, message: 'Invalid Month field (must be 1-12, *, */n, or ranges)' }
  if (!isPartValid(dow, 0, 6)) return { valid: false, message: 'Invalid Day of Week field (must be 0-6, *, */n, or ranges)' }

  return { valid: true, message: 'Valid 5-part cron syntax' }
}

export default function CronBuilder({ initialExpression = '0 9 * * 1', initialMode = 'builder' } = {}) {
  const [cron, setCron] = useState(initialExpression || '0 9 * * 1')
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState(initialMode || 'builder') // 'builder' | 'validator'

  // Individual interactive field states
  const parts = useMemo(() => {
    const p = cron.trim().split(/\s+/)
    return {
      min: p[0] || '*',
      hour: p[1] || '*',
      dom: p[2] || '*',
      mon: p[3] || '*',
      dow: p[4] || '*',
    }
  }, [cron])

  const validation = useMemo(() => validateCron(cron), [cron])
  const translation = useMemo(() => translateCron(cron), [cron])
  const nextRuns = useMemo(() => (validation.valid ? getNextOccurrences(cron, 5) : []), [cron, validation.valid])

  function updatePart(fieldIndex, value) {
    const p = cron.trim().split(/\s+/)
    while (p.length < 5) p.push('*')
    p[fieldIndex] = value || '*'
    setCron(p.join(' '))
  }

  async function copyCron() {
    try {
      await navigator.clipboard.writeText(cron)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 20px 60px' }}>
      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        <button onClick={() => setMode('builder')} style={segBtn(mode === 'builder')}>🛠️ Visual Builder & Presets</button>
        <button onClick={() => setMode('validator')} style={segBtn(mode === 'validator')}>✅ Live Syntax Validator</button>
      </div>

      {/* Main cron input bar */}
      <label style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-faint)', display: 'block', marginBottom: 6 }}>
        CRON EXPRESSION (5-PART SYNTAX)
      </label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={cron}
          onChange={(e) => setCron(e.target.value)}
          placeholder="* * * * *"
          spellCheck={false}
          style={{
            ...inputStyle,
            fontFamily: 'var(--font-mono)',
            fontSize: 18,
            fontWeight: 700,
            flex: 1,
            borderColor: validation.valid ? 'var(--panel-border)' : '#e04b3f',
          }}
        />
        <button onClick={copyCron} style={secondaryBtn}>
          {copied ? '✓ Copied!' : '📋 Copy Cron'}
        </button>
      </div>

      {/* Validation alert banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          borderRadius: 6,
          fontSize: 12.5,
          fontWeight: 600,
          marginBottom: 20,
          background: validation.valid ? 'rgba(63,174,111,0.1)' : 'rgba(224,75,63,0.1)',
          color: validation.valid ? '#3fae6f' : '#e04b3f',
        }}
      >
        <span>{validation.valid ? '✓' : '⚠️'}</span>
        <span>{validation.message}</span>
      </div>

      {/* Interactive field controls when mode === 'builder' */}
      {mode === 'builder' && (
        <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, padding: 18, marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 14 }}>
            INTERACTIVE FIELD BUILDER
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-dim)', display: 'block', marginBottom: 4 }}>Minute (0-59)</label>
              <input
                value={parts.min}
                onChange={(e) => updatePart(0, e.target.value)}
                style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontSize: 13 }}
                placeholder="*"
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-dim)', display: 'block', marginBottom: 4 }}>Hour (0-23)</label>
              <input
                value={parts.hour}
                onChange={(e) => updatePart(1, e.target.value)}
                style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontSize: 13 }}
                placeholder="*"
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-dim)', display: 'block', marginBottom: 4 }}>Day of Month (1-31)</label>
              <input
                value={parts.dom}
                onChange={(e) => updatePart(2, e.target.value)}
                style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontSize: 13 }}
                placeholder="*"
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-dim)', display: 'block', marginBottom: 4 }}>Month (1-12)</label>
              <input
                value={parts.mon}
                onChange={(e) => updatePart(3, e.target.value)}
                style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontSize: 13 }}
                placeholder="*"
              />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-dim)', display: 'block', marginBottom: 4 }}>Day of Week (0-6)</label>
              <input
                value={parts.dow}
                onChange={(e) => updatePart(4, e.target.value)}
                style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontSize: 13 }}
                placeholder="*"
              />
            </div>
          </div>
        </div>
      )}

      {/* Preset schedules */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-faint)', display: 'block', marginBottom: 8 }}>
          POPULAR CRON PRESETS
        </label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {PRESET_CRONS.map((p) => (
            <button key={p.label} onClick={() => setCron(p.expr)} style={segBtn(cron === p.expr)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 24 }}>
        <ResultCard label="Human Readable Summary" value={translation} highlight />
      </div>

      {/* Upcoming executions preview */}
      <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 10, padding: 18, marginBottom: 32 }}>
        <h4 style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
          Upcoming 5 Scheduled Executions
        </h4>
        {nextRuns.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {nextRuns.map((date, idx) => (
              <div key={idx} style={{ fontSize: 13, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700, marginRight: 10 }}>#{idx + 1}</span>
                {date.toLocaleString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: 12, color: 'var(--ink-dim)' }}>
            {validation.valid ? 'No upcoming runs detected within range for this expression.' : 'Fix expression errors to view scheduled runs.'}
          </div>
        )}
      </div>

      {/* Cron Syntax Cheatsheet */}
      <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>Cron Syntax Quick Reference</h2>
      <div style={{ border: '1px solid var(--panel-border)', borderRadius: 8, overflow: 'hidden', marginBottom: 36, background: 'var(--panel-bg)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--panel-border)', background: 'var(--btn-idle-bg)' }}>
              <th style={{ padding: '10px 14px', color: 'var(--ink-faint)', fontWeight: 800 }}>Field</th>
              <th style={{ padding: '10px 14px', color: 'var(--ink-faint)', fontWeight: 800 }}>Allowed Values</th>
              <th style={{ padding: '10px 14px', color: 'var(--ink-faint)', fontWeight: 800 }}>Allowed Special Characters</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--panel-border)' }}>
              <td style={{ padding: '10px 14px', fontWeight: 700 }}>1. Minute</td>
              <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>0 - 59</td>
              <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>* , - /</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--panel-border)' }}>
              <td style={{ padding: '10px 14px', fontWeight: 700 }}>2. Hour</td>
              <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>0 - 23</td>
              <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>* , - /</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--panel-border)' }}>
              <td style={{ padding: '10px 14px', fontWeight: 700 }}>3. Day of Month</td>
              <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>1 - 31</td>
              <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>* , - /</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--panel-border)' }}>
              <td style={{ padding: '10px 14px', fontWeight: 700 }}>4. Month</td>
              <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>1 - 12</td>
              <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>* , - /</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', fontWeight: 700 }}>5. Day of Week</td>
              <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>0 - 6 (0 = Sun)</td>
              <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>* , - /</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AffiliateCard heading="RECOMMENDED DEV TOOLS FOR CRON & AUTOMATION" items={AFFILIATE_ITEMS} />
    </div>
  )
}
