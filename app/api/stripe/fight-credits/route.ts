import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// One-off token-pack purchase for Roast Arena: 10 fight credits / 9 PLN.
// No login required — credits are tracked client-side (localStorage) for v1.
const PRICE_PLN = 900 // 9.00 PLN in grosze
const CREDITS = 10

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const baseUrl = process.env.NEXTAUTH_URL || req.nextUrl.origin

  if (!secretKey) {
    // No Stripe key configured in this environment — return a mock success
    // so the flow is testable end-to-end without live payments.
    return NextResponse.json({ url: `${baseUrl}/?mock_purchase=1` })
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2024-04-10' })

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'blik'],
    line_items: [
      {
        price_data: {
          currency: 'pln',
          unit_amount: PRICE_PLN,
          product_data: { name: `${CREDITS} Roast Arena fight credits` },
        },
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/?purchase=cancelled`,
  })

  return NextResponse.json({ url: checkoutSession.url })
}
