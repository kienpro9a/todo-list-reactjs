import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: JSON.parse(localStorage.getItem("TodoList")) || [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: state.length ? state[state.length - 1].id + 1 : 1,
        completed: false,
        task: action.payload.task
      };
      state.push(newTodo);
      localStorage.setItem("TodoList", JSON.stringify(state));
    },
    checkCompleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
      localStorage.setItem("TodoList", JSON.stringify(state));
    },
    deleteTodo: (state, action) => {
      state = state.filter((todo) => todo.id !== action.payload.id);
      localStorage.setItem("TodoList", JSON.stringify(state));
      return state;
    },
    updateTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].task = action.payload.task;
      localStorage.setItem("TodoList", JSON.stringify(state));
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
