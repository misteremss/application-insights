import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { runFightSimulation } from '@/lib/agents/fightSupervisor'

const RATE_LIMIT = 10
const WINDOW_MS = 60_000
const hits = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many fights. Slow down, champ.' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const fighterA = String(body?.fighterA ?? '').trim()
  const fighterB = String(body?.fighterB ?? '').trim()
  const sessionToken = String(body?.sessionToken ?? '').trim()

  if (!fighterA || !fighterB) {
    return NextResponse.json({ error: 'Both fighters are required.' }, { status: 400 })
  }
  if (fighterA.length > 60 || fighterB.length > 60) {
    return NextResponse.json({ error: 'Fighter names must be under 60 characters.' }, { status: 400 })
  }

  try {
    const { result, logs } = await runFightSimulation(fighterA, fighterB)

    // Fire-and-forget cost monitoring log
    const supabase = getSupabase()
    if (supabase) {
      supabase.from('fight_logs').insert({
        session_token: sessionToken || null,
        fighter_a: fighterA,
        fighter_b: fighterB,
        winner: result.winner,
        comedy_score: result.comedyScore,
        steps_taken: logs.filter((l) => l.type === 'act').length,
      }).then(() => {})
    }

    return NextResponse.json({ result, logs })
  } catch (err) {
    console.error('[fight] simulation failed', err)
    return NextResponse.json({ error: 'The arena overheated. Try again.' }, { status: 500 })
  }
}
