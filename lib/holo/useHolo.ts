'use client'

import { useCallback, useState } from 'react'
import { AppState, INITIAL_STATE, Screen, ShipRow } from './types'
import { PRODUCTS, prod, seller, Product } from './data'

export interface CartLineWithProduct {
  id: string
  qty: number
  p: Product
}

export function useHolo() {
  const [state, setState] = useState<AppState>(INITIAL_STATE)

  // ── Navigation ──────────────────────────────────────────────────────────
  const go = useCallback((screen: Screen, extra?: Partial<AppState>) => {
    setState((s) => ({ ...s, ...(extra || {}), screen, stack: [...s.stack, s.screen] }))
  }, [])
  const back = useCallback(() => {
    setState((s) => ({
      ...s,
      screen: s.stack.length ? s.stack[s.stack.length - 1] : 'home',
      stack: s.stack.slice(0, -1),
    }))
  }, [])
  const tab = useCallback((screen: Screen) => {
    setState((s) => ({ ...s, screen, stack: [] }))
  }, [])

  // ── Generic field setters ──────────────────────────────────────────────
  const set = useCallback(<K extends keyof AppState>(key: K, value: AppState[K]) => {
    setState((s) => ({ ...s, [key]: value }))
  }, [])
  const setField = useCallback(
    <K extends keyof AppState>(key: K, sub: string, value: unknown) => {
      setState((s) => ({ ...s, [key]: { ...(s[key] as object), [sub]: value } }))
    },
    []
  )
  const toggle = useCallback(<K extends keyof AppState>(key: K, sub?: string) => {
    setState((s) => {
      if (sub) {
        const obj = s[key] as Record<string, boolean>
        return { ...s, [key]: { ...obj, [sub]: !obj[sub] } }
      }
      return { ...s, [key]: !(s[key] as boolean) } as AppState
    })
  }, [])

  // ── Cart ────────────────────────────────────────────────────────────────
  const cartLines = (): CartLineWithProduct[] =>
    state.cart.map((c) => ({ ...c, p: prod(c.id)! })).filter((l) => l.p)
  const itemsTotal = () => cartLines().reduce((n, l) => n + l.p.price * l.qty, 0)
  const groups = () => {
    const by: Record<string, CartLineWithProduct[]> = {}
    cartLines().forEach((l) => {
      ;(by[l.p.sellerId] = by[l.p.sellerId] || []).push(l)
    })
    return Object.keys(by).map((sid) => {
      const s = seller(sid)
      const idx = state.ship[sid] ?? 0
      const m = s.methods[Math.min(idx, s.methods.length - 1)]
      const sub = by[sid].reduce((n, l) => n + l.p.price * l.qty, 0)
      return { sid, seller: s, lines: by[sid], sub, shipCost: m.p, method: m }
    })
  }
  const shipTotal = () => groups().reduce((n, g) => n + g.shipCost, 0)
  const protection = () => {
    const t = itemsTotal()
    return t ? t * 0.05 + 0.7 : 0
  }
  const addToCart = useCallback((id: string) => {
    setState((s) => {
      const ex = s.cart.find((c) => c.id === id)
      return {
        ...s,
        cart: ex
          ? s.cart.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c))
          : [...s.cart, { id, qty: 1 }],
      }
    })
  }, [])
  const bump = useCallback((id: string, d: number) => {
    setState((s) => ({
      ...s,
      cart: s.cart.map((c) => (c.id === id ? { ...c, qty: c.qty + d } : c)).filter((c) => c.qty > 0),
    }))
  }, [])
  const pickShipMethod = useCallback((sellerId: string, idx: number) => {
    setState((s) => ({ ...s, ship: { ...s.ship, [sellerId]: idx } }))
  }, [])
  const pickPay = useCallback((idx: number) => set('pay', idx), [set])
  const openGameSearch = useCallback((name: string) => {
    setState((s) => ({ ...s, screen: 'search', stack: ['home'], fGame: name }))
  }, [])

  // ── Search / filters ───────────────────────────────────────────────────
  const filtered = () => {
    const q = state.query.trim().toLowerCase()
    let out = PRODUCTS.filter((p) => {
      if (q && !(p.name + ' ' + p.set + ' ' + p.game + ' ' + seller(p.sellerId).shop).toLowerCase().includes(q))
        return false
      if (state.fType !== 'All' && p.type !== state.fType) return false
      if (state.fGame !== 'All' && p.game !== state.fGame) return false
      if (state.fSet !== 'All extensions' && p.set !== state.fSet) return false
      if (state.fCond !== 'Any' && p.cond !== state.fCond) return false
      if (state.fMin && p.price < parseFloat(state.fMin)) return false
      if (state.fMax && p.price > parseFloat(state.fMax)) return false
      if (state.sealedOnly && p.cond !== 'Sealed') return false
      if (state.graded && !/PSA/.test(p.meta)) return false
      if (state.tradeOnly && p.trend < 3) return false
      return true
    })
    if (state.fSort === 'Price ↑') out = [...out].sort((a, b) => a.price - b.price)
    if (state.fSort === 'Price ↓') out = [...out].sort((a, b) => b.price - a.price)
    if (state.fSort === 'Biggest mover') out = [...out].sort((a, b) => b.trend - a.trend)
    if (state.fSort === 'Most sold') out = [...out].sort((a, b) => b.sold - a.sold)
    return out
  }

  // ── Shipping settings (seller) ─────────────────────────────────────────
  const setShipRow = useCallback((i: number, patch: Partial<ShipRow>) => {
    setState((s) => ({ ...s, shipRows: s.shipRows.map((r, j) => (j === i ? { ...r, ...patch } : r)) }))
  }, [])
  const removeShipRow = useCallback((i: number) => {
    setState((s) => ({ ...s, shipRows: s.shipRows.filter((_, j) => j !== i) }))
  }, [])
  const addShipRow = useCallback(() => {
    setState((s) => ({
      ...s,
      shipRows: [...s.shipRows, { carrier: 'New option', meta: 'Set zone & transit time', price: '0.00', tracked: true, combine: true }],
    }))
  }, [])

  // ── Publishing / saving flows ──────────────────────────────────────────
  const saveShop = useCallback(() => {
    setState((s) => ({ ...s, shop: { ...s.shop, saved: true }, screen: 'dash', stack: [...s.stack, s.screen] }))
  }, [])
  const publishListing = useCallback(() => {
    setState((s) => ({ ...s, published: true, screen: 'dash', stack: [...s.stack, s.screen] }))
  }, [])
  const saveBank = useCallback(() => {
    setState((s) => ({ ...s, bank: { ...s.bank, saved: true }, screen: 'dash', stack: [...s.stack, s.screen] }))
  }, [])

  // ── Orders / escrow / reviews / disputes ───────────────────────────────
  const releaseOrder = useCallback((orderId: string) => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === orderId ? { ...o, status: 'complete', eta: 'Completed today' } : o)),
      screen: 'review',
      stack: [...s.stack, s.screen],
    }))
  }, [])
  const submitReview = useCallback(() => {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === s.orderId ? { ...o, reviewed: true } : o)),
      screen: 'orders',
      stack: [...s.stack, s.screen],
    }))
  }, [])
  const fileDispute = useCallback(() => {
    setState((s) => ({
      ...s,
      dispute: { ...s.dispute, filed: true },
      orders: s.orders.map((o) => (o.id === s.orderId ? { ...o, status: 'dispute', eta: 'Holo reviewing · 2 days' } : o)),
    }))
  }, [])

  return {
    state,
    go,
    back,
    tab,
    set,
    setField,
    toggle,
    cartLines,
    itemsTotal,
    shipTotal,
    protection,
    groups,
    addToCart,
    bump,
    pickShipMethod,
    pickPay,
    openGameSearch,
    filtered,
    setShipRow,
    removeShipRow,
    addShipRow,
    saveShop,
    publishListing,
    saveBank,
    releaseOrder,
    submitReview,
    fileDispute,
  }
}

export type Holo = ReturnType<typeof useHolo>
