export function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return '0 KB'
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex++
  }
  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

export function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => resolve({ img, url })
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not read this file as an image.'))
    }
    img.src = url
  })
}

const SUPPORTED_OUTPUT_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function resolveOutputType(outputFormat, sourceType) {
  if (outputFormat !== 'original') return outputFormat
  return SUPPORTED_OUTPUT_TYPES.includes(sourceType) ? sourceType : 'image/png'
}

export function extensionForType(mimeType) {
  if (mimeType === 'image/jpeg') return 'jpg'
  if (mimeType === 'image/webp') return 'webp'
  return 'png'
}

/**
 * Draws the image onto an offscreen canvas at the target size and encodes
 * it as a blob. Quality only affects lossy formats (JPEG/WebP) — PNG is
 * always lossless regardless of the value passed.
 */
export function renderToBlob({ img, width, height, mimeType, quality }) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, width, height)
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Could not encode the resized image.'))
      },
      mimeType,
      mimeType === 'image/png' ? undefined : quality / 100
    )
  })
}
