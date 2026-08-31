'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { EUR } from '@/lib/holo/data'
import { rowBtn, primaryBtn } from '@/lib/holo/styles'

const PAY_METHODS = ['Apple Pay · default', 'iDEAL · ING', 'Card · Visa •••• 4417', 'Klarna · pay in 3']

export default function Checkout({ holo }: { holo: Holo }) {
  const { state, go, groups, itemsTotal, shipTotal, protection, pickPay } = holo
  const g = groups()
  const items = itemsTotal()
  const shipT = shipTotal()
  const prot = protection()
  const grand = items + shipT + prot
  const totalQty = holo.cartLines().reduce((n, l) => n + l.qty, 0)

  const totals = [
    { label: 'Items · ' + totalQty, value: EUR(items), color: '#CFCFD8', weight: 400 },
    { label: 'Shipping · ' + g.length + ' parcel' + (g.length === 1 ? '' : 's'), value: EUR(shipT), color: '#CFCFD8', weight: 400 },
    { label: 'Buyer protection · 5% + € 0,70', value: EUR(prot), color: '#2BE8FF', weight: 700 },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ flex: 1, height: 3, borderRadius: 2, background: '#C8FF3D' }} />
        <div style={{ flex: 1, height: 3, borderRadius: 2, background: '#C8FF3D' }} />
        <div style={{ flex: 1, height: 3, borderRadius: 2, background: '#17171E' }} />
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 9px' }}>DELIVER TO</div>
      <div style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 13 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600 }}>Luca Bernard</div>
        <div style={{ fontSize: 12, color: '#8B8B98', lineHeight: 1.5, marginTop: 4 }}>Prinsengracht 118, 1015 EA Amsterdam, Netherlands · +31 6 2841 9930</div>
        <button onClick={() => go('settings')} style={{ marginTop: 9, border: 'none', background: 'none', padding: 0, color: '#2BE8FF', fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '.1em', cursor: 'pointer' }}>CHANGE</button>
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 9px' }}>PAY WITH</div>
      <div style={{ display: 'grid', gap: 7 }}>
        {PAY_METHODS.map((n, i) => {
          const [name, meta] = n.split(' · ')
          return (
            <button key={i} onClick={() => pickPay(i)} style={rowBtn(state.pay === i)}>
              <span style={{ fontSize: 12 }}>{name}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#8B8B98' }}>{meta}</span>
            </button>
          )
        })}
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 9px' }}>{g.length} PARCEL{g.length === 1 ? '' : 'S'}</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {g.map((grp) => (
          <div key={grp.sid} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 13, padding: 11 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: grp.seller.art, flex: 'none' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{grp.seller.shop}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginTop: 3 }}>{grp.lines.reduce((n, l) => n + l.qty, 0)} item(s) · {grp.method.n}</div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700 }}>{EUR(grp.sub + grp.shipCost)}</span>
          </div>
        ))}
      </div>

      <div style={{ background: '#0B0B10', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 16, padding: 15, marginTop: 16 }}>
        {totals.map((t, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 9 }}>
            <span style={{ fontSize: 12, color: t.color }}>{t.label}</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: t.weight, color: t.color }}>{t.value}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 11, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 15 }}>Pay now</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 19, fontWeight: 700 }}>{EUR(grand)}</span>
        </div>
        <button onClick={() => go('order')} style={{ ...primaryBtn, marginTop: 13 }}>Pay {EUR(grand)}</button>
        <p style={{ margin: '11px 0 0', fontSize: 11, color: '#8B8B98', lineHeight: 1.5 }}>Held in escrow. Released to sellers 2 days after delivery is confirmed.</p>
      </div>
    </div>
  )
}
