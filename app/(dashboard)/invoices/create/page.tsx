"use client";

export default function CreateInvoicePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nova Fatura</h1>
      <form
        className="flex flex-col gap-4 w-96 bg-slate-900 p-6 rounded-lg"
      >
        <input
          name="title"
          placeholder="Título"
          className="border border-slate-700 bg-transparent text-white px-3 py-2 rounded"
          required
        />
        <input
          name="value"
          placeholder="Valor"
          type="number"
          step="0.01"
          className="border border-slate-700 bg-transparent text-white px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 py-2 rounded hover:bg-indigo-700 transition-all"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
