import { Link } from 'react-router-dom'
import './Footer.css'

const certs = [
  { src: '/iphm.jpg',  alt: 'IPHM Certified' },
  { src: '/iphm2.jpg', alt: 'IPHM Worldwide Accreditation Board' },
  { src: '/hbl.png',   alt: 'HBL – Habib Bank' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* brand col */}
        <div className="footer__col footer__col--brand">
          <Link to="/">
            <img src="/Logo.png" alt="Resonance Healing" className="footer__logo" />
          </Link>
          <p className="footer__tagline">Balance the Unbalances, Restoring Natural Harmony.</p>
          <address className="footer__contact">
            <span>📍 Fatima Arcade First Floor (Above MCB Bank), Business Bay Phase 7 Bahria Town, Rawalpindi</span>
            <a href="tel:+923119685122">📞 +92 311 9685122</a>
            <a href="mailto:resonanceforall@gmail.com">✉ resonanceforall@gmail.com</a>
          </address>
        </div>

        {/* devices col */}
        <div className="footer__col">
          <h4 className="footer__col-title">Healing Devices</h4>
          <ul className="footer__links">
            <li><Link to="/product/voice-programmed-potentiser-vpp">Voice Programmed Potentiser (VPP)</Link></li>
            <li><Link to="/product/radionics-remedy-maker-rrm">Radionics Remedy Maker (RRM)</Link></li>
            <li><Link to="/product/all-in-one-unit-aiou">All in One Unit (AiOU)</Link></li>
            <li><Link to="/product/water-healing-device">Water Healing Device</Link></li>
            <li><Link to="/healing-products">Resonance Water</Link></li>
          </ul>
        </div>

        {/* quick links col */}
        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__links">
            <li><Link to="/healing-services">Healing Services</Link></li>
            <li><Link to="/healing-products">Shop</Link></li>
            <li><Link to="/booking">Book Online</Link></li>
            <li><Link to="/certificates">Certificates</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/delivery-policy">Delivery Policy</Link></li>
            <li><Link to="/refund-exchange-policy">Refund &amp; Exchange</Link></li>
            <li><Link to="/terms-and-conditions">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        {/* certified by col */}
        <div className="footer__col">
          <h4 className="footer__col-title">Certified By</h4>
          <div className="footer__cert-list">
            {certs.map(c => (
              <div key={c.alt} className="footer__cert-item">
                <img src={c.src} alt={c.alt} className="footer__cert-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© 2025 <strong>Resonance Healing</strong>. All rights reserved.</p>
        <div className="footer__certs">
          <span>IPHM Certified</span>
          <span>·</span>
          <span>Secure SSL</span>
          <span>·</span>
          <span>Google Safe Browsing</span>
        </div>
      </div>
    </footer>
  )
}
