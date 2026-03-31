import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, FilePdf } from 'phosphor-react'
import { useCart } from '../../context/CartContext'
import './ProductPage.css'

const images = [
  '/images/VPP-6.png',
  '/images/VPP-4.jpg',
  '/images/VPP-3.jpg',
  '/images/VPP-5.jpg',
  '/images/VPP-2.jpg',
  '/images/VPP-RRM.png',
]

const recentProducts = [
  { name: 'Resonance Water', date: 'December 16, 2025', img: '/images/WhatsApp-Image-2026-02-19-at-11.40.16-AM-1.jpeg', to: '/healing-products' },
  { name: 'Water Healing Device', date: 'December 16, 2025', img: '/images/WhatsApp-Image-2026-02-19-at-11.40.16-AM-1.jpeg', to: '/product/water-healing-device' },
  { name: 'All in One Unit (AiOU)', date: 'December 16, 2025', img: '/images/r3.jpg', to: '/product/all-in-one-unit-aiou' },
  { name: 'Radionics Remedy Maker (RRM)', date: 'December 16, 2025', img: '/images/RRM-1.png', to: '/product/radionics-remedy-maker-rrm' },
  { name: 'Voice Programmed Potentiser (VPP)', date: 'December 16, 2025', img: '/images/VPP-6.png', to: '/product/voice-programmed-potentiser-vpp' },
]

export default function ProductVPPPage() {
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const { addToCart } = useCart()
  const navigate = useNavigate()

  return (
    <div className="app-page">
      <div className="pp-page">
        <div className="pp-top">
          {/* LEFT: Gallery */}
          <div className="pp-gallery">
            <div className="pp-gallery__main">
              <motion.img
                key={activeImg}
                src={images[activeImg]}
                alt="Voice Programmed Potentiser (VPP)"
                className="pp-gallery__main-img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            </div>
            <div className="pp-gallery__thumbs">
              {images.map((src, i) => (
                <button
                  key={i}
                  className={`pp-gallery__thumb${activeImg === i ? ' pp-gallery__thumb--active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt={`VPP thumbnail ${i + 1}`} className="pp-gallery__thumb-img" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="pp-info">
            <nav className="pp-breadcrumb">
              <Link to="/">Home</Link>
              <span className="pp-breadcrumb__sep">/</span>
              <Link to="/healing-products">VPP Device</Link>
              <span className="pp-breadcrumb__sep">/</span>
              <span>Voice Programmed Potentiser (VPP)</span>
            </nav>

            <h1 className="pp-info__name">Voice Programmed Potentiser (VPP)</h1>

            <p className="pp-info__short-desc">
              Voice Programmed Potentiser (VPP), the remedy maker, is a pocket-sized device designed to be ultra-portable. Not much bigger than a cell phone, it is ideal for professionals and common users/healers when traveling.
            </p>

            <p className="pp-info__price">Rs. 97,700.00</p>

            <div className="pp-qty-row">
              <input
                type="number"
                className="pp-qty-input"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button
                className="pp-add-cart"
                onClick={() => { addToCart({ id: 'VPP', name: 'Voice Programmed Potentiser (VPP)', abbr: 'VPP', img: images[0], price_pkr: 97700, price_usd: 348.90 }, qty); navigate('/cart') }}
              >
                <ShoppingCart size={18} weight="bold" />
                Add to cart
              </button>
            </div>

            <a
              href="https://resonancehealing.pk/wp-content/uploads/2026/03/User-Instructions.pdf"
              target="_blank"
              rel="noreferrer"
              className="pp-info__pdf"
            >
              <FilePdf size={14} weight="duotone" />
              User Instructions PDF
            </a>
          </div>
        </div>
      </div>

      {/* Bottom: Tabs + Recent Products */}
      <div className="pp-bottom">
        {/* LEFT: Tabs */}
        <div className="pp-tabs">
          <div className="pp-tabs__bar">
            <button
              className={`pp-tab-btn${activeTab === 'description' ? ' pp-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`pp-tab-btn${activeTab === 'reviews' ? ' pp-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (0)
            </button>
          </div>
          <div className="pp-tab-content">
            {activeTab === 'description' && (
              <>
                <p>Variants of VPP as per the output options (plate or well) and output lead plus beeper &amp; indicator are as per the pictures and explained in the prices below. Please refer to the labelled picture of the device.</p>
                <p>The device is designed to make remedies and the potency, if required, from the words or an Energy Program spoken into the 'Microphone', by pressing Push to Record button. Remedies are stored in a temporary memory inside the device and fed to an output that has a plate or a well/bowl, as in the pictures.</p>
                <p>Bottles of blank, unpotentized tablets (and/or a liquid) are placed on the output plate/in the well for copying and making remedies. Make Remedy and Erase Memory Button(s) are always used by holding it down for approximately 3 to 5 seconds and then releasing the button.</p>
              </>
            )}
            {activeTab === 'reviews' && (
              <p>No reviews yet. Be the first to review this product.</p>
            )}
          </div>
        </div>

        {/* RIGHT: Recent Products */}
        <aside className="pp-recent">
          <h3 className="pp-recent__title">Recent Products</h3>
          <div className="pp-recent__divider" />
          <div className="pp-recent__list">
            {recentProducts.map((p) => (
              <Link key={p.name} to={p.to} className="pp-recent__item">
                <img src={p.img} alt={p.name} className="pp-recent__item-img" loading="lazy" />
                <div className="pp-recent__item-info">
                  <span className="pp-recent__item-name">{p.name}</span>
                  <span className="pp-recent__item-date">{p.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
