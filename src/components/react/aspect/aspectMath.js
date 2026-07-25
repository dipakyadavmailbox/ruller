export const COMMON_RATIOS = [
  { label: '1:1 (Square)', w: 1, h: 1, category: 'General' },
  { label: '4:5 (Instagram portrait)', w: 4, h: 5, category: 'Social' },
  { label: '9:16 (Story / Reels / TikTok)', w: 9, h: 16, category: 'Social' },
  { label: '16:9 (Widescreen / YouTube)', w: 16, h: 9, category: 'Video' },
  { label: '3:2 (Classic photo)', w: 3, h: 2, category: 'Photo' },
  { label: '2:3 (Portrait photo / Pinterest)', w: 2, h: 3, category: 'Social' },
  { label: '4:3 (Standard display)', w: 4, h: 3, category: 'General' },
  { label: '21:9 (Cinematic ultrawide)', w: 21, h: 9, category: 'Video' },
  { label: '3:1 (Twitter/X Header)', w: 3, h: 1, category: 'Social' },
  { label: '4:1 (LinkedIn Banner)', w: 4, h: 1, category: 'Social' },
]

export const PRESET_SIZES = [
  { name: 'Instagram Square Post', w: 1080, h: 1080, ratio: '1:1' },
  { name: 'Instagram Portrait Post', w: 1080, h: 1350, ratio: '4:5' },
  { name: 'Instagram / TikTok Story & Reel', w: 1080, h: 1920, ratio: '9:16' },
  { name: 'YouTube Video & Thumbnail', w: 1920, h: 1080, ratio: '16:9' },
  { name: 'Twitter / X Header Banner', w: 1500, h: 500, ratio: '3:1' },
  { name: 'LinkedIn Cover Photo', w: 1584, h: 396, ratio: '4:1' },
  { name: 'Facebook Cover Photo', w: 820, h: 312, ratio: '16:9' },
  { name: 'Pinterest Standard Pin', w: 1000, h: 1500, ratio: '2:3' },
]

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

export function simplifyRatio(w, h) {
  if (!w || !h) return { w: 1, h: 1 }
  const divisor = gcd(Math.round(w), Math.round(h)) || 1
  return { w: Math.round(w / divisor), h: Math.round(h / divisor) }
}

export function dimensionsForRatio(ratio, knownWidth) {
  const height = (knownWidth * ratio.h) / ratio.w
  return { width: Math.round(knownWidth), height: Math.round(height) }
}

export function heightToWidthForRatio(ratio, knownHeight) {
  const width = (knownHeight * ratio.w) / ratio.h
  return { width: Math.round(width), height: Math.round(knownHeight) }
}

export function centerCropForRatio(originalWidth, originalHeight, ratio) {
  const targetRatioValue = ratio.w / ratio.h
  const originalRatioValue = originalWidth / originalHeight

  let cropWidth, cropHeight
  if (originalRatioValue > targetRatioValue) {
    cropHeight = originalHeight
    cropWidth = originalHeight * targetRatioValue
  } else {
    cropWidth = originalWidth
    cropHeight = originalWidth / targetRatioValue
  }

  cropWidth = Math.round(cropWidth)
  cropHeight = Math.round(cropHeight)
  const offsetX = Math.round((originalWidth - cropWidth) / 2)
  const offsetY = Math.round((originalHeight - cropHeight) / 2)
  const cropPercent = Math.round(((cropWidth * cropHeight) / (originalWidth * originalHeight)) * 100)

  return { cropWidth, cropHeight, offsetX, offsetY, cropPercent }
}
