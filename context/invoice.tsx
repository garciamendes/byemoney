'use client'

import { useEffect, useState, createContext } from 'react'

interface InvoiceContextProps {
  openCreateInvoice: boolean
  setOpenCreateInvoice: (data: boolean) => void
}

export const InvoiceContext = createContext<InvoiceContextProps | null>(null)

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [openCreateInvoice, setOpenCreateInvoice] = useState(true);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'v' || e.key === 'V') && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        handleOpenCreateInvoice()
      }

      if (e.key === 'Escape') {
        handleCloseCreateInvoice()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenCreateInvoice = () => {
    if (openCreateInvoice) return

    setOpenCreateInvoice(true)
  }

  const handleCloseCreateInvoice = () => {
    setOpenCreateInvoice(false)
  }

  return (
    <InvoiceContext.Provider value={{ openCreateInvoice, setOpenCreateInvoice }}>
      {children}
    </InvoiceContext.Provider>
  )
}
