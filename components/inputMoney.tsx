'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from './retroui/Label'

type MoneyInputProps = {
  id?: string
  name?: string
  label?: string
  value?: number | null
  onValueChange?: (value: number | null) => void
  placeholder?: string
  className?: string
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange'
>

// formata número em moeda BRL
const formatMoney = (value: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value)

// pega só dígitos e converte para número com 2 casas
const parseMoney = (raw: string): number | null => {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return null

  const int = parseInt(digits, 10)
  if (Number.isNaN(int)) return null

  return int / 100
}

export const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  (
    {
      id,
      name,
      label,
      value = null,
      onValueChange,
      placeholder = 'R$ 0,00',
      className,
      ...props
    },
    ref
  ) => {
    const [display, setDisplay] = React.useState<string>(
      value != null ? formatMoney(value) : ''
    )

    // sincroniza quando o value vem de fora (ex: reset do form)
    React.useEffect(() => {
      if (value == null) {
        setDisplay('')
      } else {
        setDisplay(formatMoney(value))
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value

      const parsed = parseMoney(raw)

      if (parsed == null) {
        setDisplay('')
        onValueChange?.(null)
        return
      }

      const formatted = formatMoney(parsed)
      setDisplay(formatted)
      onValueChange?.(parsed)
    }

    return (
      <div className="flex flex-col gap-1">
        {label && <Label htmlFor={id}>{label}</Label>}

        <input
          ref={ref}
          id={id}
          name={name}
          type="text"          // 👈 IMPORTANTE: não é number
          inputMode="numeric"  // 👈 teclado numérico no mobile
          autoComplete="off"
          value={display}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            'px-4 py-2 w-full rounded border-2 shadow-md transition focus:outline-hidden focus:shadow-xs',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

MoneyInput.displayName = 'MoneyInput'
