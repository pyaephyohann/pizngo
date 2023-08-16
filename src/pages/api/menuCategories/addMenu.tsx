import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method == "PUT") {
    const { menuCategoryId, menuIds, locationId } = req.body;
    const isValid = menuCategoryId && menuIds.length && locationId;
    if (!isValid) return res.status(400).send("Bad Request");
    menuIds.forEach(async (menuId: number) => {
      await prisma.menusMenuCategoriesLocations.create({
        data: {
          menuId,
          menuCategoryId,
          locationId,
        },
      });
    });
    return res.status(200).send("ok");
  }
  res.status(405).send("Method not allowed");
}
