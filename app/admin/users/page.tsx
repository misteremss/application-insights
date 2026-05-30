import { supabaseAdmin } from '@/lib/supabase'
import { AdminUsersClient } from './UsersClient'

export default async function AdminUsersPage({
  searchParams,
}: { searchParams: { q?: string; plan?: string; page?: string } }) {
  const page = parseInt(searchParams.page || '1')
  const pageSize = 20
  const offset = (page - 1) * pageSize

  let query = supabaseAdmin
    .from('users')
    .select('*, subscriptions(stripe_subscription_id,status,current_period_end)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  if (searchParams.q) {
    query = query.or(`email.ilike.%${searchParams.q}%,name.ilike.%${searchParams.q}%`)
  }
  if (searchParams.plan && searchParams.plan !== 'all') {
    query = query.eq('plan', searchParams.plan)
  }

  const { data: users, count } = await query

  return (
    <AdminUsersClient
      users={users || []}
      total={count || 0}
      page={page}
      pageSize={pageSize}
    />
  )
}
