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

const zones = [
  { label: 'Within Pakistan', time: '2–3 business days' },
  { label: 'International', time: '5–7 business days' },
  { label: 'Order Processing', time: '1–2 business days' },
]

export default function DeliveryPolicyPage() {
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
            <span>Delivery Policy</span>
          </motion.div>
          <motion.h1 className="policy-hero__title"
            initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}>
            Delivery <em className="hp-grad">Policy</em>
          </motion.h1>
          <motion.p className="policy-hero__sub"
            initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}>
            We aim to ensure fast and reliable delivery for all our customers, locally and internationally.
          </motion.p>
        </div>
      </section>

      <div className="policy-body">
        <FadeUp>
          <div className="policy-card policy-card--highlight">
            <h2 className="policy-section__title">Delivery Timeframes</h2>
            <div className="policy-section__text">
              <p>Once your order is confirmed, it will be processed within 1–2 business days (depending on product type).</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 20 }}>
              {zones.map(z => (
                <div key={z.label} style={{
                  background: 'var(--white)', border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', padding: '16px 18px'
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: 6 }}>{z.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--teal)', fontFamily: 'var(--font-serif)' }}>{z.time}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.07}>
          <div className="policy-card">
            <h2 className="policy-section__title">Trusted Courier Services</h2>
            <div className="policy-section__text">
              <p>We work with trusted courier services to make sure your order reaches you safely and on time. Delivery times may vary slightly due to:</p>
              <ul>
                <li>Public holidays or sales periods</li>
                <li>Weather conditions or natural events</li>
                <li>Customs clearance for international shipments</li>
                <li>Unforeseen courier delays</li>
              </ul>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="policy-card">
            <h2 className="policy-section__title">Shipping Charges</h2>
            <div className="policy-section__text">
              <p>Any applicable shipping charges will be clearly shown at checkout before you confirm your order. There are no hidden fees.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="policy-card">
            <h2 className="policy-section__title">Incorrect Shipping Details</h2>
            <div className="policy-section__text">
              <p>Please ensure that your shipping details are correct when placing your order. We are not responsible for delays or non-delivery caused by incorrect or incomplete shipping information provided by the customer.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div className="policy-contact">
            <span className="policy-contact__label">Delivery enquiries</span>
            <a href="mailto:resonanceforall@gmail.com">resonanceforall@gmail.com</a>
            <a href="tel:+923119685122">+92 311 9685122</a>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
