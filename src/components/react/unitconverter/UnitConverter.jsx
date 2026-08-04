import { useState, useCallback } from 'react'
import { UNIT_CATEGORIES, convertUnits, formatResult } from './unitData.js'

export default function UnitConverter() {
  const [activeCat, setActiveCat] = useState(UNIT_CATEGORIES[0].id)

  const category = UNIT_CATEGORIES.find((c) => c.id === activeCat)

  return (
    <div style={styles.root}>
      {/* ─── Category Tab Bar (horizontal scroll on mobile) ──────────────── */}
      <div style={styles.tabBar} role="tablist" aria-label="Unit categories">
        {UNIT_CATEGORIES.map((cat) => {
          const active = cat.id === activeCat
          return (
            <button
              key={cat.id}
              role="tab"
              id={`unit-tab-${cat.id}`}
              aria-selected={active}
              aria-controls={`unit-panel-${cat.id}`}
              onClick={() => setActiveCat(cat.id)}
              style={{
                ...styles.tabBtn,
                background:  active ? 'var(--accent-light)' : 'transparent',
                border:      `1px solid ${active ? 'rgba(99,102,241,0.35)' : 'transparent'}`,
                color:       active ? 'var(--accent)' : 'var(--ink-dim)',
              }}
            >
              <span style={styles.tabIcon}>{cat.icon}</span>
              <span style={styles.tabLabel}>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* ─── Conversion Panel ─────────────────────────────────────────────── */}
      <div
        role="tabpanel"
        id={`unit-panel-${activeCat}`}
        aria-labelledby={`unit-tab-${activeCat}`}
        style={styles.panel}
      >
        <UnitPanel key={activeCat} category={category} />
      </div>
    </div>
  )
}

// ─── Unit Panel (per-category) ─────────────────────────────────────────────────
function UnitPanel({ category }) {
  const [fromUnit, setFromUnit] = useState(category.defaults[0])
  const [toUnit,   setToUnit]   = useState(category.defaults[1])
  const [fromVal,  setFromVal]  = useState('1')
  const [toVal,    setToVal]    = useState(() =>
    formatResult(convertUnits(1, category.defaults[0], category.defaults[1], category))
  )
  const [copied, setCopied] = useState(false)

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleFromChange = useCallback((val) => {
    setFromVal(val)
    const result = convertUnits(val, fromUnit, toUnit, category)
    setToVal(result === '' ? '' : formatResult(result))
  }, [fromUnit, toUnit, category])

  const handleToChange = useCallback((val) => {
    setToVal(val)
    const result = convertUnits(val, toUnit, fromUnit, category)
    setFromVal(result === '' ? '' : formatResult(result))
  }, [fromUnit, toUnit, category])

  const handleFromUnitChange = useCallback((unit) => {
    setFromUnit(unit)
    const result = convertUnits(fromVal, unit, toUnit, category)
    setToVal(result === '' ? '' : formatResult(result))
  }, [fromVal, toUnit, category])

  const handleToUnitChange = useCallback((unit) => {
    setToUnit(unit)
    const result = convertUnits(fromVal, fromUnit, unit, category)
    setToVal(result === '' ? '' : formatResult(result))
  }, [fromVal, fromUnit, category])

  const handleSwap = useCallback(() => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromVal(toVal)
    setToVal(fromVal)
  }, [fromUnit, toUnit, fromVal, toVal])

  const handleCopy = () => {
    const label = category.units.find((u) => u.id === toUnit)?.label || toUnit
    navigator.clipboard.writeText(`${toVal} ${label}`).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      {/* ─── Category heading ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 28 }}>{category.icon}</span>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>
          {category.label} Converter
        </h2>
      </div>

      {/* ─── Conversion fields ───────────────────────────────────────────── */}
      <div style={styles.converterRow}>
        {/* FROM */}
        <div style={styles.fieldGroup}>
          <label style={styles.fieldLabel} htmlFor={`from-unit-${category.id}`}>From</label>
          <select
            id={`from-unit-${category.id}`}
            value={fromUnit}
            onChange={(e) => handleFromUnitChange(e.target.value)}
            style={styles.select}
          >
            {category.units.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
          <input
            type="number"
            id={`from-val-${category.id}`}
            value={fromVal}
            onChange={(e) => handleFromChange(e.target.value)}
            style={styles.numberInput}
            placeholder="Enter value"
            aria-label={`From value in ${fromUnit}`}
          />
        </div>

        {/* SWAP */}
        <button
          onClick={handleSwap}
          style={styles.swapBtn}
          aria-label="Swap units"
          title="Swap units"
        >⇄</button>

        {/* TO */}
        <div style={styles.fieldGroup}>
          <label style={styles.fieldLabel} htmlFor={`to-unit-${category.id}`}>To</label>
          <select
            id={`to-unit-${category.id}`}
            value={toUnit}
            onChange={(e) => handleToUnitChange(e.target.value)}
            style={styles.select}
          >
            {category.units.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
          <input
            type="number"
            id={`to-val-${category.id}`}
            value={toVal}
            onChange={(e) => handleToChange(e.target.value)}
            style={{ ...styles.numberInput, background: 'var(--btn-idle-bg)' }}
            placeholder="Result"
            aria-label={`To value in ${toUnit}`}
          />
        </div>
      </div>

      {/* ─── Copy button ─────────────────────────────────────────────────── */}
      <button
        onClick={handleCopy}
        disabled={!toVal}
        id={`copy-result-${category.id}`}
        style={{
          ...styles.copyBtn,
          opacity: toVal ? 1 : 0.4,
          cursor:  toVal ? 'pointer' : 'not-allowed',
        }}
        aria-label="Copy result to clipboard"
      >
        {copied ? '✓ Copied!' : '📋 Copy Result'}
      </button>

      {/* ─── Quick reference pills ───────────────────────────────────────── */}
      <QuickRef category={category} />
    </div>
  )
}

// ─── Quick Reference conversions ──────────────────────────────────────────────
const QUICK_REFS = {
  length:      [['1', 'kilometer', 'mile'], ['1', 'meter', 'foot'], ['1', 'inch', 'centimeter'], ['1', 'mile', 'kilometer']],
  weight:      [['1', 'kilogram', 'pound'], ['1', 'pound', 'gram'], ['1', 'metric_ton', 'kilogram'], ['1', 'stone', 'kilogram']],
  temperature: [['0', 'celsius', 'fahrenheit'], ['100', 'celsius', 'fahrenheit'], ['37', 'celsius', 'fahrenheit'], ['0', 'celsius', 'kelvin']],
  area:        [['1', 'hectare', 'acre'], ['1', 'sq_mile', 'sq_kilometer'], ['1', 'sq_meter', 'sq_foot'], ['1', 'acre', 'sq_meter']],
  volume:      [['1', 'liter', 'us_gallon'], ['1', 'us_gallon', 'liter'], ['1', 'cubic_meter', 'liter'], ['250', 'milliliter', 'us_cup']],
  speed:       [['100', 'km_per_h', 'mph'], ['60', 'mph', 'km_per_h'], ['1', 'mach', 'km_per_h'], ['1', 'knot', 'km_per_h']],
  time:        [['1', 'hour', 'minute'], ['1', 'day', 'hour'], ['1', 'year', 'day'], ['1', 'week', 'day']],
  data:        [['1', 'gigabyte', 'megabyte'], ['1', 'terabyte', 'gigabyte'], ['1', 'megabyte', 'kilobyte'], ['8', 'bit', 'byte']],
  energy:      [['1', 'kilocalorie', 'joule'], ['1', 'kwh', 'joule'], ['1', 'btu', 'joule'], ['1', 'kilojoule', 'kilocalorie']],
  pressure:    [['1', 'atmosphere', 'psi'], ['1', 'bar', 'psi'], ['1', 'psi', 'kilopascal'], ['1', 'atmosphere', 'kilopascal']],
}

function QuickRef({ category }) {
  const refs = QUICK_REFS[category.id] || []
  if (!refs.length) return null

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.8px', color: 'var(--ink-faint)', marginBottom: 10 }}>
        COMMON CONVERSIONS
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {refs.map(([val, from, to], i) => {
          const result = convertUnits(val, from, to, category)
          const fromLabel = category.units.find((u) => u.id === from)?.label?.split(' ')[0] || from
          const toLabel   = category.units.find((u) => u.id === to)?.label?.split(' ')[0] || to
          return (
            <div key={i} style={styles.pill}>
              <span style={{ color: 'var(--ink)' }}>{val} {fromLabel}</span>
              <span style={{ color: 'var(--ink-faint)', margin: '0 4px' }}>=</span>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                {result !== '' ? formatResult(result) : '?'} {toLabel}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  root: {
    maxWidth: '900px',
    margin: '24px auto 40px',
    padding: '0 20px',
  },
  tabBar: {
    display:    'flex',
    gap:        '4px',
    overflowX: 'auto',
    marginBottom: '16px',
    padding: '4px',
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: '14px',
    scrollbarWidth: 'none',
  },
  tabBtn: {
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    gap:            '2px',
    padding:        '8px 12px',
    borderRadius:   '10px',
    cursor:         'pointer',
    fontFamily:     'var(--font-mono)',
    transition:     'all 150ms ease',
    whiteSpace:     'nowrap',
    flexShrink:     0,
  },
  tabIcon: { fontSize: '18px', lineHeight: 1 },
  tabLabel: { fontSize: '11px', fontWeight: 700, letterSpacing: '0.3px' },
  panel: {
    background:   'var(--panel-bg)',
    border:       '1px solid var(--panel-border)',
    borderRadius: '16px',
    padding:      '28px',
  },
  converterRow: {
    display:    'flex',
    alignItems: 'flex-end',
    gap:        '12px',
    flexWrap:   'wrap',
  },
  fieldGroup: {
    flex:          1,
    minWidth:      '180px',
    display:       'flex',
    flexDirection: 'column',
    gap:           '8px',
  },
  fieldLabel: {
    fontSize:   '11px',
    fontWeight: 800,
    letterSpacing: '0.8px',
    color:      'var(--ink-faint)',
    textTransform: 'uppercase',
  },
  select: {
    width:        '100%',
    padding:      '10px 12px',
    border:       '1px solid var(--panel-border)',
    borderRadius: '10px',
    background:   'var(--panel-bg)',
    color:        'var(--ink)',
    fontSize:     '13px',
    fontFamily:   'var(--font-mono)',
    cursor:       'pointer',
    appearance:   'auto',
  },
  numberInput: {
    width:        '100%',
    padding:      '12px 14px',
    border:       '1px solid var(--panel-border)',
    borderRadius: '10px',
    background:   'var(--panel-bg)',
    color:        'var(--ink)',
    fontSize:     '20px',
    fontFamily:   'var(--font-mono)',
    fontWeight:   700,
    boxSizing:    'border-box',
    outline:      'none',
    transition:   'border-color 150ms ease',
  },
  swapBtn: {
    padding:      '10px 14px',
    border:       '1px solid var(--panel-border)',
    borderRadius: '10px',
    background:   'var(--btn-idle-bg)',
    color:        'var(--ink)',
    fontSize:     '20px',
    cursor:       'pointer',
    fontFamily:   'var(--font-mono)',
    transition:   'all 150ms ease',
    flexShrink:   0,
    alignSelf:    'flex-end',
    marginBottom: '0',
  },
  copyBtn: {
    display:      'inline-flex',
    alignItems:   'center',
    gap:          '6px',
    marginTop:    '16px',
    padding:      '10px 20px',
    border:       '1px solid var(--panel-border)',
    borderRadius: '10px',
    background:   'var(--btn-idle-bg)',
    color:        'var(--ink)',
    fontSize:     '13px',
    fontWeight:   700,
    fontFamily:   'var(--font-mono)',
    cursor:       'pointer',
    transition:   'all 150ms ease',
  },
  pill: {
    display:      'flex',
    alignItems:   'center',
    padding:      '6px 12px',
    border:       '1px solid var(--panel-border)',
    borderRadius: '20px',
    background:   'var(--btn-idle-bg)',
    fontSize:     '12px',
    fontFamily:   'var(--font-mono)',
    gap:          '2px',
  },
}
