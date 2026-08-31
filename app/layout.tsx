import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Holo — Chase the card',
  description: 'A multivendor trading card marketplace: browse, buy, sell and trade sports and TCG cards with escrow-protected checkout.',
  openGraph: {
    title: 'Holo — Chase the card',
    description: 'A multivendor trading card marketplace: browse, buy, sell and trade sports and TCG cards with escrow-protected checkout.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#05050A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
