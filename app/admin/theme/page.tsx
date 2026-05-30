import { supabaseAdmin } from '@/lib/supabase'
import { ThemeEditorClient } from './ThemeEditorClient'

export default async function AdminThemePage() {
  const { data: settings } = await supabaseAdmin
    .from('app_settings')
    .select('*')
    .eq('key', 'theme')
    .single()

  const defaultTheme = {
    primaryBlue: '#4285F4',
    primaryRed: '#EA4335',
    primaryYellow: '#FBBC05',
    primaryGreen: '#34A853',
    ctaBackground: '#4285F4',
    ctaText: '#ffffff',
    navBackground: '#ffffff',
    heroBackground: '#ffffff',
    cardBackground: '#ffffff',
    borderColor: '#dadce0',
    textPrimary: '#202124',
    textSecondary: '#5f6368',
    surfaceColor: '#f8f9fa',
    fontSans: 'Google Sans',
    fontBody: 'Roboto',
    borderRadius: '6',
    buttonRadius: '6',
  }

  const theme = settings?.value ? { ...defaultTheme, ...settings.value } : defaultTheme

  return <ThemeEditorClient theme={theme} />
}
