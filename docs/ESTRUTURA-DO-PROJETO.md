# Estrutura do projeto

## Pastas principais

- `app/`: paginas, layouts e rotas da aplicacao Next.js.
- `components/`: componentes reutilizaveis da interface.
- `lib/`: servicos internos, autenticacao, email, filas, Stripe e faturacao.
- `prisma/`: schema, migracoes e dados de demonstracao.
- `public/`: imagens e ficheiros publicos.
- `scripts/`: ferramentas oficiais de manutencao para Windows.
- `docs/`: documentacao tecnica e funcional.

## Ficheiros que devem existir na raiz

- `.env`: configuracao local e credenciais. Nunca deve ser enviado para Git.
- `.env.example`: modelo sem credenciais.
- `.gitignore`
- `middleware.ts`
- `next.config.js`
- `package.json` e `package-lock.json`
- `postcss.config.js`
- `tailwind.config.js`
- `tsconfig.json`
- `README.md`

## Ficheiros gerados localmente

- `node_modules/`: dependencias instaladas; nao entra no ZIP nem no Git.
- `.next/`: compilacao/cache do Next.js; pode ser apagada em qualquer altura.
- `tsconfig.tsbuildinfo`: cache do TypeScript; pode ser apagada.
- `atualizacao.log`: resultado da ultima atualizacao; pode ser apagado depois de validado.

## Backups do .env

O atualizador move ficheiros `.env.backup-*` para uma pasta separada, ao lado do projeto:

`D:\mar-e-moveis-shop-backups`

Isto evita credenciais duplicadas e ficheiros desnecessarios dentro do codigo-fonte.
