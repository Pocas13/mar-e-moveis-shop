# Mar e Móveis Shop

Plataforma privada de comércio eletrónico para venda de mobiliário, com catálogo,
carrinho, checkout, conta de cliente, administração e integrações externas.

> **Estado:** versão de desenvolvimento `0.9.0`. Não está pronta para produção nem
> para faturação real sem configuração e validação adicionais.

## Funcionalidades atuais

- Catálogo organizado por divisões e categorias.
- Produtos com imagens, medidas, materiais, preço e stock.
- Carrinho e checkout com identificação do cliente.
- Levantamento, entrega pela loja ou envio por transportadora.
- Conta de cliente e histórico de encomendas.
- Administração de produtos, clientes, encomendas e stock.
- Dados fictícios para testar as principais dinâmicas.
- Estrutura para Stripe, Resend e Sage One Portugal.
- Sitemap, robots e cabeçalhos básicos de segurança.

## Tecnologias

- Next.js 15 e React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth
- Stripe, Resend e Sage One — integrações condicionadas à configuração

## Requisitos

- Node.js 20 ou superior
- npm 10 ou superior
- PostgreSQL 17 recomendado
- Git

## Instalação no Windows

```powershell
cd D:\mar-e-moveis-shop
powershell -ExecutionPolicy Bypass -File .\scripts\atualizar.ps1
npm run dev
```

Abrir `http://localhost:3004`.

O ficheiro `.env` é local e nunca deve ser enviado para o GitHub. Usar
`.env.example` como referência.

## Acessos de demonstração

| Perfil | Email | Password |
|---|---|---|
| Administrador | `admin@marmoveis.pt` | `admin123` |
| Cliente | `ana.silva@demo.pt` | `cliente123` |

As passwords e todos os dados incluídos no seed são fictícios. Devem ser
substituídos antes de qualquer publicação.

## Comandos principais

```powershell
npm run dev              # servidor local na porta 3004
npm run typecheck        # valida TypeScript
npm run verify           # valida Prisma, gera cliente e verifica TypeScript
npm run build            # compilação de produção
npm run seed:demo        # cria/atualiza dados fictícios
npm run prisma:studio    # abre a interface Prisma Studio
npm run clean            # elimina caches e logs locais
```

## Estrutura

```text
app/          páginas, layouts e rotas Next.js
components/   componentes reutilizáveis
lib/          autenticação, dados, filas e integrações
prisma/       schema e seed de demonstração
public/       imagens e recursos públicos
scripts/      manutenção local para Windows
docs/         documentação técnica e funcional
.github/      validação automática e modelos de colaboração
```

## Git e GitHub

O fluxo recomendado está descrito em [`docs/GIT-E-GITHUB.md`](docs/GIT-E-GITHUB.md).
O GitHub Actions executa validação do Prisma, TypeScript e build em pushes e Pull
Requests para `main` ou `master`.

## Integrações

A existência de código para Stripe, Sage ou email não significa que as contas
estejam ligadas. Consultar [`docs/INTEGRACAO-SAGE.md`](docs/INTEGRACAO-SAGE.md)
e preencher apenas credenciais de teste antes da ativação real.

## Segurança e licença

- Consultar [`SECURITY.md`](SECURITY.md) antes de reportar problemas.
- O projeto é privado e proprietário. Consultar [`LICENSE`](LICENSE).
- Nunca colocar credenciais, dados de clientes ou documentos reais no Git.


## Gestão de catálogo

Consulte [Gestão de produtos e imagens](docs/GESTAO-DE-PRODUTOS-E-IMAGENS.md) para criar produtos, preparar fotografias e organizar descrições.
