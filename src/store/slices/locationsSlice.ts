import { Locations } from "@prisma/client";
import {
  PayloadAction,
  PayloadActionCreator,
  createSlice,
} from "@reduxjs/toolkit";

interface LocationsState {
  isLoading: boolean;
  items: Locations[];
  error: Error | null;
}

const initialState: LocationsState = {
  isLoading: false,
  items: [],
  error: null,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Locations[]>) => {
      state.items = action.payload;
    },
    addLocation: (state, action: PayloadAction<Locations>) => {
      state.items = [...state.items, action.payload];
    },
    updateLocation: (state, action: PayloadAction<Locations>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setLocations, addLocation, updateLocation } =
  locationsSlice.actions;

export default locationsSlice.reducer;
