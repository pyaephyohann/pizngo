import { Addons } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AddonsState {
  isLoading: boolean;
  items: Addons[];
  error: Error | null;
}

const initialState: AddonsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<Addons[]>) => {
      state.items = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addons>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setAddons, addAddon } = addonsSlice.actions;

export default addonsSlice.reducer;
