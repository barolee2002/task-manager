import { createSlice } from "@reduxjs/toolkit";

import { cart } from "Type/Type";
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data : [] as cart[],
  },
  reducers: {
    updateCart : (state, action) => {
        state.data = action.payload;
    },
    deleteCart : (state, action) => {
        state.data = state.data.filter(item => item.id !== action.payload);
    }
  },
});

export const { updateCart,deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
