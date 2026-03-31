import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, FilePdf } from 'phosphor-react'
import { useCart } from '../../context/CartContext'
import './ProductPage.css'

const images = [
  '/images/RRM-1.png',
  '/images/RRM-2.jpeg',
  '/images/RRM-6.jpeg',
  '/images/RRM-4.jpeg',
  '/images/RRM-5.jpeg',
  '/images/RRM-3.png',
]

const sizes = ['Small', 'Medium', 'Large']

const recentProducts = [
  { name: 'Resonance Water', date: 'December 16, 2025', img: '/images/WhatsApp-Image-2026-02-19-at-11.40.16-AM-1.jpeg', to: '/healing-products' },
  { name: 'Water Healing Device', date: 'December 16, 2025', img: '/images/WhatsApp-Image-2026-02-19-at-11.40.16-AM-1.jpeg', to: '/product/water-healing-device' },
  { name: 'All in One Unit (AiOU)', date: 'December 16, 2025', img: '/images/r3.jpg', to: '/product/all-in-one-unit-aiou' },
  { name: 'Radionics Remedy Maker (RRM)', date: 'December 16, 2025', img: '/images/RRM-1.png', to: '/product/radionics-remedy-maker-rrm' },
  { name: 'Voice Programmed Potentiser (VPP)', date: 'December 16, 2025', img: '/images/VPP-6.png', to: '/product/voice-programmed-potentiser-vpp' },
]

export default function ProductRRMPage() {
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [activeSize, setActiveSize] = useState('Small')
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
                alt="Radionics Remedy Maker (RRM)"
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
                  <img src={src} alt={`RRM thumbnail ${i + 1}`} className="pp-gallery__thumb-img" loading="lazy" />
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
              <span>Radionics Remedy Maker (RRM)</span>
            </nav>

            <h1 className="pp-info__name">Radionics Remedy Maker (RRM)</h1>

            <p className="pp-info__short-desc">
              The Radionics Remedy Maker (RRM) inputs remedy information from laptop or desktop computer, capable to make remedies in potencies from X, C, D, M, CM, MM, and LM. A Windows based Application/exe file plus supporting files are provided.
            </p>

            <p className="pp-info__price">Rs. 37,500 – Rs. 2,23,000</p>

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
                onClick={() => { addToCart({ id: 'RRM', name: 'Radionics Remedy Maker (RRM)', abbr: 'RRM', img: images[0], price_pkr: 37500, price_usd: 134.63 }, qty); navigate('/cart') }}
              >
                <ShoppingCart size={18} weight="bold" />
                Add to cart
              </button>
            </div>

            <a
              href="https://resonancehealing.pk/resonance_devices/User_Instructions_RRM.pdf"
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
                <p>RRM is available mainly in two sizes, small and large. Memory function is available in large sized casing only, due to less space in the small sized case.</p>
                <p>RRM contains an 'Energy Memory' (optional) which can be switched into the circuit, enabling remedies to be stored, and then be broadcast after the computer is switched off. Erase button clears the Energy Memory.</p>
                <p>It is possible to keep making remedies on the system without affecting what is already copied in the Energy Memory (by a selector switch for 'Direct' and 'Memory' mode).</p>
                <p>Sizes available: Small, Medium, Large.</p>
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
