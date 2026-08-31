'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { GAMES, TYPES, CONDS, EUR } from '@/lib/holo/data'
import { fieldInput, primaryBtn, sectionLabel } from '@/lib/holo/styles'
import ImageSlot from '../ImageSlot'

const GAMES_REAL = GAMES.slice(1)
const TYPES_REAL = TYPES.slice(1)
const CONDS_REAL = CONDS.slice(1)
const selectStyle = { ...fieldInput, fontSize: 12, padding: 11 }

export default function ListItem({ holo }: { holo: Holo }) {
  const { state, setField, publishListing } = holo
  const li = state.li
  const price = parseFloat(String(li.price).replace(',', '.')) || 0
  const payoutFee = price * 0.03 + 0.25
  const payout = [
    { label: 'Buyer pays', value: EUR(price + price * 0.05 + 0.7 + 4.5), color: '#8B8B98', weight: 400 },
    { label: 'Holo fee · 3% + € 0,25', value: '− ' + EUR(payoutFee), color: '#FF6A2B', weight: 400 },
    { label: 'You receive', value: EUR(Math.max(0, price - payoutFee)), color: '#C8FF3D', weight: 700 },
  ]

  return (
    <div>
      <div style={{ position: 'relative', height: 150, borderRadius: 16, overflow: 'hidden', background: '#0B0B10', border: '1px solid rgba(43,232,255,0.25)' }}>
        <div style={{ position: 'absolute', inset: 0 }}><ImageSlot placeholder="Camera / drop card photo" /></div>
        <div style={{ position: 'absolute', left: 0, width: '100%', height: 2, background: '#2BE8FF', boxShadow: '0 0 16px 4px rgba(43,232,255,.55)', animation: 'holoScan 2.1s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 11, top: 11, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', background: 'rgba(8,8,11,.75)', color: '#2BE8FF', padding: '5px 8px', borderRadius: 5, pointerEvents: 'none' }}>MATCHED · 98%</div>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <div style={{ flex: 1, height: 56, borderRadius: 11, overflow: 'hidden', background: '#17171E' }}><ImageSlot placeholder="Front" /></div>
        <div style={{ flex: 1, height: 56, borderRadius: 11, overflow: 'hidden', background: '#17171E' }}><ImageSlot placeholder="Back" /></div>
        <div style={{ flex: 1, height: 56, borderRadius: 11, overflow: 'hidden', background: '#17171E' }}><ImageSlot placeholder="Corners" /></div>
      </div>

      <div style={{ display: 'grid', gap: 11, marginTop: 16 }}>
        <div>
          <div style={sectionLabel}>TITLE</div>
          <input value={li.title} onChange={(e) => setField('li', 'title', e.target.value)} style={fieldInput} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
          <div>
            <div style={sectionLabel}>CATEGORY</div>
            <select value={li.game} onChange={(e) => setField('li', 'game', e.target.value)} style={selectStyle}>
              {GAMES_REAL.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <div style={sectionLabel}>PRODUCT TYPE</div>
            <select value={li.type} onChange={(e) => setField('li', 'type', e.target.value)} style={selectStyle}>
              {TYPES_REAL.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <div style={sectionLabel}>CONDITION</div>
            <select value={li.condition} onChange={(e) => setField('li', 'condition', e.target.value)} style={selectStyle}>
              {CONDS_REAL.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <div style={sectionLabel}>QUANTITY</div>
            <input value={li.qty} onChange={(e) => setField('li', 'qty', e.target.value)} style={{ ...fieldInput, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, padding: 11 }} />
          </div>
        </div>
        <div>
          <div style={sectionLabel}>DESCRIPTION</div>
          <textarea value={li.desc} onChange={(e) => setField('li', 'desc', e.target.value)} rows={3} style={{ ...fieldInput, resize: 'none' }} />
        </div>
        <div>
          <div style={sectionLabel}>PRICE €</div>
          <input
            value={li.price}
            onChange={(e) => setField('li', 'price', e.target.value)}
            style={{ ...fieldInput, border: '1px solid rgba(200,255,61,0.35)', fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17 }}
          />
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#2BE8FF', marginTop: 7 }}>Market € 389 · 214 sold in 30d · price under € 402 to sell within a week</div>
        </div>
      </div>

      <div style={{ background: '#0B0B10', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 15, padding: 14, marginTop: 14 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98' }}>YOUR PAYOUT</div>
        {payout.map((p) => (
          <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10 }}>
            <span style={{ fontSize: 12, color: p.color }}>{p.label}</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: p.weight, color: p.color }}>{p.value}</span>
          </div>
        ))}
      </div>
      <button onClick={publishListing} style={{ ...primaryBtn, marginTop: 14 }}>{state.published ? 'Listing live · edit' : 'Publish listing'}</button>
    </div>
  )
}
