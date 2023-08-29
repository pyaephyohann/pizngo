/*
  Warnings:

  - Added the required column `itemId` to the `Orderlines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orderlines" ADD COLUMN     "itemId" TEXT NOT NULL;
