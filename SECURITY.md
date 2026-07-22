# Seguranca

## Reportar uma vulnerabilidade

Nao publicar vulnerabilidades, credenciais ou dados pessoais numa Issue publica.
Comunicar diretamente ao responsavel do projeto por um canal privado.

O reporte deve incluir:

- area afetada;
- passos de reproducao;
- impacto esperado;
- versao ou commit analisado;
- proposta de correcao, quando existir.

## Credenciais

Nunca entram no Git:

- `.env` e respetivos backups;
- chaves Stripe e segredos de webhook;
- credenciais e tokens Sage;
- credenciais PostgreSQL;
- chaves Resend;
- segredos NextAuth e cron.

Se uma credencial for enviada por engano, deve ser revogada e substituida,
mesmo que o commit seja apagado posteriormente.

## Dependencias

Os avisos do `npm audit` devem ser analisados individualmente. Nao executar
`npm audit fix --force` sem validar as alteracoes, porque pode introduzir versoes
incompativeis do Next.js, Prisma, Stripe ou outras dependencias criticas.
