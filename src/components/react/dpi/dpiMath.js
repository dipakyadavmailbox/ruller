export const QUALITY_PRESETS = [
  { label: 'Draft / Large Signage (100 DPI)', dpi: 100 },
  { label: 'Good Home Print (150 DPI)', dpi: 150 },
  { label: 'Standard Lab Photo (300 DPI)', dpi: 300 },
  { label: 'Fine Art / Gallery (600 DPI)', dpi: 600 },
]

export const STANDARD_PRINT_SIZES = [
  { label: '4 × 6" (Standard Photo)', wIn: 4, hIn: 6, wCm: 10.2, hCm: 15.2 },
  { label: '5 × 7" (Greeting Card / Frame)', wIn: 5, hIn: 7, wCm: 12.7, hCm: 17.8 },
  { label: '8 × 10" (Portrait)', wIn: 8, hIn: 10, wCm: 20.3, hCm: 25.4 },
  { label: '11 × 14" (Wall Photo)', wIn: 11, hIn: 14, wCm: 27.9, hCm: 35.6 },
  { label: '16 × 20" (Small Poster)', wIn: 16, hIn: 20, wCm: 40.6, hCm: 50.8 },
  { label: '24 × 36" (Large Poster)', wIn: 24, hIn: 36, wCm: 61, hCm: 91.4 },
  { label: 'A4 (210 × 297 mm)', wIn: 8.27, hIn: 11.69, wCm: 21, hCm: 29.7 },
  { label: 'A3 (297 × 420 mm)', wIn: 11.69, hIn: 16.54, wCm: 29.7, hCm: 42 },
]

export function printSizeFromPixels(pixelWidth, pixelHeight, dpi) {
  return {
    widthIn: pixelWidth / (dpi || 1),
    heightIn: pixelHeight / (dpi || 1),
  }
}

export function pixelsNeededForPrint(printWidthIn, printHeightIn, dpi) {
  return {
    widthPx: Math.ceil(printWidthIn * dpi),
    heightPx: Math.ceil(printHeightIn * dpi),
  }
}

export function dpiFromPixelsAndSize(pixelWidth, pixelHeight, printWidthIn, printHeightIn) {
  return {
    dpiWidth: pixelWidth / (printWidthIn || 1),
    dpiHeight: pixelHeight / (printHeightIn || 1),
  }
}

export function optimalDpiForDistance(distanceFeet) {
  const distanceInches = distanceFeet * 12
  if (distanceInches <= 0) return 300
  // Human visual acuity threshold (~1 arcminute resolution)
  const dpi = Math.round(3438 / distanceInches)
  return Math.max(15, Math.min(1200, dpi))
}

export function inToCm(inches) {
  return inches * 2.54
}

export function cmToIn(cm) {
  return cm / 2.54
}
