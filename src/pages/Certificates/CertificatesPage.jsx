import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Medal } from 'phosphor-react'
import '../Policy/PolicyPage.css'
import './CertificatesPage.css'

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

const certs = [
  {
    title: 'Resonance Healing Certification',
    img: '/images/cert-1024x724.jpg',
    issuer: 'International Practitioners of Holistic Medicine (IPHM)',
  },
  {
    title: 'Certificate of Completion — Anxiety and Stress Disorder',
    img: '/images/cett-2-1024x791.jpg',
    issuer: 'IPHM Accreditation Board',
  },
  {
    title: 'Holistic Medicine Certification',
    img: '/images/cert3-1024x723.jpg',
    issuer: 'International Practitioners of Holistic Medicine (IPHM)',
  },
]

export default function CertificatesPage() {
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
            <span>Certificates</span>
          </motion.div>
          <motion.h1 className="policy-hero__title"
            initial={{ opacity: 0, y: 24 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}>
            Our <em className="hp-grad">Credentials</em>
          </motion.h1>
          <motion.p className="policy-hero__sub"
            initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}>
            Internationally recognised certifications held by our practitioners in resonance healing and holistic medicine.
          </motion.p>
        </div>
      </section>

      <section className="certs-page__grid-section">
        <div className="certs-page__grid">
          {certs.map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.1} className="certs-page__card">
              <div className="certs-page__img-wrap">
                <img src={c.img} alt={c.title} className="certs-page__img" loading="lazy" />
              </div>
              <div className="certs-page__card-body">
                <Medal size={20} weight="duotone" className="certs-page__medal" />
                <div>
                  <p className="certs-page__title">{c.title}</p>
                  <p className="certs-page__issuer">{c.issuer}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  )
}
