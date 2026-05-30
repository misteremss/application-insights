'use client'
import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'

const PLANS = ['free', 'starter', 'growth', 'agency']
const PLAN_COLORS: Record<string, [string, string]> = {
  free:    ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.3)'],
  starter: ['rgba(52,168,83,0.15)',   '#34A853'],
  growth:  ['rgba(66,133,244,0.15)',  '#4285F4'],
  agency:  ['rgba(251,188,5,0.15)',   '#FBBC05'],
}

const cell: React.CSSProperties = {
  padding: '12px 14px', fontSize: 13,
  color: 'rgba(255,255,255,0.7)',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  fontFamily: 'Roboto',
}
const headCell: React.CSSProperties = {
  padding: '10px 14px', fontSize: 11, fontWeight: 500,
  color: 'rgba(255,255,255,0.3)', letterSpacing: '.06em',
  textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.07)',
  fontFamily: 'Google Sans',
}

export function AdminUsersClient({ users, total, page, pageSize }: {
  users: any[]; total: number; page: number; pageSize: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const updateSearch = (key: string, val: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (val) params.set(key, val); else params.delete(key)
    params.delete('page')
    startTransition(() => router.push(`/admin/users?${params}`))
  }

  const changePlan = async (userId: string, plan: string) => {
    const res = await fetch('/api/admin/users/plan', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, plan }),
    })
    if (res.ok) {
      showToast(`✓ Plan updated to ${plan}`)
      setEditingUser(null)
      router.refresh()
    }
  }

  const deleteUser = async (userId: string, email: string) => {
    if (!confirm(`Delete user ${email}? This is irreversible.`)) return
    const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
    if (res.ok) { showToast('User deleted'); router.refresh() }
  }

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: 'Google Sans', fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Users</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{total} total users</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <input
          defaultValue={searchParams.get('q') || ''}
          placeholder="Search by name or email..."
          onChange={e => updateSearch('q', e.target.value)}
          style={{
            flex: 1, maxWidth: 320, padding: '9px 14px', borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)', color: '#fff',
            fontFamily: 'Roboto', fontSize: 13, outline: 'none',
          }}
        />
        <select
          defaultValue={searchParams.get('plan') || 'all'}
          onChange={e => updateSearch('plan', e.target.value)}
          style={{
            padding: '9px 14px', borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#1e2028', color: 'rgba(255,255,255,0.7)',
            fontFamily: 'Google Sans', fontSize: 13, cursor: 'pointer',
          }}
        >
          <option value="all">All plans</option>
          {PLANS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#1e2028', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['User','Email','Plan','Replies used','Joined','Actions'].map(h => (
                <th key={h} style={headCell}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={6} style={{ ...cell, textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.2)' }}>No users found</td></tr>
            ) : users.map((user: any) => (
              <tr key={user.id} style={{ transition: 'background .1s' }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={cell}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {user.image ? (
                      <img src={user.image} style={{ width: 30, height: 30, borderRadius: '50%' }} alt="" />
                    ) : (
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: getColor(user.email), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Google Sans', fontSize: 12, fontWeight: 600, color: '#fff' }}>
                        {(user.name || user.email || '?').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span style={{ fontFamily: 'Google Sans', fontWeight: 500, color: '#fff' }}>{user.name || 'No name'}</span>
                  </div>
                </td>
                <td style={{ ...cell, color: 'rgba(255,255,255,0.5)' }}>{user.email}</td>
                <td style={cell}>
                  {editingUser === user.id ? (
                    <select
                      defaultValue={user.plan}
                      onChange={e => changePlan(user.id, e.target.value)}
                      onBlur={() => setEditingUser(null)}
                      autoFocus
                      style={{ background: '#2a2d35', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 6, padding: '4px 8px', fontFamily: 'Google Sans', fontSize: 12, cursor: 'pointer' }}
                    >
                      {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  ) : (
                    <button onClick={() => setEditingUser(user.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
                      <span style={{ background: PLAN_COLORS[user.plan]?.[0], color: PLAN_COLORS[user.plan]?.[1], fontFamily: 'Google Sans', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 10, textTransform: 'capitalize' }}>
                        {user.plan} ✎
                      </span>
                    </button>
                  )}
                </td>
                <td style={cell}>{user.replies_used_this_month}</td>
                <td style={{ ...cell, color: 'rgba(255,255,255,0.4)' }}>
                  {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                </td>
                <td style={cell}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => deleteUser(user.id, user.email)}
                      style={{ padding: '4px 10px', borderRadius: 5, border: '1px solid rgba(234,67,53,0.3)', background: 'rgba(234,67,53,0.1)', color: '#EA4335', fontFamily: 'Google Sans', fontSize: 11, cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => updateSearch('page', String(p))} style={{
              width: 32, height: 32, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)',
              background: p === page ? 'var(--g-blue)' : 'transparent',
              color: p === page ? '#fff' : 'rgba(255,255,255,0.5)',
              fontFamily: 'Google Sans', fontSize: 13, cursor: 'pointer',
            }}>{p}</button>
          ))}
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#323232', color: '#fff', padding: '12px 24px', borderRadius: 8, fontFamily: 'Google Sans', fontSize: 14, zIndex: 9999, whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}
    </div>
  )
}

const COLORS = ['#4285F4','#EA4335','#34A853','#FBBC05','#9C27B0','#FF6D00']
function getColor(str: string): string { return COLORS[(str || '').charCodeAt(0) % COLORS.length] }
