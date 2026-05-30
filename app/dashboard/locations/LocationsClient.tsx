'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PLAN_LIMITS } from '@/types'
import type { Location } from '@/types'

export function LocationsClient({ locations, plan }: { locations: Location[]; plan: string }) {
  const limit = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.locations || 0
  const [fetching, setFetching] = useState(false)
  const [availableLocations, setAvailableLocations] = useState<any[]>([])
  const [adding, setAdding] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const fetchGMBLocations = async () => {
    setFetching(true)
    try {
      const res = await fetch('/api/locations/available')
      const data = await res.json()
      setAvailableLocations(data.locations || [])
    } catch {
      showToast('Failed to fetch locations from Google')
    } finally {
      setFetching(false)
    }
  }

  const addLocation = async (gmb: any) => {
    if (locations.length >= limit) {
      showToast(`Your ${plan} plan supports ${limit} location${limit > 1 ? 's' : ''}. Upgrade to add more.`)
      return
    }
    setAdding(true)
    try {
      const res = await fetch('/api/locations/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gmbLocationId: gmb.name, name: gmb.locationName || gmb.title, address: gmb.address?.addressLines?.join(', ') }),
      })
      if (res.ok) {
        showToast('✓ Location added successfully')
        setTimeout(() => window.location.reload(), 1000)
      }
    } finally {
      setAdding(false)
    }
  }

  const removeLocation = async (id: string) => {
    if (!confirm('Remove this location? Its review history will be deleted.')) return
    await fetch(`/api/locations/${id}`, { method: 'DELETE' })
    showToast('Location removed')
    setTimeout(() => window.location.reload(), 800)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'Google Sans', fontSize: 22, fontWeight: 500, color: 'var(--g-text)', marginBottom: 4 }}>Locations</h1>
          <p style={{ fontSize: 13, color: 'var(--g-text2)' }}>
            {locations.length} of {limit} location{limit !== 1 ? 's' : ''} used on your <strong>{plan}</strong> plan
          </p>
        </div>
        <button onClick={fetchGMBLocations} disabled={fetching || locations.length >= limit} style={{
          padding: '10px 20px', borderRadius: 6, border: 'none',
          background: locations.length >= limit ? 'var(--g-surface2)' : 'var(--g-blue)',
          color: locations.length >= limit ? 'var(--g-text3)' : '#fff',
          fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, cursor: locations.length >= limit ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          {fetching ? 'Loading...' : 'Add location'}
        </button>
      </div>

      {/* Usage bar */}
      <div style={{ background: '#fff', border: '1px solid var(--g-border)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: 'var(--g-text)' }}>Location slots used</span>
          <span style={{ fontFamily: 'Google Sans', fontSize: 13, color: 'var(--g-text2)' }}>{locations.length} / {limit}</span>
        </div>
        <div style={{ height: 8, background: 'var(--g-surface2)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 4, background: locations.length >= limit ? 'var(--g-red)' : 'var(--g-blue)', width: `${Math.min(100, (locations.length / limit) * 100)}%`, transition: 'width .3s' }} />
        </div>
        {locations.length >= limit && (
          <p style={{ fontSize: 12, color: 'var(--g-red)', marginTop: 8 }}>
            You've reached your limit. <Link href="/dashboard/billing" style={{ color: 'var(--g-blue)' }}>Upgrade to add more →</Link>
          </p>
        )}
      </div>

      {/* Connected locations */}
      {locations.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'Google Sans', fontSize: 15, fontWeight: 500, color: 'var(--g-text)', marginBottom: 12 }}>Connected locations</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {locations.map(loc => (
              <div key={loc.id} style={{ background: '#fff', border: '1px solid var(--g-border)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--g-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>📍</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Google Sans', fontSize: 15, fontWeight: 500, color: 'var(--g-text)', marginBottom: 2 }}>{loc.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--g-text3)' }}>{loc.address || 'Address not set'}</div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Google Sans', fontSize: 18, fontWeight: 600, color: '#f29900' }}>{loc.avg_rating?.toFixed(1) || '—'}</div>
                    <div style={{ fontSize: 11, color: 'var(--g-text3)' }}>Avg rating</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Google Sans', fontSize: 18, fontWeight: 600, color: 'var(--g-red)' }}>{loc.pending_replies || 0}</div>
                    <div style={{ fontSize: 11, color: 'var(--g-text3)' }}>Pending</div>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--g-green-light)', color: 'var(--g-green)', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 12 }}>✓ Connected</div>
                  <button onClick={() => removeLocation(loc.id)} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--g-border)', background: '#fff', color: 'var(--g-text3)', fontFamily: 'Google Sans', fontSize: 12, cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available from GMB */}
      {availableLocations.length > 0 && (
        <div>
          <h2 style={{ fontFamily: 'Google Sans', fontSize: 15, fontWeight: 500, color: 'var(--g-text)', marginBottom: 12 }}>Available from Google Business</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {availableLocations.filter(a => !locations.find(l => l.gmb_location_id === a.name)).map(loc => (
              <div key={loc.name} style={{ background: '#fff', border: '1px solid var(--g-border)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--g-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🏢</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Google Sans', fontSize: 15, fontWeight: 500, color: 'var(--g-text)' }}>{loc.locationName || loc.title || 'Unnamed location'}</div>
                  <div style={{ fontSize: 12, color: 'var(--g-text3)', marginTop: 2 }}>{loc.address?.addressLines?.join(', ') || 'No address'}</div>
                </div>
                <button onClick={() => addLocation(loc)} disabled={adding || locations.length >= limit} style={{
                  padding: '8px 16px', borderRadius: 6, border: 'none',
                  background: locations.length >= limit ? 'var(--g-surface2)' : 'var(--g-blue)',
                  color: locations.length >= limit ? 'var(--g-text3)' : '#fff',
                  fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}>
                  {adding ? '...' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {locations.length === 0 && availableLocations.length === 0 && (
        <div style={{ background: '#fff', border: '1px solid var(--g-border)', borderRadius: 12, padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📍</div>
          <h3 style={{ fontFamily: 'Google Sans', fontSize: 18, fontWeight: 500, color: 'var(--g-text)', marginBottom: 8 }}>No locations yet</h3>
          <p style={{ fontSize: 14, color: 'var(--g-text2)', marginBottom: 24 }}>Connect your Google Business Profile to start managing reviews</p>
          <button onClick={fetchGMBLocations} style={{ padding: '12px 24px', borderRadius: 6, border: 'none', background: 'var(--g-blue)', color: '#fff', fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#fff"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/></svg>
            Import from Google Business
          </button>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
