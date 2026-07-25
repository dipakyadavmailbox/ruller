import { useEffect, useMemo, useRef, useState } from 'react'
import { searchFoods, FOODS } from './foodDatabase.js'
import { Field, ResultCard, inputStyle, selectStyle, secondaryBtn } from '../shared/FormKit.jsx'

const MEAL_OPTIONS = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

// Static units with fixed gram factors
const STATIC_UNIT_OPTIONS = [
  { id: 'g', label: 'Grams (g)', factor: 1 },
  { id: 'oz', label: 'Ounces (oz)', factor: 28.35 },
  { id: 'cup', label: 'Cups (approx 150g)', factor: 150 },
  { id: 'tbsp', label: 'Tablespoons (tbsp)', factor: 15 },
  { id: 'tsp', label: 'Teaspoons (tsp)', factor: 5 },
]

// Dynamic units that rely on food-specific gram weight
function getUnitOptions(selectedFood) {
  const sliceG = selectedFood?.sliceG ?? 30 // default slice = 30g
  const pieceG = selectedFood?.pieceG ?? 50 // default piece = 50g
  return [
    ...STATIC_UNIT_OPTIONS,
    { id: 'slice', label: `Slices (≈${sliceG}g/slice)`, factor: sliceG },
    { id: 'piece', label: `Pieces (≈${pieceG}g/piece)`, factor: pieceG },
  ]
}


function todayKey() {
  const d = new Date()
  return `toolkit:foodlog:${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function readStoredLog() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(todayKey())
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function scaleNutrient(perHundredG, grams) {
  return (perHundredG * grams) / 100
}

export default function FoodLog({ targetCalories, targetMacros }) {
  const [log, setLog] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setLog(readStoredLog())
    setIsLoaded(true)
  }, [])

  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [selectedFood, setSelectedFood] = useState(null)

  const [quantity, setQuantity] = useState(100)
  const [unit, setUnit] = useState('g')
  const [meal, setMeal] = useState('Breakfast')

  const searchBoxRef = useRef(null)

  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return
    try {
      localStorage.setItem(todayKey(), JSON.stringify(log))
    } catch {
      // storage unavailable
    }
  }, [log, isLoaded])

  useEffect(() => {
    function onClickOutside(e) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const searchResults = useMemo(() => searchFoods(query), [query])

  // Calculate actual grams from quantity + unit (food-aware for slice/piece)
  const unitOptions = getUnitOptions(selectedFood)
  const selectedUnitObj = unitOptions.find((u) => u.id === unit) || unitOptions[0]
  const calculatedGrams = useMemo(() => {
    const qty = Number(quantity) || 0
    return Math.max(1, Math.round(qty * selectedUnitObj.factor))
  }, [quantity, selectedUnitObj])

  const previewNutrients = selectedFood
    ? {
        kcal: scaleNutrient(selectedFood.kcal, calculatedGrams),
        protein: scaleNutrient(selectedFood.protein, calculatedGrams),
        carbs: scaleNutrient(selectedFood.carbs, calculatedGrams),
        fat: scaleNutrient(selectedFood.fat, calculatedGrams),
      }
    : null

  function pickFood(food) {
    setSelectedFood(food)
    setQuery(food.name)
    setShowResults(false)
    if (unit === 'g') setQuantity(100)
    else setQuantity(1)
  }

  function addEntry() {
    if (!selectedFood || !quantity) return
    setLog((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: selectedFood.name,
        quantity: Number(quantity),
        unit: selectedUnitObj.label.split(' ')[0],
        grams: calculatedGrams,
        meal,
        kcal: previewNutrients.kcal,
        protein: previewNutrients.protein,
        carbs: previewNutrients.carbs,
        fat: previewNutrients.fat,
      },
    ])
    setSelectedFood(null)
    setQuery('')
    setQuantity(100)
    setUnit('g')
  }

  function removeEntry(id) {
    setLog((prev) => prev.filter((e) => e.id !== id))
  }

  function clearLog() {
    setLog([])
  }

  const totals = useMemo(
    () =>
      log.reduce(
        (acc, e) => ({
          kcal: acc.kcal + e.kcal,
          protein: acc.protein + e.protein,
          carbs: acc.carbs + e.carbs,
          fat: acc.fat + e.fat,
        }),
        { kcal: 0, protein: 0, carbs: 0, fat: 0 }
      ),
    [log]
  )

  const remaining = targetCalories - totals.kcal
  const overBy = Math.max(0, -remaining)
  const leftOver = Math.max(0, remaining)

  const suggestions = useMemo(() => {
    const list = []
    if (log.length === 0) return list

    if (remaining < -50) {
      list.push(`⚠️ You're ${Math.round(overBy).toLocaleString()} kcal over target today — balance with lighter meals.`)
    } else if (remaining > 300) {
      list.push(`👍 You have ${Math.round(leftOver).toLocaleString()} kcal left today — room for a healthy protein meal.`)
    } else {
      list.push(`🎯 Great job! You are right on track with your target calories today.`)
    }

    if (targetMacros) {
      if (totals.protein < targetMacros.proteinG * 0.7) {
        list.push(`💪 Protein check: ${Math.round(totals.protein)}g of ${targetMacros.proteinG}g target — consider adding chicken, eggs, or Greek yogurt.`)
      }
    }

    return list
  }, [remaining, overBy, leftOver, totals, targetMacros, log.length])

  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ borderTop: '1px dashed var(--divider)', margin: '8px 0 28px' }} />

      <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>
        Today's Food Log
      </h2>
      <p style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 20 }}>
        Search foods, select unit (grams, slices, pieces, cups, oz...), and track your daily macros.
      </p>

      <div ref={searchBoxRef} style={{ position: 'relative', marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          <Field label="Search Food">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedFood(null)
                setShowResults(true)
              }}
              onFocus={() => setShowResults(true)}
              placeholder="e.g. Banana, Chicken, Rice, Pizza..."
              style={inputStyle}
              autoComplete="off"
            />
          </Field>
          <Field label="Amount">
            <input type="number" min={0.1} step={0.1} value={quantity} onChange={(e) => setQuantity(e.target.value)} style={inputStyle} />
          </Field>
          <Field label="Unit">
            <select value={unit} onChange={(e) => setUnit(e.target.value)} style={selectStyle}>
              {unitOptions.map((u) => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Meal">
            <select value={meal} onChange={(e) => setMeal(e.target.value)} style={selectStyle}>
              {MEAL_OPTIONS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* Dropdown Suggestions */}
        {showResults && (query || !selectedFood) && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 30,
              marginTop: 4,
              background: 'var(--panel-bg)',
              border: '1px solid var(--panel-border)',
              borderRadius: 8,
              maxHeight: 240,
              overflowY: 'auto',
              boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
            }}
          >
            {(searchResults.length > 0 ? searchResults : FOODS.slice(0, 10)).map((food) => (
              <button
                key={food.name}
                onClick={() => pickFood(food)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 14px',
                  border: 'none',
                  borderTop: '1px solid var(--panel-border)',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--ink)',
                  fontSize: 13,
                }}
              >
                <span style={{ fontWeight: 600 }}>{food.name}</span>
                <span style={{ color: 'var(--ink-faint)', fontSize: 12 }}>{food.kcal} kcal / 100g ({food.serving})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedFood && previewNutrients && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, padding: '12px 16px', borderRadius: 8, background: 'var(--panel-bg)', border: '1px solid var(--accent)', marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--ink-dim)' }}>
            Selected: <strong style={{ color: 'var(--ink)' }}>{selectedFood.name}</strong> ({calculatedGrams}g total)
            <br />
            <strong style={{ color: 'var(--accent)' }}>{Math.round(previewNutrients.kcal)} kcal</strong>
            {' · '}Protein {previewNutrients.protein.toFixed(1)}g · Carbs {previewNutrients.carbs.toFixed(1)}g · Fat {previewNutrients.fat.toFixed(1)}g
          </div>
          <button onClick={addEntry} style={{ padding: '10px 20px', borderRadius: 6, border: 'none', background: 'var(--btn-active-bg)', color: 'var(--btn-active-ink)', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>
            + Add to Daily Log
          </button>
        </div>
      )}

      {log.length > 0 && (
        <>
          <div style={{ border: '1px solid var(--panel-border)', borderRadius: 10, overflow: 'hidden', marginBottom: 20 }}>
            {MEAL_OPTIONS.filter((m) => log.some((e) => e.meal === m)).map((m) => (
              <div key={m}>
                <div style={{ padding: '8px 14px', fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: 'var(--ink-faint)', background: 'var(--panel-bg)', borderTop: '1px solid var(--panel-border)' }}>
                  {m.toUpperCase()}
                </div>
                {log.filter((e) => e.meal === m).map((entry) => (
                  <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', fontSize: 13, borderTop: '1px solid var(--panel-border)' }}>
                    <span style={{ color: 'var(--ink)' }}>
                      <strong>{entry.name}</strong> <span style={{ color: 'var(--ink-faint)' }}>({entry.quantity} {entry.unit} ≈ {entry.grams}g)</span>
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{Math.round(entry.kcal)} kcal</span>
                      <button onClick={() => removeEntry(entry.id)} aria-label="Remove" style={{ border: 'none', background: 'transparent', color: '#e04b3f', cursor: 'pointer', fontSize: 16, fontWeight: 800 }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
            <ResultCard label="Total Consumed Today" value={`${Math.round(totals.kcal).toLocaleString()} kcal`} sub={`P: ${Math.round(totals.protein)}g · C: ${Math.round(totals.carbs)}g · F: ${Math.round(totals.fat)}g`} />
            <ResultCard
              label={remaining >= 0 ? 'Remaining Target' : 'Exceeded Target'}
              value={`${Math.round(Math.abs(remaining)).toLocaleString()} kcal`}
              sub={`Goal: ${targetCalories.toLocaleString()} kcal`}
              highlight
            />
          </div>

          <div style={{ height: 8, borderRadius: 4, background: 'var(--btn-idle-bg)', overflow: 'hidden', marginBottom: 20 }}>
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, (totals.kcal / targetCalories) * 100)}%`,
                background: remaining < 0 ? '#e04b3f' : '#3fae6f',
                transition: 'width 200ms ease',
              }}
            />
          </div>

          {suggestions.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {suggestions.map((s, i) => (
                <div key={i} style={{ fontSize: 13, color: 'var(--ink)', padding: '10px 14px', borderRadius: 8, background: 'var(--panel-bg)', border: '1px solid var(--panel-border)' }}>
                  {s}
                </div>
              ))}
            </div>
          )}

          <button onClick={clearLog} style={{ ...secondaryBtn, marginTop: 4 }}>
            Clear Today's Food Log
          </button>
        </>
      )}
    </div>
  )
}
