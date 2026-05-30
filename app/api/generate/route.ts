import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { generateReply, suggestedTone } from '@/lib/anthropic'
import { supabaseAdmin } from '@/lib/supabase'
import { PLAN_LIMITS } from '@/types'
import type { ReviewTone } from '@/types'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { reviewId, tone, reviewText, rating, businessName } = await req.json()

  if (!reviewText || !rating || !businessName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Check usage limits
  const { data: userData } = await supabaseAdmin
    .from('users')
    .select('plan, replies_used_this_month')
    .eq('id', session.user.id)
    .single()

  if (userData) {
    const plan = userData.plan as keyof typeof PLAN_LIMITS
    const limit = PLAN_LIMITS[plan]?.replies || 0

    if (userData.replies_used_this_month >= limit) {
      return NextResponse.json(
        { error: 'Monthly reply limit reached. Please upgrade your plan.' },
        { status: 429 }
      )
    }
  }

  try {
    const selectedTone: ReviewTone = tone || suggestedTone(rating)

    const reply = await generateReply({
      reviewText,
      rating,
      businessName,
      tone: selectedTone,
    })

    // Save draft to DB if reviewId provided
    if (reviewId) {
      await supabaseAdmin.from('reply_drafts').upsert({
        review_id: reviewId,
        draft_text: reply,
        tone: selectedTone,
      })

      // Increment usage counter
      await supabaseAdmin.rpc('increment_replies_used', {
        user_id: session.user.id,
      })
    }

    return NextResponse.json({ reply, tone: selectedTone })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json({ error: 'Failed to generate reply' }, { status: 500 })
  }
}
