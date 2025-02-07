import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { VITE_BASE_URL } = import.meta.env;
console.log(VITE_BASE_URL);

const apiUrl = `${VITE_BASE_URL}/api/todo`;
console.log(apiUrl);

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(`${apiUrl}/getalltodo`);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  const response = await axios.post(`${apiUrl}/createtodo`, newTodo);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${apiUrl}/deletetodo/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, updatedTodo }) => {
    const response = await axios.put(`${apiUrl}/updatetodo/${id}`, updatedTodo);
    return response.data;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    newTodo: {
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
      status: "pending",
    },
    loading: false,
    error: null,
  },
  reducers: {
    updateNewTodo: (state, action) => {
      const { name, value } = action.payload;
      state.newTodo[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.Alltodo;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos = [action.payload, ...state.todos];
        state.newTodo = {
          title: "",
          description: "",
          priority: "low",
          dueDate: "",
          status: "pending",
        };
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index >= 0) {
          state.todos[index] = action.payload;
        }
      });
  },
});
export const { updateNewTodo } = todoSlice.actions;
export default todoSlice.reducer;
export const { name } = todoSlice;
