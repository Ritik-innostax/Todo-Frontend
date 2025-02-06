import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../feature/todo/Todo";

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default store;
