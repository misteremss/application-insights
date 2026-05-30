import Image from 'next/image'
import Link from 'next/link'

export function Logo({ size = 32, showText = true, href = '/' }: {
  size?: number
  showText?: boolean
  href?: string
}) {
  const content = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      <Image src="/logo.svg" alt="Starbooster" width={size * 4} height={size} priority />
    </div>
  )
  return href ? <Link href={href} style={{ textDecoration: 'none' }}>{content}</Link> : content
}

export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#4285F4"/>
      <path d="M20 8l2.9 6.26 6.9 1-5 4.87 1.18 6.87L20 23.77l-6.18 3.23L15 20.14 10 15.27l6.9-1.01L20 8z" fill="#FBBC05"/>
      <line x1="14" y1="30" x2="10" y2="36" stroke="#EA4335" strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="31" x2="20" y2="37" stroke="#34A853" strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="30" x2="30" y2="36" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
