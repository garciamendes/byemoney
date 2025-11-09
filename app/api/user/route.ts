import { getCurerntUser } from "@/services/getCurrentUser";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getCurerntUser(req);
}
