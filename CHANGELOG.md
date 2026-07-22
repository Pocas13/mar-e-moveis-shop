# Changelog

As alteracoes relevantes deste projeto ficam registadas neste ficheiro.
O projeto segue, quando aplicavel, [Semantic Versioning](https://semver.org/).

## [Nao publicado]

### A acrescentar
- Ligacao OAuth real ao Sage e validacao fiscal da emissao de documentos.
- Tabela comercial definitiva para entrega, levantamento, transportadora e montagem.
- Fotografias e textos finais dos produtos.
- Configuracao real de pagamentos e email.
- Testes automatizados adicionais para checkout, webhooks e administracao.

## [0.9.0] - 2026-07-22

### Adicionado
- Loja Next.js 15 com catalogo, carrinho, checkout e area de cliente.
- Administracao de produtos, clientes, encomendas e integracoes.
- Dados de demonstracao com produtos, clientes, encomendas e avaliacoes.
- Estrutura tecnica para Stripe, Resend e Sage One Portugal.
- Metodos de rececao: levantamento, entrega e transportadora.
- Sitemap, robots e cabecalhos basicos de seguranca.
- Script oficial de atualizacao para Windows.
- Documentacao organizada na pasta `docs/`.
- Workflow de validacao para GitHub Actions.

### Corrigido
- Tipagem Prisma do seed de demonstracao.
- Inicializacao tardia do Stripe para permitir builds sem credenciais.
- Uso invalido da utility `group` dentro de `@apply`.
- Tratamento de avisos npm no PowerShell sem falsos erros.

## Em desenvolvimento

- Criadas páginas próprias para todas as divisões e respetivas subdivisões.
- Criado catálogo completo com filtro por categoria.
- Criada página de novidades com paginação de 12 produtos.
- A página inicial passou a apresentar apenas uma seleção e a encaminhar para páginas próprias.
- Formulário de produto atualizado para até 8 imagens, ordenação e remoção.
- Upload local validado para JPG, PNG e WebP, com limite de 8 MB.
