'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { PRODUCTS, EUR0, ART } from '@/lib/holo/data'

const DASH_STATS = [
  { label: 'REVENUE · 30D', value: '€ 8.412', color: '#F4F4F6', meta: '▲ 18% vs last month' },
  { label: 'SOLD · 30D', value: '64', color: '#F4F4F6', meta: 'avg € 131 per order' },
  { label: 'CONVERSION', value: '4,8%', color: '#C8FF3D', meta: 'views → sale' },
  { label: 'DISPUTES', value: '0', color: '#C8FF3D', meta: '12 months clean' },
]

const TO_SHIP = [
  { name: 'Mbappé Optic Silver /25', meta: 'HL-48207 · tracked · pay by 17:00', art: ART.soccer, action: 'PRINT LABEL' },
  { name: 'Serie A Team Lot ×45', meta: 'HL-48204 · untracked letter', art: ART.soccer, action: 'PRINT LABEL' },
  { name: 'Panini WC 2026 Sticker Box', meta: 'HL-48199 · insured', art: ART.panini, action: 'MARK SENT' },
]

export default function SellerDashboard({ holo }: { holo: Holo }) {
  const myListings = PRODUCTS.filter((p) => p.sellerId === 's1')

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {DASH_STATS.map((s) => (
          <div key={s.label} style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 15, padding: 13 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: '#8B8B98' }}>{s.label}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 19, marginTop: 7, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10.5, color: '#8B8B98', marginTop: 4 }}>{s.meta}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 15, padding: 14, marginTop: 11 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: '#8B8B98' }}>NEXT PAYOUT</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#C8FF3D' }}>TUE 09:00</span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 24, marginTop: 8 }}>€ 1.842,30</div>
        <div style={{ height: 6, borderRadius: 3, background: '#17171E', marginTop: 12, overflow: 'hidden' }}>
          <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg,#C8FF3D,#2BE8FF)' }} />
        </div>
        <div style={{ fontSize: 11, color: '#8B8B98', marginTop: 8 }}>€ 862 still in escrow until delivery is confirmed.</div>
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 9px' }}>ORDERS TO SHIP</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {TO_SHIP.map((o) => (
          <div key={o.name} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 13, padding: 11 }}>
            <div style={{ width: 32, height: 44, borderRadius: 6, background: o.art, flex: 'none' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.3 }}>{o.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginTop: 4 }}>{o.meta}</div>
            </div>
            <button style={{ border: 'none', borderRadius: 9, background: '#17171E', color: '#C8FF3D', fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.1em', padding: '8px 9px', cursor: 'pointer' }}>{o.action}</button>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 9px' }}>MY LISTINGS · {myListings.length}</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {myListings.map((l) => (
          <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 13, padding: 11 }}>
            <div style={{ width: 32, height: 44, borderRadius: 6, background: l.art, flex: 'none' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.3 }}>{l.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginTop: 4 }}>{l.set} · {l.cond}</div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700 }}>{EUR0(l.price)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
