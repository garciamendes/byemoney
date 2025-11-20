import { createInvoice } from "@/services/createInvoice";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return createInvoice(req);
}
