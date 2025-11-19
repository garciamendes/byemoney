'use client'

import { Label } from '@/components/retroui/Label'
import { cn } from '@/lib/utils'
import { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export type InputUniversalProps = InputProps & {
  label?: string
  error?: string | null
  classNameWrapper?: string
  /** ativa formatação automática de moeda BRL */
  money?: boolean
  /** callback com valor numérico quando money=true */
  onValueChange?: (value: number | null) => void
}

const formatMoney = (value: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value)

const parseMoney = (raw: string): number | null => {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return null
  const int = parseInt(digits, 10)
  if (Number.isNaN(int)) return null
  return int / 100
}

export const Input = forwardRef<
  HTMLInputElement,
  InputUniversalProps
>(
  (
    {
      id,
      name,
      label,
      error,
      classNameWrapper,
      money = false,
      onValueChange,
      value,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [display, setDisplay] = useState<string>(
      money && typeof value === 'number'
        ? formatMoney(value)
        : (value as string) || ''
    )

    useEffect(() => {
      if (money) {
        if (value == null || value === '') {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setDisplay('')
        } else if (typeof value === 'number') {
          setDisplay(formatMoney(value))
        }
      } else {
        setDisplay((value as string) || '')
      }
    }, [value, money])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value

      if (money) {
        const parsed = parseMoney(raw)
        if (parsed == null) {
          setDisplay('')
          onValueChange?.(null)
          return
        }
        const formatted = formatMoney(parsed)
        setDisplay(formatted)
        onValueChange?.(parsed)
        props.onChange?.(e)
      } else {
        setDisplay(raw)
        props.onChange?.(e)
      }
    }

    return (
      <div className={cn('flex flex-col gap-1.5 w-full', classNameWrapper)}>
        {label && <Label htmlFor={id}>{label}</Label>}

        <input
          {...props}
          ref={ref}
          id={id}
          name={name}
          aria-invalid={!!error}
          value={display}
          onChange={handleChange}
          className={`px-4 py-2 w-full rounded border-2 shadow-md transition focus:outline-hidden focus:shadow-xs ${props["aria-invalid"]
            ? "border-destructive text-destructive shadow-xs shadow-destructive"
            : ""
            } ${props.className}`}
          type={money ? 'text' : props.type}
          inputMode={money ? 'numeric' : props.inputMode}
          autoComplete="off"
          placeholder={placeholder}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'