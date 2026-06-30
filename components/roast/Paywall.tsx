'use client'
import { KeyholeIcon } from './Icons'

export function PaywallOverlay({ onBuy, loading }: { onBuy: () => void; loading: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
      <div className="bg-white text-black w-full max-w-sm p-8 text-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 94%, 94% 100%, 0 100%)' }}>
        <KeyholeIcon size={28} className="mx-auto mb-4 text-black" />
        <h2 className="ra-serif italic text-3xl mb-2">Out of Free Fights</h2>
        <p className="ra-mono text-xs uppercase tracking-wider text-black/60 mb-6">
          Buy 10 Encounters. 9 PLN.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            disabled={loading}
            onClick={onBuy}
            className="bg-black text-white py-3 ra-mono text-sm uppercase tracking-wide disabled:opacity-50"
          >
            BLIK
          </button>
          <button
            disabled={loading}
            onClick={onBuy}
            className="bg-black text-white py-3 ra-mono text-sm uppercase tracking-wide disabled:opacity-50"
          >
            Apple Pay
          </button>
        </div>
      </div>
    </div>
  )
}
