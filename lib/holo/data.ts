// Mock catalogue + reference data for the HOLO prototype.
// Ported from the HOLO App design canvas (HOLO App.dc.html).

export const EUR = (n: number) =>
  '€ ' + n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
export const EUR0 = (n: number) =>
  '€ ' + n.toLocaleString('de-DE', { maximumFractionDigits: 0 })

export const ART = {
  soccer: 'linear-gradient(150deg,#1B3A2E,#2BE8FF 55%,#0C2A24)',
  nba: 'linear-gradient(150deg,#33132B,#FF3DA6 60%,#20101E)',
  nhl: 'linear-gradient(150deg,#141C33,#2BE8FF 55%,#0E1424)',
  nfl: 'linear-gradient(150deg,#2B1810,#FF6A2B 58%,#1A0F0A)',
  mlb: 'linear-gradient(150deg,#1C2233,#8FA8FF 55%,#12161F)',
  f1: 'linear-gradient(150deg,#330F14,#FF3D3D 55%,#1E0A0C)',
  pkmn: 'linear-gradient(150deg,#33290F,#FFD93D 58%,#1E1808)',
  ygo: 'linear-gradient(150deg,#2A1433,#8A5CFF 58%,#170B1E)',
  mtg: 'linear-gradient(150deg,#231A12,#C7A46A 58%,#150F0A)',
  op: 'linear-gradient(150deg,#331A14,#FF6A2B 55%,#1D0F0A)',
  disney: 'linear-gradient(150deg,#12203A,#6BB6FF 58%,#0B1424)',
  wwe: 'linear-gradient(150deg,#33210F,#FFB03D 58%,#1D1308)',
  panini: 'linear-gradient(150deg,#1A2E1E,#C8FF3D 58%,#0E1A11)',
  foil: 'linear-gradient(100deg,#C8FF3D,#2BE8FF 38%,#8A5CFF 72%,#FF3DA6)',
} as const

export type ArtKey = keyof typeof ART

export interface ShipMethod {
  n: string
  p: number
}

export interface Seller {
  id: string
  shop: string
  handle: string
  city: string
  rating: number
  sales: number
  followers: string
  verified: string
  art: string
  bio: string
  methods: ShipMethod[]
}

export const SELLERS: Seller[] = [
  { id: 's1', shop: 'Vault Milano', handle: '@vaultmilano', city: 'Milano, IT', rating: 4.98, sales: 6120, followers: '9.7k', verified: 'VERIFIED DEALER', art: 'linear-gradient(135deg,#8A5CFF,#2BE8FF)', bio: 'Serie A numbered parallels & game-used. Ships worldwide in 24h.', methods: [{ n: 'Untracked letter · 4-7d', p: 2.2 }, { n: 'Tracked parcel · 2-4d', p: 5.9 }, { n: 'Express · next day', p: 12.5 }] },
  { id: 's2', shop: 'Hoop Heat', handle: '@hoopheat', city: 'Rotterdam, NL', rating: 4.91, sales: 2840, followers: '4.1k', verified: 'TOP SELLER', art: 'linear-gradient(135deg,#C8FF3D,#FF6A2B)', bio: 'NBA rookies, Prizm and Select. Same-day dispatch before 17:00.', methods: [{ n: 'Tracked parcel · 1-3d', p: 4.5 }, { n: 'Express · next day', p: 9.9 }] },
  { id: 's3', shop: 'Kanto Kiosk', handle: '@kantokiosk', city: 'Köln, DE', rating: 4.96, sales: 11230, followers: '18.2k', verified: 'VERIFIED DEALER', art: 'linear-gradient(135deg,#FFD93D,#FF3DA6)', bio: 'Sealed Pokémon, EN/JP. Booster boxes shipped double-boxed.', methods: [{ n: 'Tracked parcel · 2-4d', p: 4.9 }, { n: 'Insured · 2-3d', p: 8.9 }] },
  { id: 's4', shop: 'Duelist Depot', handle: '@duelistdepot', city: 'Lyon, FR', rating: 4.88, sales: 1490, followers: '2.3k', verified: 'NEW SELLER', art: 'linear-gradient(135deg,#8A5CFF,#FF3DA6)', bio: 'Yu-Gi-Oh! singles and Lorcana. Sleeved + top-loader always.', methods: [{ n: 'Untracked letter · 5-8d', p: 1.9 }, { n: 'Tracked parcel · 3-5d', p: 6.4 }] },
]

export interface Product {
  id: string
  name: string
  game: string
  type: string
  set: string
  meta: string
  cond: string
  price: number
  sellerId: string
  trend: number
  art: string
  badge: string
  sold: number
}

const P = (
  id: string, name: string, game: string, type: string, set: string, meta: string,
  cond: string, price: number, sellerId: string, trend: number, art: string, badge: string, sold: number
): Product => ({ id, name, game, type, set, meta, cond, price, sellerId, trend, art, badge, sold })

export const PRODUCTS: Product[] = [
  P('p1', 'Mbappé Optic Silver Prizm /25', 'Soccer', 'Singles', 'Panini Optic 2024', '2024 Panini Optic · #012/025 · EN', 'Near Mint', 1249, 's1', 6.4, ART.soccer, 'GRAIL /25', 38),
  P('p2', 'Wembanyama Prizm RC #136', 'NBA', 'Singles', 'Panini Prizm 2023-24', '2023-24 Prizm · PSA 9 · EN', 'Mint', 389, 's2', -2.1, ART.nba, 'PSA 9', 214),
  P('p3', 'Bedard Young Guns RC', 'NHL', 'Singles', 'Upper Deck Series 1', '2023-24 Upper Deck · #451 · EN', 'Near Mint', 210, 's2', 4.2, ART.nhl, 'ROOKIE', 96),
  P('p4', 'Verstappen Gold Signature /10', 'F1', 'Singles', 'Topps Chrome F1 2024', '2024 Topps Chrome · #04/010 · EN', 'Mint', 1840, 's1', 11.8, ART.f1, 'AUTO /10', 12),
  P('p5', 'Charizard ex Special Illustration', 'Pokémon', 'Singles', 'Obsidian Flames', 'SV03 · #223/197 · EN', 'Near Mint', 640, 's3', 3.1, ART.pkmn, 'SIR', 402),
  P('p6', 'Surging Sparks Booster Box · 36ct', 'Pokémon', 'Booster Boxes', 'Surging Sparks', 'Sealed · EN · 36 packs', 'Sealed', 149, 's3', 8.9, ART.pkmn, 'SEALED', 1180),
  P('p7', 'Blue-Eyes White Dragon 1st Ed', 'Yu-Gi-Oh!', 'Singles', 'Legend of Blue Eyes', 'LOB-001 · EN · 1st Edition', 'Excellent', 2450, 's4', 14.2, ART.ygo, '1st ED', 8),
  P('p8', 'Quarter Century Bonanza Booster', 'Yu-Gi-Oh!', 'Boosters', '25th Anniversary', 'Single pack · EN', 'Sealed', 6.4, 's4', 1.2, ART.ygo, 'SEALED', 3400),
  P('p9', 'Elsa – Spirit of Winter', 'Disney Lorcana', 'Singles', 'The First Chapter', 'TFC · #042/204 · Enchanted', 'Near Mint', 320, 's4', -1.4, ART.disney, 'ENCHANTED', 74),
  P('p10', 'Mahomes Downtown SP', 'NFL', 'Singles', 'Panini Prizm 2024', '2024 Prizm · Downtown · EN', 'Mint', 780, 's2', 5.6, ART.nfl, 'CASE HIT', 41),
  P('p11', 'Ohtani Topps Chrome Refractor', 'MLB', 'Singles', 'Topps Chrome 2024', '2024 Chrome · /499 · EN', 'Near Mint', 96, 's2', -3.8, ART.mlb, '/499', 320),
  P('p12', 'Ragavan, Nimble Pilferer', 'Magic', 'Singles', 'Modern Horizons 2', 'MH2 · #138 · Foil EN', 'Near Mint', 78, 's4', 2.4, ART.mtg, 'FOIL', 610),
  P('p13', 'Luffy Leader Parallel OP-05', 'One Piece', 'Singles', 'Awakening of the New Era', 'OP05 · Alt Art · JP', 'Mint', 410, 's3', 9.7, ART.op, 'ALT ART', 88),
  P('p14', 'Panini World Cup 2026 Sticker Box', 'Panini', 'Sealed Products', 'FIFA World Cup 2026', 'Sealed · 100 packs · EU', 'Sealed', 92, 's1', 6.1, ART.panini, 'PRE-ORDER', 240),
  P('p15', 'Roman Reigns Prizm Gold /10', 'WWE', 'Singles', 'Panini Prizm WWE 2024', '2024 Prizm WWE · #08/010', 'Near Mint', 540, 's2', 3.3, ART.wwe, 'GOLD /10', 19),
  P('p16', 'BCW Pro 35pt Top-loaders ×25', 'Accessories', 'Accessories', 'BCW', 'Storage · 25 pack', 'New', 12.9, 's3', 0.4, 'linear-gradient(150deg,#1A1A22,#5A5A66)', 'SUPPLIES', 2400),
  P('p17', 'Serie A Team Lot · 45 cards', 'Soccer', 'Sets, Lots, and Collections', 'Mixed 2023-25', 'Bundle · 45 cards · mixed', 'Near Mint', 74, 's1', 1.9, ART.soccer, 'LOT ×45', 130),
  P('p18', 'Prizm Basketball Blaster Box', 'NBA', 'Sealed Products', 'Panini Prizm 2024-25', 'Sealed · 6 packs · retail', 'Sealed', 39, 's2', 7.2, ART.nba, 'RETAIL', 890),
]

export const GAMES = ['All', 'Soccer', 'NBA', 'NHL', 'NFL', 'MLB', 'F1', 'Panini', 'Pokémon', 'Yu-Gi-Oh!', 'Magic', 'One Piece', 'Disney Lorcana', 'WWE', 'Accessories']
export const TYPES = ['All', 'Singles', 'Boosters', 'Booster Boxes', 'Sets, Lots, and Collections', 'Sealed Products', 'Accessories']
export const CONDS = ['Any', 'Mint', 'Near Mint', 'Excellent', 'Good', 'Sealed']
export const SORTS = ['Relevance', 'Price ↑', 'Price ↓', 'Biggest mover', 'Most sold']

export const prod = (id: string) => PRODUCTS.find((p) => p.id === id)
export const seller = (id: string) => SELLERS.find((s) => s.id === id) as Seller

export function bars(seed: number, n: number) {
  return Array.from({ length: n }, (_, i) => {
    const v = 34 + ((Math.sin((i + seed) * 1.7) + 1) / 2) * 62
    return { h: v.toFixed(0) + '%', c: i === n - 1 ? '#C8FF3D' : i > n - 4 ? '#2BE8FF' : '#8B8B98' }
  })
}

export function condStyle(c: string): [string, string] {
  return (
    ({
      Mint: ['rgba(200,255,61,.14)', '#C8FF3D'],
      'Near Mint': ['rgba(43,232,255,.14)', '#2BE8FF'],
      Excellent: ['rgba(255,106,43,.16)', '#FF6A2B'],
      Good: ['rgba(139,139,152,.18)', '#B9B9C4'],
      Sealed: ['rgba(138,92,255,.16)', '#A780FF'],
      New: ['rgba(139,139,152,.18)', '#B9B9C4'],
    }) as Record<string, [string, string]>
  )[c] || ['rgba(139,139,152,.18)', '#B9B9C4']
}

export function statusMeta(st: string) {
  return (
    ({
      escrow: { label: 'ESCROW HELD', bg: 'rgba(138,92,255,.16)', fg: '#A780FF' },
      transit: { label: 'IN TRANSIT', bg: 'rgba(43,232,255,.15)', fg: '#2BE8FF' },
      delivered: { label: 'DELIVERED · CONFIRM', bg: 'rgba(200,255,61,.14)', fg: '#C8FF3D' },
      complete: { label: 'COMPLETE', bg: 'rgba(200,255,61,.14)', fg: '#C8FF3D' },
      dispute: { label: 'CLAIM OPEN', bg: 'rgba(255,106,43,.16)', fg: '#FF6A2B' },
    }) as Record<string, { label: string; bg: string; fg: string }>
  )[st] || { label: 'PENDING', bg: 'rgba(139,139,152,.18)', fg: '#B9B9C4' }
}

export const trendC = (t: number) => (t >= 0 ? '#C8FF3D' : '#FF6A2B')
export const trendL = (t: number) => (t >= 0 ? '▲ ' : '▼ ') + Math.abs(t).toFixed(1).replace('.', ',') + '%'

export function mapProduct(p: Product) {
  const [condBg, condFg] = condStyle(p.cond)
  const s = seller(p.sellerId)
  return {
    id: p.id,
    name: p.name,
    meta: p.meta,
    art: p.art,
    badge: p.badge,
    condition: p.cond,
    condBg,
    condFg,
    priceLabel: p.price >= 100 ? EUR0(p.price) : EUR(p.price),
    trendColor: trendC(p.trend),
    trendLabel: trendL(p.trend),
    sellerLabel: s.shop + ' · ' + s.rating + '★',
  }
}

export const spoilerData = () => [
  { key: 'r1', name: 'Pokémon · Mega Evolution EN', meta: 'Reveals from 12 Sep · release 26 Sep · pre-order live', tag: 'POKÉMON', art: ART.pkmn },
  { key: 'r2', name: 'Panini FIFA World Cup 2026 Prizm', meta: 'First images 04 Oct · release 21 Nov', tag: 'SOCCER', art: ART.soccer },
  { key: 'r3', name: 'Yu-Gi-Oh! Quarter Century Bonanza 2', meta: 'Spoiler season open · release 18 Oct', tag: 'YU-GI-OH!', art: ART.ygo },
  { key: 'r4', name: 'Disney Lorcana · Archazia’s Island', meta: 'Full card list 29 Sep · release 15 Oct', tag: 'LORCANA', art: ART.disney },
  { key: 'r5', name: 'Topps Chrome F1 2026', meta: 'Checklist 08 Nov · release 03 Dec', tag: 'FORMULA 1', art: ART.f1 },
]
