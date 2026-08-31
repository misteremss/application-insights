'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { chip, fieldInput, primaryBtn } from '@/lib/holo/styles'

const STAR_LABELS = ['', 'Bad', 'Poor', 'OK', 'Good', 'Perfect']
const SUBS: ['speed' | 'packaging' | 'accuracy', string][] = [
  ['speed', 'Dispatch speed'],
  ['packaging', 'Packaging'],
  ['accuracy', 'As described'],
]
const OPT_LABELS: Record<number, string> = { 3: 'OK', 4: 'GOOD', 5: 'PERFECT' }

export default function Review({ holo }: { holo: Holo }) {
  const { state, setField, submitReview } = holo
  const rv = state.review
  const order = state.orders.find((x) => x.id === state.orderId) || state.orders[0]

  return (
    <div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98' }}>{order.shop} · {state.orderId}</div>
      <div style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 18, marginTop: 11, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setField('review', 'stars', n)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 30, lineHeight: 1, padding: 0, color: n <= rv.stars ? '#C8FF3D' : '#3A3A44' }}>
              {n <= rv.stars ? '★' : '☆'}
            </button>
          ))}
        </div>
        <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 15, marginTop: 12 }}>{STAR_LABELS[rv.stars]}</div>
      </div>
      <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
        {SUBS.map(([key, label]) => (
          <div key={key}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', marginBottom: 7 }}>{label}</div>
            <div style={{ display: 'flex', gap: 7 }}>
              {[3, 4, 5].map((n) => (
                <button key={n} onClick={() => setField('review', key, n)} style={chip(rv[key] === n)}>{OPT_LABELS[n]}</button>
              ))}
            </div>
          </div>
        ))}
        <div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', marginBottom: 7 }}>YOUR REVIEW</div>
          <textarea
            value={rv.text}
            onChange={(e) => setField('review', 'text', e.target.value)}
            rows={4}
            placeholder="Was the card as described? How was it packed?"
            style={{ ...fieldInput, resize: 'none' }}
          />
        </div>
      </div>
      <button onClick={submitReview} style={{ ...primaryBtn, marginTop: 14 }}>Post review</button>
      <p style={{ margin: '11px 0 0', fontSize: 11, color: '#8B8B98', lineHeight: 1.55 }}>Reviews are public and tied to this order. The seller can reply once.</p>
    </div>
  )
}
