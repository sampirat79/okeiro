-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('BLOOD', 'URINE');

-- CreateTable
CREATE TABLE "measurements" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "MeasurementType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "observations" (
    "id" TEXT NOT NULL,
    "loincCode" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "measurementId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "observations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "observations_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "measurements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
