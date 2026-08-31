'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { fieldInput, primaryBtn, sectionLabel, rowBtn } from '@/lib/holo/styles'

const SCHEDULES = ['Weekly · Tuesday', 'Daily · 09:00', 'Per order · on release']
const HISTORY = [
  { label: '26 Aug · payout', value: '€ 2.104,80', meta: 'NL91 •••• 4300 · paid' },
  { label: '19 Aug · payout', value: '€ 1.386,10', meta: 'NL91 •••• 4300 · paid' },
  { label: '12 Aug · payout', value: '€ 968,40', meta: 'NL91 •••• 4300 · paid' },
]
const BALANCES = [
  { label: 'AVAILABLE', value: '€ 1.842,30', color: '#C8FF3D', meta: 'Next payout Tue 09:00' },
  { label: 'IN ESCROW', value: '€ 862,00', color: '#2BE8FF', meta: 'Releases as buyers confirm' },
]

export default function Payouts({ holo }: { holo: Holo }) {
  const { state, setField, saveBank } = holo
  const bank = state.bank

  const fields: [string, string, keyof typeof bank][] = [
    ['ACCOUNT HOLDER · MUST MATCH YOUR ID', 'Full legal name', 'holder'],
    ['IBAN', 'NL91 ABNA 0417 1643 00', 'iban'],
    ['BIC / SWIFT', 'ABNANL2A', 'bic'],
    ['BANK COUNTRY', 'Netherlands', 'country'],
  ]

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {BALANCES.map((b) => (
          <div key={b.label} style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 15, padding: 13 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: '#8B8B98' }}>{b.label}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 18, marginTop: 7, color: b.color }}>{b.value}</div>
            <div style={{ fontSize: 10.5, color: '#8B8B98', marginTop: 4 }}>{b.meta}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#0B0B10', border: '1px solid rgba(200,255,61,0.22)', borderRadius: 14, padding: 13, marginTop: 12 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: bank.verified ? '#C8FF3D' : '#FF6A2B' }}>
          {bank.verified ? 'IBAN + ID VERIFIED' : 'VERIFICATION PENDING'}
        </div>
        <p style={{ margin: '7px 0 0', fontSize: 12, color: '#CFCFD8', lineHeight: 1.55 }}>
          {bank.verified ? 'Name on the account matches your verified ID. Payouts are enabled.' : 'We send € 0,01 with a code in the reference. Enter it to enable payouts.'}
        </p>
      </div>

      <div style={{ display: 'grid', gap: 11, marginTop: 16 }}>
        {fields.map(([label, hint, key]) => (
          <div key={key}>
            <div style={sectionLabel}>{label}</div>
            <input value={bank[key] as string} onChange={(e) => setField('bank', key, e.target.value)} placeholder={hint} style={{ ...fieldInput, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5 }} />
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 9px' }}>PAYOUT SCHEDULE</div>
      <div style={{ display: 'grid', gap: 7 }}>
        {SCHEDULES.map((n, i) => {
          const [name, meta] = n.split(' · ')
          return (
            <button key={n} onClick={() => setField('bank', 'schedule', i)} style={rowBtn(bank.schedule === i)}>
              <span style={{ fontSize: 12.5 }}>{name}</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#8B8B98' }}>{meta}</span>
            </button>
          )
        })}
      </div>

      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98', margin: '18px 0 9px' }}>PAYOUT HISTORY</div>
      <div style={{ background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 15, overflow: 'hidden' }}>
        {HISTORY.map((h) => (
          <div key={h.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 13px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{h.label}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#8B8B98', marginTop: 3 }}>{h.meta}</div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, fontWeight: 700, color: '#C8FF3D' }}>{h.value}</span>
          </div>
        ))}
      </div>
      <button onClick={saveBank} style={{ ...primaryBtn, marginTop: 14 }}>Save bank details</button>
      <p style={{ margin: '11px 0 0', fontSize: 11, color: '#8B8B98', lineHeight: 1.55 }}>Payouts go only to an account whose holder name matches your verified ID. Changing the IBAN pauses payouts for 24h.</p>
    </div>
  )
}
