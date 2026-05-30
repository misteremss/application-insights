import { supabaseAdmin } from '@/lib/supabase'
import { AppSettingsClient } from './AppSettingsClient'

export default async function AdminSettingsPage() {
  const { data } = await supabaseAdmin
    .from('app_settings')
    .select('value')
    .eq('key', 'app_config')
    .single()

  const defaults = {
    appName: 'Starbooster',
    supportEmail: 'support@starbooster.ai',
    trialDays: '14',
    maxLocationsStarter: '1',
    maxLocationsGrowth: '3',
    maxLocationsAgency: '10',
    maxRepliesStarter: '50',
    maxRepliesGrowth: '200',
    maintenanceMode: false,
    newSignupsEnabled: true,
    aiModel: 'claude-sonnet-4-20250514',
    defaultTone: 'professional',
    replyMaxLength: '150',
    priceStarter: '97',
    priceGrowth: '197',
    priceAgency: '297',
  }

  return <AppSettingsClient config={data?.value ? { ...defaults, ...data.value } : defaults} />
}
