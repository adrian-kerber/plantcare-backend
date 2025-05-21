-- CreateTable
CREATE TABLE "Planta" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "dataAquisicao" TIMESTAMP(3) NOT NULL,
    "observacoes" TEXT,
    "fotoUrl" TEXT,

    CONSTRAINT "Planta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuidado" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataProgramada" TIMESTAMP(3) NOT NULL,
    "realizado" BOOLEAN NOT NULL DEFAULT false,
    "dataRealizacao" TIMESTAMP(3),
    "plantaId" INTEGER NOT NULL,

    CONSTRAINT "Cuidado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cuidado" ADD CONSTRAINT "Cuidado_plantaId_fkey" FOREIGN KEY ("plantaId") REFERENCES "Planta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
