'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from './retroui/Badge'
import { Button } from './retroui/Button'
import { Command } from './retroui/Command'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from 'cmdk'
import { Popover } from './retroui/Popover'
import { Label } from './retroui/Label'
import { CaretDownIcon } from '@phosphor-icons/react'

type Option = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  name: string
  id?: string
  defaultValue?: string[]
  placeholder?: string
  label?: string
  /** se true, o valor do hidden input será "a,b,c" em vez de JSON */
  csvValue?: boolean
}

export function MultiSelect({
  options,
  name,
  id,
  defaultValue = [],
  placeholder = 'Selecione...',
  label,
  csvValue = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>(defaultValue)

  const toggleValue = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  const selectedLabels = options.filter((o) => selected.includes(o.value))

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label htmlFor={id}>{label}</Label>
      )}

      {/* 🔒 Campo hidden — permite pegar o valor via FormData */}
      <input
        type="hidden"
        id={id}
        name={name}
        value={csvValue ? selected.join(',') : JSON.stringify(selected)}
        readOnly
      />

      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-10"
          >
            {selected.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedLabels.map((item) => (
                  <Badge key={item.value} variant="solid" className="text-xs">
                    {item.label}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}

            <CaretDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </Popover.Trigger>

        <Popover.Content className="w-(--radix-popover-trigger-width) p-0">
          <Command>
            <CommandList>
              <CommandEmpty>Nenhum item encontrado.</CommandEmpty>

              <CommandGroup>
                {options.map((opt) => {
                  const isSelected = selected.includes(opt.value)
                  return (
                    <CommandItem
                      key={opt.value}
                      onSelect={() => toggleValue(opt.value)}
                      className="cursor-pointer flex items-center p-2 hover:bg-primary hover:text-primary-foreground duration-300"
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          isSelected ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {opt.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </Popover.Content>
      </Popover>
    </div>
  )
}
