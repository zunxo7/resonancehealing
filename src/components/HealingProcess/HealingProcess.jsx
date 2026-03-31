import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './HealingProcess.css'

const steps = [
  {
    num: '01',
    title: 'Intake & Attunement',
    desc: 'A deep listening session to map your energetic signature and identify where your resonance has fragmented.',
  },
  {
    num: '02',
    title: 'Frequency Diagnosis',
    desc: 'We measure your biofield and select the exact frequencies — sound, light, or touch — needed for your recalibration.',
  },
  {
    num: '03',
    title: 'Resonance Session',
    desc: 'Immersive healing using your chosen modality. Your body does the work; we hold the space.',
  },
  {
    num: '04',
    title: 'Integration & Anchor',
    desc: 'Guided breathwork and somatic practices to anchor the new coherence patterns into your daily life.',
  },
]

function Step({ step, index, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="process-step"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, type: 'spring', stiffness: 110 }}
    >
      <div className="process-step__aside">
        <motion.div
          className="process-step__dot"
          animate={inView ? { scale: [0, 1.3, 1] } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
        />
        {index < total - 1 && (
          <motion.div
            className="process-step__connector"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.35 }}
          />
        )}
      </div>

      <div className="process-step__content">
        <span className="process-step__num">{step.num}</span>
        <h3 className="process-step__title">{step.title}</h3>
        <p className="process-step__desc">{step.desc}</p>
      </div>
    </motion.div>
  )
}

export default function HealingProcess() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.9], [0, 1])
  const lineGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'drop-shadow(0 0 4px rgba(91,176,186,0.3))',
      'drop-shadow(0 0 12px rgba(118,97,164,0.6))',
      'drop-shadow(0 0 4px rgba(91,176,186,0.3))',
    ]
  )

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="process__header" ref={headerRef}>
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The Healing <em>Journey</em>
        </motion.h2>
      </div>

      <div className="process__body">
        {/* scroll-driven resonance line */}
        <div className="process__line-track" aria-hidden="true">
          <motion.div
            className="process__line"
            style={{ scaleY: lineScaleY, filter: lineGlow, transformOrigin: 'top' }}
          />
        </div>

        <div className="process__steps">
          {steps.map((s, i) => (
            <Step key={s.num} step={s} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
