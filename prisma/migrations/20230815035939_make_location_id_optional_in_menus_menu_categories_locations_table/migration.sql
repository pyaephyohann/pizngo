-- DropForeignKey
ALTER TABLE "MenusMenuCategoriesLocations" DROP CONSTRAINT "MenusMenuCategoriesLocations_locationId_fkey";

-- AlterTable
ALTER TABLE "MenusMenuCategoriesLocations" ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "MenusMenuCategoriesLocations" ADD CONSTRAINT "MenusMenuCategoriesLocations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
