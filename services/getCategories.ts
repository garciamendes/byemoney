import { db } from "@/db/connection";
import { categories } from "@/db/schemas/category";
import { auth } from "@/lib/auth";
import { ICategoriesReponse } from "@/shared/types";
import { NextRequest, NextResponse } from "next/server";

export async function getCategories(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(
      { error: "unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  const categoriesResponse: ICategoriesReponse[] = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .orderBy(categories.slug);

  return NextResponse.json(
    { categories: categoriesResponse, code: "SUCCESS" },
    { status: 200 }
  );
}
