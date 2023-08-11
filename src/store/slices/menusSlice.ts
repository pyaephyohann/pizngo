import { Menus } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenusState {
  isLoading: boolean;
  items: Menus[];
  error: Error | null;
}

const initialState: MenusState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<Menus[]>) => {
      state.items = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menus>) => {
      state.items = [...state.items, action.payload];
    },
    updateMenu: (state, action: PayloadAction<Menus>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenu: (state, action: PayloadAction<Menus>) => {
      state.items = state.items.filter((item) => item.id != action.payload.id);
    },
  },
});

export const { setMenus, addMenu, updateMenu, removeMenu } = menusSlice.actions;

export default menusSlice.reducer;
