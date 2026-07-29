import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta.js'

const CATEGORIES = [
  {
    heading: 'Design & Photography',
    tools: [
      {
        to: '/ruler',
        icon: '📏',
        name: 'Screen Ruler',
        description: 'Measure real-world objects on your screen at true mm/cm/inch scale — stays accurate even when you zoom.',
      },
      {
        to: '/aspect-ratio-calculator',
        icon: '🖼️',
        name: 'Aspect Ratio & Crop Calculator',
        description: 'Get matching dimensions for any ratio (1:1, 4:5, 9:16...) or calculate a center-crop for your image.',
      },
      {
        to: '/dpi-calculator',
        icon: '🖨️',
        name: 'DPI / PPI Print Size Calculator',
        description: 'Find the max print size your image supports, or how many pixels you need for a target size and quality.',
      },
      {
        to: '/image-resizer',
        icon: '🗜️',
        name: 'Image Compressor & Resizer',
        description: 'Resize and compress an image right in your browser, preview the result, and download it — nothing is uploaded.',
      },
    ],
  },
  {
    heading: 'Security & Health',
    tools: [
      {
        to: '/password-checker',
        icon: '🔒',
        name: 'Password Strength Checker',
        description: 'See how strong a password is and how long it would take to crack — checked 100% in your browser.',
      },
      {
        to: '/calorie-calculator',
        icon: '🍽️',
        name: 'Calorie Calculator',
        description: 'Find your daily calorie needs (TDEE) and a suggested macro split, based on your stats and goal.',
      },
      {
        to: '/pregnancy-calculator',
        icon: '🤰',
        name: 'Pregnancy Due Date & Ovulation Calculator',
        description: 'Estimate your due date, current week of pregnancy, or your next ovulation and fertile window.',
      },
    ],
  },
  {
    heading: 'Developer Tools',
    tools: [
      {
        to: '/regex-tester',
        icon: '⚡',
        name: 'Regex Tester & Cheatsheet',
        description: 'Test regular expressions live with match highlighting, capture groups, and a quick-reference cheatsheet.',
      },
      {
        to: '/data-converter',
        icon: '🔁',
        name: 'JSON ⇄ CSV ⇄ YAML Converter',
        description: 'Convert between the three formats instantly — nothing is uploaded, it all runs in your browser.',
      },
      {
        to: '/qr-code-generator',
        icon: '📱',
        name: 'QR Code Generator',
        description: 'Create customizable QR codes for links, Wi-Fi, vCard contacts, email & text with high-res PNG & SVG downloads.',
      },
    ],
  },
]

export default function Home() {
  usePageMeta({
    title: 'Free Online Tools — Ruler, Password Checker, Calculator & More',
    description: 'A small collection of free, fast, single-purpose browser tools for design, security, health, and development. No signup, no clutter.',
  })

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 20px 60px' }}>
      <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 800, color: 'var(--ink)', marginBottom: 12 }}>
        Small tools. No signup. Fast.
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-dim)', lineHeight: 1.6, marginBottom: 40, maxWidth: 580 }}>
        Each tool below solves exactly one problem and does it well. Pick
        one to get started.
      </p>

      {CATEGORIES.map((category) => (
        <div key={category.heading} style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'var(--ink-faint)', marginBottom: 12 }}>
            {category.heading.toUpperCase()}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {category.tools.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: '18px 20px',
                  borderRadius: 12,
                  border: '1px solid var(--panel-border)',
                  background: 'var(--panel-bg)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontSize: 26 }} aria-hidden="true">{tool.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>{tool.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5 }}>{tool.description}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>
                  Open →
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
