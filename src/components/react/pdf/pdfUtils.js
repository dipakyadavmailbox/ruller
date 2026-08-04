import { PDFDocument } from 'pdf-lib'
import { zipSync } from 'fflate'

// ─── Read File as ArrayBuffer ─────────────────────────────────────────────────
function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Failed to read file: ' + file.name))
    reader.readAsArrayBuffer(file)
  })
}

// ─── Parse Page Range String ──────────────────────────────────────────────────
// Input:  "1-3, 5, 7-9"  (1-based page numbers, human-readable)
// Output: [0, 1, 2, 4, 6, 7, 8]  (0-based indices for pdf-lib)
export function parsePageRange(rangeStr, totalPages) {
  const indices = new Set()
  for (const part of rangeStr.split(',')) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const match = trimmed.match(/^(\d+)(?:-(\d+))?$/)
    if (!match) throw new Error(`Invalid range segment: "${trimmed}" — use format like 1-3, 5, 7`)
    const start = parseInt(match[1], 10)
    const end   = match[2] ? parseInt(match[2], 10) : start
    if (start < 1 || end > totalPages || start > end)
      throw new Error(`Range ${start}-${end} is out of bounds (document has ${totalPages} pages)`)
    for (let i = start; i <= end; i++) indices.add(i - 1) // convert to 0-based
  }
  if (indices.size === 0) throw new Error('No valid pages found in range input.')
  return [...indices].sort((a, b) => a - b)
}

// ─── Get Page Count ────────────────────────────────────────────────────────────
export async function getPdfPageCount(file) {
  try {
    const buf = await readFileAsArrayBuffer(file)
    const doc = await PDFDocument.load(buf, { ignoreEncryption: true })
    return doc.getPageCount()
  } catch {
    return 0
  }
}

// ─── Convert Images → PDF ─────────────────────────────────────────────────────
// imageFiles: File[] ordered JPEG / PNG / WebP
// Returns: Blob (application/pdf)
export async function imagesToPdf(imageFiles) {
  const pdfDoc  = await PDFDocument.create()
  const A4_W    = 595.28
  const A4_H    = 841.89
  const PADDING = 40

  for (const file of imageFiles) {
    const buf   = await readFileAsArrayBuffer(file)
    const bytes = new Uint8Array(buf)

    let img
    if (file.type === 'image/jpeg') {
      img = await pdfDoc.embedJpg(bytes)
    } else if (file.type === 'image/png') {
      img = await pdfDoc.embedPng(bytes)
    } else if (file.type === 'image/webp') {
      // pdf-lib doesn't natively support WebP — convert via canvas to PNG first
      img = await pdfDoc.embedPng(await webpToPng(file))
    } else {
      throw new Error(`Unsupported image type: ${file.type}`)
    }

    const page  = pdfDoc.addPage([A4_W, A4_H])
    const maxW  = A4_W - PADDING * 2
    const maxH  = A4_H - PADDING * 2
    const scale = Math.min(maxW / img.width, maxH / img.height, 1)
    const drawW = img.width  * scale
    const drawH = img.height * scale

    page.drawImage(img, {
      x:      (A4_W - drawW) / 2,
      y:      (A4_H - drawH) / 2,
      width:  drawW,
      height: drawH,
    })
  }

  return new Blob([await pdfDoc.save()], { type: 'application/pdf' })
}

// Canvas-based WebP → PNG (necessary since pdf-lib only embeds JPEG and PNG)
function webpToPng(file) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = img.naturalWidth
      canvas.height = img.naturalHeight
      canvas.getContext('2d').drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url)
        if (!blob) { reject(new Error('WebP to PNG conversion failed')); return }
        blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf))).catch(reject)
      }, 'image/png')
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not load image')) }
    img.src = url
  })
}

// ─── Merge Multiple PDFs ──────────────────────────────────────────────────────
// pdfFiles: File[] in desired final page order
// Returns: Blob (application/pdf)
export async function mergePdfs(pdfFiles) {
  const mergedDoc = await PDFDocument.create()
  for (const file of pdfFiles) {
    const buf    = await readFileAsArrayBuffer(file)
    const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true })
    const pages  = await mergedDoc.copyPages(srcDoc, srcDoc.getPageIndices())
    pages.forEach((p) => mergedDoc.addPage(p))
  }
  return new Blob([await mergedDoc.save()], { type: 'application/pdf' })
}

// ─── Split: All Pages → ZIP of individual PDFs ───────────────────────────────
// Returns: Blob (application/zip)
export async function splitPdfAllPages(pdfFile) {
  const buf    = await readFileAsArrayBuffer(pdfFile)
  const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true })
  const count  = srcDoc.getPageCount()

  const zippable = {}
  for (let i = 0; i < count; i++) {
    const doc   = await PDFDocument.create()
    const [page] = await doc.copyPages(srcDoc, [i])
    doc.addPage(page)
    const bytes = await doc.save()
    zippable[`page-${String(i + 1).padStart(3, '0')}.pdf`] = bytes
  }

  const zipped = zipSync(zippable)
  return new Blob([zipped], { type: 'application/zip' })
}

// ─── Split: Custom Page Range → Single PDF ────────────────────────────────────
// Returns: Blob (application/pdf)
export async function splitPdfRange(pdfFile, rangeStr, totalPages) {
  const indices = parsePageRange(rangeStr, totalPages)
  const buf     = await readFileAsArrayBuffer(pdfFile)
  const srcDoc  = await PDFDocument.load(buf, { ignoreEncryption: true })
  const newDoc  = await PDFDocument.create()
  const pages   = await newDoc.copyPages(srcDoc, indices)
  pages.forEach((p) => newDoc.addPage(p))
  return new Blob([await newDoc.save()], { type: 'application/pdf' })
}
