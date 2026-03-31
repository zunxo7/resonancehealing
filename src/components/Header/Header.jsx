import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, WhatsappLogo, EnvelopeSimple } from 'phosphor-react'
import { useServicesModal } from '../../context/ServicesModalContext'
import './Header.css'

const navItems = [
  { label: 'Home',     to: '/' },
  { label: 'Services', isServices: true },
  { label: 'Products', to: '/healing-products' },
  { label: 'Apps',     to: '/apps' },
  { label: 'About',   to: '/about' },
]

function ContactModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="header-modal__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="header-modal__content"
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={e => e.stopPropagation()}
          >
            <button className="header-modal__close" onClick={onClose}>✕</button>
            <h2 className="header-modal__title">Get in Touch</h2>
            <div className="header-modal__options">
              <a href="https://wa.me/923119685122" target="_blank" rel="noreferrer" className="header-modal__btn header-modal__btn--wa">
                <WhatsappLogo size={22} weight="regular" />
                <span>WhatsApp</span>
              </a>
              <a href="mailto:resonanceforall@gmail.com" className="header-modal__btn header-modal__btn--email">
                <EnvelopeSimple size={22} weight="regular" />
                <span>Email</span>
              </a>
              <a href="tel:+923119685122" className="header-modal__btn header-modal__btn--call">
                <Phone size={22} weight="regular" />
                <span>Call</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Header() {
  const [contactOpen, setContactOpen] = useState(false)
  const { open: openServices } = useServicesModal()

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <Link to="/" className="header__logo-wrap">
            <img src="/Logo.png" alt="Resonance Healing" className="header__logo" />
          </Link>

          {/* desktop nav */}
          <nav className="header__nav">
            {navItems.map((item) =>
              item.isServices ? (
                <button
                  key="services"
                  className="header__nav-link header__nav-contact"
                  onClick={openServices}>
                  Services
                </button>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    'header__nav-link' + (isActive ? ' header__nav-link--active' : '')
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
            <button className="header__nav-link header__nav-contact" onClick={() => setContactOpen(true)}>
              Contact
            </button>
          </nav>

          {/* mobile: About link on right */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              'header__mobile-about' + (isActive ? ' header__mobile-about--active' : '')
            }
          >
            About
          </NavLink>
        </div>
      </header>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
