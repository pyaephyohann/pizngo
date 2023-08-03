import { Locations } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setLocations } = locationsSlice.actions;

export default locationsSlice.reducer;
