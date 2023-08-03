import { Orders } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface OrdersState {
  isLoading: boolean;
  items: Orders[];
  error: Error | null;
}

const initialState: OrdersState = {
  isLoading: false,
  items: [],
  error: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Orders[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
