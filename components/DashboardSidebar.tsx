'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoIcon } from './Logo'

const navItems = [
  { href: '/dashboard', label: 'Reviews', icon: '⭐', exact: true },
  { href: '/dashboard/locations', label: 'Locations', icon: '📍', exact: false },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️', exact: false },
  { href: '/dashboard/billing', label: 'Billing', icon: '💳', exact: false },
]

export function DashboardSidebar({ user }: { user: any }) {
  const pathname = usePathname()

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: '#fff', borderRight: '1px solid var(--g-border)',
      display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0, height: '100vh', overflow: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '18px 16px 12px', borderBottom: '1px solid var(--g-border)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <LogoIcon size={32} />
          <span style={{ fontFamily: 'Google Sans', fontSize: 16, fontWeight: 700, color: 'var(--g-text)' }}>
            Star<span style={{ color: 'var(--g-blue)' }}>booster</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ padding: '8px 8px', flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--g-text3)', letterSpacing: '.06em', textTransform: 'uppercase', padding: '8px 8px 6px' }}>Menu</div>
        {navItems.map(item => {
          const active = isActive(item.href, item.exact)
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, textDecoration: 'none', marginBottom: 2,
              background: active ? 'var(--g-blue-light)' : 'transparent',
              color: active ? 'var(--g-blue)' : 'var(--g-text2)',
              fontFamily: 'Google Sans', fontSize: 14, fontWeight: active ? 500 : 400,
              transition: 'background .15s',
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
              {item.href === '/dashboard' && (
                <span style={{
                  marginLeft: 'auto', background: 'var(--g-red)', color: '#fff',
                  fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 10
                }}>3</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Plan badge */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--g-border)' }}>
        <div style={{ background: 'var(--g-surface)', borderRadius: 8, padding: '10px 12px' }}>
          <div style={{ fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500, color: 'var(--g-text)', marginBottom: 4 }}>
            {user?.plan === 'free' ? 'Free trial' : `${user?.plan?.charAt(0).toUpperCase()}${user?.plan?.slice(1)} plan`}
          </div>
          {user?.plan === 'free' && (
            <Link href="/dashboard/billing" style={{
              display: 'block', background: 'var(--g-blue)', color: '#fff',
              fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500,
              padding: '6px 12px', borderRadius: 6, textDecoration: 'none', textAlign: 'center',
              marginTop: 6
            }}>Upgrade plan</Link>
          )}
        </div>
      </div>
    </aside>
  )
}
