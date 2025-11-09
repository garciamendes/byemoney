import { Divider } from "@/components/divider"
import Input from "@/components/inputCustom"
import { MoneyInput } from "@/components/inputMoney"
import { MultiSelect } from "@/components/multipleSelect"
import { Button } from "@/components/retroui/Button"
import { Select } from "@/components/retroui/Select"
import { useInvoice } from "@/hooks/invoice"
import { formatToMoney } from "@/utils"
import { XIcon } from "@phosphor-icons/react"

export const CreateInvoice = () => {
  const { openCreateInvoice, setOpenCreateInvoice } = useInvoice()
  const options = [
    { label: 'Alimentação', value: 'food' },
    { label: 'Transporte', value: 'transport' },
    { label: 'Educação', value: 'education' },
  ]

  return (
    <div
      data-open={openCreateInvoice}
      className="absolute overflow-y-auto z-50 h-full bg-background p-2 w-full lg:w-[600px] right-0 data-[open=false]:translate-x-[9999px] data-[open=true]:translate-x-0 border-l transition-all duration-300">
      <div className="flex justify-between items-center pb-0.5">
        <h1 className="text-xl">Nova Fatura</h1>

        <XIcon size={25} className="cursor-pointer" onClick={() => setOpenCreateInvoice(false)} />
      </div>
      <Divider />

      <form
        className="flex flex-col mt-5 gap-4">
        <Input
          type="text"
          name="title_invoice"
          id="title_invoice"
          label="Nome da Fatura"
          placeholder="Example"
        />

        <MoneyInput
          inputMode="numeric"
          name="price_invoice"
          id="price_invoice"
          label="Valor Total"
          placeholder={formatToMoney(100)}
        />

        <MultiSelect
          name="debt"
          id="debt"
          label="Categorias"
          options={options}
        />

        <Button type="submit">Criar Fatura</Button>
      </form>
    </div>
  )
}