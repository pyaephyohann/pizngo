import { config } from "@/config";
import { OrderStatus, Orderlines } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface OrderlinesState {
  isLoading: boolean;
  items: Orderlines[];
  error: Error | null;
}

interface UpdateOrderlinePayload {
  itemId: string;
  status: OrderStatus;
}

const initialState: OrderlinesState = {
  isLoading: false,
  items: [],
  error: null,
};

export const updateOrderlineStatus = createAsyncThunk(
  "orderlines/updateOrderlineStatus",
  async (payload: UpdateOrderlinePayload, thunkAPI) => {
    await fetch(`${config.apiBaseUrl}/orderlines`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    thunkAPI.dispatch(updateOrderline(payload));
  }
);

export const orderlinesSlice = createSlice({
  name: "orderlines",
  initialState,
  reducers: {
    setOrderlines: (state, action: PayloadAction<Orderlines[]>) => {
      state.items = action.payload;
    },
    updateOrderline: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.itemId === action.payload.itemId) {
          return { ...item, status: action.payload.status };
        }
        return item;
      });
    },
  },
});

export const { setOrderlines, updateOrderline } = orderlinesSlice.actions;

export default orderlinesSlice.reducer;
