import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { VITE_BASE_URL } = import.meta.env;
console.log(VITE_BASE_URL);

const apiUrl = `${VITE_BASE_URL}/api/todo`;
console.log(apiUrl);

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(`${apiUrl}/getalltodo`);
  console.log("response", response);
  return response.data;
});
export const fetchSingleTodos = createAsyncThunk(
  "todos/fetchSingleTodos",
  async (id) => {
    const response = await axios.get(`${apiUrl}/singleTodo/${id}`);
    console.log("response", response);
    return response.data;
  }
);

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
  async ({ id, todo }) => {
    console.log(id, "updated");
    console.log(todo, "todo.todo");
    const response = await axios.put(`${apiUrl}/updatetodo/${id}`, todo);
    console.log(response.data);
    return response.data;
    // console.log(response.data);
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    singleTodo: null,
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
    updateState: (state, action) => {
      state.singleTodo = action.payload;
    },

    checkTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo._id === action.payload);
      if (!todo) {
        console.error("To-Do not found!");
        return;
      }
      const iscompleted = todo.status === "pending" ? "completed" : "pending";
      console.log(iscompleted + " completed successfully " + todo.status);
      state.todos = state.todos.map((todoItem) =>
        todoItem._id === action.payload
          ? { ...todoItem, status: iscompleted }
          : todoItem
      );
      console.log(state.todos, "sending");

      state.todos.map((todoItem) => {
        if (todoItem.status === "completed") {
          console.log("All todos completed true");
          return true;
        } else {
          console.log("All todos pending false");
          return false;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        console.log(" inside fetchTodos.pending");
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        console.log(" inside fetchTodos.fulfilled");
        state.loading = false;
        state.todos = action.payload.Alltodo;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        console.log(" inside fetchTodos.rejected");
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
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTodo = action.payload;
        state.todos = state.todos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        );
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleTodos.pending, (state) => {
        console.log(" inside fetchTodos.pending");
        state.loading = true;
      })
      .addCase(fetchSingleTodos.fulfilled, (state, action) => {
        console.log(" inside fetchTodosingle.fulfilled");
        state.loading = false;
        console.log(action.payload, "done");
        state.singleTodo = action.payload;
        console.log(state.singleTodo, "done");
      })
      .addCase(fetchSingleTodos.rejected, (state, action) => {
        console.log(" inside fetchTodos.rejected");
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { updateNewTodo, checkTodo, updateState } = todoSlice.actions;
export default todoSlice.reducer;
export const { name } = todoSlice;
