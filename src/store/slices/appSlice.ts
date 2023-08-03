import { config } from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAppLoading } = appSlice.actions;

export default appSlice.reducer;
