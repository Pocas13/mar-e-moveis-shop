import { prisma } from "@/lib/prisma";
import { formatarEuros } from "@/lib/precos";
import { notFound } from "next/navigation";
import BotaoAdicionarCarrinho from "@/components/BotaoAdicionarCarrinho";

export default async function ProdutoPage({ params }: { params: { id: string } }) {
  const produto = await prisma.produto.findUnique({
    where: { slug: params.id },
    include: { categoria: true },
  });

  if (!produto || !produto.ativo) notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="aspect-square bg-areia-100 rounded-lg overflow-hidden flex items-center justify-center text-areia-300">
        {produto.imagens[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={produto.imagens[0]} alt={produto.nome} className="w-full h-full object-cover" />
        ) : (
          <span>Sem imagem</span>
        )}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-tinta-500">{produto.categoria.nome}</p>
        <h1 className="font-display text-3xl mb-4">{produto.nome}</h1>
        <p className="text-2xl font-semibold mb-4">{formatarEuros(Number(produto.preco))}</p>
        <p className="text-tinta-700 mb-6 whitespace-pre-line">{produto.descricao}</p>

        <dl className="grid grid-cols-2 gap-y-1 text-sm text-tinta-500 mb-8">
          {produto.material && (
            <>
              <dt>Material</dt>
              <dd>{produto.material}</dd>
            </>
          )}
          {produto.largura_cm && (
            <>
              <dt>Dimensões (L×A×P)</dt>
              <dd>
                {produto.largura_cm}×{produto.altura_cm}×{produto.profundidade_cm} cm
              </dd>
            </>
          )}
          <dt>Stock disponível</dt>
          <dd>{produto.stock} unidades</dd>
        </dl>

        <BotaoAdicionarCarrinho produtoId={produto.id} />
      </div>
    </div>
  );
}
