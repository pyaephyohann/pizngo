import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const isOrderAppRequest =
    req.query.locationId && !isNaN(Number(req.query.locationId));
  if (isOrderAppRequest) {
    if (method === "GET") {
      const locationId = Number(req.query.locationId);
      const location = await prisma.locations.findFirst({
        where: {
          id: locationId,
          isArchived: false,
        },
      });
      const menusMenuCategoriesLocations =
        await prisma.menusMenuCategoriesLocations.findMany({
          where: {
            locationId,
            isArchived: false,
          },
        });
      const menuIds = menusMenuCategoriesLocations
        .map((item) => item.menuId)
        .filter((item) => item !== null) as number[];
      const menus = await prisma.menus.findMany({
        where: {
          id: {
            in: menuIds,
          },
          isArchived: false,
        },
      });
      const menuCategoryIds = menusMenuCategoriesLocations.map(
        (item) => item.menuCategoryId
      );
      const menuCategories = await prisma.menuCategories.findMany({
        where: {
          id: {
            in: menuCategoryIds,
          },
          isArchived: false,
        },
      });
      const menusAddonCategories = await prisma.menusAddonCategories.findMany({
        where: {
          menuId: {
            in: menuIds,
          },
          isArchived: false,
        },
      });
      const addonCategoryIds = menusAddonCategories.map(
        (item) => item.addonCategoryId
      );
      const addonCategories = await prisma.addonCategories.findMany({
        where: {
          id: {
            in: addonCategoryIds,
          },
          isArchived: false,
        },
      });
      const addons = await prisma.addons.findMany({
        where: {
          addonCategoryId: {
            in: addonCategoryIds,
          },
          isArchived: false,
        },
      });
      const orders = await prisma.orders.findMany({
        where: {
          locationId,
        },
      });
      const orderIds = orders.map((item) => item.id);
      const orderlines = await prisma.orderlines.findMany({
        where: {
          orderId: {
            in: orderIds,
          },
        },
      });
      return res.send({
        user: {},
        company: {},
        locations: [location],
        menus,
        menuCategories,
        addons,
        addonCategories,
        menusMenuCategoriesLocations,
        menusAddonCategories,
        tables: [],
        orders,
        orderlines,
      });
    }
  } else {
    const session = await getSession({ req });
    if (!session) return res.status(401).send("Unathorized");
    const user = session.user;
    const name = user?.name as string;
    const email = user?.email as string;
    const profilePhoto = user?.image as string;
    const userFromDB = await prisma.users.findFirst({
      where: { email },
    });
    if (!userFromDB) {
      const newCompany = await prisma.companies.create({
        data: { name: "Piz N Go", address: "Thirimon 5th Street" },
      });
      await prisma.users.create({
        data: { name, email, assetUrl: profilePhoto, companyId: newCompany.id },
      });
      const newLocation = await prisma.locations.create({
        data: {
          name: "BayintNaung",
          address: "Thirimon 5th Street, Mayangone",
          companyId: newCompany.id,
        },
      });
      const newMenusData = [
        {
          name: "Pizza",
          price: 10000,
          assetUrl:
            "https://firebasestorage.googleapis.com/v0/b/pizngo-79703.appspot.com/o/images.png?alt=media&token=b3d5bd92-457f-4453-87fa-c6cd2fe1a8f3",
        },
        {
          name: "Fried Potato",
          price: 1800,
          assetUrl:
            "https://firebasestorage.googleapis.com/v0/b/pizngo-79703.appspot.com/o/pixzolo-photography-8YBHgP0WrEo-unsplash.jpg?alt=media&token=09d9df0d-44f7-48cd-808f-88262febd021",
        },
      ];
      const newMenus = await prisma.$transaction(
        newMenusData.map((menu) =>
          prisma.menus.create({
            data: menu,
          })
        )
      );
      const newMenuCategoriesData = [
        { name: "Most Popular" },
        { name: "Main Dish" },
      ];
      const newMenuCategories = await prisma.$transaction(
        newMenuCategoriesData.map((menuCategory) =>
          prisma.menuCategories.create({ data: menuCategory })
        )
      );
      const newMenusMenuCategoriesLocationsData = [
        {
          menuId: newMenus[0].id,
          menuCategoryId: newMenuCategories[0].id,
          locationId: newLocation.id,
        },
        {
          menuId: newMenus[1].id,
          menuCategoryId: newMenuCategories[1].id,
          locationId: newLocation.id,
        },
      ];
      const newMenusMenuCategoriesLocations = await prisma.$transaction(
        newMenusMenuCategoriesLocationsData.map(
          (menusMenuCategoriesLocations) =>
            prisma.menusMenuCategoriesLocations.create({
              data: menusMenuCategoriesLocations,
            })
        )
      );
      const newAddonCategoriesData = [{ name: "Drinks" }, { name: "Sizes" }];
      const newAddonCategories = await prisma.$transaction(
        newAddonCategoriesData.map((addonCategory) =>
          prisma.addonCategories.create({ data: addonCategory })
        )
      );
      const newMenusAddonCategoriesData = [
        { menuId: newMenus[0].id, addonCategoryId: newAddonCategories[0].id },
        { menuId: newMenus[1].id, addonCategoryId: newAddonCategories[1].id },
      ];
      const newMenusAddonCategories = await prisma.$transaction(
        newMenusAddonCategoriesData.map((menusAddonCategory) =>
          prisma.menusAddonCategories.create({
            data: menusAddonCategory,
          })
        )
      );
      const newAddonsData = [
        {
          name: "Cola",
          price: 700,
          addonCategoryId: newAddonCategories[0].id,
        },
        {
          name: "Pepsi",
          price: 800,
          addonCategoryId: newAddonCategories[0].id,
        },
        {
          name: "Normal",
          price: 0,
          addonCategoryId: newAddonCategories[1].id,
        },
        {
          name: "Large",
          price: 200,
          addonCategoryId: newAddonCategories[1].id,
        },
      ];
      const newAddons = await prisma.$transaction(
        newAddonsData.map((addon) => prisma.addons.create({ data: addon }))
      );
      return res.send({
        user: { name, email, profilePhoto },
        locations: newLocation,
        company: newCompany,
        menus: newMenus,
        menuCategories: newMenuCategories,
        addons: newAddons,
        addonCategories: newAddonCategories,
        menusAddonCategories: newMenusAddonCategories,
        menusMenuCategoriesLocations: newMenusMenuCategoriesLocations,
        orders: [],
        orderlines: [],
        tables: [],
      });
    } else {
      const companyId = userFromDB.companyId;
      const locations = await prisma.locations.findMany({
        where: { companyId, isArchived: false },
      });
      const locationIds = locations.map((location) => location.id);
      const menusMenuCategoriesLocations =
        await prisma.menusMenuCategoriesLocations.findMany({
          where: {
            locationId: {
              in: locationIds,
            },
            isArchived: false,
          },
        });
      const menuCategoryIds = menusMenuCategoriesLocations.map(
        (item) => item.menuCategoryId
      );
      const menuCategories = await prisma.menuCategories.findMany({
        where: {
          id: {
            in: menuCategoryIds,
          },
          isArchived: false,
        },
      });
      const menuIds = menusMenuCategoriesLocations
        .map((item) => item.menuId)
        .filter((item) => item !== null) as number[];
      const menus = await prisma.menus.findMany({
        where: {
          id: {
            in: menuIds,
          },
          isArchived: false,
        },
      });
      const menusAddonCategories = await prisma.menusAddonCategories.findMany({
        where: {
          menuId: {
            in: menuIds,
          },
          isArchived: false,
        },
      });
      const addonCategoryIds = menusAddonCategories.map(
        (item) => item.addonCategoryId
      );
      const addonCategories = await prisma.addonCategories.findMany({
        where: {
          id: {
            in: addonCategoryIds,
          },
          isArchived: false,
        },
      });
      const addons = await prisma.addons.findMany({
        where: {
          addonCategoryId: {
            in: addonCategoryIds,
          },
          isArchived: false,
        },
      });
      const tables = await prisma.tables.findMany({
        where: {
          locationId: {
            in: locationIds,
          },
          isArchived: false,
        },
      });
      const company = await prisma.companies.findFirst({
        where: {
          id: companyId,
        },
      });
      const orders = await prisma.orders.findMany({
        where: {
          locationId: {
            in: locationIds,
          },
        },
      });
      const orderIds = orders.map((item) => item.id);
      const orderlines = await prisma.orderlines.findMany({
        where: {
          orderId: {
            in: orderIds,
          },
        },
      });
      return res.send({
        user: { name, email, profilePhoto },
        locations,
        company,
        menus,
        menuCategories,
        addons,
        addonCategories,
        menusAddonCategories,
        menusMenuCategoriesLocations,
        tables,
        orders,
        orderlines,
      });
    }
  }
}
