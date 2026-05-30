# Starbooster AI

AI-powered Google review responses for local businesses. Connect your Google Business Profile and reply to every review in one click.

## Tech Stack

- **Next.js 14** — App Router, TypeScript
- **Anthropic Claude** — AI reply generation
- **Supabase** — Database, Auth, Row Level Security
- **NextAuth.js** — Google OAuth
- **Stripe** — Subscriptions ($97/$197/$297/mo)
- **Google My Business API** — Fetch & post reviews
- **Vercel** — Deployment

## Local Development

### 1. Clone and install

```bash
git clone <your-repo>
cd starbooster
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in all values in `.env.local` (see below for how to get each one).

### 3. Set up Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run `supabase/migrations/001_init.sql`
3. Copy your project URL and anon key to `.env.local`

### 4. Set up Google OAuth + Business API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable these APIs:
   - Google My Business API
   - Google+ API (for profile info)
4. Create OAuth 2.0 credentials (Web Application)
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

> ⚠️ Google My Business API requires approval. Apply at [business.google.com/create](https://business.google.com/create). You can use mock data while waiting.

### 5. Set up Stripe

1. Create account at [stripe.com](https://stripe.com)
2. Create 3 products in Stripe Dashboard:
   - Starter: $97/mo recurring
   - Growth: $197/mo recurring  
   - Agency: $297/mo recurring
3. Copy price IDs to `.env.local`
4. Install Stripe CLI and run webhook listener:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

### 6. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set env vars
vercel env add ANTHROPIC_API_KEY
vercel env add NEXT_PUBLIC_SUPABASE_URL
# ... (all vars from .env.local.example)

# Set Stripe webhook to: https://yourdomain.vercel.app/api/stripe/webhook
```

## Project Structure

```
starbooster/
├── app/
│   ├── page.tsx                    ← Landing page
│   ├── layout.tsx                  ← Root layout
│   ├── (auth)/login/               ← Google sign-in
│   ├── dashboard/
│   │   ├── page.tsx                ← Reviews inbox (main product)
│   │   ├── locations/              ← Connect Google locations
│   │   ├── billing/                ← Stripe plans
│   │   └── settings/               ← Account settings
│   └── api/
│       ├── generate/               ← AI reply generation
│       ├── reviews/fetch/          ← Sync from GMB
│       ├── reviews/reply/          ← Post to Google
│       └── stripe/                 ← Checkout + webhooks
├── components/
│   ├── ReviewsInbox.tsx            ← Core product UI
│   ├── DashboardSidebar.tsx
│   ├── DashboardTopbar.tsx
│   └── Icons.tsx
├── lib/
│   ├── anthropic.ts                ← AI reply engine
│   ├── google-my-business.ts       ← GMB API
│   ├── stripe.ts                   ← Billing
│   └── supabase.ts                 ← Database
├── types/index.ts                  ← All TypeScript types
└── supabase/migrations/001_init.sql
```

## Revenue Model

| Plan    | Price   | Locations | Replies/mo |
|---------|---------|-----------|------------|
| Starter | $97/mo  | 1         | 50         |
| Growth  | $197/mo | 3         | 200        |
| Agency  | $297/mo | 10        | Unlimited  |

**Target: $10K MRR = 34 × Agency or 52 × Growth**

## First Sales Playbook

1. **Record a demo** — Screen-record replying to a real 1-star review in 8 seconds. Post to TikTok, LinkedIn, X.
2. **Google Maps cold outreach** — Search for restaurants with unanswered bad reviews. DM the owner on Instagram.
3. **Agency upsell** — Find local marketing agencies on LinkedIn. Offer the Agency plan as a white-label tool.
4. **Reddit/communities** — Post in r/smallbusiness, r/restaurantowners with a genuine "I built this for you" post.
