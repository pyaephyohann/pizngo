import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, menuIds, isRequired } = req.body;
    const isValid = name && menuIds.length;
    if (!isValid) return res.status(400).send("Bad Request");
    const createdAddonCategory = await prisma.addonCategories.create({
      data: {
        name,
        isRequired: isRequired === undefined ? false : isRequired,
      },
    });
    const newMenusAddonCategoriesData = menuIds.map((menuId: number) => ({
      addonCategoryId: createdAddonCategory.id,
      menuId,
    }));
    await prisma.menusAddonCategories.createMany({
      data: newMenusAddonCategoriesData,
    });
    return res.status(200).send(createdAddonCategory);
  } else if (method === "PUT") {
    const { id, name, isRequired } = req.body;
    const isValid = id;
    if (!isValid) return res.status(400).send("Bad Request");
    let updatedAddonCategory = {};
    if (name) {
      updatedAddonCategory = await prisma.addonCategories.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }
    if (isRequired) {
      updatedAddonCategory = await prisma.addonCategories.update({
        where: {
          id,
        },
        data: {
          isRequired,
        },
      });
    }
    return res.status(200).send(updatedAddonCategory);
  }
  res.status(405).send("Method not allowed");
}
