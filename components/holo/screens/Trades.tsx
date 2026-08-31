'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { ART } from '@/lib/holo/data'

const TRADES = [
  { who: '@kantokiosk', state: 'AWAITING YOU', art: ART.pkmn, theirs: 'Charizard ex SIR 223/197', theirValue: '€ 640', yours: 'Mbappé Optic Silver /25', yourValue: '€ 1.249', gap: 'Gap € 609 — they add € 609 in cash at accept.' },
  { who: '@hoopheat', state: 'COUNTERED', art: ART.nba, theirs: 'Mahomes Downtown SP', theirValue: '€ 780', yours: 'Wembanyama Prizm RC', yourValue: '€ 389', gap: 'Gap € 391 — you add € 391 in cash at accept.' },
  { who: '@duelistdepot', state: 'NEW', art: ART.ygo, theirs: 'Blue-Eyes 1st Ed (EX)', theirValue: '€ 2.450', yours: 'Verstappen Gold /10', yourValue: '€ 1.840', gap: 'Gap € 610 — cash settles through escrow.' },
]

export default function Trades({ holo }: { holo: Holo }) {
  return (
    <div>
      <p style={{ margin: '0 0 14px', fontSize: 12.5, color: '#8B8B98', lineHeight: 1.6 }}>
        Swaps are escrowed both ways: both parcels get tracked labels, both sides confirm, then it closes. Value gap over € 25 settles in cash.
      </p>
      <div style={{ display: 'grid', gap: 10 }}>
        {TRADES.map((t) => (
          <div key={t.who} style={{ background: '#101015', border: '1px solid rgba(138,92,255,0.28)', borderRadius: 15, padding: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: 8, background: t.art }} />
              <span style={{ fontSize: 12, fontWeight: 600, flex: 1 }}>{t.who}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8A5CFF' }}>{t.state}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
              <div style={{ flex: 1, background: '#17171E', borderRadius: 11, padding: 9 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: '.14em', color: '#8B8B98' }}>THEY SEND</div>
                <div style={{ fontSize: 11, fontWeight: 600, marginTop: 5, lineHeight: 1.3 }}>{t.theirs}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#C8FF3D', marginTop: 5 }}>{t.theirValue}</div>
              </div>
              <span style={{ color: '#8A5CFF', fontSize: 15 }}>⇄</span>
              <div style={{ flex: 1, background: '#17171E', borderRadius: 11, padding: 9 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: '.14em', color: '#8B8B98' }}>YOU SEND</div>
                <div style={{ fontSize: 11, fontWeight: 600, marginTop: 5, lineHeight: 1.3 }}>{t.yours}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#C8FF3D', marginTop: 5 }}>{t.yourValue}</div>
              </div>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#8B8B98', marginTop: 10 }}>{t.gap}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 11 }}>
              <button style={{ flex: 1, border: 'none', borderRadius: 10, background: '#8A5CFF', color: '#F4F4F6', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 12, padding: 10, cursor: 'pointer' }}>Accept swap</button>
              <button style={{ flex: 1, borderRadius: 10, background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: '#F4F4F6', fontSize: 12, fontWeight: 600, padding: 10, cursor: 'pointer' }}>Counter</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
