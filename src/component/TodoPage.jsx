import { useDispatch, useSelector } from 'react-redux';
import { updateNewTodo, addTodo, deleteTodo, fetchTodos, checkTodo, updateTodo, fetchSingleTodos } from '../feature/todo/Todo';
import { useEffect, useState } from 'react';
import { selectNewTodo, selectTodos, selectloading, selectSingleTodo } from '../feature/todo/todo.selectors';
import TodoModal from './TodoModal';
import * as Yup from 'yup';

function TodoPage() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const loading = useSelector(selectloading);
  const singleTodo = useSelector(selectSingleTodo);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (values) => {
    setSelectedTodo(null);
    setShow(true);
    setIsEdit(false);
    
    dispatch(addTodo(values));
    
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleCheck = (id) => {
    dispatch(checkTodo(id));
  };

  const handleUpdateTodo = (values) => {
    dispatch(updateTodo(selectedTodo._id, values));
    setShow(false);
  };

  const handlesingleTodo = (id) => {
    dispatch(fetchSingleTodos(id));
    setIsEdit(true);
    setShow(true);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    priority: Yup.string().required('Priority is required'),
    dueDate: Yup.date().required('Due Date is required'),
  });

  const initialValues = {
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
  };

  return (
    <div className="max-w-4xl relative mx-auto bg-white shadow-xl rounded-lg p-8 my-10">
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-6">Todo List</h1>

      {show &&<TodoModal
        show={show}
        setShow={setShow}
        initialValues={isEdit ? { ...selectedTodo } : initialValues}
        validationSchema={validationSchema}
        handleSubmit={isEdit ? handleUpdateTodo : handleAddTodo}
        isEdit={isEdit}
      />} <div className="flex justify-end">
      <button
        
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mt-4 "
     onClick={handleAddTodo}
     >
        Add Todo
      </button>
    </div>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between bg-gray-50 px-6 py-4 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
          >
            <div className={`flex-1 ${todo.status === 'completed' ? ' opacity-[0.5]' : ''}`}>
              <input
                name="status"
                type="checkbox"
                className="check"
                onClick={() => handleCheck(todo._id)}
                checked={todo.status === 'completed'}
              />
              <h3 className="text-xl font-medium text-gray-700">{todo.title}</h3>
              <p className="text-gray-600">{todo.description}</p>
              <p
                className={`text-sm font-semibold ${
                  todo.priority === 'high'
                    ? 'text-red-600'
                    : todo.priority === 'medium'
                    ? 'text-yellow-500'
                    : 'text-green-500'
                }`}
              >
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
              </p>
              <p className="text-sm text-gray-500">Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`text-sm font-semibold ${
                  todo.status === 'completed' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo._id)}
                className="text-red-500 hover:text-red-600 focus:outline-none transition duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  handlesingleTodo(todo._id);
                  setSelectedTodo(todo);
                }}
                className="text-red-500 hover:text-red-600 focus:outline-none transition duration-300"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;
