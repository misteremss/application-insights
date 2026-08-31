'use client'

import type { Holo } from '@/lib/holo/useHolo'

const FEE_ROWS = [
  { label: 'Listing a card', value: 'Free', color: '#C8FF3D' },
  { label: 'Buyer protection (paid by buyer)', value: '5% + € 0,70', color: '#2BE8FF' },
  { label: 'Seller transaction fee', value: '3% + € 0,25', color: '#F4F4F6' },
  { label: 'Payout to IBAN', value: 'Free · weekly', color: '#C8FF3D' },
  { label: 'Escrow release', value: 'D+2 after delivery', color: '#8B8B98' },
]

export default function SellHub({ holo }: { holo: Holo }) {
  const { state, go, filtered } = holo
  const shop = state.shop
  const sellTiles = [
    { tag: 'FASTEST', color: '#C8FF3D', name: 'Scan & list', meta: 'Photo → identified → priced', go: () => go('list') },
    { tag: 'COCKPIT', color: '#2BE8FF', name: 'Dashboard', meta: 'Sales, escrow, payouts', go: () => go('dash') },
    { tag: 'RATES', color: '#8A5CFF', name: 'Shipping', meta: 'Your carriers, your prices', go: () => go('shipping') },
    { tag: 'BRAND', color: '#FF3DA6', name: 'Storefront', meta: 'How buyers see your shop', go: () => go('store', { storeId: 's1' }) },
    { tag: 'PAYOUTS', color: '#FF6A2B', name: 'Bank & payouts', meta: 'IBAN, schedule, history', go: () => go('payout') },
    { tag: 'SWAPS', color: '#A780FF', name: 'Trade offers', meta: '3 waiting on you', go: () => go('trades') },
  ]

  return (
    <div>
      <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', background: '#101015', border: '1px solid rgba(200,255,61,0.22)', padding: 16 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#C8FF3D' }}>{shop.saved ? 'SHOP LIVE' : 'NO SHOP YET'}</div>
        <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontStretch: '112%' as any, fontSize: 21, letterSpacing: '-.025em', marginTop: 8 }}>{shop.saved ? shop.name : 'Open your shop in 3 minutes'}</div>
        <p style={{ margin: '8px 0 0', fontSize: 12, color: '#8B8B98', lineHeight: 1.55 }}>
          {shop.saved ? `Verified dealer · payouts every Tuesday · ${filtered().length} active listings across your catalogue.` : 'Pick a name, add a logo, set your shipping. No listing fees, ever.'}
        </p>
        <button onClick={() => go('shopSetup')} style={{ marginTop: 13, border: 'none', borderRadius: 11, background: '#C8FF3D', color: '#08080B', fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 13, padding: '12px 16px', cursor: 'pointer' }}>
          {shop.saved ? 'Edit shop' : 'Create my shop'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
        {sellTiles.map((t) => (
          <button key={t.name} onClick={t.go} style={{ textAlign: 'left', background: '#101015', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 15, padding: 14, cursor: 'pointer', color: '#F4F4F6' }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.14em', color: t.color }}>{t.tag}</div>
            <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontSize: 14, marginTop: 8 }}>{t.name}</div>
            <div style={{ fontSize: 11, color: '#8B8B98', marginTop: 5, lineHeight: 1.45 }}>{t.meta}</div>
          </button>
        ))}
      </div>

      <div style={{ background: '#0B0B10', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 16, padding: 15, marginTop: 12 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '.16em', color: '#8B8B98' }}>WHAT SELLING COSTS</div>
        {FEE_ROWS.map((f) => (
          <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 11 }}>
            <span style={{ fontSize: 12, color: '#CFCFD8' }}>{f.label}</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, color: f.color }}>{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
