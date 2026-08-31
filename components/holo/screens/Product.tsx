'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { PRODUCTS, SELLERS, prod as findProd, mapProduct, bars, EUR, EUR0 } from '@/lib/holo/data'

export default function ProductScreen({ holo }: { holo: Holo }) {
  const { state, go, addToCart } = holo
  const p = findProd(state.productId) || PRODUCTS[0]
  const base = mapProduct(p)
  const spark = bars(p.price, 8)
  const offers = SELLERS.slice(0, 3).map((sl, i) => {
    const pr = p.price * (1 + i * 0.045)
    const best = i === 0
    return {
      shop: sl.shop, meta: sl.city + ' · ' + sl.rating + '★ · ' + sl.verified.toLowerCase(), art: sl.art,
      priceLabel: pr >= 100 ? EUR0(pr) : EUR(pr), shipLabel: EUR(sl.methods[0].p),
      border: best ? 'rgba(200,255,61,0.35)' : 'rgba(255,255,255,0.07)',
      btnBg: best ? '#C8FF3D' : '#17171E', btnFg: best ? '#08080B' : '#F4F4F6',
    }
  })
  const desc = 'Stored sleeved in a top-loader since the pack. Centring 55/45, sharp corners, clean surface under a torch. Ships tracked with a rigid protector inside 24h. Combined shipping on anything else from this shop.'

  return (
    <div>
      <div style={{ position: 'relative', height: 250, borderRadius: 18, background: base.art, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: '60%', height: '220%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)', animation: 'holoSweep 3.4s cubic-bezier(.4,0,.2,1) infinite' }} />
        <div style={{ position: 'absolute', left: 12, top: 12, display: 'flex', gap: 6 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.1em', background: 'rgba(8,8,11,.78)', padding: '4px 7px', borderRadius: 5 }}>{base.badge}</span>
        </div>
      </div>
      <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontStretch: '110%' as any, fontSize: 23, lineHeight: 1.08, letterSpacing: '-.025em', marginTop: 16 }}>{base.name}</div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: '#8B8B98', marginTop: 7 }}>{base.meta}</div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 14, marginTop: 14 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: '#8B8B98' }}>MARKET · 30D</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 22, marginTop: 5 }}>{base.priceLabel}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: base.trendColor, marginTop: 3 }}>{base.trendLabel} · {p.sold} sold</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 44 }}>
          {spark.map((b, i) => <div key={i} style={{ width: 7, borderRadius: 3, height: b.h, background: b.c }} />)}
        </div>
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '20px 0 9px' }}>{offers.length} OFFERS FROM SELLERS</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {offers.map((o, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#101015', border: `1px solid ${o.border}`, borderRadius: 13, padding: 11 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: o.art, flex: 'none' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{o.shop}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginTop: 3 }}>{o.meta}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700 }}>{o.priceLabel}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98' }}>+{o.shipLabel} ship</div>
            </div>
            <button onClick={() => addToCart(p.id)} style={{ border: 'none', borderRadius: 9, background: o.btnBg, color: o.btnFg, fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 11, padding: '8px 11px', cursor: 'pointer' }}>Add</button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button onClick={() => { addToCart(p.id); go('cart') }} style={{ flex: 1, border: 'none', borderRadius: 12, background: '#C8FF3D', color: '#08080B', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 14, padding: 13, cursor: 'pointer' }}>Buy · {base.priceLabel}</button>
        <button onClick={() => go('trades')} style={{ borderRadius: 12, background: '#17171E', border: 'none', color: '#8A5CFF', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 13, padding: '13px 15px', cursor: 'pointer' }}>Trade</button>
        <button onClick={() => go('want')} style={{ borderRadius: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#F4F4F6', fontSize: 15, padding: '13px 14px', cursor: 'pointer' }}>♡</button>
      </div>

      <div style={{ background: '#0B0B10', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 14, marginTop: 14 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#2BE8FF' }}>BUYER PROTECTION INCLUDED</div>
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#CFCFD8', lineHeight: 1.55 }}>Money held in escrow until you confirm the card arrived as described. 5% + € 0,70 per order, refunded in full on a won dispute.</p>
      </div>

      <div style={{ marginTop: 16, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98' }}>DESCRIPTION</div>
      <p style={{ margin: '8px 0 0', fontSize: 12.5, color: '#CFCFD8', lineHeight: 1.6 }}>{desc}</p>
    </div>
  )
}
