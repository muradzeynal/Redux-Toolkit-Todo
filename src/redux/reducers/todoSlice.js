import { createSlice } from "@reduxjs/toolkit";

const initialState1 = [];


export const todoSlice = createSlice({
    name:'todos',
    initialState: initialState1,
    reducers: {
        add: (state, action) => {
          const newTodo = { id:  Math.round(Math.random() * new Date() ) , task: action.payload, completed: false };
          state.push(newTodo);
        },
        remove: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload);
        },
        toggleCompleted: (state, action) => {
            const todo = state.find((todo) => todo.id === action.payload);
            todo.completed = !todo.completed;
        },
    }
})


export const {
    add,
    toggleCompleted,
    remove,
  } = todoSlice.actions;
  
  export default todoSlice.reducer;