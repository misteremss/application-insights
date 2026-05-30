'use client'
import { useRouter } from 'next/navigation'

export function AdminTopbar() {
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <header style={{
      height: 56, background: '#16181d',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', padding: '0 24px',
      gap: 16, position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34A853', animation: 'pulse-dot 2s ease infinite' }} />
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'Google Sans' }}>System operational</span>
      </div>
      <button onClick={logout} style={{
        padding: '6px 14px', borderRadius: 6,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'transparent', color: 'rgba(255,255,255,0.4)',
        fontFamily: 'Google Sans', fontSize: 12, cursor: 'pointer',
      }}>
        Sign out
      </button>
    </header>
  )
}
