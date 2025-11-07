'use client'

import { ComponentProps } from "react"

export type InputProps = ComponentProps<'input'> & {
  error?: string | undefined | null
}

export const Input = (props: InputProps) => {
  return (
    <div className="flex flex-col gap-0.5">
      <input {...props} />

      {props.error && (
        <p className="text-red-500 text-sm mt-1">{props.error}</p>
      )}
    </div>
  )
}