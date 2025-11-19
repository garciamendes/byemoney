'use client'

import { useState, createContext } from 'react'

interface InvoiceContextProps {
  openCreateInvoice: boolean
  setOpenCreateInvoice: (data: boolean) => void
}

export const InvoiceContext = createContext<InvoiceContextProps | null>(null)

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [openCreateInvoice, setOpenCreateInvoice] = useState(true);

  return (
    <InvoiceContext.Provider value={{ openCreateInvoice, setOpenCreateInvoice }}>
      {children}
    </InvoiceContext.Provider>
  )
}
