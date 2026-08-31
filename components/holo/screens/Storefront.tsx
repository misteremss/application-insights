'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { PRODUCTS, seller, ART, mapProduct } from '@/lib/holo/data'

export default function Storefront({ holo }: { holo: Holo }) {
  const { state, toggle, go } = holo
  const store = seller(state.storeId)
  const following = !!state.following[state.storeId]
  const items = PRODUCTS.filter((p) => p.sellerId === store.id).concat(PRODUCTS.slice(0, 3)).slice(0, 6).map(mapProduct)
  const stats = [
    { value: String(PRODUCTS.filter((p) => p.sellerId === store.id).length * 214), label: 'LISTINGS', color: '#F4F4F6' },
    { value: store.followers, label: 'FOLLOWERS', color: '#F4F4F6' },
    { value: String(store.rating), label: 'RATING', color: '#C8FF3D' },
  ]
  const reviews = state.myReviews.map((r) => ({ ...r, stars: '★★★★★'.slice(0, r.stars) + '☆☆☆☆☆'.slice(0, 5 - r.stars) }))

  return (
    <div>
      <div style={{ height: 96, borderRadius: 16, background: ART.foil, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(90% 120% at 10% 0%,rgba(255,255,255,.35),transparent 55%)' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ width: 60, height: 60, borderRadius: 17, background: store.art, border: '2px solid #08080B', marginTop: -26 }} />
        <button
          onClick={() => toggle('following', state.storeId)}
          style={{ border: 'none', borderRadius: 11, background: following ? '#17171E' : '#C8FF3D', color: following ? '#F4F4F6' : '#08080B', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 12, padding: '9px 16px', cursor: 'pointer' }}
        >
          {following ? 'Following' : 'Follow'}
        </button>
      </div>
      <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontStretch: '110%' as any, fontSize: 21, letterSpacing: '-.025em', marginTop: 11 }}>{store.shop}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 6, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#8B8B98' }}>{store.handle} · {store.city}</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.1em', background: 'rgba(43,232,255,.15)', color: '#2BE8FF', padding: '3px 7px', borderRadius: 5 }}>{store.verified}</span>
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 12, color: '#8B8B98', lineHeight: 1.55 }}>{store.bio}</p>
      <div style={{ display: 'flex', gap: 16, marginTop: 13 }}>
        {stats.map((s) => (
          <div key={s.label}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 15, color: s.color }}>{s.value}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', letterSpacing: '.1em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
        {items.map((p, i) => (
          <div key={p.id + i} onClick={() => go('product', { productId: p.id })} style={{ background: '#101015', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ height: 80, background: p.art }} />
            <div style={{ padding: 7 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700 }}>{p.priceLabel}</div>
              <div style={{ fontSize: 9, color: '#8B8B98', marginTop: 3, height: 22, overflow: 'hidden', lineHeight: 1.2 }}>{p.name}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '20px 0 9px' }}>REVIEWS · VERIFIED ORDERS ONLY</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {reviews.map((r, i) => (
          <div key={i} style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600 }}>{r.who}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#C8FF3D' }}>{r.stars}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginLeft: 'auto' }}>{r.when}</span>
            </div>
            <p style={{ margin: '7px 0 0', fontSize: 11.5, color: '#CFCFD8', lineHeight: 1.55 }}>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
