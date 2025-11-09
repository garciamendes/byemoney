"use server";

import { auth } from "@/lib/auth";
import { mapError } from "@/shared/errors/errorMapper";
import { z } from "zod";

type FormState = {
  name?: string;
  email?: string;
  password?: string;
  success?: boolean;
  errors?: Record<string, string[]>;
};

const dataSchema = z.object({
  name: z.string().optional(),
  email: z.email({ error: "Email inválido" }),
  password: z
    .string({ error: "Campo senha é obrigatório" })
    .min(8, { error: "Mínimo de 8 caracteres" }),
});

export async function register(prev: FormState, formData: FormData): Promise<FormState> {
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

  const { name, email, password } = parsed.data;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: name || `#${Math.floor(Math.random() * 1000)}`,
      },
    });

    return {
      name,
      email,
      success: true,
      errors: undefined,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const mapped = mapError(e['body'])

    return {
      ...prev,
      errors: { global: [mapped.message] },
      success: false,
    };
  }
}