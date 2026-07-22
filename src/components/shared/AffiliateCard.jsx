/**
 * A placeholder affiliate recommendation block. Swap `items` for your real
 * affiliate links/programs — the layout, disclosure, and styling stay the
 * same. Keeping this as one shared component means updating your affiliate
 * strategy later only touches one file.
 */
export default function AffiliateCard({ heading, items }) {
  return (
    <section
      style={{
        marginTop: 40,
        padding: 20,
        borderRadius: 12,
        border: '1px solid var(--panel-border)',
        background: 'var(--panel-bg)',
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: 'var(--ink-faint)', marginBottom: 12 }}>
        {heading}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: 8,
              background: 'var(--btn-idle-bg)',
              textDecoration: 'none',
              color: 'var(--ink)',
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{item.name}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-dim)', marginTop: 2 }}>{item.blurb}</div>
            </div>
            <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 12 }}>
              {item.cta ?? 'View →'}
            </span>
          </a>
        ))}
      </div>
      <div style={{ fontSize: 10, color: 'var(--ink-faint)', marginTop: 12 }}>
        Affiliate disclosure: links above may earn us a commission — this
        never affects the calculation results above.
      </div>
    </section>
  )
}
