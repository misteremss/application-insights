# Holo

A multivendor trading-card marketplace — browse, buy, sell and trade sports
cards and TCG singles, with an escrow-protected checkout.

Implemented from the **HOLO App** design canvas: a full click-through
prototype (sign in/up, discover feed, search & filters, card detail,
multivendor cart & checkout, order tracking with escrow release, seller
tools — shop setup, scan-to-list, dashboard, shipping rates, payouts —
storefronts, reviews, disputes, trades, messages and settings).

## Tech Stack

- **Next.js 14** — App Router, TypeScript
- **React** state only — no backend. All catalogue, seller and order data
  is mocked in `lib/holo/data.ts`; app state (cart, auth form, listings,
  orders, disputes, reviews, settings) lives in the `useHolo` hook and
  resets on reload.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx              ← Root layout, fonts, metadata
  page.tsx                ← Mounts <HoloApp />
components/holo/
  HoloApp.tsx              ← App shell: top bar, screen switch, tab bar
  ImageSlot.tsx             ← Lightweight client-side image picker/preview
  screens/                  ← One component per screen (26 screens total)
lib/holo/
  types.ts                 ← AppState shape + initial mock state
  data.ts                   ← Catalogue: sellers, products, categories, ART gradients
  styles.ts                 ← Shared inline-style helpers (chips, toggles, rows)
  useHolo.ts                ← App state + navigation + cart/search/order logic
```

## What's mocked vs. real

This is a front-end implementation of the design prototype: navigation,
cart math, filters/sort, escrow-release flow, reviews and disputes are all
real client-side logic. There is no backend — authentication, payments,
shipping labels, payouts and messaging are simulated (buttons transition
state/screens but do not call any external service). Wiring a real backend
(auth, Stripe/escrow, a database for listings/orders) would be the next
step to take this from prototype to production.
