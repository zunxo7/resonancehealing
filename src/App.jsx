import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ServicesModalProvider } from './context/ServicesModalContext'
import MainLayout from './layouts/MainLayout'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import HomePage from './pages/Home/HomePage'
import HealingServicesPage from './pages/Services/HealingServicesPage'
import HealingProductsPage from './pages/Products/HealingProductsPage'
import ProductVPPPage from './pages/Product/ProductVPPPage'
import ProductRRMPage from './pages/Product/ProductRRMPage'
import ProductAiOUPage from './pages/Product/ProductAiOUPage'
import ProductWHDPage from './pages/Product/ProductWHDPage'
import AppsPage from './pages/Apps/AppsPage'
import BookingPage from './pages/Booking/BookingPage'
import CartPage from './pages/Cart/CartPage'
import CheckoutPage from './pages/Checkout/CheckoutPage'
import AboutPage from './pages/About/AboutPage'
import OnPremisesPage from './pages/OnPremises/OnPremisesPage'
import TermsPage from './pages/Policy/TermsPage'
import RefundPolicyPage from './pages/Policy/RefundPolicyPage'
import DeliveryPolicyPage from './pages/Policy/DeliveryPolicyPage'
import PrivacyPolicyPage from './pages/Policy/PrivacyPolicyPage'
import CertificatesPage from './pages/Certificates/CertificatesPage'
import './App.css'

export default function App() {
  return (
    <CartProvider>
      <ServicesModalProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/healing-services" element={<HealingServicesPage />} />
            <Route path="/healing-products" element={<HealingProductsPage />} />
            <Route path="/product/voice-programmed-potentiser-vpp" element={<ProductVPPPage />} />
            <Route path="/product/radionics-remedy-maker-rrm" element={<ProductRRMPage />} />
            <Route path="/product/all-in-one-unit-aiou" element={<ProductAiOUPage />} />
            <Route path="/product/water-healing-device" element={<ProductWHDPage />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/on-premises-follow-ups" element={<OnPremisesPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/refund-exchange-policy" element={<RefundPolicyPage />} />
            <Route path="/delivery-policy" element={<DeliveryPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
          </Route>
        </Routes>
      </ServicesModalProvider>
    </CartProvider>
  )
}
