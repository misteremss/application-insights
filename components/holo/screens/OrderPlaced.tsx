'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { EUR } from '@/lib/holo/data'

export default function OrderPlaced({ holo }: { holo: Holo }) {
  const { go, groups, itemsTotal, shipTotal, protection, cartLines, tab } = holo
  const g = groups()
  const grand = itemsTotal() + shipTotal() + protection()
  const orderConfirmLine = 'Order HL-' + (48210 + cartLines().length) + ' · ' + g.length + ' parcel(s) · ' + EUR(grand) + ' held in escrow.'

  const steps = [
    { name: 'Payment held in escrow', meta: 'Today 09:41 · protected', dot: '#C8FF3D', fg: '#F4F4F6' },
    { name: 'Seller prints Holo label', meta: 'Expected within 24h', dot: '#2BE8FF', fg: '#F4F4F6' },
    { name: 'In transit · tracked', meta: 'Estimated 2-4 days', dot: '#2A2A33', fg: '#8B8B98' },
    { name: 'Confirm & release payout', meta: '2 days after delivery', dot: '#2A2A33', fg: '#8B8B98' },
  ]

  return (
    <div style={{ textAlign: 'center', paddingTop: 34 }}>
      <div style={{ width: 92, height: 92, margin: '0 auto', borderRadius: 28, background: 'linear-gradient(140deg,#C8FF3D,#2BE8FF 45%,#8A5CFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#08080B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </div>
      <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontStretch: '114%' as any, fontSize: 27, letterSpacing: '-.03em', textTransform: 'uppercase', marginTop: 20 }}>Paid</div>
      <p style={{ color: '#8B8B98', fontSize: 13, lineHeight: 1.6, margin: '9px 24px 0' }}>{orderConfirmLine}</p>
      <div style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 15, marginTop: 22, textAlign: 'left' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 13 }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: s.dot, marginTop: 4, flex: 'none' }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: s.fg }}>{s.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#8B8B98', marginTop: 3 }}>{s.meta}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button onClick={() => go('orders')} style={{ flex: 1, border: 'none', borderRadius: 12, background: '#C8FF3D', color: '#08080B', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 13, padding: 13, cursor: 'pointer' }}>Track order</button>
        <button onClick={() => tab('home')} style={{ flex: 1, borderRadius: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#F4F4F6', fontWeight: 600, fontSize: 13, padding: 13, cursor: 'pointer' }}>Keep browsing</button>
      </div>
    </div>
  )
}
