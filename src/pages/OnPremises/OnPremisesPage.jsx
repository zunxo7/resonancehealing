import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import './OnPremisesPage.css'

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

export default function OnPremisesPage() {
  return (
    <div className="app-page">
      <section className="op-hero">
        <div className="op-hero__blob op-hero__blob--1" />
        <div className="op-hero__blob op-hero__blob--2" />
        <div className="op-hero__inner">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Label>Resonance Healing</Label>
          </motion.div>
          <motion.h1 className="op-hero__title"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}>
            On Premises &amp; <em className="hp-grad">Follow Ups</em>
          </motion.h1>
          <motion.nav className="op-breadcrumb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>On Premises &amp; Follow Ups</span>
          </motion.nav>
        </div>
      </section>

      <section className="op-content">
        <FadeUp className="op-section">
          <Label>Resonance Healing</Label>
          <h2 className="op-section__title">On <em className="hp-grad">Premises</em></h2>
          <p className="op-section__body">
            Our on-premises services provide a calm, professional, and supportive environment where clients can receive focused, personalized attention. Sessions are conducted with care and discretion, allowing for meaningful interaction and a comfortable experience tailored to individual needs. You are welcome to visit <strong>our location at Fatima Arcade, First Floor (Above MCB Bank), Business Bay Phase 7, Bahria Town, Rawalpindi</strong>, where our team is dedicated to delivering quality service in a welcoming setting.
          </p>
          <Link to="/booking" className="btn btn--pulse op-cta">Book a Visit</Link>
        </FadeUp>

        <div className="op-divider" />

        <FadeUp delay={0.1} className="op-section">
          <Label>Resonance Healing</Label>
          <h2 className="op-section__title">Follow <em className="hp-grad">Ups</em></h2>
          <p className="op-section__body">
            Our follow-up services are designed to ensure continuity, progress, and long-term support after your initial visit. We stay connected to review outcomes, address ongoing concerns, and make thoughtful adjustments to help you move forward confidently. For appointments or inquiries, please contact our reception at <strong>+92 311 9685122</strong> or email us at <strong>resonanceforall@gmail.com</strong>. For more information about our services, visit our website and explore how we continue to support you at every step.
          </p>
          <div className="op-contact-list">
            <a href="tel:+923119685122" className="op-contact-item">
              <span className="op-contact-item__icon">📞</span>
              +92 311 9685122
            </a>
            <a href="mailto:resonanceforall@gmail.com" className="op-contact-item">
              <span className="op-contact-item__icon">✉️</span>
              resonanceforall@gmail.com
            </a>
            <div className="op-contact-item">
              <span className="op-contact-item__icon">📍</span>
              Fatima Arcade First Floor (Above MCB Bank), Business Bay Phase 7, Bahria Town, Rawalpindi
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  )
}
