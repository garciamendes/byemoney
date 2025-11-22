import { DEBT } from "@/app/(home)/constants";
import z from "zod";

export interface ICategoriesReponse {
  id: string;
  name: string;
  slug: string;
}

const baseRequirementField = " é um campo obrigátorio";
export const CreateInvoiceSchehma = z.object({
  name: z.string().min(1, { error: "Nome".concat(baseRequirementField) }),

  value: z.number({ error: "Valor".concat(baseRequirementField) }),

  isInstallments: z.boolean().optional().default(false),

  amountInstallments: z.number().optional().default(1),

  typeDebt: z.enum(DEBT, {
    error: "Tipo da Fatura".concat(baseRequirementField),
  }),

  categories: z.array(z.uuidv4(), {
    error: "Categoria".concat(baseRequirementField),
  }),

  dueDate: z.string({
    error: "Data de vencimento".concat(baseRequirementField),
  }),
});

export type IInvoiceForm = z.infer<typeof CreateInvoiceSchehma>;
