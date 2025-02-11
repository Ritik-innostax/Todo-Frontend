import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { RxCross1 } from 'react-icons/rx';

const TodoModal = ({ show, setShow, initialValues, validationSchema, handleSubmit, isEdit }) => {
  return (
    <div
      className={`space-y-4 mb-6 ${show ? 'block z-10 shadow-lg p-4 fixed inset-0 bg-opacity-50 bg-gray-800' : 'hidden z-0'}`}
    >
      <div className="relative max-w-lg mx-auto bg-white p-6 rounded-lg shadow-xl mt-40">
        <RxCross1
          className="absolute right-4 top-2 cursor-pointer text-gray-500"
          size={30}
          onClick={() => setShow(false)}
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="form-grp">
                <label htmlFor="title" className="labelstyle">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="form-grp">
                <label htmlFor="description" className="labelstyle">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="form-grp">
                <label htmlFor="priority" className="labelstyle">
                  Priority
                </label>
                <Field
                  as="select"
                  name="priority"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </Field>
                <ErrorMessage name="priority" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="form-grp mt-2">
                <label htmlFor="dueDate" className="labelstyle">
                  Due Date
                </label>
                <Field
                  type="date"
                  name="dueDate"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                />
                <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm m-2" />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mt-4"
                >
                  {isEdit ? 'Edit Todo' : 'Add Todo'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TodoModal;
