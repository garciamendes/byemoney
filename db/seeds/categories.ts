import { db } from "../connection";
import { categories } from "../schemas/category";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const runSeedCategories = async () => {
  const existing = await db.select().from(categories).limit(1);
  if (existing.length > 0) return;

  const categoryNames = [
    "Alimentação",
    "Transporte",
    "Moradia",
    "Educação",
    "Saúde",
    "Lazer",
    "Compras",
    "Assinaturas",
    "Investimentos",
    "Impostos",
    "Animais de Estimação",
    "Doações",
    "Viagens",
    "Serviços",
    "Outros",
  ];

  const dataCategories = categoryNames.map((n) => ({
    name: n,
    slug: slugify(n),
  }));
  await db.insert(categories).values(dataCategories);
};

runSeedCategories();
