import { z } from 'zod'

export const FightRoundSchema = z.object({
  roundNumber: z.number(),
  title: z.string(),
  action: z.string(),
  roastDialogue: z.string(),
})

export const FightResultSchema = z.object({
  winner: z.string(),
  rounds: z.array(FightRoundSchema),
  comedyScore: z.number().min(1).max(10),
  reasoning: z.string(),
})

export type FightRound = z.infer<typeof FightRoundSchema>
export type FightResult = z.infer<typeof FightResultSchema>

export interface FightLogLine {
  type: 'act' | 'verify' | 'retry' | 'done'
  message: string
}

export interface FightResponse {
  result: FightResult
  logs: FightLogLine[]
}
