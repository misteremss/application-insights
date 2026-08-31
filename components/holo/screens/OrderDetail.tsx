'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { ART, EUR, statusMeta } from '@/lib/holo/data'

export default function OrderDetail({ holo }: { holo: Holo }) {
  const { state, go, releaseOrder } = holo
  const o = state.orders.find((x) => x.id === state.orderId) || state.orders[0]
  const st = statusMeta(o.status)
  const done = { escrow: 1, transit: 2, delivered: 3, complete: 4, dispute: 3 }[o.status]
  const stepsBase = [
    { name: 'Paid · held in escrow', meta: o.placed + ' · ' + EUR(o.price + o.ship) },
    { name: 'Seller printed Holo label', meta: o.carrier === '—' ? 'Waiting on the seller' : o.carrier + ' label created' },
    { name: 'In transit', meta: o.tracking },
    { name: 'Delivered', meta: o.eta },
    { name: 'Funds released to seller', meta: o.status === 'complete' ? 'Released · order closed' : 'After you confirm receipt' },
  ]
  const steps = stepsBase.map((x, i) => ({ ...x, dot: i < done ? '#C8FF3D' : i === done ? '#2BE8FF' : '#2A2A33', fg: i <= done ? '#F4F4F6' : '#8B8B98' }))
  const canRelease = o.status === 'delivered' || o.status === 'transit'
  const isComplete = o.status === 'complete'
  const inDispute = o.status === 'dispute'
  const releaseLabel = o.status === 'transit' ? 'Arrived early? Confirm & release' : 'Everything’s good · release ' + EUR(o.price + o.ship)
  const rows = [
    { label: 'Item', value: EUR(o.price) },
    { label: 'Shipping · ' + (o.carrier === '—' ? 'not shipped yet' : o.carrier), value: EUR(o.ship) },
    { label: 'Buyer protection', value: EUR(o.price * 0.05 + 0.7) },
  ]

  return (
    <div>
      <div style={{ display: 'flex', gap: 11, alignItems: 'center', background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 13 }}>
        <div style={{ width: 44, height: 60, borderRadius: 7, background: ART[o.artKey as keyof typeof ART], flex: 'none' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3 }}>{o.name}</div>
          <button onClick={() => go('store', { storeId: o.shopId })} style={{ border: 'none', background: 'none', padding: 0, marginTop: 5, fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#2BE8FF', cursor: 'pointer' }}>{o.shop} ›</button>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700 }}>{EUR(o.price + o.ship)}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginTop: 3 }}>{o.placed}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.1em', padding: '5px 9px', borderRadius: 6, background: st.bg, color: st.fg }}>{st.label}</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#8B8B98' }}>{o.eta}</span>
      </div>

      <div style={{ background: '#0B0B10', border: '1px solid rgba(43,232,255,0.2)', borderRadius: 15, padding: 13, marginTop: 12, display: 'flex', alignItems: 'center', gap: 11 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2BE8FF" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l3-5h12l3 5" /><path d="M4 10h16v9H4z" /><path d="M10 14h4" /></svg>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: '#8B8B98' }}>TRACKING</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, marginTop: 4 }}>{o.carrier} · {o.tracking}</div>
        </div>
        <button style={{ border: 'none', borderRadius: 9, background: '#17171E', color: '#2BE8FF', fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.1em', padding: '8px 9px', cursor: 'pointer' }}>COPY</button>
      </div>

      <div style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 15, marginTop: 12 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: s.dot, marginTop: 4, flex: 'none' }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: s.fg }}>{s.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#8B8B98', marginTop: 3 }}>{s.meta}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#0B0B10', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 15, padding: 14, marginTop: 12 }}>
        {rows.map((r) => (
          <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 9 }}>
            <span style={{ fontSize: 12, color: '#CFCFD8' }}>{r.label}</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>{r.value}</span>
          </div>
        ))}
      </div>

      {canRelease && (
        <button onClick={() => releaseOrder(o.id)} style={{ width: '100%', marginTop: 13, border: 'none', borderRadius: 12, background: '#C8FF3D', color: '#08080B', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 13.5, padding: 14, cursor: 'pointer' }}>{releaseLabel}</button>
      )}
      {isComplete && (
        <div style={{ marginTop: 13, background: 'rgba(200,255,61,.1)', border: '1px solid rgba(200,255,61,0.3)', borderRadius: 12, padding: 13 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: '#C8FF3D' }}>FUNDS RELEASED</div>
          <p style={{ margin: '7px 0 0', fontSize: 12, color: '#CFCFD8', lineHeight: 1.5 }}>Order closed. The seller was paid on the next payout run.</p>
          {!o.reviewed && (
            <button onClick={() => go('review')} style={{ marginTop: 11, border: 'none', borderRadius: 10, background: '#C8FF3D', color: '#08080B', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 12, padding: '10px 14px', cursor: 'pointer' }}>Leave a review</button>
          )}
        </div>
      )}
      {inDispute && (
        <div style={{ marginTop: 13, background: 'rgba(255,106,43,.1)', border: '1px solid rgba(255,106,43,0.3)', borderRadius: 12, padding: 13 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: '#FF6A2B' }}>CLAIM OPEN · FUNDS FROZEN</div>
          <p style={{ margin: '7px 0 0', fontSize: 12, color: '#CFCFD8', lineHeight: 1.5 }}>Holo is reviewing your evidence. Nothing is paid to the seller until the case closes.</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <button onClick={() => go('messages')} style={{ flex: 1, borderRadius: 12, background: '#17171E', border: 'none', color: '#F4F4F6', fontWeight: 600, fontSize: 12.5, padding: 13, cursor: 'pointer' }}>Message seller</button>
        <button onClick={() => go('dispute')} style={{ flex: 1, borderRadius: 12, background: 'transparent', border: '1px solid rgba(255,61,166,0.35)', color: '#FF3DA6', fontWeight: 600, fontSize: 12.5, padding: 13, cursor: 'pointer' }}>Report a problem</button>
      </div>
      <p style={{ margin: '12px 0 0', fontSize: 11, color: '#8B8B98', lineHeight: 1.55 }}>You have 48 hours after delivery to raise a problem. Do nothing and funds auto-release on day 3.</p>
    </div>
  )
}
