import { useState } from 'react'
import ConvertTab from './ConvertTab.jsx'
import MergeTab   from './MergeTab.jsx'
import SplitTab   from './SplitTab.jsx'

const TABS = [
  { id: 'convert', label: '🖼️ Convert', sublabel: 'Images → PDF'  },
  { id: 'merge',   label: '🔗 Merge',   sublabel: 'Combine PDFs'  },
  { id: 'split',   label: '✂️ Split',    sublabel: 'Extract Pages' },
]

export default function PdfTools() {
  const [activeTab, setActiveTab] = useState('convert')

  return (
    <div style={{ maxWidth: '900px', margin: '24px auto 40px', padding: '0 20px' }}>
      {/* ─── Tab Switcher ───────────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="PDF Tool Tabs"
        style={{
          display:      'flex',
          gap:          '6px',
          marginBottom: '16px',
          background:   'var(--panel-bg)',
          border:       '1px solid var(--panel-border)',
          borderRadius: '14px',
          padding:      '6px',
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex:          1,
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'center',
                gap:           '3px',
                padding:       '10px 8px',
                borderRadius:  '10px',
                border:        isActive ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                background:    isActive ? 'var(--accent-light)' : 'transparent',
                cursor:        'pointer',
                fontFamily:    'var(--font-mono)',
                transition:    'background 150ms ease, border-color 150ms ease',
              }}
            >
              <span style={{
                fontSize:   '13px',
                fontWeight: 700,
                color:      isActive ? 'var(--accent)' : 'var(--ink-dim)',
                transition: 'color 150ms ease',
              }}>
                {tab.label}
              </span>
              <span style={{
                fontSize:      '10px',
                fontWeight:    600,
                color:         isActive ? 'var(--accent)' : 'var(--ink-faint)',
                opacity:       isActive ? 0.8 : 1,
                letterSpacing: '0.3px',
                transition:    'color 150ms ease',
              }}>
                {tab.sublabel}
              </span>
            </button>
          )
        })}
      </div>

      {/* ─── Tab Panel ─────────────────────────────────────────────────────── */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        style={{
          background:   'var(--panel-bg)',
          border:       '1px solid var(--panel-border)',
          borderRadius: '16px',
          padding:      '28px',
        }}
      >
        {activeTab === 'convert' && <ConvertTab />}
        {activeTab === 'merge'   && <MergeTab />}
        {activeTab === 'split'   && <SplitTab />}
      </div>

      {/* ─── Privacy note ──────────────────────────────────────────────────── */}
      <p style={{
        textAlign:  'center',
        fontSize:   '12px',
        color:      'var(--ink-faint)',
        marginTop:  '12px',
        marginBottom: 0,
      }}>
        🔒 All PDF processing happens <strong>100% in your browser</strong> — no files are uploaded anywhere.
      </p>
    </div>
  )
}
