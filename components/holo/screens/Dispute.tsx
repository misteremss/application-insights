'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { chip, fieldInput, rowBtn } from '@/lib/holo/styles'
import ImageSlot from '../ImageSlot'

const REASONS = ['Not as described', 'Damaged in transit', 'Never arrived', 'Wrong card sent', 'Suspected counterfeit']
const WANTS = ['Full refund', 'Partial refund', 'Return & refund']

export default function Dispute({ holo }: { holo: Holo }) {
  const { state, setField, go, fileDispute } = holo
  const dp = state.dispute
  const order = state.orders.find((x) => x.id === state.orderId) || state.orders[0]

  if (dp.filed) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 26 }}>
        <div style={{ width: 82, height: 82, margin: '0 auto', borderRadius: 26, background: 'rgba(255,106,43,.16)', border: '1px solid rgba(255,106,43,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF6A2B" strokeWidth="2" strokeLinecap="round"><path d="M12 8v5" /><circle cx="12" cy="16.5" r="1" /><path d="M12 3l9 16H3z" /></svg>
        </div>
        <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontStretch: '114%' as any, fontSize: 23, letterSpacing: '-.03em', textTransform: 'uppercase', marginTop: 18 }}>Claim filed</div>
        <p style={{ color: '#8B8B98', fontSize: 12.5, lineHeight: 1.6, margin: '9px 18px 0' }}>Case HL-C-2291 · {state.orderId} · {order.shop}. Payout frozen, seller notified, answer within 2 working days.</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <button onClick={() => go('messages')} style={{ flex: 1, border: 'none', borderRadius: 12, background: '#17171E', color: '#F4F4F6', fontWeight: 600, fontSize: 12.5, padding: 13, cursor: 'pointer' }}>Message seller</button>
          <button onClick={() => go('orders')} style={{ flex: 1, borderRadius: 12, background: '#C8FF3D', border: 'none', color: '#08080B', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 12.5, padding: 13, cursor: 'pointer' }}>My orders</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ background: '#0B0B10', border: '1px solid rgba(43,232,255,0.2)', borderRadius: 14, padding: 13 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: '#2BE8FF' }}>TRY THE SELLER FIRST</div>
        <p style={{ margin: '7px 0 0', fontSize: 12, color: '#CFCFD8', lineHeight: 1.55 }}>Most problems close in a message. Your money stays in escrow either way.</p>
        <button onClick={() => go('messages')} style={{ marginTop: 11, border: 'none', borderRadius: 10, background: '#17171E', color: '#2BE8FF', fontWeight: 600, fontSize: 12, padding: '10px 14px', cursor: 'pointer' }}>Message the seller</button>
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 9px' }}>WHAT WENT WRONG · {state.orderId} · {order.shop}</div>
      <div style={{ display: 'grid', gap: 7 }}>
        {REASONS.map((r) => (
          <button key={r} onClick={() => setField('dispute', 'reason', r)} style={rowBtn(dp.reason === r)}>
            <span style={{ fontSize: 12.5 }}>{r}</span>
            <span style={{ color: '#8B8B98', fontSize: 13 }}>›</span>
          </button>
        ))}
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 9px' }}>WHAT YOU WANT</div>
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {WANTS.map((w, i) => (
          <button key={w} onClick={() => setField('dispute', 'want', i)} style={chip(dp.want === i)}>{w.toUpperCase()}</button>
        ))}
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 7px' }}>EVIDENCE · PHOTOS REQUIRED</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, height: 66, borderRadius: 11, overflow: 'hidden', background: '#17171E' }}><ImageSlot placeholder="Front" /></div>
        <div style={{ flex: 1, height: 66, borderRadius: 11, overflow: 'hidden', background: '#17171E' }}><ImageSlot placeholder="Damage" /></div>
        <div style={{ flex: 1, height: 66, borderRadius: 11, overflow: 'hidden', background: '#17171E' }}><ImageSlot placeholder="Packaging" /></div>
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', marginBottom: 7 }}>DESCRIBE IT</div>
        <textarea
          value={dp.detail}
          onChange={(e) => setField('dispute', 'detail', e.target.value)}
          rows={4}
          placeholder="Corner is creased on arrival — the scans showed a sharp corner."
          style={{ ...fieldInput, resize: 'none' }}
        />
      </div>
      <button onClick={fileDispute} style={{ width: '100%', marginTop: 14, border: 'none', borderRadius: 12, background: '#FF3DA6', color: '#08080B', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 14, padding: 14, cursor: 'pointer' }}>File the claim</button>
      <p style={{ margin: '11px 0 0', fontSize: 11, color: '#8B8B98', lineHeight: 1.55 }}>Filing freezes the payout. Holo answers within 2 working days; if you win, the refund lands on your original payment method.</p>
    </div>
  )
}
