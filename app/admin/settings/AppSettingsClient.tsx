'use client'
import { useState } from 'react'

export function AppSettingsClient({ config: initial }: { config: Record<string, any> }) {
  const [config, setConfig] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const update = (key: string, val: any) => { setConfig(p => ({ ...p, [key]: val })); setSaved(false) }

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    })
    setSaving(false)
    setSaved(true)
  }

  const s = {
    sectionCard: { background: '#1e2028', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden', marginBottom: 16 } as React.CSSProperties,
    sectionHead: { padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: 'Google Sans', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' } as React.CSSProperties,
    row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' } as React.CSSProperties,
    rowLabel: { fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: '#fff' } as React.CSSProperties,
    rowHint: { fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 } as React.CSSProperties,
    input: { padding: '7px 12px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontFamily: 'Roboto', fontSize: 13, outline: 'none', width: 180 } as React.CSSProperties,
  }

  const Toggle = ({ k }: { k: string }) => (
    <button onClick={() => update(k, !config[k])} style={{ width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', background: config[k] ? '#4285F4' : 'rgba(255,255,255,0.1)', position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: config[k] ? 22 : 2, transition: 'left .2s' }} />
    </button>
  )

  const Field = ({ k, width = 180 }: { k: string; width?: number }) => (
    <input value={config[k] || ''} onChange={e => update(k, e.target.value)} style={{ ...s.input, width }} />
  )

  return (
    <div style={{ maxWidth: 740 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'Google Sans', fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 4 }}>App settings</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Global configuration for the Starbooster platform</p>
        </div>
        <button onClick={save} disabled={saving} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: saved ? '#34A853' : '#4285F4', color: '#fff', fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
          {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save settings'}
        </button>
      </div>

      {/* General */}
      <div style={s.sectionCard}>
        <div style={s.sectionHead}>General</div>
        {[
          { k: 'appName', label: 'App name', hint: 'Shown in the browser tab and emails' },
          { k: 'supportEmail', label: 'Support email', hint: 'Where support requests are sent' },
          { k: 'trialDays', label: 'Trial length (days)', hint: 'Free trial days for new signups' },
        ].map(r => (
          <div key={r.k} style={s.row}>
            <div><div style={s.rowLabel}>{r.label}</div><div style={s.rowHint}>{r.hint}</div></div>
            <Field k={r.k} />
          </div>
        ))}
      </div>

      {/* Switches */}
      <div style={s.sectionCard}>
        <div style={s.sectionHead}>Feature flags</div>
        {[
          { k: 'newSignupsEnabled', label: 'New signups', hint: 'Allow new users to register. Disable to pause growth.' },
          { k: 'maintenanceMode',  label: 'Maintenance mode', hint: 'Show a maintenance page to all non-admin visitors' },
        ].map(r => (
          <div key={r.k} style={s.row}>
            <div><div style={s.rowLabel}>{r.label}</div><div style={s.rowHint}>{r.hint}</div></div>
            <Toggle k={r.k} />
          </div>
        ))}
      </div>

      {/* Plan limits */}
      <div style={s.sectionCard}>
        <div style={s.sectionHead}>Plan limits</div>
        {[
          { k: 'maxLocationsStarter', label: 'Starter — max locations' },
          { k: 'maxRepliesStarter',   label: 'Starter — replies/month' },
          { k: 'maxLocationsGrowth',  label: 'Growth — max locations' },
          { k: 'maxRepliesGrowth',    label: 'Growth — replies/month' },
          { k: 'maxLocationsAgency',  label: 'Agency — max locations' },
        ].map(r => (
          <div key={r.k} style={s.row}>
            <div style={s.rowLabel}>{r.label}</div>
            <Field k={r.k} width={100} />
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div style={s.sectionCard}>
        <div style={s.sectionHead}>Displayed pricing (USD/mo) — update Stripe separately</div>
        {[
          { k: 'priceStarter', label: 'Starter price' },
          { k: 'priceGrowth',  label: 'Growth price' },
          { k: 'priceAgency',  label: 'Agency price' },
        ].map(r => (
          <div key={r.k} style={s.row}>
            <div style={s.rowLabel}>{r.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>$</span>
              <Field k={r.k} width={90} />
            </div>
          </div>
        ))}
      </div>

      {/* AI config */}
      <div style={s.sectionCard}>
        <div style={s.sectionHead}>AI configuration</div>
        {[
          { k: 'aiModel',        label: 'Claude model',      hint: 'e.g. claude-sonnet-4-20250514' },
          { k: 'replyMaxLength', label: 'Max reply length',  hint: 'Words limit for generated replies' },
          { k: 'defaultTone',    label: 'Default tone',      hint: 'professional | friendly | apologetic | grateful' },
        ].map(r => (
          <div key={r.k} style={s.row}>
            <div><div style={s.rowLabel}>{r.label}</div><div style={s.rowHint}>{r.hint}</div></div>
            <Field k={r.k} />
          </div>
        ))}
      </div>
    </div>
  )
}
