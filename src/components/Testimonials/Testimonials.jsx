import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CaretLeft, CaretRight } from 'phosphor-react'
import './Testimonials.css'

const reviews = [
  {
    name: 'Saqlain Mukhtar',
    role: 'Verified Client',
    text: 'What a practical demonstration as to how the laws of physics work for the benefit of humanity. Bravo, truly remarkable work.',
    rating: 5,
    avatar: 'SM',
    color: '#5BB0BA',
  },
  {
    name: 'Umar Shafiq',
    role: 'Verified Client',
    text: 'I have seen remarkable results many times by using the remedies. It supports a sense of positive energy in whoever seeks it.',
    rating: 5,
    avatar: 'US',
    color: '#7661A4',
  },
  {
    name: 'Ayesha Tariq',
    role: 'Verified Client',
    text: 'Amazing experience. The resonance approach made a noticeable difference for me after trying many other options. Highly recommended.',
    rating: 5,
    avatar: 'AT',
    color: '#5BB0BA',
  },
]

function Stars({ count }) {
  return (
    <div className="t-stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="none" className="t-star">
          <defs>
            <linearGradient id={`tsg-${i}`} x1="0" y1="0" x2="16" y2="16">
              <stop stopColor="#5BB0BA" /><stop offset="1" stopColor="#7661A4" />
            </linearGradient>
          </defs>
          <path d="M8 1L9.9 5.9L15 6.3L11.3 9.5L12.5 14.5L8 11.8L3.5 14.5L4.7 9.5L1 6.3L6.1 5.9L8 1Z"
            fill={`url(#tsg-${i})`} />
        </svg>
      ))}
    </div>
  )
}

const INTERVAL = 4500

export default function Testimonials() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const dirRef = useRef(1)
  const [renderKey, setRenderKey] = useState(0)
  const timerRef = useRef(null)

  function startTimer() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      dirRef.current = 1
      setActive(prev => (prev + 1) % reviews.length)
      setRenderKey(k => k + 1)
    }, INTERVAL)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  function prev() {
    dirRef.current = -1
    setActive(i => (i - 1 + reviews.length) % reviews.length)
    setRenderKey(k => k + 1)
    startTimer()
  }

  function next() {
    dirRef.current = 1
    setActive(i => (i + 1) % reviews.length)
    setRenderKey(k => k + 1)
    startTimer()
  }

  function goTo(i) {
    dirRef.current = i > active ? 1 : -1
    setActive(i)
    setRenderKey(k => k + 1)
    startTimer()
  }

  const d = dirRef.current

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__header" ref={headerRef}>
        <motion.div
          className="testimonials__google-badge"
          initial={{ opacity: 0, y: 8 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
        >
          <img
            src="/images/google-logo.svg"
            alt="Google"
            className="testimonials__google-logo"
          />
          <span className="testimonials__google-label">Reviews</span>
        </motion.div>

        <motion.span
          className="testimonials__label"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          Stories
        </motion.span>
        <motion.h2
          className="testimonials__title"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          Real <em>Transformations</em>
        </motion.h2>
      </div>

      <div className="testimonials__carousel">
        <button className="testimonials__arrow testimonials__arrow--prev" onClick={prev} aria-label="Previous review">
          <CaretLeft size={18} weight="bold" />
        </button>

        <div className="testimonials__track">
          <AnimatePresence mode="wait" custom={d}>
            <motion.div
              key={renderKey}
              className="testimonial-card"
              custom={d}
              variants={{
                enter: dir => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
                center: { opacity: 1, x: 0 },
                exit: dir => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) next()
                else if (info.offset.x > 50) prev()
              }}
            >
              <Stars count={reviews[active].rating} />
              <p className="testimonial-card__text">"{reviews[active].text}"</p>
              <div className="testimonial-card__author">
                <div
                  className="testimonial-card__avatar"
                  style={{ background: `${reviews[active].color}22`, color: reviews[active].color }}
                >
                  {reviews[active].avatar}
                </div>
                <div>
                  <div className="testimonial-card__name">{reviews[active].name}</div>
                  <div className="testimonial-card__role">{reviews[active].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="testimonials__arrow testimonials__arrow--next" onClick={next} aria-label="Next review">
          <CaretRight size={18} weight="bold" />
        </button>
      </div>

      <div className="testimonials__dots">
        {reviews.map((_, i) => (
          <button
            key={i}
            className={'testimonials__dot' + (i === active ? ' testimonials__dot--active' : '')}
            onClick={() => goTo(i)}
            aria-label={`Review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
