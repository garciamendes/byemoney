'use client'

import { Divider } from "@/components/divider"
import { Button } from "@/components/retroui/Button"
import { useInvoice } from "@/hooks/invoice"
import { formatToMoney } from "@/utils"
import { XIcon } from "@phosphor-icons/react"
import { DEBT_OPTIONS } from "../constants"
import { Select } from "@/components/select"
import { Input } from "@/components/input"
import { Label } from "@/components/retroui/Label"
import { Switch } from "@/components/retroui/Switch"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/components/dateInput"

export const CreateInvoice = () => {
  const { openCreateInvoice, setOpenCreateInvoice } = useInvoice()
  const [installments, setInstallments] = useState(false)

  return (
    <div
      data-open={openCreateInvoice}
      className="absolute overflow-y-auto z-40 h-full bg-background p-2 w-full lg:w-[600px] right-0 data-[open=false]:translate-x-[9999px] data-[open=true]:translate-x-0 border-l transition-all duration-300">
      <div className="flex justify-between items-center pb-0.5">
        <h1 className="text-xl">Nova Fatura</h1>

        <XIcon size={25} className="cursor-pointer" onClick={() => setOpenCreateInvoice(false)} />
      </div>
      <Divider />

      <form
        className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-4">
        <Input
          type="text"
          name="title_invoice"
          id="title_invoice"
          label="Nome da Fatura"
          classNameWrapper="col-span-2"
          placeholder="Example"
        />

        <Input
          money
          name="price_invoice"
          id="price_invoice"
          label="Valor Total"
          placeholder={formatToMoney(100)}
        />

        <div className="flex items-center gap-1.5 mt-6">
          <Switch id="installments" checked={installments} onCheckedChange={setInstallments} />

          <Label htmlFor="installments" className="cursor-pointer select-none">
            Parcelado?
          </Label>
        </div>

        <Select
          classNameWrapper={cn('hidden col-span-2', installments ? 'block' : '')}
          name="installmentsCount"
          placeholder="Qtd"
          options={Array.from({ length: 100 }).map((_, i) => ({
            label: `${i + 1}x`,
            value: String(i + 1),
          }))}
        />

        <Select
          name="debt"
          id="debt"
          label="Tipo da dívida"
          classNameWrapper="col-span-2"
          options={DEBT_OPTIONS}
        />

        <DatePicker
          classNameWrapper="col-span-2"
          name="due_date"
          label="Data de vencimento"
          mode="date"
        />

        <DatePicker
          classNameWrapper="col-span-2"
          name="due_date"
          label="Data de vencimento"
          mode="range"
        />

        <Button className="col-span-2 justify-center" type="submit">Criar Fatura</Button>
      </form>
    </div>
  )
}