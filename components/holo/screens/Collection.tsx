'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { bars } from '@/lib/holo/data'

const HOLDINGS = [
  { name: 'Soccer', value: '€ 9.240', count: '184 cards', pct: '78%', color: '#2BE8FF' },
  { name: 'NBA', value: '€ 6.110', count: '92 cards', pct: '58%', color: '#FF3DA6' },
  { name: 'Pokémon', value: '€ 4.980', count: '311 cards', pct: '46%', color: '#FFD93D' },
  { name: 'Yu-Gi-Oh!', value: '€ 2.640', count: '148 cards', pct: '28%', color: '#8A5CFF' },
  { name: 'F1 · NHL · other', value: '€ 1.348', count: '77 cards', pct: '14%', color: '#C8FF3D' },
]

export default function Collection({ holo }: { holo: Holo }) {
  const indexBars = bars(3, 12)

  return (
    <div>
      <div style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 15 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: '#8B8B98' }}>PORTFOLIO VALUE</div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 27, marginTop: 7 }}>€ 24.318,40</div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#C8FF3D', marginTop: 4 }}>▲ € 812,10 · 30 days</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48, marginTop: 14 }}>
          {indexBars.map((b, i) => <div key={i} style={{ flex: 1, borderRadius: 3, height: b.h, background: b.c }} />)}
        </div>
      </div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 9px' }}>HOLDINGS BY CATEGORY</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {HOLDINGS.map((h) => (
          <div key={h.name} style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 13, padding: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{h.name}</div>
              <div style={{ height: 5, borderRadius: 3, background: '#17171E', marginTop: 8, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: h.pct, background: h.color }} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700 }}>{h.value}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginTop: 3 }}>{h.count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
