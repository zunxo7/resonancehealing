import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import './PolicyPage.css'

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, type: 'spring', stiffness: 110 }}>
      {children}
    </motion.div>
  )
}

export default function RefundPolicyPage() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <div className="app-page">
      <section className="policy-hero">
        <div className="policy-hero__blob policy-hero__blob--1" />
        <div className="policy-hero__blob policy-hero__blob--2" />
        <div ref={headerRef} className="policy-hero__inner">
          <motion.div className="policy-hero__breadcrumb"
            initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Refund &amp; Exchange Policy</span>
          </motion.div>
          <motion.h1 className="policy-hero__title"
            initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}>
            Refund &amp; <em className="hp-grad">Exchange Policy</em>
          </motion.h1>
          <motion.p className="policy-hero__sub"
            initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}>
            Customer satisfaction is important to us. Here's everything you need to know about our refund and exchange process.
          </motion.p>
        </div>
      </section>

      <div className="policy-body">
        <FadeUp>
          <div className="policy-card policy-card--highlight">
            <h2 className="policy-section__title">Eligibility for Refund or Exchange</h2>
            <div className="policy-section__text">
              <p>If you receive a damaged, defective, or incorrect product, you may request a refund or exchange within <strong>7 days</strong> of receiving your order.</p>
              <p>To be eligible, the item must be:</p>
              <ul>
                <li>Unused and unopened</li>
                <li>In its original packaging</li>
                <li>Accompanied by proof of purchase</li>
              </ul>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.07}>
          <div className="policy-card">
            <h2 className="policy-section__title">Non-Eligible Items</h2>
            <div className="policy-section__text">
              <p>Products are <strong>not eligible</strong> for refund or exchange if they have been:</p>
              <ul>
                <li>Damaged due to misuse or negligence</li>
                <li>Subject to normal wear and tear</li>
                <li>Opened or used after delivery</li>
                <li>Returned outside the 7-day window</li>
              </ul>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="policy-card">
            <h2 className="policy-section__title">Shipping Charges</h2>
            <div className="policy-section__text">
              <p>All courier and shipping charges for returns or exchanges will be borne by the customer, unless the issue occurred due to an error on our part (such as sending the wrong or defective item).</p>
              <p>Original shipping charges are <strong>non-refundable</strong>.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="policy-card">
            <h2 className="policy-section__title">Refund Processing</h2>
            <div className="policy-section__text">
              <p>Once your return is approved and the item is received, refunds will be processed to the original payment method within <strong>7–10 business days</strong>.</p>
              <p>Exchange requests are subject to product availability at the time of the request.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div className="policy-contact">
            <span className="policy-contact__label">To initiate a return, contact us at</span>
            <a href="mailto:resonanceforall@gmail.com">resonanceforall@gmail.com</a>
            <a href="tel:+923119685122">+92 311 9685122</a>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
