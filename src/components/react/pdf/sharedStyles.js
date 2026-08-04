// ─── Shared inline style constants used across PDF tab components ─────────────
// These reference CSS custom properties that are resolved at browser runtime.

export const dropZoneStyle = {
  display:        'flex',
  flexDirection:  'column',
  alignItems:     'center',
  justifyContent: 'center',
  gap:            '10px',
  padding:        '40px 20px',
  border:         '2px dashed',
  borderRadius:   '14px',
  cursor:         'pointer',
  marginBottom:   '16px',
  transition:     'border-color 150ms ease, background 150ms ease',
  userSelect:     'none',
  minHeight:      '160px',
}

export const fileListStyle = {
  listStyle:     'none',
  padding:       0,
  margin:        '0 0 16px',
  display:       'flex',
  flexDirection: 'column',
  gap:           '8px',
}

export const fileItemStyle = {
  display:    'flex',
  alignItems: 'center',
  gap:        '12px',
  padding:    '10px 14px',
  background: 'var(--panel-bg)',
  border:     '1px solid var(--panel-border)',
  borderRadius: '10px',
}

export const iconBtnStyle = {
  padding:      '5px 9px',
  border:       '1px solid var(--panel-border)',
  borderRadius: '6px',
  background:   'var(--btn-idle-bg)',
  color:        'var(--ink)',
  cursor:       'pointer',
  fontSize:     '12px',
  fontFamily:   'var(--font-mono)',
  lineHeight:   1,
  transition:   'border-color 120ms ease',
}

export const iconBtnDangerStyle = {
  ...iconBtnStyle,
  color: '#ef4444',
}

export const actionBtnStyle = {
  display:      'block',
  width:        '100%',
  padding:      '13px',
  borderRadius: '12px',
  border:       'none',
  background:   'var(--accent)',
  color:        '#fff',
  fontSize:     '14px',
  fontWeight:   800,
  fontFamily:   'var(--font-mono)',
  cursor:       'pointer',
  transition:   'opacity 150ms ease, transform 100ms ease',
  marginTop:    '20px',
}

export const errorStyle = {
  color:        '#ef4444',
  fontSize:     '13px',
  background:   'rgba(239,68,68,0.08)',
  border:       '1px solid rgba(239,68,68,0.2)',
  borderRadius: '8px',
  padding:      '10px 14px',
  margin:       '12px 0 0',
  lineHeight:   1.5,
}

export const descStyle = {
  color:        'var(--ink-dim)',
  fontSize:     '14px',
  lineHeight:   1.6,
  marginBottom: '16px',
  marginTop:    0,
}

export const fileNameStyle = {
  fontSize:     '13px',
  fontWeight:   700,
  color:        'var(--ink)',
  whiteSpace:   'nowrap',
  overflow:     'hidden',
  textOverflow: 'ellipsis',
  maxWidth:     '220px',
}

export const fileMetaStyle = {
  fontSize: '11px',
  color:    'var(--ink-faint)',
  marginTop: '2px',
}
