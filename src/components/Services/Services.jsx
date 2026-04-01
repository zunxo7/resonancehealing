import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Services.css'

const services = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" stroke="url(#s1)" strokeWidth="1.5" />
        <path d="M10 20 Q15 12 20 20 Q25 28 30 20" stroke="url(#s1)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <defs>
          <linearGradient id="s1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5BB0BA"/><stop offset="1" stopColor="#7661A4"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Sound Bath',
    desc: 'Tibetan bowls and resonant frequencies used in a calming sound environment to support relaxation.',
    duration: '60 min',
    color: 'teal',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4 L36 30 L4 30 Z" stroke="url(#s2)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <circle cx="20" cy="20" r="4" fill="url(#s2)"/>
        <defs>
          <linearGradient id="s2" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7661A4"/><stop offset="1" stopColor="#5BB0BA"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Energy Alignment',
    desc: 'Personalised sessions focused on identifying and supporting underlying energetic imbalance patterns.',
    duration: '75 min',
    color: 'amethyst',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="10" stroke="url(#s3)" strokeWidth="1.5"/>
        <circle cx="20" cy="20" r="17" stroke="url(#s3)" strokeWidth="0.8" strokeDasharray="3 4"/>
        <circle cx="20" cy="8" r="2.5" fill="url(#s3)"/>
        <defs>
          <linearGradient id="s3" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5BB0BA"/><stop offset="1" stopColor="#7661A4"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Breathwork',
    desc: 'Guided breathing sessions designed to promote relaxation and support natural self-regulation.',
    duration: '90 min',
    color: 'teal',
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6 C26 6 32 11 32 18 C32 26 20 36 20 36 C20 36 8 26 8 18 C8 11 14 6 20 6Z" stroke="url(#s4)" strokeWidth="1.5" fill="none"/>
        <path d="M20 14 C22 14 24 16 24 18 C24 22 20 26 20 26 C20 26 16 22 16 18 C16 16 18 14 20 14Z" fill="url(#s4)"/>
        <defs>
          <linearGradient id="s4" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7661A4"/><stop offset="1" stopColor="#5BB0BA"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Reiki Flow',
    desc: 'Hands-on and distance Reiki sessions intended to support relaxation and energetic balance.',
    duration: '60 min',
    color: 'amethyst',
  },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      className={`service-card service-card--${service.color}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, type: 'spring', stiffness: 120 }}
      whileTap={{
        x: [0, -2, 2, -1, 1, 0],
        transition: { duration: 0.3 },
      }}
    >
      <div className="service-card__icon">{service.icon}</div>
      <div className="service-card__body">
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__desc">{service.desc}</p>
      </div>
      <div className="service-card__footer">
        <span className="service-card__duration">{service.duration}</span>
        <button className="service-card__btn">Book →</button>
      </div>
    </motion.article>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="services" id="services">
      <div className="services__header" ref={ref}>
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          What We Offer
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Healing <em>Modalities</em>
        </motion.h2>
        <motion.p
          className="section-sub"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Each session is individually tailored to your energetic blueprint.
        </motion.p>
      </div>

      <div className="services__grid">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  )
}
