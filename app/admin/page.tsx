import { supabaseAdmin } from '@/lib/supabase'
import { AdminOverviewClient } from './OverviewClient'

export default async function AdminOverviewPage() {
  const today = new Date().toISOString().split('T')[0]
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()

  const [
    { count: totalUsers },
    { count: paidUsers },
    { count: totalReviews },
    { count: repliedToday },
    { data: planBreakdown },
    { data: recentUsers },
    { data: recentActivity },
  ] = await Promise.all([
    supabaseAdmin.from('users').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).neq('plan', 'free'),
    supabaseAdmin.from('reviews').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'replied').gte('replied_at', today),
    supabaseAdmin.from('users').select('plan').neq('plan', 'free'),
    supabaseAdmin.from('users').select('id,email,name,plan,created_at').order('created_at', { ascending: false }).limit(5),
    supabaseAdmin.from('reviews').select('reviewer_name,rating,status,created_at,locations(name)').order('created_at', { ascending: false }).limit(8),
  ])

  // Calculate MRR
  const planRevenue: Record<string, number> = { starter: 97, growth: 197, agency: 297 }
  const mrr = (planBreakdown || []).reduce((sum: number, u: any) => sum + (planRevenue[u.plan] || 0), 0)

  // Plan counts
  const planCounts = (planBreakdown || []).reduce((acc: any, u: any) => {
    acc[u.plan] = (acc[u.plan] || 0) + 1
    return acc
  }, {})

  return (
    <AdminOverviewClient
      stats={{
        totalUsers: totalUsers || 0,
        paidUsers: paidUsers || 0,
        mrr,
        totalReviews: totalReviews || 0,
        repliedToday: repliedToday || 0,
        planCounts,
      }}
      recentUsers={recentUsers || []}
      recentActivity={recentActivity || []}
    />
  )
}
