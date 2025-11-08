'use client'

import Input from "@/components/inputCustom"
import { Button } from "@/components/retroui/Button"
import { login } from "@/services/login"
import { register } from "@/services/register"
import { getError } from "@/utils/getErrors"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const [state, handleAction, pedding] = useActionState(login, {})

  useEffect(() => {
    if (!state.success && getError(state.errors, 'global')) {
      console.log(state)
      toast.error(getError(state.errors, 'global'))
      return
    }

    router.replace('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.errors, state.success])

  return (
    <div className="h-full w-full flex">
      <div className="hidden lg:flex w-2/5 h-full bg-primary justify-center items-center">
        <h3>LOGIN</h3>
      </div>

      <div className="flex flex-col h-full items-center justify-center mx-auto px-5 w-full lg:w-1/3">
        <form action={handleAction} className="flex flex-col w-full h-full justify-center items-center gap-5">
          <Input
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="Exemplo@example.com"
            error={getError(state.errors, 'email')}
          />

          <Input
            type="password"
            name="password"
            id="password"
            label="Senha"
            placeholder={'•'.repeat(10)}
            error={getError(state.errors, 'password')}
          />

          <div className="flex flex-col w-full gap-4">
            <Button
              className="flex justify-center items-center w-full"
              type="submit">
              Registrar
            </Button>

            <Link
              className="text-foreground hover:underline w-max"
              href={'/register'}>
              Ainda não possui cadastro?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}