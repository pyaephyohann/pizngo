import { MenusAddonCategories } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
