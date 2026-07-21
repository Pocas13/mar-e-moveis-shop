import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Providers from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavSessao from "@/components/NavSessao";
import BrandMark from "@/components/BrandMark";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3004"),
  title: { default: "Mar e Móveis | Mobiliário para casas reais", template: "%s | Mar e Móveis" },
  description: "Mobiliário e decoração com compra segura, apoio próximo e opções de entrega adaptadas a cada produto.",
  openGraph: { title: "Mar e Móveis", description: "Uma casa bonita. Uma vida mais confortável.", type: "website", locale: "pt_PT", siteName: "Mar e Móveis" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return <html lang="pt"><body><Providers>
    <div className="bg-grafite-900 py-2.5 text-center text-xs font-semibold text-white">Entregas em Portugal Continental · Pagamentos seguros · Apoio personalizado</div>
    <header className="sticky top-0 z-40 border-b border-calcario-200 bg-calcario-50/95 backdrop-blur-xl">
      <nav className="container-site flex min-h-20 items-center justify-between gap-5">
        <Link href="/" aria-label="Página inicial"><BrandMark /></Link>
        <div className="hidden items-center gap-7 text-sm font-semibold lg:flex"><Link href="/#divisoes" className="hover:text-barro-600">Divisões</Link><Link href="/#novidades" className="hover:text-barro-600">Novidades</Link><Link href="/#inspiracao" className="hover:text-barro-600">Inspiração</Link><Link href="/entregas" className="hover:text-barro-600">Entregas</Link></div>
        <div className="flex items-center gap-3 text-sm font-semibold"><Link href="/#novidades" className="hidden rounded-full border border-calcario-300 px-4 py-2 sm:inline-flex">Pesquisar</Link><Link href="/carrinho" className="rounded-full bg-grafite-900 px-4 py-2 text-white hover:bg-barro-600">Carrinho</Link><NavSessao session={session} /></div>
      </nav>
    </header>
    <main>{children}</main>
    <footer className="mt-24 bg-grafite-900 py-14 text-white"><div className="container-site grid gap-10 md:grid-cols-4"><div className="md:col-span-2"><BrandMark inverse/><p className="mt-5 max-w-md text-sm leading-6 text-white/65">Mobiliário para viver a casa com conforto, funcionalidade e personalidade.</p><div className="mt-6 flex gap-3 text-sm"><span className="rounded-full border border-white/15 px-3 py-2">Instagram</span><span className="rounded-full border border-white/15 px-3 py-2">Facebook</span><span className="rounded-full border border-white/15 px-3 py-2">Pinterest</span></div></div><div><p className="font-display font-bold">Apoio ao cliente</p><div className="mt-4 grid gap-2 text-sm text-white/65"><Link href="/entregas">Entregas e levantamento</Link><Link href="/trocas-e-devolucoes">Trocas e devoluções</Link><Link href="/termos-e-condicoes">Termos e condições</Link><Link href="/privacidade">Privacidade e cookies</Link></div></div><div><p className="font-display font-bold">Contacto</p><div className="mt-4 space-y-2 text-sm text-white/65"><p>[telefone a preencher]</p><p>geral@marmoveis.pt</p><p>[morada a preencher]</p><a href="https://www.livroreclamacoes.pt/" target="_blank" rel="noreferrer">Livro de Reclamações</a></div></div></div><div className="container-site mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} Mar e Móveis. Todos os direitos reservados.</span><span>Pagamentos protegidos · Dados tratados segundo o RGPD</span></div></footer>
  </Providers></body></html>;
}
