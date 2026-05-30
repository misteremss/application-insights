'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin',            label: 'Overview',      icon: '◉',  exact: true },
  { href: '/admin/users',      label: 'Users',         icon: '👥', exact: false },
  { href: '/admin/reviews',    label: 'Reviews',       icon: '⭐', exact: false },
  { href: '/admin/analytics',  label: 'Analytics',     icon: '📊', exact: false },
  { href: '/admin/settings',   label: 'App settings',  icon: '⚙️', exact: false },
  { href: '/admin/theme',      label: 'Theme & colors', icon: '🎨', exact: false },
  { href: '/admin/content',    label: 'Landing page',  icon: '📄', exact: false },
  { href: '/admin/emails',     label: 'Email templates', icon: '✉️', exact: false },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: '#16181d',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0, height: '100vh',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(234,67,53,0.15)', border: '1px solid rgba(234,67,53,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🔐</div>
          <div>
            <div style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 600, color: '#fff' }}>Starbooster</div>
            <div style={{ fontFamily: 'Google Sans', fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '10px 8px', flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.25)', letterSpacing: '.08em', textTransform: 'uppercase', padding: '6px 8px 8px' }}>Navigation</div>
        {navItems.map(item => {
          const active = isActive(item.href, item.exact)
          return (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 7, textDecoration: 'none', marginBottom: 2,
              background: active ? 'rgba(66,133,244,0.15)' : 'transparent',
              color: active ? '#6aa3f8' : 'rgba(255,255,255,0.55)',
              fontFamily: 'Google Sans', fontSize: 13, fontWeight: active ? 500 : 400,
              borderLeft: active ? '2px solid #4285F4' : '2px solid transparent',
              transition: 'all .15s',
            }}>
              <span style={{ fontSize: 15, width: 18, textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" target="_blank" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          ↗ View live site
        </Link>
      </div>
    </aside>
  )
}
