import { configureStore } from "@reduxjs/toolkit";

import userReducer from "Pages/Account/accoutSlice";
import cartReducer from "Pages/Cart/CartSlice";
import authenReducer  from "Pages/SignIn/AuthenSlice";

const store = configureStore({
    reducer: {
        authen: authenReducer,
        user : userReducer,
        cart :  cartReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;