'use client'

import { register } from "@/app/(services)/registe"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-slate-900 w-96 h-96 flex flex-col justify-center items-center gap-10">
        <input
          className="border border-slate-400 placeholder:text-slate-400 px-2 py-1"
          placeholder="Exemple"
          type="email" />

        <input
          className="border border-slate-400 placeholder:text-slate-400 px-2 py-1"
          placeholder="Exemple"
          type="password" />

        <button
          className="border-none bg-slate-700 py-2 px-10 cursor-pointer hover:bg-slate-700/80 duration-300 transition-all"
          onClick={register}
          type="button">
          Logar
        </button>
      </form>
    </div>
  )
}