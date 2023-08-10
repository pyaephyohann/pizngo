import { config } from "@/config";
import { MenusMenuCategoriesLocations } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const fetchMenusMenuCategoriesLocations = createAsyncThunk(
  "menusMenuCategoriesLocations/fetchMenusMenuCategoriesLocations",
  async (locationId: string, thunkAPI) => {
    const response = await fetch(
      `${config.apiBaseUrl}/menusMenuCategoriesLocations?locationId=${locationId}`
    );
    const menusMenuCategoriesLocations = await response.json();
    thunkAPI.dispatch(
      setMenusMenuCategoriesLocations(menusMenuCategoriesLocations)
    );
  }
);

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
