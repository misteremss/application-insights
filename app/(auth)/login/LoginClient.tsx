'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { LogoIcon } from '@/components/Logo'

export function LoginClient() {
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--g-surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 40 }}>
        <LogoIcon size={40} />
        <span style={{ fontFamily: 'Google Sans', fontSize: 22, fontWeight: 500, color: 'var(--g-text)' }}>
          Star<span style={{ color: 'var(--g-blue)' }}>booster</span>
        </span>
      </Link>

      {/* Card */}
      <div style={{ background: '#fff', border: '1px solid var(--g-border)', borderRadius: 16, padding: '40px 48px', width: '100%', maxWidth: 420, textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
        <h1 style={{ fontFamily: 'Google Sans', fontSize: 24, fontWeight: 500, color: 'var(--g-text)', marginBottom: 8 }}>
          Sign in to Starbooster
        </h1>
        <p style={{ fontSize: 14, color: 'var(--g-text2)', marginBottom: 32, lineHeight: 1.6 }}>
          Connect your Google Business Profile to start replying to reviews with AI
        </p>

        {/* Google sign-in button — matches Google's actual button design */}
        <button onClick={handleSignIn} disabled={loading} style={{
          width: '100%', padding: '12px 16px', borderRadius: 6,
          border: '1px solid var(--g-border)',
          background: loading ? 'var(--g-surface)' : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'Google Sans', fontSize: 15, fontWeight: 500, color: 'var(--g-text)',
          transition: 'box-shadow .15s, background .15s',
          boxShadow: 'var(--shadow-sm)',
        }}
        onMouseOver={e => { if (!loading) e.currentTarget.style.boxShadow = 'var(--shadow-md)' }}
        onMouseOut={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
        >
          {loading ? (
            <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite', fontSize: 18 }}>⟳</span>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          {loading ? 'Connecting to Google...' : 'Continue with Google'}
        </button>

        <div style={{ marginTop: 24, padding: '16px', background: 'var(--g-blue-light)', borderRadius: 8 }}>
          <p style={{ fontSize: 12, color: '#1a73e8', lineHeight: 1.6, margin: 0 }}>
            We request access to your Google Business Profile to read reviews and post replies on your behalf. You can revoke this access at any time.
          </p>
        </div>

        <p style={{ fontSize: 12, color: 'var(--g-text3)', marginTop: 20, lineHeight: 1.6 }}>
          By signing in, you agree to our{' '}
          <Link href="/terms" style={{ color: 'var(--g-blue)', textDecoration: 'none' }}>Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" style={{ color: 'var(--g-blue)', textDecoration: 'none' }}>Privacy Policy</Link>
        </p>
      </div>

      {/* Trust signals */}
      <div style={{ display: 'flex', gap: 24, marginTop: 32, fontSize: 12, color: 'var(--g-text3)' }}>
        <span>🔒 Secure OAuth</span>
        <span>✓ 14-day free trial</span>
        <span>✓ Cancel anytime</span>
      </div>
    </div>
  )
}
