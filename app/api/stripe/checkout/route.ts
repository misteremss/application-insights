import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createCheckoutSession } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { priceId } = await req.json()

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('stripe_customer_id')
    .eq('id', session.user.id)
    .single()

  if (!user?.stripe_customer_id) {
    return NextResponse.json({ error: 'No Stripe customer found' }, { status: 400 })
  }

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  const checkoutSession = await createCheckoutSession({
    customerId: user.stripe_customer_id,
    priceId,
    userId: session.user.id,
    successUrl: `${baseUrl}/dashboard?upgraded=true`,
    cancelUrl: `${baseUrl}/dashboard/billing`,
  })

  return NextResponse.json({ url: checkoutSession.url })
}
