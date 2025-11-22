import { auth } from "@/lib/auth";
import { CreateInvoiceSchehma } from "@/shared/types";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function createInvoice(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(
      { error: "unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  try {
    const invoice = CreateInvoiceSchehma.parse(req.json());

    return NextResponse.json(
      { data: invoice, code: "SUCCESS" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const treeError = error.issues;
      const formattedError = treeError.flatMap((err) => err.path[0]);

      return NextResponse.json(
        { error: formattedError, code: "ZOD_ERROR" },
        { status: 400 }
      );
    }
  }
}
