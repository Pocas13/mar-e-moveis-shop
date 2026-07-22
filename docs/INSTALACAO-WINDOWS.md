# Instalação e atualização no Windows

## Requisitos

- Node.js 20 ou superior.
- npm 10 ou superior.
- PostgreSQL em execução.
- Base de dados `mar_e_moveis_shop`.

## Preparar o ambiente

1. Copiar `.env.example` para `.env` se ainda não existir.
2. Corrigir `DATABASE_URL`, `NEXTAUTH_URL` e `NEXTAUTH_SECRET`.
3. Manter Stripe, Sage e Resend vazios enquanto não estiverem configurados.

O `.env` nunca deve ser enviado para Git ou incluído em ZIPs partilhados.

## Atualizar num único bloco

```powershell
cd D:\mar-e-moveis-shop
powershell -ExecutionPolicy Bypass -File .\scripts\atualizar.ps1
```

O script:

1. move backups antigos do `.env` para uma pasta externa;
2. elimina caches locais;
3. executa `npm ci`;
4. formata e valida o schema Prisma;
5. aplica as alterações à base de desenvolvimento;
6. gera o Prisma Client;
7. cria/atualiza dados fictícios;
8. valida TypeScript;
9. executa o build.

O resultado fica em `atualizacao.log`, que é ignorado pelo Git.

## Arrancar

```powershell
npm run dev
```

Abrir `http://localhost:3004`.

Se a porta estiver ocupada:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\libertar-porta-3004.ps1
npm run dev
```

Ou usar temporariamente:

```powershell
npm run dev:alt
```

## Produção

Antes de produção:

- definir `SEED_DEMO=false`;
- remover ou trocar todas as contas fictícias;
- configurar credenciais reais através de um gestor de segredos;
- testar pagamentos e webhooks em ambiente de teste;
- fazer backup da base antes de migrações;
- validar legalmente textos, cookies, RGPD, entregas e faturação.
