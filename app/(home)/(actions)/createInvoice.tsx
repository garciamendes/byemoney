'use client'

import { Divider } from "@/components/divider"
import { Button } from "@/components/retroui/Button"
import { useInvoice } from "@/hooks/invoice"
import { formatToMoney, parseBRLMoneyToNumber } from "@/utils"
import { XIcon } from "@phosphor-icons/react"
import { Select } from "@/components/select"
import { Input } from "@/components/input"
import { Label } from "@/components/retroui/Label"
import { Switch } from "@/components/retroui/Switch"
import { cn } from "@/lib/utils"
import { useCategories } from "@/hooks/categories"
import { CreateInvoiceSchehma, IInvoiceForm } from "@/shared/types"
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DEBT_OPTIONS } from "../constants"
import { DatePicker } from "@/components/dateInput"

export const CreateInvoice = () => {
  const {
    openCreateInvoice,
    setOpenCreateInvoice,
    handleCreateInvoice,
  } = useInvoice()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateInvoiceSchehma)
  })

  const { categories, loading: loadingCategories } = useCategories()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlerSubmitInvoice = (data: IInvoiceForm) => {
    console.log(data)
    // const dataInvoice: IInvoiceForm = {
    //   ...data,
    //   'value': parseBRLMoneyToNumber(String(data.value)) as number
    // }

    // handleCreateInvoice(dataInvoice)
  }

  const hasInstallments = useWatch({ control, name: 'isInstallments' })

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
        onSubmit={handleSubmit(handlerSubmitInvoice)}
        className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-4">
        <Input
          {...register('name')}
          id="name"
          label="Nome da Fatura"
          classNameWrapper="col-span-2"
          placeholder="Example"
          error={errors.name?.message}
        />

        <Input
          {...register('value')}
          id="value"
          label="Valor Total"
          type="number"
          error={errors.value?.message}
          onChange={e => {
            const num = Number(e.target.value)

            // CHAMA O onChange DO RHF!!!
            register('value').onChange(e)

            // GARANTE QUE É NUMBER
            setValue('value', num, { shouldValidate: true })
          }}
          placeholder="100"
        />

        <div className="flex items-center gap-1.5 mt-6">
          <Controller
            control={control}
            name="isInstallments"
            rules={{
              required: true
            }}
            render={({ field }) => (
              <Switch
                id="installments"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <Label
            htmlFor="installments"
            className="cursor-pointer select-none">
            Parcelado?
          </Label>
        </div>

        <Controller
          control={control}
          name="amountInstallments"
          render={({ field }) => (
            <Select
              {...field}
              classNameWrapper={cn('hidden col-span-2', hasInstallments ? 'block' : '')}
              placeholder="Quantidade de parcelas"
              label="Quantidade de parcelas"
              value={String(field.value)}
              options={Array.from({ length: 100 }).map((_, i) => ({
                label: `${i + 1}x`,
                value: String(i + 1),
              }))}
            />
          )}
        />


        <Controller
          control={control}
          name="typeDebt"
          render={({ field }) => (
            <Select
              {...field}
              id="debt"
              label="Tipo da dívida"
              classNameWrapper="col-span-2"
              options={DEBT_OPTIONS}
              error={errors.typeDebt?.message}
              value={String(field.value)}
              onChange={val => field.onChange(Number(val))}
            />
          )}
        />

        <Controller
          control={control}
          name="categories"
          render={({ field }) => (
            <Select
              {...field}
              id="categories"
              label="Categorias"
              multiple
              loading={loadingCategories}
              placeholder="Selecione um ou mais categoria(s)"
              classNameWrapper="col-span-2"
              error={errors.categories?.message}
              options={categories}
              value={field.value}
            />
          )}
        />

        <Controller
          control={control}
          name="dueDate"
          render={({ field }) => (
            <DatePicker
              {...field}
              id="dueDate"
              label="Data de vencimento"
              value={field.value}
              classNameWrapper="col-span-2"
              onChange={(date) => field.onChange(date)}
              error={errors.dueDate?.message}
            />
          )}
        />

        <Button
          className="col-span-2 justify-center h-12"
          // disabled={loadingCreateInvoice}
          // loading={loadingCreateInvoice}
          type="submit">
          Criar Fatura
        </Button>
      </form>
    </div>
  )
}