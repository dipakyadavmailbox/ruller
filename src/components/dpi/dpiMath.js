export const QUALITY_PRESETS = [
  { label: 'Draft / large signage (100 DPI)', dpi: 100 },
  { label: 'Good (150 DPI)', dpi: 150 },
  { label: 'Standard photo print (300 DPI)', dpi: 300 },
  { label: 'Fine art / gallery (600 DPI)', dpi: 600 },
]

export function printSizeFromPixels(pixelWidth, pixelHeight, dpi) {
  return {
    widthIn: pixelWidth / dpi,
    heightIn: pixelHeight / dpi,
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
    dpiWidth: pixelWidth / printWidthIn,
    dpiHeight: pixelHeight / printHeightIn,
  }
}

export function inToCm(inches) {
  return inches * 2.54
}
export function cmToIn(cm) {
  return cm / 2.54
}
