import { useDispatch, useSelector } from 'react-redux';
import { updateNewTodo, addTodo, deleteTodo, fetchTodos, checkTodo, updateTodo, fetchSingleTodos, fetchgetlimit } from '../feature/todo/Todo';
import { useEffect, useRef, useState } from 'react';
import { selectNewTodo, selectTodos, selectloading, selectSingleTodo, selectlimitedTodo } from '../feature/todo/todo.selectors';
import TodoModal from './TodoModal';
import * as Yup from 'yup';
import { BsThreeDotsVertical } from "react-icons/bs";
import Loader from './Loader';

function TodoPage() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const getlimitdata = useSelector(selectlimitedTodo);
  const loading = useSelector(selectloading);
  const singleTodo = useSelector(selectSingleTodo);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(3);
  const [isloading, setisloading] = useState(false);

  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);  
    } else {
      setOpenDropdownId(id);  
    }
  };

  useEffect(() => {
    setisloading(true)
    dispatch(fetchgetlimit({ page: currentPage,})).then((   )=> setisloading(false))
  }, [dispatch, currentPage]);

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
    dispatch(updateTodo({ id: selectedTodo._id, todo: values }));
    setShow(false);
  };

  const handlesingleTodo = (id) => {
    dispatch(fetchSingleTodos(id));
    setIsEdit(true);
    setShow(true);
  };

  const changegetlimitdata = () => {
    dispatch(fetchgetlimit());
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

  const modalRef = useRef(null);

  const totalPages = Math.ceil(getlimitdata?.totalCount / todosPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    {isloading==true? (<Loader/>):(   <div className={`max-w-4xl relative mx-auto bg-white shadow-xl rounded-lg p-8 my-10`}>
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-6">Todo List</h1>

      {show && (
        <TodoModal
          show={show}
          setShow={setShow}
          initialValues={isEdit ? { ...selectedTodo } : initialValues}
          validationSchema={validationSchema}
          handleSubmit={isEdit ? handleUpdateTodo : handleAddTodo}
          isEdit={isEdit}
          modalRef={modalRef}  
        />
      )}

      <div className="flex justify-end mb-4 ">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mt-4"
          onClick={() => {
            setSelectedTodo(null);
            setShow(true);
            setIsEdit(false);
          }}
        >
          Add Todo
        </button>
      </div>

      <ul className="space-y-4">
        {getlimitdata?.todos?.map((todo) => (
          <li
            key={todo._id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between shadow-lg shadow-black bg-gray-50 px-4 py-4 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
          >
            <div className={`flex-1 ${todo.status === 'completed' ? 'opacity-[0.5]' : ''}`}>
              <div className="flex flex-col gap-y-4 md:gap-x-10">
                <div className='flex justify-between'>
                  <input
                    name="status"
                    type="checkbox"
                    className="check"
                    onClick={() => handleCheck(todo._id)}
                    checked={todo.status === 'completed'}
                  />
                  <div className="relative ">
                    <BsThreeDotsVertical size={30} onClick={() => toggleDropdown(todo._id)} className="cursor-pointer" />
                    {openDropdownId === todo._id && (
                      <div className="absolute right-0 bg-gray-100 flex flex-col gap-y-2 p-2 border-2 mt-2 rounded-md shadow-lg">
                        <button
                          onClick={() => handleDeleteTodo(todo._id)}
                          className="hover:bg-blue-400 hover:text-white focus:outline-none transition duration-300 text-black p-2 rounded-md w-full text-left"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            handlesingleTodo(todo._id);
                            setSelectedTodo(todo);
                          }}
                          className="hover:bg-blue-400 hover:text-white focus:outline-none transition duration-300 text-black p-2 rounded-md w-full text-left"
                        >
                          Edit
                        </button>
                        <button
                          onClick={changegetlimitdata}
                          className="hover:bg-blue-400 hover:text-white focus:outline-none transition duration-300 text-black p-2 rounded-md w-full text-left"
                        >
                          get limited data
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex gap-x-6'>
                  <h3 className="text-xl font-medium text-gray-700 sm:text-xl md:text-2xl">{todo.title}</h3>
                  <p
                    className={`text-sm font-semibold ${
                      todo.priority === 'high'
                        ? 'text-red-600 bg-red-200 '
                        : todo.priority === 'medium'
                        ? 'text-yellow-500 bg-yellow-200'
                        : 'text-green-500 bg-green-200'
                    } sm:text-base md:text-lg mt-2 md:mt-0 rounded-2xl p-2`}
                  >
                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-base md:text-lg mt-4 md:mt-0">{todo.description}</p>
              <p className="text-sm text-gray-500 sm:text-base md:text-md mt-4 md:mt-0">
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center p-4 md:p-0 space-x-4 flex-wrap mt-4 md:mt-0">
              <span
                className={`text-sm font-semibold ${todo.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}
              >
                {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Previous
        </button>
        <span className="mx-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>)}
    </>
  );
}

export default TodoPage;
