import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Booking.css'

export default function Booking() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="booking" id="booking" ref={ref}>
      <div className="booking__bg-blob booking__bg-blob--1" aria-hidden="true" />
      <div className="booking__bg-blob booking__bg-blob--2" aria-hidden="true" />

      <div className="booking__inner">
        <motion.span
          className="section-label"
          style={{ color: 'rgba(255,255,255,0.75)', WebkitTextFillColor: 'rgba(255,255,255,0.75)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Ready to Heal
        </motion.span>

        <motion.h2
          className="booking__title"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Begin Your Resonance Journey
        </motion.h2>

        <motion.p
          className="booking__sub"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          First session includes a 15-minute complimentary frequency consultation to align us with your unique healing path.
        </motion.p>

        <motion.div
          className="booking__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.button
            className="booking__btn-primary"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity }}
            whileTap={{ scale: 0.97 }}
          >
            Book Appointment
          </motion.button>
          <motion.button
            className="booking__btn-ghost"
            whileTap={{ scale: 0.97 }}
          >
            View All Services
          </motion.button>
        </motion.div>

        <motion.div
          className="booking__trust"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <span>✦ No commitment required</span>
          <span>✦ Cancel anytime</span>
          <span>✦ Personalised to your needs</span>
        </motion.div>
      </div>
    </section>
  )
}
