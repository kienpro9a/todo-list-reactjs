import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    { id: 1, completed: false, task: "qwer" },
    { id: 2, completed: true, task: "asdf" },
    { id: 3, completed: false, task: "zxcv" },
    { id: 4, completed: true, task: "qrwutiy" },
    { id: 5, completed: true, task: "fggfhvbn" },
    { id: 6, completed: false, task: "asdfasdf" }
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: state.length ? state[state.length - 1].id + 1 : 1,
        completed: false,
        task: action.payload.task
      };
      state.push(newTodo);
    },
    checkCompleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      state = state.filter((todo) => todo.id !== action.payload.id);
      return state;
    },
    updateTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].task = action.payload.task;
    }
  }
});

export const {
  addTodo,
  checkCompleteTodo,
  deleteTodo,
  updateTodo
} = todoSlice.actions;
export default todoSlice.reducer;
