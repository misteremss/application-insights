'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { EUR } from '@/lib/holo/data'
import { rowBtn, primaryBtn } from '@/lib/holo/styles'

export default function Cart({ holo }: { holo: Holo }) {
  const { state, go, groups, itemsTotal, shipTotal, protection, bump, pickShipMethod } = holo
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

  if (g.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 18 }}>Cart&apos;s empty</div>
        <p style={{ color: '#8B8B98', fontSize: 13, margin: '8px 0 18px' }}>Bundle from one shop — shipping combines automatically.</p>
        <button onClick={() => go('search')} style={{ border: 'none', borderRadius: 11, background: '#C8FF3D', color: '#08080B', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 13, padding: '12px 18px', cursor: 'pointer' }}>Browse cards</button>
      </div>
    )
  }

  return (
    <div>
      {g.map((grp) => (
        <div key={grp.sid} style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 13, marginBottom: 11 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: grp.seller.art }} />
            <div style={{ fontSize: 12.5, fontWeight: 600, flex: 1 }}>{grp.seller.shop}</div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#C8FF3D' }}>{grp.seller.rating} ★</span>
          </div>
          {grp.lines.map((l) => (
            <div key={l.id} style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ width: 38, height: 52, borderRadius: 6, background: l.p.art, flex: 'none' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.3 }}>{l.p.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginTop: 4 }}>{l.p.cond}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <button onClick={() => bump(l.id, -1)} style={{ width: 24, height: 24, border: 'none', borderRadius: 7, background: '#17171E', color: '#F4F4F6', cursor: 'pointer' }}>−</button>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, width: 12, textAlign: 'center' }}>{l.qty}</span>
                <button onClick={() => bump(l.id, 1)} style={{ width: 24, height: 24, border: 'none', borderRadius: 7, background: '#17171E', color: '#F4F4F6', cursor: 'pointer' }}>+</button>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, width: 56, textAlign: 'right' }}>{EUR(l.p.price * l.qty)}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: '#8B8B98', marginBottom: 7 }}>SHIPPING FROM {grp.seller.city}</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {grp.seller.methods.map((m, i) => (
                <button key={i} onClick={() => pickShipMethod(grp.sid, i)} style={rowBtn((state.ship[grp.sid] ?? 0) === i)}>
                  <span style={{ fontSize: 11.5 }}>{m.n}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700 }}>{EUR(m.p)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div style={{ background: '#0B0B10', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 16, padding: 15 }}>
        {totals.map((t, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 9 }}>
            <span style={{ fontSize: 12, color: t.color }}>{t.label}</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: t.weight, color: t.color }}>{t.value}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 11, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 15 }}>Total</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 19, fontWeight: 700 }}>{EUR(grand)}</span>
        </div>
        <button onClick={() => go('checkout')} style={{ ...primaryBtn, marginTop: 13 }}>Checkout</button>
      </div>
    </div>
  )
}
