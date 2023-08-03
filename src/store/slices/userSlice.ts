import { Users } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  isLoading: boolean;
  items: Users | null;
  error: Error | null;
}

const initialState: UserState = {
  isLoading: false,
  items: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Users>) => {
      state.items = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
