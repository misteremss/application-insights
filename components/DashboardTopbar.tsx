'use client'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

export function DashboardTopbar({ user }: { user: any }) {
  const [syncing, setSyncing] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const syncReviews = async () => {
    setSyncing(true)
    try {
      await fetch('/api/reviews/fetch', { method: 'POST' })
    } finally {
      setSyncing(false)
      window.location.reload()
    }
  }

  return (
    <header style={{
      height: 64, background: '#fff', borderBottom: '1px solid var(--g-border)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontFamily: 'Google Sans', fontSize: 18, fontWeight: 500, color: 'var(--g-text)' }}>
          Reviews
        </h1>
      </div>

      {/* Sync button */}
      <button onClick={syncReviews} disabled={syncing} style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 16px', borderRadius: 6, border: '1px solid var(--g-border)',
        background: '#fff', color: 'var(--g-text2)',
        fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, cursor: 'pointer',
        opacity: syncing ? .7 : 1,
      }}>
        <span style={{ display: 'inline-block', animation: syncing ? 'spin 1s linear infinite' : 'none' }}>↻</span>
        {syncing ? 'Syncing...' : 'Sync reviews'}
      </button>

      {/* User avatar */}
      <div style={{ position: 'relative' }}>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--g-border)',
          overflow: 'hidden', cursor: 'pointer', background: 'var(--g-blue)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: '#fff',
        }}>
          {user?.image ? (
            <Image src={user.image} alt={user.name || ''} width={36} height={36} style={{ borderRadius: '50%' }} />
          ) : (
            user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'
          )}
        </button>

        {menuOpen && (
          <div style={{
            position: 'absolute', top: '100%', right: 0, marginTop: 8,
            background: '#fff', border: '1px solid var(--g-border)',
            borderRadius: 8, boxShadow: 'var(--shadow-md)', width: 240, zIndex: 200,
          }}>
            <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--g-border)' }}>
              <div style={{ fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: 'var(--g-text)' }}>{user?.name}</div>
              <div style={{ fontSize: 12, color: 'var(--g-text3)', marginTop: 2 }}>{user?.email}</div>
            </div>
            <div style={{ padding: 8 }}>
              <button onClick={() => signOut({ callbackUrl: '/' })} style={{
                width: '100%', padding: '8px 12px', borderRadius: 6,
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: 'Google Sans', fontSize: 14, color: 'var(--g-text2)',
                textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8,
              }}>
                🚪 Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
