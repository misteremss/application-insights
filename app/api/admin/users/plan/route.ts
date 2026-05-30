import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(req: NextRequest) {
  const { userId, plan } = await req.json()
  const valid = ['free','starter','growth','agency']
  if (!valid.includes(plan)) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

  await supabaseAdmin.from('users').update({ plan }).eq('id', userId)
  return NextResponse.json({ success: true })
}
