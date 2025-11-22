'use client'

import * as React from 'react'
import { Popover } from '@/components/retroui/Popover'
import { Button } from '@/components/retroui/Button'
import { Label } from '@/components/retroui/Label'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, formatISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from './calendar'

type Mode = 'date' | 'range'

interface DatePickerProps {
  id?: string
  name?: string
  label?: string
  mode?: Mode
  placeholder?: string
  classNameWrapper?: string
  error?: string
  value?: string | { from?: string; to?: string } | null
  onChange?: (value: string | { from?: string; to?: string } | null) => void
}

export function DatePicker({
  id,
  name,
  label,
  mode = 'date',
  placeholder = 'Selecione uma data',
  classNameWrapper,
  error,
  value: controlledValue,
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<typeof controlledValue>(
    controlledValue ?? null
  )

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue ?? null)
    }
  }, [controlledValue])

  const isRange = mode === 'range'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (val: any) => {
    if (isRange) {
      setValue(val)
      onChange?.(val)
      return
    }

    if (!val) {
      setValue(null)
      onChange?.(null)
      return
    }

    setValue(val)
    onChange?.(val)
    setOpen(false)
  }

  const labelText = React.useMemo(() => {
    if (!value) return placeholder

    if (isRange && typeof value === 'object' && 'from' in value) {
      const { from, to } = value
      if (!from) return placeholder
      if (!to)
        return format(from, "dd / MM / yyyy", { locale: ptBR })
      return `${format(from, "dd / MM", {
        locale: ptBR,
      })} → ${format(to, "dd / MM / yyyy", { locale: ptBR })}`
    }

    if (value instanceof Date) {
      const base = format(value, "dd / MM / yyyy", { locale: ptBR })
      return base
    }

    return placeholder
  }, [value, isRange, placeholder])

  const hiddenValue =
    isRange && value && typeof value === 'object' && 'from' in value
      ? JSON.stringify({
        from: value.from ? formatISO(value.from) : null,
        to: value.to ? formatISO(value.to) : null,
      })
      : typeof value === 'string'
        ? formatISO(value)
        : ''

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', classNameWrapper)}>
      {label && <Label htmlFor={id}>{label}</Label>}

      <input type="hidden" id={id} name={name} value={hiddenValue} readOnly />

      <Popover open={open} onOpenChange={setOpen}>
        <>
          <Popover.Trigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full min-h-10 px-3 py-2 border-2 border-border',
                'flex items-center justify-between text-left shadow-md',
                !value && 'text-muted-foreground font-light'
              )}
            >
              <span
                className={
                  cn(
                    'text-foreground',
                    !value && 'text-muted-foreground font-light'
                  )}>
                {labelText}
              </span>
              <CalendarIcon className="ml-2 h-4 w-4 opacity-70 text-foreground" />
            </Button>

          </Popover.Trigger>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </>

        <Popover.Content
          className="w-max p-0"
        >
          <Calendar
            animate
            mode={isRange ? 'range' : 'single'}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            selected={value as any}
            onSelect={handleSelect}
            {...(isRange ? { required: false } : {})}
          />
        </Popover.Content>
      </Popover>
    </div>
  )
}
