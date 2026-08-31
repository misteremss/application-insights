import type { CSSProperties } from 'react'

// Shared style helpers ported from the HOLO design (chip / toggle-track / row-button states).

export const chip = (on: boolean): CSSProperties => ({
  fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '.1em',
  padding: '7px 11px', borderRadius: 20, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
  fontWeight: on ? 700 : 400, background: on ? '#C8FF3D' : '#17171E', color: on ? '#08080B' : '#B9B9C4',
})

export const track = (on: boolean): CSSProperties => ({
  width: 42, height: 24, flex: 'none', border: 'none', borderRadius: 14, cursor: 'pointer', padding: 3,
  display: 'flex', justifyContent: on ? 'flex-end' : 'flex-start', background: on ? '#C8FF3D' : '#2A2A33',
})

export const knob = (on: boolean): CSSProperties => ({
  width: 18, height: 18, borderRadius: '50%', background: on ? '#08080B' : '#8B8B98',
})

export const rowBtn = (on: boolean): CSSProperties => ({
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, textAlign: 'left',
  borderRadius: 11, padding: 11, cursor: 'pointer', color: '#F4F4F6', width: '100%',
  background: on ? 'rgba(200,255,61,.1)' : '#17171E',
  border: '1px solid ' + (on ? '#C8FF3D' : 'rgba(255,255,255,0.08)'),
})

export const sectionLabel: CSSProperties = {
  fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em',
  textTransform: 'uppercase', color: '#8B8B98', marginBottom: 6,
}

export const fieldInput: CSSProperties = {
  width: '100%', boxSizing: 'border-box', background: '#17171E', border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 11, color: '#F4F4F6', fontSize: 13, padding: 13, outline: 'none',
}

export const primaryBtn: CSSProperties = {
  width: '100%', border: 'none', borderRadius: 12, background: '#C8FF3D', color: '#08080B',
  fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 14, padding: 14, cursor: 'pointer',
}

export const card: CSSProperties = {
  background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 15, padding: 13,
}
