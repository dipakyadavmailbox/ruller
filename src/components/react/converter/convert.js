import Papa from 'papaparse'
import yaml from 'js-yaml'

export const FORMATS = ['JSON', 'CSV', 'YAML', 'TSV', 'XML', 'Markdown Table']

export function jsonToXml(obj, rootName = 'root') {
  function toXml(val, name) {
    if (val === null || val === undefined) return `<${name}/>`
    if (typeof val === 'object') {
      if (Array.isArray(val)) {
        return val.map((item) => toXml(item, 'item')).join('')
      }
      const children = Object.entries(val)
        .map(([k, v]) => toXml(v, k.replace(/[^a-zA-Z0-9_]/g, '_')))
        .join('')
      return `<${name}>${children}</${name}>`
    }
    return `<${name}>${String(val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</${name}>`
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n${toXml(obj, rootName)}`
}

function jsonToMarkdownTable(data) {
  const rows = Array.isArray(data) ? data : [data]
  if (!rows.length) return ''
  const keys = Object.keys(rows[0])
  const header = '| ' + keys.join(' | ') + ' |'
  const divider = '| ' + keys.map(() => '---').join(' | ') + ' |'
  const body = rows.map(row => '| ' + keys.map(k => String(row[k] ?? '')).join(' | ') + ' |').join('\n')
  return `${header}\n${divider}\n${body}`
}

function markdownTableToJson(text) {
  const lines = text.trim().split('\n').filter(l => l.trim())
  if (lines.length < 3) throw new Error('Not a valid Markdown table (need header, divider, at least one row)')
  const parseRow = (line) => line.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1)
  const headers = parseRow(lines[0])
  const rows = lines.slice(2).map(l => {
    const cells = parseRow(l)
    return Object.fromEntries(headers.map((h, i) => [h, cells[i] ?? '']))
  })
  return rows
}

function parseInput(text, format) {
  if (format === 'JSON') return JSON.parse(text)
  if (format === 'YAML') return yaml.load(text)
  if (format === 'CSV') {
    const result = Papa.parse(text.trim(), { header: true, dynamicTyping: true, skipEmptyLines: true })
    if (result.errors.length) throw new Error(result.errors[0].message)
    return result.data
  }
  if (format === 'TSV') {
    const result = Papa.parse(text.trim(), { header: true, delimiter: '\t', dynamicTyping: true, skipEmptyLines: true })
    if (result.errors.length) throw new Error(result.errors[0].message)
    return result.data
  }
  if (format === 'XML') {
    if (typeof window !== 'undefined' && window.DOMParser) {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(text, 'text/xml')
      const errorNode = xmlDoc.querySelector('parsererror')
      if (errorNode) throw new Error(errorNode.textContent)
      function xmlNodeToObj(node) {
        const obj = {}
        if (node.children.length === 0) return node.textContent
        for (const child of node.children) {
          const childVal = xmlNodeToObj(child)
          if (obj[child.nodeName]) {
            if (!Array.isArray(obj[child.nodeName])) obj[child.nodeName] = [obj[child.nodeName]]
            obj[child.nodeName].push(childVal)
          } else {
            obj[child.nodeName] = childVal
          }
        }
        return obj
      }
      return xmlNodeToObj(xmlDoc.documentElement)
    }
    throw new Error('XML parsing requires a browser environment.')
  }
  if (format === 'Markdown Table') return markdownTableToJson(text)
  throw new Error(`Unsupported input format: ${format}`)
}

function stringifyOutput(data, format) {
  if (format === 'JSON') return JSON.stringify(data, null, 2)
  if (format === 'YAML') return yaml.dump(data)
  if (format === 'CSV') {
    const rows = Array.isArray(data) ? data : [data]
    return Papa.unparse(rows)
  }
  if (format === 'TSV') {
    const rows = Array.isArray(data) ? data : [data]
    return Papa.unparse(rows, { delimiter: '\t' })
  }
  if (format === 'XML') return jsonToXml(data)
  if (format === 'Markdown Table') return jsonToMarkdownTable(data)
  throw new Error(`Unsupported output format: ${format}`)
}

export function convert(text, fromFormat, toFormat) {
  const data = parseInput(text, fromFormat)
  return stringifyOutput(data, toFormat)
}

// Data Storage Units Math
export const DATA_UNITS = [
  { id: 'b', label: 'Bits (b)', bytes: 0.125 },
  { id: 'B', label: 'Bytes (B)', bytes: 1 },
  { id: 'KB', label: 'Kilobytes (KB)', bytes: 1000 },
  { id: 'MB', label: 'Megabytes (MB)', bytes: 1000 ** 2 },
  { id: 'GB', label: 'Gigabytes (GB)', bytes: 1000 ** 3 },
  { id: 'TB', label: 'Terabytes (TB)', bytes: 1000 ** 4 },
  { id: 'PB', label: 'Petabytes (PB)', bytes: 1000 ** 5 },
  { id: 'KiB', label: 'Kibibytes (KiB)', bytes: 1024 },
  { id: 'MiB', label: 'Mebibytes (MiB)', bytes: 1024 ** 2 },
  { id: 'GiB', label: 'Gibibytes (GiB)', bytes: 1024 ** 3 },
  { id: 'TiB', label: 'Tebibytes (TiB)', bytes: 1024 ** 4 },
]

export function convertDataUnits(value, fromUnitId) {
  const fromObj = DATA_UNITS.find((u) => u.id === fromUnitId) || DATA_UNITS[1]
  const bytes = value * fromObj.bytes
  return DATA_UNITS.map((u) => ({
    ...u,
    converted: (bytes / u.bytes).toLocaleString(undefined, { maximumFractionDigits: 6 }),
  }))
}

// Encoding Utilities
export function textToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)))
}
export function base64ToText(str) {
  return decodeURIComponent(escape(atob(str.trim())))
}
export function textToHex(str) {
  return Array.from(new TextEncoder().encode(str))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ')
}
export function hexToText(hex) {
  const cleanHex = hex.replace(/\s+/g, '')
  const bytes = new Uint8Array(cleanHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [])
  return new TextDecoder().decode(bytes)
}
export function textToBinary(str) {
  return Array.from(new TextEncoder().encode(str))
    .map((b) => b.toString(2).padStart(8, '0'))
    .join(' ')
}
export function binaryToText(bin) {
  const bytes = bin.trim().split(/\s+/).map(b => parseInt(b, 2))
  return new TextDecoder().decode(new Uint8Array(bytes))
}

// Number Base Converter
export function convertNumberBase(value, fromBase, toBase) {
  if (!value.trim()) return ''
  const decimal = parseInt(value.trim(), fromBase)
  if (isNaN(decimal)) throw new Error(`"${value}" is not a valid base-${fromBase} number`)
  return decimal.toString(toBase).toUpperCase()
}

export const NUMBER_BASES = [
  { id: 2, label: 'Binary (Base 2)', prefix: '0b' },
  { id: 8, label: 'Octal (Base 8)', prefix: '0o' },
  { id: 10, label: 'Decimal (Base 10)', prefix: '' },
  { id: 16, label: 'Hexadecimal (Base 16)', prefix: '0x' },
]

// Converts a decimal integer to all bases at once
export function convertAllBases(value, fromBase) {
  const decimal = parseInt(String(value).trim(), fromBase)
  if (isNaN(decimal)) return null
  return {
    decimal: decimal.toString(10),
    hex: decimal.toString(16).toUpperCase(),
    octal: decimal.toString(8),
    binary: decimal.toString(2),
  }
}

// Color Converter
export function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean
  if (full.length !== 6) throw new Error('Invalid hex color')
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return { r, g, b }
}

export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase()
}

export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100
  let r, g, b
  if (s === 0) { r = g = b = l } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1
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

export function parseColorInput(input) {
  const cleaned = input.trim()
  // Try hex
  if (/^#?[0-9a-fA-F]{3,6}$/.test(cleaned)) {
    const hex = cleaned.startsWith('#') ? cleaned : '#' + cleaned
    const { r, g, b } = hexToRgb(hex)
    const hsl = rgbToHsl(r, g, b)
    return { hex: hex.toUpperCase(), r, g, b, ...hsl, valid: true }
  }
  // Try rgb(r, g, b)
  const rgbMatch = cleaned.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]), g = parseInt(rgbMatch[2]), b = parseInt(rgbMatch[3])
    const hsl = rgbToHsl(r, g, b)
    return { hex: rgbToHex(r, g, b), r, g, b, ...hsl, valid: true }
  }
  // Try hsl(h, s%, l%)
  const hslMatch = cleaned.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/i)
  if (hslMatch) {
    const h = parseInt(hslMatch[1]), s = parseInt(hslMatch[2]), l = parseInt(hslMatch[3])
    const { r, g, b } = hslToRgb(h, s, l)
    return { hex: rgbToHex(r, g, b), r, g, b, h, s, l, valid: true }
  }
  return { valid: false }
}

// JWT Decoder
export function decodeJWT(token) {
  const parts = token.trim().split('.')
  if (parts.length !== 3) throw new Error('A JWT must have exactly 3 parts separated by dots')
  function decodeBase64Url(str) {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    return JSON.parse(atob(padded))
  }
  const header = decodeBase64Url(parts[0])
  const payload = decodeBase64Url(parts[1])
  return { header, payload, signature: parts[2] }
}

export const SAMPLE_JSON = JSON.stringify(
  [
    { name: 'Alice', role: 'Engineer', years: 4 },
    { name: 'Bob', role: 'Designer', years: 2 },
  ],
  null,
  2
)

export const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
