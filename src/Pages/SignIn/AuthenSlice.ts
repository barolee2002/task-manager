import { createSlice } from "@reduxjs/toolkit";

import { userLogin } from "Type/Type";
import { updateAxiosAccessToken } from "api/axiosClient";
export const authenSlice = createSlice({
  name: 'authentication',
  initialState: {
    data : {} as userLogin,
  },
  reducers: {
    login: (state, action) => {
        state.data = action.payload;
        updateAxiosAccessToken(state.data.token);
    }
  },
});

export const { login } = authenSlice.actions;
export default authenSlice.reducer;
