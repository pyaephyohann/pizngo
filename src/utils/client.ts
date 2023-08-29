import { CartItem } from "@/store/slices/cartSlice";
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

export const getCartTotalPrice = (cart: CartItem[]) => {
  const totalPrice = cart.reduce((prev, curr) => {
    const menuPrice = curr.menu.price;
    const totalAddonPrice = curr.addons.reduce((addonPrice, addon) => {
      return (addonPrice += addon.price);
    }, 0);
    return (prev += (menuPrice + totalAddonPrice) * curr.quantity);
  }, 0);
  return totalPrice;
};

export const getOrderlinesByItemId = (
  orderlines: Orderlines[],
  menus: Menus[],
  addons: Addons[],
  addonCategories: AddonCategories[]
) => {
  const orderlinesItemIds = orderlines.map((item) => item.itemId);
  const itemIds = [] as string[];
  orderlinesItemIds.forEach((item) => {
    const hasAdded = itemIds.includes(item);
    if (!hasAdded) itemIds.push(item);
  });
  const orderlineDatas = itemIds.map((itemId) => {
    const addonIds = orderlines
      .filter((item) => item.itemId === itemId)
      .map((item) => item.addonId);
    const orderlineAddons = addons.filter((addon) =>
      addonIds.includes(addon.id)
    );
    const orderline = orderlines.find(
      (item) => item.itemId === itemId
    ) as Orderlines;
    const menu = menus.find((item) => item.id === orderline.menuId) as Menus;
    const status = orderlines.find((item) => item.itemId === itemId)?.status;
    const quantity = orderlines.find(
      (item) => item.itemId === itemId
    )?.quantity;
    const addonWithCategories: { [key: number]: Addons[] } = {};
    orderlineAddons.map((addon) => {
      const addonCategory = addonCategories.find(
        (item) => item.id === addon.addonCategoryId
      ) as AddonCategories;
      if (!addonWithCategories[addonCategory.id]) {
        addonWithCategories[addonCategory.id] = [addon];
      } else {
        addonWithCategories[addonCategory.id] = [
          ...addonWithCategories[addonCategory.id],
          addon,
        ];
      }
    });
    return { menu, addonWithCategories, status, quantity, itemId };
  });
  return orderlineDatas;
};
