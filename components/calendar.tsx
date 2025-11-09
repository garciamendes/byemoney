'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({
  className,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={ptBR}
      className={cn(
        'p-3 text-foreground',
        className
      )}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === 'right')
            return <CaretRightIcon size={30} className="text-primary" />

          if (orientation === 'left')
            return <CaretLeftIcon size={30} className="text-primary" />

          // provide a fallback element so the function always returns a React element
          return <span />
        },
      }}
      {...props}
    />
  )
}
