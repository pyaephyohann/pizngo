import { Companies } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CompanyState {
  isLoading: boolean;
  items: Companies | null;
  error: Error | null;
}

const initialState: CompanyState = {
  isLoading: false,
  items: null,
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<Companies>) => {
      state.items = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;

export default companySlice.reducer;
