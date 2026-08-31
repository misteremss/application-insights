'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { ART, EUR0, statusMeta } from '@/lib/holo/data'

export default function Orders({ holo }: { holo: Holo }) {
  const { state, go } = holo

  return (
    <div style={{ display: 'grid', gap: 9 }}>
      {state.orders.map((o) => {
        const st = statusMeta(o.status)
        const track = o.status === 'delivered' ? 'Confirm receipt to release payout' : `${o.carrier} ${o.tracking} · ${o.eta}`
        return (
          <div key={o.id} onClick={() => go('orderDetail', { orderId: o.id })} style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 15, padding: 13, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 48, borderRadius: 6, background: ART[o.artKey as keyof typeof ART], flex: 'none' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{o.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#8B8B98', marginTop: 4 }}>{o.shop} · {o.id}</div>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700 }}>{EUR0(o.price)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 11 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.1em', padding: '4px 8px', borderRadius: 6, background: st.bg, color: st.fg }}>{st.label}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#8B8B98' }}>{track}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
