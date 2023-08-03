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
  },
});

export const { setMenus } = menusSlice.actions;

export default menusSlice.reducer;
