'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { fieldInput, primaryBtn, sectionLabel } from '@/lib/holo/styles'

const SOCIALS: [string, string, string, string][] = [
  ['Continue with Apple', '#F4F4F6', '#08080B', ''],
  ['Continue with Google', '#17171E', '#F4F4F6', 'rgba(255,255,255,0.12)'],
  ['Continue with Facebook', '#17171E', '#F4F4F6', 'rgba(255,255,255,0.12)'],
]

export default function SignIn({ holo }: { holo: Holo }) {
  const { state, setField, go, tab } = holo
  const au = state.auth

  return (
    <div style={{ padding: '20px 18px 32px' }}>
      <div
        style={{
          position: 'relative', height: 150, borderRadius: 20, overflow: 'hidden',
          background: 'linear-gradient(100deg,#C8FF3D,#2BE8FF 38%,#8A5CFF 72%,#FF3DA6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 120% at 6% 0%,rgba(255,255,255,.45),transparent 55%)' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative', width: 44, height: 44, borderRadius: 13, background: '#08080B', overflow: 'hidden', clipPath: 'polygon(0 0,74% 0,100% 26%,100% 100%,0 100%)' }}>
            <div style={{ position: 'absolute', left: '8%', top: '34%', width: '84%', height: 5, borderRadius: 4, background: '#F4F4F6', transform: 'rotate(-38deg)' }} />
            <div style={{ position: 'absolute', left: '26%', top: '62%', width: '56%', height: 3, borderRadius: 3, background: '#C8FF3D', transform: 'rotate(-38deg)' }} />
          </div>
          <span style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontStretch: '118%' as any, fontSize: 34, letterSpacing: '-.04em', textTransform: 'uppercase', lineHeight: 1, color: '#08080B' }}>Holo</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(8,8,11,.72)' }}>Chase the card</span>
        </div>
      </div>

      <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontStretch: '112%' as any, fontSize: 22, letterSpacing: '-.025em', marginTop: 22 }}>Welcome back</div>
      <p style={{ margin: '7px 0 0', fontSize: 12.5, color: '#8B8B98', lineHeight: 1.55 }}>4.2M cards from 38.000 shops across Europe.</p>

      <div style={{ display: 'grid', gap: 11, marginTop: 18 }}>
        <div>
          <div style={sectionLabel}>EMAIL</div>
          <input value={au.email} onChange={(e) => setField('auth', 'email', e.target.value)} placeholder="you@email.com" style={fieldInput} />
        </div>
        <div>
          <div style={sectionLabel}>PASSWORD</div>
          <input value={au.password} onChange={(e) => setField('auth', 'password', e.target.value)} type="password" placeholder="••••••••" style={fieldInput} />
        </div>
      </div>
      <button style={{ border: 'none', background: 'none', padding: 0, marginTop: 11, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '.1em', color: '#2BE8FF', cursor: 'pointer' }}>
        FORGOT PASSWORD?
      </button>

      <button onClick={() => tab('home')} style={{ ...primaryBtn, marginTop: 16 }}>Sign in</button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 11, margin: '18px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#5A5A66' }}>OR</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {SOCIALS.map(([name, bg, fg, bd]) => (
          <button
            key={name}
            onClick={() => tab('home')}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12,
              cursor: 'pointer', fontWeight: 600, fontSize: 13, padding: 13, background: bg, color: fg,
              border: bd ? '1px solid ' + bd : 'none',
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 22 }}>
        <span style={{ fontSize: 12.5, color: '#8B8B98' }}>New to Holo?</span>
        <button onClick={() => go('signup')} style={{ border: 'none', background: 'none', padding: 0, color: '#C8FF3D', fontWeight: 700, fontSize: 12.5, cursor: 'pointer' }}>Create an account</button>
      </div>
      <button
        onClick={() => tab('home')}
        style={{ width: '100%', marginTop: 12, borderRadius: 12, background: 'transparent', border: '1px solid rgba(255,255,255,0.14)', color: '#8B8B98', fontSize: 12.5, fontWeight: 600, padding: 12, cursor: 'pointer' }}
      >
        Browse without an account
      </button>
    </div>
  )
}
