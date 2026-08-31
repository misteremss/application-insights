'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { fieldInput, primaryBtn, sectionLabel, track, knob } from '@/lib/holo/styles'

const COUNTRIES = ['Netherlands', 'Germany', 'Belgium', 'France', 'Italy', 'Spain', 'United Kingdom', 'Poland', 'United States']

export default function SignUp({ holo }: { holo: Holo }) {
  const { state, setField, toggle, tab, go } = holo
  const au = state.auth
  const handlePreview = 'holo.app/' + (au.handle || 'your-shop')

  return (
    <div style={{ padding: '20px 18px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ position: 'relative', width: 36, height: 36, borderRadius: 11, background: '#0E0E13', border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden', clipPath: 'polygon(0 0,74% 0,100% 26%,100% 100%,0 100%)' }}>
          <div style={{ position: 'absolute', left: '-30%', top: '26%', width: '160%', height: '14%', background: 'linear-gradient(90deg,#C8FF3D,#2BE8FF,#8A5CFF,#FF3DA6)', transform: 'rotate(-38deg)' }} />
        </div>
        <div>
          <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 900, fontStretch: '116%' as any, fontSize: 21, letterSpacing: '-.035em', textTransform: 'uppercase', lineHeight: 1 }}>Join Holo</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.18em', color: '#8B8B98', marginTop: 5 }}>FREE · NO LISTING FEES</div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 11, marginTop: 20 }}>
        <div>
          <div style={sectionLabel}>FULL NAME</div>
          <input value={au.name} onChange={(e) => setField('auth', 'name', e.target.value)} placeholder="Luca Bernard" style={fieldInput} />
        </div>
        <div>
          <div style={sectionLabel}>HANDLE · BECOMES YOUR SHOP LINK</div>
          <input value={au.handle} onChange={(e) => setField('auth', 'handle', e.target.value)} placeholder="vaultmilano" style={fieldInput} />
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#2BE8FF', marginTop: 7 }}>{handlePreview}</div>
        </div>
        <div>
          <div style={sectionLabel}>EMAIL</div>
          <input value={au.email} onChange={(e) => setField('auth', 'email', e.target.value)} placeholder="you@email.com" style={fieldInput} />
        </div>
        <div>
          <div style={sectionLabel}>PASSWORD · 8+ CHARACTERS</div>
          <input value={au.password} onChange={(e) => setField('auth', 'password', e.target.value)} type="password" placeholder="••••••••" style={fieldInput} />
        </div>
        <div>
          <div style={sectionLabel}>COUNTRY · SETS CURRENCY &amp; SHIPPING ZONE</div>
          <select value={au.country} onChange={(e) => setField('auth', 'country', e.target.value)} style={{ ...fieldInput, fontSize: 12.5, padding: 12 }}>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 13, marginTop: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600 }}>I want to sell too</div>
          <div style={{ fontSize: 11, color: '#8B8B98', marginTop: 4, lineHeight: 1.45 }}>We&apos;ll set up your shop and shipping right after signup.</div>
        </div>
        <button onClick={() => toggle('auth', 'seller')} style={track(au.seller)}><div style={knob(au.seller)} /></button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 13, marginTop: 9 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600 }}>I&apos;m 18+ and accept the terms</div>
          <div style={{ fontSize: 11, color: '#8B8B98', marginTop: 4, lineHeight: 1.45 }}>Terms of sale, buyer protection policy and privacy notice.</div>
        </div>
        <button onClick={() => toggle('auth', 'accept')} style={track(au.accept)}><div style={knob(au.accept)} /></button>
      </div>

      <button onClick={() => tab('home')} style={{ ...primaryBtn, marginTop: 16 }}>Create account</button>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 16 }}>
        <span style={{ fontSize: 12.5, color: '#8B8B98' }}>Already on Holo?</span>
        <button onClick={() => go('signin')} style={{ border: 'none', background: 'none', padding: 0, color: '#C8FF3D', fontWeight: 700, fontSize: 12.5, cursor: 'pointer' }}>Sign in</button>
      </div>
    </div>
  )
}
