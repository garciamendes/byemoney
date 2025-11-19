'use client'

import { Badge } from "@/components/retroui/Badge"
import { Button } from "@/components/retroui/Button"
import {
  Table,
} from "@/components/retroui/Table"
import { formatToMoney } from "@/utils"
import {
  DEBT,
  DEBT_TITLE,
  DEBT_TYPE,
  STATUS_INVOICE,
  STATUS_INVOICE_TITLE,
  STATUS_INVOICE_TYPE
} from "./constants"
import { PlusIcon } from "@phosphor-icons/react"
import { useInvoice } from "@/hooks/invoice"

const invoices = [
  {
    invoice: "Assaí",
    status: STATUS_INVOICE.OPEN,
    totalAmount: 250.00,
    installments: 2,
    total_installments_paided: 1,
    debt: DEBT.CART,
  },
  {
    invoice: "Emprestimo cartão da KiKi",
    status: STATUS_INVOICE.PAIDED,
    totalAmount: 250.00,
    installments: 1,
    total_installments_paided: 1,
    debt: DEBT.LOAN,
  },
  {
    invoice: "Assaí",
    status: STATUS_INVOICE.OVERDUE,
    totalAmount: 1000.00,
    installments: 5,
    total_installments_paided: 1,
    debt: DEBT.CART,
  },
]

export default function HomePage() {
  const { setOpenCreateInvoice } = useInvoice()

  return (
    <div className="flex flex-col gap-3.5 px-2 w-full">
      <div className="flex gap-2 justify-end items-center">
        <Button className="flex flex-col" onClick={() => setOpenCreateInvoice(true)}>
          <div className="flex items-center gap-2 text-primary-foreground">
            Adicionar Fatura
          </div>
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <Table className="mb-6 mx-auto w-screen md:w-full">
          <Table.Header>
            <Table.Row>
              <Table.Head className="w-[400px]">Fatura</Table.Head>
              <Table.Head className="text-center">Valor Total</Table.Head>
              <Table.Head className="text-center">Dívida</Table.Head>
              <Table.Head className="text-center">Status</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {invoices.map((invoice, index) => (
              <Table.Row key={index}>
                <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
                <Table.Cell className="text-center">{formatToMoney(invoice.totalAmount)}</Table.Cell>
                <Table.Cell className="text-center">{DEBT_TITLE[invoice.debt as DEBT_TYPE]}</Table.Cell>
                <Table.Cell className="text-center">
                  <Badge
                    variant="solid"
                    size="sm"
                    color={invoice.status}>
                    {STATUS_INVOICE_TITLE[invoice.status as STATUS_INVOICE_TYPE]}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.Cell colSpan={3} className="text-paided-foreground">Total</Table.Cell>
              <Table.Cell className="text-center text-paided-foreground">{formatToMoney(250)}</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>

      <div className="flex gap-2.5 items-center justify-end">
        <Button>Voltar</Button>
        <Button>Próxima</Button>
      </div>
    </div>
  )
}