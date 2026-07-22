# Produção: Vercel, Neon, Cloudinary e Sage

## Vercel e Neon
A integração Neon-Vercel deve criar `DATABASE_URL`. Confirme em **Vercel → Project → Settings → Environment Variables** e aplique-a a Production, Preview e Development conforme necessário.

Adicione também `NEXTAUTH_URL`, `NEXTAUTH_SECRET` e `NEXT_PUBLIC_SITE_URL`. Depois de alterar variáveis, faça um novo deploy.

## Cloudinary
Crie uma conta Cloudinary e copie Cloud name, API key e API secret para as variáveis `CLOUDINARY_*`. Em produção, a rota de upload recusa gravar no disco da Vercel quando o Cloudinary não está configurado.

## Sage
1. Registe uma aplicação no portal Sage Developer.
2. Configure o callback exatamente como `https://SEU-DOMINIO/api/admin/sage/callback`.
3. Adicione as variáveis `SAGE_CLIENT_ID`, `SAGE_CLIENT_SECRET`, `SAGE_REDIRECT_URI` e `SAGE_TOKEN_ENCRYPTION_KEY`.
4. Faça deploy e entre em Administração → Sage → Ligar conta Sage.
5. Depois de escolher e validar a empresa, configure `SAGE_SALES_LEDGER_ACCOUNT_ID` e `SAGE_TAX_RATE_ID`.
6. Só então altere `SAGE_MODE=live` e faça novo deploy.

Os tokens OAuth ficam cifrados na tabela `SageConnection` e são renovados automaticamente.
