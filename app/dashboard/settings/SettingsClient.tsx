'use client'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

export function SettingsClient({ user }: { user: any }) {
  const [toast, setToast] = useState<string | null>(null)
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const Section = ({ title, children }: any) => (
    <div style={{ background: '#fff', border: '1px solid var(--g-border)', borderRadius: 12, marginBottom: 16, overflow: 'hidden' }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--g-border)', fontFamily: 'Google Sans', fontSize: 15, fontWeight: 500, color: 'var(--g-text)' }}>{title}</div>
      <div style={{ padding: '20px 24px' }}>{children}</div>
    </div>
  )

  const Row = ({ label, value, action }: { label: string; value?: string; action?: React.ReactNode }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--g-surface2)' }}>
      <div>
        <div style={{ fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: 'var(--g-text)', marginBottom: 2 }}>{label}</div>
        {value && <div style={{ fontSize: 13, color: 'var(--g-text3)' }}>{value}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )

  return (
    <div>
      <h1 style={{ fontFamily: 'Google Sans', fontSize: 22, fontWeight: 500, color: 'var(--g-text)', marginBottom: 24 }}>Settings</h1>

      <Section title="Account">
        <Row label="Name" value={user.name || 'Not set'} action={
          <span style={{ fontSize: 13, color: 'var(--g-text3)' }}>From Google</span>
        } />
        <Row label="Email" value={user.email} action={
          <span style={{ fontSize: 13, color: 'var(--g-text3)' }}>From Google</span>
        } />
        <Row label="Member since" value={new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} />
      </Section>

      <Section title="Google Business">
        <Row label="Google Account" value={user.email} action={
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--g-green-light)', color: 'var(--g-green)', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 12 }}>
            ✓ Connected
          </div>
        } />
        <Row label="Permissions" value="Read reviews, post responses via Google My Business API" />
        <p style={{ fontSize: 12, color: 'var(--g-text3)', marginTop: 12, lineHeight: 1.6 }}>
          To revoke access, go to your <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--g-blue)' }}>Google Account permissions →</a>
        </p>
      </Section>

      <Section title="Notifications">
        {[
          { label: 'New review alerts', desc: 'Get notified when you receive a new review', defaultOn: true },
          { label: 'Weekly digest', desc: 'Summary of reviews and replies every Monday', defaultOn: false },
          { label: 'Low rating alerts', desc: 'Immediate notification for 1-2 star reviews', defaultOn: true },
        ].map(n => (
          <NotificationRow key={n.label} label={n.label} desc={n.desc} defaultOn={n.defaultOn} />
        ))}
      </Section>

      <Section title="Danger zone">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: 'var(--g-text)' }}>Delete account</div>
            <div style={{ fontSize: 13, color: 'var(--g-text3)', marginTop: 2 }}>Permanently delete your account and all data</div>
          </div>
          <button style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid var(--g-red)', background: '#fff', color: 'var(--g-red)', fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
            onClick={() => showToast('Please contact support to delete your account')}>
            Delete account
          </button>
        </div>
      </Section>

      <button onClick={() => signOut({ callbackUrl: '/' })} style={{
        padding: '10px 20px', borderRadius: 6, border: '1px solid var(--g-border)',
        background: '#fff', color: 'var(--g-text2)',
        fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        🚪 Sign out
      </button>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

function NotificationRow({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--g-surface2)' }}>
      <div>
        <div style={{ fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: 'var(--g-text)' }}>{label}</div>
        <div style={{ fontSize: 12, color: 'var(--g-text3)', marginTop: 2 }}>{desc}</div>
      </div>
      <button onClick={() => setOn(!on)} style={{
        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
        background: on ? 'var(--g-blue)' : 'var(--g-border)', transition: 'background .2s',
        position: 'relative',
      }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          position: 'absolute', top: 2, left: on ? 22 : 2, transition: 'left .2s',
          boxShadow: '0 1px 3px rgba(0,0,0,.2)',
        }} />
      </button>
    </div>
  )
}
