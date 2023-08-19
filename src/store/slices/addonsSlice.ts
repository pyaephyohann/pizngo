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
    updateAddon: (state, action: PayloadAction<Addons>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setAddons, addAddon, updateAddon } = addonsSlice.actions;

export default addonsSlice.reducer;
