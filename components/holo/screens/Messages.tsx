'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { ART, SELLERS } from '@/lib/holo/data'

const THREADS = [
  { who: 'Vault Milano', when: '09:12', last: 'Label printed — going out with the 17:00 pickup.', art: SELLERS[0].art, unread: true },
  { who: 'Kanto Kiosk', when: 'Yesterday', last: 'Yes, double-boxed and insured to € 500.', art: SELLERS[2].art, unread: false },
  { who: 'Hoop Heat', when: 'Mon', last: 'Can do € 370 if you take both Prizm rookies.', art: SELLERS[1].art, unread: true },
  { who: 'Holo Support', when: '28 Aug', last: 'Dispute HL-48090 resolved in your favour.', art: ART.foil, unread: false },
]

export default function Messages({ holo }: { holo: Holo }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {THREADS.map((t) => (
        <div key={t.who} style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 11, background: t.art, flex: 'none' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>{t.who}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginLeft: 'auto' }}>{t.when}</span>
            </div>
            <div style={{ fontSize: 11.5, color: '#8B8B98', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.last}</div>
          </div>
          {t.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C8FF3D', flex: 'none' }} />}
        </div>
      ))}
    </div>
  )
}
