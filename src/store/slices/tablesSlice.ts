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
    addTable: (state, action: PayloadAction<Tables>) => {
      state.items = [...state.items, action.payload];
    },
    updateTable: (state, action: PayloadAction<Tables>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteTable: (state, action: PayloadAction<Tables>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setTables, addTable, updateTable, deleteTable } =
  tablesSlice.actions;

export default tablesSlice.reducer;
