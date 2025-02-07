import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateState, updateTodo } from '../feature/todo/Todo';

function EditTodo({ singleTodo }) {
  const dispatch = useDispatch();
  const [updatedTodo, setUpdatedTodo] = useState(singleTodo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTodo({id: updatedTodo._id, todo: updatedTodo}));
    console.log(updatedTodo,"updated")
    // singleTodo=null;
    dispatch(updateState(null))
    
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          <input
            type="text"
            name="title"
            value={updatedTodo.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={updatedTodo.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="priority"
            value={updatedTodo.priority}
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
            value={updatedTodo.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Update Todo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditTodo;
