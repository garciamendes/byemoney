import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 flex flex-col p-5 gap-4 border-r border-slate-800">
      <h2 className="text-xl font-semibold mb-6">Bye Money</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/invoices" className="hover:text-indigo-400">📄 Faturas</Link>
        <Link href="/invoices/create" className="hover:text-indigo-400">➕ Nova Fatura</Link>
        <Link href="/settings" className="hover:text-indigo-400 mt-auto">⚙️ Configurações</Link>
      </nav>
    </aside>
  );
}
