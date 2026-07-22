# Gestão de produtos e imagens

## Criar um produto

1. Entre como administrador.
2. Abra **Administração > Produtos > Novo produto**.
3. Preencha nome, descrição, SKU, categoria, preço, stock, material e medidas.
4. Adicione entre 3 e 8 fotografias.
5. A primeira fotografia é usada como capa no catálogo.
6. Grave o produto e confirme a página pública.

## Fotografias recomendadas

- Formato: JPG ou WebP.
- Proporção recomendada: 4:5 para a capa.
- Resolução recomendada: 1600 × 2000 px.
- Peso recomendado: até 500 KB por imagem depois de otimizada.
- Máximo aceite pelo formulário local: 8 MB por ficheiro.
- Sequência sugerida: capa, frente, lateral, detalhe, ambiente, medidas, acabamento e embalagem.

## Descrição recomendada

Inclua:

- função e estilo da peça;
- materiais e acabamentos;
- cor;
- medidas;
- necessidade de montagem;
- cuidados de limpeza;
- informação sobre variações naturais;
- conteúdo da embalagem;
- prazo ou condição de entrega.

## Desenvolvimento local e produção

Em desenvolvimento, as imagens enviadas pelo painel são guardadas em `public/uploads`.

Em alojamentos sem disco persistente, como a Vercel, essa pasta não deve ser usada como arquivo definitivo. Antes da publicação comercial deve ser configurado um serviço de imagens, como Cloudinary, Amazon S3 ou equivalente. A base de dados guarda apenas os URLs das imagens.

## Imagens de ambiente da demonstração

As imagens remotas usadas nas páginas de divisões servem apenas para visualizar o design. Antes da publicação final devem ser substituídas por fotografias próprias, imagens dos fornecedores com autorização ou conteúdos com licença comercial confirmada.
