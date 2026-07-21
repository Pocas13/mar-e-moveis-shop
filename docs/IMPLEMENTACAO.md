# Implementação Mar e Móveis

## Correções desta revisão

- Enums Prisma convertidos para a sintaxe válida da versão 5.17.
- Campo opcional `empresaNome` adicionado ao modelo, registo e área administrativa.
- Schema Prisma validado e índices/relações revistos.
- Fila de integrações tipada, com reclamação atómica e retry progressivo.
- Resend inicializado apenas quando existe chave, evitando falhas de build.
- Checkout passa a validar stock e a remover encomendas incompletas quando o Stripe falha.
- Carrinho só é abatido após confirmação efetiva do pagamento.
- Multibanco não desencadeia faturação enquanto `payment_status` não for `paid`.
- Webhooks de pagamento falhado ou sessão expirada cancelam apenas encomendas ainda pendentes.
- Next.js atualizado para 15.5.21 (Maintenance LTS), NextAuth para 4.24.15 e Stripe SDK atualizado.
- Páginas e endpoints dependentes de dados marcados como dinâmicos.
- Parâmetros dinâmicos e `searchParams` adaptados à API assíncrona do Next.js 15.

## Identidade separada

- Paleta, tipografia, homepage, navegação, cartões, ficha de produto e imagens próprias.
- Sem referências públicas ou técnicas a outras marcas ou lojas.
- Posicionamento do Mar e Móveis como loja independente para consumidor final e empresas.

## Operação

- Jobs persistentes em PostgreSQL, adequados ao volume inicial indicado.
- Idempotência por `chaveUnica` para impedir faturação duplicada.
- Endpoint cron protegido por `CRON_SECRET`.
- Logs de pedido, resposta e erro para Sage e restantes integrações.

## Antes da produção

1. Configurar credenciais reais PostgreSQL, Stripe, Sage, DHL e Resend.
2. Testar cartão, MB WAY, Multibanco e webhooks em modo de teste.
3. Confirmar no Sage os IDs e regras fiscais da empresa.
4. Trocar a password inicial do administrador.
5. Preencher telefone, email, morada e textos legais.
6. Configurar cookies, RGPD, devoluções e livro de reclamações eletrónico.
7. Fazer backup da base antes de cada migração de produção.
