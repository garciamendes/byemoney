export const DEBT = {
  CART: 1,
  LOAN: 2,
  FINANCING: 3,
} as const;
export type DEBT_TYPE = typeof DEBT[keyof typeof DEBT];

export const DEBT_TITLE: Record<DEBT_TYPE, string> = {
  [DEBT.CART]: "Cartão",
  [DEBT.LOAN]: "Empréstimo",
  [DEBT.FINANCING]: "Financiamento",
};

export const STATUS_INVOICE = {
  OPEN: 1,
  OVERDUE: 2,
  PAIDED: 3,
} as const;
export type STATUS_INVOICE_TYPE =
  typeof STATUS_INVOICE[keyof typeof STATUS_INVOICE];
export const STATUS_INVOICE_TITLE: Record<STATUS_INVOICE_TYPE, string> = {
  [STATUS_INVOICE.OPEN]: "Aberto",
  [STATUS_INVOICE.OVERDUE]: "Atrasada",
  [STATUS_INVOICE.PAIDED]: "Paga",
};
