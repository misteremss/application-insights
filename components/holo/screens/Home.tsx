'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { PRODUCTS, SELLERS, GAMES, mapProduct, spoilerData } from '@/lib/holo/data'
import { chip } from '@/lib/holo/styles'

export default function Home({ holo }: { holo: Holo }) {
  const { state, go, toggle } = holo
  const heat = [...PRODUCTS].sort((a, b) => b.trend - a.trend).slice(0, 4).map(mapProduct)
  const gameChips = GAMES.slice(1, 11)
  const spoilerPreview = spoilerData().slice(0, 2)

  return (
    <div>
      <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(100deg,#C8FF3D,#2BE8FF 38%,#8A5CFF 72%,#FF3DA6)', padding: 18 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 120% at 6% 0%,rgba(255,255,255,.42),transparent 55%)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(8,8,11,.72)' }}>Sell in 10 seconds</div>
          <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontStretch: '116%' as any, fontSize: 26, lineHeight: 1, letterSpacing: '-.035em', textTransform: 'uppercase', color: '#08080B', marginTop: 8 }}>Snap it. Priced. Live.</div>
          <button onClick={() => go('list')} style={{ marginTop: 14, border: 'none', borderRadius: 11, background: '#08080B', color: '#F4F4F6', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 13, padding: '11px 16px', cursor: 'pointer' }}>Scan a card</button>
        </div>
      </div>

      <div className="hl-scroll" style={{ display: 'flex', gap: 7, marginTop: 16, overflowX: 'auto' }}>
        {gameChips.map((name) => (
          <button key={name} onClick={() => holo.openGameSearch(name)} style={{ ...chip(state.fGame === name), flex: 'none' }}>
            {name.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 22 }}>
        <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: '-.02em' }}>Heat right now</span>
        <button onClick={() => go('trends')} style={{ border: 'none', background: 'none', color: '#C8FF3D', fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '.14em', cursor: 'pointer' }}>TRENDS →</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, marginTop: 11 }}>
        {heat.map((p) => (
          <div key={p.id} onClick={() => go('product', { productId: p.id })} style={{ background: '#101015', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ height: 124, background: p.art, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 8, top: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.1em', background: 'rgba(8,8,11,.72)', padding: '3px 6px', borderRadius: 5 }}>{p.badge}</div>
            </div>
            <div style={{ padding: 9 }}>
              <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.3, height: 28, overflow: 'hidden' }}>{p.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700 }}>{p.priceLabel}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: p.trendColor }}>{p.trendLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 24 }}>
        <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: '-.02em' }}>Spoilers &amp; drops</span>
        <button onClick={() => go('spoilers')} style={{ border: 'none', background: 'none', color: '#C8FF3D', fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '.14em', cursor: 'pointer' }}>ALL →</button>
      </div>
      <div style={{ display: 'grid', gap: 9, marginTop: 11 }}>
        {spoilerPreview.map((s) => {
          const on = !!state.reminders[s.key]
          return (
            <div key={s.key} style={{ display: 'flex', gap: 11, alignItems: 'center', background: '#101015', borderRadius: 14, padding: 11, border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ width: 40, height: 52, borderRadius: 7, background: s.art, flex: 'none' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#8B8B98', marginTop: 4 }}>{s.meta}</div>
              </div>
              <button
                onClick={() => toggle('reminders', s.key)}
                style={{ border: 'none', borderRadius: 9, background: on ? '#C8FF3D' : '#17171E', color: on ? '#08080B' : '#F4F4F6', fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.1em', padding: '7px 9px', cursor: 'pointer' }}
              >
                {on ? 'ON' : 'REMIND'}
              </button>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 24 }}>
        <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: '-.02em' }}>Shops you follow</span>
      </div>
      <div className="hl-scroll" style={{ display: 'flex', gap: 11, marginTop: 11, overflowX: 'auto' }}>
        {SELLERS.map((s) => (
          <div key={s.id} onClick={() => go('store', { storeId: s.id })} style={{ width: 132, flex: 'none', background: '#101015', borderRadius: 14, padding: 12, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ width: 34, height: 34, borderRadius: 11, background: s.art }} />
            <div style={{ fontSize: 12, fontWeight: 600, marginTop: 9 }}>{s.shop}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginTop: 4 }}>{s.followers} followers</div>
          </div>
        ))}
      </div>
    </div>
  )
}
