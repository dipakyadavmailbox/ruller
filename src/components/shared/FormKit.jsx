export function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5, fontWeight: 700, color: 'var(--ink-faint)' }}>
      {label}
      {children}
    </label>
  )
}

export function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 10 }}>
      {children}
    </div>
  )
}

export function ResultCard({ label, value, sub, highlight }) {
  return (
    <div
      style={{
        padding: '16px 16px',
        borderRadius: 10,
        border: `1px solid ${highlight ? 'var(--accent)' : 'var(--panel-border)'}`,
        background: 'var(--panel-bg)',
      }}
    >
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.5, color: 'var(--ink-faint)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color: highlight ? 'var(--accent)' : 'var(--ink)' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--ink-dim)', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

export const inputStyle = {
  padding: '10px 12px',
  borderRadius: 6,
  border: '1px solid var(--panel-border)',
  background: 'var(--panel-bg)',
  color: 'var(--ink)',
  fontSize: 13,
  width: '100%',
}

export const selectStyle = { ...inputStyle }

export const primaryBtn = {
  padding: '10px 20px',
  borderRadius: 6,
  border: 'none',
  background: 'var(--btn-active-bg)',
  color: 'var(--btn-active-ink)',
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer',
}

export const secondaryBtn = {
  padding: '10px 20px',
  borderRadius: 6,
  border: '1px solid var(--panel-border)',
  background: 'transparent',
  color: 'var(--ink)',
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer',
}

export const segBtn = (active) => ({
  padding: '8px 16px',
  borderRadius: 6,
  border: 'none',
  fontSize: 12,
  fontWeight: 700,
  cursor: 'pointer',
  background: active ? 'var(--btn-active-bg)' : 'var(--btn-idle-bg)',
  color: active ? 'var(--btn-active-ink)' : 'var(--btn-idle-ink)',
})

export const textareaStyle = {
  ...inputStyle,
  fontFamily: 'var(--font-mono)',
  resize: 'vertical',
  lineHeight: 1.5,
}
