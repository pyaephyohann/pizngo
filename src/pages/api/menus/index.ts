import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, price, assetUrl, menuCategoryIds, locationId } = req.body;
    const isValid =
      name && price && assetUrl && menuCategoryIds.length && locationId;
    if (!isValid) return res.status(400).send("Bad Request");
    const newMenu = await prisma.menus.create({
      data: {
        name,
        price,
        assetUrl,
      },
    });
    const menuId = newMenu.id;
    if (menuCategoryIds.length > 1) {
      const data = menuCategoryIds.map((menuCategoryId: number) => ({
        menuId,
        menuCategoryId,
        locationId: Number(locationId),
      }));
      await prisma.menusMenuCategoriesLocations.createMany({
        data,
      });
    } else {
      await prisma.menusMenuCategoriesLocations.create({
        data: {
          menuId,
          menuCategoryId: menuCategoryIds[0],
          locationId: Number(locationId),
        },
      });
    }
    return res.status(200).send(newMenu);
  }
  res.status(405).send("Method not allowed");
}
