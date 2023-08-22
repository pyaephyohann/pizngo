import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import menusSlice from "./slices/menusSlice";
import menuCategoriesSlice from "./slices/menuCategoriesSlice";
import addonsSlice from "./slices/addonsSlice";
import addonCategoriesSlice from "./slices/addonCategoriesSlice";
import locationsSlice from "./slices/locationsSlice";
import companySlice from "./slices/companySlice";
import menusAddonCategoriesSlice from "./slices/menusAddonCategoriesSlice";
import menusMenuCategoriesLocationsSlice from "./slices/menusMenuCategoriesLocationsSlice";
import tablesSlice from "./slices/tablesSlice";
import userSlice from "./slices/userSlice";
import ordersSlice from "./slices/ordersSlice";
import orderlinesSlice from "./slices/orderlinesSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    menus: menusSlice,
    menuCategories: menuCategoriesSlice,
    addons: addonsSlice,
    addonCategories: addonCategoriesSlice,
    locations: locationsSlice,
    company: companySlice,
    menusAddonCategories: menusAddonCategoriesSlice,
    menusMenuCategoriesLocations: menusMenuCategoriesLocationsSlice,
    tables: tablesSlice,
    user: userSlice,
    orders: ordersSlice,
    orderlines: orderlinesSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
