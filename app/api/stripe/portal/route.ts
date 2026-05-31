import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createPortalSession } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('stripe_customer_id')
    .eq('id', session.user.id)
    .single()

  if (!user?.stripe_customer_id) {
    return NextResponse.json({ error: 'No Stripe customer' }, { status: 400 })
  }

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const portalSession = await createPortalSession(user.stripe_customer_id, `${baseUrl}/dashboard/billing`)

  return NextResponse.json({ url: portalSession.url })
}
