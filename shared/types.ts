import { DEBT } from "@/app/(home)/constants";
import z from "zod";

export interface ICategoriesReponse {
  id: string;
  name: string;
  slug: string;
}

const baseRequirementField = " é um campo obrigátorio";
export const CreateInvoiceSchehma = z.object({
  name: z.string({ error: "Nome".concat(baseRequirementField) }),
  value: z.number({ error: "Valor".concat(baseRequirementField) }).nullable(),
  isInstallments: z.boolean().optional(),
  amountInstallments: z.number().optional().default(1).nullable(),
  typeDebt: z
    .enum(DEBT, { error: "Tipo da fatura".concat(baseRequirementField) })
    .nullable(),
  categories: z.array(z.uuidv4(), {
    error: "Categoria".concat(baseRequirementField),
  }),
  dueDate: z.string({
    error: "Data de vencimento".concat(baseRequirementField),
  }),
});

export type IINvoiceForm = z.infer<typeof CreateInvoiceSchehma>;
