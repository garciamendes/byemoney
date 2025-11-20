'use client'

import { http } from '@/shared/apiHttp/http'
import { IINvoiceForm } from '@/shared/types'
import { useState, createContext } from 'react'

interface InvoiceContextProps {
  openCreateInvoice: boolean
  loadingCreateInvoice: boolean
  setOpenCreateInvoice: (data: boolean) => void
  handleCreateInvoice: (data: IINvoiceForm) => Promise<void>
}

export const InvoiceContext = createContext<InvoiceContextProps | null>(null)

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [openCreateInvoice, setOpenCreateInvoice] = useState(true);
  const [loadingCreateInvoice, isLoadingCreateInvoice] = useState(false)

  const createAInvoice = async (data: IINvoiceForm) => {
    isLoadingCreateInvoice(true)

    http.post('/api/invoices', data)
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setOpenCreateInvoice(false))
  }

  return (
    <InvoiceContext.Provider value={{
      openCreateInvoice,
      setOpenCreateInvoice,
      loadingCreateInvoice,
      handleCreateInvoice: createAInvoice
    }}>
      {children}
    </InvoiceContext.Provider>
  )
}
