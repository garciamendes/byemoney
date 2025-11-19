export interface ICategoriesReponse {
  id: string;
  name: string;
  slug: string;
}

export interface IINvoiceForm {
  name: string;
  value: number | null;
  isInstallments?: boolean;
  amountInstallments?: number | null;
  typeDebt: number | null;
  categories: string[];
  dueDate: string;
}
