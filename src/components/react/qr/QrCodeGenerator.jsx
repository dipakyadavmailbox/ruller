import { useState, useEffect, useRef, useMemo } from 'react'
import { generateQrMatrix, drawQrToCanvas, generateQrSvgString } from './qrcode-engine.js'
import './QrCodeGenerator.css'

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
    <div className="qr-container">
      {/* Toast Banner */}
      {copiedToast && (
        <div className="qr-toast">
          {copiedToast}
        </div>
      )}

      {/* Mode Selector Tabs */}
      <div className="qr-mode-tabs">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`qr-tab-btn ${activeMode === mode.id ? 'active' : ''}`}
          >
            <span>{mode.label}</span>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="qr-grid">
        {/* Left Control Column */}
        <div>
          {/* Input Panel */}
          <div className="qr-panel-card">
            <h3 className="qr-card-heading">1. Content &amp; Details</h3>

            {activeMode === 'url' && (
              <div className="qr-input-group">
                <label className="qr-label">Website URL or Plain Text</label>
                <textarea
                  rows={4}
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com or enter any message..."
                  className="qr-textarea"
                />
                <span style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 4 }}>
                  Tip: Enter any web address or freeform text to generate a quick scannable code.
                </span>
              </div>
            )}

            {activeMode === 'wifi' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="qr-input-group">
                  <label className="qr-label">Network Name (SSID)</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    className="qr-input"
                  />
                </div>
                <div className="qr-form-row">
                  <div className="qr-input-group">
                    <label className="qr-label">Security Type</label>
                    <select
                      value={wifiEncryption}
                      onChange={(e) => setWifiEncryption(e.target.value)}
                      className="qr-select"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                      <option value="WEP">WEP (Legacy)</option>
                      <option value="nopass">None (Open Network)</option>
                    </select>
                  </div>
                  {wifiEncryption !== 'nopass' && (
                    <div className="qr-input-group">
                      <label className="qr-label">Wi-Fi Password</label>
                      <input
                        type="text"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                        className="qr-input"
                      />
                    </div>
                  )}
                </div>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="qr-form-row">
                  <div className="qr-input-group">
                    <label className="qr-label">Full Name</label>
                    <input type="text" value={vcardName} onChange={(e) => setVcardName(e.target.value)} className="qr-input" />
                  </div>
                  <div className="qr-input-group">
                    <label className="qr-label">Phone Number</label>
                    <input type="text" value={vcardPhone} onChange={(e) => setVcardPhone(e.target.value)} className="qr-input" />
                  </div>
                </div>
                <div className="qr-form-row">
                  <div className="qr-input-group">
                    <label className="qr-label">Email Address</label>
                    <input type="email" value={vcardEmail} onChange={(e) => setVcardEmail(e.target.value)} className="qr-input" />
                  </div>
                  <div className="qr-input-group">
                    <label className="qr-label">Company</label>
                    <input type="text" value={vcardCompany} onChange={(e) => setVcardCompany(e.target.value)} className="qr-input" />
                  </div>
                </div>
                <div className="qr-form-row">
                  <div className="qr-input-group">
                    <label className="qr-label">Job Title</label>
                    <input type="text" value={vcardTitle} onChange={(e) => setVcardTitle(e.target.value)} className="qr-input" />
                  </div>
                  <div className="qr-input-group">
                    <label className="qr-label">Website URL</label>
                    <input type="url" value={vcardUrl} onChange={(e) => setVcardUrl(e.target.value)} className="qr-input" />
                  </div>
                </div>
              </div>
            )}

            {activeMode === 'email' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="qr-input-group">
                  <label className="qr-label">Recipient Email</label>
                  <input type="email" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} className="qr-input" />
                </div>
                <div className="qr-input-group">
                  <label className="qr-label">Subject Line</label>
                  <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="qr-input" />
                </div>
                <div className="qr-input-group">
                  <label className="qr-label">Message Body</label>
                  <textarea rows={3} value={emailBody} onChange={(e) => setEmailBody(e.target.value)} className="qr-textarea" />
                </div>
              </div>
            )}

            {activeMode === 'sms' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="qr-input-group">
                  <label className="qr-label">Phone Number</label>
                  <input type="tel" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} className="qr-input" />
                </div>
                <div className="qr-input-group">
                  <label className="qr-label">Preset SMS Message (Optional)</label>
                  <textarea rows={3} value={smsBody} onChange={(e) => setSmsBody(e.target.value)} className="qr-textarea" />
                </div>
              </div>
            )}
          </div>

          {/* Styling & Customization Panel */}
          <div className="qr-panel-card">
            <h3 className="qr-card-heading">2. Design &amp; Styling</h3>

            {/* Presets */}
            <div style={{ marginBottom: 18 }}>
              <label className="qr-label" style={{ display: 'block', marginBottom: 8 }}>Color Themes</label>
              <div className="qr-presets">
                {PRESET_THEMES.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => {
                      setFgColor(theme.fg)
                      setBgColor(theme.bg)
                    }}
                    className="qr-preset-btn"
                  >
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: theme.fg, display: 'inline-block' }} />
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="qr-form-row">
              <div className="qr-input-group">
                <label className="qr-label">Foreground Color</label>
                <div className="qr-color-wrapper">
                  <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="qr-color-picker" />
                  <input type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="qr-input" />
                </div>
              </div>
              <div className="qr-input-group">
                <label className="qr-label">Background Color</label>
                <div className="qr-color-wrapper">
                  <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="qr-color-picker" />
                  <input type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="qr-input" />
                </div>
              </div>
            </div>

            {/* Shapes & Error Correction */}
            <div className="qr-form-row">
              <div className="qr-input-group">
                <label className="qr-label">Dot Style</label>
                <select value={dotShape} onChange={(e) => setDotShape(e.target.value)} className="qr-select">
                  <option value="square">Square Modules</option>
                  <option value="rounded">Soft Rounded</option>
                  <option value="dots">Circular Dots</option>
                </select>
              </div>
              <div className="qr-input-group">
                <label className="qr-label">Error Correction Level</label>
                <select value={ecLevel} onChange={(e) => setEcLevel(e.target.value)} className="qr-select">
                  <option value="L">L — 7% Recovery</option>
                  <option value="M">M — 15% Recovery (Default)</option>
                  <option value="Q">Q — 25% Recovery</option>
                  <option value="H">H — 30% High Resilience</option>
                </select>
              </div>
            </div>

            {/* Center Logo & Margin */}
            <div className="qr-form-row">
              <div className="qr-input-group">
                <label className="qr-label">Center Icon / Badge</label>
                <select value={centerLogo} onChange={(e) => setCenterLogo(e.target.value)} className="qr-select">
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
              <div className="qr-input-group">
                <label className="qr-label">Export Resolution: {downloadSize}px</label>
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
        <div>
          <div className="qr-preview-card">
            <div className="qr-preview-header">
              <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)' }}>LIVE PREVIEW</span>
              <span className="qr-badge">{activeMode.toUpperCase()}</span>
            </div>

            {/* Canvas Display */}
            <div className="qr-canvas-container">
              <canvas ref={canvasRef} className="qr-canvas" />
            </div>

            {/* Download Buttons */}
            <div className="qr-action-buttons">
              <button onClick={handleDownloadPng} className="qr-btn-primary">
                📥 Download PNG Image ({downloadSize}px)
              </button>
              <div className="qr-btn-group-2">
                <button onClick={handleDownloadSvg} className="qr-btn-secondary">
                  🎨 Download SVG
                </button>
                <button onClick={handleDownloadWebp} className="qr-btn-secondary">
                  🖼️ Download WebP
                </button>
              </div>
              <button onClick={handleCopySvg} className="qr-btn-outline">
                📋 Copy SVG Code to Clipboard
              </button>
            </div>

            <div className="qr-privacy-note">
              🔒 100% Private — Generated strictly inside your browser window. Zero data sent to any server.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
