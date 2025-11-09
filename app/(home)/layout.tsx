'use client'

import { ReactNode } from "react";
import { Header } from "./(header)";
import { Loader } from "@/components/retroui/Loader";
import { useTheme } from "@/hooks/theme";
import { ThemeProvider } from "@/context/theme";
import { CreateInvoice } from "./(actions)/createInvoice";
import { InvoiceProvider } from "@/context/invoice";

function HomeLayoutLocal({ children }: { children: ReactNode }) {
  const { loading } = useTheme()

  return (
    <div className="h-full w-full flex flex-col relative">
      {loading && (
        <div className="absolute h-full w-full z-50 bg-background/60 flex justify-center items-center pointer-none:">
          <Loader size='lg' />
        </div>
      )}

      <Header />

      <div className="relative overflow-x-hidden h-full w-full">
        <CreateInvoice />

        <div className="py-6 h-full w-full lg:max-w-[1300px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <HomeLayoutLocal>{children}</HomeLayoutLocal>
      </InvoiceProvider>
    </ThemeProvider>
  )
}