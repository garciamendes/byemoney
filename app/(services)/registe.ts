"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function register() {
  await auth.api.signUpEmail({
    body: {
      email: "teste@teste.com",
      password: "dev123456@",
      callbackURL: "/",
      name: "Matheus Garcia",
      rememberMe: true,
    },
    headers: await headers(),
  });
}
