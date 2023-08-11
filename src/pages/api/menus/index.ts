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
  } else if (method === "PUT") {
    const { id, name, price, assetUrl, addonCategoryIds } = req.body;
    let updatedMenu = {};
    if (name) {
      updatedMenu = await prisma.menus.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });
    }
    if (price) {
      updatedMenu = await prisma.menus.update({
        where: {
          id: Number(id),
        },
        data: {
          price,
        },
      });
    }
    if (assetUrl) {
      updatedMenu = await prisma.menus.update({
        where: {
          id: Number(id),
        },
        data: {
          assetUrl,
        },
      });
    }

    if (addonCategoryIds.length) {
      const existingAddonCategories =
        await prisma.menusAddonCategories.findMany({
          where: {
            menuId: Number(id),
          },
        });

      const existingAddonCategoryIds = existingAddonCategories.map(
        (item) => item.addonCategoryId
      );

      // db --> [1,2]  payload --> [1,2,3]
      const addedAddonCategoryIds = addonCategoryIds.filter(
        (item: number) => !existingAddonCategoryIds.includes(item)
      );
      // db --> [1,2] payload --> [1]
      const removedAddonCategoryIds = existingAddonCategoryIds.filter(
        (item) => !addonCategoryIds.includes(item)
      );
      if (removedAddonCategoryIds.length) {
        await prisma.menusAddonCategories.deleteMany({
          where: {
            menuId: Number(id),
            addonCategoryId: {
              in: removedAddonCategoryIds,
            },
          },
        });
      }
      if (addedAddonCategoryIds.length) {
        const newMenusAddonCategories = addedAddonCategoryIds.map(
          (item: number) => ({
            menuId: Number(id),
            addonCategoryId: item,
          })
        );
        await prisma.menusAddonCategories.createMany({
          data: newMenusAddonCategories,
        });
      }
    }
    return res.status(200).send(updatedMenu);
  }
  res.status(405).send("Method not allowed");
}
