import { NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme.js'

const NAV_ITEMS = [
  { to: '/', label: 'All Upkarans', end: true },
  { to: '/ruler', label: 'Screen Ruler' },
  { to: '/password-checker', label: 'Password Checker' },
  { to: '/calorie-calculator', label: 'Calorie Calculator' },
]

export default function Layout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--panel-bg)',
          borderBottom: '1px solid var(--panel-border)',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <span style={{ fontSize: 18 }} aria-hidden="true"><img src="src/images/logo-transparent-svg.svg" alt="OnlineUpkaran" /></span>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, color: 'var(--ink)' }}>
            FREE Online Upkarans
          </span>
        </NavLink>

        <nav style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                textDecoration: 'none',
                background: isActive ? 'var(--btn-active-bg)' : 'transparent',
                color: isActive ? 'var(--btn-active-ink)' : 'var(--ink-dim)',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={toggleTheme}
          style={{
            border: '1px solid var(--panel-border)',
            background: 'var(--btn-idle-bg)',
            color: 'var(--ink)',
            borderRadius: 6,
            padding: '8px 12px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--panel-border)',
          padding: '24px',
          fontSize: 11,
          color: 'var(--ink-faint)',
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        <div>Free Upkarans — no signup, no tracking required to use any upkaran.</div>
        <div style={{ marginTop: 4 }}>
          Some recommendations on this site are affiliate links — if you buy
          through them we may earn a commission at no extra cost to you.
        </div>
      </footer>
    </div>
  )
}
