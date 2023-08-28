-- DropForeignKey
ALTER TABLE "Orderlines" DROP CONSTRAINT "Orderlines_addonId_fkey";

-- AlterTable
ALTER TABLE "Orderlines" ALTER COLUMN "addonId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Orderlines" ADD CONSTRAINT "Orderlines_addonId_fkey" FOREIGN KEY ("addonId") REFERENCES "Addons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
