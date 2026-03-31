import { createContext, useContext, useState } from 'react'

const ServicesModalContext = createContext(null)

export function ServicesModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ServicesModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </ServicesModalContext.Provider>
  )
}

export function useServicesModal() {
  const ctx = useContext(ServicesModalContext)
  if (!ctx) throw new Error('useServicesModal must be used within ServicesModalProvider')
  return ctx
}
