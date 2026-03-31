import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import BottomNav from '../components/BottomNav/BottomNav'
import ServicesModal from '../components/ServicesModal/ServicesModal'
import './MainLayout.css'

export default function MainLayout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <ServicesModal />
    </div>
  )
}
