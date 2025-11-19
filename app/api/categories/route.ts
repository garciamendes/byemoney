import { getCategories } from "@/services/getCategories";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getCategories(req);
}
