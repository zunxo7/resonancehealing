import { motion } from 'framer-motion'
import ResonanceCore from '../ResonanceCore/ResonanceCore'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      {/* background blobs */}
      <div className="hero__blob hero__blob--teal" aria-hidden="true" />
      <div className="hero__blob hero__blob--amethyst" aria-hidden="true" />

      <div className="hero__inner">
        {/* badge */}
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="hero__badge-dot" />
          Premium Energy Healing · Est. 2019
        </motion.div>

        {/* resonance core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 120 }}
        >
          <ResonanceCore />
        </motion.div>

        {/* headline */}
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Find Your <br />
          <span className="hero__title-accent">Resonance</span>
        </motion.h1>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          Sound therapy, energy healing & breathwork designed to realign your body, mind, and spirit at the cellular level.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <motion.button
            className="btn btn--pulse"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.8, ease: 'easeInOut', repeat: Infinity }}
            whileTap={{ scale: 0.97 }}
          >
            Book Appointment
          </motion.button>
          <motion.button
            className="btn btn--ghost"
            whileTap={{ scale: 0.97 }}
          >
            Explore Healing
          </motion.button>
        </motion.div>

        {/* stats */}
        <motion.div
          className="hero__stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { val: '2019', label: 'Established' },
            { val: '3', label: 'IPHM Certifications' },
            { val: 'Virtual', label: '& In-Person' },
          ].map((s) => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-val">{s.val}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
