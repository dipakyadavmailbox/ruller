import { useState, useEffect, useRef, useMemo } from 'react'
import { generateQrMatrix, drawQrToCanvas, generateQrSvgString } from './qrcode-engine.js'

const MODES = [
  { id: 'url', label: '🔗 Link / Text', icon: '🌐' },
  { id: 'wifi', label: '📶 Wi-Fi Network', icon: '📶' },
  { id: 'vcard', label: '📇 Contact (vCard)', icon: '👤' },
  { id: 'email', label: '✉️ Email', icon: '✉️' },
  { id: 'sms', label: '💬 Phone / SMS', icon: '📱' },
]

const PRESET_THEMES = [
  { name: 'Classic Dark', fg: '#0f172a', bg: '#ffffff' },
  { name: 'Cyber Blue', fg: '#2563eb', bg: '#f8fafc' },
  { name: 'Emerald Clean', fg: '#059669', bg: '#ecfdf5' },
  { name: 'Sunset Crimson', fg: '#dc2626', bg: '#fff1f2' },
  { name: 'Purple Night', fg: '#7c3aed', bg: '#f5f3ff' },
  { name: 'High Contrast Dark', fg: '#38bdf8', bg: '#0f172a' },
]

export default function QrCodeGenerator() {
  const [activeMode, setActiveMode] = useState('url')

  // Data Inputs
  const [urlInput, setUrlInput] = useState('https://rockingtools.com')

  const [wifiSsid, setWifiSsid] = useState('MyHomeWiFi')
  const [wifiPassword, setWifiPassword] = useState('SecretPass123')
  const [wifiEncryption, setWifiEncryption] = useState('WPA')
  const [wifiHidden, setWifiHidden] = useState(false)

  const [vcardName, setVcardName] = useState('Alex Morgan')
  const [vcardPhone, setVcardPhone] = useState('+1 555 019 2831')
  const [vcardEmail, setVcardEmail] = useState('alex@example.com')
  const [vcardCompany, setVcardCompany] = useState('Rocking Tools Inc')
  const [vcardTitle, setVcardTitle] = useState('Lead Engineer')
  const [vcardUrl, setVcardUrl] = useState('https://rockingtools.com')

  const [emailTo, setEmailTo] = useState('support@rockingtools.com')
  const [emailSubject, setEmailSubject] = useState('Inquiry from QR Code')
  const [emailBody, setEmailBody] = useState('Hello Team,\n\nI scanned your QR code!')

  const [phoneNum, setPhoneNum] = useState('+15550192831')
  const [smsBody, setSmsBody] = useState('Hello! Sent via QR code scan.')

  // Customization State
  const [fgColor, setFgColor] = useState('#0f172a')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [dotShape, setDotShape] = useState('rounded') // square | rounded | dots
  const [margin, setMargin] = useState(4)
  const [ecLevel, setEcLevel] = useState('M') // L | M | Q | H
  const [downloadSize, setDownloadSize] = useState(500)
  const [centerLogo, setCenterLogo] = useState('')

  const [copiedToast, setCopiedToast] = useState('')
  const canvasRef = useRef(null)

  // Compute final payload string based on mode
  const payloadString = useMemo(() => {
    switch (activeMode) {
      case 'url':
        return urlInput.trim() || 'https://rockingtools.com'
      case 'wifi': {
        const ssid = wifiSsid.trim()
        const pass = wifiEncryption === 'nopass' ? '' : wifiPassword
        const enc = wifiEncryption === 'nopass' ? 'nopass' : wifiEncryption
        const hiddenStr = wifiHidden ? 'H:true;' : ''
        return `WIFI:S:${ssid};T:${enc};P:${pass};${hiddenStr};`
      }
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:;${vcardName};;;\nFN:${vcardName}\nORG:${vcardCompany}\nTITLE:${vcardTitle}\nTEL;TYPE=CELL:${vcardPhone}\nEMAIL:${vcardEmail}\nURL:${vcardUrl}\nEND:VCARD`
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
      case 'sms':
        return smsBody ? `SMSTO:${phoneNum}:${smsBody}` : `tel:${phoneNum}`
      default:
        return urlInput.trim() || 'https://rockingtools.com'
    }
  }, [
    activeMode,
    urlInput,
    wifiSsid,
    wifiPassword,
    wifiEncryption,
    wifiHidden,
    vcardName,
    vcardPhone,
    vcardEmail,
    vcardCompany,
    vcardTitle,
    vcardUrl,
    emailTo,
    emailSubject,
    emailBody,
    phoneNum,
    smsBody,
  ])

  // Automatically boost EC level to H when center logo is enabled to guarantee mobile scannability
  const effectiveEcLevel = useMemo(() => {
    if (centerLogo && (ecLevel === 'L' || ecLevel === 'M')) {
      return 'H'
    }
    return ecLevel
  }, [centerLogo, ecLevel])

  // Generate Matrix
  const matrix = useMemo(() => {
    try {
      return generateQrMatrix(payloadString, effectiveEcLevel)
    } catch {
      return generateQrMatrix('https://rockingtools.com', 'M')
    }
  }, [payloadString, effectiveEcLevel])

  // Draw to Canvas whenever options change
  useEffect(() => {
    if (canvasRef.current && matrix) {
      drawQrToCanvas(canvasRef.current, matrix, {
        fgColor,
        bgColor,
        margin,
        dotShape,
        size: 360,
        logoText: centerLogo,
      })
    }
  }, [matrix, fgColor, bgColor, margin, dotShape, centerLogo])

  const showToast = (msg) => {
    setCopiedToast(msg)
    setTimeout(() => setCopiedToast(''), 3000)
  }

  // Export Handlers
  const handleDownloadPng = () => {
    const tempCanvas = document.createElement('canvas')
    drawQrToCanvas(tempCanvas, matrix, {
      fgColor,
      bgColor,
      margin,
      dotShape,
      size: downloadSize,
      logoText: centerLogo,
    })
    const link = document.createElement('a')
    link.download = `qrcode-${activeMode}-${Date.now()}.png`
    link.href = tempCanvas.toDataURL('image/png')
    link.click()
    showToast('✨ PNG image downloaded!')
  }

  const handleDownloadSvg = () => {
    const svgStr = generateQrSvgString(matrix, {
      fgColor,
      bgColor,
      margin,
      dotShape,
      size: downloadSize,
      logoText: centerLogo,
    })
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' })
    const link = document.createElement('a')
    link.download = `qrcode-${activeMode}-${Date.now()}.svg`
    link.href = URL.createObjectURL(blob)
    link.click()
    showToast('✨ SVG vector file downloaded!')
  }

  const handleDownloadWebp = () => {
    const tempCanvas = document.createElement('canvas')
    drawQrToCanvas(tempCanvas, matrix, {
      fgColor,
      bgColor,
      margin,
      dotShape,
      size: downloadSize,
      logoText: centerLogo,
    })
    const link = document.createElement('a')
    link.download = `qrcode-${activeMode}-${Date.now()}.webp`
    link.href = tempCanvas.toDataURL('image/webp')
    link.click()
    showToast('✨ WebP image downloaded!')
  }

  const handleCopySvg = () => {
    const svgStr = generateQrSvgString(matrix, {
      fgColor,
      bgColor,
      margin,
      dotShape,
      size: downloadSize,
      logoText: centerLogo,
    })
    navigator.clipboard.writeText(svgStr)
    showToast('📋 SVG markup copied to clipboard!')
  }

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 20px 60px' }}>
      {/* Toast Banner */}
      {copiedToast && (
        <div style={styles.toast}>
          {copiedToast}
        </div>
      )}

      {/* Main Grid */}
      <div style={styles.containerGrid}>
        {/* Left Control Column */}
        <div style={styles.leftColumn}>
          {/* Mode Selector Tabs */}
          <div style={styles.modeTabs}>
            {MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                style={{
                  ...styles.modeTabBtn,
                  ...(activeMode === mode.id ? styles.modeTabActive : {}),
                }}
              >
                <span>{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Input Panel */}
          <div style={styles.panelCard}>
            <h3 style={styles.cardHeading}>1. Content &amp; Details</h3>

            {activeMode === 'url' && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Website URL or Plain Text</label>
                <textarea
                  rows={4}
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com or enter any message..."
                  style={styles.textarea}
                />
                <span style={styles.hint}>Tip: Enter any web address or freeform text to generate a quick scannable code.</span>
              </div>
            )}

            {activeMode === 'wifi' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Network Name (SSID)</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Security Type</label>
                  <select
                    value={wifiEncryption}
                    onChange={(e) => setWifiEncryption(e.target.value)}
                    style={styles.select}
                  >
                    <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                    <option value="WEP">WEP (Legacy)</option>
                    <option value="nopass">None (Open Network)</option>
                  </select>
                </div>
                {wifiEncryption !== 'nopass' && (
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Wi-Fi Password</label>
                    <input
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                )}
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={wifiHidden}
                    onChange={(e) => setWifiHidden(e.target.checked)}
                  />
                  Hidden Wi-Fi SSID
                </label>
              </div>
            )}

            {activeMode === 'vcard' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input type="text" value={vcardName} onChange={(e) => setVcardName(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input type="text" value={vcardPhone} onChange={(e) => setVcardPhone(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input type="email" value={vcardEmail} onChange={(e) => setVcardEmail(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Company</label>
                  <input type="text" value={vcardCompany} onChange={(e) => setVcardCompany(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Job Title</label>
                  <input type="text" value={vcardTitle} onChange={(e) => setVcardTitle(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Website URL</label>
                  <input type="url" value={vcardUrl} onChange={(e) => setVcardUrl(e.target.value)} style={styles.input} />
                </div>
              </div>
            )}

            {activeMode === 'email' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Recipient Email</label>
                  <input type="email" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Subject Line</label>
                  <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Message Body</label>
                  <textarea rows={3} value={emailBody} onChange={(e) => setEmailBody(e.target.value)} style={styles.textarea} />
                </div>
              </div>
            )}

            {activeMode === 'sms' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input type="tel" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} style={styles.input} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Preset SMS Message (Optional)</label>
                  <textarea rows={3} value={smsBody} onChange={(e) => setSmsBody(e.target.value)} style={styles.textarea} />
                </div>
              </div>
            )}
          </div>

          {/* Styling & Customization Panel */}
          <div style={styles.panelCard}>
            <h3 style={styles.cardHeading}>2. Design &amp; Styling</h3>

            {/* Presets */}
            <div style={{ marginBottom: 18 }}>
              <label style={styles.label}>Color Themes</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PRESET_THEMES.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => {
                      setFgColor(theme.fg)
                      setBgColor(theme.bg)
                    }}
                    style={styles.presetBtn}
                  >
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: theme.fg, display: 'inline-block' }} />
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Foreground Color</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={styles.colorPicker} />
                  <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={styles.input} />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Background Color</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={styles.colorPicker} />
                  <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={styles.input} />
                </div>
              </div>
            </div>

            {/* Shapes & Error Correction */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Dot Style</label>
                <select value={dotShape} onChange={(e) => setDotShape(e.target.value)} style={styles.select}>
                  <option value="square">Square Modules</option>
                  <option value="rounded">Soft Rounded</option>
                  <option value="dots">Circular Dots</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Error Correction Level</label>
                <select value={ecLevel} onChange={(e) => setEcLevel(e.target.value)} style={styles.select}>
                  <option value="L">L — 7% Recovery</option>
                  <option value="M">M — 15% Recovery (Default)</option>
                  <option value="Q">Q — 25% Recovery</option>
                  <option value="H">H — 30% High Resilience</option>
                </select>
              </div>
            </div>

            {/* Center Logo & Margin */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Center Icon / Badge</label>
                <select value={centerLogo} onChange={(e) => setCenterLogo(e.target.value)} style={styles.select}>
                  <option value="">None</option>
                  <option value="🌐">🌐 Web Link</option>
                  <option value="🔒">🔒 Secure</option>
                  <option value="⚡">⚡ Fast</option>
                  <option value="📶">📶 Wi-Fi</option>
                  <option value="✉️">✉️ Mail</option>
                  <option value="📞">📞 Call</option>
                  <option value="💛">💛 Heart</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Export Resolution: {downloadSize}px</label>
                <input
                  type="range"
                  min={300}
                  max={1200}
                  step={50}
                  value={downloadSize}
                  onChange={(e) => setDownloadSize(Number(e.target.value))}
                  style={{ width: '100%', marginTop: 8 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Column */}
        <div style={styles.rightColumn}>
          <div style={styles.previewCard}>
            <div style={styles.previewHeader}>
              <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)' }}>LIVE PREVIEW</span>
              <span style={styles.badge}>{activeMode.toUpperCase()}</span>
            </div>

            {/* Canvas Display */}
            <div style={styles.canvasContainer}>
              <canvas ref={canvasRef} style={styles.canvasStyle} />
            </div>

            {/* Download Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 20 }}>
              <button onClick={handleDownloadPng} style={styles.btnPrimary}>
                📥 Download PNG Image ({downloadSize}px)
              </button>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button onClick={handleDownloadSvg} style={styles.btnSecondary}>
                  🎨 Download SVG Vector
                </button>
                <button onClick={handleDownloadWebp} style={styles.btnSecondary}>
                  🖼️ Download WebP
                </button>
              </div>
              <button onClick={handleCopySvg} style={styles.btnOutline}>
                📋 Copy SVG Code to Clipboard
              </button>
            </div>

            <div style={styles.privacyNote}>
              🔒 100% Private — Generated strictly inside your browser window. Zero data sent to any server.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  toast: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    zIndex: 999,
    background: 'var(--accent)',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 14,
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  },
  containerGrid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: 24,
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  modeTabs: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  modeTabBtn: {
    padding: '10px 16px',
    borderRadius: 10,
    border: '1px solid var(--panel-border)',
    background: 'var(--panel-bg)',
    color: 'var(--ink-dim)',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  modeTabActive: {
    border: '1px solid var(--accent)',
    background: 'var(--accent-light)',
    color: 'var(--accent)',
  },
  panelCard: {
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 16,
    padding: 24,
    backdropFilter: 'var(--glass-backdrop)',
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: 800,
    color: 'var(--ink)',
    marginBottom: 16,
    margin: '0 0 16px 0',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--ink-dim)',
  },
  input: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid var(--panel-border)',
    background: 'var(--input-bg, var(--panel-bg))',
    color: 'var(--ink)',
    fontSize: 14,
    outline: 'none',
  },
  textarea: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid var(--panel-border)',
    background: 'var(--input-bg, var(--panel-bg))',
    color: 'var(--ink)',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  select: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid var(--panel-border)',
    background: 'var(--input-bg, var(--panel-bg))',
    color: 'var(--ink)',
    fontSize: 14,
    outline: 'none',
  },
  hint: {
    fontSize: 11,
    color: 'var(--ink-faint)',
  },
  colorPicker: {
    width: 38,
    height: 38,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    padding: 0,
    background: 'none',
  },
  presetBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 12px',
    borderRadius: 20,
    border: '1px solid var(--panel-border)',
    background: 'var(--panel-bg)',
    color: 'var(--ink-dim)',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
  },
  previewCard: {
    position: 'sticky',
    top: 90,
    background: 'var(--panel-bg)',
    border: '1px solid var(--panel-border)',
    borderRadius: 16,
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  previewHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    fontSize: 10,
    fontWeight: 800,
    color: 'var(--accent)',
    background: 'rgba(92, 140, 224, 0.1)',
    padding: '4px 8px',
    borderRadius: 4,
  },
  canvasContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 16,
    background: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    border: '1px dashed var(--panel-border)',
  },
  canvasStyle: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 8,
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
  },
  btnPrimary: {
    padding: '12px 18px',
    borderRadius: 10,
    border: 'none',
    background: 'var(--accent)',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    transition: 'opacity 150ms ease',
  },
  btnSecondary: {
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid var(--panel-border)',
    background: 'var(--btn-idle-bg, var(--panel-bg))',
    color: 'var(--ink)',
    fontWeight: 700,
    fontSize: 12,
    cursor: 'pointer',
  },
  btnOutline: {
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px dashed var(--accent)',
    background: 'transparent',
    color: 'var(--accent)',
    fontWeight: 700,
    fontSize: 12,
    cursor: 'pointer',
  },
  privacyNote: {
    marginTop: 18,
    fontSize: 11,
    color: 'var(--ink-faint)',
    textAlign: 'center',
    lineHeight: 1.5,
  },
}
