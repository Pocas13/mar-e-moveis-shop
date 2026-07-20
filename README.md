# Mar e Móveis

Loja online de mobiliário para **clientes finais** (B2C). Catálogo com preço sempre
visível, registo/login de clientes, carrinho, checkout, histórico de encomendas,
e um backoffice completo (produtos, stock, encomendas, clientes).

Este projeto é irmão da Eclove (que ficou só para revenda a lojas do setor) — mesma
base técnica, mercado diferente.

## Stack
- Next.js 14 (App Router) + TypeScript
- PostgreSQL + Prisma
- NextAuth (Auth.js) — papéis: CLIENTE, ADMIN
- Tailwind CSS
- Stripe (pagamentos)
- Resend (emails transacionais)

## 1. Base de dados
Cria uma grátis em [neon.tech](https://neon.tech) ou [supabase.com](https://supabase.com) —
copia o "connection string" para `DATABASE_URL` no `.env`. **Usa uma base de dados
diferente da Eclove** (são negócios separados).

## 2. Stripe
Conta em [stripe.com](https://stripe.com) (modo de teste) → `STRIPE_SECRET_KEY` e
`STRIPE_PUBLISHABLE_KEY`. Webhook local: `stripe listen --forward-to localhost:3000/api/checkout/webhook`.

## 3. Emails (opcional para começar)
Conta grátis em [resend.com](https://resend.com) → `RESEND_API_KEY`.

## Instalação

```bash
npm install
cp .env.example .env
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Login admin de teste: `admin@marmoveis.pt` / `admin123` — muda a password antes de produção.

## O que já está feito
- Catálogo com preço sempre visível (sem gating)
- Registo e login de clientes (`/registo`, `/entrar`)
- Carrinho, checkout com Stripe, histórico de encomendas, reencomendar
- Categorias com subcategorias (ex: Camas → Cama de Casal / Cama de Solteiro)
- Backoffice: dashboard, produtos (criar/editar/desativar), gestão de encomendas,
  **lista de clientes** (`/admin/clientes`)
- Emails automáticos de confirmação de encomenda e mudança de estado

## Ainda por fazer
- Logótipo e fotos reais (por agora usa as mesmas ilustrações genéricas de exemplo)
- Preencher morada/telefone reais no rodapé (`app/layout.tsx`)
- Faturação certificada (Vendus, InvoiceXpress, Moloni)
- Deploy: Vercel + Neon/Supabase + Stripe (modo live) + Resend

## Estrutura
```
app/
  page.tsx                        catálogo (preço sempre visível)
  produtos/[id]/                  ficha de produto
  carrinho/ checkout/             compra
  entrar/ registo/                autenticação de cliente
  conta/                          histórico de encomendas, reencomendar
  admin/
    dashboard/ produtos/ produtos/novo/ produtos/[id]/editar/
    encomendas/ clientes/
  api/ ...

lib/
  prisma.ts auth.ts precos.ts stripe.ts email.ts faturacao.ts

prisma/
  schema.prisma    User (CLIENTE/ADMIN), Categoria com subcategorias, Produto (preço único)...
  seed.ts          dados de teste
```
