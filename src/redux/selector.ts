import { RootState } from './store';

export const user = (state: RootState) => state.authen.data;
export const tasksSelector = (state: RootState) => state.task.data;
export const userSelector = (state: RootState) => state.user.data;