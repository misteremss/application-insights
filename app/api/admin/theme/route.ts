import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const theme = await req.json()

  await supabaseAdmin.from('app_settings').upsert({
    key: 'theme',
    value: theme,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'key' })

  return NextResponse.json({ success: true })
}

export async function GET() {
  const { data } = await supabaseAdmin
    .from('app_settings')
    .select('value')
    .eq('key', 'theme')
    .single()

  return NextResponse.json(data?.value || {})
}
