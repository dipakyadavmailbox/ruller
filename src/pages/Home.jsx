import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta.js'

const UPKARANS = [
  {
    to: '/ruler',
    icon: '📏',
    name: 'Screen Ruler',
    description: 'Measure real-world objects directly on your screen, calibrated to true mm/cm/inch scale — stays accurate even when you zoom.',
  },
  {
    to: '/password-checker',
    icon: '🔒',
    name: 'Password Strength Checker',
    description: 'Instantly see how strong a password is and how long it would take to crack — checked 100% in your browser, nothing sent anywhere.',
  },
  {
    to: '/calorie-calculator',
    icon: '🍽️',
    name: 'Calorie Calculator',
    description: 'Find your daily calorie needs (TDEE) and a suggested macro split, based on your body stats, activity level, and goal.',
  },
]

export default function Home() {
  usePageMeta({
    title: 'Free Online Upkarans — Ruler, Password Checker, Calorie Calculator',
    description: 'A small collection of free, fast, single-purpose browser upkarans. No signup, no clutter.',
  })

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '56px 20px 60px' }}>
      <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
        Small upkarans. No signup. Fast.
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-dim)', lineHeight: 1.6, marginBottom: 36, maxWidth: 560 }}>
        Each tool below solves exactly one problem and does it well. Pick
        one to get started.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {UPKARANS.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              padding: '20px 22px',
              borderRadius: 12,
              border: '1px solid var(--panel-border)',
              background: 'var(--panel-bg)',
              textDecoration: 'none',
            }}
          >
            <span style={{ fontSize: 28 }} aria-hidden="true">{tool.icon}</span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>{tool.name}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5 }}>{tool.description}</div>
            </div>
            <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>
              Open →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
