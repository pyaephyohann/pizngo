import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, locationIds } = req.body;
    const isValid = name && locationIds.length;
    if (!isValid) return res.status(400).send("Bad Request");
    const createdMenuCategory = await prisma.menuCategories.create({
      data: {
        name,
      },
    });
    const newMenusMenuCategoriesLocationsData = locationIds.map(
      (locationId: number) => ({
        menuCategoryId: createdMenuCategory.id,
        locationId,
      })
    );
    await prisma.menusMenuCategoriesLocations.createMany({
      data: newMenusMenuCategoriesLocationsData,
    });
    return res.status(200).send(createdMenuCategory);
  }
  res.status(405).send("Method not allowed");
}
