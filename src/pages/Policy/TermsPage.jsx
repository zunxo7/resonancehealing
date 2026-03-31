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

export default function TermsPage() {
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
            <span>Terms &amp; Conditions</span>
          </motion.div>
          <motion.h1 className="policy-hero__title"
            initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}>
            Terms &amp; <em className="hp-grad">Conditions</em>
          </motion.h1>
          <motion.p className="policy-hero__sub"
            initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}>
            Please read these terms carefully before using the Resonance Healing application or services.
          </motion.p>
        </div>
      </section>

      <div className="policy-body">
        <FadeUp>
          <div className="policy-card policy-card--highlight">
            <h2 className="policy-section__title">About This Application</h2>
            <div className="policy-section__text">
              <p>This application is a personal resonance experience tool designed for individual self-reflection and experimental use. It allows users to upload a "witness" in the form of a photograph, which serves as a point of focus within the app.</p>
              <p>The experience is subtle and personal — intended to support mindful awareness, intention setting, or energy exploration, depending on the user's personal belief system.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.07}>
          <div className="policy-card">
            <h2 className="policy-section__title">No Medical Claims</h2>
            <div className="policy-section__text">
              <p>The app does not provide any medical, psychological, or therapeutic functions. It is not designed to diagnose, treat, or alleviate any mental or physical condition.</p>
              <p>No health benefits are claimed, and it should not be interpreted as a substitute for professional healthcare, therapy, or wellness guidance.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="policy-card">
            <h2 className="policy-section__title">User Responsibility</h2>
            <div className="policy-section__text">
              <p>By using this application, you acknowledge and agree that:</p>
              <ul>
                <li>You are using this app purely for personal, experimental, or spiritual exploration.</li>
                <li>You will not rely on this app as a substitute for professional medical or psychological advice.</li>
                <li>You are solely responsible for how you use the app and any decisions made based on your experience with it.</li>
                <li>Any images you upload remain your personal property and responsibility.</li>
              </ul>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="policy-card">
            <h2 className="policy-section__title">Intellectual Property</h2>
            <div className="policy-section__text">
              <p>All content, design, and technology within the Resonance Healing application and website are the intellectual property of Resonance Healing. Unauthorised reproduction, distribution, or commercial use is strictly prohibited.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.14}>
          <div className="policy-card">
            <h2 className="policy-section__title">Changes to Terms</h2>
            <div className="policy-section__text">
              <p>We reserve the right to update these terms at any time. Continued use of the application following any changes constitutes acceptance of the revised terms. We encourage you to review this page periodically.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.16}>
          <div className="policy-contact">
            <span className="policy-contact__label">Questions?</span>
            <a href="mailto:resonanceforall@gmail.com">resonanceforall@gmail.com</a>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
