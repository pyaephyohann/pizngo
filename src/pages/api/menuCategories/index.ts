import { prisma } from "@/utils/server";
import { MenusMenuCategoriesLocations } from "@prisma/client";
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
  } else if (method === "PUT") {
    const { id, name, locationIds } = req.body;
    const isValid = id;
    if (!isValid) return res.status(400).send("Bad Request");
    const menuCategoryId = Number(id);
    let updatedMenuCategory = {};
    if (name) {
      updatedMenuCategory = await prisma.menuCategories.update({
        where: {
          id: menuCategoryId,
        },
        data: {
          name,
        },
      });
    }
    if (locationIds.length) {
      const existingMenusMenuCategoriesLocations =
        await prisma.menusMenuCategoriesLocations.findMany({
          where: {
            menuCategoryId,
          },
        });
      const existingLocationIds = existingMenusMenuCategoriesLocations.map(
        (item) => item.locationId
      );
      // db --> [1,2] --> payload --> [1]
      const removedLocationIds = existingLocationIds.filter(
        (item) => !locationIds.includes(item)
      );
      // db --> [1] --> payload [1,2]
      const addedLocationIds = locationIds.filter(
        (item: number) => !existingLocationIds.includes(item)
      );
      if (removedLocationIds.length) {
        removedLocationIds.forEach(async (locationId) => {
          const row = (await prisma.menusMenuCategoriesLocations.findFirst({
            where: {
              locationId,
              menuCategoryId,
            },
          })) as MenusMenuCategoriesLocations;
          if (row.menuId) {
            await prisma.menusMenuCategoriesLocations.update({
              where: {
                id: row.id,
              },
              data: {
                locationId: null,
              },
            });
          } else {
            await prisma.menusMenuCategoriesLocations.delete({
              where: {
                id: row.id,
              },
            });
          }
        });
      }
      if (addedLocationIds.length) {
        const newMenusMenuCategoriesLocationsData = addedLocationIds.map(
          (locationId: number) => ({
            menuCategoryId,
            locationId,
          })
        );
        await prisma.menusMenuCategoriesLocations.createMany({
          data: newMenusMenuCategoriesLocationsData,
        });
      }
    }
    return res.status(200).send(updatedMenuCategory);
  }
  res.status(405).send("Method not allowed");
}
