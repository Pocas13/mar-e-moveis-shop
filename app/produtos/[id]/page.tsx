import { prisma } from "@/lib/prisma";
import { formatarEuros } from "@/lib/precos";
import { notFound } from "next/navigation";
import BotaoAdicionarCarrinho from "@/components/BotaoAdicionarCarrinho";
import ProductShare from "@/components/ProductShare";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> { const { id } = await params; const p = await prisma.produto.findUnique({ where: { slug: id } }); return p ? { title: p.nome, description: p.descricao, openGraph: { title: p.nome, description: p.descricao, images: p.imagens[0] ? [p.imagens[0]] : [] } } : {}; }

export default async function ProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const produto = await prisma.produto.findUnique({ where: { slug: id }, include: { categoria: true, reviews: { where: { aprovado: true }, include: { user: true }, take: 6 } } });
  if (!produto || !produto.ativo) notFound();
  const relacionadas = await prisma.produto.findMany({ where: { ativo: true, categoriaId: produto.categoriaId, NOT: { id: produto.id } }, include: { categoria: true }, take: 4 });
  const imagens = produto.imagens.length ? produto.imagens : [""];
  return <div className="container-site py-8 sm:py-12">
    <nav className="mb-8 text-sm text-grafite-500"><Link href="/">Início</Link> <span className="mx-2">/</span> {produto.categoria.nome}</nav>
    <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
      <div className="grid gap-4 sm:grid-cols-2">{imagens.slice(0,4).map((imagem,i)=><div key={i} className={`overflow-hidden rounded-[2rem] bg-calcario-100 ${i===0?"sm:col-span-2 aspect-[4/3]":"aspect-square"}`}>{imagem?<img src={imagem} alt={`${produto.nome} — imagem ${i+1}`} className="h-full w-full object-cover"/>:<div className="grid h-full place-items-center text-grafite-500">Imagem em preparação</div>}</div>)}</div>
      <div className="lg:sticky lg:top-28 lg:self-start"><p className="eyebrow">{produto.categoria.nome}</p><h1 className="mt-4 font-display text-4xl font-bold tracking-[-.045em] sm:text-6xl">{produto.nome}</h1><div className="mt-4 flex items-center gap-3 text-sm"><span className="text-amber-500">★★★★★</span><span className="text-grafite-500">{produto.reviews.length ? `${produto.reviews.length} avaliações` : "Novo produto"}</span></div><p className="mt-5 text-3xl font-bold">{formatarEuros(Number(produto.preco))}</p><p className="mt-7 whitespace-pre-line text-lg leading-8 text-grafite-500">{produto.descricao}</p>
        <div className="my-7 grid grid-cols-3 gap-2 text-center text-xs"><div className="rounded-2xl bg-calcario-100 p-3"><b className="block text-sm text-grafite-900">{produto.stock>0?"Em stock":"Por encomenda"}</b>Disponibilidade</div><div className="rounded-2xl bg-calcario-100 p-3"><b className="block text-sm text-grafite-900">3 opções</b>Entrega</div><div className="rounded-2xl bg-calcario-100 p-3"><b className="block text-sm text-grafite-900">Seguro</b>Pagamento</div></div>
        <BotaoAdicionarCarrinho produtoId={produto.id}/>
        <div className="mt-5 grid gap-3"><details className="product-detail" open><summary>Características e materiais</summary><div>{produto.material&&<p><b>Material:</b> {produto.material}</p>}<p><b>Referência:</b> {produto.sku}</p></div></details><details className="product-detail"><summary>Medidas</summary><div>{produto.largura_cm ? `${produto.largura_cm} cm (L) × ${produto.altura_cm ?? "—"} cm (A) × ${produto.profundidade_cm ?? "—"} cm (P)` : "Medidas a confirmar com a equipa."}</div></details><details className="product-detail"><summary>Entrega e levantamento</summary><div>Disponível para levantamento, entrega própria em zonas elegíveis ou envio por transportadora. O valor é apresentado no checkout.</div></details><details className="product-detail"><summary>Cuidados e garantia</summary><div>Conserve a documentação da compra e siga as instruções específicas de limpeza e montagem fornecidas com o produto.</div></details></div>
        <div className="mt-8"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-grafite-500">Partilhar</p><ProductShare titulo={produto.nome}/></div>
      </div>
    </div>
    {relacionadas.length>0&&<section className="py-20"><p className="eyebrow">Complete o ambiente</p><h2 className="mt-3 font-display text-4xl font-bold">Também pode gostar</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{relacionadas.map(p=><Link href={`/produtos/${p.slug}`} key={p.id} className="product-card group"><div className="product-image">{p.imagens[0]?<img src={p.imagens[0]} alt={p.nome}/>:null}</div><h3 className="mt-4 font-display text-lg font-bold">{p.nome}</h3><p className="mt-2 font-bold">{formatarEuros(Number(p.preco))}</p></Link>)}</div></section>}
  </div>;
}
