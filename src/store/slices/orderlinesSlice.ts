import { config } from "@/config";
import { OrderStatus, Orderlines } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface OrderlinesState {
  isLoading: boolean;
  items: Orderlines[];
  error: Error | null;
}

interface UpdateOrderlinePayload {
  menuId: number;
  orderId: number;
  status: OrderStatus;
}

const initialState: OrderlinesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const updateOrderlineStatus = createAsyncThunk(
  "orderlines/updateOrderlineStatus",
  async (payload: UpdateOrderlinePayload) => {
    await fetch(`${config.apiBaseUrl}/orderlines`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
);

export const orderlinesSlice = createSlice({
  name: "orderlines",
  initialState,
  reducers: {
    setOrderlines: (state, action: PayloadAction<Orderlines[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setOrderlines } = orderlinesSlice.actions;

export default orderlinesSlice.reducer;
