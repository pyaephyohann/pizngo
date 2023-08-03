import { Tables } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TablesState {
  isLoading: boolean;
  items: Tables[];
  error: Error | null;
}

const initialState: TablesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Tables[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setTables } = tablesSlice.actions;

export default tablesSlice.reducer;
