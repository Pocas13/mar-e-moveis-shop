# Mar e Moveis Shop

Loja online de mobiliario desenvolvida em Next.js, Prisma e PostgreSQL.

## Atualizar no Windows

1. Copiar o conteudo do ZIP para `D:\mar-e-moveis-shop`.
2. Manter o ficheiro `.env` existente.
3. Executar:

```powershell
cd D:\mar-e-moveis-shop
powershell -ExecutionPolicy Bypass -File .\scripts\atualizar.ps1
```

O script organiza ficheiros antigos, instala dependencias, valida e atualiza a base de dados, gera os dados de demonstracao, verifica TypeScript e executa o build.

Depois:

```powershell
npm run dev
```

Abrir `http://localhost:3004`.

## Acessos de demonstracao

- Administrador: `admin@marmoveis.pt` / `admin123`
- Cliente: `ana.silva@demo.pt` / `cliente123`

## Documentacao

Consultar a pasta `docs/` para instalacao, dados de demonstracao, integracao Sage e estrutura do projeto.
