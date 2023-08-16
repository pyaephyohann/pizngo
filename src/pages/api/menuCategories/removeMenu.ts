import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { menuId, menuCategoryId, locationId } = req.body;
    const isValid = menuId && menuCategoryId && locationId;
    if (!isValid) return res.status(400).send("Bad Request");
    await prisma.menusMenuCategoriesLocations.deleteMany({
      where: {
        menuId,
        menuCategoryId,
        locationId,
      },
    });
    return res.status(200).send("Ok");
  }
  res.status(405).send("Method not allowed");
}
