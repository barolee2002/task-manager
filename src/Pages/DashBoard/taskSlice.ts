import { createSlice } from "@reduxjs/toolkit";

import { task } from "Type/Type";

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        data: [] as task[]
    },
    reducers: {
        updateTasks : (state, action) => {
            state.data = action.payload;
        },
        completeTask : (state, action) => {
            const index = state.data.findIndex((d) => d.id === action.payload);
            state.data[index].status = 1;
            const current = new Date();
            state.data[index].completeAt = current.toString();
        },
        unCompleteTask : (state, action) => {
            const index = state.data.findIndex((d) => d.id === action.payload);
            state.data[index].status = 0;
            state.data[index].completeAt = '';
        },
        addTask : (state, action) => {
            state.data = [action.payload, ...state.data];
        },
        updateTask : (state, action) => {
            const index = state.data.findIndex((d) => d.id === action.payload.id);
            state.data[index] = action.payload;
        },
        deleteTask : (state, action) => {
            state.data = state.data.filter((d) => d.id !== action.payload);
        }
        
    }
});

export const {updateTasks,completeTask,unCompleteTask,addTask,updateTask,deleteTask} = taskSlice.actions;
export default taskSlice.reducer;