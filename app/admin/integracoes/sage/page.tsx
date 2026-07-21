import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SagePage() {
  const configurado = Boolean(process.env.SAGE_ACCESS_TOKEN && process.env.SAGE_SIGNING_SECRET);
  const [produtosLigados, clientesLigados, faturasLigadas, ultimoLog] = await Promise.all([
    prisma.produto.count({ where: { sageProductId: { not: null } } }),
    prisma.user.count({ where: { sageContactId: { not: null } } }),
    prisma.encomenda.count({ where: { sageInvoiceId: { not: null } } }),
    prisma.integracaoLog.findFirst({ where: { tipo: { startsWith: "SAGE" } }, orderBy: { createdAt: "desc" } }),
  ]);
  return <div>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="eyebrow">Integrações</p><h1 className="mt-2 font-display text-3xl font-bold">Sage</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-grafite-500">Sincronização de catálogo e emissão de faturas apenas após confirmação do pagamento.</p></div><span className={`status-pill ${configurado ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-900"}`}>{configurado ? "Credenciais presentes" : "Não configurado"}</span></div>
    <div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="metric"><p className="text-sm text-grafite-500">Produtos associados</p><p className="mt-2 text-3xl font-bold">{produtosLigados}</p></div><div className="metric"><p className="text-sm text-grafite-500">Clientes associados</p><p className="mt-2 text-3xl font-bold">{clientesLigados}</p></div><div className="metric"><p className="text-sm text-grafite-500">Faturas registadas</p><p className="mt-2 text-3xl font-bold">{faturasLigadas}</p></div></div>
    <section className="mt-8 rounded-3xl border border-calcario-200 p-6"><h2 className="font-display text-xl font-bold">Estado da implementação</h2><div className="mt-5 grid gap-3 text-sm"><p>✓ Cliente técnico para pedidos autenticados e assinados</p><p>✓ Sincronização de códigos e preços dos produtos</p><p>✓ Registo de fatura na encomenda após cobrança confirmada</p><p>✓ Logs e tentativas repetidas para falhas temporárias</p><p className="text-amber-800">○ Falta inserir e validar credenciais reais da empresa</p><p className="text-amber-800">○ Falta mapear impostos, contas contabilísticas e séries documentais</p><p className="text-amber-800">○ Falta testar a emissão num ambiente Sage autorizado</p></div></section>
    <section className="mt-6 rounded-3xl bg-calcario-100 p-6"><h2 className="font-display text-xl font-bold">Última atividade</h2>{ultimoLog ? <div className="mt-3 text-sm"><p><b>{ultimoLog.tipo}</b> · {ultimoLog.estado}</p><p className="mt-1 text-grafite-500">{ultimoLog.createdAt.toLocaleString("pt-PT")}</p>{ultimoLog.erro && <p className="mt-3 rounded-xl bg-red-50 p-3 text-red-700">{ultimoLog.erro}</p>}</div> : <p className="mt-3 text-sm text-grafite-500">Ainda não existem pedidos reais ao Sage.</p>}</section>
    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950"><b>Importante:</b> a presença de credenciais não prova que a integração está operacional. Antes de ativar faturação automática, devem ser feitos testes controlados e confirmado o mapeamento fiscal no Sage.</div>
  </div>;
}
