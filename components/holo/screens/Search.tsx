'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { GAMES, TYPES, CONDS, SORTS, PRODUCTS, mapProduct } from '@/lib/holo/data'
import { chip, fieldInput } from '@/lib/holo/styles'

const SET_OPTIONS = ['All extensions', ...Array.from(new Set(PRODUCTS.map((p) => p.set)))]
const selectStyle = { ...fieldInput, borderRadius: 10, fontSize: 12, padding: 9 }

export default function Search({ holo }: { holo: Holo }) {
  const { state, set, toggle, filtered, addToCart, go } = holo
  const results = filtered().map(mapProduct)

  const toggles: [string, 'graded' | 'sealedOnly' | 'tradeOnly'][] = [
    ['GRADED ONLY', 'graded'],
    ['SEALED ONLY', 'sealedOnly'],
    ['TRENDING', 'tradeOnly'],
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: '#17171E', borderRadius: 12, padding: '10px 12px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B8B98" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4.2-4.2" /></svg>
        <input value={state.query} onChange={(e) => set('query', e.target.value)} placeholder="Player, card, set, seller" style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#F4F4F6', fontSize: 13 }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginTop: 11 }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', marginBottom: 5 }}>PRODUCT TYPE</div>
          <select value={state.fType} onChange={(e) => set('fType', e.target.value)} style={selectStyle}>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', marginBottom: 5 }}>CATEGORY</div>
          <select value={state.fGame} onChange={(e) => set('fGame', e.target.value)} style={selectStyle}>
            {GAMES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', marginBottom: 5 }}>EXTENSION / SET</div>
          <select value={state.fSet} onChange={(e) => set('fSet', e.target.value)} style={selectStyle}>
            {SET_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', marginBottom: 5 }}>CONDITION</div>
          <select value={state.fCond} onChange={(e) => set('fCond', e.target.value)} style={selectStyle}>
            {CONDS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', marginBottom: 5 }}>MIN €</div>
          <input value={state.fMin} onChange={(e) => set('fMin', e.target.value)} placeholder="0" style={{ ...selectStyle, fontFamily: "'JetBrains Mono',monospace" }} />
        </div>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', marginBottom: 5 }}>MAX €</div>
          <input value={state.fMax} onChange={(e) => set('fMax', e.target.value)} placeholder="9999" style={{ ...selectStyle, fontFamily: "'JetBrains Mono',monospace" }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 7, marginTop: 11, flexWrap: 'wrap' }}>
        {toggles.map(([name, key]) => (
          <button key={key} onClick={() => toggle(key)} style={chip(state[key])}>{name}</button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#8B8B98', letterSpacing: '.1em' }}>{results.length} RESULTS</span>
        <select value={state.fSort} onChange={(e) => set('fSort', e.target.value)} style={{ background: '#17171E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 9, color: '#F4F4F6', fontSize: 11, padding: '6px 8px', outline: 'none' }}>
          {SORTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gap: 9, marginTop: 12 }}>
        {results.map((p) => (
          <div key={p.id} onClick={() => go('product', { productId: p.id })} style={{ display: 'flex', gap: 11, background: '#101015', borderRadius: 14, padding: 10, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ width: 54, height: 74, borderRadius: 8, background: p.art, flex: 'none' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#8B8B98', marginTop: 4 }}>{p.meta}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, padding: '3px 6px', borderRadius: 5, background: p.condBg, color: p.condFg }}>{p.condition}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98' }}>{p.sellerLabel}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 700 }}>{p.priceLabel}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); addToCart(p.id) }}
                  style={{ border: 'none', borderRadius: 9, background: '#C8FF3D', color: '#08080B', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 11, padding: '7px 11px', cursor: 'pointer' }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8B8B98', fontSize: 13 }}>Nothing matches those filters. Loosen one.</div>
      )}
    </div>
  )
}
