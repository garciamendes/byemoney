import { db } from "@/db/connection";
import { auth } from "@/lib/auth";
import { CreateInvoiceSchehma } from "@/shared/types";
import { NextRequest, NextResponse } from "next/server";
import { readonly, ZodError } from "zod";

export async function createInvoice(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(
      { error: "unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  try {
    const invoice = await CreateInvoiceSchehma.parseAsync(req.json());
    console.log(invoice);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof ZodError) {
      const treeError = error.issues
      const formattedError = treeError.flatMap((err) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({[err.path[0]]: err.message } as any)
      ))

      return NextResponse.json(
        { error: formattedError, code: "ZOD_ERROR" },
        { status: 400 }
      )
    }
  }

  return NextResponse.json({ data: null, code: "SUCCESS" }, { status: 200 });
}
