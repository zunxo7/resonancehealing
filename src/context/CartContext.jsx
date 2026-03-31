import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = localStorage.getItem('rh_cart')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadCurrency() {
  return localStorage.getItem('rh_currency') || 'PKR'
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [currency, setCurrencyState] = useState(loadCurrency)

  useEffect(() => {
    localStorage.setItem('rh_cart', JSON.stringify(items))
  }, [items])

  function setCurrency(c) {
    setCurrencyState(c)
    localStorage.setItem('rh_currency', c)
  }

  function addToCart(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, { ...product, qty }]
    })
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function updateQty(id, qty) {
    if (qty < 1) return
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    )
  }

  function clearCart() {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, currency, setCurrency, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
