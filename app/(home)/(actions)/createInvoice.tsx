'use client'

import { Divider } from "@/components/divider"
import { Button } from "@/components/retroui/Button"
import { useInvoice } from "@/hooks/invoice"
import { formatToMoney, parseBRLMoneyToNumber } from "@/utils"
import { XIcon } from "@phosphor-icons/react"
import { DEBT_OPTIONS } from "../constants"
import { Select } from "@/components/select"
import { Input } from "@/components/input"
import { Label } from "@/components/retroui/Label"
import { Switch } from "@/components/retroui/Switch"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/components/dateInput"
import { useCategories } from "@/hooks/categories"
import { IINvoiceForm } from "@/shared/types"
import { format, formatISO } from "date-fns"

export const CreateInvoice = () => {
  const { openCreateInvoice, setOpenCreateInvoice } = useInvoice()
  const { categories, loading: loadingCategories } = useCategories()
  const [invoiceForm, setInvoiceForm] = useState<IINvoiceForm>({
    name: '',
    value: null,
    isInstallments: false,
    typeDebt: null,
    amountInstallments: null,
    categories: [],
    dueDate: ''
  })

  const handlerChangeInvoiceForm = (name: string, value: string | number | string[] | boolean) => {
    setInvoiceForm(prev => ({ ...prev, [name]: value }))
  }

  const handlerSubmitInvoice = () => {
    const data = {
      ...invoiceForm,
      'value': parseBRLMoneyToNumber(String(invoiceForm.value))
    }

    console.log(data)
  }

  return (
    <div
      data-open={openCreateInvoice}
      className="
        absolute overflow-y-auto z-40
        h-full bg-background p-2 w-full lg:w-[600px]
        right-0 data-[open=false]:translate-x-[9999px]
        data-[open=true]:translate-x-0 border-l transition-all duration-300
      ">
      <div className="flex justify-between items-center pb-0.5">
        <h1 className="text-xl">Nova Fatura</h1>

        <XIcon size={25} className="cursor-pointer" onClick={() => setOpenCreateInvoice(false)} />
      </div>
      <Divider />

      <form
        onSubmit={e => {
          e.preventDefault()
          handlerSubmitInvoice()
        }}
        className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-4">
        <Input
          type="text"
          name='name'
          id="name"
          label="Nome da Fatura"
          classNameWrapper="col-span-2"
          onChange={e => handlerChangeInvoiceForm(e.target.name, e.target.value)}
          value={invoiceForm.name}
          placeholder="Example"
        />

        <Input
          money
          name="value"
          id="value"
          label="Valor Total"
          onChange={e => handlerChangeInvoiceForm(e.target.name, e.target.value)}
          value={invoiceForm.value as number}
          placeholder={formatToMoney(100)}
        />

        <div className="flex items-center gap-1.5 mt-6">
          <Switch
            id="installments"
            checked={invoiceForm.isInstallments}
            onCheckedChange={e => handlerChangeInvoiceForm('isInstallments', e)}
          />

          <Label htmlFor="installments" className="cursor-pointer select-none">
            Parcelado?
          </Label>
        </div>

        <Select
          classNameWrapper={cn('hidden col-span-2', invoiceForm.isInstallments ? 'block' : '')}
          name="installmentsCount"
          placeholder="Quantidade de parcelas"
          options={Array.from({ length: 100 }).map((_, i) => ({
            label: `${i + 1}x`,
            value: String(i + 1),
          }))}
          value={String(invoiceForm.amountInstallments)}
          onChange={(v) =>
            handlerChangeInvoiceForm('amountInstallments', Number(v))
          }
        />

        <Select
          name="debt"
          id="debt"
          label="Tipo da dívida"
          classNameWrapper="col-span-2"
          options={DEBT_OPTIONS}
          value={String(invoiceForm.typeDebt)}
          onChange={(v) =>
            handlerChangeInvoiceForm('typeDebt', Number(v))
          }
        />

        <Select
          name="categories"
          id="categories"
          label="Categorias"
          multiple
          loading={loadingCategories}
          placeholder="Selecione um ou mais categoria(s)"
          classNameWrapper="col-span-2"
          options={categories}
          value={invoiceForm.categories}
          onChange={(v) =>
            handlerChangeInvoiceForm('categories', v)
          }
        />

        <DatePicker
          classNameWrapper="col-span-2"
          name="dueDate"
          id="dueDate"
          label="Data de vencimento"
          mode="date"
          onChange={e => handlerChangeInvoiceForm('dueDate', formatISO(String(e)))}
        />

        <Button className="col-span-2 justify-center" type="submit">Criar Fatura</Button>
      </form>
    </div>
  )
}