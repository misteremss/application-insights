'use client'
import { useState } from 'react'
import { PLAN_LIMITS } from '@/types'
import type { PricingPlan } from '@/types'

export function BillingClient({
  plan, repliesUsed, subscription, plans
}: {
  plan: string
  repliesUsed: number
  subscription: any
  plans: PricingPlan[]
}) {
  const [loading, setLoading] = useState<string | null>(null)
  const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]
  const replyLimit = limits?.replies || 0
  const replyPct = replyLimit > 0 ? Math.min(100, (repliesUsed / replyLimit) * 100) : 0

  const upgrade = async (priceId: string, planId: string) => {
    setLoading(planId)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(null)
  }

  const managePortal = async () => {
    setLoading('portal')
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(null)
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Google Sans', fontSize: 22, fontWeight: 500, color: 'var(--g-text)', marginBottom: 24 }}>Billing & Plan</h1>

      {/* Current plan */}
      <div style={{ background: '#fff', border: '1px solid var(--g-border)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500, color: 'var(--g-text3)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6 }}>Current plan</div>
            <div style={{ fontFamily: 'Google Sans', fontSize: 24, fontWeight: 600, color: 'var(--g-text)' }}>
              {plan.charAt(0).toUpperCase() + plan.slice(1)}
              {plan !== 'free' && <span style={{ fontSize: 15, fontWeight: 400, color: 'var(--g-text2)', marginLeft: 8 }}>${plans.find(p => p.id === plan)?.price}/mo</span>}
            </div>
            {subscription?.current_period_end && (
              <div style={{ fontSize: 12, color: 'var(--g-text3)', marginTop: 4 }}>
                Renews {new Date(subscription.current_period_end).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            )}
          </div>
          {plan !== 'free' && (
            <button onClick={managePortal} disabled={loading === 'portal'} style={{
              padding: '8px 16px', borderRadius: 6, border: '1px solid var(--g-border)',
              background: '#fff', color: 'var(--g-text2)',
              fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            }}>
              {loading === 'portal' ? 'Loading...' : 'Manage subscription →'}
            </button>
          )}
        </div>

        {/* Usage */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'Google Sans', fontSize: 13, color: 'var(--g-text2)' }}>AI replies this month</span>
              <span style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: replyPct > 80 ? 'var(--g-red)' : 'var(--g-text)' }}>
                {repliesUsed} / {replyLimit === 999999 ? '∞' : replyLimit}
              </span>
            </div>
            <div style={{ height: 8, background: 'var(--g-surface2)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 4, background: replyPct > 80 ? 'var(--g-red)' : 'var(--g-blue)', width: `${replyPct}%`, transition: 'width .3s' }} />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'Google Sans', fontSize: 13, color: 'var(--g-text2)' }}>Locations</span>
              <span style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500 }}>— / {limits?.locations || 0}</span>
            </div>
            <div style={{ height: 8, background: 'var(--g-surface2)', borderRadius: 4 }} />
          </div>
        </div>
      </div>

      {/* Plans */}
      <h2 style={{ fontFamily: 'Google Sans', fontSize: 16, fontWeight: 500, color: 'var(--g-text)', marginBottom: 14 }}>
        {plan === 'free' ? 'Choose a plan' : 'Upgrade or change plan'}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {plans.map(p => {
          const isCurrent = p.id === plan
          return (
            <div key={p.id} style={{
              background: '#fff', border: p.popular ? '2px solid var(--g-blue)' : '1px solid var(--g-border)',
              borderRadius: 12, padding: 24, position: 'relative',
              boxShadow: p.popular ? 'var(--shadow-md)' : undefined,
            }}>
              {p.popular && (
                <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: 'var(--g-blue)', color: '#fff', fontFamily: 'Google Sans', fontSize: 11, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap' }}>Most popular</div>
              )}
              <div style={{ fontFamily: 'Google Sans', fontSize: 11, fontWeight: 500, color: 'var(--g-text3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{p.name}</div>
              <div style={{ fontFamily: 'Google Sans', fontSize: 36, fontWeight: 700, color: 'var(--g-text)', letterSpacing: -1, margin: '8px 0 4px' }}>
                <sup style={{ fontSize: 16, verticalAlign: 'super' }}>$</sup>{p.price}<sub style={{ fontSize: 13, fontWeight: 400, color: 'var(--g-text2)', letterSpacing: 0 }}>/mo</sub>
              </div>
              <div style={{ fontSize: 12, color: 'var(--g-text3)', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--g-surface2)' }}>{p.description}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {p.features.slice(0, 4).map(f => (
                  <li key={f} style={{ fontSize: 12, color: 'var(--g-text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: 'var(--g-green)', fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <div style={{ display: 'block', width: '100%', padding: '9px', borderRadius: 6, textAlign: 'center', background: 'var(--g-surface)', color: 'var(--g-text3)', fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, border: '1px solid var(--g-border)' }}>
                  Current plan
                </div>
              ) : (
                <button onClick={() => upgrade(p.priceId, p.id)} disabled={!!loading} style={{
                  display: 'block', width: '100%', padding: '9px', borderRadius: 6,
                  fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, cursor: 'pointer', border: 'none',
                  background: p.popular ? 'var(--g-blue)' : '#fff',
                  color: p.popular ? '#fff' : 'var(--g-blue)',
                  border_: p.popular ? 'none' : '1.5px solid var(--g-blue)',
                  opacity: loading === p.id ? .7 : 1,
                }}>
                  {loading === p.id ? 'Loading...' : p.price > (plans.find(x => x.id === plan)?.price || 0) ? 'Upgrade →' : 'Downgrade'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
