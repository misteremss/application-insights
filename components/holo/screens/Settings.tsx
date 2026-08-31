'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { track, knob } from '@/lib/holo/styles'
import type { AppState } from '@/lib/holo/types'

type Row = {
  name: string
  meta: string
  isLink: boolean
  isToggle: boolean
  go?: () => void
  key?: keyof AppState['settings']
}

export default function Settings({ holo }: { holo: Holo }) {
  const { state, toggle, go } = holo
  const bank = state.bank

  const groups: { label: string; rows: Row[] }[] = [
    {
      label: 'ACCOUNT',
      rows: [
        { name: 'Addresses', meta: '2 saved · Amsterdam default', isLink: true, isToggle: false, go: () => go('settings') },
        { name: 'Payment methods', meta: 'Apple Pay, iDEAL, Visa •••• 4417', isLink: true, isToggle: false, go: () => go('checkout') },
        { name: 'Payout account · bank details', meta: bank.iban.slice(0, 4) + ' •••• ' + bank.iban.slice(-4) + ' · ' + (bank.verified ? 'verified' : 'pending'), isLink: true, isToggle: false, go: () => go('payout') },
        { name: 'Reviews I left', meta: state.orders.filter((o) => o.reviewed).length + ' of ' + state.orders.length + ' orders reviewed', isLink: true, isToggle: false, go: () => go('orders') },
        { name: 'Identity verification', meta: 'Verified 04/2025', isLink: true, isToggle: false, go: () => go('shopSetup') },
      ],
    },
    {
      label: 'SELLING',
      rows: [
        { name: 'Shipping & rates', meta: state.shipRows.length + ' options active', isLink: true, isToggle: false, go: () => go('shipping') },
        { name: 'Vacation mode', meta: 'Hides your listings, keeps followers', isToggle: true, isLink: false, key: 'vacation' },
      ],
    },
    {
      label: 'NOTIFICATIONS',
      rows: [
        { name: 'Drops from shops you follow', meta: 'Push · instant', isToggle: true, isLink: false, key: 'pushDrops' },
        { name: 'Wantlist price alerts', meta: 'Push when a card drops under target', isToggle: true, isLink: false, key: 'pushPrice' },
        { name: 'Weekly market email', meta: 'Index, movers, your portfolio', isToggle: true, isLink: false, key: 'email' },
      ],
    },
    {
      label: 'PRIVACY & REGION',
      rows: [
        { name: 'Public collection', meta: 'Others can see your portfolio', isToggle: true, isLink: false, key: 'publicCollection' },
        { name: 'Language & currency', meta: 'English · EUR · Netherlands', isLink: true, isToggle: false, go: () => go('settings') },
        { name: 'Data & GDPR', meta: 'Export or delete your data', isLink: true, isToggle: false, go: () => go('settings') },
      ],
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 15, background: 'linear-gradient(135deg,#8A5CFF,#2BE8FF)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 15 }}>Luca Bernard</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#8B8B98', marginTop: 4 }}>@lucab · joined 2024 · 4.97 ★</div>
        </div>
        <button onClick={() => go('store', { storeId: 's1' })} style={{ border: 'none', borderRadius: 9, background: '#17171E', color: '#C8FF3D', fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.1em', padding: '8px 10px', cursor: 'pointer' }}>MY SHOP</button>
      </div>

      {groups.map((g) => (
        <div key={g.label} style={{ marginTop: 16 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', marginBottom: 9 }}>{g.label}</div>
          <div style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 15, overflow: 'hidden' }}>
            {g.rows.map((r) => (
              <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: 13, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: '#8B8B98', marginTop: 3 }}>{r.meta}</div>
                </div>
                {r.isToggle && r.key && (
                  <button onClick={() => toggle('settings', r.key as string)} style={track(state.settings[r.key])}>
                    <div style={knob(state.settings[r.key])} />
                  </button>
                )}
                {r.isLink && (
                  <button onClick={r.go} style={{ border: 'none', background: 'none', color: '#8B8B98', fontSize: 15, cursor: 'pointer' }}>›</button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={() => go('signin')} style={{ width: '100%', marginTop: 16, borderRadius: 12, background: 'transparent', border: '1px solid rgba(255,61,166,0.35)', color: '#FF3DA6', fontWeight: 600, fontSize: 13, padding: 13, cursor: 'pointer' }}>Log out</button>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#5A5A66', textAlign: 'center', marginTop: 14, letterSpacing: '.14em' }}>HOLO 1.0.0 · BUILD 240</div>
    </div>
  )
}
