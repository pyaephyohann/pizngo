import {
  AddonCategories,
  Addons,
  Locations,
  MenuCategories,
  Menus,
  MenusAddonCategories,
  MenusMenuCategoriesLocations,
  Orderlines,
} from "@prisma/client";

export const getSelectedLocationId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedLocationId");
  }
  return "";
};

export const getMenusByLocationId = (
  locationId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menus: Menus[]
) => {
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(locationId))
    .map((item) => item.menuId);
  return menus.filter((item) => validMenuIds.includes(item.id));
};

export const getMenuCategoriesByLocationId = (
  locationId: string,
  menuCategories: MenuCategories[],
  menusMenuCategorieslocations: MenusMenuCategoriesLocations[]
) => {
  const validMenuCategoryIds = menusMenuCategorieslocations
    .filter((item) => item.locationId === Number(locationId))
    .map((item) => item.menuCategoryId);
  return menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id)
  );
};

export const getAddonCategoriesByMenuId = (
  menuId: string,
  menusAddonCategories: MenusAddonCategories[],
  addonCategories: AddonCategories[]
) => {
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => item.menuId === Number(menuId))
    .map((item) => item.addonCategoryId);
  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );
};

export const getMenusByMenuCategoryId = (
  menuCategoryId: string,
  selectedLocationId: string,
  menus: Menus[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menuCategoryId === Number(menuCategoryId) &&
        item.menuId &&
        item.locationId === Number(selectedLocationId)
    )
    .map((item) => item.menuId);
  return menus.filter((item) => validMenuIds.includes(item.id));
};

export const getLocationsByMenuCategoryId = (
  menuCategoryId: string,
  locations: Locations[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const validLocationIds = menusMenuCategoriesLocations
    .filter((item) => item.menuCategoryId === Number(menuCategoryId))
    .map((item) => item.locationId);
  return locations.filter((item) => validLocationIds.includes(item.id));
};

export const getAddonsByLocationId = (
  addons: Addons[],
  menusAddonCategories: MenusAddonCategories[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  locationId: string
) => {
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.menuId && item.locationId === Number(locationId))
    .map((item) => item.menuId);
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menuId))
    .map((item) => item.addonCategoryId);
  return addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId)
  );
};

export const getAddonCategoriesByLocationId = (
  addonCategories: AddonCategories[],
  menusAddonCategories: MenusAddonCategories[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  locationId: string
) => {
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(locationId))
    .map((item) => item.menuId);
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menuId))
    .map((item) => item.addonCategoryId);
  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );
};

export const getQrCodeUrl = (locationId: number, tableId: number) => {
  return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/msquarefdc/qrcode/batch1/pyaephyohan/locationId-${locationId}-tableId-${tableId}.png`;
};

export const generateRandomId = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

export const getNumberOfMenusByOrderId = (
  orderId: number,
  orderlines: Orderlines[]
) => {
  const validOrderlines = orderlines.filter((item) => item.orderId === orderId);
  const menuIds = [] as number[];
  validOrderlines.forEach((item) => {
    const hasAdded = menuIds.find((menuId) => item.menuId === menuId);
    if (!hasAdded) menuIds.push(item.menuId);
  });
  return menuIds.length;
};
