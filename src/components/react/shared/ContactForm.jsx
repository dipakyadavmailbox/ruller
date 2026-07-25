import { useState } from 'react'
import { Field, inputStyle, textareaStyle, selectStyle } from './FormKit.jsx'

export default function ContactForm({ contactEmail }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('Bug Report')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!message.trim()) return
    setSubmitted(true)

    const mailSubject = encodeURIComponent(`[${category}] ${subject || 'Feedback from Rocking Tools'}`)
    const mailBody = encodeURIComponent(`From: ${name || 'Anonymous'} (${email || 'No email provided'})\nCategory: ${category}\n\nMessage:\n${message}`)
    window.location.href = `mailto:${contactEmail}?subject=${mailSubject}&body=${mailBody}`
  }

  return (
    <div style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 12, padding: 24 }}>
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '24px 12px' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📬</div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>Thank You!</h3>
          <p style={{ fontSize: 13.5, color: 'var(--ink-dim)', marginBottom: 20 }}>
            Your message draft was passed to your email client. If it didn't open automatically, you can email us directly at <strong>{contactEmail}</strong>.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--btn-active-bg)',
              color: 'var(--btn-active-ink)',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            <Field label="Your Name (optional)">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Alex" style={inputStyle} />
            </Field>

            <Field label="Your Email (for replies)">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. alex@example.com" style={inputStyle} />
            </Field>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            <Field label="Topic / Category">
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={selectStyle}>
                <option value="Bug Report">🐛 Bug Report</option>
                <option value="Feature Request">💡 Feature Request</option>
                <option value="General Question">❓ General Question</option>
                <option value="Partnership / Other">🤝 Partnership / Other</option>
              </select>
            </Field>

            <Field label="Subject Line">
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief summary..." style={inputStyle} />
            </Field>
          </div>

          <Field label="Message *">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your question, bug report, or feature request in detail..."
              rows={6}
              required
              style={textareaStyle}
            />
          </Field>

          <button
            type="submit"
            disabled={!message.trim()}
            style={{
              padding: '14px 28px',
              borderRadius: 8,
              border: 'none',
              background: message.trim() ? 'var(--btn-active-bg)' : 'var(--btn-idle-bg)',
              color: message.trim() ? 'var(--btn-active-ink)' : 'var(--ink-faint)',
              fontWeight: 800,
              fontSize: 14,
              cursor: message.trim() ? 'pointer' : 'not-allowed',
              width: 'fit-content',
              transition: 'all 150ms ease',
            }}
          >
            ✉️ Open Email & Send Message
          </button>
        </form>
      )}
    </div>
  )
}
