import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FilePdf } from 'phosphor-react'
import './AppsPage.css'

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

const GooglePlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="apps-store-icon">
    <path d="M3 20.5v-17c0-.83 1-.83 1.29-.41L13 12l-8.71 8.91C3.97 21.34 3 21.33 3 20.5zm11.26-5.3L6.06 20.61l8.73-4.97.47.56zm3.14-3.7L5.78 4.13l8.95 5.07 2.67-2.1zm1.1.5c.81.46.81 1.14 0 1.6l-1.99 1.14-2.76-2.88 2.76-2.88 1.99 1.02z"/>
  </svg>
)

const AppStoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="apps-store-icon">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)

const apps = [
  {
    id: 'resonance',
    name: 'Resonance App',
    tagline: 'Heal with Your Voice',
    desc: 'Create personalized resonance remedies directly from your phone. Voice-program remedies, copy frequencies, and manage your healing on the go. Ideal for practitioners and personal use.',
    features: ['Voice-programmed remedies', 'Remedy copying & broadcasting', 'Personalized frequency profiles', 'Works with VPP device'],
    android: 'https://play.google.com/store/apps/details?id=com.avengers.resonance',
    ios: 'https://apps.apple.com/pk/app/resonance-healing/id6749448973',
    pdf: 'https://resonancehealing.pk/wp-content/uploads/2026/03/Resonance-How-it-works.pdf',
    color: 'teal',
  },
  {
    id: 'aio',
    name: 'Remedy Maker AIO',
    tagline: 'All-in-One Practitioner Tool',
    desc: 'Advanced all-in-one remedy maker app for practitioners. Make remedies in multiple potencies, manage the RRM device, and broadcast healing frequencies from your mobile device.',
    features: ['Multiple potency levels (X, C, D, M)', 'Energy Memory broadcasting', 'Color remedy generation', 'Works with RRM device'],
    android: 'https://play.google.com/store/apps/details?id=com.radionics.remedy.maker',
    ios: null,
    pdf: null,
    color: 'amethyst',
  },
]

export default function AppsPage() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <div className="app-page">
      <section className="apps-hero">
        <div className="apps-hero__blob apps-hero__blob--1" />
        <div className="apps-hero__blob apps-hero__blob--2" />
        <div ref={headerRef} className="apps-hero__inner">
          <motion.div initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}}>
            <Label>Healing Apps</Label>
          </motion.div>
          <motion.h1
            className="apps-hero__title"
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}>
            Healing in Your <em className="hp-grad">Pocket</em>
          </motion.h1>
          <motion.p
            className="apps-hero__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}>
            Download our apps to create, manage, and broadcast resonance remedies anywhere in the world.
          </motion.p>
        </div>
      </section>

      <section className="apps-cards-section">
        <div className="apps-cards">
          {apps.map((app, i) => (
            <FadeUp key={app.id} delay={i * 0.1} className={`apps-card apps-card--${app.color}`}>
              <div className="apps-card__header">
                <div className="apps-card__icon-wrap">
                  <DeviceMobileIcon color={app.color} />
                </div>
                <div>
                  <p className="apps-card__tagline">{app.tagline}</p>
                  <h2 className="apps-card__name">{app.name}</h2>
                </div>
              </div>

              <p className="apps-card__desc">{app.desc}</p>

              <ul className="apps-card__features">
                {app.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <div className="apps-card__actions">
                <a
                  href={app.android}
                  target="_blank"
                  rel="noreferrer"
                  className="apps-store-btn apps-store-btn--android">
                  <GooglePlayIcon />
                  <span>
                    <span className="apps-store-btn__sub">Get it on</span>
                    <span className="apps-store-btn__name">Google Play</span>
                  </span>
                </a>

                {app.ios ? (
                  <a
                    href={app.ios}
                    target="_blank"
                    rel="noreferrer"
                    className="apps-store-btn apps-store-btn--ios">
                    <AppStoreIcon />
                    <span>
                      <span className="apps-store-btn__sub">Download on the</span>
                      <span className="apps-store-btn__name">App Store</span>
                    </span>
                  </a>
                ) : (
                  <span className="apps-store-btn apps-store-btn--unavailable">
                    <AppStoreIcon />
                    <span>
                      <span className="apps-store-btn__sub">iOS</span>
                      <span className="apps-store-btn__name">Coming Soon</span>
                    </span>
                  </span>
                )}

                <a
                  href={app.pdf || '#'}
                  target={app.pdf ? '_blank' : undefined}
                  rel="noreferrer"
                  className="apps-pdf-btn"
                  style={app.pdf ? {} : { visibility: 'hidden', pointerEvents: 'none' }}
                  tabIndex={app.pdf ? undefined : -1}
                  aria-hidden={!app.pdf}>
                  <FilePdf size={16} weight="duotone" />
                  How it works PDF
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  )
}

function DeviceMobileIcon({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="apps-card__device-icon"
      stroke={color === 'teal' ? 'var(--teal)' : 'var(--amethyst)'} strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="17" r="1" fill={color === 'teal' ? 'var(--teal)' : 'var(--amethyst)'} stroke="none" />
    </svg>
  )
}
