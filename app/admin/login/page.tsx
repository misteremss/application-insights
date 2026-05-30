'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Invalid password')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--g-surface)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{
        background: '#fff', border: '1px solid var(--g-border)', borderRadius: 16,
        padding: '40px 48px', width: '100%', maxWidth: 400,
        boxShadow: 'var(--shadow-md)', textAlign: 'center',
      }}>
        {/* Logo */}
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--g-red-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 24 }}>
          🔐
        </div>
        <h1 style={{ fontFamily: 'Google Sans', fontSize: 22, fontWeight: 500, color: 'var(--g-text)', marginBottom: 6 }}>Admin Panel</h1>
        <p style={{ fontSize: 13, color: 'var(--g-text3)', marginBottom: 28 }}>Starbooster internal dashboard</p>

        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 8,
              border: `1px solid ${error ? 'var(--g-red)' : 'var(--g-border)'}`,
              fontFamily: 'Roboto', fontSize: 14, color: 'var(--g-text)',
              outline: 'none', marginBottom: error ? 8 : 16,
            }}
            onFocus={e => e.target.style.borderColor = 'var(--g-blue)'}
            onBlur={e => e.target.style.borderColor = error ? 'var(--g-red)' : 'var(--g-border)'}
            autoFocus
          />
          {error && <p style={{ fontSize: 12, color: 'var(--g-red)', marginBottom: 12, textAlign: 'left' }}>{error}</p>}
          <button type="submit" disabled={loading || !password} style={{
            width: '100%', padding: 12, borderRadius: 6, border: 'none',
            background: password ? 'var(--g-blue)' : 'var(--g-surface2)',
            color: password ? '#fff' : 'var(--g-text3)',
            fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500,
            cursor: password ? 'pointer' : 'not-allowed',
          }}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
