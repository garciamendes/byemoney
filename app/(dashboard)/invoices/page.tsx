"use client";

export default function InvoicesPage() {
  const invoices = [
    { id: "1", title: "Energia", value: 180.50, status: "pago" },
    { id: "2", title: "Internet", value: 120.00, status: "pendente" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Minhas Faturas</h1>

      <div className="grid gap-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-slate-800 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{invoice.title}</h2>
              <p className="text-slate-400">
                {invoice.status === "pago" ? "✅ Pago" : "⏰ Pendente"}
              </p>
            </div>
            <span className="text-indigo-400 font-medium">
              R$ {invoice.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
