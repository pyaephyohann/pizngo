/*
  Warnings:

  - You are about to drop the column `idPaid` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "idPaid",
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false;
