"use client";

import { InvoiceContext } from "@/context/invoice";
import { useContext } from "react";

export const useInvoice = () => {
  const ctx = useContext(InvoiceContext);

  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");

  return ctx;
};
