import { MenuCategories } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenuCategoriesState {
  isLoading: boolean;
  items: MenuCategories[];
  error: Error | null;
}

const initialState: MenuCategoriesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menuCategoriesSlice = createSlice({
  name: "menuCategories",
  initialState,
  reducers: {
    setMenuCategories: (state, action: PayloadAction<MenuCategories[]>) => {
      state.items = action.payload;
    },
    addMenuCategory: (state, action: PayloadAction<MenuCategories>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setMenuCategories, addMenuCategory } =
  menuCategoriesSlice.actions;

export default menuCategoriesSlice.reducer;
