import { useMemo, useState } from 'react'
import {
  calcDueDateFromLMP,
  calcDueDateFromConception,
  calcGestationalAge,
  calcTrimester,
  calcOvulation,
  formatDate,
} from './pregnancyMath.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { Field, ResultCard, inputStyle, selectStyle, segBtn } from '../shared/FormKit.jsx'

const AFFILIATE_ITEMS = [
  { name: 'Prenatal vitamins', blurb: 'Doctor-recommended folic acid, iron, and DHA support for early pregnancy.', href: '#', cta: 'Shop →' },
  { name: 'Ovulation test kit', blurb: 'Detect your LH surge to confirm ovulation timing more precisely.', href: '#', cta: 'Shop →' },
  { name: 'Pregnancy tracking app', blurb: 'Week-by-week guidance and symptom tracking alongside this calculator.', href: '#', cta: 'Try free →' },
]

function toDateInput(date) {
  return date.toISOString().slice(0, 10)
}

export default function PregnancyCalculator() {
  usePageMeta({
    title: 'Pregnancy Due Date & Ovulation Calculator — Free Tool',
    description: 'Estimate your due date from your last period or conception date, see your current week of pregnancy, or calculate your next ovulation and fertile window.',
  })

  const [mode, setMode] = useState('due-date') // 'due-date' | 'ovulation'
  const [dateBasis, setDateBasis] = useState('lmp') // 'lmp' | 'conception'
  const [inputDate, setInputDate] = useState(() => toDateInput(new Date(Date.now() - 42 * 24 * 60 * 60 * 1000)))
  const [cycleLength, setCycleLength] = useState(28)

  const result = useMemo(() => {
    const date = new Date(inputDate + 'T00:00:00')
    if (isNaN(date.getTime())) return null

    if (mode === 'due-date') {
      const dueDate = dateBasis === 'lmp' ? calcDueDateFromLMP(date, Number(cycleLength) || 28) : calcDueDateFromConception(date)
      // Gestational age is conventionally counted from LMP, which is
      // ~14 days before conception — so shift the reference date when the
      // person entered a conception date instead.
      const pseudoLmp = dateBasis === 'lmp' ? date : new Date(date.getTime() - 14 * 24 * 60 * 60 * 1000)
      const gestational = calcGestationalAge(pseudoLmp)
      return { dueDate, gestational, trimester: calcTrimester(gestational.weeks) }
    }

    return calcOvulation(date, Number(cycleLength) || 28)
  }, [mode, dateBasis, inputDate, cycleLength])

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px 60px' }}>
      <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
        Pregnancy Due Date & Ovulation Calculator
      </h1>
      <p style={{ color: 'var(--ink-dim)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        Estimates only — every cycle and pregnancy is different. Always
        confirm dates with your doctor or midwife.
      </p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        <button onClick={() => setMode('due-date')} style={segBtn(mode === 'due-date')}>Due date</button>
        <button onClick={() => setMode('ovulation')} style={segBtn(mode === 'ovulation')}>Ovulation</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
        {mode === 'due-date' && (
          <Field label="Calculate from">
            <select value={dateBasis} onChange={(e) => setDateBasis(e.target.value)} style={selectStyle}>
              <option value="lmp">First day of last period</option>
              <option value="conception">Conception date</option>
            </select>
          </Field>
        )}
        <Field label={mode === 'ovulation' || dateBasis === 'lmp' ? 'First day of last period' : 'Conception date'}>
          <input type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} style={inputStyle} />
        </Field>
        {(mode === 'ovulation' || dateBasis === 'lmp') && (
          <Field label="Average cycle length (days)">
            <input type="number" min={20} max={45} value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} style={inputStyle} />
          </Field>
        )}
      </div>

      {result && mode === 'due-date' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 8 }}>
          <ResultCard label="Estimated due date" value={formatDate(result.dueDate)} highlight />
          <ResultCard
            label="Current progress"
            value={`${result.gestational.weeks}w ${result.gestational.days}d`}
            sub={`Trimester ${result.trimester}`}
          />
        </div>
      )}

      {result && mode === 'ovulation' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 8 }}>
          <ResultCard label="Estimated ovulation" value={formatDate(result.ovulationDate)} highlight />
          <ResultCard
            label="Fertile window"
            value={`${formatDate(result.fertileWindowStart)} – ${formatDate(result.fertileWindowEnd)}`}
          />
          <ResultCard label="Next expected period" value={formatDate(result.nextPeriod)} />
        </div>
      )}

      <p style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 16 }}>
        These calculations use standard obstetric estimation methods
        (Naegele's rule for due dates; a 14-day luteal phase for ovulation).
        They are not a substitute for medical advice.
      </p>

      <AffiliateCard heading="HELPFUL FOR THIS STAGE" items={AFFILIATE_ITEMS} />
    </div>
  )
}
