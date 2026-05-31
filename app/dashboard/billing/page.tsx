import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { BillingClient } from './BillingClient'
import { PLANS } from '@/types'

export default async function BillingPage() {
  const session = await getServerSession(authOptions)

  const { data: userData } = await supabaseAdmin
    .from('users')
    .select('plan, stripe_customer_id, replies_used_this_month')
    .eq('id', session!.user.id)
    .single()

  const { data: subscription } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('user_id', session!.user.id)
    .single()

  return (
    <BillingClient
      plan={userData?.plan || 'free'}
      repliesUsed={userData?.replies_used_this_month || 0}
      subscription={subscription}
      plans={PLANS}
    />
  )
}
