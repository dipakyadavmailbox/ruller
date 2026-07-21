import { useCallback, useEffect, useRef, useState } from 'react'
import { DEFAULT_PPI } from '../units.js'

const STORAGE_KEY = 'fixed-ruler:calibration'
const POLL_MS = 150

function readStoredCalibration() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed.ppi === 'number' && typeof parsed.basePixelRatio === 'number') {
      return parsed
    }
  } catch {
    // ignore corrupted storage
  }
  return null
}

/**
 * Tracks the screen's true pixels-per-inch, calibrated once against a real
 * physical object, and keeps the ruler's PHYSICAL size fixed regardless of
 * browser zoom or pan.
 *
 * Why the ruler must shrink its CSS-pixel spacing as zoom increases:
 * browser zoom makes every CSS pixel occupy more physical screen space
 * (that's what "zooming in" means). So if we kept drawing, say, 96 CSS px
 * per inch at every zoom level, that same 96px box would cover MORE than a
 * physical inch once zoomed in. To keep the on-screen size constant, the
 * number of CSS px used per physical inch must shrink in inverse proportion
 * to the zoom factor: effectivePPI = calibratedPPI / zoomFactor.
 *
 * Most browsers (Chrome, Edge, Firefox) scale `window.devicePixelRatio`
 * proportionally with page zoom, so we use the ratio of devicePixelRatio
 * now vs. devicePixelRatio at the moment of calibration as that zoom
 * factor. devicePixelRatio has no native "change" event, so we poll it
 * (cheap — it's just a number comparison) instead of relying on
 * matchMedia listeners, which don't fire reliably for this in practice.
 *
 * Panning (scrolling) never changes CSS pixel sizing at all, so it needs
 * no special handling — only zoom does.
 */
export function useCalibratedPPI() {
  const [calibration, setCalibration] = useState(() => readStoredCalibration())
  const [pixelRatio, setPixelRatio] = useState(() => window.devicePixelRatio || 1)
  // Reference point for showing a zoom% even before the user calibrates,
  // so "100%" always means "the zoom level the page happened to load at".
  const loadPixelRatioRef = useRef(window.devicePixelRatio || 1)

  useEffect(() => {
    let lastRatio = window.devicePixelRatio || 1
    const interval = setInterval(() => {
      const current = window.devicePixelRatio || 1
      if (current !== lastRatio) {
        lastRatio = current
        setPixelRatio(current)
      }
    }, POLL_MS)

    // Resize also catches most zoom changes instantly (no need to wait for
    // the next poll tick), so the ruler responds without visible lag.
    const onResize = () => setPixelRatio(window.devicePixelRatio || 1)
    window.addEventListener('resize', onResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const saveCalibration = useCallback((ppi) => {
    const basePixelRatio = window.devicePixelRatio || 1
    const next = { ppi, basePixelRatio }
    setCalibration(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // storage unavailable (private mode, etc.) — calibration still works
      // for this session, it just won't persist.
    }
  }, [])

  const clearCalibration = useCallback(() => {
    setCalibration(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  const isCalibrated = !!calibration
  const baselineRatio = isCalibrated ? calibration.basePixelRatio : loadPixelRatioRef.current
  const zoomFactor = pixelRatio / baselineRatio
  const basePPI = isCalibrated ? calibration.ppi : DEFAULT_PPI

  // Divide, not multiply: this is what keeps the ruler's physical size
  // fixed as the person zooms in or out.
  const effectivePPI = basePPI / zoomFactor
  const zoomPercent = Math.round(zoomFactor * 100)

  return {
    isCalibrated,
    effectivePPI,
    rawPPI: basePPI,
    zoomPercent,
    saveCalibration,
    clearCalibration,
  }
}
