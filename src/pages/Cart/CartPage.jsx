import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import './CartPage.css'

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 110 }}>
      {children}
    </motion.div>
  )
}

function Label({ children }) {
  return <span className="hp-label">{children}</span>
}

function formatPrice(amount, currency) {
  if (currency === 'USD') return `$${amount.toFixed(2)}`
  return `Rs. ${amount.toLocaleString('en-IN')}`
}

export default function CartPage() {
  const { items, currency, setCurrency, removeFromCart, updateQty } = useCart()

  const subtotal = items.reduce((sum, item) => {
    const price = currency === 'USD' ? item.price_usd : item.price_pkr
    return sum + price * item.qty
  }, 0)

  return (
    <div className="app-page">
      <section className="cart-hero">
        <div className="cart-hero__blob cart-hero__blob--1" />
        <div className="cart-hero__blob cart-hero__blob--2" />
        <div className="cart-hero__inner">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Label>Your Cart</Label>
          </motion.div>
          <motion.h1
            className="cart-hero__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}>
            Shopping Cart
          </motion.h1>
        </div>
      </section>

      <FadeUp className="cart-layout-wrap">
        <div className="cart-layout">
          <div className="cart-table-col">
            <div className="cart-currency-toggle">
              <button
                className={`cart-currency-btn${currency === 'USD' ? ' cart-currency-btn--active' : ''}`}
                onClick={() => setCurrency('USD')}>
                USD $
              </button>
              <button
                className={`cart-currency-btn${currency === 'PKR' ? ' cart-currency-btn--active' : ''}`}
                onClick={() => setCurrency('PKR')}>
                PKR Rs
              </button>
            </div>

            {items.length === 0 ? (
              <div className="cart-empty">
                <p>Your cart is empty.</p>
                <Link to="/healing-products" className="btn btn--pulse" style={{ marginTop: 20 }}>
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="cart-table-wrap cart-table-wrap--desktop">
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th className="cart-th cart-th--remove" />
                        <th className="cart-th">Product</th>
                        <th className="cart-th">Price</th>
                        <th className="cart-th">Quantity</th>
                        <th className="cart-th">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => {
                        const price = currency === 'USD' ? item.price_usd : item.price_pkr
                        return (
                          <tr key={item.id} className="cart-row">
                            <td className="cart-td cart-td--remove">
                              <button
                                className="cart-remove-btn"
                                onClick={() => removeFromCart(item.id)}
                                aria-label="Remove item">
                                ✕
                              </button>
                            </td>
                            <td className="cart-td">
                              <div className="cart-product-cell">
                                <img src={item.img} alt={item.name} className="cart-product-img" />
                                <div className="cart-product-info">
                                  <span className="cart-product-name">{item.name}</span>
                                  <span className="cart-product-abbr">{item.abbr}</span>
                                </div>
                              </div>
                            </td>
                            <td className="cart-td">{formatPrice(price, currency)}</td>
                            <td className="cart-td">
                              <input
                                type="number"
                                min={1}
                                value={item.qty}
                                onChange={(e) => updateQty(item.id, parseInt(e.target.value, 10))}
                                className="cart-qty-input"
                              />
                            </td>
                            <td className="cart-td cart-td--subtotal">
                              {formatPrice(price * item.qty, currency)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="cart-cards">
                  {items.map((item) => {
                    const price = currency === 'USD' ? item.price_usd : item.price_pkr
                    return (
                      <div key={item.id} className="cart-card">
                        <div className="cart-card__top">
                          <img src={item.img} alt={item.name} className="cart-product-img" />
                          <div className="cart-card__info">
                            <span className="cart-product-name">{item.name}</span>
                            <span className="cart-product-abbr">{item.abbr}</span>
                            <span className="cart-card__price">{formatPrice(price, currency)}</span>
                          </div>
                          <button
                            className="cart-remove-btn"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item">
                            ✕
                          </button>
                        </div>
                        <div className="cart-card__bottom">
                          <div className="cart-card__qty-wrap">
                            <span className="cart-card__label">Qty</span>
                            <input
                              type="number"
                              min={1}
                              value={item.qty}
                              onChange={(e) => updateQty(item.id, parseInt(e.target.value, 10))}
                              className="cart-qty-input"
                            />
                          </div>
                          <div className="cart-card__subtotal">
                            <span className="cart-card__label">Subtotal</span>
                            <span className="cart-td--subtotal">{formatPrice(price * item.qty, currency)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          <div className="cart-totals-col">
            <div className="cart-totals-card">
              <h2 className="cart-totals-title">Cart Totals</h2>
              <div className="cart-totals-row">
                <span className="cart-totals-label">Subtotal</span>
                <span className="cart-totals-value">{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="cart-totals-row cart-totals-row--shipping">
                <span className="cart-totals-label">Shipping</span>
                <div className="cart-totals-shipping">
                  <span className="cart-totals-free">Arranged on order</span>
                  <span className="cart-totals-shipping-note">Confirmed after checkout.</span>
                </div>
              </div>
              <div className="cart-totals-divider" />
              <div className="cart-totals-row cart-totals-row--total">
                <span className="cart-totals-label cart-totals-label--total">Total</span>
                <span className="cart-totals-value cart-totals-value--total">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>
              <Link to="/checkout" className="btn btn--pulse cart-checkout-btn">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  )
}
