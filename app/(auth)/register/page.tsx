"use client";

import { Input } from "@/components/input";
import { register } from "@/services/registe";
import { getError } from "@/utils/getErrors";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter()
  const [state, handleAction, pedding] = useActionState(register, {})

  useEffect(() => {
    if (!state?.success) return

    router.replace('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.email])

  return (
    <div className="flex items-center justify-center h-screen bg-slate-950">
      <form
        action={handleAction}
        className="bg-slate-900 w-96 h-auto flex flex-col gap-5 p-10 rounded-lg"
      >
        <h1 className="text-2xl text-white text-center font-semibold">Criar Conta</h1>

        <Input
          name="name"
          placeholder="Nome"
          type="text"
          className="border border-slate-500 bg-transparent text-white px-3 py-2 rounded outline-none"
          error={getError(state?.errors, 'name')}
        />

        <Input
          name="email"
          placeholder="E-mail"
          type="email"
          className="border border-slate-500 bg-transparent text-white px-3 py-2 rounded"
          error={state?.errors?.email?.[0]}
        />

        <Input
          name="password"
          placeholder="Senha"
          type="password"
          className="border border-slate-500 bg-transparent text-white px-3 py-2 rounded"
          error={getError(state?.errors, 'password')}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-all"
          disabled={pedding}
        >
          {pedding ? 'Carregando...' : 'Criar'}
        </button>

        <p className="text-slate-400 text-sm text-center">
          Já tem conta?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Entrar
          </a>
        </p>
      </form>
    </div>
  );
}
