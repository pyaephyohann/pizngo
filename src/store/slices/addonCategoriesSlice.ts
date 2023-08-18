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
    updateAddonCategory: (state, action: PayloadAction<AddonCategories>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteAddonCategory: (state, action: PayloadAction<AddonCategories>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  setAddonCategories,
  addAddonCategory,
  updateAddonCategory,
  deleteAddonCategory,
} = addonCategoriesSlice.actions;

export default addonCategoriesSlice.reducer;
