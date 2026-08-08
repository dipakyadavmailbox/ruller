import { detectFile } from './detectFile.js'
import { WORKSPACE_TOOLS } from './toolRoutes.js'

// ─── detectMultiple — analyse a group of files and return batch suggestions ───
export async function detectMultiple(files) {
  const detections = await Promise.all(files.map(detectFile))

  // Group by category
  const groups = {}
  for (const d of detections) {
    const cat = d.category || 'unknown'
    if (!groups[cat]) groups[cat] = []
    groups[cat].push(d)
  }

  // Dominant group = largest by count
  const sorted   = Object.entries(groups).sort(([, a], [, b]) => b.length - a.length)
  const dominant = sorted[0]

  const isHomogeneous = Object.keys(groups).length === 1

  // Determine batch suggestion based on group composition
  const batchSuggestion = resolveBatchSuggestion(groups, detections)

  return {
    detections,
    groups,
    dominant: { category: dominant[0], items: dominant[1] },
    totalCount: files.length,
    isHomogeneous,
    batchSuggestion,
  }
}

// ─── Batch suggestion resolver ─────────────────────────────────────────────────
function resolveBatchSuggestion(groups, all) {
  const cats = Object.keys(groups)

  // All PDFs → merge
  if (cats.length === 1 && cats[0] === 'pdf') {
    const tool = WORKSPACE_TOOLS.find((t) => t.slug === '/pdf-tools')
    return {
      label:       `Merge ${all.length} PDFs`,
      sublabel:    'Combine into a single document',
      icon:        '🔗',
      tool,
      tabTarget:   'merge',
      ctaText:     `Merge ${all.length} PDFs →`,
      accentColor: '#f97316',
    }
  }

  // All images → convert to PDF
  if (cats.length === 1 && cats[0] === 'image') {
    const tool = WORKSPACE_TOOLS.find((t) => t.slug === '/pdf-tools')
    return {
      label:       `Convert ${all.length} images to PDF`,
      sublabel:    'Bundle them into a single PDF document',
      icon:        '📄',
      tool,
      tabTarget:   'convert',
      ctaText:     `Convert to PDF →`,
      accentColor: '#8b5cf6',
    }
  }

  // Mixed PDF + images → add to PDF
  if (cats.includes('pdf') && cats.includes('image') && cats.length === 2) {
    const tool = WORKSPACE_TOOLS.find((t) => t.slug === '/pdf-tools')
    return {
      label:       'Add images to PDF',
      sublabel:    'Convert images and combine with your PDF',
      icon:        '🖼️',
      tool,
      tabTarget:   'convert',
      ctaText:     'Open PDF Converter →',
      accentColor: '#f97316',
    }
  }

  // All data files (JSON/CSV/YAML) → data converter
  if (cats.length === 1 && cats[0] === 'data') {
    const tool = WORKSPACE_TOOLS.find((t) => t.slug === '/data-converter')
    return {
      label:       `Convert ${all.length} data files`,
      sublabel:    'Transform between JSON, CSV, and YAML formats',
      icon:        '🔁',
      tool,
      tabTarget:   'structure',
      ctaText:     'Open Data Converter →',
      accentColor: '#eab308',
    }
  }

  // No clear match
  return null
}
