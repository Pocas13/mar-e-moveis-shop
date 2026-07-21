# Correção e arranque no Windows

## 1. Substituir os ficheiros

Extraia este ZIP para uma pasta nova. Não copie `node_modules` nem `.next` do projeto antigo. Pode consultar o `.env` antigo para recuperar chaves externas, mas crie primeiro um `.env` novo com o script abaixo.

Requisitos: Node.js 20 ou superior e PostgreSQL em execução.

## 2. Confirmar a base de dados no pgAdmin

No pgAdmin:

1. Confirme que consegue abrir o servidor PostgreSQL com a password correta.
2. Em **Databases**, crie a base `mar_e_moveis_shop` caso ainda não exista.
3. Use preferencialmente o utilizador `postgres` durante o desenvolvimento local.

O erro `Authentication failed against database server` não é um erro do código: significa que o utilizador/password dentro de `DATABASE_URL` não coincide com o PostgreSQL local.

## 3. Criar o `.env` sem erros de codificação

Na raiz do projeto, abra PowerShell e execute:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\configurar-env.ps1
```

O script pede a password PostgreSQL, codifica caracteres especiais e cria também `NEXTAUTH_SECRET` e `CRON_SECRET`.

## 4. Validar tudo num único bloco

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verificar-projeto.ps1
```

Esse script usa o `package-lock.json` para instalar versões exatas, valida o schema, gera o Prisma Client, cria a migração, executa o seed, verifica TypeScript e compila o projeto.

## 5. Arrancar

```powershell
npm run dev
```

Abrir: `http://localhost:3004`

Se aparecer `EADDRINUSE`, existe outro processo na porta 3004:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\libertar-porta-3004.ps1
npm run dev
```

Em alternativa, sem terminar o processo existente:

```powershell
npm run dev:alt
```

Nesse caso abra `http://localhost:3005` e altere temporariamente `NEXTAUTH_URL` e `NEXT_PUBLIC_SITE_URL` no `.env` para a porta 3005.

## Conta administrativa de desenvolvimento

- Email: `admin@marmoveis.pt`
- Password inicial: `admin123`

Troque esta password antes de publicar o projeto.
