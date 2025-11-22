'use client'

import { Label } from '@/components/retroui/Label'
import { cn } from '@/lib/utils'
import { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export type InputUniversalProps = InputProps & {
  label?: string
  error?: string | null
  classNameWrapper?: string
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
      ...props
    },
    ref
  ) => {

    return (
      <div className={cn('flex flex-col gap-1.5 w-full', classNameWrapper)}>
        {label && <Label htmlFor={id}>{label}</Label>}

        <input
          {...props}
          ref={ref}
          id={id}
          name={name}
          aria-invalid={!!error}
          className={cn(
            "px-4 py-2 w-full rounded border-2 shadow-md transition focus:outline-hidden focus:shadow-xs",
            props["aria-invalid"]
              ? "border-destructive text-destructive shadow-xs shadow-destructive"
              : "",
            props.className
          )}
          autoComplete="off"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
