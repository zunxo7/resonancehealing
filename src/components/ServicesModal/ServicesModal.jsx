import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Buildings } from 'phosphor-react'
import { useServicesModal } from '../../context/ServicesModalContext'
import './ServicesModal.css'

export default function ServicesModal() {
  const { isOpen, close } = useServicesModal()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="svc-modal__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="svc-modal__content"
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={e => e.stopPropagation()}
          >
            <button className="svc-modal__close" onClick={close}>✕</button>
            <h2 className="svc-modal__title">Healing Services</h2>
            <div className="svc-modal__options">
              <Link to="/healing-services" className="svc-modal__btn" onClick={close}>
                <Heart size={22} weight="duotone" />
                <span>About Our Services</span>
              </Link>
              <Link to="/on-premises-follow-ups" className="svc-modal__btn" onClick={close}>
                <Buildings size={22} weight="duotone" />
                <span>On Premises &amp; Follow Ups</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
