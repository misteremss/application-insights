import { supabaseAdmin } from '@/lib/supabase'
import { ContentEditorClient } from './ContentEditorClient'

export default async function AdminContentPage() {
  const { data } = await supabaseAdmin
    .from('app_settings')
    .select('value')
    .eq('key', 'landing_content')
    .single()

  const defaultContent = {
    heroHeadline: 'Reply to every Google review in 3 seconds',
    heroSubheadline: 'AI-powered responses for local businesses. Connect your Google Business Profile and reply to every review in one click.',
    heroCta: 'Start free trial — 14 days free',
    heroTrustLine: 'No credit card required · 5-minute setup · Cancel anytime',
    problemHeadline: 'Unanswered reviews are costing you customers',
    howTitle: 'From inbox to replied in under a minute',
    proofTitle: 'Owners love it',
    finalCtaHeadline: 'Stop leaving reviews unanswered',
    finalCtaBody: 'Every unanswered review is a potential customer lost. Setup takes 5 minutes. First 14 days free.',
    footerDisclaimer: '© 2025 Starbooster AI · Not affiliated with Google',
    metaTitle: 'Starbooster — Reply to every Google review in 3 seconds',
    metaDescription: 'AI-powered Google review responses for local businesses.',
    announcementBar: '',
    announcementBarEnabled: false,
  }

  const content = data?.value ? { ...defaultContent, ...data.value } : defaultContent

  return <ContentEditorClient content={content} />
}
