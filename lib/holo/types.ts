export type Screen =
  | 'signin' | 'signup'
  | 'home' | 'search' | 'product' | 'cart' | 'checkout' | 'order'
  | 'trends' | 'spoilers'
  | 'sell' | 'shopSetup' | 'list' | 'dash' | 'shipping' | 'payout'
  | 'store' | 'orders' | 'orderDetail' | 'review' | 'dispute'
  | 'collection' | 'want' | 'trades' | 'messages' | 'settings'

export interface CartLine {
  id: string
  qty: number
}

export interface ShipRow {
  carrier: string
  meta: string
  price: string
  tracked: boolean
  combine: boolean
}

export interface Order {
  id: string
  name: string
  shop: string
  shopId: string
  price: number
  ship: number
  artKey: string
  status: 'escrow' | 'transit' | 'delivered' | 'complete' | 'dispute'
  carrier: string
  tracking: string
  eta: string
  placed: string
  reviewed: boolean
}

export interface AppState {
  screen: Screen
  stack: Screen[]
  productId: string
  storeId: string

  query: string
  fType: string
  fGame: string
  fSet: string
  fCond: string
  fMin: string
  fMax: string
  fSort: string
  graded: boolean
  sealedOnly: boolean
  tradeOnly: boolean

  cart: CartLine[]
  ship: Record<string, number>
  pay: number
  trendTab: string
  following: Record<string, boolean>
  reminders: Record<string, boolean>

  shop: { name: string; handle: string; city: string; vat: string; bio: string; saved: boolean }
  li: { title: string; game: string; type: string; condition: string; qty: string; desc: string; price: string }
  shipRows: ShipRow[]
  shipFlags: { combine: boolean; holoLabel: boolean; sameDay: boolean }
  settings: { pushDrops: boolean; pushPrice: boolean; email: boolean; vacation: boolean; publicCollection: boolean }
  published: boolean
  bank: { holder: string; iban: string; bic: string; country: string; currency: string; schedule: number; verified: boolean; saved: boolean }

  orderId: string
  orders: Order[]

  auth: { email: string; password: string; name: string; handle: string; country: string; accept: boolean; seller: boolean }
  review: { stars: number; speed: number; packaging: number; accuracy: number; text: string }
  dispute: { reason: string; detail: string; want: number; filed: boolean }
  myReviews: { who: string; when: string; stars: number; text: string }[]
}

export const INITIAL_STATE: AppState = {
  screen: 'home', stack: [], productId: 'p1', storeId: 's1',
  query: '', fType: 'All', fGame: 'All', fSet: 'All extensions', fCond: 'Any', fMin: '', fMax: '', fSort: 'Relevance',
  graded: false, sealedOnly: false, tradeOnly: false,
  cart: [{ id: 'p1', qty: 1 }, { id: 'p6', qty: 2 }],
  ship: { s1: 1, s2: 0, s3: 0, s4: 1 },
  pay: 0, trendTab: 'Top gainers',
  following: { s1: true, s2: false, s3: true, s4: false },
  reminders: { r1: true, r2: false, r3: false, r4: false, r5: false },
  shop: { name: 'Vault Milano', handle: 'vaultmilano', city: 'Milano, IT', vat: 'IT0294837261', bio: 'Serie A numbered parallels & game-used. Ships worldwide in 24h.', saved: true },
  li: { title: 'Wembanyama Prizm RC #136', game: 'NBA', type: 'Singles', condition: 'Mint', qty: '1', desc: 'Centred, sharp corners, no surface wear. Sleeved + top-loader, shipped within 24h.', price: '389' },
  shipRows: [
    { carrier: 'Untracked letter', meta: 'NL → EU · 4-7 days · max 1 card', price: '2.20', tracked: false, combine: true },
    { carrier: 'Tracked parcel', meta: 'NL → EU · 2-4 days · up to 2kg', price: '5.90', tracked: true, combine: true },
    { carrier: 'Express insured', meta: 'NL → worldwide · next day · to € 2.500', price: '12.50', tracked: true, combine: false },
  ],
  shipFlags: { combine: true, holoLabel: true, sameDay: false },
  settings: { pushDrops: true, pushPrice: true, email: false, vacation: false, publicCollection: true },
  published: false,
  bank: { holder: 'Luca Bernard', iban: 'NL91 ABNA 0417 1643 00', bic: 'ABNANL2A', country: 'Netherlands', currency: 'EUR', schedule: 1, verified: true, saved: true },
  orderId: 'HL-48210',
  orders: [
    { id: 'HL-48210', name: 'Charizard ex Special Illustration', shop: 'Kanto Kiosk', shopId: 's3', price: 640, ship: 4.9, artKey: 'pkmn', status: 'transit', carrier: 'DHL', tracking: '00 3400 8821 4', eta: 'Arrives Tue 2 Sep', placed: '28 Aug', reviewed: false },
    { id: 'HL-48188', name: 'Wembanyama Prizm RC #136', shop: 'Hoop Heat', shopId: 's2', price: 389, ship: 4.5, artKey: 'nba', status: 'delivered', carrier: 'PostNL', tracking: '3S RECT 4410 92', eta: 'Delivered 29 Aug 11:04', placed: '26 Aug', reviewed: false },
    { id: 'HL-48151', name: 'Blue-Eyes White Dragon 1st Ed', shop: 'Duelist Depot', shopId: 's4', price: 2450, ship: 6.4, artKey: 'ygo', status: 'escrow', carrier: '—', tracking: 'Awaiting label', eta: 'Seller has 14h left', placed: '25 Aug', reviewed: false },
    { id: 'HL-48120', name: 'Mbappé Optic Silver /25', shop: 'Vault Milano', shopId: 's1', price: 1249, ship: 5.9, artKey: 'soccer', status: 'complete', carrier: 'DHL', tracking: '00 3400 7712 8', eta: 'Completed 21 Aug', placed: '16 Aug', reviewed: true },
    { id: 'HL-48090', name: 'Prizm Basketball Blaster Box', shop: 'Hoop Heat', shopId: 's2', price: 39, ship: 4.5, artKey: 'nba', status: 'dispute', carrier: 'PostNL', tracking: 'Claim HL-C-2280', eta: 'Holo reviewing · 2 days', placed: '12 Aug', reviewed: false },
  ],
  auth: { email: '', password: '', name: '', handle: '', country: 'Netherlands', accept: false, seller: true },
  review: { stars: 5, speed: 5, packaging: 5, accuracy: 5, text: '' },
  dispute: { reason: 'Not as described', detail: '', want: 0, filed: false },
  myReviews: [
    { who: '@lucab', when: '2 days ago', stars: 5, text: 'Card exactly as described, sleeved and top-loaded. Label went out the same hour.' },
    { who: '@t_kowalski', when: '1 week ago', stars: 5, text: 'Third order from this shop. Packaging is bulletproof and the scans are honest.' },
    { who: '@marta.c', when: '3 weeks ago', stars: 4, text: 'Great card, shipping took a day longer than stated. Still recommended.' },
  ],
}
