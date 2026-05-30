export type Plan = 'free' | 'starter' | 'growth' | 'agency'

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  stripe_customer_id?: string
  plan: Plan
  replies_used_this_month: number
  created_at: string
}

export interface Location {
  id: string
  user_id: string
  name: string
  address?: string
  gmb_location_id: string
  gmb_access_token?: string
  gmb_refresh_token?: string
  avg_rating?: number
  total_reviews?: number
  pending_replies?: number
  created_at: string
}

export type ReviewStatus = 'pending' | 'replied' | 'skipped'
export type ReviewTone = 'professional' | 'friendly' | 'apologetic' | 'grateful'

export interface Review {
  id: string
  location_id: string
  location_name?: string
  reviewer_name: string
  reviewer_avatar?: string
  rating: 1 | 2 | 3 | 4 | 5
  review_text: string
  gmb_review_id: string
  reply_text?: string
  replied_at?: string
  status: ReviewStatus
  created_at: string
  updated_at: string
}

export interface ReplyDraft {
  id: string
  review_id: string
  draft_text: string
  tone: ReviewTone
  created_at: string
}

export interface DashboardStats {
  pending: number
  replied_today: number
  avg_rating: number
  total_this_month: number
  reply_rate: number
}

export interface PricingPlan {
  id: Plan
  name: string
  price: number
  priceId: string
  description: string
  locations: number
  replies: number | 'unlimited'
  features: string[]
  notIncluded: string[]
  popular?: boolean
}

export const PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 97,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || '',
    description: 'For single-location businesses',
    locations: 1,
    replies: 50,
    features: [
      '1 Google Business location',
      '50 AI replies per month',
      '4 tone options',
      'Direct Google posting',
      'Email support',
    ],
    notIncluded: ['Multi-location dashboard', 'White-label branding'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 197,
    priceId: process.env.STRIPE_GROWTH_PRICE_ID || '',
    description: 'For growing multi-location businesses',
    locations: 3,
    replies: 200,
    popular: true,
    features: [
      '3 Google Business locations',
      '200 AI replies per month',
      '4 tone options',
      'Direct Google posting',
      'Priority support',
      'Multi-location dashboard',
    ],
    notIncluded: ['White-label branding'],
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 297,
    priceId: process.env.STRIPE_AGENCY_PRICE_ID || '',
    description: 'For agencies managing many clients',
    locations: 10,
    replies: 'unlimited',
    features: [
      '10 Google Business locations',
      'Unlimited AI replies',
      '4 tone options',
      'Direct Google posting',
      'Priority + phone support',
      'Multi-location dashboard',
      'White-label branding',
    ],
    notIncluded: [],
  },
]

export const PLAN_LIMITS: Record<Plan, { locations: number; replies: number }> = {
  free:     { locations: 0, replies: 0 },
  starter:  { locations: 1, replies: 50 },
  growth:   { locations: 3, replies: 200 },
  agency:   { locations: 10, replies: 999999 },
}
