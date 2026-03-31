import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { House, Heart, ShoppingBag, DeviceMobile, Phone, WhatsappLogo, EnvelopeSimple, Calendar } from 'phosphor-react'
import { useServicesModal } from '../../context/ServicesModalContext'
import './BottomNav.css'

const items = [
  { id: 'home',     label: 'Home',     to: '/',                  icon: <House size={24} /> },
  { id: 'services', label: 'Services', isServices: true,          icon: <Heart size={24} /> },
  { id: 'products', label: 'Products', to: '/healing-products',   icon: <ShoppingBag size={24} /> },
  { id: 'apps',     label: 'Apps',     to: '/apps',               icon: <DeviceMobile size={24} /> },
  { id: 'contact',  label: 'Contact',  isModal: true,             icon: <Phone size={24} /> },
  { id: 'book',     label: 'Book',     to: '/booking',            icon: <Calendar size={24} /> },
]

function ContactModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="contact-modal__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="contact-modal__content"
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={e => e.stopPropagation()}
          >
            <button className="contact-modal__close" onClick={onClose}>✕</button>
            <h2 className="contact-modal__title">Get in Touch</h2>
            <div className="contact-modal__options">
              <a href="https://wa.me/923119685122" target="_blank" rel="noreferrer" className="contact-modal__btn contact-modal__btn--wa">
                <WhatsappLogo size={24} weight="regular" />
                <span>WhatsApp</span>
              </a>
              <a href="mailto:resonanceforall@gmail.com" className="contact-modal__btn contact-modal__btn--email">
                <EnvelopeSimple size={24} weight="regular" />
                <span>Email</span>
              </a>
              <a href="tel:+923119685122" className="contact-modal__btn contact-modal__btn--call">
                <Phone size={24} weight="regular" />
                <span>Call</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function BottomNav() {
  const [contactOpen, setContactOpen] = useState(false)
  const { open: openServices } = useServicesModal()

  return (
    <>
      <nav className="bottom-nav">
        <div className="bottom-nav__bar">
          {items.map((item) =>
            item.isServices ? (
              <button key={item.id} onClick={openServices} className="bottom-nav__item bottom-nav__btn">
                <div className="bottom-nav__icon">{item.icon}</div>
                <span className="bottom-nav__label">{item.label}</span>
              </button>
            ) : item.isModal ? (
              <button key={item.id} onClick={() => setContactOpen(true)} className="bottom-nav__item bottom-nav__btn">
                <div className="bottom-nav__icon">{item.icon}</div>
                <span className="bottom-nav__label">{item.label}</span>
              </button>
            ) : (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => 'bottom-nav__item' + (isActive ? ' bottom-nav__item--active' : '')}
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      className="bottom-nav__icon"
                      animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="bottom-nav__label">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="bottom-nav__indicator"
                        layoutId="nav-indicator"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            )
          )}
        </div>
      </nav>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
