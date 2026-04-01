import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, FilePdf } from 'phosphor-react'
import { useCart } from '../../context/CartContext'
import './ProductPage.css'

const images = [
  '/images/WhatsApp-Image-2026-02-19-at-11.40.16-AM-1.jpeg',
  '/images/WhatsApp-Image-2026-02-19-at-11.40.16-AM-1.jpeg',
]

const sizes = ['Standard', 'Premium']

const recentProducts = [
  { name: 'Resonance Water', date: 'December 16, 2025', img: '/images/WhatsApp-Image-2026-02-19-at-11.40.16-AM-1.jpeg', to: '/healing-products' },
  { name: 'Water Healing Device', date: 'December 16, 2025', img: '/images/WhatsApp-Image-2026-02-19-at-11.40.16-AM-1.jpeg', to: '/product/water-healing-device' },
  { name: 'All in One Unit (AiOU)', date: 'December 16, 2025', img: '/images/r3.jpg', to: '/product/all-in-one-unit-aiou' },
  { name: 'Radionics Remedy Maker (RRM)', date: 'December 16, 2025', img: '/images/RRM-1.png', to: '/product/radionics-remedy-maker-rrm' },
  { name: 'Voice Programmed Potentiser (VPP)', date: 'December 16, 2025', img: '/images/VPP-6.png', to: '/product/voice-programmed-potentiser-vpp' },
]

export default function ProductWHDPage() {
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [activeSize, setActiveSize] = useState('Standard')
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
                alt="Water Healing Device"
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
                  <img src={src} alt={`WHD thumbnail ${i + 1}`} className="pp-gallery__thumb-img" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="pp-info">
            <nav className="pp-breadcrumb">
              <Link to="/">Home</Link>
              <span className="pp-breadcrumb__sep">/</span>
              <Link to="/healing-products">Devices</Link>
              <span className="pp-breadcrumb__sep">/</span>
              <span>Water Healing Device</span>
            </nav>

            <h1 className="pp-info__name">Water Healing Device</h1>

            <p className="pp-info__short-desc">
              Uses resonance frequency imprinting technology to prepare water-based remedies. No chemicals, no invasive procedures — purely informational in nature.
            </p>

            <p className="pp-info__price">Rs. 1,14,000 – Rs. 2,33,000</p>

            <div>
              <p className="pp-size-label">Size</p>
              <div className="pp-size-pills">
                {sizes.map((s) => (
                  <button
                    key={s}
                    className={`pp-size-pill${activeSize === s ? ' pp-size-pill--active' : ''}`}
                    onClick={() => setActiveSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

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
                onClick={() => { addToCart({ id: 'WHD', name: 'Water Healing Device', abbr: 'WHD', img: images[0], price_pkr: 114000, price_usd: 410.68 }, qty); navigate('/cart') }}
              >
                <ShoppingCart size={18} weight="bold" />
                Add to cart
              </button>
            </div>
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
                <p>The Water Healing Device prepares water-based remedies using resonance frequency imprinting technology.</p>
                <p>It works without chemicals, filters, or any pharmaceutical components — purely through informational imprinting.</p>
                <p>Intended for use as a resonance remedy device in support of a natural, non-invasive approach to wellbeing.</p>
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
