import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Medal } from 'phosphor-react'
import './HealingServicesPage.css'

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

const certs = [
  {
    title: 'Resonance Healing Certification',
    img: '/images/cert-1024x724.jpg',
  },
  {
    title: 'Certificate Of Completion — Anxiety And Stress Disorder',
    img: '/images/cett-2-1024x791.jpg',
  },
  {
    title: 'Holistic Medicine Certification',
    img: '/images/cert3-1024x723.jpg',
  },
]

export default function HealingServicesPage() {
  return (
    <div className="app-page">
      <section className="hs-hero">
        <div className="hs-hero__blob hs-hero__blob--1" />
        <div className="hs-hero__blob hs-hero__blob--2" />
        <div className="hs-hero__inner">
          <FadeUp className="hs-hero__text">
            <Label>Informational Frequencies, Not Chemicals</Label>
            <h1 className="hs-hero__title">
              Imprinting Balance,<br /><em className="hp-grad">Restoring Harmony</em>
            </h1>
            <p className="hs-hero__sub">
              Resonance devices are designed to imprint informational frequency patterns onto organic carriers, intended to support the body's natural balance and self-regulation. These imprints are not chemical or pharmaceutical in nature and do not contain active medicinal ingredients. Resonance focuses on identifying and supporting underlying imbalance patterns that may influence wellbeing.
            </p>
            <Link to="/booking" className="btn btn--pulse hs-hero__cta">
              Book Appointment
            </Link>
          </FadeUp>
          <FadeUp delay={0.15} className="hs-hero__img-wrap">
            <img
              src="/images/4.jpg"
              alt="Resonance Healing"
              className="hs-hero__img"
              loading="eager"
            />
          </FadeUp>
        </div>
      </section>

      <section className="hs-certs">
        <FadeUp className="hs-certs__header">
          <Label>Our Credentials</Label>
          <h2 className="hp-section-title">Certified <em>Expertise</em></h2>
          <p className="hp-section-sub">Our practitioners hold internationally recognised certifications in resonance healing and holistic medicine.</p>
        </FadeUp>
        <div className="hs-certs__grid">
          {certs.map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.1} className="hs-cert-card">
              <div className="hs-cert-card__img-wrap">
                <img src={c.img} alt={c.title} className="hs-cert-card__img" loading="lazy" />
              </div>
              <div className="hs-cert-card__body">
                <Medal size={22} weight="duotone" className="hs-cert-card__icon" />
                <p className="hs-cert-card__title">{c.title}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

    </div>
  )
}
