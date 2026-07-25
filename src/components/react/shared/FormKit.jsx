export function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, fontWeight: 700, color: 'var(--ink-dim)' }}>
      {label}
      {children}
    </label>
  )
}

export function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 10 }}>
      {children}
    </div>
  )
}

export function ResultCard({ label, value, sub, highlight }) {
  return (
    <div
      style={{
        padding: '18px 20px',
        borderRadius: 14,
        border: `1px solid ${highlight ? 'var(--accent)' : 'var(--panel-border)'}`,
        background: highlight ? 'var(--accent-light)' : 'var(--panel-bg)',
        backdropFilter: 'blur(10px)',
        boxShadow: highlight ? 'var(--glow-accent)' : 'none',
        transition: 'all 200ms ease',
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase', color: highlight ? 'var(--accent)' : 'var(--ink-faint)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: highlight ? 'var(--ink)' : 'var(--ink)', fontFamily: 'var(--font-mono)' }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--ink-dim)', marginTop: 4, fontWeight: 500 }}>{sub}</div>}
    </div>
  )
}

export const inputStyle = {
  padding: '12px 16px',
  borderRadius: 10,
  border: '1px solid var(--panel-border)',
  background: 'var(--panel-bg)',
  color: 'var(--ink)',
  fontSize: 14,
  fontFamily: 'var(--font-mono)',
  width: '100%',
  outline: 'none',
  transition: 'border-color 150ms ease, box-shadow 150ms ease',
}

export const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
}

export const primaryBtn = {
  padding: '12px 24px',
  borderRadius: 10,
  border: 'none',
  background: 'var(--accent)',
  color: '#ffffff',
  fontWeight: 800,
  fontSize: 14,
  cursor: 'pointer',
  boxShadow: 'var(--glow-accent)',
  transition: 'all 150ms ease',
}

export const secondaryBtn = {
  padding: '12px 24px',
  borderRadius: 10,
  border: '1px solid var(--panel-border)',
  background: 'var(--btn-idle-bg)',
  color: 'var(--ink)',
  fontWeight: 700,
  fontSize: 14,
  cursor: 'pointer',
  transition: 'all 150ms ease',
}

export const segBtn = (active) => ({
  padding: '10px 18px',
  borderRadius: 8,
  border: 'none',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  background: active ? 'var(--accent)' : 'var(--btn-idle-bg)',
  color: active ? '#ffffff' : 'var(--ink-dim)',
  boxShadow: active ? 'var(--glow-accent)' : 'none',
  transition: 'all 150ms ease',
})

export const textareaStyle = {
  ...inputStyle,
  fontFamily: 'var(--font-mono)',
  resize: 'vertical',
  lineHeight: 1.6,
}
