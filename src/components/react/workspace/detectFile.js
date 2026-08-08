import { WORKSPACE_TOOLS } from './toolRoutes.js'

// ─── MIME → category map ──────────────────────────────────────────────────────
const MIME_META = {
  'application/pdf':           { fileType: 'PDF Document',    icon: '📄', category: 'pdf',     color: '#f97316' },
  'image/jpeg':                { fileType: 'JPEG Image',       icon: '🖼️', category: 'image',   color: '#8b5cf6' },
  'image/png':                 { fileType: 'PNG Image',        icon: '🖼️', category: 'image',   color: '#8b5cf6' },
  'image/webp':                { fileType: 'WebP Image',       icon: '🖼️', category: 'image',   color: '#8b5cf6' },
  'image/gif':                 { fileType: 'GIF Image',        icon: '🎞️', category: 'image',   color: '#8b5cf6' },
  'image/svg+xml':             { fileType: 'SVG Image',        icon: '✏️', category: 'image',   color: '#8b5cf6' },
  'application/json':          { fileType: 'JSON Data',        icon: '📊', category: 'data',    color: '#eab308' },
  'text/csv':                  { fileType: 'CSV Spreadsheet',  icon: '📋', category: 'data',    color: '#eab308' },
  'text/plain':                { fileType: 'Plain Text',       icon: '📝', category: 'text',    color: '#64748b' },
  'application/zip':           { fileType: 'ZIP Archive',      icon: '🗜️', category: 'archive', color: '#94a3b8' },
  'application/octet-stream':  { fileType: 'Binary File',      icon: '📦', category: 'unknown', color: '#94a3b8' },
}

const EXT_META = {
  yaml:  { fileType: 'YAML Data',   icon: '📊', category: 'data',   color: '#eab308', mime: 'text/yaml' },
  yml:   { fileType: 'YAML Data',   icon: '📊', category: 'data',   color: '#eab308', mime: 'text/yaml' },
  json:  { fileType: 'JSON Data',   icon: '📊', category: 'data',   color: '#eab308', mime: 'application/json' },
  csv:   { fileType: 'CSV Data',    icon: '📋', category: 'data',   color: '#eab308', mime: 'text/csv' },
  txt:   { fileType: 'Text File',   icon: '📝', category: 'text',   color: '#64748b', mime: 'text/plain' },
  md:    { fileType: 'Markdown',    icon: '📝', category: 'text',   color: '#64748b', mime: 'text/plain' },
  svg:   { fileType: 'SVG Image',   icon: '✏️', category: 'image',  color: '#8b5cf6', mime: 'image/svg+xml' },
  pdf:   { fileType: 'PDF Document',icon: '📄', category: 'pdf',    color: '#f97316', mime: 'application/pdf' },
}

// ─── Magic byte signatures (first 4 bytes as hex string) ─────────────────────
const MAGIC_BYTES = [
  { hex: '25504446', mime: 'application/pdf'  }, // %PDF
  { hex: 'ffd8ff',   mime: 'image/jpeg'       }, // JPEG
  { hex: '89504e47', mime: 'image/png'        }, // PNG
  { hex: '47494638', mime: 'image/gif'        }, // GIF87a / GIF89a
  { hex: '504b0304', mime: 'application/zip'  }, // PK zip
]

async function sniffMagicBytes(file) {
  try {
    const buf   = await file.slice(0, 4).arrayBuffer()
    const bytes = new Uint8Array(buf)
    const hex   = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
    for (const sig of MAGIC_BYTES) {
      if (hex.startsWith(sig.hex)) return sig.mime
    }
  } catch { /* ignore */ }
  return null
}

// ─── Format file size ─────────────────────────────────────────────────────────
export function formatSize(bytes) {
  if (bytes < 1024)          return `${bytes} B`
  if (bytes < 1024 * 1024)   return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

// ─── Main detection function ──────────────────────────────────────────────────
export async function detectFile(file) {
  let mime = file.type || ''
  const ext = file.name.split('.').pop().toLowerCase()

  // 1. Resolve MIME from extension if browser gave none / generic
  if (!mime || mime === 'application/octet-stream') {
    const extData = EXT_META[ext]
    if (extData?.mime) mime = extData.mime
  }

  // 2. Magic byte sniff if still generic
  if (!mime || mime === 'application/octet-stream') {
    const sniffed = await sniffMagicBytes(file)
    if (sniffed) mime = sniffed
  }

  // 3. Resolve metadata from MIME (or extension fallback)
  const meta = MIME_META[mime] || EXT_META[ext] || {
    fileType: 'Unknown File',
    icon:     '📁',
    category: 'unknown',
    color:    '#94a3b8',
  }

  // 4. Find matching tools
  const matchingTools = WORKSPACE_TOOLS.filter((t) =>
    t.accepts.includes(mime) ||
    t.accepts.some((a) => a.includes(ext))
  )

  // YAML special case — data-converter handles it
  if (['yaml', 'yml'].includes(ext) && !matchingTools.length) {
    const dc = WORKSPACE_TOOLS.find((t) => t.slug === '/data-converter')
    if (dc) matchingTools.push(dc)
  }

  const primaryTool   = matchingTools[0] || null
  const otherTools    = matchingTools.slice(1, 4)

  return {
    file,
    fileName:    file.name,
    fileSize:    formatSize(file.size),
    rawSize:     file.size,
    mime,
    ext,
    fileType:    meta.fileType,
    icon:        meta.icon,
    category:    meta.category,
    color:       meta.color,
    confidence:  mime !== 'application/octet-stream' ? 'high' : 'low',
    primaryTool,
    otherTools,
    hasTools:    matchingTools.length > 0,
  }
}

// ─── Multi-file grouping ──────────────────────────────────────────────────────
export function groupByCategory(detections) {
  const groups = {}
  for (const d of detections) {
    const cat = d.category
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(d)
  }
  return groups
}
