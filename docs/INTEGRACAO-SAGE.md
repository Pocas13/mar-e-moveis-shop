# Integração Sage One Portugal — estado real

## Estado atual

O projeto contém uma base técnica para a API Sage One PT v2, mas a ligação **não fica ativa apenas com a instalação do ZIP**.

Já existe:

- cliente HTTP com assinatura HMAC-SHA1 exigida pela API PT v2;
- leitura do catálogo de produtos por SKU;
- preparação para associar produtos e clientes aos respetivos IDs Sage;
- preparação para emitir uma fatura apenas depois do pagamento confirmado;
- registos de auditoria das chamadas de integração.

Ainda é necessário implementar/configurar:

- registar uma aplicação no portal Sage One Developer;
- `client_id`, `client_secret` e `signing_secret`;
- callback OAuth 2.0 e autorização pelo proprietário da subscrição Sage;
- armazenamento seguro e renovação automática de access/refresh tokens;
- identificação dos códigos de IVA, contas contabilísticas e métodos de pagamento usados pela empresa;
- sincronização/criação de contactos antes da faturação;
- testes numa empresa Sage de teste antes de ativar faturação real.

## Limites importantes da API PT v2

A documentação PT v2 disponibiliza recursos para produtos, contactos e faturas de venda. Não apresenta um recurso próprio de encomendas de venda nem stock físico no recurso de produtos. Por isso:

- as encomendas continuam a ser geridas pelo Mar e Móveis;
- os produtos/preços podem ser lidos do Sage;
- a disponibilidade/stock deve manter uma fonte própria ou ser obtida através de outro módulo/API Sage que a licença concreta disponibilize;
- a fatura pode ser criada no Sage depois do pagamento confirmado.

## Variáveis previstas

Nunca colocar estes valores no Git ou dentro de ZIPs partilhados:

```env
SAGE_CLIENT_ID=
SAGE_CLIENT_SECRET=
SAGE_SIGNING_SECRET=
SAGE_REDIRECT_URI=http://localhost:3004/api/integracoes/sage/callback
SAGE_ACCESS_TOKEN=
SAGE_REFRESH_TOKEN=
```

Antes da ativação real, confirmar exatamente qual é o produto Sage utilizado pela empresa. “Sage One”, “Sage for Accountants”, “Sage 50” e outras soluções Sage não usam necessariamente a mesma API.
