import { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { supabaseAdmin } from '@/lib/supabase'
import { createStripeCustomer } from '@/lib/stripe'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/business.manage',
          ].join(' '),
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false

      try {
        const { data: existing } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', user.email)
          .single()

        if (!existing) {
          const customer = await createStripeCustomer(
            user.email,
            user.name || undefined
          )

          await supabaseAdmin.from('users').insert({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            stripe_customer_id: customer.id,
            plan: 'free',
            replies_used_this_month: 0,
          })
        }

        if (account?.access_token) {
          await supabaseAdmin.from('user_tokens').upsert({
            user_id: user.id,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
          })
        }

        return true
      } catch (error) {
        console.error('Error during sign in:', error)
        return false
      }
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub

        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('plan, replies_used_this_month, stripe_customer_id')
          .eq('id', token.sub)
          .single()

        if (userData) {
          session.user.plan = userData.plan
          session.user.repliesUsed = userData.replies_used_this_month
          session.user.stripeCustomerId = userData.stripe_customer_id
        }
      }
      return session
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
}
