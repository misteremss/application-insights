import type { Metadata } from 'next'
import '../styles/globals.css'
import '../styles/roast-arena.css'
import { SessionProvider } from '@/components/SessionProvider'

export const metadata: Metadata = {
  title: 'Roast Arena — The Ultimate AI Fight Club',
  description: 'Pit two characters against each other and watch AI agents write a cinematic, brutal-roast battle.',
  keywords: 'ai fight club, roast battle, ai generator, viral content',
  manifest: '/manifest.json',
  themeColor: '#000000',
  openGraph: {
    title: 'Roast Arena — The Ultimate AI Fight Club',
    description: 'Pit two characters against each other and watch AI agents write a cinematic, brutal-roast battle.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.svg" />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
