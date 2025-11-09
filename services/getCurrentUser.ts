import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function getCurerntUser(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(
      { error: "unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { user: session.user, code: "SUCCESS" },
    { status: 200 }
  );
}
