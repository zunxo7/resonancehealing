import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Drop, User, Leaf, CheckCircle, Medal } from 'phosphor-react'
import './AboutPage.css'

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

const pillars = [
  { icon: Drop,         title: 'Spring Water Remedies',   desc: 'Harnessing the pristine energetic qualities of natural spring water for holistic healing.' },
  { icon: User,         title: 'Personalized Treatment',  desc: 'Each remedy is tailored to your unique biofield and energetic profile for optimal results.' },
  { icon: Leaf,         title: 'Natural Approach',        desc: 'No pills, injections, or invasive procedures. Pure resonance healing from nature.' },
  { icon: CheckCircle,  title: 'Safe & Effective',        desc: 'Thousands of satisfied patients worldwide with no side effects.' },
]

const certs = [
  { title: 'Resonance Healing Certification',                     img: '/images/cert-1024x724.jpg' },
  { title: 'Certificate Of Completion — Anxiety And Stress Disorder', img: '/images/cett-2-1024x791.jpg' },
  { title: 'Holistic Medicine Certification',                     img: '/images/cert3-1024x723.jpg' },
]

export default function AboutPage() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <div className="app-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero__blob about-hero__blob--1" />
        <div className="about-hero__blob about-hero__blob--2" />
        <div ref={headerRef} className="about-hero__inner">
          <motion.div initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}}>
            <Label>About Resonance Healing</Label>
          </motion.div>
          <motion.h1 className="about-hero__title"
            initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}>
            Balance the Unbalances,<br /><em className="hp-grad">Leading to a Cure</em>
          </motion.h1>
          <motion.p className="about-hero__sub"
            initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}>
            Resonance healing with spring water remedies — combining ancient wisdom with modern understanding of biofield science to support your body's natural self-regulation.
          </motion.p>
        </div>
      </section>

      {/* ABOUT BODY */}
      <section className="about-body">
        <FadeUp className="about-body__text">
          <Label>Our Story</Label>
          <h2 className="about-body__heading">Who We <em className="hp-grad">Are</em></h2>
          <p>Resonance Healing is rooted in the understanding that water possesses an innate ability to retain and transmit energetic information. Our approach combines ancient wisdom with modern understanding of biofield science to provide non-invasive, natural healing solutions.</p>
          <p>We offer personal visits at our clinic in Bahria Town, Rawalpindi, as well as virtual consultations — so no matter where you are in the world, our healing services are within reach.</p>
          <blockquote className="about-body__quote">
            "Whenever the vibration within your body becomes weak, there will be an equivalent weakening of your health and your energy."
            <cite>— Masaru Emoto, The Miracle of Water</cite>
          </blockquote>
          <div className="about-body__actions">
            <Link to="/booking" className="btn btn--pulse">Book a Consultation</Link>
            <Link to="/healing-services" className="btn btn--ghost">Our Services</Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.1} className="about-body__pillars">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <FadeUp key={p.title} delay={i * 0.07} className="about-pillar">
                <Icon size={30} weight="duotone" className="about-pillar__icon" />
                <h3 className="about-pillar__title">{p.title}</h3>
                <p className="about-pillar__desc">{p.desc}</p>
              </FadeUp>
            )
          })}
        </FadeUp>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <FadeUp className="about-mission__inner">
          <Label>Our Mission</Label>
          <h2 className="about-mission__heading">Healing Without <em className="hp-grad">Chemicals</em></h2>
          <p className="about-mission__text">
            At Resonance, we believe true wellness comes from working with the body's natural energy systems, not against them. Our mission is to make resonance healing accessible to everyone — locally and globally — through our devices, apps, and in-person consultations.
          </p>
          <div className="about-mission__stats">
            {[
              { val: '10+', label: 'Years Experience' },
              { val: '5,000+', label: 'Happy Patients' },
              { val: '50+', label: 'Countries Reached' },
              { val: '3', label: 'IPHM Certifications' },
            ].map((s) => (
              <div key={s.label} className="about-stat">
                <span className="about-stat__val">{s.val}</span>
                <span className="about-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* CERTIFICATIONS */}
      <section className="about-certs">
        <FadeUp className="about-certs__header">
          <Label>Our Credentials</Label>
          <h2 className="hp-section-title">Certified <em>Expertise</em></h2>
          <p className="hp-section-sub">Our practitioners hold internationally recognised certifications in resonance healing and holistic medicine.</p>
        </FadeUp>
        <div className="about-certs__grid">
          {certs.map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.1} className="about-cert-card">
              <div className="about-cert-card__img-wrap">
                <img src={c.img} alt={c.title} className="about-cert-card__img" loading="lazy" />
              </div>
              <div className="about-cert-card__body">
                <Medal size={20} weight="duotone" className="about-cert-card__icon" />
                <p className="about-cert-card__title">{c.title}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section className="about-location">
        <FadeUp className="about-location__inner">
          <Label>Find Us</Label>
          <h2 className="about-location__heading">Visit Our <em className="hp-grad">Clinic</em></h2>
          <p className="about-location__addr">
            Fatima Arcade, First Floor (Above MCB Bank),<br />Business Bay Phase 7, Bahria Town, Rawalpindi
          </p>
          <div className="about-location__contacts">
            <a href="tel:+923119685122" className="about-location__link">📞 +92 311 9685122</a>
            <a href="tel:+923448885628" className="about-location__link">📞 +92 344 8885628</a>
            <a href="mailto:resonanceforall@gmail.com" className="about-location__link">✉️ resonanceforall@gmail.com</a>
          </div>
          <Link to="/booking" className="btn btn--pulse" style={{ marginTop: 28, display: 'inline-flex' }}>
            Book an Appointment
          </Link>
        </FadeUp>
      </section>
    </div>
  )
}
