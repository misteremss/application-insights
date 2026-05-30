import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase'
import { ReviewsInbox } from '@/components/ReviewsInbox'
import type { Review, DashboardStats } from '@/types'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { location?: string; status?: string; upgraded?: string }
}) {
  const session = await getServerSession(authOptions)

  // Get stats
  const userId = session!.user.id
  const today = new Date().toISOString().split('T')[0]

  const [
    { count: pending },
    { count: repliedToday },
    { data: reviews },
    { data: locations },
  ] = await Promise.all([
    supabaseAdmin.from('reviews').select('*', { count: 'exact', head: true })
      .eq('status', 'pending')
      .in('location_id', await getUserLocationIds(userId)),

    supabaseAdmin.from('reviews').select('*', { count: 'exact', head: true })
      .eq('status', 'replied')
      .gte('replied_at', today)
      .in('location_id', await getUserLocationIds(userId)),

    supabaseAdmin.from('reviews')
      .select('*, locations(name)')
      .in('location_id', await getUserLocationIds(userId))
      .order('created_at', { ascending: false })
      .limit(50),

    supabaseAdmin.from('locations').select('*').eq('user_id', userId),
  ])

  // Calculate avg rating
  const reviewData = reviews || []
  const avgRating = reviewData.length
    ? reviewData.reduce((sum, r) => sum + r.rating, 0) / reviewData.length
    : 0

  const stats: DashboardStats = {
    pending: pending || 0,
    replied_today: repliedToday || 0,
    avg_rating: Math.round(avgRating * 10) / 10,
    total_this_month: reviewData.length,
    reply_rate: reviewData.length
      ? Math.round(((reviewData.filter(r => r.status === 'replied').length) / reviewData.length) * 100)
      : 0,
  }

  return (
    <ReviewsInbox
      reviews={reviewData as Review[]}
      locations={locations || []}
      stats={stats}
      upgraded={searchParams.upgraded === 'true'}
    />
  )
}

async function getUserLocationIds(userId: string): Promise<string[]> {
  const { data } = await supabaseAdmin
    .from('locations')
    .select('id')
    .eq('user_id', userId)
  return (data || []).map(l => l.id)
}
