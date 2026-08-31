'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { chip, track, knob } from '@/lib/holo/styles'

const SHIP_TOGGLES: [string, string, 'combine' | 'holoLabel' | 'sameDay'][] = [
  ['Combine shipping in one parcel', 'Buyers bundling from your shop pay once.', 'combine'],
  ['Holo tracked labels', 'Discounted rates + seller protection to € 500.', 'holoLabel'],
  ['Same-day dispatch badge', 'Commits you to shipping before 17:00 on weekdays.', 'sameDay'],
]

export default function ShippingSettings({ holo }: { holo: Holo }) {
  const { state, setShipRow, removeShipRow, addShipRow, toggle } = holo

  return (
    <div>
      <p style={{ margin: '0 0 14px', fontSize: 12.5, color: '#8B8B98', lineHeight: 1.6 }}>
        Set your own rates per zone. Buyers see the cheapest option that fits their bundle; anything they add from your shop ships in the same parcel.
      </p>
      <div style={{ display: 'grid', gap: 9 }}>
        {state.shipRows.map((r, i) => (
          <div key={i} style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>{r.carrier}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#8B8B98', marginTop: 4 }}>{r.meta}</div>
              </div>
              <input
                value={r.price}
                onChange={(e) => setShipRow(i, { price: e.target.value })}
                style={{ width: 74, boxSizing: 'border-box', background: '#17171E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 9, color: '#F4F4F6', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, padding: 9, outline: 'none', textAlign: 'right' }}
              />
              <button onClick={() => removeShipRow(i)} style={{ width: 30, height: 30, flex: 'none', border: 'none', borderRadius: 9, background: '#17171E', color: '#FF3DA6', cursor: 'pointer', fontSize: 14 }}>×</button>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              <button onClick={() => setShipRow(i, { tracked: !r.tracked })} style={chip(r.tracked)}>{r.tracked ? 'TRACKED' : 'UNTRACKED'}</button>
              <button onClick={() => setShipRow(i, { combine: !r.combine })} style={chip(r.combine)}>{r.combine ? 'COMBINES' : 'SINGLE ONLY'}</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addShipRow} style={{ width: '100%', marginTop: 11, borderRadius: 12, background: 'transparent', border: '1px dashed rgba(255,255,255,0.22)', color: '#F4F4F6', fontSize: 13, fontWeight: 600, padding: 13, cursor: 'pointer' }}>+ Add a shipping option</button>

      <div style={{ display: 'grid', gap: 9, marginTop: 16 }}>
        {SHIP_TOGGLES.map(([name, meta, key]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 13 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: 11, color: '#8B8B98', marginTop: 4, lineHeight: 1.45 }}>{meta}</div>
            </div>
            <button onClick={() => toggle('shipFlags', key)} style={track(state.shipFlags[key])}><div style={knob(state.shipFlags[key])} /></button>
          </div>
        ))}
      </div>

      <div style={{ background: '#0B0B10', border: '1px solid rgba(255,106,43,0.22)', borderRadius: 14, padding: 13, marginTop: 14 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#FF6A2B' }}>SELLER PROTECTION</div>
        <p style={{ margin: '7px 0 0', fontSize: 11.5, color: '#CFCFD8', lineHeight: 1.55 }}>
          Ship with a tracked Holo label and you&apos;re covered for loss and damage up to € 500 — and &ldquo;item not received&rdquo; claims can&apos;t be charged back to you.
        </p>
      </div>
    </div>
  )
}
