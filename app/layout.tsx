import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Providers from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavSessao from "@/components/NavSessao";

export const metadata: Metadata = {
  title: "Mar e Móveis — Mobiliário para a tua casa",
  description: "Mar e Móveis: mobiliário simples e sereno para toda a casa.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt">
      <body>
        <Providers>
          <header className="bg-areia-50">
            <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
              <Link href="/" className="flex items-center gap-3">
                {/* Sem logótipo ainda — troca por <img src="/marca/logotipo.png" ... /> quando o tiveres */}
                <span className="font-display italic text-3xl tracking-tight text-tinta-900">Mar e Móveis</span>
              </Link>
              <div className="flex items-center gap-7 text-sm text-tinta-700">
                <Link href="/" className="hover:text-mare-700 transition-colors">Catálogo</Link>
                <Link href="/carrinho" className="hover:text-mare-700 transition-colors">Carrinho</Link>
                <NavSessao session={session} />
              </div>
            </nav>
            <div className="h-px bg-gradient-to-r from-transparent via-prata-500 to-transparent" />
          </header>
          <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
          <footer className="mt-24 border-t border-areia-300 py-10">
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-6 text-sm text-tinta-500">
              <div>
                <p className="font-display italic text-xl text-tinta-900 mb-1">Mar e Móveis</p>
                <p>Mobiliário simples e sereno para toda a casa.</p>
              </div>
              <div>
                {/* Preenche com a morada real */}
                <p>[morada a preencher]</p>
                <p>[cidade a preencher]</p>
              </div>
              <div>
                {/* Preenche com o contacto real */}
                <p>[telefone a preencher]</p>
                <p>geral@marmoveis.pt</p>
              </div>
            </div>
            <p className="text-center text-xs text-tinta-500 mt-8">© {new Date().getFullYear()} Mar e Móveis</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
