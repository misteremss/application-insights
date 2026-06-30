'use client'
import { useEffect, useState } from 'react'
import { FightLogLine, FightResult } from '@/types/fight'
import { FightTerminal } from '@/components/roast/Terminal'
import { PaywallOverlay } from '@/components/roast/Paywall'
import { TargetIcon, BoltIcon, SwordsIcon } from '@/components/roast/Icons'

const FREE_FIGHTS = 2
const CREDITS_KEY = 'ra_credits'
const USED_KEY = 'ra_fights_used'

export default function RoastArenaPage() {
  const [fighterA, setFighterA] = useState('')
  const [fighterB, setFighterB] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<FightLogLine[]>([])
  const [result, setResult] = useState<FightResult | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [buying, setBuying] = useState(false)
  const [fightsUsed, setFightsUsed] = useState(0)
  const [credits, setCredits] = useState(0)

  useEffect(() => {
    setFightsUsed(Number(localStorage.getItem(USED_KEY) ?? '0'))
    setCredits(Number(localStorage.getItem(CREDITS_KEY) ?? '0'))

    const params = new URLSearchParams(window.location.search)
    if (params.get('purchase') === 'success' || params.get('mock_purchase') === '1') {
      const newCredits = Number(localStorage.getItem(CREDITS_KEY) ?? '0') + 10
      localStorage.setItem(CREDITS_KEY, String(newCredits))
      setCredits(newCredits)
      window.history.replaceState({}, '', '/')
    }
  }, [])

  const remainingFree = Math.max(0, FREE_FIGHTS - fightsUsed)
  const hasFightsLeft = remainingFree > 0 || credits > 0

  async function startFight() {
    if (!fighterA.trim() || !fighterB.trim()) {
      setError('Both fighters need a name.')
      return
    }
    if (!hasFightsLeft) {
      setShowPaywall(true)
      return
    }

    setError(null)
    setLoading(true)
    setResult(null)
    setLogs([])

    try {
      const res = await fetch('/api/fight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fighterA, fighterB }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Fight failed')

      setLogs(data.logs)
      setResult(data.result)

      if (remainingFree > 0) {
        const used = fightsUsed + 1
        localStorage.setItem(USED_KEY, String(used))
        setFightsUsed(used)
      } else {
        const left = credits - 1
        localStorage.setItem(CREDITS_KEY, String(left))
        setCredits(left)
      }
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  async function buyCredits() {
    setBuying(true)
    try {
      const res = await fetch('/api/stripe/fight-credits', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally {
      setBuying(false)
    }
  }

  function shareResult() {
    if (!result) return
    const text = `${result.winner} won the Roast Arena fight!\n\n${result.reasoning}\n\nFight your own at roastarena.app`
    if (navigator.share) {
      navigator.share({ text }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text)
      alert('Result copied to clipboard — paste it anywhere.')
    }
  }

  return (
    <div className="ra-root">
      {showPaywall && <PaywallOverlay onBuy={buyCredits} loading={buying} />}

      {/* NAVBAR */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 ra-glass rounded-full px-5 py-2.5 flex items-center gap-4 w-[92%] max-w-2xl">
        <SwordsIcon className="text-[#FF5A00]" />
        <span className="ra-mono text-sm tracking-widest uppercase">Roast Arena</span>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <span className="ra-pulse-dot" />
          <span className="ra-mono text-xs text-white/60">183 AGENTS ACTIVE</span>
        </div>
      </nav>

      {/* HERO */}
      {!loading && logs.length === 0 && (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-16">
          <div className="ra-grid-bg" style={{ opacity: 0.5 }} />
          <h1 className="ra-serif italic text-5xl md:text-7xl text-center max-w-4xl leading-tight relative z-10">
            The Ultimate <span className="text-[#FF5A00]">AI Fight Club</span>
          </h1>
          <p className="ra-mono text-white/50 text-sm mt-4 mb-12 text-center relative z-10">
            Pick two fighters. The agents write the war.
          </p>

          <div className="relative z-10 w-full max-w-3xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="ra-glass p-5">
              <div className="flex items-center gap-2 mb-2 text-[#00E5FF]">
                <TargetIcon />
                <span className="ra-mono text-xs uppercase tracking-wider">Fighter A</span>
              </div>
              <input
                value={fighterA}
                onChange={(e) => setFighterA(e.target.value)}
                placeholder="e.g. Gordon Ramsay"
                className="bg-transparent border-b border-white/20 w-full py-2 outline-none focus:border-[#00E5FF] text-lg"
              />
            </div>

            <div className="ra-serif italic text-3xl text-center text-white/70">VS</div>

            <div className="ra-glass p-5">
              <div className="flex items-center gap-2 mb-2 text-[#FF5A00]">
                <BoltIcon />
                <span className="ra-mono text-xs uppercase tracking-wider">Fighter B</span>
              </div>
              <input
                value={fighterB}
                onChange={(e) => setFighterB(e.target.value)}
                placeholder="e.g. Your Ex"
                className="bg-transparent border-b border-white/20 w-full py-2 outline-none focus:border-[#FF5A00] text-lg"
              />
            </div>
          </div>

          {error && <p className="text-red-400 ra-mono text-sm mt-4 relative z-10">{error}</p>}

          <button
            onClick={startFight}
            className="ra-cta relative z-10 mt-10 px-10 py-4 border border-white/20 ra-mono uppercase tracking-widest text-sm"
          >
            Start the Fight
          </button>

          <p className="ra-mono text-xs text-white/40 mt-4 relative z-10">
            {hasFightsLeft
              ? remainingFree > 0
                ? `${remainingFree} free fight${remainingFree === 1 ? '' : 's'} left`
                : `${credits} credits left`
              : 'No fights left — buy a pack to continue'}
          </p>
        </section>
      )}

      {/* TERMINAL */}
      {(loading || logs.length > 0) && (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-32">
          {loading && logs.length === 0 && (
            <p className="ra-mono text-white/60 text-sm mb-6 animate-pulse">Summoning agents...</p>
          )}
          <FightTerminal logs={logs} result={result} onShare={shareResult} />
          <button
            onClick={() => {
              setLogs([])
              setResult(null)
            }}
            className="ra-mono text-xs text-white/40 mt-8 underline"
          >
            Run another fight
          </button>
        </section>
      )}
    </div>
  )
}
