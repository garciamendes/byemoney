"use server";

import { auth } from "@/lib/auth";

export async function login(data: FormData) {
  console.log("login function called with data:", data);

  await auth.api.signInEmail({
    body: {
      email: "test@example.com",
      password: "dev",
      callbackURL: "/",
      rememberMe: true,
    },
  });
}
