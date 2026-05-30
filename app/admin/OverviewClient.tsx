'use client'
import { formatDistanceToNow } from 'date-fns'

const S = {
  card: {
    background: '#1e2028', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 12, padding: '20px 24px',
  } as React.CSSProperties,
  label: {
    fontFamily: 'Google Sans', fontSize: 11, fontWeight: 500,
    color: 'rgba(255,255,255,0.35)', letterSpacing: '.07em', textTransform: 'uppercase' as const,
    marginBottom: 6,
  },
  val: {
    fontFamily: 'Google Sans', fontSize: 32, fontWeight: 700, color: '#fff', lineHeight: 1,
  },
  subval: { fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 4 },
  h2: { fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 14 },
}

export function AdminOverviewClient({ stats, recentUsers, recentActivity }: {
  stats: { totalUsers: number; paidUsers: number; mrr: number; totalReviews: number; repliedToday: number; planCounts: any }
  recentUsers: any[]
  recentActivity: any[]
}) {
  const convRate = stats.totalUsers > 0 ? ((stats.paidUsers / stats.totalUsers) * 100).toFixed(1) : '0'

  return (
    <div>
      {/* Page title */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Google Sans', fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Overview</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'MRR', value: `$${stats.mrr.toLocaleString()}`, color: '#34A853', sub: 'Monthly recurring' },
          { label: 'Paid users', value: stats.paidUsers, color: '#4285F4', sub: `${convRate}% conversion` },
          { label: 'Total users', value: stats.totalUsers, color: '#fff', sub: 'All time signups' },
          { label: 'Total reviews', value: stats.totalReviews.toLocaleString(), color: '#FBBC05', sub: 'Across all users' },
          { label: 'Replied today', value: stats.repliedToday, color: '#34A853', sub: 'AI replies posted' },
        ].map(k => (
          <div key={k.label} style={S.card}>
            <div style={S.label}>{k.label}</div>
            <div style={{ ...S.val, color: k.color }}>{k.value}</div>
            <div style={S.subval}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Plan breakdown + recent users */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginBottom: 16 }}>

        {/* Plan breakdown */}
        <div style={S.card}>
          <div style={S.h2}>Plan breakdown</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { plan: 'agency',  price: 297, color: '#FBBC05' },
              { plan: 'growth',  price: 197, color: '#4285F4' },
              { plan: 'starter', price: 97,  color: '#34A853' },
            ].map(({ plan, price, color }) => {
              const count = stats.planCounts[plan] || 0
              const pct = stats.paidUsers > 0 ? (count / stats.paidUsers) * 100 : 0
              return (
                <div key={plan}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'Google Sans', fontSize: 13, color: '#fff', textTransform: 'capitalize' }}>{plan}</span>
                    <span style={{ fontFamily: 'Google Sans', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{count} × ${price} = <span style={{ color }}>${count * price}/mo</span></span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 3, background: color, width: `${pct}%`, transition: 'width .5s' }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* MRR target */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'Google Sans', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Progress to $10K MRR</span>
              <span style={{ fontFamily: 'Google Sans', fontSize: 12, color: '#34A853', fontWeight: 500 }}>{Math.min(100, Math.round((stats.mrr / 10000) * 100))}%</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg,#34A853,#4285F4)', width: `${Math.min(100, (stats.mrr / 10000) * 100)}%`, transition: 'width .5s' }} />
            </div>
            <div style={{ fontFamily: 'Google Sans', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 5 }}>
              ${stats.mrr.toLocaleString()} / $10,000 · ${(10000 - stats.mrr).toLocaleString()} to go
            </div>
          </div>
        </div>

        {/* Recent users */}
        <div style={S.card}>
          <div style={S.h2}>Recent signups</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {recentUsers.length === 0 ? (
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>No users yet</p>
            ) : recentUsers.map((user: any) => (
              <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: getColor(user.email), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: '#fff', flexShrink: 0 }}>
                  {(user.name || user.email || '?').charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name || user.email}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{user.email}</div>
                </div>
                <PlanBadge plan={user.plan} />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>
                  {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div style={S.card}>
        <div style={S.h2}>Recent review activity</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {recentActivity.map((rev: any, i: number) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: rev.rating <= 2 ? '#EA4335' : '#FBBC05', fontSize: 13, width: 60, flexShrink: 0 }}>
                {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
              </div>
              <div style={{ fontFamily: 'Google Sans', fontSize: 13, color: 'rgba(255,255,255,0.6)', flex: 1 }}>
                {rev.reviewer_name}
                {rev.locations?.name && <span style={{ color: 'rgba(255,255,255,0.25)', marginLeft: 6 }}>@ {rev.locations.name}</span>}
              </div>
              <StatusBadge status={rev.status} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', width: 80, textAlign: 'right', flexShrink: 0 }}>
                {formatDistanceToNow(new Date(rev.created_at), { addSuffix: true })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlanBadge({ plan }: { plan: string }) {
  const colors: Record<string, [string, string]> = {
    free:    ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.3)'],
    starter: ['rgba(52,168,83,0.15)',   '#34A853'],
    growth:  ['rgba(66,133,244,0.15)',  '#4285F4'],
    agency:  ['rgba(251,188,5,0.15)',   '#FBBC05'],
  }
  const [bg, color] = colors[plan] || colors.free
  return (
    <span style={{ background: bg, color, fontFamily: 'Google Sans', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 10, textTransform: 'capitalize', flexShrink: 0 }}>
      {plan}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, [string, string]> = {
    pending: ['rgba(251,188,5,0.15)',  '#FBBC05'],
    replied: ['rgba(52,168,83,0.15)',  '#34A853'],
    skipped: ['rgba(255,255,255,0.06)','rgba(255,255,255,0.3)'],
  }
  const [bg, color] = colors[status] || colors.pending
  return (
    <span style={{ background: bg, color, fontFamily: 'Google Sans', fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 10, textTransform: 'capitalize' }}>
      {status}
    </span>
  )
}

const COLORS = ['#4285F4','#EA4335','#34A853','#FBBC05','#9C27B0','#FF6D00']
function getColor(str: string): string { return COLORS[str.charCodeAt(0) % COLORS.length] }
