import { name } from "./Todo";

const selectReducer = (state) => state[name];

export const selectTodos = (state) => selectReducer(state).todos;

export const selectNewTodo = (state) => selectReducer(state).newTodo;
export const selectloading = (state) => selectReducer(state).loading;
export const selectSingleTodo = (state) => state.todos.singleTodo;
export const selectlimitedTodo = (state) => state.todos.getlimittodo;
