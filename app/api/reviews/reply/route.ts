import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { postGMBReply, refreshAccessToken } from '@/lib/google-my-business'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { reviewId, replyText } = await req.json()

  if (!reviewId || !replyText) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Get review with location info
  const { data: review } = await supabaseAdmin
    .from('reviews')
    .select('*, locations(gmb_location_id, user_id)')
    .eq('id', reviewId)
    .single()

  if (!review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  // Verify ownership
  if (review.locations.user_id !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Get access token
  const { data: tokenData } = await supabaseAdmin
    .from('user_tokens')
    .select('access_token, refresh_token, expires_at')
    .eq('user_id', session.user.id)
    .single()

  if (!tokenData) {
    return NextResponse.json({ error: 'No Google credentials found' }, { status: 400 })
  }

  let accessToken = tokenData.access_token

  // Refresh if expired
  if (tokenData.expires_at && Date.now() > tokenData.expires_at * 1000) {
    accessToken = await refreshAccessToken(tokenData.refresh_token)
    await supabaseAdmin
      .from('user_tokens')
      .update({ access_token: accessToken })
      .eq('user_id', session.user.id)
  }

  try {
    await postGMBReply(
      review.locations.gmb_location_id,
      review.gmb_review_id,
      replyText,
      accessToken
    )

    // Update review status in DB
    await supabaseAdmin
      .from('reviews')
      .update({
        reply_text: replyText,
        replied_at: new Date().toISOString(),
        status: 'replied',
      })
      .eq('id', reviewId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reply posting error:', error)
    return NextResponse.json({ error: 'Failed to post reply to Google' }, { status: 500 })
  }
}
