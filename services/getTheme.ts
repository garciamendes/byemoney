import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export const getTheme = async (request: NextRequest) => {
  const session = await auth.api.getSession(request);

  if (!session)
    return Response.json(
      { error: "Unauthorized", code: "UNAUTHORIZED" },
      { status: 401 }
    );

  return Response.json(
    { theme: session.user.theme, code: "SUCCESS" },
    { status: 200 }
  );
};
