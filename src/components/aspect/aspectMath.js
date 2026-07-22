export const COMMON_RATIOS = [
  { label: '1:1 (Square)', w: 1, h: 1 },
  { label: '4:5 (Instagram portrait)', w: 4, h: 5 },
  { label: '9:16 (Story / Reels / TikTok)', w: 9, h: 16 },
  { label: '16:9 (Widescreen / YouTube)', w: 16, h: 9 },
  { label: '3:2 (Classic photo)', w: 3, h: 2 },
  { label: '2:3 (Portrait photo)', w: 2, h: 3 },
  { label: '4:3 (Standard)', w: 4, h: 3 },
  { label: '21:9 (Cinematic)', w: 21, h: 9 },
]

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b)
}

export function simplifyRatio(w, h) {
  const divisor = gcd(Math.round(w), Math.round(h)) || 1
  return { w: Math.round(w / divisor), h: Math.round(h / divisor) }
}

export function dimensionsForRatio(ratio, knownWidth) {
  const height = (knownWidth * ratio.h) / ratio.w
  return { width: Math.round(knownWidth), height: Math.round(height) }
}

/**
 * Center-crop math: given an original image size and a target ratio,
 * returns the largest crop of that ratio that fits centered inside the
 * original image, plus its offset from the top-left corner.
 */
export function centerCropForRatio(originalWidth, originalHeight, ratio) {
  const targetRatioValue = ratio.w / ratio.h
  const originalRatioValue = originalWidth / originalHeight

  let cropWidth, cropHeight
  if (originalRatioValue > targetRatioValue) {
    // original is wider than target — crop the sides
    cropHeight = originalHeight
    cropWidth = originalHeight * targetRatioValue
  } else {
    // original is taller than target — crop top/bottom
    cropWidth = originalWidth
    cropHeight = originalWidth / targetRatioValue
  }

  cropWidth = Math.round(cropWidth)
  cropHeight = Math.round(cropHeight)
  const offsetX = Math.round((originalWidth - cropWidth) / 2)
  const offsetY = Math.round((originalHeight - cropHeight) / 2)

  return { cropWidth, cropHeight, offsetX, offsetY }
}
