import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ShoppingCart } from 'phosphor-react'
import { useCart } from '../../context/CartContext'
import './HealingProductsPage.css'

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

const products = [
  {
    id: 'VPP',
    abbr: 'VPP',
    name: 'Voice Programmed Potentiser',
    tagline: 'Voice-Programmed Resonance Remedies',
    price: 'Rs. 97,000',
    price_pkr: 97000,
    price_usd: 348.90,
    img: '/images/VPP-6.png',
    link: '/product/voice-programmed-potentiser-vpp',
  },
  {
    id: 'RRM',
    abbr: 'RRM',
    name: 'Radionics Remedy Maker',
    tagline: 'Advanced Practitioner Device',
    price: 'Rs. 37,500 – Rs. 2,23,000',
    price_pkr: 37500,
    price_usd: 134.63,
    img: '/images/RRM-1.png',
    link: '/product/radionics-remedy-maker-rrm',
  },
  {
    id: 'AiOU',
    abbr: 'AiOU',
    name: 'All in One Unit',
    tagline: 'All-in-One Resonance Remedy Device',
    price: 'Rs. 2,23,000',
    price_pkr: 223000,
    price_usd: 803.51,
    img: '/images/r3.jpg',
    link: '/product/all-in-one-unit-aiou',
  },
  {
    id: 'WHD',
    abbr: 'WHD',
    name: 'Water Healing Device',
    tagline: 'Frequency-Imprinted Water Device',
    price: 'Rs. 1,14,000 – Rs. 2,33,000',
    price_pkr: 114000,
    price_usd: 410.68,
    img: '/images/WhatsApp-Image-2026-02-19-at-11.40.16-AM-1.jpeg',
    link: '/product/water-healing-device',
  },
]

const features = [
  {
    title: 'Copy Command',
    desc: 'Copy command enables copying remedies, from input or as picked up by the pick-up sensor and energize the substance such as tablets and liquids on output.',
    img: '/images/1.png',
  },
  {
    title: 'Remedies Selection',
    desc: 'Hardware unit is shown in a few variants. The Application files (Software) are separately provided.',
    img: '/images/2.png',
  },
  {
    title: 'Remedies in Different Potencies',
    desc: 'Remedies of Homeopathy, Bach, Flower Essences, Gems, Minerals etc could be made in the same Potencies.',
    img: '/images/3.png',
  },
  {
    title: 'Color Remedy',
    desc: 'RRM also has a Color Remedy Generator.',
    img: '/images/4.png',
  },
]

export default function HealingProductsPage() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const { addToCart } = useCart()
  const navigate = useNavigate()

  return (
    <div className="app-page">
      <section className="hprod-hero">
        <div className="hprod-hero__blob hprod-hero__blob--1" />
        <div className="hprod-hero__blob hprod-hero__blob--2" />
        <div ref={headerRef} className="hprod-hero__inner">
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}>
            <Label>Our Devices</Label>
          </motion.div>
          <motion.h1
            className="hprod-hero__title"
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}>
            Professional <em className="hp-grad">Healing Instruments</em>
          </motion.h1>
          <motion.p
            className="hprod-hero__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}>
            Advanced radionics devices for practitioners and individuals seeking to harness the power of resonance healing.
          </motion.p>
        </div>
      </section>

      <section className="hprod-grid-section">
        <div className="hprod-grid">
          {products.map((p, i) => (
            <FadeUp key={p.abbr} delay={i * 0.08} className="hprod-card">
              <Link to={p.link} className="hprod-card__link">
                <div className="hprod-card__img-wrap">
                  <img src={p.img} alt={p.name} className="hprod-card__img" loading="lazy" />
                  <span className="hprod-card__abbr">{p.abbr}</span>
                </div>
                <div className="hprod-card__body">
                  <p className="hprod-card__tagline">{p.tagline}</p>
                  <h3 className="hprod-card__title">{p.name}</h3>
                  <span className="hprod-card__price">{p.price}</span>
                </div>
              </Link>
              <div className="hprod-card__actions">
                <Link to={p.link} className="hprod-card__view-btn">
                  <ArrowRight size={14} weight="bold" />
                  View
                </Link>
                <button
                  className="hprod-card__add-btn"
                  onClick={(e) => {
                    e.preventDefault()
                    addToCart({ id: p.id, name: p.name, abbr: p.abbr, img: p.img, price_pkr: p.price_pkr, price_usd: p.price_usd })
                    navigate('/cart')
                  }}>
                  <ShoppingCart size={14} weight="bold" />
                  Add to Cart
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="hprod-features">
        <FadeUp className="hprod-features__header">
          <Label>Device Capabilities</Label>
          <h2 className="hp-section-title">What Our <em>Devices Can Do</em></h2>
          <p className="hp-section-sub">Each device is engineered with precision to provide a comprehensive range of resonance healing capabilities.</p>
        </FadeUp>
        <div className="hprod-features__grid">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.09} className="hprod-feature-card">
              <div className="hprod-feature-card__img-wrap">
                <img src={f.img} alt={f.title} className="hprod-feature-card__img" loading="lazy" />
              </div>
              <div className="hprod-feature-card__body">
                <h3 className="hprod-feature-card__title">{f.title}</h3>
                <p className="hprod-feature-card__desc">{f.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  )
}
