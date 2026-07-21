-- CreateEnum
CREATE TYPE "MetodoEntrega" AS ENUM ('LEVANTAMENTO', 'ENTREGA_LOJA', 'TRANSPORTADORA');

-- AlterTable
ALTER TABLE "Encomenda" ADD COLUMN     "clienteEmail" TEXT,
ADD COLUMN     "clienteNome" TEXT,
ADD COLUMN     "clienteTelefone" TEXT,
ADD COLUMN     "metodoEntrega" "MetodoEntrega" NOT NULL DEFAULT 'TRANSPORTADORA';
