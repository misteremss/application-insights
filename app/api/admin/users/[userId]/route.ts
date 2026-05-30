import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  await supabaseAdmin.from('users').delete().eq('id', params.userId)
  return NextResponse.json({ success: true })
}
