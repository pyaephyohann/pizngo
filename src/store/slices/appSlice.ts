import { config } from "@/config";
import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { setUser } from "./userSlice";
import { setLocations } from "./locationsSlice";
import { setCompany } from "./companySlice";
import { setMenus } from "./menusSlice";
import { setMenuCategories } from "./menuCategoriesSlice";
import { setAddons } from "./addonsSlice";
import { setAddonCategories } from "./addonCategoriesSlice";
import { setMenusAddonCategories } from "./menusAddonCategoriesSlice";
import { setMenusMenuCategoriesLocations } from "./menusMenuCategoriesLocationsSlice";
import { setTables } from "./tablesSlice";
import { setOrders } from "./ordersSlice";
import { setOrderlines } from "./orderlinesSlice";
import { RootState } from "..";
import { getSelectedLocationId } from "@/utils/client";

interface AppState {
  isLoading: boolean;
  init: boolean;
  error: Error | null;
}

const initialState: AppState = {
  isLoading: false,
  init: false,
  error: null,
};

interface FetchAppPayload {
  locationId?: string;
}

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (payload: FetchAppPayload, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/app?locationId=${payload.locationId}`
    );
    const responseJson = await response.json();
    const {
      user,
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
    } = responseJson;
    thunkAPI.dispatch(setUser(user));
    thunkAPI.dispatch(setLocations(locations));
    thunkAPI.dispatch(setCompany(company));
    thunkAPI.dispatch(setMenus(menus));
    thunkAPI.dispatch(setMenuCategories(menuCategories));
    thunkAPI.dispatch(setAddons(addons));
    thunkAPI.dispatch(setAddonCategories(addonCategories));
    thunkAPI.dispatch(setMenusAddonCategories(menusAddonCategories));
    thunkAPI.dispatch(
      setMenusMenuCategoriesLocations(menusMenuCategoriesLocations)
    );
    thunkAPI.dispatch(setTables(tables));
    thunkAPI.dispatch(setOrders(orders));
    thunkAPI.dispatch(setOrderlines(orderlines));
    thunkAPI.dispatch(setAppLoading(false));
    localStorage.setItem("selectedLocationId", locations[0].id);
    thunkAPI.dispatch(setInit(true));
  }
);

export const selectApp = (state: RootState) => state.app;
export const selectUser = (state: RootState) => state.user.items;
export const selectCompany = (state: RootState) => state.company.items;
export const selectLocations = (state: RootState) => state.locations.items;
export const selectMenus = (state: RootState) => state.menus.items;
export const selectMenuCategories = (state: RootState) =>
  state.menuCategories.items;
export const selectAddons = (state: RootState) => state.addons.items;
export const selectAddonCategories = (state: RootState) =>
  state.addonCategories.items;
export const selectMenusAddonCategories = (state: RootState) =>
  state.menusAddonCategories.items;
export const selectMenusMenuCategoriesLocations = (state: RootState) =>
  state.menusMenuCategoriesLocations.items;
export const selectTables = (state: RootState) => state.tables.items;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrderlines = (state: RootState) => state.orderlines.items;
export const selectCart = (state: RootState) => state.cart.items;

export const appData = createSelector(
  [
    selectApp,
    selectUser,
    selectCompany,
    selectLocations,
    selectMenus,
    selectMenuCategories,
    selectAddons,
    selectAddonCategories,
    selectMenusAddonCategories,
    selectMenusMenuCategoriesLocations,
    selectTables,
    selectOrders,
    selectOrderlines,
    selectCart,
  ],
  (
    app,
    user,
    company,
    locations,
    menus,
    menuCategories,
    addons,
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    tables,
    orders,
    orderlines,
    cart
  ) => {
    return {
      app,
      user,
      company,
      locations,
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      tables,
      orders,
      orderlines,
      cart,
    };
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
  },
});

export const { setAppLoading, setInit } = appSlice.actions;

export default appSlice.reducer;
