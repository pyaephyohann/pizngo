import {
  AddonCategories,
  MenuCategories,
  Menus,
  MenusAddonCategories,
  MenusMenuCategoriesLocations,
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
