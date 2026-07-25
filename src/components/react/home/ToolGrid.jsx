import { useMemo, useState } from 'react'
import { CATEGORIES } from '../../../data/tools.js'

export default function ToolGrid() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categoryHeadings = useMemo(() => ['All', ...CATEGORIES.map((c) => c.heading)], [])

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase()
    return CATEGORIES.map((cat) => {
      if (selectedCategory !== 'All' && cat.heading !== selectedCategory) return null
      const tools = cat.tools.filter((t) => {
        if (!query) return true
        return (
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.navLabel.toLowerCase().includes(query)
        )
      })
      if (tools.length === 0) return null
      return { ...cat, tools }
    }).filter(Boolean)
  }, [search, selectedCategory])

  const totalFilteredCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.tools.length, 0)
  }, [filteredCategories])

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px 80px' }}>
      {/* Live Search & Category Filter Pills */}
      <div style={{ marginBottom: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search any tool (e.g. Ruler, Password, Calorie, Regex, Converter...)"
            style={{
              width: '100%',
              padding: '16px 20px 16px 48px',
              fontSize: 16,
              borderRadius: 14,
              border: '1px solid var(--panel-border)',
              background: 'var(--panel-bg)',
              color: 'var(--ink)',
              backdropFilter: 'blur(12px)',
              boxShadow: 'var(--shadow-lg)',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--ink-faint)',
                fontSize: 18,
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {categoryHeadings.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                border: selectedCategory === cat ? '1px solid var(--accent)' : '1px solid var(--panel-border)',
                background: selectedCategory === cat ? 'var(--accent-light)' : 'var(--panel-bg)',
                color: selectedCategory === cat ? 'var(--accent)' : 'var(--ink-dim)',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              {cat}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: 'var(--ink-faint)' }}>
            Showing {totalFilteredCount} tool{totalFilteredCount === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Filtered Tool Grid */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <div key={category.heading} style={{ marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
              {category.heading}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 18 }}>
              {category.tools.map((tool) => (
                <a
                  key={tool.slug}
                  href={tool.slug}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                    padding: '22px 24px',
                    borderRadius: 16,
                    border: '1px solid var(--panel-border)',
                    background: 'var(--panel-bg)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'var(--shadow-lg)',
                    textDecoration: 'none',
                    transition: 'all 180ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="tool-hover-card"
                >
                  <div
                    style={{
                      fontSize: 28,
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'var(--btn-idle-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {tool.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>{tool.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent)' }}>Open →</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5, margin: 0 }}>{tool.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--panel-bg)', borderRadius: 16, border: '1px solid var(--panel-border)' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 6 }}>No matching tools found</h3>
          <p style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 20 }}>Try searching for a different keyword or select another category.</p>
          <button onClick={() => { setSearch(''); setSelectedCategory('All') }} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
