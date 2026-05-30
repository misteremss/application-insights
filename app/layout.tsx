import type { Metadata } from 'next'
import '../styles/globals.css'
import { SessionProvider } from '@/components/SessionProvider'

export const metadata: Metadata = {
  title: 'Starbooster — Reply to every Google review in 3 seconds',
  description: 'AI-powered Google review responses for local businesses. Connect your Google Business Profile and reply to every review in one click.',
  keywords: 'google reviews, review management, AI replies, local business, reputation management',
  openGraph: {
    title: 'Starbooster — Reply to every Google review in 3 seconds',
    description: 'AI-powered Google review responses for local businesses.',
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
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
