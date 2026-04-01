import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Drop, User, Leaf, CheckCircle } from 'phosphor-react'
import { useServicesModal } from '../../context/ServicesModalContext'
import ResonanceCore from '../../components/ResonanceCore/ResonanceCore'
import HeroWave from '../../components/HeroWave/HeroWave'
import './HomePage.css'

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

const heroWords = ['Vibrant Life', 'Healthier Life']

function CyclingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % heroWords.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="hp-hero__cycling-wrap">
      <motion.span
        className="hp-hero__cycling-inner"
        animate={{ y: `-${index * 1.08}em` }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {heroWords.map(word => (
          <span key={word} className="hp-grad hp-hero__cycling-word">{word}</span>
        ))}
      </motion.span>
    </span>
  )
}

/* ── HERO ── */
function Hero() {
  const { open: openServices } = useServicesModal()
  return (
    <section className="hp-hero">
      <HeroWave />
      <div className="hp-hero__inner">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, type: 'spring', stiffness: 110 }}>
          <ResonanceCore />
        </motion.div>
        <motion.h1 className="hp-hero__title"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}>
          Precision Healing<br />for a <CyclingWord />
        </motion.h1>
        <motion.p className="hp-hero__sub"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}>
          Natural resonance healing that works with your body's own energy. No pills, injections, or invasive procedures — just a gentle, holistic approach to balance.
        </motion.p>
        <motion.div className="hp-hero__actions"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}>
          <Link to="/booking" className="btn btn--pulse">
            Book Appointment
          </Link>
          <button className="btn btn--ghost" onClick={openServices}>Explore Services</button>
        </motion.div>
      </div>
    </section>
  )
}

/* ── ABOUT ── */
function About() {
  return (
    <section className="hp-about">
      <FadeUp className="hp-about__text">
        <Label>About Resonance Healing</Label>
        <h2 className="hp-section-title">Balance the Unbalances,<br /><em>Leading to a Cure</em></h2>
        <p>Resonance healing with spring water remedies is rooted in the understanding that water possesses an innate ability to retain and transmit energetic information. Our approach combines ancient wisdom with modern understanding of biofield science.</p>
        <p style={{ marginTop: 12 }}>Book an appointment for a personal visit or consult virtually — no need to physically visit us. Our consultation services are tailored to individuals in Pakistan and those across borders.</p>
        <blockquote className="hp-about__quote">
          "Whenever the vibration within your body becomes weak, there will be an equivalent weakening of your health and your energy."
          <cite>— Masaru Emoto, The Miracle of Water</cite>
        </blockquote>
        <Link to="/booking"
          className="btn btn--pulse" style={{ display: 'inline-flex', marginTop: 24 }}>
          Book a Consultation
        </Link>
      </FadeUp>
      <div className="hp-about__pillars">
        {[
          { icon: Drop, title: 'Spring Water Remedies', desc: 'Harnessing the pristine energetic qualities of natural spring water for holistic healing.' },
          { icon: User, title: 'Personalized Treatment', desc: "Each remedy is tailored to your unique biofield and energetic profile for optimal results." },
          { icon: Leaf, title: 'Natural Approach', desc: 'No pills, injections, or invasive procedures. Pure resonance healing from nature.' },
          { icon: CheckCircle, title: 'Safe & Effective', desc: 'Many satisfied clients with no reported adverse effects from our natural approach.' },
        ].map((p, i) => {
          const IconComponent = p.icon
          return (
            <FadeUp key={p.title} delay={i * 0.08} className="hp-pillar">
              <IconComponent className="hp-pillar__icon" weight="duotone" size={32} />
              <h3 className="hp-pillar__title">{p.title}</h3>
              <p className="hp-pillar__desc">{p.desc}</p>
            </FadeUp>
          )
        })}
      </div>
    </section>
  )
}

/* ── PROCESS ── */
const processSteps = [
  { num: '01', title: 'Water Remedies via Resonance Healing', desc: 'Resonance healing with spring water remedies is rooted in how water possesses an innate ability to retain and transmit energetic information.' },
  { num: '02', title: 'Foundation of Resonance Remedies', desc: 'The process begins by collecting spring water known for its pristine energetic qualities — the energetic foundation of every remedy.' },
  { num: '03', title: 'Personalized Resonance Remedies', desc: "The remedy analyzing phase where your unique biofield is assessed through various methods to build your energetic profile." },
  { num: '04', title: 'Imprinting Personalized Frequencies', desc: 'Once the energetic profile is determined, specific frequencies or information patterns are imprinted onto the carrier medium.' },
  { num: '05', title: 'Potentizing Through Dilution', desc: 'The resonance remedy is prepared by diluting the imprinted spring water to create a potentized solution, amplifying its informational signature.' },
  { num: '06', title: 'Facilitating Healing Through Usage', desc: "The individual takes or applies the resonance remedy as instructed by a qualified practitioner to facilitate the body's natural self-regulation." },
]

function Process() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })
  return (
    <section className="hp-process">
      <div ref={headerRef} className="hp-process__header">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          <Label>Our Services</Label>
        </motion.div>
        <motion.h2 className="hp-section-title"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}>
          Personalized <em>Resonance Remedies</em>
        </motion.h2>
        <motion.p className="hp-section-sub"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}>
          A revolutionary approach to healing that works with your body's natural energy systems, not against them.
        </motion.p>
      </div>
      <div className="hp-process__steps">
        <div className="hp-process__line" />
        {processSteps.map((s, i) => (
          <FadeUp key={s.num} delay={i * 0.07} className="hp-step">
            <div className="hp-step__num">{s.num}</div>
            <div className="hp-step__body">
              <h3 className="hp-step__title">{s.title}</h3>
              <p className="hp-step__desc">{s.desc}</p>
              <Link to="/healing-services" className="hp-step__link">Learn More →</Link>
            </div>
          </FadeUp>
        ))}
      </div>
      <FadeUp className="hp-process__cta">
        <Link to="/booking" className="btn btn--pulse">
          Book a Consultation
        </Link>
      </FadeUp>
    </section>
  )
}

/* ── DEVICES ── */
const devices = [
  { abbr: 'VPP', name: 'Voice Programmed Potentiser', tagline: 'Revitalize with Voice-Infused Remedies', desc: 'A pocket-sized device ideal for professionals and healers. Combines multiple remedies into the same tablets or liquid.', price: 'Rs. 97,000', features: ['Easy to use', 'Portable design', 'Professional grade'], to: '/product/voice-programmed-potentiser-vpp', img: '/images/VPP-6.png', color: 'teal' },
  { abbr: 'RRM', name: 'Radionics Remedy Maker', tagline: 'Advanced Practitioner Device', desc: 'Makes remedies in potencies from X, C, D, M, CM, MM, and LM. Includes Energy Memory function for broadcasting after computer is off.', price: 'Rs. 37,500 – Rs. 2,23,000', features: ['High precision', 'Multiple potencies', 'Energy Memory'], to: '/product/radionics-remedy-maker-rrm', img: '/images/RRM-1.png', color: 'amethyst' },
]

function Devices() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })
  return (
    <section className="hp-devices">
      <div ref={headerRef} className="hp-devices__header">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          <Label>Our Devices</Label>
        </motion.div>
        <motion.h2 className="hp-section-title"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
          Professional <em>Healing Instruments</em>
        </motion.h2>
        <motion.p className="hp-section-sub"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          Advanced radionics devices for practitioners and individuals seeking to harness the power of resonance healing.
        </motion.p>
      </div>
      <div className="hp-devices__grid">
        {devices.map((d, i) => (
          <FadeUp key={d.abbr} delay={i * 0.08}>
            <Link to={d.to} className={`hp-device-card hp-device-card--${d.color}`}>
              <div className="hp-device-card__img-wrap">
                <img src={d.img} alt={d.name} className="hp-device-card__img" loading="lazy" />
                <span className="hp-device-card__abbr">{d.abbr}</span>
              </div>
              <div className="hp-device-card__body">
                <p className="hp-device-card__tagline">{d.tagline}</p>
                <h3 className="hp-device-card__title">{d.name}</h3>
                <p className="hp-device-card__desc">{d.desc}</p>
                <ul className="hp-device-card__features">
                  {d.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <p className="hp-device-card__hint">Tap to view details →</p>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
      <FadeUp className="hp-devices__all">
        <Link to="/healing-products" className="btn btn--ghost">View All Products</Link>
      </FadeUp>
    </section>
  )
}

/* ── WHAT WE AVOID ── */
const avoided = ['Injections', 'Pills / Tablets', 'Capsules', 'Syrups', 'Therapies', 'Lab Tests', 'MRIs', 'Ultrasound']

function WhatWeAvoid() {
  return (
    <section className="hp-avoid">
      <FadeUp className="hp-avoid__header">
        <Label>Our Philosophy</Label>
        <h2 className="hp-section-title">What We <em>Avoid</em></h2>
        <p className="hp-section-sub">At Resonance, we believe in natural healing and avoid conventional methods that rely on chemicals or invasive practices.</p>
      </FadeUp>
      <div className="hp-avoid__grid">
        {avoided.map((item, i) => (
          <FadeUp key={item} delay={i * 0.05} className="hp-avoid__chip">
            <span className="hp-avoid__x">✕</span>{item}
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

/* ── TESTIMONIALS ── */
const reviews = [
  { name: 'Saqlain Mukhtar', initial: 'S', color: '#7661A4', ago: '1 month ago', text: 'What a practical demonstration as to how the laws of physics work for the benefit of humanity. Bravo, truly remarkable work.' },
  { name: 'Hasan Mahmood',   initial: 'H', color: '#4a3a2a', ago: '1 month ago', text: 'Alhamdulilah, "Caregivers offer care and treatment, while God Almighty bestows healing." Truly experienced the difference.' },
  { name: 'Umar Shafiq',     initial: 'U', color: '#c0392b', ago: '2 months ago', text: 'I have seen health miracles many times by using remedies. It feeds positive energy to whoever seeks it.' },
  { name: 'Ayesha Tariq',    initial: 'A', color: '#5BB0BA', ago: '3 months ago', text: 'Amazing results! The resonance therapy helped me more than months of conventional treatment. Highly recommended.' },
  { name: 'Bilal Ahmed',     initial: 'B', color: '#27ae60', ago: '3 months ago', text: 'Life-changing experience. The team is professional, caring, and truly knowledgeable. Will definitely continue.' },
  { name: 'Zara Malik',      initial: 'Z', color: '#e67e22', ago: '4 months ago', text: 'The water remedies made a noticeable difference within weeks. I am so grateful to have found this.' },
]

const GoogleIcon = () => (
  <img src="/images/google-icon.svg" alt="Google" className="hp-review__google" />
)

const ReviewStars = () => (
  <div className="hp-review__stars" aria-label="5 stars">
    {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
  </div>
)

const PER_PAGE = 3
const MAX_PAGE = Math.ceil(reviews.length / PER_PAGE) - 1
const REVIEW_INTERVAL = 3000

function Testimonials() {
  const [page, setPage] = useState(0)
  const dirRef = useRef(1)
  const timerRef = useRef(null)

  function startTimer() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      dirRef.current = 1
      setPage(p => (p >= MAX_PAGE ? 0 : p + 1))
    }, REVIEW_INTERVAL)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  function goPrev() { dirRef.current = -1; setPage(p => Math.max(0, p - 1)); startTimer() }
  function goNext() { dirRef.current = 1;  setPage(p => Math.min(MAX_PAGE, p + 1)); startTimer() }

  const visible = reviews.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <section className="hp-reviews">
      <FadeUp className="hp-reviews__header">
        <span className="hp-reviews__badge">Verified By Trustindex</span>
        <h2 className="hp-section-title">Stories Of <em>Transformation</em></h2>
        <p className="hp-section-sub">Hear from our people who have experienced the healing power of resonance therapy.</p>
      </FadeUp>

      <div className="hp-reviews__body">
        {/* LEFT: aggregate score */}
        <div className="hp-reviews__score">
          <p className="hp-reviews__excellent">EXCELLENT</p>
          <div className="hp-reviews__big-stars">{'★★★★★'}</div>
          <p className="hp-reviews__count">Based on <strong>83 reviews</strong></p>
          <img
            src="/images/google-logo.svg"
            alt="Google"
            className="hp-reviews__glogo"
          />
        </div>

        {/* RIGHT: review cards */}
        <div className="hp-reviews__carousel">
          <button
            className="hp-reviews__arrow hp-reviews__arrow--prev"
            onClick={goPrev}
            disabled={page === 0}
            aria-label="Previous">‹</button>

          <AnimatePresence mode="wait" custom={dirRef.current}>
            <motion.div
              key={page}
              className="hp-reviews__cards"
              custom={dirRef.current}
              variants={{
                enter: d => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
                center: { opacity: 1, x: 0 },
                exit: d => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {visible.map((r) => (
                <div key={r.name} className="hp-review-card">
                  <div className="hp-review__top">
                    <div className="hp-review__avatar" style={{ background: r.color }}>{r.initial}</div>
                    <div className="hp-review__meta">
                      <span className="hp-review__name">{r.name}</span>
                      <span className="hp-review__ago">{r.ago}</span>
                    </div>
                    <GoogleIcon />
                  </div>
                  <ReviewStars />
                  <p className="hp-review__text">{r.text}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            className="hp-reviews__arrow hp-reviews__arrow--next"
            onClick={goNext}
            disabled={page === MAX_PAGE}
            aria-label="Next">›</button>
        </div>
      </div>

      {/* dots */}
      <div className="hp-reviews__dots">
        {Array.from({ length: MAX_PAGE + 1 }).map((_, i) => (
          <button
            key={i}
            className={'hp-reviews__dot' + (i === page ? ' hp-reviews__dot--active' : '')}
            onClick={() => { setPage(i); startTimer() }}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

/* ── CONTACT ── */
function Contact() {
  return (
    <section className="hp-contact">
      <FadeUp className="hp-contact__header">
        <Label>Get in Touch</Label>
        <h2 className="hp-section-title">Embark on Your <em>Healing Journey</em></h2>
        <p className="hp-section-sub">Book an appointment for a personal visit or consult virtually. We are here to help you on your path to wellness.</p>
      </FadeUp>
      <div className="hp-contact__grid">
        <FadeUp className="hp-contact__info">
          {[
            { icon: '📍', label: 'Location', val: 'Fatima Arcade First Floor (Above MCB Bank), Business Bay Phase 7 Bahria Town, Rawalpindi', href: null },
            { icon: '📞', label: 'Phone', val: '+92 344 8885628 · +92 311 9685122', href: 'tel:+923119685122' },
            { icon: '✉️', label: 'Email', val: 'resonanceforall@gmail.com', href: 'mailto:resonanceforall@gmail.com' },
            { icon: '🕐', label: 'Timing', val: 'By appointment — WhatsApp or call to book', href: null },
          ].map((c) => (
            <div key={c.label} className="hp-contact__item">
              <span className="hp-contact__icon">{c.icon}</span>
              <div>
                <p className="hp-contact__item-label">{c.label}</p>
                {c.href
                  ? <a href={c.href} className="hp-contact__item-val">{c.val}</a>
                  : <p className="hp-contact__item-val">{c.val}</p>}
              </div>
            </div>
          ))}
        </FadeUp>
        <FadeUp delay={0.1} className="hp-contact__form-wrap">
          <form className="hp-contact__form" onSubmit={e => e.preventDefault()}>
            <h3 className="hp-contact__form-title">Send a Message</h3>
            <input type="text" placeholder="Your Name" className="hp-input" />
            <input type="tel" placeholder="Phone Number" className="hp-input" />
            <input type="email" placeholder="Email Address" className="hp-input" />
            <textarea placeholder="Your message..." className="hp-input hp-textarea" rows={4} />
            <motion.button type="submit" className="btn btn--pulse"
              whileTap={{ scale: 0.97 }} style={{ width: '100%' }}>
              Send Message
            </motion.button>
          </form>
        </FadeUp>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="app-page">
      <Hero />
      <About />
      <Process />
      <Devices />
      <WhatWeAvoid />
      <Testimonials />
      <Contact />
    </div>
  )
}
