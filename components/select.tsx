'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { CaretDownIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { Badge } from './retroui/Badge'
import { Button } from './retroui/Button'
import { Command } from './retroui/Command'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from 'cmdk'
import { Popover } from './retroui/Popover'
import { Label } from './retroui/Label'

export type Option = {
  label: string
  value: string
}

interface SelectProps {
  options: Option[]
  name: string
  id?: string
  label?: string
  placeholder?: string
  multiple?: boolean
  defaultValue?: string[] | string
  /** Se true, transforma hidden input em "a,b,c" em vez de JSON */
  csvValue?: boolean
  classNameWrapper?: string | undefined
}

export function Select({
  options,
  name,
  id,
  label,
  placeholder = 'Selecione um',
  multiple = false,
  defaultValue = multiple ? [] : '',
  csvValue = false,
  classNameWrapper
}: SelectProps) {
  const [open, setOpen] = React.useState(false)

  const [selected, setSelected] = React.useState<string[]>(
    multiple ? (defaultValue as string[]) : defaultValue ? [defaultValue as string] : []
  )

  const toggleValue = (val: string) => {
    if (multiple) {
      setSelected((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      )
    } else {
      setSelected([val])
      setOpen(false)
    }
  }

  const selectedLabels = options.filter((o) => selected.includes(o.value))

  const displayValue =
    multiple && selected.length > 0 ? (
      <div className="flex flex-wrap gap-1">
        {selectedLabels.map((item) => (
          <Badge key={item.value} variant="solid" className="text-sm">
            {item.label}
          </Badge>
        ))}
      </div>
    ) : selectedLabels[0] ? (
      <span>{selectedLabels[0].label}</span>
    ) : (
      <span className="text-muted-foreground">{placeholder}</span>
    )

  const hiddenValue = multiple
    ? csvValue
      ? selected.join(',')
      : JSON.stringify(selected)
    : selected[0] || ''

  return (
    <div className={cn('flex flex-col gap-1.5', classNameWrapper)}>
      {label && <Label htmlFor={id}>{label}</Label>}

      <input type="hidden" id={id} name={name} value={hiddenValue} readOnly />

      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger className='text-black text-base px-4 py-2' asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-10 px-4 py-2 text-foreground"
          >
            {displayValue}
            <CaretDownIcon className="ml-2 h-4 w-4 opacity-50 text-foreground" />
          </Button>
        </Popover.Trigger>

        <Popover.Content className="w-(--radix-popover-trigger-width) p-0">
          <Command>
            <CommandList className='max-h-[200px] lg:max-h-[400px] overflow-auto'>
              <CommandEmpty>Nenhum item encontrado</CommandEmpty>

              <CommandGroup>
                {options.map((opt) => {
                  const isSelected = selected.includes(opt.value)
                  return (
                    <CommandItem
                      key={opt.value}
                      onSelect={() => toggleValue(opt.value)}
                      className={cn(
                        'cursor-pointer flex items-center p-2 hover:bg-primary hover:text-primary-foreground duration-300',
                        !multiple && isSelected && 'bg-primary/10'
                      )}
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
