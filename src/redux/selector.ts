import { RootState } from './store';

export const user = (state: RootState) => state.authen.data;
export const userSelector = (state: RootState) => state.user.data;
export const cartSelector = (state : RootState) => state.cart.data;