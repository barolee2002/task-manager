import { createSlice } from "@reduxjs/toolkit";

import { user } from "Type/Type";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {} as user,
  },
  reducers: {
    updateUser: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
