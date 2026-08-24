import { useMemo, useState } from 'react'
import { ACTIVITY_LEVELS, GOALS, calcResult, ftInToCm, lbToKg } from './calorieMath.js'
import AffiliateCard from '../shared/AffiliateCard.jsx'
import FoodLog from './FoodLog.jsx'
import { makeFormatters } from '../shared/useLocale.js'

const AFFILIATE_ITEMS = [
  { name: 'Meal prep containers', blurb: 'Portion-controlled sets that make hitting your target calories easier.', href: '#', cta: 'Shop →' },
  { name: 'Kitchen food scale', blurb: 'Accurate gram measurements — the single biggest upgrade for calorie tracking.', href: '#', cta: 'Shop →' },
  { name: 'Whey / plant protein powder', blurb: 'A fast way to hit your daily protein target from the macros below.', href: '#', cta: 'Shop →' },
]

export default function CalorieCalculator({ initialGoal, lang = 'en' }) {
  const fmt = useMemo(() => makeFormatters(lang), [lang])
  const [units, setUnits] = useState(fmt.units) // 'metric' | 'imperial', defaulted from the locale
  const [sex, setSex] = useState('male')
  const [age, setAge] = useState(28)

  const [weightKg, setWeightKg] = useState(70)
  const [heightCm, setHeightCm] = useState(175)

  const [weightLb, setWeightLb] = useState(154)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(9)

  const [activity, setActivity] = useState('moderate')
  const [goal, setGoal] = useState(() => (initialGoal && GOALS.some(g => g.id === initialGoal) ? initialGoal : 'maintain'))

  const resolvedWeightKg = units === 'metric' ? weightKg : lbToKg(weightLb)
  const resolvedHeightCm = units === 'metric' ? heightCm : ftInToCm(heightFt, heightIn)

  const activityFactor = ACTIVITY_LEVELS.find((a) => a.id === activity)?.factor ?? 1.2
  const goalDelta = GOALS.find((g) => g.id === goal)?.delta ?? 0

  const result = useMemo(
    () =>
      calcResult({
        sex,
        weightKg: resolvedWeightKg,
        heightCm: resolvedHeightCm,
        age: Number(age) || 0,
        activityFactor,
        goalDelta,
      }),
    [sex, resolvedWeightKg, resolvedHeightCm, age, activityFactor, goalDelta]
  )

  const macroPercent = useMemo(() => {
    const { proteinG, fatG, carbsG } = result.macros
    const totalCals = proteinG * 4 + fatG * 9 + carbsG * 4
    if (totalCals === 0) return { protein: 0, fat: 0, carbs: 0 }
    return {
      protein: Math.round(((proteinG * 4) / totalCals) * 100),
      fat: Math.round(((fatG * 9) / totalCals) * 100),
      carbs: Math.round(((carbsG * 4) / totalCals) * 100),
    }
  }, [result])

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px 60px' }}>
      {/* units toggle */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {['metric', 'imperial'].map((u) => (
          <button
            key={u}
            onClick={() => setUnits(u)}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: 'none',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              background: units === u ? 'var(--btn-active-bg)' : 'var(--btn-idle-bg)',
              color: units === u ? 'var(--btn-active-ink)' : 'var(--btn-idle-ink)',
            }}
          >
            {u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/ft-in)'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 20 }}>
        <Field label="Sex">
          <select value={sex} onChange={(e) => setSex(e.target.value)} style={selectStyle}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>

        <Field label="Age">
          <input type="number" min={13} max={100} value={age} onChange={(e) => setAge(e.target.value)} style={inputStyle} />
        </Field>

        {units === 'metric' ? (
          <>
            <Field label="Weight (kg)">
              <input type="number" min={30} max={300} value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} style={inputStyle} />
            </Field>
            <Field label="Height (cm)">
              <input type="number" min={120} max={230} value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} style={inputStyle} />
            </Field>
          </>
        ) : (
          <>
            <Field label="Weight (lb)">
              <input type="number" min={66} max={660} value={weightLb} onChange={(e) => setWeightLb(Number(e.target.value))} style={inputStyle} />
            </Field>
            <Field label="Height (ft / in)">
              <div style={{ display: 'flex', gap: 6 }}>
                <input type="number" min={3} max={7} value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value))} style={inputStyle} />
                <input type="number" min={0} max={11} value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value))} style={inputStyle} />
              </div>
            </Field>
          </>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 28 }}>
        <Field label="Activity level">
          <select value={activity} onChange={(e) => setActivity(e.target.value)} style={selectStyle}>
            {ACTIVITY_LEVELS.map((a) => (
              <option key={a.id} value={a.id}>{a.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Goal">
          <select value={goal} onChange={(e) => setGoal(e.target.value)} style={selectStyle}>
            {GOALS.map((g) => (
              <option key={g.id} value={g.id}>{g.label}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* results */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        <ResultCard label="BMR" value={`${fmt.integer(result.bmr)} kcal`} sub="Calories at total rest" />
        <ResultCard label="Maintenance (TDEE)" value={`${fmt.integer(result.tdee)} kcal`} sub="Calories to stay the same weight" />
        <ResultCard
          label="Your target"
          value={`${fmt.integer(result.targetCalories)} kcal/day`}
          sub="Adjusted for your goal"
          highlight
        />
      </div>

      <div style={{ marginBottom: 12, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'var(--ink-faint)' }}>
        SUGGESTED DAILY MACROS
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
        <MacroCard label="Protein" grams={result.macros.proteinG} percent={macroPercent.protein} color="#3fae6f" />
        <MacroCard label="Fat" grams={result.macros.fatG} percent={macroPercent.fat} color="#e0c93f" />
        <MacroCard label="Carbs" grams={result.macros.carbsG} percent={macroPercent.carbs} color="#5c8ce0" />
      </div>

      <p style={{ fontSize: 10.5, color: 'var(--ink-faint)', marginTop: 16 }}>
        Estimates only — individual metabolism varies. Consult a doctor or
        registered dietitian before making major dietary changes.
      </p>

      <FoodLog targetCalories={result.targetCalories} targetMacros={result.macros} lang={lang} />

      <AffiliateCard heading="TOOLS THAT MAKE HITTING YOUR TARGET EASIER" items={AFFILIATE_ITEMS} />
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)' }}>
      {label}
      {children}
    </label>
  )
}

function ResultCard({ label, value, sub, highlight }) {
  return (
    <div
      style={{
        padding: '16px 16px',
        borderRadius: 10,
        border: `1px solid ${highlight ? 'var(--accent)' : 'var(--panel-border)'}`,
        background: 'var(--panel-bg)',
      }}
    >
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: highlight ? 'var(--accent)' : 'var(--ink)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-dim)', marginTop: 4 }}>{sub}</div>
    </div>
  )
}

function MacroCard({ label, grams, percent, color }) {
  return (
    <div style={{ padding: '14px 16px', borderRadius: 10, border: '1px solid var(--panel-border)', background: 'var(--panel-bg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'var(--btn-idle-bg)', overflow: 'hidden', marginBottom: 8 }}>
        <div style={{ height: '100%', width: `${percent}%`, background: color }} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{grams}g</div>
    </div>
  )
}

const inputStyle = {
  padding: '10px 12px',
  borderRadius: 6,
  border: '1px solid var(--panel-border)',
  background: 'var(--panel-bg)',
  color: 'var(--ink)',
  fontSize: 13,
  width: '100%',
}

const selectStyle = { ...inputStyle }
