'use client'
import { useState } from 'react'

type Theme = {
  primaryBlue: string; primaryRed: string; primaryYellow: string; primaryGreen: string
  ctaBackground: string; ctaText: string; navBackground: string; heroBackground: string
  cardBackground: string; borderColor: string; textPrimary: string; textSecondary: string
  surfaceColor: string; fontSans: string; fontBody: string
  borderRadius: string; buttonRadius: string
}

const PRESETS: { name: string; theme: Partial<Theme> }[] = [
  { name: 'Google (default)', theme: { primaryBlue: '#4285F4', primaryRed: '#EA4335', primaryYellow: '#FBBC05', primaryGreen: '#34A853', ctaBackground: '#4285F4', navBackground: '#ffffff', heroBackground: '#ffffff', textPrimary: '#202124', borderColor: '#dadce0', surfaceColor: '#f8f9fa' } },
  { name: 'Midnight blue', theme: { primaryBlue: '#1a237e', primaryRed: '#b71c1c', primaryYellow: '#f57f17', primaryGreen: '#1b5e20', ctaBackground: '#1a237e', navBackground: '#0d1117', heroBackground: '#0d1117', textPrimary: '#e8eaf6', borderColor: '#283593', surfaceColor: '#111827' } },
  { name: 'Forest green', theme: { primaryBlue: '#2e7d32', primaryRed: '#c62828', primaryYellow: '#f9a825', primaryGreen: '#1b5e20', ctaBackground: '#2e7d32', navBackground: '#ffffff', heroBackground: '#f1f8e9', textPrimary: '#1b5e20', borderColor: '#a5d6a7', surfaceColor: '#f9fbe7' } },
  { name: 'Coral & cream', theme: { primaryBlue: '#e64a19', primaryRed: '#bf360c', primaryYellow: '#f57c00', primaryGreen: '#33691e', ctaBackground: '#e64a19', navBackground: '#fff8f5', heroBackground: '#fff8f5', textPrimary: '#3e2723', borderColor: '#ffccbc', surfaceColor: '#fff3e0' } },
]

const FONT_OPTIONS = ['Google Sans', 'Inter', 'DM Sans', 'Poppins', 'Nunito', 'Plus Jakarta Sans', 'Outfit']

export function ThemeEditorClient({ theme: initialTheme }: { theme: Theme }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'shapes'>('colors')

  const update = (key: keyof Theme, val: string) => {
    setTheme(prev => ({ ...prev, [key]: val }))
    setSaved(false)
  }

  const applyPreset = (preset: Partial<Theme>) => {
    setTheme(prev => ({ ...prev, ...preset }))
    setSaved(false)
  }

  const saveTheme = async () => {
    setSaving(true)
    await fetch('/api/admin/theme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(theme),
    })
    setSaving(false)
    setSaved(true)
  }

  const ColorRow = ({ label, themeKey, hint }: { label: string; themeKey: keyof Theme; hint?: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: '#fff' }}>{label}</div>
        {hint && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{hint}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="text"
          value={theme[themeKey]}
          onChange={e => update(themeKey, e.target.value)}
          style={{ width: 90, padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontFamily: 'Roboto', fontSize: 13, outline: 'none' }}
        />
        <div style={{ position: 'relative' }}>
          <input
            type="color"
            value={theme[themeKey]}
            onChange={e => update(themeKey, e.target.value)}
            style={{ width: 36, height: 36, borderRadius: 8, border: '2px solid rgba(255,255,255,0.15)', cursor: 'pointer', padding: 2, background: 'none' }}
          />
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: theme[themeKey], border: '1px solid rgba(255,255,255,0.1)' }} />
      </div>
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 24, alignItems: 'start' }}>

      {/* Left: controls */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontFamily: 'Google Sans', fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Theme & Colors</h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Changes apply to the landing page and dashboard</p>
          </div>
          <button onClick={saveTheme} disabled={saving} style={{
            padding: '10px 24px', borderRadius: 8, border: 'none',
            background: saved ? '#34A853' : '#4285F4',
            color: '#fff', fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, cursor: 'pointer',
            transition: 'background .2s',
          }}>
            {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save theme'}
          </button>
        </div>

        {/* Presets */}
        <div style={{ background: '#1e2028', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>Quick presets</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PRESETS.map(p => (
              <button key={p.name} onClick={() => applyPreset(p.theme)} style={{
                padding: '7px 14px', borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {['primaryBlue','primaryRed','primaryGreen','primaryYellow'].map(k => (
                    <div key={k} style={{ width: 10, height: 10, borderRadius: '50%', background: (p.theme as any)[k] || '#ccc' }} />
                  ))}
                </div>
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 4, border: '1px solid rgba(255,255,255,0.07)' }}>
          {(['colors','typography','shapes'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
              fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, textTransform: 'capitalize',
              background: activeTab === tab ? '#fff' : 'transparent',
              color: activeTab === tab ? '#202124' : 'rgba(255,255,255,0.5)',
              transition: 'all .15s',
            }}>{tab}</button>
          ))}
        </div>

        {/* Colors tab */}
        {activeTab === 'colors' && (
          <div style={{ background: '#1e2028', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '4px 20px' }}>
            <div style={{ fontFamily: 'Google Sans', fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '.08em', textTransform: 'uppercase', padding: '16px 0 4px' }}>Brand colors</div>
            <ColorRow label="Primary blue" themeKey="primaryBlue" hint="Buttons, links, active states" />
            <ColorRow label="Primary red" themeKey="primaryRed" hint="Alerts, urgent badges, errors" />
            <ColorRow label="Primary yellow" themeKey="primaryYellow" hint="Star ratings, warnings" />
            <ColorRow label="Primary green" themeKey="primaryGreen" hint="Success states, replied badges" />
            <div style={{ fontFamily: 'Google Sans', fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '.08em', textTransform: 'uppercase', padding: '16px 0 4px' }}>Layout colors</div>
            <ColorRow label="CTA button" themeKey="ctaBackground" hint="Main call-to-action background" />
            <ColorRow label="CTA text" themeKey="ctaText" hint="Text on CTA buttons" />
            <ColorRow label="Nav background" themeKey="navBackground" hint="Top navigation bar" />
            <ColorRow label="Hero background" themeKey="heroBackground" hint="Landing page hero section" />
            <ColorRow label="Card background" themeKey="cardBackground" hint="Review cards, pricing cards" />
            <ColorRow label="Surface color" themeKey="surfaceColor" hint="Page background, subtle fills" />
            <ColorRow label="Border color" themeKey="borderColor" hint="Card borders, dividers" />
            <div style={{ fontFamily: 'Google Sans', fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '.08em', textTransform: 'uppercase', padding: '16px 0 4px' }}>Text colors</div>
            <ColorRow label="Primary text" themeKey="textPrimary" hint="Headings, body text" />
            <ColorRow label="Secondary text" themeKey="textSecondary" hint="Captions, descriptions" />
            <div style={{ height: 16 }} />
          </div>
        )}

        {/* Typography tab */}
        {activeTab === 'typography' && (
          <div style={{ background: '#1e2028', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
            {[
              { label: 'Display font', key: 'fontSans' as const, hint: 'Used for headings, navigation, buttons' },
              { label: 'Body font', key: 'fontBody' as const, hint: 'Used for paragraph text, descriptions' },
            ].map(({ label, key, hint }) => (
              <div key={key} style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: '#fff', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>{hint}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {FONT_OPTIONS.map(font => (
                    <button key={font} onClick={() => update(key, font)} style={{
                      padding: '8px 14px', borderRadius: 20,
                      border: `1px solid ${theme[key] === font ? '#4285F4' : 'rgba(255,255,255,0.1)'}`,
                      background: theme[key] === font ? 'rgba(66,133,244,0.15)' : 'rgba(255,255,255,0.03)',
                      color: theme[key] === font ? '#6aa3f8' : 'rgba(255,255,255,0.6)',
                      fontFamily: font, fontSize: 13, cursor: 'pointer',
                    }}>{font}</button>
                  ))}
                </div>
                <div style={{ marginTop: 14, padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontFamily: theme[key], fontSize: 22, color: '#fff', marginBottom: 4 }}>The quick brown fox</div>
                  <div style={{ fontFamily: theme[key], fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ · abcdefghijklmnopqrstuvwxyz · 0123456789</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Shapes tab */}
        {activeTab === 'shapes' && (
          <div style={{ background: '#1e2028', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 20 }}>
            {[
              { label: 'Card border radius', key: 'borderRadius' as const, hint: 'Applied to review cards, pricing cards, sections' },
              { label: 'Button border radius', key: 'buttonRadius' as const, hint: 'Applied to all buttons and CTAs' },
            ].map(({ label, key, hint }) => (
              <div key={key} style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: '#fff', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>{hint}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <input type="range" min="0" max="24" step="1" value={theme[key]} onChange={e => update(key, e.target.value)} style={{ flex: 1 }} />
                  <span style={{ fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: '#fff', minWidth: 40 }}>{theme[key]}px</span>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  {['Button', 'Card', 'Badge'].map(label => (
                    <div key={label} style={{ padding: '8px 20px', background: theme.ctaBackground, color: theme.ctaText, borderRadius: `${theme[key]}px`, fontFamily: theme.fontSans, fontSize: 13, fontWeight: 500 }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: live preview */}
      <div style={{ position: 'sticky', top: 24 }}>
        <div style={{ fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>Live preview</div>
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>

          {/* Mock nav */}
          <div style={{ background: theme.navBackground, borderBottom: `1px solid ${theme.borderColor}`, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: theme.fontSans, fontSize: 15, fontWeight: 600, color: theme.textPrimary }}>
              Star<span style={{ color: theme.primaryBlue }}>booster</span>
            </span>
            <div style={{ padding: '6px 14px', borderRadius: `${theme.buttonRadius}px`, background: theme.ctaBackground, color: theme.ctaText, fontFamily: theme.fontSans, fontSize: 12, fontWeight: 500 }}>
              Sign in
            </div>
          </div>

          {/* Mock hero */}
          <div style={{ background: theme.heroBackground, padding: '24px 16px', textAlign: 'center', borderBottom: `1px solid ${theme.borderColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 12 }}>
              {[theme.primaryRed, theme.primaryYellow, theme.primaryGreen, theme.primaryBlue].map((c, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{ fontFamily: theme.fontSans, fontSize: 18, fontWeight: 700, color: theme.textPrimary, lineHeight: 1.2, marginBottom: 8 }}>
              Reply to every{' '}
              <span style={{ color: theme.primaryBlue }}>G</span>
              <span style={{ color: theme.primaryRed }}>o</span>
              <span style={{ color: theme.primaryYellow }}>o</span>
              <span style={{ color: theme.primaryBlue }}>g</span>
              <span style={{ color: theme.primaryGreen }}>l</span>
              <span style={{ color: theme.primaryRed }}>e</span>
              {' '}review
            </div>
            <div style={{ fontFamily: theme.fontBody, fontSize: 12, color: theme.textSecondary, marginBottom: 14 }}>AI-powered responses for local businesses</div>
            <div style={{ padding: '10px 20px', borderRadius: `${theme.buttonRadius}px`, background: theme.ctaBackground, color: theme.ctaText, fontFamily: theme.fontSans, fontSize: 13, fontWeight: 500, display: 'inline-block' }}>
              Start free trial
            </div>
          </div>

          {/* Mock review card */}
          <div style={{ background: theme.surfaceColor, padding: 14 }}>
            <div style={{ background: theme.cardBackground, border: `1px solid ${theme.borderColor}`, borderRadius: `${theme.borderRadius}px`, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: theme.primaryBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: theme.fontSans, fontSize: 11, fontWeight: 600, color: '#fff' }}>S</div>
                <div>
                  <div style={{ fontFamily: theme.fontSans, fontSize: 12, fontWeight: 500, color: theme.textPrimary }}>Sarah M.</div>
                  <div style={{ color: theme.primaryYellow, fontSize: 11 }}>★★★★★</div>
                </div>
                <div style={{ marginLeft: 'auto', padding: '3px 8px', borderRadius: 10, background: `${theme.primaryGreen}22`, color: theme.primaryGreen, fontFamily: theme.fontSans, fontSize: 10, fontWeight: 600 }}>✓ Replied</div>
              </div>
              <div style={{ fontFamily: theme.fontBody, fontSize: 11, color: theme.textSecondary, lineHeight: 1.5 }}>Amazing food and service! Will definitely come back.</div>
              <div style={{ background: `${theme.primaryBlue}12`, borderLeft: `2px solid ${theme.primaryBlue}`, borderRadius: `0 4px 4px 0`, padding: '6px 8px', marginTop: 8 }}>
                <div style={{ fontFamily: theme.fontBody, fontSize: 10, color: theme.primaryBlue, lineHeight: 1.5 }}>Thank you so much, Sarah! We loved having you.</div>
              </div>
            </div>

            {/* Mock CTA */}
            <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: `${theme.borderRadius}px`, background: theme.ctaBackground, textAlign: 'center' }}>
              <div style={{ fontFamily: theme.fontSans, fontSize: 12, fontWeight: 600, color: theme.ctaText }}>Stop leaving reviews unanswered</div>
            </div>
          </div>
        </div>

        {/* Color swatches */}
        <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
          {[theme.primaryBlue, theme.primaryRed, theme.primaryYellow, theme.primaryGreen, theme.ctaBackground, theme.navBackground, theme.cardBackground, theme.surfaceColor].map((color, i) => (
            <div key={i} title={color} style={{ width: 24, height: 24, borderRadius: 6, background: color, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', flexShrink: 0 }} />
          ))}
        </div>
      </div>
    </div>
  )
}
