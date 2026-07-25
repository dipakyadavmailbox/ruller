import { useMemo, useState } from 'react'
import {
  calcDueDateFromLMP,
  calcDueDateFromConception,
  calcDueDateFromIVF,
  calcDueDateFromUltrasound,
  calcGestationalAge,
  calcTrimester,
  calcDaysRemaining,
  getPregnancyMilestones,
  calcOvulation,
  getBabyInfo,
  getWeightGainRecommendation,
  formatDate,
} from './pregnancyMath.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import { Field, ResultCard, inputStyle, selectStyle, segBtn } from '../shared/FormKit.jsx'

const AFFILIATE_ITEMS = [
  { name: 'Prenatal vitamins', blurb: 'Doctor-recommended folic acid, iron, and DHA support for early pregnancy.', href: '#', cta: 'Shop →' },
  { name: 'Ovulation test kit', blurb: 'Detect your LH surge to confirm ovulation timing more precisely.', href: '#', cta: 'Shop →' },
  { name: 'Pregnancy tracking app', blurb: 'Week-by-week guidance and symptom tracking alongside this calculator.', href: '#', cta: 'Try free →' },
]

const TRIMESTER_COLORS = { 1: '#5c8ce0', 2: '#3fae6f', 3: '#e0a05c' }
const TRIMESTER_LABELS = { 1: 'First Trimester', 2: 'Second Trimester', 3: 'Third Trimester' }

function toDateInput(date) {
  return date.toISOString().slice(0, 10)
}

export default function PregnancyCalculator() {
  const [mode, setMode] = useState('due-date') // 'due-date' | 'ovulation'
  const [dateBasis, setDateBasis] = useState('lmp')

  const [inputDate, setInputDate] = useState(() => toDateInput(new Date(Date.now() - 20 * 7 * 24 * 60 * 60 * 1000)))
  const [cycleLength, setCycleLength] = useState(28)
  const [embryoAge, setEmbryoAge] = useState(5)
  const [scanWeeks, setScanWeeks] = useState(8)
  const [scanDays, setScanDays] = useState(0)

  // Weight gain section
  const [preWeight, setPreWeight] = useState('')
  const [preHeight, setPreHeight] = useState('')
  const [weightUnits, setWeightUnits] = useState('metric') // metric | imperial

  const result = useMemo(() => {
    const date = new Date(inputDate + 'T00:00:00')
    if (isNaN(date.getTime())) return null

    if (mode === 'due-date') {
      let dueDate = new Date()
      let pseudoLmp = new Date()

      if (dateBasis === 'lmp') {
        dueDate = calcDueDateFromLMP(date, Number(cycleLength) || 28)
        pseudoLmp = date
      } else if (dateBasis === 'conception') {
        dueDate = calcDueDateFromConception(date)
        pseudoLmp = new Date(date.getTime() - 14 * 24 * 60 * 60 * 1000)
      } else if (dateBasis === 'ivf') {
        dueDate = calcDueDateFromIVF(date, Number(embryoAge) || 5)
        pseudoLmp = new Date(date.getTime() - (Number(embryoAge) + 14) * 24 * 60 * 60 * 1000)
      } else if (dateBasis === 'ultrasound') {
        dueDate = calcDueDateFromUltrasound(date, Number(scanWeeks) || 0, Number(scanDays) || 0)
        const totalScanDays = (Number(scanWeeks) || 0) * 7 + (Number(scanDays) || 0)
        pseudoLmp = new Date(date.getTime() - totalScanDays * 24 * 60 * 60 * 1000)
      }

      const gestational = calcGestationalAge(pseudoLmp)
      const trimester = calcTrimester(gestational.weeks)
      const milestones = getPregnancyMilestones(pseudoLmp)
      const daysRemaining = calcDaysRemaining(dueDate)
      const babyInfo = getBabyInfo(gestational.weeks)
      const percentComplete = Math.min(100, Math.round((gestational.totalDays / 280) * 100))

      return { dueDate, gestational, trimester, milestones, pseudoLmp, daysRemaining, babyInfo, percentComplete }
    }

    return calcOvulation(date, Number(cycleLength) || 28)
  }, [mode, dateBasis, inputDate, cycleLength, embryoAge, scanWeeks, scanDays])

  const weightGainRec = useMemo(() => {
    const w = parseFloat(preWeight)
    const h = parseFloat(preHeight)
    if (!w || !h) return null
    let weightKg = w, heightM = h / 100
    if (weightUnits === 'imperial') {
      weightKg = w * 0.453592
      heightM = (h * 2.54) / 100
    }
    const bmi = weightKg / (heightM * heightM)
    const rec = getWeightGainRecommendation(bmi)
    return { bmi: bmi.toFixed(1), ...rec }
  }, [preWeight, preHeight, weightUnits])

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px 60px' }}>
      {/* Mode tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        <button onClick={() => setMode('due-date')} style={segBtn(mode === 'due-date')}>🤰 Pregnancy Due Date</button>
        <button onClick={() => setMode('ovulation')} style={segBtn(mode === 'ovulation')}>🌸 Ovulation & Fertility</button>
      </div>

      {/* Input fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
        {mode === 'due-date' && (
          <Field label="Calculate Based On">
            <select value={dateBasis} onChange={(e) => setDateBasis(e.target.value)} style={selectStyle}>
              <option value="lmp">First Day of Last Period (LMP)</option>
              <option value="conception">Conception Date</option>
              <option value="ivf">IVF Embryo Transfer Date</option>
              <option value="ultrasound">Ultrasound Scan Date</option>
            </select>
          </Field>
        )}

        <Field label={
          dateBasis === 'conception' ? 'Conception Date' :
          dateBasis === 'ivf' ? 'Transfer Date' :
          dateBasis === 'ultrasound' ? 'Ultrasound Scan Date' :
          'First Day of Last Period'
        }>
          <input type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} style={inputStyle} />
        </Field>

        {(mode === 'ovulation' || (mode === 'due-date' && dateBasis === 'lmp')) && (
          <Field label="Average Cycle Length (Days)">
            <input type="number" min={20} max={45} value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} style={inputStyle} />
          </Field>
        )}

        {mode === 'due-date' && dateBasis === 'ivf' && (
          <Field label="Embryo Age">
            <select value={embryoAge} onChange={(e) => setEmbryoAge(Number(e.target.value))} style={selectStyle}>
              <option value={3}>Day 3 Embryo</option>
              <option value={5}>Day 5 Blastocyst</option>
            </select>
          </Field>
        )}

        {mode === 'due-date' && dateBasis === 'ultrasound' && (
          <>
            <Field label="Scan Weeks">
              <input type="number" min={4} max={40} value={scanWeeks} onChange={(e) => setScanWeeks(e.target.value)} style={inputStyle} />
            </Field>
            <Field label="Scan Days">
              <input type="number" min={0} max={6} value={scanDays} onChange={(e) => setScanDays(e.target.value)} style={inputStyle} />
            </Field>
          </>
        )}
      </div>

      {/* Due Date Results */}
      {result && mode === 'due-date' && (
        <>
          {/* Key stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 20 }}>
            <ResultCard label="Estimated Due Date" value={formatDate(result.dueDate)} highlight />
            <ResultCard
              label="Current Progress"
              value={`${result.gestational.weeks}w ${result.gestational.days}d`}
              sub={`${TRIMESTER_LABELS[result.trimester]} · ${result.percentComplete}% complete`}
            />
            <ResultCard
              label="Days Until Due Date"
              value={result.daysRemaining > 0 ? `${result.daysRemaining} days` : 'Past due date'}
              sub={result.daysRemaining > 0 ? `~${Math.ceil(result.daysRemaining / 7)} weeks remaining` : 'Baby may arrive soon!'}
            />
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-faint)', fontWeight: 700, marginBottom: 6 }}>
              <span>Pregnancy Progress</span>
              <span style={{ color: TRIMESTER_COLORS[result.trimester] }}>{result.percentComplete}%</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: 'var(--btn-idle-bg)', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${result.percentComplete}%`,
                background: TRIMESTER_COLORS[result.trimester],
                borderRadius: 5,
                transition: 'width 400ms ease',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--ink-faint)', marginTop: 4 }}>
              <span>Week 1</span>
              <span>1st Trimester</span>
              <span>2nd Trimester</span>
              <span>3rd Trimester</span>
              <span>Week 40</span>
            </div>
          </div>

          {/* Baby development this week */}
          {result.babyInfo && result.gestational.weeks >= 4 && (
            <div style={{
              background: 'var(--panel-bg)', border: `1px solid ${TRIMESTER_COLORS[result.trimester]}55`,
              borderRadius: 14, padding: 20, marginBottom: 24,
              boxShadow: `0 4px 20px ${TRIMESTER_COLORS[result.trimester]}18`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: TRIMESTER_COLORS[result.trimester], marginBottom: 10 }}>
                WEEK {result.gestational.weeks} — BABY DEVELOPMENT
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ink-faint)', fontWeight: 700, marginBottom: 4 }}>SIZE COMPARISON</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)' }}>🍓 {result.babyInfo.size}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ink-faint)', fontWeight: 700, marginBottom: 4 }}>APPROX. WEIGHT</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
                    {result.babyInfo.weightG >= 1000
                      ? `${(result.babyInfo.weightG / 1000).toFixed(2)} kg`
                      : `${result.babyInfo.weightG} g`}
                  </div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 11, color: 'var(--ink-faint)', fontWeight: 700, marginBottom: 4 }}>HIGHLIGHTS</div>
                  <div style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.6 }}>{result.babyInfo.highlight}</div>
                </div>
              </div>
            </div>
          )}

          {/* Milestones timeline */}
          <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 14, padding: 20, marginBottom: 28 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 16 }}>Key Pregnancy Milestones & Appointments</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {result.milestones.map((m) => {
                const isPassed = result.gestational.weeks >= m.week
                const isNext = result.milestones.find(ms => ms.week > result.gestational.weeks)?.week === m.week
                return (
                  <div
                    key={m.name}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 14px', borderRadius: 8,
                      background: isNext ? `${TRIMESTER_COLORS[result.trimester]}12` : 'transparent',
                      border: isNext ? `1px solid ${TRIMESTER_COLORS[result.trimester]}44` : '1px solid transparent',
                      opacity: isPassed ? 0.6 : 1,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isPassed ? 'rgba(63,174,111,0.15)' : `${TRIMESTER_COLORS[result.trimester]}20`,
                        border: `1.5px solid ${isPassed ? '#3fae6f' : TRIMESTER_COLORS[result.trimester]}`,
                        fontSize: 12, fontWeight: 800,
                        color: isPassed ? '#3fae6f' : TRIMESTER_COLORS[result.trimester],
                      }}>
                        {isPassed ? '✓' : m.week}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: isPassed ? 'var(--ink-dim)' : 'var(--ink)' }}>
                          Week {m.week}: {m.name}
                          {isNext && <span style={{ fontSize: 10, fontWeight: 800, marginLeft: 8, color: TRIMESTER_COLORS[result.trimester], background: `${TRIMESTER_COLORS[result.trimester]}20`, padding: '2px 6px', borderRadius: 10 }}>NEXT</span>}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>{formatDate(m.date)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}

      {/* Ovulation results */}
      {result && mode === 'ovulation' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
          <ResultCard label="Estimated Ovulation Date" value={formatDate(result.ovulationDate)} highlight />
          <ResultCard
            label="Most Fertile Window"
            value={`${formatDate(result.fertileWindowStart)}`}
            sub={`to ${formatDate(result.fertileWindowEnd)} — best time for conception`}
          />
          <ResultCard label="Next Expected Period" value={formatDate(result.nextPeriod)} />
        </div>
      )}

      {/* Weight Gain Recommendation */}
      {mode === 'due-date' && (
        <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 14, padding: 20, marginBottom: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>
            Recommended Pregnancy Weight Gain
          </h3>
          <p style={{ fontSize: 12, color: 'var(--ink-dim)', marginBottom: 16, lineHeight: 1.5 }}>
            Based on IOM (Institute of Medicine) guidelines. Enter your pre-pregnancy measurements.
          </p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <button onClick={() => setWeightUnits('metric')} style={segBtn(weightUnits === 'metric')}>Metric (kg/cm)</button>
            <button onClick={() => setWeightUnits('imperial')} style={segBtn(weightUnits === 'imperial')}>Imperial (lb/in)</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 16 }}>
            <Field label={`Weight (${weightUnits === 'metric' ? 'kg' : 'lb'})`}>
              <input
                type="number" min={30} max={300}
                value={preWeight}
                onChange={(e) => setPreWeight(e.target.value)}
                style={inputStyle}
                placeholder={weightUnits === 'metric' ? 'e.g. 60' : 'e.g. 132'}
              />
            </Field>
            <Field label={`Height (${weightUnits === 'metric' ? 'cm' : 'inches'})`}>
              <input
                type="number" min={100} max={250}
                value={preHeight}
                onChange={(e) => setPreHeight(e.target.value)}
                style={inputStyle}
                placeholder={weightUnits === 'metric' ? 'e.g. 165' : 'e.g. 65'}
              />
            </Field>
          </div>
          {weightGainRec && (
            <div style={{
              padding: '14px 16px', borderRadius: 10,
              background: 'rgba(92,140,224,0.06)', border: '1px solid rgba(92,140,224,0.25)',
            }}>
              <div style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 700, marginBottom: 8 }}>
                BMI: {weightGainRec.bmi} — {weightGainRec.category}
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>
                Recommended gain: {weightGainRec.minKg}–{weightGainRec.maxKg} kg ({weightGainRec.minLb}–{weightGainRec.maxLb} lb)
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 6, lineHeight: 1.5 }}>
                Based on IOM 2009 guidelines. Consult your OB/GYN for personalized advice, especially for twins or specific health conditions.
              </div>
            </div>
          )}
        </div>
      )}

      <p style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 20, lineHeight: 1.6 }}>
        Medical Disclaimer: Estimates are calculated using standard clinical formulas (Naegele's rule for LMP, 266 days post-conception, IVF transfer offsets). Always confirm due date with your OB/GYN or midwife.
      </p>

      <AffiliateCard heading="HELPFUL FOR THIS STAGE" items={AFFILIATE_ITEMS} />
    </div>
  )
}
