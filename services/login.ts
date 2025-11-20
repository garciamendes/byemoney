"use server";

import { auth } from "@/lib/auth";
import { mapError } from "@/shared/errors/errorMapper";
import { z } from "zod";

type FormState = {
  email?: string;
  password?: string;
  success?: boolean;
  errors?: Record<string, string[]>;
};

const dataSchema = z.object({
  email: z.email({ error: "Email inválido" }),
  password: z.string({ error: "Campo senha é obrigatório" })
});

export async function login(prev: FormState, formData: FormData): Promise<FormState> {
  const input = Object.fromEntries(formData.entries());

  const parsed = dataSchema.safeParse(input);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error);
    return {
      ...prev,
      errors: flat.fieldErrors,
      success: false,
    };
  }

  const { email, password } = parsed.data;
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      email,
      success: true,
      errors: undefined,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const mapped = mapError(e['body'])

    return {
      ...prev,
      errors: { global: [mapped.message as string] },
      success: false,
    };
  }
}