'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { spoilerData } from '@/lib/holo/data'

export default function Spoilers({ holo }: { holo: Holo }) {
  const { state, toggle, go } = holo

  return (
    <div>
      <p style={{ margin: '0 0 14px', fontSize: 12.5, color: '#8B8B98', lineHeight: 1.6 }}>
        Upcoming sets, reveal windows and pre-order caps. Turn on a reminder and we&apos;ll ping you the minute the first listing goes live.
      </p>
      <div style={{ display: 'grid', gap: 10 }}>
        {spoilerData().map((s) => {
          const on = !!state.reminders[s.key]
          return (
            <div key={s.key} style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 15, overflow: 'hidden' }}>
              <div style={{ height: 82, background: s.art, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 11, bottom: 11, fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.12em', background: 'rgba(8,8,11,.75)', padding: '4px 7px', borderRadius: 5 }}>{s.tag}</div>
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#8B8B98', marginTop: 5 }}>{s.meta}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 11 }}>
                  <button
                    onClick={() => toggle('reminders', s.key)}
                    style={{ flex: 1, border: 'none', borderRadius: 10, background: on ? '#C8FF3D' : '#17171E', color: on ? '#08080B' : '#F4F4F6', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 12, padding: 10, cursor: 'pointer' }}
                  >
                    {on ? 'Reminder on' : 'Remind me'}
                  </button>
                  <button onClick={() => go('search')} style={{ borderRadius: 10, background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: '#F4F4F6', fontSize: 12, padding: '10px 12px', cursor: 'pointer' }}>Pre-orders</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
