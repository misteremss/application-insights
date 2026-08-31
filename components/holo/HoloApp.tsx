'use client'

import { useEffect, useRef } from 'react'
import { useHolo } from '@/lib/holo/useHolo'
import type { Screen } from '@/lib/holo/types'

import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import Home from './screens/Home'
import Search from './screens/Search'
import ProductScreen from './screens/Product'
import Cart from './screens/Cart'
import Checkout from './screens/Checkout'
import OrderPlaced from './screens/OrderPlaced'
import Trends from './screens/Trends'
import Spoilers from './screens/Spoilers'
import SellHub from './screens/SellHub'
import ShopSetup from './screens/ShopSetup'
import ListItem from './screens/ListItem'
import SellerDashboard from './screens/SellerDashboard'
import ShippingSettings from './screens/ShippingSettings'
import Payouts from './screens/Payouts'
import Storefront from './screens/Storefront'
import Orders from './screens/Orders'
import OrderDetail from './screens/OrderDetail'
import Review from './screens/Review'
import Dispute from './screens/Dispute'
import Collection from './screens/Collection'
import Wantlist from './screens/Wantlist'
import Trades from './screens/Trades'
import Messages from './screens/Messages'
import Settings from './screens/Settings'

const TITLES: Record<Screen, string> = {
  signin: 'Sign in', signup: 'Create account',
  home: 'Discover', search: 'Browse cards', product: 'Card detail', cart: 'Cart', checkout: 'Checkout', order: 'Order placed',
  trends: 'Price trends', spoilers: 'Spoilers & drops',
  sell: 'Sell on Holo', shopSetup: 'Your shop', list: 'List an item', dash: 'Seller dashboard', shipping: 'Shipping & rates', payout: 'Payouts & bank',
  store: 'Storefront', orders: 'My orders', orderDetail: 'Order', review: 'Leave a review', dispute: 'Report a problem',
  collection: 'My collection', want: 'Wantlist', trades: 'Trades', messages: 'Messages', settings: 'Settings',
}

const TABS: [Screen, string, string][] = [
  ['home', 'Home', '◆'],
  ['search', 'BROWSE', '◎'],
  ['list', 'SELL', '＋'],
  ['trends', 'TRENDS', '◢'],
  ['settings', 'ME', '●'],
]

export default function HoloApp() {
  const holo = useHolo()
  const { state, go, back, tab } = holo
  const scr = state.screen
  const showChrome = scr !== 'signin' && scr !== 'signup'
  const cartCount = holo.cartLines().reduce((n, l) => n + l.qty, 0)
  const title = scr === 'orderDetail' ? 'Order ' + state.orderId : TITLES[scr] || 'Holo'

  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [scr])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#05050A',
        color: '#F4F4F6',
        fontFamily: "'Space Grotesk',system-ui,sans-serif',",
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#08080B',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}
      >
        {showChrome && (
          <div
            style={{
              flex: 'none', display: 'flex', alignItems: 'center', gap: 12,
              padding: '16px 18px 14px', position: 'sticky', top: 0, zIndex: 5,
              background: 'rgba(8,8,11,0.85)', backdropFilter: 'blur(10px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {state.stack.length > 0 ? (
              <button onClick={back} aria-label="Back" style={backBtnStyle}>
                ‹
              </button>
            ) : (
              <button onClick={() => tab('home')} aria-label="Holo home" style={logoBtnStyle}>
                <span style={{ position: 'relative', width: 26, height: 26, borderRadius: 8, background: '#0E0E13', border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden', clipPath: 'polygon(0 0,74% 0,100% 26%,100% 100%,0 100%)', display: 'inline-block' }}>
                  <span style={{ position: 'absolute', left: '-30%', top: '26%', width: '160%', height: '14%', background: 'linear-gradient(90deg,#C8FF3D,#2BE8FF,#8A5CFF,#FF3DA6)', transform: 'rotate(-38deg)', display: 'block' }} />
                </span>
              </button>
            )}
            <div style={{ fontFamily: "'Archivo',sans-serif", fontWeight: 800, fontStretch: '112%' as any, fontSize: 19, letterSpacing: '-.02em', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {title}
            </div>
            <button onClick={() => go('search')} aria-label="Search" style={iconBtnStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4F4F6" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4.2-4.2" />
              </svg>
            </button>
            <button onClick={() => go('cart')} aria-label="Cart" style={{ ...iconBtnStyle, width: 'auto', gap: 6, padding: '0 10px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4F4F6" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h3l2 10h9l2-7H7" />
                <circle cx="10" cy="19" r="1.3" />
                <circle cx="17" cy="19" r="1.3" />
              </svg>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: '#C8FF3D' }}>{cartCount}</span>
            </button>
          </div>
        )}

        <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: showChrome ? '18px 18px 32px' : 0 }}>
          {renderScreen(scr, holo)}
        </div>

        {showChrome && (
          <div
            style={{
              flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
              padding: '9px 8px calc(8px + env(safe-area-inset-bottom))', background: '#0B0B10',
              borderTop: '1px solid rgba(255,255,255,0.07)', position: 'sticky', bottom: 0,
            }}
          >
            {TABS.map(([id, name, glyph]) => {
              const on = scr === id
              return (
                <button
                  key={id}
                  onClick={() => tab(id)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '4px 10px' }}
                >
                  <div
                    style={{
                      width: 30, height: 26, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                      background: on ? 'rgba(200,255,61,.14)' : 'transparent', color: on ? '#C8FF3D' : '#8B8B98',
                    }}
                  >
                    {glyph}
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 8.5, letterSpacing: '.12em', color: on ? '#C8FF3D' : '#8B8B98' }}>{name}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function renderScreen(scr: Screen, holo: ReturnType<typeof useHolo>) {
  switch (scr) {
    case 'signin': return <SignIn holo={holo} />
    case 'signup': return <SignUp holo={holo} />
    case 'home': return <Home holo={holo} />
    case 'search': return <Search holo={holo} />
    case 'product': return <ProductScreen holo={holo} />
    case 'cart': return <Cart holo={holo} />
    case 'checkout': return <Checkout holo={holo} />
    case 'order': return <OrderPlaced holo={holo} />
    case 'trends': return <Trends holo={holo} />
    case 'spoilers': return <Spoilers holo={holo} />
    case 'sell': return <SellHub holo={holo} />
    case 'shopSetup': return <ShopSetup holo={holo} />
    case 'list': return <ListItem holo={holo} />
    case 'dash': return <SellerDashboard holo={holo} />
    case 'shipping': return <ShippingSettings holo={holo} />
    case 'payout': return <Payouts holo={holo} />
    case 'store': return <Storefront holo={holo} />
    case 'orders': return <Orders holo={holo} />
    case 'orderDetail': return <OrderDetail holo={holo} />
    case 'review': return <Review holo={holo} />
    case 'dispute': return <Dispute holo={holo} />
    case 'collection': return <Collection holo={holo} />
    case 'want': return <Wantlist holo={holo} />
    case 'trades': return <Trades holo={holo} />
    case 'messages': return <Messages holo={holo} />
    case 'settings': return <Settings holo={holo} />
    default: return null
  }
}

const backBtnStyle = {
  width: 32, height: 32, flex: 'none' as const, border: 'none', borderRadius: 10,
  background: '#17171E', color: '#F4F4F6', cursor: 'pointer', fontSize: 16, lineHeight: 1,
}
const logoBtnStyle = { border: 'none', background: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }
const iconBtnStyle = {
  width: 32, height: 32, flex: 'none' as const, border: 'none', borderRadius: 10,
  background: '#17171E', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
}
