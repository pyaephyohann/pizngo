import { config } from "@/config";
import { MenusAddonCategories } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MenusAddonCategoriesState {
  isLoading: boolean;
  items: MenusAddonCategories[];
  error: Error | null;
}

const initialState: MenusAddonCategoriesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const fetchMenusAddonCategories = createAsyncThunk(
  "menusAddonCategories/fetchMenusAddonCategories",
  async (menuIds: number[], thunkAPI) => {
    const response = await fetch(
      `${config.apiBaseUrl}/menusAddonCategories?menuIds=${menuIds.join(",")}`
    );
    const menusAddonCategories = await response.json();
    thunkAPI.dispatch(setMenusAddonCategories(menusAddonCategories));
  }
);

export const menusAddonCategoriesSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setMenusAddonCategories: (
      state,
      action: PayloadAction<MenusAddonCategories[]>
    ) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusAddonCategories } = menusAddonCategoriesSlice.actions;

export default menusAddonCategoriesSlice.reducer;
