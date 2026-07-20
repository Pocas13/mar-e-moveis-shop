import { prisma } from "@/lib/prisma";
import { formatarEuros } from "@/lib/precos";
import Link from "next/link";

export default async function CatalogoPage() {
  const produtos = await prisma.produto.findMany({
    where: { ativo: true },
    include: { categoria: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* HERO — imagem genérica de exemplo; troca por foto real em public/marca/hero-1.jpg quando a tiveres */}
      <section
        className="relative rounded-lg overflow-hidden bg-areia-200 mb-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholders/hero.svg')" }}
      >
        <div className="relative px-8 py-20 sm:py-28 max-w-2xl bg-areia-50/70 backdrop-blur-[2px]">
          <p className="uppercase tracking-[0.2em] text-xs text-mare-600 mb-4">Mobiliário para toda a casa</p>
          <h1 className="font-display italic text-4xl sm:text-5xl text-tinta-900 leading-tight mb-5">
            Peças simples,<br />feitas para durar
          </h1>
          <p className="text-tinta-700 mb-8 max-w-md">
            A Mar e Móveis reúne mobiliário de qualidade para a tua casa, com um design sereno e atemporal.
          </p>
          <a href="#catalogo" className="inline-block bg-mare-700 text-white px-6 py-3 rounded-md hover:bg-mare-600 transition-colors">
            Ver catálogo
          </a>
        </div>
      </section>

      <div id="catalogo" className="mb-10">
        <p className="uppercase tracking-[0.2em] text-xs text-mare-600 mb-2">Catálogo</p>
        <h2 className="font-display text-3xl text-tinta-900 mb-2">As nossas peças</h2>
      </div>

      {produtos.length === 0 ? (
        <p className="text-tinta-500">Ainda não há produtos no catálogo.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {produtos.map((produto) => (
            <Link
              key={produto.id}
              href={`/produtos/${produto.slug}`}
              className="group border border-areia-300 rounded-sm overflow-hidden bg-white hover:border-mare-500 transition-colors"
            >
              <div className="aspect-square bg-areia-100 flex items-center justify-center text-areia-300 overflow-hidden">
                {produto.imagens[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={produto.imagens[0]}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-xs">Sem imagem</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide text-tinta-500">{produto.categoria.nome}</p>
                <h2 className="font-display text-lg text-tinta-900">{produto.nome}</h2>
                <p className="mt-2 font-semibold">{formatarEuros(Number(produto.preco))}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
