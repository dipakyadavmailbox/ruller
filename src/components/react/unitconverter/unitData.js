// ─── Unit Converter Data ───────────────────────────────────────────────────────
// All factor-based units convert: value × fromFactor → base → ÷ toFactor
// Temperature is handled separately with formulas (not factors).

export const UNIT_CATEGORIES = [
  {
    id: 'length',
    label: 'Length',
    icon: '📏',
    units: [
      { id: 'kilometer',     label: 'Kilometer (km)',       factor: 1000 },
      { id: 'meter',         label: 'Meter (m)',             factor: 1 },
      { id: 'centimeter',    label: 'Centimeter (cm)',       factor: 0.01 },
      { id: 'millimeter',    label: 'Millimeter (mm)',       factor: 0.001 },
      { id: 'micrometer',    label: 'Micrometer (μm)',       factor: 0.000001 },
      { id: 'mile',          label: 'Mile (mi)',             factor: 1609.344 },
      { id: 'yard',          label: 'Yard (yd)',             factor: 0.9144 },
      { id: 'foot',          label: 'Foot (ft)',             factor: 0.3048 },
      { id: 'inch',          label: 'Inch (in)',             factor: 0.0254 },
      { id: 'nautical_mile', label: 'Nautical Mile (nmi)',   factor: 1852 },
      { id: 'light_year',    label: 'Light Year (ly)',       factor: 9.461e15 },
    ],
    defaults: ['kilometer', 'mile'],
  },
  {
    id: 'weight',
    label: 'Weight',
    icon: '⚖️',
    units: [
      { id: 'metric_ton', label: 'Metric Ton (t)',   factor: 1000 },
      { id: 'kilogram',   label: 'Kilogram (kg)',    factor: 1 },
      { id: 'gram',       label: 'Gram (g)',         factor: 0.001 },
      { id: 'milligram',  label: 'Milligram (mg)',   factor: 0.000001 },
      { id: 'pound',      label: 'Pound (lb)',       factor: 0.453592 },
      { id: 'ounce',      label: 'Ounce (oz)',       factor: 0.0283495 },
      { id: 'stone',      label: 'Stone (st)',       factor: 6.35029 },
    ],
    defaults: ['kilogram', 'pound'],
  },
  {
    id: 'temperature',
    label: 'Temperature',
    icon: '🌡️',
    isTemperature: true,
    units: [
      { id: 'celsius',    label: 'Celsius (°C)' },
      { id: 'fahrenheit', label: 'Fahrenheit (°F)' },
      { id: 'kelvin',     label: 'Kelvin (K)' },
      { id: 'rankine',    label: 'Rankine (°R)' },
    ],
    defaults: ['celsius', 'fahrenheit'],
  },
  {
    id: 'area',
    label: 'Area',
    icon: '▭',
    units: [
      { id: 'sq_kilometer',  label: 'Square Kilometer (km²)',  factor: 1e6 },
      { id: 'sq_meter',      label: 'Square Meter (m²)',       factor: 1 },
      { id: 'sq_centimeter', label: 'Square Centimeter (cm²)', factor: 0.0001 },
      { id: 'sq_millimeter', label: 'Square Millimeter (mm²)', factor: 1e-6 },
      { id: 'hectare',       label: 'Hectare (ha)',            factor: 10000 },
      { id: 'acre',          label: 'Acre',                    factor: 4046.86 },
      { id: 'sq_mile',       label: 'Square Mile (mi²)',       factor: 2589988 },
      { id: 'sq_yard',       label: 'Square Yard (yd²)',       factor: 0.836127 },
      { id: 'sq_foot',       label: 'Square Foot (ft²)',       factor: 0.092903 },
      { id: 'sq_inch',       label: 'Square Inch (in²)',       factor: 0.00064516 },
    ],
    defaults: ['hectare', 'acre'],
  },
  {
    id: 'volume',
    label: 'Volume',
    icon: '🧪',
    units: [
      { id: 'cubic_meter', label: 'Cubic Meter (m³)',      factor: 1000 },
      { id: 'liter',       label: 'Liter (L)',              factor: 1 },
      { id: 'milliliter',  label: 'Milliliter (mL)',        factor: 0.001 },
      { id: 'cubic_cm',    label: 'Cubic Centimeter (cm³)', factor: 0.001 },
      { id: 'us_gallon',   label: 'US Gallon (gal)',        factor: 3.78541 },
      { id: 'us_quart',    label: 'US Quart (qt)',          factor: 0.946353 },
      { id: 'us_pint',     label: 'US Pint (pt)',           factor: 0.473176 },
      { id: 'us_cup',      label: 'US Cup',                 factor: 0.236588 },
      { id: 'us_fl_oz',    label: 'US Fluid Oz (fl oz)',    factor: 0.0295735 },
      { id: 'tablespoon',  label: 'Tablespoon (tbsp)',      factor: 0.0147868 },
      { id: 'teaspoon',    label: 'Teaspoon (tsp)',         factor: 0.00492892 },
    ],
    defaults: ['liter', 'us_gallon'],
  },
  {
    id: 'speed',
    label: 'Speed',
    icon: '💨',
    units: [
      { id: 'm_per_s',   label: 'Meter/second (m/s)',  factor: 1 },
      { id: 'km_per_h',  label: 'Kilometer/hour (km/h)', factor: 0.277778 },
      { id: 'mph',       label: 'Mile/hour (mph)',      factor: 0.44704 },
      { id: 'knot',      label: 'Knot (kn)',            factor: 0.514444 },
      { id: 'ft_per_s',  label: 'Foot/second (ft/s)',   factor: 0.3048 },
      { id: 'mach',      label: 'Mach (sea level)',     factor: 340.29 },
    ],
    defaults: ['km_per_h', 'mph'],
  },
  {
    id: 'time',
    label: 'Time',
    icon: '⏱️',
    units: [
      { id: 'nanosecond',  label: 'Nanosecond (ns)',   factor: 1e-9 },
      { id: 'microsecond', label: 'Microsecond (μs)',  factor: 1e-6 },
      { id: 'millisecond', label: 'Millisecond (ms)',  factor: 0.001 },
      { id: 'second',      label: 'Second (s)',        factor: 1 },
      { id: 'minute',      label: 'Minute (min)',      factor: 60 },
      { id: 'hour',        label: 'Hour (h)',          factor: 3600 },
      { id: 'day',         label: 'Day (d)',           factor: 86400 },
      { id: 'week',        label: 'Week (wk)',         factor: 604800 },
      { id: 'month',       label: 'Month (avg)',       factor: 2629800 },
      { id: 'year',        label: 'Year (yr)',         factor: 31557600 },
    ],
    defaults: ['hour', 'minute'],
  },
  {
    id: 'data',
    label: 'Data',
    icon: '💾',
    units: [
      { id: 'bit',      label: 'Bit (b)',         factor: 0.125 },
      { id: 'byte',     label: 'Byte (B)',         factor: 1 },
      { id: 'kilobyte', label: 'Kilobyte (KB)',    factor: 1024 },
      { id: 'megabyte', label: 'Megabyte (MB)',    factor: 1048576 },
      { id: 'gigabyte', label: 'Gigabyte (GB)',    factor: 1073741824 },
      { id: 'terabyte', label: 'Terabyte (TB)',    factor: 1.09951e12 },
      { id: 'petabyte', label: 'Petabyte (PB)',    factor: 1.12590e15 },
    ],
    defaults: ['gigabyte', 'megabyte'],
  },
  {
    id: 'energy',
    label: 'Energy',
    icon: '⚡',
    units: [
      { id: 'joule',        label: 'Joule (J)',          factor: 1 },
      { id: 'kilojoule',    label: 'Kilojoule (kJ)',     factor: 1000 },
      { id: 'calorie',      label: 'Calorie (cal)',      factor: 4.184 },
      { id: 'kilocalorie',  label: 'Kilocalorie (kcal)', factor: 4184 },
      { id: 'watt_hour',    label: 'Watt-hour (Wh)',     factor: 3600 },
      { id: 'kwh',          label: 'Kilowatt-hour (kWh)',factor: 3600000 },
      { id: 'btu',          label: 'BTU',                factor: 1055.06 },
      { id: 'foot_pound',   label: 'Foot-pound (ft·lb)', factor: 1.35582 },
      { id: 'electron_volt',label: 'Electron Volt (eV)', factor: 1.602e-19 },
    ],
    defaults: ['kilocalorie', 'joule'],
  },
  {
    id: 'pressure',
    label: 'Pressure',
    icon: '🔵',
    units: [
      { id: 'pascal',      label: 'Pascal (Pa)',      factor: 1 },
      { id: 'kilopascal',  label: 'Kilopascal (kPa)', factor: 1000 },
      { id: 'megapascal',  label: 'Megapascal (MPa)', factor: 1000000 },
      { id: 'bar',         label: 'Bar',              factor: 100000 },
      { id: 'millibar',    label: 'Millibar (mbar)',  factor: 100 },
      { id: 'psi',         label: 'PSI (lb/in²)',     factor: 6894.76 },
      { id: 'atmosphere',  label: 'Atmosphere (atm)', factor: 101325 },
      { id: 'torr',        label: 'Torr / mmHg',     factor: 133.322 },
      { id: 'inhg',        label: 'inHg',             factor: 3386.39 },
    ],
    defaults: ['atmosphere', 'psi'],
  },
]

// ─── Factor-based conversion ──────────────────────────────────────────────────
export function convertUnits(value, fromUnit, toUnit, category) {
  if (isNaN(value) || value === '') return ''
  if (fromUnit === toUnit) return value

  if (category.isTemperature) {
    return convertTemperature(Number(value), fromUnit, toUnit)
  }

  const fromFactor = category.units.find((u) => u.id === fromUnit)?.factor
  const toFactor   = category.units.find((u) => u.id === toUnit)?.factor
  if (fromFactor == null || toFactor == null) return ''

  const inBase = Number(value) * fromFactor
  return inBase / toFactor
}

// ─── Temperature formulas (via Celsius as intermediate) ──────────────────────
function convertTemperature(value, from, to) {
  let c
  switch (from) {
    case 'celsius':    c = value; break
    case 'fahrenheit': c = (value - 32) * 5 / 9; break
    case 'kelvin':     c = value - 273.15; break
    case 'rankine':    c = (value - 491.67) * 5 / 9; break
    default:           return ''
  }
  switch (to) {
    case 'celsius':    return c
    case 'fahrenheit': return c * 9 / 5 + 32
    case 'kelvin':     return c + 273.15
    case 'rankine':    return (c + 273.15) * 9 / 5
    default:           return ''
  }
}

// ─── Smart number formatting ──────────────────────────────────────────────────
export function formatResult(num) {
  if (num === '' || num == null) return ''
  const n = Number(num)
  if (isNaN(n)) return 'Invalid'
  if (n === 0) return '0'

  const abs = Math.abs(n)
  if (abs !== 0 && (abs < 0.0001 || abs >= 1e15)) {
    return n.toExponential(6)
  }
  // Use toPrecision for significant figures, then strip trailing zeros
  const str = parseFloat(n.toPrecision(10)).toString()
  return str
}
