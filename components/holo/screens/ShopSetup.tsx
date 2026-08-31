'use client'

import type { Holo } from '@/lib/holo/useHolo'
import { fieldInput, primaryBtn, sectionLabel } from '@/lib/holo/styles'
import ImageSlot from '../ImageSlot'

export default function ShopSetup({ holo }: { holo: Holo }) {
  const { state, setField, saveShop } = holo
  const shop = state.shop

  const fields: [string, string, 'name' | 'handle' | 'city' | 'vat'][] = [
    ['SHOP NAME', 'Vault Milano', 'name'],
    ['HANDLE', 'vaultmilano', 'handle'],
    ['SHIPS FROM', 'City, country', 'city'],
    ['VAT / TAX ID (BUSINESS ONLY)', 'Optional', 'vat'],
  ]

  return (
    <div>
      <p style={{ margin: '0 0 16px', fontSize: 12.5, color: '#8B8B98', lineHeight: 1.6 }}>
        Your shop is your brand on Holo — name, logo, banner, policies. Buyers follow shops, not listings.
      </p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 74, height: 74, borderRadius: 20, background: '#17171E', overflow: 'hidden', flex: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
          <ImageSlot placeholder="Logo" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={sectionLabel}>SHOP LOGO</div>
          <p style={{ margin: '6px 0 0', fontSize: 11.5, color: '#8B8B98', lineHeight: 1.5 }}>Square, min 512px. Shown on every listing card.</p>
        </div>
      </div>
      <div style={{ height: 74, borderRadius: 14, marginTop: 11, overflow: 'hidden', background: '#17171E' }}>
        <ImageSlot placeholder="Drop a banner (1600×400)" />
      </div>

      <div style={{ display: 'grid', gap: 11, marginTop: 16 }}>
        {fields.map(([label, hint, key]) => (
          <div key={key}>
            <div style={sectionLabel}>{label}</div>
            <input value={shop[key]} onChange={(e) => setField('shop', key, e.target.value)} placeholder={hint} style={fieldInput} />
          </div>
        ))}
        <div>
          <div style={sectionLabel}>SHOP BIO</div>
          <textarea
            value={shop.bio}
            onChange={(e) => setField('shop', 'bio', e.target.value)}
            rows={3}
            placeholder="What you specialise in, how fast you ship"
            style={{ ...fieldInput, resize: 'none' }}
          />
        </div>
      </div>

      <div style={{ background: '#0B0B10', border: '1px solid rgba(43,232,255,0.2)', borderRadius: 14, padding: 13, marginTop: 14 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#2BE8FF' }}>VERIFICATION</div>
        <p style={{ margin: '7px 0 0', fontSize: 11.5, color: '#CFCFD8', lineHeight: 1.55 }}>ID + IBAN check unlocks payouts and the verified badge. Business sellers add a VAT number for invoices.</p>
      </div>
      <button onClick={saveShop} style={{ ...primaryBtn, marginTop: 14 }}>{shop.saved ? 'Save changes' : 'Open my shop'}</button>
    </div>
  )
}
