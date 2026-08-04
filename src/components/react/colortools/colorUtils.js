// ─── Color Math Utilities ──────────────────────────────────────────────────────
// All algorithms are pure JS — zero external dependencies.

// ─── HEX ↔ RGB ────────────────────────────────────────────────────────────────
export function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full  = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return { r, g, b }
}

export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
}

// ─── RGB ↔ HSL ────────────────────────────────────────────────────────────────
export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100
  let r, g, b
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
}

// ─── RGB ↔ HSV ────────────────────────────────────────────────────────────────
export function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  const s = max === 0 ? 0 : d / max
  const v = max

  if (max !== min) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  }
}

// ─── Format helpers ───────────────────────────────────────────────────────────
export function formatHex(r, g, b)  { return rgbToHex(r, g, b).toUpperCase() }
export function formatRgb(r, g, b)  { return `rgb(${r}, ${g}, ${b})` }
export function formatHsl(h, s, l)  { return `hsl(${h}, ${s}%, ${l}%)` }
export function formatHsv(h, s, v)  { return `hsv(${h}, ${s}%, ${v}%)` }

// ─── Palette Generators ───────────────────────────────────────────────────────
// All return an array of uppercase HEX strings

export function complementary(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return [hex]
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return [
    hex.toUpperCase(),
    hslToHex((h + 180) % 360, s, l),
  ]
}

export function analogous(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return [hex]
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return [
    hslToHex((h - 60 + 360) % 360, s, l),
    hslToHex((h - 30 + 360) % 360, s, l),
    hex.toUpperCase(),
    hslToHex((h + 30) % 360, s, l),
    hslToHex((h + 60) % 360, s, l),
  ]
}

export function triadic(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return [hex]
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return [
    hex.toUpperCase(),
    hslToHex((h + 120) % 360, s, l),
    hslToHex((h + 240) % 360, s, l),
  ]
}

export function tetradic(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return [hex]
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return [
    hex.toUpperCase(),
    hslToHex((h + 90) % 360, s, l),
    hslToHex((h + 180) % 360, s, l),
    hslToHex((h + 270) % 360, s, l),
  ]
}

export function monochromatic(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return [hex]
  const { h, s } = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return [20, 35, 50, 65, 80].map((l) => hslToHex(h, s, l))
}

// ─── Shade Strip ──────────────────────────────────────────────────────────────
// Returns 9 shades from light → dark, preserving hue+saturation
export function getShades(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return []
  const { h, s } = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return [90, 80, 70, 60, 50, 40, 30, 20, 10].map((l) => ({
    hex:   hslToHex(h, s, l),
    label: `L${l}`,
  }))
}

// ─── Random pleasing color ─────────────────────────────────────────────────────
export function randomColor() {
  const h = Math.floor(Math.random() * 360)
  const s = 60 + Math.floor(Math.random() * 30)  // 60–90% saturation
  const l = 40 + Math.floor(Math.random() * 20)  // 40–60% lightness
  return hslToHex(h, s, l)
}

// ─── Export helpers ───────────────────────────────────────────────────────────
export function exportCss(colors) {
  const vars = colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')
  return `:root {\n${vars}\n}`
}

export function exportTailwind(colors) {
  const names = ['primary', 'secondary', 'tertiary', 'quaternary', 'quinary', 'senary', 'septenary']
  const entries = colors.map((c, i) => `  ${names[i] || `color${i + 1}`}: '${c}',`).join('\n')
  return `colors: {\n${entries}\n}`
}

export function exportJson(colors) {
  return JSON.stringify(colors, null, 2)
}

// ─── Internal helper ──────────────────────────────────────────────────────────
function hslToHex(h, s, l) {
  const { r, g, b } = hslToRgb(h, s, l)
  return rgbToHex(r, g, b).toUpperCase()
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}
