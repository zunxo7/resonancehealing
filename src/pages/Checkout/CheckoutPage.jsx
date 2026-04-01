import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import './CheckoutPage.css'

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

export default function CheckoutPage() {
  const { items, currency, clearCart } = useCart()

  const [form, setForm] = useState({
    firstName: '', lastName: '', country: 'Pakistan',
    street1: '', street2: '', city: '', state: 'Punjab',
    postcode: '', phone: '', email: '', notes: '',
    shipDifferent: false,
  })

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const subtotal = items.reduce((sum, item) => {
    const price = currency === 'USD' ? item.price_usd : item.price_pkr
    return sum + price * item.qty
  }, 0)

  function handlePlaceOrder() {
    const summary = items.length === 0
      ? 'No items in cart.'
      : items.map((i) => `${i.name} × ${i.qty} (${formatPrice(
          (currency === 'USD' ? i.price_usd : i.price_pkr) * i.qty, currency
        )})`).join(', ')
    const text = encodeURIComponent(`New Order: ${summary}`)
    window.open(`https://wa.me/923119685122?text=${text}`, '_blank', 'noreferrer')
    clearCart()
  }

  return (
    <div className="app-page">
      <section className="co-hero">
        <div className="co-hero__blob co-hero__blob--1" />
        <div className="co-hero__blob co-hero__blob--2" />
        <div className="co-hero__inner">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Label>Checkout</Label>
          </motion.div>
          <motion.h1
            className="co-hero__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}>
            Complete Your <em>Order</em>
          </motion.h1>
        </div>
      </section>

      <FadeUp className="co-layout-wrap">
        <div className="co-layout">
          <div className="co-billing-col">
            <div className="co-card">
              <h2 className="co-card-title">Billing Details</h2>

              <div className="co-field-row">
                <div className="co-field">
                  <label className="co-label">First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange}
                    className="co-input" placeholder="First name" />
                </div>
                <div className="co-field">
                  <label className="co-label">Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange}
                    className="co-input" placeholder="Last name" />
                </div>
              </div>

              <div className="co-field">
                <label className="co-label">Country / Region</label>
                <select name="country" value={form.country} onChange={handleChange} className="co-input co-select">
                  <option>Pakistan</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>United Arab Emirates</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>

              <div className="co-field">
                <label className="co-label">Street Address</label>
                <input name="street1" value={form.street1} onChange={handleChange}
                  className="co-input" placeholder="House number and street name" />
                <input name="street2" value={form.street2} onChange={handleChange}
                  className="co-input co-input--mt" placeholder="Apartment, suite, unit (optional)" />
              </div>

              <div className="co-field">
                <label className="co-label">Town / City</label>
                <input name="city" value={form.city} onChange={handleChange}
                  className="co-input" placeholder="City" />
              </div>

              <div className="co-field">
                <label className="co-label">State / County</label>
                <select name="state" value={form.state} onChange={handleChange} className="co-input co-select">
                  <option>Punjab</option>
                  <option>Sindh</option>
                  <option>KPK</option>
                  <option>Balochistan</option>
                  <option>Gilgit-Baltistan</option>
                  <option>AJK</option>
                  <option>Islamabad Capital Territory</option>
                </select>
              </div>

              <div className="co-field">
                <label className="co-label">Postcode / ZIP</label>
                <input name="postcode" value={form.postcode} onChange={handleChange}
                  className="co-input" placeholder="Postcode" />
              </div>

              <div className="co-field">
                <label className="co-label">Phone <span className="co-optional">(optional)</span></label>
                <input name="phone" value={form.phone} onChange={handleChange}
                  className="co-input" placeholder="+92 ..." type="tel" />
              </div>

              <div className="co-field">
                <label className="co-label">Email Address</label>
                <input name="email" value={form.email} onChange={handleChange}
                  className="co-input" placeholder="you@example.com" type="email" />
              </div>
            </div>

            <label className="co-checkbox-row">
              <input type="checkbox" name="shipDifferent" checked={form.shipDifferent}
                onChange={handleChange} className="co-checkbox" />
              <span>Ship to a different address?</span>
            </label>

            <div className="co-field" style={{ marginTop: 16 }}>
              <label className="co-label">Order notes <span className="co-optional">(optional)</span></label>
              <textarea name="notes" value={form.notes} onChange={handleChange}
                className="co-input co-textarea"
                placeholder="Notes about your order, e.g. special delivery instructions." />
            </div>
          </div>

          <div className="co-order-col">
            <div className="co-card">
              <h2 className="co-card-title">Your Order</h2>

              <div className="co-order-header">
                <span className="co-order-col-label">Product</span>
                <span className="co-order-col-label">Subtotal</span>
              </div>

              <div className="co-order-divider" />

              {items.length === 0 ? (
                <p className="co-order-empty">No items in cart.</p>
              ) : (
                items.map((item) => {
                  const price = currency === 'USD' ? item.price_usd : item.price_pkr
                  return (
                    <div key={item.id} className="co-order-row">
                      <span className="co-order-item-name">
                        {item.name} <span className="co-order-qty">× {item.qty}</span>
                      </span>
                      <span className="co-order-item-price">
                        {formatPrice(price * item.qty, currency)}
                      </span>
                    </div>
                  )
                })
              )}

              <div className="co-order-divider" />

              <div className="co-order-row">
                <span className="co-order-meta-label">Subtotal</span>
                <span className="co-order-meta-value">{formatPrice(subtotal, currency)}</span>
              </div>

              <div className="co-order-row">
                <span className="co-order-meta-label">Shipping</span>
                <span className="co-order-meta-value co-order-free">Arranged on order</span>
              </div>

              <div className="co-order-divider" />

              <div className="co-order-row co-order-row--total">
                <span className="co-order-meta-label co-order-total-label">Total</span>
                <span className="co-order-meta-value co-order-total-value">
                  {formatPrice(subtotal, currency)}
                </span>
              </div>

              <div className="co-payment-box">
                <p className="co-payment-title">HBL Pay</p>
                <p className="co-payment-desc">Pay through HBL payment gateway</p>
              </div>

              <button className="btn btn--pulse co-place-order-btn" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  )
}
