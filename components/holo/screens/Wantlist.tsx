'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { ART } from '@/lib/holo/data'

const WANTLIST = [
  { name: 'Mbappé Optic Gold /10', target: '€ 2.400', now: '€ 2.680', art: ART.soccer, tag: 'WATCHING', tagBg: 'rgba(139,139,152,.18)', tagFg: '#B9B9C4', border: 'rgba(255,255,255,0.07)' },
  { name: 'Charizard ex SIR 223/197', target: '€ 620', now: '€ 598', art: ART.pkmn, tag: 'UNDER TARGET', tagBg: 'rgba(200,255,61,.14)', tagFg: '#C8FF3D', border: 'rgba(200,255,61,0.3)' },
  { name: 'Bedard Young Guns RC', target: '€ 190', now: '€ 210', art: ART.nhl, tag: 'CLOSE', tagBg: 'rgba(255,106,43,.16)', tagFg: '#FF6A2B', border: 'rgba(255,255,255,0.07)' },
  { name: 'Luffy Leader Alt Art OP-05', target: '€ 380', now: '€ 410', art: ART.op, tag: 'WATCHING', tagBg: 'rgba(139,139,152,.18)', tagFg: '#B9B9C4', border: 'rgba(255,255,255,0.07)' },
]

export default function Wantlist({ holo }: { holo: Holo }) {
  return (
    <div>
      <p style={{ margin: '0 0 14px', fontSize: 12.5, color: '#8B8B98', lineHeight: 1.6 }}>
        Set a target price. We ping you the second a listing drops under it — anywhere in Europe.
      </p>
      <div style={{ display: 'grid', gap: 9 }}>
        {WANTLIST.map((w) => (
          <div key={w.name} style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#101015', border: `1px solid ${w.border}`, borderRadius: 14, padding: 12 }}>
            <div style={{ width: 34, height: 46, borderRadius: 6, background: w.art, flex: 'none' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{w.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginTop: 4 }}>target {w.target} · now {w.now}</div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.1em', padding: '4px 8px', borderRadius: 6, background: w.tagBg, color: w.tagFg }}>{w.tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
