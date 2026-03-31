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

export default function PrivacyPolicyPage() {
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
            <span>Privacy Policy</span>
          </motion.div>
          <motion.h1 className="policy-hero__title"
            initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}>
            Privacy <em className="hp-grad">Policy</em>
          </motion.h1>
          <motion.p className="policy-hero__sub"
            initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}>
            We respect your privacy fully. Here's how we handle your data.
          </motion.p>
        </div>
      </section>

      <div className="policy-body">
        <FadeUp>
          <div className="policy-card policy-card--highlight">
            <h2 className="policy-section__title">Data Collection</h2>
            <div className="policy-section__text">
              <p>The app does not collect or share any personal, medical, or sensitive data. We believe in full user privacy and control over your own information.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.07}>
          <div className="policy-card">
            <h2 className="policy-section__title">Image Storage</h2>
            <div className="policy-section__text">
              <p>Images you upload (such as witness photographs) are either:</p>
              <ul>
                <li>Stored locally on your device only, or</li>
                <li>Stored securely in the cloud if that feature is enabled by you</li>
              </ul>
              <p>No uploaded data is analysed, tracked, or monetised in any way. You are always in full control of your data.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="policy-card">
            <h2 className="policy-section__title">No Third-Party Sharing</h2>
            <div className="policy-section__text">
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties. Your data is yours alone.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="policy-card">
            <h2 className="policy-section__title">Disclaimer</h2>
            <div className="policy-section__text">
              <p>This app does not offer any healing, stress relief, mental health support, or physical wellness services. It is not intended for diagnostic or clinical use and is purely experimental and spiritual in nature.</p>
              <p>Users should not rely on it as a substitute for medical or psychological advice.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div className="policy-contact">
            <span className="policy-contact__label">For privacy questions or feedback</span>
            <a href="mailto:resonanceforall@gmail.com">resonanceforall@gmail.com</a>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
