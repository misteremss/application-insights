import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { SettingsClient } from './SettingsClient'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', session!.user.id)
    .single()

  return <SettingsClient user={{ ...user, ...session!.user }} />
}
