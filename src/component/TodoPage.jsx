import { useDispatch, useSelector } from 'react-redux';
import { updateNewTodo, addTodo, deleteTodo, fetchTodos, checkTodo, updateTodo, fetchSingleTodos } from '../feature/todo/Todo';
import { useEffect } from 'react';
import { selectNewTodo, selectTodos, selectloading, selectSingleTodo } from '../feature/todo/todo.selectors';
import EditTodo from './EditTodo';

function TodoPage() {
  const dispatch = useDispatch();
  const newTodo = useSelector(selectNewTodo);
  const todos = useSelector(selectTodos);
  const loading = useSelector(selectloading);
  const singleTodo = useSelector(selectSingleTodo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(updateNewTodo({ name: e.target.name, value: e.target.value }));
  };

  const handleAddTodo = () => {
    dispatch(addTodo(newTodo));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleCheck = (id) => {
    dispatch(checkTodo(id));
  };

  const handleUpdateTodo = (id, Todo) => {
    dispatch(updateTodo(id, Todo));
  };

  const handlesingleTodo = (id) => {
    dispatch(fetchSingleTodos(id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 my-10">
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-6">Todo List</h1>

      {singleTodo!=null ? (
        <EditTodo singleTodo={singleTodo} />
      ) : (
        <>
          <div className="space-y-4 mb-6">
            <input
              type="text"
              name="title"
              value={newTodo.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              value={newTodo.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="priority"
              value={newTodo.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              type="date"
              name="dueDate"
              value={newTodo.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end">
              <button
                onClick={handleAddTodo}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Add Todo
              </button>
            </div>
          </div>

          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between bg-gray-50 px-6 py-4 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
              >
                <div className={`flex-1 ${todo.status === "completed" ? ' opacity-[0.5]' : ''}`}>
                  <input name="status" type="checkbox" className="check" onClick={() => handleCheck(todo._id)} checked={todo.status === "completed"} />
                  <h3 className="text-xl font-medium text-gray-700">{todo.title}</h3>
                  <p className="text-gray-600">{todo.description}</p>
                  <p className={`text-sm font-semibold ${todo.priority === 'high' ? 'text-red-600' : todo.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
                  </p>
                  <p className="text-sm text-gray-500">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-semibold ${todo.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                    {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                  </span>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="text-red-500 hover:text-red-600 focus:outline-none transition duration-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handlesingleTodo(todo._id)}
                    className="text-red-500 hover:text-red-600 focus:outline-none transition duration-300"
                  >
                    Edit
                  </button>
                  
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TodoPage;
