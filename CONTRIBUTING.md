# Contribuir

O Mar e Moveis Shop e um projeto privado. Alteracoes devem ser pequenas,
rastreaveis e validadas antes de entrarem no ramo principal.

## Fluxo recomendado

1. Atualizar o ramo principal: `git pull --rebase origin main`.
2. Criar um ramo: `git switch -c feature/nome-curto` ou `fix/nome-curto`.
3. Fazer alteracoes sem incluir `.env`, caches, logs ou `node_modules`.
4. Executar `npm run verify` e `npm run build`.
5. Criar commits claros e focados.
6. Enviar o ramo e abrir Pull Request.

## Mensagens de commit

Usar preferencialmente:

- `feat: acrescenta metodo de entrega`
- `fix: corrige validacao do checkout`
- `docs: atualiza instalacao Windows`
- `chore: organiza dependencias`
- `refactor: simplifica cliente Sage`

## Regras

- Nunca inserir passwords, tokens ou dados reais de clientes.
- Nunca executar `npm audit fix --force` sem testar incompatibilidades.
- Nao emitir faturas Sage antes da confirmacao efetiva do pagamento.
- Dados de demonstracao devem permanecer claramente ficticios.
- Alteracoes ao schema Prisma devem incluir migracao e backup previo.
