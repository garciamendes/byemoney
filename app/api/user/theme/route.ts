import { getTheme } from "@/services/getTheme";
import { setTheme } from "@/services/setTheme";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getTheme(req);
}

export async function PATCH(req: NextRequest) {
  return setTheme(req);
}
