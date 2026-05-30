import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchGMBReviews, starRatingToNumber, refreshAccessToken } from '@/lib/google-my-business'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get all locations for user
  const { data: locations } = await supabaseAdmin
    .from('locations')
    .select('*')
    .eq('user_id', session.user.id)

  if (!locations?.length) {
    return NextResponse.json({ reviews: [], synced: 0 })
  }

  // Get user tokens
  const { data: tokenData } = await supabaseAdmin
    .from('user_tokens')
    .select('access_token, refresh_token, expires_at')
    .eq('user_id', session.user.id)
    .single()

  if (!tokenData) {
    return NextResponse.json({ error: 'No Google credentials' }, { status: 400 })
  }

  let accessToken = tokenData.access_token
  if (tokenData.expires_at && Date.now() > tokenData.expires_at * 1000) {
    accessToken = await refreshAccessToken(tokenData.refresh_token)
    await supabaseAdmin
      .from('user_tokens')
      .update({ access_token: accessToken })
      .eq('user_id', session.user.id)
  }

  let totalSynced = 0

  for (const location of locations) {
    try {
      const gmbReviews = await fetchGMBReviews(location.gmb_location_id, accessToken)

      for (const gmbReview of gmbReviews) {
        const rating = starRatingToNumber(gmbReview.starRating)
        const hasReply = !!gmbReview.reviewReply?.comment

        await supabaseAdmin.from('reviews').upsert(
          {
            location_id: location.id,
            gmb_review_id: gmbReview.reviewId,
            reviewer_name: gmbReview.reviewer.isAnonymous
              ? 'Anonymous'
              : gmbReview.reviewer.displayName,
            reviewer_avatar: gmbReview.reviewer.profilePhotoUrl,
            rating,
            review_text: gmbReview.comment || '',
            reply_text: gmbReview.reviewReply?.comment,
            replied_at: gmbReview.reviewReply ? gmbReview.updateTime : null,
            status: hasReply ? 'replied' : 'pending',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'gmb_review_id' }
        )
        totalSynced++
      }
    } catch (err) {
      console.error(`Error syncing location ${location.id}:`, err)
    }
  }

  return NextResponse.json({ synced: totalSynced })
}
