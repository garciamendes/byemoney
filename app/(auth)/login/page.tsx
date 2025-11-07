"use client";
import { login } from "@/services/login";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-950">
      <form
        action={login}
        className="bg-slate-900 w-96 flex flex-col gap-5 p-10 rounded-lg"
      >
        <h1 className="text-2xl text-white text-center font-semibold">Entrar</h1>

        <input
          name="email"
          placeholder="E-mail"
          type="email"
          required
          className="border border-slate-500 bg-transparent text-white px-3 py-2 rounded"
        />
        <input
          name="password"
          placeholder="Senha"
          type="password"
          required
          className="border border-slate-500 bg-transparent text-white px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-all"
        >
          Entrar
        </button>

        <p className="text-slate-400 text-sm text-center">
          Novo aqui?{" "}
          <a href="/register" className="text-indigo-400 hover:underline">
            Criar conta
          </a>
        </p>
      </form>
    </div>
  );
}
