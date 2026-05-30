'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { GoogleLogoMark, GoogleLogo, StarIcon, CheckIcon, MinusIcon } from '@/components/Icons'
import { LogoIcon } from '@/components/Logo'
import { PLANS } from '@/types'

export default function LandingPage() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observerRef.current?.observe(el))
    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <>
      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--g-border)', height: 64,
        display: 'flex', alignItems: 'center', padding: '0 24px', gap: 24
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <LogoIcon size={32} />
          <span style={{ fontFamily: 'Google Sans', fontSize: 18, fontWeight: 700, color: 'var(--g-text)' }}>
            Star<span style={{ color: 'var(--g-blue)' }}>booster</span>
          </span>
        </Link>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="#how" style={{ fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: 'var(--g-text2)', textDecoration: 'none', padding: '8px 16px', borderRadius: 24, transition: 'background .15s' }}
            className="hover:bg-g-surface">How it works</Link>
          <Link href="#pricing" style={{ fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: 'var(--g-text2)', textDecoration: 'none', padding: '8px 16px', borderRadius: 24 }}
            className="hover:bg-g-surface">Pricing</Link>
          <Link href="#faq" style={{ fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: 'var(--g-text2)', textDecoration: 'none', padding: '8px 16px', borderRadius: 24 }}
            className="hover:bg-g-surface">FAQ</Link>
          <Link href="/login" style={{
            fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500,
            background: 'var(--g-blue)', color: '#fff',
            padding: '10px 24px', borderRadius: 24, textDecoration: 'none', marginLeft: 8
          }}>Start free trial</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '120px 24px 80px', textAlign: 'center', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--g-border) 1px, transparent 1px)',
          backgroundSize: '32px 32px', opacity: .4, pointerEvents: 'none'
        }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20 }} className="animate-fade-up">
          {['#EA4335','#FBBC05','#34A853','#4285F4'].map((c,i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500,
          color: 'var(--g-text2)', background: 'var(--g-surface)', border: '1px solid var(--g-border)',
          padding: '6px 16px', borderRadius: 24, marginBottom: 28
        }} className="animate-fade-up delay-1">
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--g-green)', animation: 'pulse-dot 2s ease infinite' }} />
          Powered by Google My Business API
        </div>

        <h1 style={{
          fontFamily: 'Google Sans', fontSize: 'clamp(36px,6vw,64px)', fontWeight: 700,
          lineHeight: 1.1, letterSpacing: -1, color: 'var(--g-text)',
          maxWidth: 780, margin: '0 auto 20px'
        }} className="animate-fade-up delay-2">
          Reply to every{' '}
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
          {' '}review<br />in <span style={{ color: 'var(--g-blue)' }}>3 seconds</span>
        </h1>

        <p style={{ fontSize: 18, color: 'var(--g-text2)', maxWidth: 520, margin: '0 auto 36px', fontWeight: 400, lineHeight: 1.6 }}
          className="animate-fade-up delay-3">
          AI-powered responses for local businesses. Connect your Google Business Profile and reply to every review in one click.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }} className="animate-fade-up delay-4">
          <Link href="/login" className="g-btn g-btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>
            <GoogleIcon />
            Start free trial — 14 days free
          </Link>
          <Link href="#how" className="g-btn g-btn-outline" style={{ fontSize: 15, padding: '14px 28px' }}>
            See how it works
          </Link>
        </div>

        <p style={{ fontSize: 12, color: 'var(--g-text3)', marginTop: 20 }} className="animate-fade-up">
          <span style={{ margin: '0 10px' }}>✓ No credit card required</span>
          <span style={{ margin: '0 10px' }}>✓ 5-minute setup</span>
          <span style={{ margin: '0 10px' }}>✓ Cancel anytime</span>
        </p>
      </section>

      {/* HERO REVIEW CARDS */}
      <div style={{ padding: '0 24px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          <ReviewCardDemo
            name="Sarah Mitchell" initial="S" color="#4285F4"
            meta="2 reviews · 3 hours ago" rating={5}
            text='"Absolutely loved the food and service! Everything came out perfectly and the staff were so friendly. Will definitely be coming back with the whole family next weekend."'
            reply="Thank you so much, Sarah! Your kind words genuinely made our team's day. We can't wait to welcome you and your family back soon!"
          />
          <ReviewCardDemo
            name="James Kowalski" initial="J" color="#EA4335"
            meta="1 review · Yesterday" rating={1}
            text='"Waited 45 min even with a reservation. Staff was dismissive when I complained. The pasta was ok but the experience ruined the evening."'
            reply='James, we sincerely apologise for the wait — this is not the experience we want. We would love the chance to make it right. Please reach out directly.'
            featured urgent
          />
          <ReviewCardDemo
            name="Anna Brennan" initial="A" color="#34A853"
            meta="14 reviews · 2 days ago" rating={4}
            text='"Really nice atmosphere and the team clearly care. Cocktails were outstanding. Only dropped a star because the dessert menu was limited that evening."'
            reply="Thank you, Anna! We love hearing that — and we've noted the dessert menu feedback. We're expanding it next month. Hope to see you soon!"
          />
        </div>
      </div>

      {/* LOGOS */}
      <div style={{ background: 'var(--g-surface)', borderTop: '1px solid var(--g-border)', borderBottom: '1px solid var(--g-border)', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'var(--g-text3)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 14 }}>
          Trusted by local businesses across industries
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          {[['🍕','Mario\'s Pizzeria'],['🦷','SmileFirst Dental'],['🏨','The Grand Hotel'],['💇','Luxe Hair Studio'],['🔧','ProFix Plumbers']].map(([icon, name]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: 'var(--g-text2)' }}>
              <span style={{ fontSize: 20 }}>{icon}</span> {name}
            </div>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section style={{ padding: '96px 24px', background: '#fff' }}>
        <p style={{ fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--g-red)', marginBottom: 12, textAlign: 'center' }} className="reveal">
          The problem
        </p>
        <h2 style={{ fontFamily: 'Google Sans', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: -.5, color: 'var(--g-text)', textAlign: 'center', lineHeight: 1.15, maxWidth: 640, margin: '0 auto' }} className="reveal">
          Unanswered reviews are<br />costing you customers
        </h2>
        <div style={{ maxWidth: 960, margin: '56px auto 0', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {[
            { icon: '😤', bg: 'var(--g-red-light)', title: 'Customers judge your silence', body: 'When potential customers see unanswered negative reviews, they assume you don\'t care — and choose a competitor.', stat: '88%', statColor: 'var(--g-red)', statLabel: 'of people read reviews before visiting' },
            { icon: '⏱️', bg: 'var(--g-yellow-light)', title: 'It takes too long to reply', body: 'Writing a thoughtful, individual reply for every review is genuinely time-consuming — time you don\'t have.', stat: '3+ hrs', statColor: '#f29900', statLabel: 'spent on reviews per week on average' },
            { icon: '📉', bg: 'var(--g-blue-light)', title: 'Google rewards active responses', body: 'Businesses that consistently reply rank higher in local search. Ignoring reviews hurts your Google Maps visibility.', stat: '+23%', statColor: 'var(--g-blue)', statLabel: 'local ranking boost from reply consistency' },
          ].map((item, i) => (
            <div key={i} style={{ padding: 24, borderRadius: 12, border: '1px solid var(--g-border)' }} className={`reveal d${i+1}`}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'Google Sans', fontSize: 15, fontWeight: 600, color: 'var(--g-text)', marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--g-text2)', lineHeight: 1.6, marginBottom: 12 }}>{item.body}</p>
              <div style={{ fontFamily: 'Google Sans', fontSize: 28, fontWeight: 700, color: item.statColor }}>{item.stat}</div>
              <div style={{ fontSize: 12, color: 'var(--g-text2)', marginTop: 4 }}>{item.statLabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '96px 24px', background: 'var(--g-surface)' }} id="how">
        <p style={{ fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--g-blue)', marginBottom: 12, textAlign: 'center' }} className="reveal">How it works</p>
        <h2 style={{ fontFamily: 'Google Sans', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: -.5, color: 'var(--g-text)', textAlign: 'center', lineHeight: 1.15, maxWidth: 640, margin: '0 auto' }} className="reveal">
          From inbox to replied<br />in under a minute
        </h2>
        <div style={{ maxWidth: 900, margin: '56px auto 0', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 30, left: 'calc(16.5% + 32px)', right: 'calc(16.5% + 32px)', height: 1, background: 'var(--g-border)', zIndex: 0 }} />
          {[
            { icon: <GoogleIcon size={28} />, label: 'Connect Google Business', desc: 'Sign in with your Google account. We sync all reviews from your Google Business Profile automatically in seconds.' },
            { icon: <span style={{ fontSize: 24 }}>✦</span>, label: 'AI drafts replies instantly', desc: 'Our AI reads each review, understands the sentiment, and writes a natural, personal reply. Choose from 4 tones.' },
            { icon: <span style={{ fontSize: 22, color: 'var(--g-green)' }}>✓</span>, label: 'Post in one click', desc: 'Edit if you want, then post directly to Google. The reply goes live instantly. Clear your entire inbox in minutes.' },
          ].map((step, i) => (
            <div key={i} style={{ padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }} className={`reveal d${i+1}`}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#fff', border: '2px solid var(--g-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', position: 'relative' }}>
                {step.icon}
                <div style={{ position: 'absolute', top: -4, right: -4, width: 20, height: 20, borderRadius: '50%', background: 'var(--g-blue)', color: '#fff', fontFamily: 'Google Sans', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i+1}</div>
              </div>
              <h3 style={{ fontFamily: 'Google Sans', fontSize: 15, fontWeight: 600, color: 'var(--g-text)', marginBottom: 8 }}>{step.label}</h3>
              <p style={{ fontSize: 13, color: 'var(--g-text2)', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '96px 24px', background: 'var(--g-surface2)' }} id="proof">
        <p style={{ fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--g-green)', marginBottom: 12, textAlign: 'center' }} className="reveal">Social proof</p>
        <h2 style={{ fontFamily: 'Google Sans', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: -.5, color: 'var(--g-text)', textAlign: 'center', lineHeight: 1.15 }} className="reveal">Owners love it</h2>

        <div style={{ maxWidth: 1040, margin: '40px auto 56px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Google Sans', fontSize: 56, fontWeight: 700, color: 'var(--g-text)', lineHeight: 1 }} className="reveal">4.9</div>
          <div style={{ color: 'var(--g-yellow)', fontSize: 22, letterSpacing: 2, margin: '6px 0 4px' }}>★★★★★</div>
          <div style={{ fontSize: 13, color: 'var(--g-text2)' }}>Based on 214 reviews</div>
        </div>

        <div style={{ maxWidth: 1040, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {[
            { initial: 'M', color: '#EA4335', name: 'Marco Russo', biz: '🍕 Trattoria Bello, Milan', quote: 'I used to dread opening Google Reviews every morning. Now I clear the inbox in 10 minutes. The AI replies sound genuinely like me — customers have commented on how personal they feel.' },
            { initial: 'S', color: '#4285F4', name: 'Dr. Sophie Laurent', biz: '🦷 Smile Studio Dental, Lyon', quote: 'As a dental practice we get sensitive reviews. Starbooster handles the tone perfectly — professional, warm, and appropriate. It\'s saved my front desk hours every single week.' },
            { initial: 'T', color: '#34A853', name: 'Tom Whitfield', biz: '🏨 The Arch Hotels, London', quote: 'We manage 4 hotel properties and one person now handles all locations in under an hour a week. Our average Google rating went from 4.1 to 4.6 in two months.' },
          ].map((t, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid var(--g-border)', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-sm)' }} className={`reveal d${i+1}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Google Sans', fontSize: 15, fontWeight: 500, color: '#fff' }}>{t.initial}</div>
                <div>
                  <div style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: 'var(--g-text)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--g-text2)' }}>{t.biz}</div>
                </div>
              </div>
              <div style={{ color: 'var(--g-yellow)', fontSize: 14, letterSpacing: 1, marginBottom: 10 }}>★★★★★</div>
              <p style={{ fontSize: 13.5, color: 'var(--g-text2)', lineHeight: 1.65 }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--g-surface2)', fontSize: 11, color: 'var(--g-text3)' }}>
                <GoogleLogoText /> <span>Verified review</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: '1px solid var(--g-border)', borderRadius: 12, overflow: 'hidden' }} className="reveal">
          {[
            { num: '3s', color: 'var(--g-blue)', label: 'Average AI reply time' },
            { num: '94%', color: 'var(--g-green)', label: 'Reply rate achieved' },
            { num: '+0.6★', color: '#f29900', label: 'Avg rating improvement' },
            { num: '8h', color: 'var(--g-red)', label: 'Hours saved per month' },
          ].map((r, i) => (
            <div key={i} style={{ padding: '28px 20px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--g-border)' : 'none' }}>
              <div style={{ fontFamily: 'Google Sans', fontSize: 36, fontWeight: 700, color: r.color, lineHeight: 1 }}>{r.num}</div>
              <div style={{ fontSize: 12, color: 'var(--g-text2)', marginTop: 6, lineHeight: 1.4 }}>{r.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '96px 24px', background: 'var(--g-surface)' }} id="pricing">
        <p style={{ fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--g-blue)', marginBottom: 12, textAlign: 'center' }} className="reveal">Pricing</p>
        <h2 style={{ fontFamily: 'Google Sans', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: -.5, color: 'var(--g-text)', textAlign: 'center', lineHeight: 1.15 }} className="reveal">Simple, flat pricing</h2>
        <p style={{ textAlign: 'center', color: 'var(--g-text2)', marginTop: 10, fontSize: 15 }} className="reveal">No setup fees. No per-reply charges. Cancel anytime.</p>

        <div style={{ maxWidth: 960, margin: '56px auto 0', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {PLANS.map((plan, i) => (
            <div key={plan.id} style={{
              background: '#fff', border: plan.popular ? '2px solid var(--g-blue)' : '1px solid var(--g-border)',
              borderRadius: 12, padding: 28, position: 'relative',
              boxShadow: plan.popular ? 'var(--shadow-md)' : undefined
            }} className={`reveal d${i+1}`}>
              {plan.popular && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--g-blue)', color: '#fff', fontFamily: 'Google Sans', fontSize: 11, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap' }}>Most popular</div>
              )}
              <div style={{ fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500, color: 'var(--g-text2)', letterSpacing: '.06em', textTransform: 'uppercase' }}>{plan.name}</div>
              <div style={{ fontFamily: 'Google Sans', fontSize: 46, fontWeight: 700, color: 'var(--g-text)', lineHeight: 1, margin: '10px 0 4px', letterSpacing: -1 }}>
                <sup style={{ fontSize: 20, verticalAlign: 'super', fontWeight: 500 }}>$</sup>{plan.price}<sub style={{ fontSize: 15, color: 'var(--g-text2)', fontWeight: 400, letterSpacing: 0 }}>/mo</sub>
              </div>
              <div style={{ fontSize: 13, color: 'var(--g-text2)', marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--g-surface2)' }}>{plan.description}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ fontSize: 13, color: 'var(--g-text2)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--g-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, color: 'var(--g-green)', fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
                {plan.notIncluded.map(f => (
                  <li key={f} style={{ fontSize: 13, color: 'var(--g-text3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--g-surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/login" style={{
                display: 'block', width: '100%', padding: 11, borderRadius: 6,
                fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, textAlign: 'center', textDecoration: 'none',
                background: plan.popular ? 'var(--g-blue)' : '#fff',
                color: plan.popular ? '#fff' : 'var(--g-blue)',
                border: plan.popular ? 'none' : '1.5px solid var(--g-blue)',
              }}>Start free trial</Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '96px 24px', background: '#fff' }} id="faq">
        <p style={{ fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--g-text2)', marginBottom: 12, textAlign: 'center' }} className="reveal">FAQ</p>
        <h2 style={{ fontFamily: 'Google Sans', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, letterSpacing: -.5, color: 'var(--g-text)', textAlign: 'center', lineHeight: 1.15 }} className="reveal">Common questions</h2>
        <div style={{ maxWidth: 680, margin: '48px auto 0' }} className="reveal">
          {[
            { q: 'Do the AI replies actually sound natural, or robotic?', a: 'Our AI reads the full context of each review — the rating, specific complaints or compliments, and your business type — then writes replies that sound genuinely human. You can edit any reply before posting, and choose from 4 tone options. Nothing is a generic template.' },
            { q: 'Will Google penalise me for using AI-written replies?', a: "No. Google's policies cover review content (the reviews themselves), not owner responses. There is no rule against using tools to help draft replies. Our replies are unique to each review, not copy-pasted templates, so they fully comply with Google's guidelines." },
            { q: "What if I don't like the generated reply?", a: 'Every reply is fully editable before posting. You can also switch the tone (Professional, Friendly, Apologetic, Grateful) and regenerate with one click. Nothing goes to Google until you approve it — you are always in control.' },
            { q: 'How does the Google Business connection work?', a: "You sign in with your Google account and grant Starbooster permission to read your reviews and post responses via the official Google My Business API — the same OAuth flow used by trusted Google tools. We never store your password. Revoke access anytime from your Google account settings." },
            { q: 'Can I use this for Facebook or Tripadvisor reviews too?', a: 'Currently Starbooster focuses on Google Business reviews — where the highest-impact reviews live for local businesses. Facebook and Tripadvisor integrations are on our roadmap. All paying customers get access automatically when they launch at no extra cost.' },
          ].map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '96px 24px', background: 'linear-gradient(135deg,#1a73e8 0%,#4285F4 50%,#0d47a1 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <h2 style={{ fontFamily: 'Google Sans', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: -.5, position: 'relative' }}>
          Stop leaving reviews unanswered
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,.75)', marginBottom: 36, position: 'relative' }}>
          Every unanswered review is a potential customer lost. Setup takes 5 minutes. First 14 days free.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
          <Link href="/login" style={{ fontFamily: 'Google Sans', fontSize: 15, fontWeight: 500, background: '#fff', color: 'var(--g-blue)', padding: '14px 28px', borderRadius: 6, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <GoogleIcon /> Start your free trial
          </Link>
          <Link href="/login" style={{ fontFamily: 'Google Sans', fontSize: 15, fontWeight: 500, background: 'transparent', color: '#fff', padding: '13px 28px', borderRadius: 6, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,.5)' }}>
            Book a demo
          </Link>
        </div>
        <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 12, marginTop: 20, position: 'relative' }}>
          <span style={{ margin: '0 10px' }}>✓ No credit card</span>
          <span style={{ margin: '0 10px' }}>✓ 14 days free</span>
          <span style={{ margin: '0 10px' }}>✓ Cancel anytime</span>
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--g-surface)', borderTop: '1px solid var(--g-border)', padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Google Sans', fontSize: 15, fontWeight: 700, color: 'var(--g-text)' }}><LogoIcon size={24} /> Star<span style={{ color: 'var(--g-blue)' }}>booster</span></div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy','Terms of Service','Status','Contact'].map(l => (
            <Link key={l} href="#" style={{ fontSize: 12, color: 'var(--g-text3)', textDecoration: 'none' }}>{l}</Link>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--g-text3)' }}>© 2025 Starbooster · Not affiliated with Google</div>
      </footer>
    </>
  )
}

// ── Sub-components ──

function ReviewCardDemo({ name, initial, color, meta, rating, text, reply, featured, urgent }: any) {
  return (
    <div style={{
      background: '#fff', border: featured ? '1px solid var(--g-blue)' : '1px solid var(--g-border)',
      borderRadius: 12, padding: 16, boxShadow: featured ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      position: 'relative', top: featured ? -8 : 0
    }}>
      {urgent && <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: 'var(--g-red)', color: '#fff', fontFamily: 'Google Sans', fontSize: 10, fontWeight: 600, padding: '3px 12px', borderRadius: '0 0 8px 8px', letterSpacing: '.04em', textTransform: 'uppercase' }}>Needs reply</div>}
      {urgent && <div style={{ height: 8 }} />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: '#fff' }}>{initial}</div>
        <div>
          <div style={{ fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, color: 'var(--g-text)' }}>{name}</div>
          <div style={{ fontSize: 11, color: 'var(--g-text3)' }}>{meta}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 1, marginBottom: 8 }}>
        {[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= rating} size={14} />)}
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--g-text2)', lineHeight: 1.5, marginBottom: 10, WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' as any, overflow: 'hidden' }}>{text}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10, paddingTop: 10, borderTop: '1px solid var(--g-surface2)' }}>
        <GoogleLogoText /> <span style={{ fontSize: 11, color: 'var(--g-text3)' }}>review</span>
      </div>
      <div style={{ background: urgent ? 'var(--g-blue-light)' : 'var(--g-surface)', borderLeft: `3px solid ${urgent ? 'var(--g-blue)' : 'var(--g-border)'}`, borderRadius: '0 6px 6px 0', padding: '8px 10px' }}>
        <div style={{ fontSize: 10, fontWeight: 500, color: urgent ? 'var(--g-blue)' : 'var(--g-text3)', letterSpacing: '.03em', textTransform: 'uppercase', marginBottom: 4 }}>Owner's reply</div>
        <div style={{ fontSize: 11.5, color: urgent ? '#1a73e8' : 'var(--g-text2)', lineHeight: 1.5 }}>{reply}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--g-blue-light)', color: 'var(--g-blue)', fontSize: 10, fontWeight: 500, padding: '3px 8px', borderRadius: 12, marginTop: 6 }}>
          ✦ Generated by AI
        </div>
      </div>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details style={{ borderBottom: '1px solid var(--g-border)' }}>
      <summary style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 0', fontFamily: 'Google Sans', fontSize: 15, fontWeight: 500,
        color: 'var(--g-text)', cursor: 'pointer', listStyle: 'none', gap: 16
      }}>
        {q}
        <span style={{ color: 'var(--g-text2)', fontSize: 20, flexShrink: 0 }}>+</span>
      </summary>
      <p style={{ fontSize: 14, color: 'var(--g-text2)', lineHeight: 1.7, paddingBottom: 18 }}>{a}</p>
    </details>
  )
}

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function GoogleLogoText() {
  return (
    <span style={{ fontFamily: 'Google Sans', fontSize: 12, fontWeight: 700, letterSpacing: -.2 }}>
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC05' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
    </span>
  )
}
