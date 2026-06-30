'use client'
import { useEffect, useState } from 'react'
import { FightLogLine, FightResult } from '@/types/fight'
import { LoopIcon, CheckDashedIcon, SwordsIcon } from './Icons'

function TypewriterLine({ text, onDone }: { text: string; onDone: () => void }) {
  const [shown, setShown] = useState('')
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 2
      setShown(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(id)
        onDone()
      }
    }, 12)
    return () => clearInterval(id)
  }, [text])
  return <p className="ra-terminal-line ra-mono text-sm text-white/90">{shown}</p>
}

export function FightTerminal({
  logs,
  result,
  onShare,
}: {
  logs: FightLogLine[]
  result: FightResult | null
  onShare: () => void
}) {
  const [visibleLogs, setVisibleLogs] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    setVisibleLogs(0)
    setShowResult(false)
  }, [logs])

  useEffect(() => {
    if (visibleLogs >= logs.length && logs.length > 0) {
      const t = setTimeout(() => setShowResult(true), 300)
      return () => clearTimeout(t)
    }
  }, [visibleLogs, logs.length])

  return (
    <div className="ra-glass rounded-none p-6 md:p-10 w-full max-w-3xl mx-auto" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 96%, 96% 100%, 0 100%)' }}>
      <div className="space-y-1.5 mb-6">
        {logs.slice(0, visibleLogs + 1).map((log, i) =>
          i === visibleLogs ? (
            <div key={i} className="flex items-start gap-2">
              {log.type === 'act' && <LoopIcon className="text-cyan-400 mt-1 shrink-0" />}
              {log.type === 'verify' && <CheckDashedIcon className="text-orange-400 mt-1 shrink-0" />}
              <TypewriterLine text={log.message} onDone={() => setVisibleLogs((v) => v + 1)} />
            </div>
          ) : (
            <div key={i} className="flex items-start gap-2 opacity-60">
              {log.type === 'act' && <LoopIcon className="text-cyan-400 mt-1 shrink-0" />}
              {log.type === 'verify' && <CheckDashedIcon className="text-orange-400 mt-1 shrink-0" />}
              <p className="ra-terminal-line ra-mono text-sm text-white/90">{log.message}</p>
            </div>
          )
        )}
      </div>

      {showResult && result && (
        <div className="border-t border-white/10 pt-6 space-y-6 animate-[fadeIn_.4s_ease]">
          {result.rounds.map((round) => (
            <div key={round.roundNumber}>
              <h3 className="ra-serif italic text-2xl text-[#00E5FF] mb-1">
                Round {round.roundNumber}: {round.title}
              </h3>
              <p className="ra-mono text-xs text-white/50 mb-1">{round.action}</p>
              <p className="text-white/90">{round.roastDialogue}</p>
            </div>
          ))}

          <div className="flex items-center gap-3 pt-4">
            <SwordsIcon className="text-[#FF5A00]" />
            <div>
              <p className="ra-mono text-xs text-white/50 uppercase tracking-wider">Victor</p>
              <p className="ra-serif italic text-3xl text-white">{result.winner}</p>
            </div>
          </div>
          <p className="text-white/70 text-sm">{result.reasoning}</p>

          <button
            onClick={onShare}
            className="ra-cta ra-mono text-sm uppercase tracking-wide border border-white/20 px-6 py-3 mt-2"
          >
            Export / Share Result
          </button>
        </div>
      )}
    </div>
  )
}
