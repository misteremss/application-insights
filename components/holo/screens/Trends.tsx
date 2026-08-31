'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { PRODUCTS, bars, mapProduct } from '@/lib/holo/data'
import { chip } from '@/lib/holo/styles'

const TABS = ['Top gainers', 'Top losers', 'Most sold', 'New highs']

export default function Trends({ holo }: { holo: Holo }) {
  const { state, set, go } = holo
  const indexBars = bars(3, 12)

  let movers = [...PRODUCTS]
  if (state.trendTab === 'Top gainers') movers.sort((a, b) => b.trend - a.trend)
  if (state.trendTab === 'Top losers') movers.sort((a, b) => a.trend - b.trend)
  if (state.trendTab === 'Most sold') movers.sort((a, b) => b.sold - a.sold)
  if (state.trendTab === 'New highs') movers.sort((a, b) => b.price - a.price)
  const rows = movers.slice(0, 6).map((p) => ({ ...mapProduct(p), meta: p.game + ' · ' + p.sold + ' sold' }))

  return (
    <div>
      <div style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 15 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: '#8B8B98' }}>HOLO 100 INDEX</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 7 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 26 }}>1.284,60</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#C8FF3D', marginTop: 3 }}>▲ 3,8% · 30 days</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 56 }}>
            {indexBars.map((b, i) => <div key={i} style={{ width: 7, borderRadius: 3, height: b.h, background: b.c }} />)}
          </div>
        </div>
      </div>

      <div className="hl-scroll" style={{ display: 'flex', gap: 7, marginTop: 14, overflowX: 'auto' }}>
        {TABS.map((name) => (
          <button key={name} onClick={() => set('trendTab', name)} style={{ ...chip(state.trendTab === name), flex: 'none' }}>{name.toUpperCase()}</button>
        ))}
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 9px' }}>{state.trendTab.toUpperCase()} · 30 DAYS</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {rows.map((m) => (
          <div key={m.id} onClick={() => go('product', { productId: m.id })} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 13, padding: 11, cursor: 'pointer' }}>
            <div style={{ width: 34, height: 46, borderRadius: 6, background: m.art, flex: 'none' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{m.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginTop: 4 }}>{m.meta}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700 }}>{m.priceLabel}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: m.trendColor, marginTop: 2 }}>{m.trendLabel}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
