export default function SegButton({ active, onClick, children, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '8px 10px',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.5,
        borderRadius: 6,
        border: 'none',
        cursor: 'pointer',
        background: active ? 'var(--btn-active-bg)' : 'var(--btn-idle-bg)',
        color: active ? 'var(--btn-active-ink)' : 'var(--btn-idle-ink)',
        transition: 'background 120ms ease, color 120ms ease',
      }}
    >
      {icon}
      {children}
    </button>
  )
}
