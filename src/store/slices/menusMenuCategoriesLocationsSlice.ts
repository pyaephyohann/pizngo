import { MenusMenuCategoriesLocations } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenusMenuCategoriesLocationsState {
  isLoading: boolean;
  items: MenusMenuCategoriesLocations[];
  error: Error | null;
}

const initialState: MenusMenuCategoriesLocationsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const menusMenuCategoriesLocationsSlice = createSlice({
  name: "menusMenuCategoriesLocations",
  initialState,
  reducers: {
    setMenusMenuCategoriesLocations: (
      state,
      action: PayloadAction<MenusMenuCategoriesLocations[]>
    ) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusMenuCategoriesLocations } =
  menusMenuCategoriesLocationsSlice.actions;

export default menusMenuCategoriesLocationsSlice.reducer;
