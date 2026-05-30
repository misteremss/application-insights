import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase'
import { LocationsClient } from './LocationsClient'

export default async function LocationsPage() {
  const session = await getServerSession(authOptions)
  const { data: locations } = await supabaseAdmin
    .from('locations')
    .select('*')
    .eq('user_id', session!.user.id)
    .order('created_at', { ascending: true })

  const { data: userData } = await supabaseAdmin
    .from('users')
    .select('plan')
    .eq('id', session!.user.id)
    .single()

  return <LocationsClient locations={locations || []} plan={userData?.plan || 'free'} />
}
