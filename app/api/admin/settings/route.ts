import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const config = await req.json()
  await supabaseAdmin.from('app_settings').upsert({
    key: 'app_config', value: config, updated_at: new Date().toISOString(),
  }, { onConflict: 'key' })
  return NextResponse.json({ success: true })
}
