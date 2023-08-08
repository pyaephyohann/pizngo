import {
  MenuCategories,
  Menus,
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
