// src/components/TodoPage.js
import  { useState } from 'react';

function TodoPage() {
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
  });


  const todos = [
    {
      _id: '67a0b76a75c2de61c3434e41',
      title: 'Sample Task 21',
      description: 'This is a description of the task of task3.',
      status: 'pending',
      priority: 'high',
      createdAt: '2025-02-03T12:32:42.754Z',
      dueDate: '2025-02-03T12:32:42.754Z',
      __v: 0
    },
    {
      _id: '67a1c0f133e9e849a9dd643d',
      title: 'Sample Task 22',
      description: 'This is a description of the task of task2.',
      status: 'completed',
      priority: 'low',
      createdAt: '2025-02-04T07:25:37.374Z',
      dueDate: '2025-02-04T07:25:37.374Z',
      __v: 0
    },
    {
      _id: '67a2157e94fba1585c2129d8',
      title: 'Sample Task 20',
      description: 'This is a description of the task of task3.',
      status: 'pending',
      priority: 'medium',
      createdAt: '2025-02-04T13:26:22.926Z',
      dueDate: '2025-02-04T13:26:22.926Z',
      __v: 0
    }
  ];

  
  const handleChange = (e) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleAddTodo = () => {
    if (newTodo.title.trim() && newTodo.description.trim()) {
      
      console.log('New Todo:', newTodo);
      setNewTodo({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
        dueDate: '',
      });
    } else {
      console.log('Please fill out all fields');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 my-10">
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-6">Todo List</h1>

      
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
        <select
          name="status"
          value={newTodo.status}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
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
            <div className="flex-1">
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
                onClick={() => console.log(`Delete todo with id: ${todo._id}`)} 
                className="text-red-500 hover:text-red-600 focus:outline-none transition duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;
