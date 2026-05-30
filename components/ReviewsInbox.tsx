'use client'
import { useState, useCallback } from 'react'
import { Stars, GoogleLogo, SpinnerIcon } from './Icons'
import type { Review, DashboardStats, ReviewTone, Location } from '@/types'
import { formatDistanceToNow } from 'date-fns'

const TONES: { id: ReviewTone; label: string; emoji: string }[] = [
  { id: 'professional', label: 'Professional', emoji: '💼' },
  { id: 'friendly',     label: 'Friendly',     emoji: '😊' },
  { id: 'apologetic',   label: 'Apologetic',   emoji: '🙏' },
  { id: 'grateful',     label: 'Grateful',     emoji: '❤️' },
]

const STATUS_FILTERS = [
  { id: 'pending', label: 'Needs reply' },
  { id: 'all',     label: 'All reviews' },
  { id: 'replied', label: 'Replied' },
  { id: 'skipped', label: 'Skipped' },
]

export function ReviewsInbox({
  reviews,
  locations,
  stats,
  upgraded,
}: {
  reviews: Review[]
  locations: Location[]
  stats: DashboardStats
  upgraded?: boolean
}) {
  const [activeFilter, setActiveFilter] = useState<string>('pending')
  const [activeLocation, setActiveLocation] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [tones, setTones] = useState<Record<string, ReviewTone>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [posting, setPosting] = useState<Record<string, boolean>>({})
  const [localReviews, setLocalReviews] = useState(reviews)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const filteredReviews = localReviews.filter(r => {
    if (activeFilter !== 'all' && r.status !== activeFilter) return false
    if (activeLocation !== 'all' && r.location_id !== activeLocation) return false
    return true
  })

  const generateReply = useCallback(async (review: Review) => {
    const tone = tones[review.id] || getToneSuggestion(review.rating)
    setLoading(prev => ({ ...prev, [review.id]: true }))

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewId: review.id,
          reviewText: review.review_text,
          rating: review.rating,
          businessName: (review as any).locations?.name || 'our business',
          tone,
        }),
      })
      const data = await res.json()
      if (data.reply) {
        setDrafts(prev => ({ ...prev, [review.id]: data.reply }))
      }
    } catch (err) {
      showToast('Failed to generate reply. Please try again.')
    } finally {
      setLoading(prev => ({ ...prev, [review.id]: false }))
    }
  }, [tones])

  const postReply = async (review: Review) => {
    const replyText = drafts[review.id]
    if (!replyText) return

    setPosting(prev => ({ ...prev, [review.id]: true }))

    try {
      const res = await fetch('/api/reviews/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId: review.id, replyText }),
      })

      if (res.ok) {
        setLocalReviews(prev => prev.map(r =>
          r.id === review.id ? { ...r, status: 'replied', reply_text: replyText } : r
        ))
        setExpandedId(null)
        showToast('✓ Reply posted to Google successfully')
      } else {
        const err = await res.json()
        showToast(err.error || 'Failed to post reply')
      }
    } finally {
      setPosting(prev => ({ ...prev, [review.id]: false }))
    }
  }

  const skipReview = async (reviewId: string) => {
    setLocalReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, status: 'skipped' } : r
    ))
    setExpandedId(null)
    showToast('Review skipped')
  }

  const changeTone = (reviewId: string, tone: ReviewTone) => {
    setTones(prev => ({ ...prev, [reviewId]: tone }))
  }

  return (
    <div>
      {/* Upgrade success banner */}
      {upgraded && (
        <div style={{ background: 'var(--g-green-light)', border: '1px solid var(--g-green)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Google Sans', fontSize: 14, color: 'var(--g-green)' }}>
          ✓ Plan upgraded successfully! Enjoy your new features.
        </div>
      )}

      {/* STATS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Needs reply', value: stats.pending, color: 'var(--g-red)', bg: 'var(--g-red-light)' },
          { label: 'Replied today', value: stats.replied_today, color: 'var(--g-green)', bg: 'var(--g-green-light)' },
          { label: 'Avg rating', value: `${stats.avg_rating}★`, color: '#f29900', bg: 'var(--g-yellow-light)' },
          { label: 'This month', value: stats.total_this_month, color: 'var(--g-blue)', bg: 'var(--g-blue-light)' },
          { label: 'Reply rate', value: `${stats.reply_rate}%`, color: 'var(--g-text)', bg: 'var(--g-surface2)' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid var(--g-border)', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 11, color: 'var(--g-text3)', fontFamily: 'Google Sans', fontWeight: 500, letterSpacing: '.03em', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: 'Google Sans', fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {/* Status filter */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--g-surface)', borderRadius: 8, padding: 4, border: '1px solid var(--g-border)' }}>
          {STATUS_FILTERS.map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)} style={{
              padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
              fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500,
              background: activeFilter === f.id ? '#fff' : 'transparent',
              color: activeFilter === f.id ? 'var(--g-blue)' : 'var(--g-text2)',
              boxShadow: activeFilter === f.id ? 'var(--shadow-sm)' : 'none',
              transition: 'all .15s',
            }}>
              {f.label}
              {f.id === 'pending' && stats.pending > 0 && (
                <span style={{ marginLeft: 6, background: 'var(--g-red)', color: '#fff', fontSize: 10, padding: '1px 6px', borderRadius: 8, fontWeight: 600 }}>{stats.pending}</span>
              )}
            </button>
          ))}
        </div>

        {/* Location filter */}
        {locations.length > 1 && (
          <select value={activeLocation} onChange={e => setActiveLocation(e.target.value)} style={{
            padding: '8px 12px', borderRadius: 8, border: '1px solid var(--g-border)',
            fontFamily: 'Google Sans', fontSize: 13, color: 'var(--g-text2)',
            background: '#fff', cursor: 'pointer',
          }}>
            <option value="all">All locations</option>
            {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        )}

        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 13, color: 'var(--g-text3)', fontFamily: 'Google Sans' }}>
          {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* REVIEW LIST */}
      {filteredReviews.length === 0 ? (
        <EmptyState filter={activeFilter} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredReviews.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              expanded={expandedId === review.id}
              draft={drafts[review.id]}
              tone={tones[review.id] || getToneSuggestion(review.rating)}
              isLoading={loading[review.id]}
              isPosting={posting[review.id]}
              onExpand={() => {
                setExpandedId(expandedId === review.id ? null : review.id)
                if (expandedId !== review.id && !drafts[review.id]) {
                  setTimeout(() => generateReply(review), 100)
                }
              }}
              onGenerate={() => generateReply(review)}
              onToneChange={(t) => {
                changeTone(review.id, t)
                if (drafts[review.id]) generateReply({ ...review })
              }}
              onDraftChange={(text) => setDrafts(prev => ({ ...prev, [review.id]: text }))}
              onPost={() => postReply(review)}
              onSkip={() => skipReview(review.id)}
            />
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

function ReviewCard({
  review, expanded, draft, tone, isLoading, isPosting,
  onExpand, onGenerate, onToneChange, onDraftChange, onPost, onSkip
}: {
  review: Review
  expanded: boolean
  draft?: string
  tone: ReviewTone
  isLoading?: boolean
  isPosting?: boolean
  onExpand: () => void
  onGenerate: () => void
  onToneChange: (t: ReviewTone) => void
  onDraftChange: (text: string) => void
  onPost: () => void
  onSkip: () => void
}) {
  const timeAgo = formatDistanceToNow(new Date(review.created_at), { addSuffix: true })
  const isReplied = review.status === 'replied'
  const isSkipped = review.status === 'skipped'

  return (
    <div style={{
      background: '#fff', border: `1px solid ${expanded ? 'var(--g-blue)' : 'var(--g-border)'}`,
      borderRadius: 12, overflow: 'hidden',
      boxShadow: expanded ? 'var(--shadow-md)' : undefined,
      transition: 'border-color .2s, box-shadow .2s',
    }}>
      {/* Card header — always visible */}
      <div
        onClick={isReplied || isSkipped ? undefined : onExpand}
        style={{
          padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 14,
          cursor: isReplied || isSkipped ? 'default' : 'pointer',
        }}
      >
        {/* Avatar */}
        <div style={{
          width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
          background: getAvatarColor(review.reviewer_name),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Google Sans', fontSize: 16, fontWeight: 500, color: '#fff',
        }}>
          {review.reviewer_avatar ? (
            <img src={review.reviewer_avatar} alt={review.reviewer_name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
          ) : review.reviewer_name.charAt(0).toUpperCase()}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500, color: 'var(--g-text)' }}>
              {review.reviewer_name}
            </span>
            <Stars rating={review.rating} size={14} />
            <span style={{ fontSize: 12, color: 'var(--g-text3)' }}>{timeAgo}</span>
            {(review as any).locations?.name && (
              <span style={{ fontSize: 11, color: 'var(--g-text3)', background: 'var(--g-surface)', padding: '2px 8px', borderRadius: 12, border: '1px solid var(--g-border)' }}>
                📍 {(review as any).locations.name}
              </span>
            )}
          </div>

          <p style={{ fontSize: 13.5, color: 'var(--g-text2)', lineHeight: 1.5, margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: expanded ? undefined : 2, WebkitBoxOrient: 'vertical' as any }}>
            {review.review_text || <em style={{ color: 'var(--g-text3)' }}>No text left</em>}
          </p>

          {/* Replied inline preview */}
          {isReplied && review.reply_text && (
            <div style={{ marginTop: 10, background: 'var(--g-surface)', borderLeft: '3px solid var(--g-border)', borderRadius: '0 6px 6px 0', padding: '8px 12px' }}>
              <div style={{ fontSize: 11, color: 'var(--g-text3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.03em', marginBottom: 4 }}>Owner reply</div>
              <div style={{ fontSize: 12.5, color: 'var(--g-text2)', lineHeight: 1.5 }}>{review.reply_text}</div>
            </div>
          )}
        </div>

        {/* Status badge */}
        <div style={{ flexShrink: 0 }}>
          {isReplied ? (
            <span style={{ background: 'var(--g-green-light)', color: 'var(--g-green)', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 12, fontFamily: 'Google Sans' }}>✓ Replied</span>
          ) : isSkipped ? (
            <span style={{ background: 'var(--g-surface)', color: 'var(--g-text3)', fontSize: 11, fontWeight: 500, padding: '4px 10px', borderRadius: 12, fontFamily: 'Google Sans' }}>Skipped</span>
          ) : review.rating <= 2 ? (
            <span style={{ background: 'var(--g-red-light)', color: 'var(--g-red)', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 12, fontFamily: 'Google Sans' }}>Urgent</span>
          ) : (
            <button onClick={(e) => { e.stopPropagation(); onExpand() }} style={{
              background: 'var(--g-blue-light)', color: 'var(--g-blue)',
              border: 'none', borderRadius: 12, padding: '4px 12px',
              fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500, cursor: 'pointer',
            }}>
              Reply →
            </button>
          )}
        </div>
      </div>

      {/* Expanded reply area */}
      {expanded && !isReplied && !isSkipped && (
        <div style={{ borderTop: '1px solid var(--g-border)', padding: '16px 20px', background: 'var(--g-surface)' }}>
          {/* Google attribution */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <GoogleLogo />
            <span style={{ fontSize: 12, color: 'var(--g-text3)' }}>Replying on Google Business Profile</span>
          </div>

          {/* Tone selector */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--g-text3)', fontFamily: 'Google Sans', fontWeight: 500, alignSelf: 'center', marginRight: 4 }}>Tone:</span>
            {TONES.map(t => (
              <button key={t.id} onClick={() => onToneChange(t.id)} style={{
                padding: '6px 12px', borderRadius: 20, cursor: 'pointer',
                fontFamily: 'Google Sans', fontSize: 12, fontWeight: 500,
                border: tone === t.id ? '1.5px solid var(--g-blue)' : '1px solid var(--g-border)',
                background: tone === t.id ? 'var(--g-blue-light)' : '#fff',
                color: tone === t.id ? 'var(--g-blue)' : 'var(--g-text2)',
                transition: 'all .15s',
              }}>
                {t.emoji} {t.label}
              </button>
            ))}
          </div>

          {/* Reply textarea */}
          <div style={{ position: 'relative', marginBottom: 12 }}>
            {isLoading ? (
              <div style={{ background: '#fff', border: '1px solid var(--g-border)', borderRadius: 8, padding: '14px 16px', minHeight: 96, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--g-text3)', fontSize: 13 }}>
                <SpinnerIcon size={16} /> Generating reply...
              </div>
            ) : (
              <textarea
                value={draft || ''}
                onChange={e => onDraftChange(e.target.value)}
                placeholder="AI reply will appear here..."
                rows={4}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 8,
                  border: '1px solid var(--g-border)', fontFamily: 'Roboto', fontSize: 14,
                  color: 'var(--g-text)', lineHeight: 1.6, resize: 'vertical',
                  outline: 'none', transition: 'border-color .15s',
                  background: '#fff',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--g-blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--g-border)'}
              />
            )}
            {draft && (
              <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: 11, color: draft.length > 140 ? 'var(--g-red)' : 'var(--g-text3)' }}>
                {draft.length}/140
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={onPost} disabled={!draft || isPosting} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 6, border: 'none',
              background: draft ? 'var(--g-blue)' : 'var(--g-surface2)',
              color: draft ? '#fff' : 'var(--g-text3)',
              fontFamily: 'Google Sans', fontSize: 14, fontWeight: 500,
              cursor: draft ? 'pointer' : 'not-allowed',
              opacity: isPosting ? .7 : 1,
              transition: 'all .15s',
            }}>
              {isPosting ? <SpinnerIcon size={14} /> : null}
              {isPosting ? 'Posting...' : 'Post to Google'}
            </button>

            <button onClick={onGenerate} disabled={isLoading} style={{
              padding: '10px 16px', borderRadius: 6, border: '1px solid var(--g-border)',
              background: '#fff', color: 'var(--g-text2)',
              fontFamily: 'Google Sans', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            }}>
              ↻ Regenerate
            </button>

            <button onClick={onSkip} style={{
              padding: '10px 16px', borderRadius: 6, border: 'none',
              background: 'transparent', color: 'var(--g-text3)',
              fontFamily: 'Google Sans', fontSize: 13, cursor: 'pointer',
            }}>
              Skip
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function EmptyState({ filter }: { filter: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--g-border)', borderRadius: 12, padding: '64px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>
        {filter === 'pending' ? '🎉' : '📭'}
      </div>
      <h3 style={{ fontFamily: 'Google Sans', fontSize: 18, fontWeight: 500, color: 'var(--g-text)', marginBottom: 8 }}>
        {filter === 'pending' ? 'All caught up!' : 'No reviews found'}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--g-text2)' }}>
        {filter === 'pending'
          ? 'You have no pending reviews. Great work keeping up with your inbox!'
          : 'No reviews match the current filter.'}
      </p>
    </div>
  )
}

function getToneSuggestion(rating: number): ReviewTone {
  if (rating <= 2) return 'apologetic'
  if (rating === 3) return 'professional'
  if (rating === 4) return 'friendly'
  return 'grateful'
}

const AVATAR_COLORS = ['#4285F4','#EA4335','#34A853','#FBBC05','#9C27B0','#FF6D00','#00BCD4','#607D8B']
function getAvatarColor(name: string): string {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length
  return AVATAR_COLORS[idx]
}
