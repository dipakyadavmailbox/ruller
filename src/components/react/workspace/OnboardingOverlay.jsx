import { useState, useCallback, useRef, useEffect } from 'react'

// ─── OnboardingOverlay — 5-step spotlight tour for first-time visitors ─────────

const STEPS = [
  {
    target:   '#workspace-drop-zone',
    title:    'Drop any file here',
    body:     'Drag a PDF, image, JSON, CSV, or YAML onto this zone. We auto-detect the type and suggest the right tool instantly — no guessing required.',
    position: 'bottom',
  },
  {
    target:   '#workspace-search-btn',
    title:    'Launch any tool instantly',
    body:     'Press ⌘K (or Ctrl+K) to open the search palette. Type any keyword — "pdf", "color", "convert" — and navigate in under a second.',
    position: 'bottom',
  },
  {
    target:   '.ws-sidebar',
    title:    'Pin your favorite tools',
    body:     'Click the 📌 icon on any tool card to pin it here. Your pinned tools persist across sessions — no setup needed each time.',
    position: 'right',
  },
  {
    target:   '.ws-recent-panel',
    title:    'Your history stays private',
    body:     'Every file you drop is remembered here by name only. Zero bytes uploaded. Everything lives in your browser, completely private.',
    position: 'left',
  },
  {
    target:   '#tool-grid-root',
    title:    '14 tools, one workspace',
    body:     'Browse all tools by category. Each one runs 100% in your browser with no tracking, no sign-up, and no ads. This is your space.',
    position: 'top',
  },
]

export default function OnboardingOverlay({ onDismiss }) {
  const [step,    setStep]    = useState(0)
  const [tooltip, setTooltip] = useState(null)
  const [visible, setVisible] = useState(true)
  const overlayRef = useRef(null)

  // Position tooltip near the spotlight target
  const positionTooltip = useCallback((stepIdx) => {
    const s        = STEPS[stepIdx]
    const el       = document.querySelector(s.target)
    if (!el) {
      setTooltip({ top: '30%', left: '50%', transform: 'translateX(-50%)' })
      return
    }
    const rect = el.getBoundingClientRect()
    const PAD  = 16
    let style  = {}

    if (s.position === 'bottom') {
      style = { top: rect.bottom + PAD + window.scrollY, left: rect.left + rect.width / 2, transform: 'translateX(-50%)' }
    } else if (s.position === 'top') {
      style = { top: rect.top + window.scrollY - PAD - 200, left: rect.left + rect.width / 2, transform: 'translateX(-50%)' }
    } else if (s.position === 'right') {
      style = { top: rect.top + window.scrollY + rect.height / 2 - 80, left: rect.right + PAD }
    } else if (s.position === 'left') {
      style = { top: rect.top + window.scrollY + rect.height / 2 - 80, left: rect.left - 300 - PAD }
    }

    // Clamp to viewport
    if (typeof style.left === 'number') {
      style.left = Math.max(16, Math.min(style.left, window.innerWidth - 316))
    }
    setTooltip(style)
  }, [])

  // Apply/remove spotlight class
  const applySpotlight = useCallback((stepIdx) => {
    // Remove all previous spotlight classes
    document.querySelectorAll('.ws-spotlight').forEach((el) => {
      el.classList.remove('ws-spotlight')
    })
    const el = document.querySelector(STEPS[stepIdx].target)
    if (el) el.classList.add('ws-spotlight')
    positionTooltip(stepIdx)
  }, [positionTooltip])

  useEffect(() => {
    applySpotlight(step)
  }, [step, applySpotlight])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.querySelectorAll('.ws-spotlight').forEach((el) => {
        el.classList.remove('ws-spotlight')
      })
    }
  }, [])

  // Escape key handler
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const goNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      complete()
    }
  }
  const goBack = () => { if (step > 0) setStep(step - 1) }

  const dismiss = () => {
    complete()
  }

  const complete = () => {
    document.querySelectorAll('.ws-spotlight').forEach((el) => el.classList.remove('ws-spotlight'))
    try { localStorage.setItem('rkt:onboardingDone', 'true') } catch {}
    setVisible(false)
    onDismiss?.()
  }

  if (!visible) return null

  return (
    <>
      {/* Spotlight CSS */}
      <style>{`
        .ws-spotlight {
          position: relative;
          z-index: 10001 !important;
          box-shadow: 0 0 0 9999px rgba(0,0,0,0.68) !important;
          border-radius: 12px;
          outline: 2px solid rgba(99,102,241,0.8);
          outline-offset: 4px;
          pointer-events: none;
        }
        @keyframes onboardFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ws-onboard-tooltip { animation: none !important; }
        }
      `}</style>

      {/* Dim overlay (behind spotlight elements) */}
      <div
        ref={overlayRef}
        style={styles.overlay}
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Tooltip card */}
      {tooltip && (
        <div
          className="ws-onboard-tooltip"
          role="dialog"
          aria-modal="true"
          aria-label={`Onboarding step ${step + 1} of ${STEPS.length}: ${STEPS[step].title}`}
          style={{ ...styles.tooltip, ...tooltip }}
        >
          {/* Progress dots */}
          <div style={styles.dots} aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            {STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.dot,
                  width:      i === step ? 20 : 6,
                  background: i === step ? 'var(--accent)' : 'var(--panel-border)',
                }}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Content */}
          <div style={styles.stepLabel}>Step {step + 1} of {STEPS.length}</div>
          <div style={styles.title}>{STEPS[step].title}</div>
          <div style={styles.body}>{STEPS[step].body}</div>

          {/* Buttons */}
          <div style={styles.actions}>
            <button
              onClick={dismiss}
              style={styles.skipBtn}
              aria-label="Skip tour"
            >
              Skip tour
            </button>
            <div style={{ display: 'flex', gap: 6 }}>
              {step > 0 && (
                <button onClick={goBack} style={styles.backBtn} aria-label="Previous step">
                  ← Back
                </button>
              )}
              <button
                id={`onboard-next-step-${step}`}
                onClick={goNext}
                style={styles.nextBtn}
                aria-label={step < STEPS.length - 1 ? 'Next step' : 'Finish tour'}
              >
                {step < STEPS.length - 1 ? 'Next →' : '✓ Got it'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.68)',
    zIndex: 10000,
    cursor: 'pointer',
  },
  tooltip: {
    position: 'fixed',
    width: 300,
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 16,
    padding: '18px 20px 16px',
    boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5), var(--glow-accent)',
    zIndex: 10002,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    animation: 'onboardFadeIn 250ms ease-out',
  },
  dots: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 10,
    transition: 'width 200ms ease, background 200ms ease',
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.8px',
    color: 'var(--ink-faint)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 15,
    fontWeight: 900,
    color: 'var(--ink)',
    lineHeight: 1.2,
    letterSpacing: '-0.2px',
  },
  body: {
    fontSize: 13,
    color: 'var(--ink-dim)',
    lineHeight: 1.6,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  skipBtn: {
    border: 'none',
    background: 'transparent',
    color: 'var(--ink-faint)',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
    textDecoration: 'underline',
    textDecorationStyle: 'dotted',
    padding: '4px 0',
  },
  backBtn: {
    padding: '7px 14px',
    border: '1px solid var(--panel-border)',
    borderRadius: 9,
    background: 'var(--btn-idle-bg)',
    color: 'var(--ink-dim)',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
  },
  nextBtn: {
    padding: '7px 18px',
    border: 'none',
    borderRadius: 9,
    background: 'var(--accent)',
    color: '#fff',
    fontSize: 12,
    fontWeight: 800,
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
  },
}
