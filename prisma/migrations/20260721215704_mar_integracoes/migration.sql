-- CreateEnum
CREATE TYPE "MetodoPagamento" AS ENUM ('CARTAO', 'MBWAY', 'MULTIBANCO', 'PAYPAL', 'REFERENCIA_OFFLINE');

-- CreateEnum
CREATE TYPE "IntegracaoEstado" AS ENUM ('PENDENTE', 'EM_CURSO', 'SUCESSO', 'ERRO');

-- CreateEnum
CREATE TYPE "JobEstado" AS ENUM ('PENDENTE', 'EM_CURSO', 'CONCLUIDO', 'FALHOU');

-- CreateEnum
CREATE TYPE "MovimentoTipo" AS ENUM ('ENTRADA', 'SAIDA', 'AJUSTE', 'RESERVA', 'LIBERTACAO');

-- CreateEnum
CREATE TYPE "CupaoTipo" AS ENUM ('PERCENTAGEM', 'VALOR_FIXO');

-- CreateEnum
CREATE TYPE "PontosTipo" AS ENUM ('COMPRA', 'RESGATE', 'BONUS', 'AJUSTE');

-- DropForeignKey
ALTER TABLE "CarrinhoItem" DROP CONSTRAINT "CarrinhoItem_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "CarrinhoItem" DROP CONSTRAINT "CarrinhoItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "EncomendaItem" DROP CONSTRAINT "EncomendaItem_encomendaId_fkey";

-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_userId_fkey";

-- AlterTable
ALTER TABLE "Encomenda" ADD COLUMN     "desconto" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "dhlTrackingNumber" TEXT,
ADD COLUMN     "enviadaEm" TIMESTAMP(3),
ADD COLUMN     "faturadaEm" TIMESTAMP(3),
ADD COLUMN     "metodoPagamento" "MetodoPagamento" NOT NULL DEFAULT 'CARTAO',
ADD COLUMN     "pagaEm" TIMESTAMP(3),
ADD COLUMN     "portes" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "sageInvoiceId" TEXT,
ADD COLUMN     "subtotal" DECIMAL(10,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "pesoKg" DOUBLE PRECISION,
ADD COLUMN     "sageProductId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "empresaNome" TEXT,
ADD COLUMN     "sageContactId" TEXT;

-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "reservado" INTEGER NOT NULL DEFAULT 0,
    "localizacao" TEXT,
    "lote" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimentacaoStock" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "tipo" "MovimentoTipo" NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "motivo" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "referencia" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovimentacaoStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertaStock" (
    "id" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "minimo" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "notificadoEm" TIMESTAMP(3),

    CONSTRAINT "AlertaStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cupao" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "tipo" "CupaoTipo" NOT NULL,
    "desconto" DECIMAL(10,2) NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "maximo" INTEGER,
    "usos" INTEGER NOT NULL DEFAULT 0,
    "compraMinima" DECIMAL(10,2),
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cupao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorito" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "texto" TEXT,
    "aprovado" BOOLEAN NOT NULL DEFAULT false,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscritor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscritor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pontos" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "saldo" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Pontos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PontosTransacao" (
    "id" TEXT NOT NULL,
    "pontosId" TEXT NOT NULL,
    "tipo" "PontosTipo" NOT NULL,
    "valor" INTEGER NOT NULL,
    "descricao" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PontosTransacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegracaoLog" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "estado" "IntegracaoEstado" NOT NULL DEFAULT 'PENDENTE',
    "encomendaId" TEXT,
    "pedido" JSONB,
    "resposta" JSONB,
    "erro" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegracaoLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationJob" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "estado" "JobEstado" NOT NULL DEFAULT 'PENDENTE',
    "payload" JSONB NOT NULL,
    "resultado" JSONB,
    "chaveUnica" TEXT,
    "tentativas" INTEGER NOT NULL DEFAULT 0,
    "ultimoErro" TEXT,
    "executarApos" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processadoEm" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegrationJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Stock_produtoId_idx" ON "Stock"("produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_produtoId_localizacao_key" ON "Stock"("produtoId", "localizacao");

-- CreateIndex
CREATE INDEX "MovimentacaoStock_produtoId_data_idx" ON "MovimentacaoStock"("produtoId", "data");

-- CreateIndex
CREATE UNIQUE INDEX "AlertaStock_produtoId_key" ON "AlertaStock"("produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "Cupao_codigo_key" ON "Cupao"("codigo");

-- CreateIndex
CREATE INDEX "Cupao_ativo_dataInicio_dataFim_idx" ON "Cupao"("ativo", "dataInicio", "dataFim");

-- CreateIndex
CREATE INDEX "Favorito_produtoId_idx" ON "Favorito"("produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorito_userId_produtoId_key" ON "Favorito"("userId", "produtoId");

-- CreateIndex
CREATE INDEX "Review_produtoId_aprovado_idx" ON "Review"("produtoId", "aprovado");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_produtoId_key" ON "Review"("userId", "produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscritor_email_key" ON "Subscritor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pontos_userId_key" ON "Pontos"("userId");

-- CreateIndex
CREATE INDEX "PontosTransacao_pontosId_data_idx" ON "PontosTransacao"("pontosId", "data");

-- CreateIndex
CREATE INDEX "IntegracaoLog_tipo_createdAt_idx" ON "IntegracaoLog"("tipo", "createdAt");

-- CreateIndex
CREATE INDEX "IntegracaoLog_encomendaId_idx" ON "IntegracaoLog"("encomendaId");

-- CreateIndex
CREATE UNIQUE INDEX "IntegrationJob_chaveUnica_key" ON "IntegrationJob"("chaveUnica");

-- CreateIndex
CREATE INDEX "IntegrationJob_estado_executarApos_idx" ON "IntegrationJob"("estado", "executarApos");

-- CreateIndex
CREATE INDEX "CarrinhoItem_produtoId_idx" ON "CarrinhoItem"("produtoId");

-- CreateIndex
CREATE INDEX "Categoria_parentId_idx" ON "Categoria"("parentId");

-- CreateIndex
CREATE INDEX "Encomenda_userId_createdAt_idx" ON "Encomenda"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Encomenda_estado_createdAt_idx" ON "Encomenda"("estado", "createdAt");

-- CreateIndex
CREATE INDEX "EncomendaItem_encomendaId_idx" ON "EncomendaItem"("encomendaId");

-- CreateIndex
CREATE INDEX "EncomendaItem_produtoId_idx" ON "EncomendaItem"("produtoId");

-- CreateIndex
CREATE INDEX "Endereco_userId_idx" ON "Endereco"("userId");

-- CreateIndex
CREATE INDEX "Produto_categoriaId_idx" ON "Produto"("categoriaId");

-- CreateIndex
CREATE INDEX "Produto_ativo_createdAt_idx" ON "Produto"("ativo", "createdAt");

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoStock" ADD CONSTRAINT "MovimentacaoStock_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertaStock" ADD CONSTRAINT "AlertaStock_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrinhoItem" ADD CONSTRAINT "CarrinhoItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarrinhoItem" ADD CONSTRAINT "CarrinhoItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EncomendaItem" ADD CONSTRAINT "EncomendaItem_encomendaId_fkey" FOREIGN KEY ("encomendaId") REFERENCES "Encomenda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pontos" ADD CONSTRAINT "Pontos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PontosTransacao" ADD CONSTRAINT "PontosTransacao_pontosId_fkey" FOREIGN KEY ("pontosId") REFERENCES "Pontos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegracaoLog" ADD CONSTRAINT "IntegracaoLog_encomendaId_fkey" FOREIGN KEY ("encomendaId") REFERENCES "Encomenda"("id") ON DELETE SET NULL ON UPDATE CASCADE;
