import { AddonCategories } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AddonCategoriesState {
  isLoading: boolean;
  items: AddonCategories[];
  error: Error | null;
}

const initialState: AddonCategoriesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const addonCategoriesSlice = createSlice({
  name: "addonCategories",
  initialState,
  reducers: {
    setAddonCategories: (state, action) => {
      state.items = action.payload;
    },
    addAddonCategory: (state, action: PayloadAction<AddonCategories>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setAddonCategories, addAddonCategory } =
  addonCategoriesSlice.actions;

export default addonCategoriesSlice.reducer;
