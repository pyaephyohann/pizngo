import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const queryMenuIds = req.query.menuIds as string;
    const isValid = queryMenuIds;
    if (!isValid) return res.status(400).send("Bad Request");
    const menuIds = queryMenuIds.split(",").map((item) => Number(item));
    const menusAddonCategories = await prisma.menusAddonCategories.findMany({
      where: {
        menuId: {
          in: menuIds,
        },
      },
    });
    return res.status(200).send(menusAddonCategories);
  }
  res.status(405).send("Method not allowed");
}
