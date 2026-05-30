'use client'
import { useState } from 'react'

type Content = Record<string, string | boolean>

const FIELD_GROUPS = [
  {
    title: 'Hero section',
    fields: [
      { key: 'heroHeadline',     label: 'Headline',          type: 'text',     hint: 'Main hero heading — keep under 60 chars for best display' },
      { key: 'heroSubheadline',  label: 'Subheadline',       type: 'textarea', hint: 'Supporting text under headline' },
      { key: 'heroCta',          label: 'CTA button text',   type: 'text',     hint: 'Text on the main call-to-action button' },
      { key: 'heroTrustLine',    label: 'Trust line',        type: 'text',     hint: 'Small text below the CTA button' },
    ]
  },
  {
    title: 'Problem section',
    fields: [
      { key: 'problemHeadline',  label: 'Section headline',  type: 'text',     hint: '' },
    ]
  },
  {
    title: 'How it works',
    fields: [
      { key: 'howTitle',         label: 'Section title',     type: 'text',     hint: '' },
    ]
  },
  {
    title: 'Social proof',
    fields: [
      { key: 'proofTitle',       label: 'Section title',     type: 'text',     hint: '' },
    ]
  },
  {
    title: 'Final CTA section',
    fields: [
      { key: 'finalCtaHeadline', label: 'Headline',          type: 'text',     hint: '' },
      { key: 'finalCtaBody',     label: 'Body text',         type: 'textarea', hint: '' },
    ]
  },
  {
    title: 'Announcement bar',
    fields: [
      { key: 'announcementBarEnabled', label: 'Show announcement bar', type: 'toggle', hint: 'Display a banner at the very top of the page' },
      { key: 'announcementBar',  label: 'Announcement text', type: 'text',     hint: 'e.g. "🎉 Limited time: 30% off all plans this week →"' },
    ]
  },
  {
    title: 'SEO & meta',
    fields: [
      { key: 'metaTitle',        label: 'Meta title',        type: 'text',     hint: 'Browser tab title and Google search result' },
      { key: 'metaDescription',  label: 'Meta description',  type: 'textarea', hint: 'Google search result description (160 chars max)' },
      { key: 'footerDisclaimer', label: 'Footer text',       type: 'text',     hint: '' },
    ]
  },
]

export function ContentEditorClient({ content: initialContent }: { content: Content }) {
  const [content, setContent] = useState(initialContent)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const update = (key: string, val: string | boolean) => {
    setContent(prev => ({ ...prev, [key]: val }))
    setSaved(false)
  }

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    })
    setSaving(false)
    setSaved(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)', color: '#fff',
    fontFamily: 'Roboto', fontSize: 13, outline: 'none', lineHeight: 1.5,
  }

  return (
    <div style={{ maxWidth: 780 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'Google Sans', fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Landing page content</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Edit all text shown to visitors. Changes go live immediately on save.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="/" target="_blank" style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontFamily: 'Google Sans', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            ↗ Preview site
          </a>
          <button onClick={save} disabled={saving} style={{
            padding: '10px 24px', borderRadius: 8, border: 'none',
            background: saved ? '#34A853' : '#4285F4',
            color: '#fff', fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, cursor: 'pointer',
          }}>
            {saving ? 'Saving...' : saved ? '✓ Saved' : 'Publish changes'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {FIELD_GROUPS.map(group => (
          <div key={group.title} style={{ background: '#1e2028', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: 'Google Sans', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
              {group.title}
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {group.fields.map(field => (
                <div key={field.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: '#fff' }}>{field.label}</label>
                    {field.hint && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{field.hint}</span>}
                  </div>

                  {field.type === 'toggle' ? (
                    <button onClick={() => update(field.key, !content[field.key])} style={{
                      width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                      background: content[field.key] ? '#4285F4' : 'rgba(255,255,255,0.1)',
                      position: 'relative', transition: 'background .2s',
                    }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: content[field.key] ? 22 : 2, transition: 'left .2s' }} />
                    </button>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={String(content[field.key] || '')}
                      onChange={e => update(field.key, e.target.value)}
                      rows={3}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => e.target.style.borderColor = '#4285F4'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(content[field.key] || '')}
                      onChange={e => update(field.key, e.target.value)}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#4285F4'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  )}

                  {/* Character count for text fields */}
                  {field.type !== 'toggle' && (
                    <div style={{ fontSize: 11, color: String(content[field.key] || '').length > 150 ? '#EA4335' : 'rgba(255,255,255,0.2)', textAlign: 'right', marginTop: 4 }}>
                      {String(content[field.key] || '').length} chars
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
