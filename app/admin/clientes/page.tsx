import { prisma } from "@/lib/prisma";
import { formatarEuros } from "@/lib/precos";

export const dynamic = "force-dynamic";

export default async function AdminClientesPage() {
  const clientes = await prisma.user.findMany({
    where: { role: "CLIENTE" },
    include: {
      encomendas: { select: { total: true, estado: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-tinta-900 mb-6">Clientes</h1>

      {clientes.length === 0 ? (
        <p className="text-tinta-500">Ainda não há clientes registados.</p>
      ) : (
        <table className="w-full text-sm bg-white border border-areia-300 rounded-lg overflow-hidden">
          <thead className="bg-areia-100 text-left">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Empresa</th>
              <th className="p-3">Email</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Encomendas</th>
              <th className="p-3">Total gasto</th>
              <th className="p-3">Cliente desde</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => {
              const totalGasto = c.encomendas
                .filter((e) => e.estado !== "CANCELADA")
                .reduce((soma, e) => soma + Number(e.total), 0);
              return (
                <tr key={c.id} className="border-t border-areia-100">
                  <td className="p-3 text-tinta-900">{c.nome}</td>
                  <td className="p-3 text-tinta-500">{c.empresaNome ?? "—"}</td>
                  <td className="p-3 text-tinta-500">{c.email}</td>
                  <td className="p-3 text-tinta-500">{c.telefone ?? "—"}</td>
                  <td className="p-3">{c.encomendas.length}</td>
                  <td className="p-3">{formatarEuros(totalGasto)}</td>
                  <td className="p-3 text-tinta-500">{c.createdAt.toLocaleDateString("pt-PT")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
