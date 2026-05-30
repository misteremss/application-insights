import Anthropic from '@anthropic-ai/sdk'
import { ReviewTone } from '@/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

const TONE_INSTRUCTIONS: Record<ReviewTone, string> = {
  professional:
    'Use a professional, courteous tone. Formal but warm. Suitable for any business type.',
  friendly:
    'Use a warm, conversational, friendly tone. Personal and approachable. Like talking to a friend.',
  apologetic:
    'Use a sincere, empathetic, apologetic tone. Acknowledge the issue clearly. Show genuine concern and commitment to improve. Do not be defensive.',
  grateful:
    'Use an enthusiastic, grateful tone. Express genuine appreciation. Show the review made the team happy.',
}

const RATING_GUIDANCE: Record<number, string> = {
  1: 'This is a 1-star review. The customer is very unhappy. Prioritise empathy and apology. Offer to make it right. Do not minimise their experience.',
  2: 'This is a 2-star review. The customer is disappointed. Acknowledge what went wrong. Show commitment to improvement.',
  3: 'This is a 3-star review. Mixed experience. Acknowledge both positives and negatives. Show you take feedback seriously.',
  4: 'This is a 4-star review. Mostly positive. Thank them warmly. Briefly address any negative point mentioned.',
  5: 'This is a 5-star review. The customer is delighted. Express genuine gratitude. Be enthusiastic but not over-the-top.',
}

export async function generateReply({
  reviewText,
  rating,
  businessName,
  tone,
  language = 'en',
}: {
  reviewText: string
  rating: 1 | 2 | 3 | 4 | 5
  businessName: string
  tone: ReviewTone
  language?: string
}): Promise<string> {
  const systemPrompt = `You are a reply assistant for local businesses responding to Google reviews.

Your job is to write authentic, human-sounding replies to customer reviews.

Rules:
- Keep replies under 150 words
- Never sound robotic, generic, or templated
- Always include the business name naturally (once)
- Never use exclamation marks more than once per reply
- Never start with "Thank you for your review" — it's too generic
- Address specific details mentioned in the review
- ${RATING_INSTRUCTIONS[rating]}
- Tone guidance: ${TONE_INSTRUCTIONS[tone]}
- Write in ${language === 'en' ? 'English' : language}
- Sign off naturally — no "Kind regards" or "Best wishes" unless specifically appropriate

Output ONLY the reply text. No quotes. No preamble. No explanation.`

  const RATING_INSTRUCTIONS: Record<number, string> = RATING_GUIDANCE

  const userPrompt = `Business name: ${businessName}
Rating: ${rating}/5 stars
Customer review: "${reviewText}"

Write the owner reply:`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 300,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  return content.text.trim()
}

// Helper to get the suggested tone for a rating
export function suggestedTone(rating: number): ReviewTone {
  if (rating <= 2) return 'apologetic'
  if (rating === 3) return 'professional'
  if (rating === 4) return 'friendly'
  return 'grateful'
}
