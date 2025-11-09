import { db } from "@/db/connection";
import { users } from "@/db/schemas/user";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const setTheme = async (request: NextRequest) => {
  const session = await auth.api.getSession(request);

  if (!session)
    return NextResponse.json(
      { error: "Unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );

  const { theme } = await request.json();
  if (!["light", "dark"].includes(theme))
    return NextResponse.json(
      { error: "Invalid theme", code: "INVALID_THEME" },
      { status: 400 }
    );

  await db.update(users).set({ theme }).where(eq(users.id, session.user.id));
  return NextResponse.json({ theme, code: "SUCCESS" }, { status: 200 });
};
