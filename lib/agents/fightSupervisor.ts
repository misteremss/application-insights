import { FightResult, FightResultSchema, FightLogLine } from '@/types/fight'

const MAX_STEPS = 5

const ROUND_TITLES = ['The Initiation', 'The Roast Apex', 'The Verdict']

/**
 * Mocked Actor/Verifier loop. If OPENAI_API_KEY is set this should be swapped
 * for real gpt-4o-mini (actor) / gpt-4o (verifier) calls — kept mocked here
 * since no live API key is available in this environment.
 */
async function draftScript(fighterA: string, fighterB: string, attempt: number): Promise<FightResult> {
  const intensity = attempt === 1 ? 'PG-13 jab' : 'unhinged, lore-accurate demolition'
  const rounds = ROUND_TITLES.map((title, i) => ({
    roundNumber: i + 1,
    title,
    action: `${fighterA} and ${fighterB} square up as the crowd loses its mind.`,
    roastDialogue:
      i === 0
        ? `${fighterA}: "You call that an entrance? My WiFi router has more presence."`
        : i === 1
        ? `${fighterB}: "${fighterA} really said 'final form' and showed up looking like a ${intensity}."`
        : `${fighterA}: "GG. Go take the L like the rest of your fanbase — patiently, and alone."`,
  }))

  const winner = attempt % 2 === 0 ? fighterB : fighterA
  return {
    winner,
    rounds,
    comedyScore: attempt === 1 ? 6 : 9,
    reasoning: `${winner} landed the sharper, more personalized roasts and closed Round 3 with the strongest punchline.`,
  }
}

function verify(result: FightResult) {
  const isTooPolite = result.comedyScore < 7
  const roastSeverityScore = result.comedyScore
  const includesInsideJokes = result.rounds.every((r) => r.roastDialogue.length > 20)
  return {
    isTooPolite,
    roastSeverityScore,
    includesInsideJokes,
    passed: !isTooPolite && roastSeverityScore >= 7 && includesInsideJokes,
  }
}

export async function runFightSimulation(fighterA: string, fighterB: string) {
  const logs: FightLogLine[] = []
  let result: FightResult | null = null

  for (let step = 1; step <= MAX_STEPS; step++) {
    logs.push({ type: 'act', message: `[ACT] ScripterAgent drafting battle script (attempt ${step})...` })
    const draft = await draftScript(fighterA, fighterB, step)

    logs.push({ type: 'verify', message: `[VERIFY] VerifierAgent auditing draft against quality bar...` })
    const verdict = verify(draft)
    logs.push({
      type: 'verify',
      message: `[VERIFY] comedyScore=${draft.comedyScore} isTooPolite=${verdict.isTooPolite} includesInsideJokes=${verdict.includesInsideJokes}`,
    })

    if (verdict.passed) {
      result = draft
      logs.push({ type: 'done', message: `[DONE] Draft passed verification on attempt ${step}.` })
      break
    }

    logs.push({ type: 'retry', message: `[RETRY] Draft FAILED quality bar — looping back to ScripterAgent.` })
  }

  if (!result) {
    throw new Error('Fight simulation exceeded maxSteps without a passing draft')
  }

  const parsed = FightResultSchema.parse(result)
  return { result: parsed, logs }
}
