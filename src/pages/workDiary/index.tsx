import React, { useState } from "react";
import Button from "../../components/Button";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextInput from "../../components/TextInput";
import { useApiActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const initialSchema = {
  userId: null,
  taskTitle: "",
  taskDescription: "",
  createdDate: "",
  estimatedHours: null,
};

const validationSchema = Yup.object({
  userId: Yup.number().required("userId is required"),
  taskTitle: Yup.string().required("taskTitle is required"),
  taskDescription: Yup.string().required("taskDescription is required"),
  createdDate: Yup.string().required("createdDate is required"),
  estimatedHours: Yup.number().required("estimatedHours is required"),
});
const WorkDiaryPage: React.FC = () => {
  const { createTask } = useApiActions();
  const { isError, error, loading, message } = useTypedSelector(
    (state) => state.createTask
  );

  const handleSubmit = async (values: {
    userId: number;
    taskTitle: string;
    taskDescription: string;
    updateDateTime: string;
    status: number;
    createdDate: string;
    estimatedHours: number;
    id: number;
  }) => {
    const resp = await createTask(values);
    console.log(resp, "Response");
  };

  // const handleDelete = (index: number) => {
  //   setTasks(tasks.filter((_, i) => i !== index));
  // };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-500">Work Diary</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <Formik
          initialValues={initialSchema}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
          }) => (
            <Form className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <TextInput
                  name="taskTitle"
                  type="text"
                  label="Task Title"
                  value={values.taskTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Task Title"
                  isBorder
                  error={
                    touched.taskTitle && errors.taskTitle
                      ? errors.taskTitle
                      : ""
                  }
                />
                {/* <TextInput
                  name="userId"
                  type="text"
                  label="User ID"
                  value={values.userId}
                  onChange={handleChange}
                  isBorder
                  onBlur={handleBlur}
                  placeholder="User ID"
                  error={touched.userId && errors.userId ? errors.userId : ""}
                /> */}
                {/* <TextInput
                  name="createdDate"
                  type="time"
                  label="createdDate"
                  value={values.createdDate}
                  isBorder
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.createdDate && errors.createdDate
                      ? errors.createdDate
                      : ""
                  }
                /> */}
                <TextInput
                  name="estimatedHours"
                  type="number"
                  label="Estimated Hours"
                  value={values.estimatedHours}
                  onChange={handleChange}
                  isBorder
                  onBlur={handleBlur}
                  error={
                    touched.estimatedHours && errors.estimatedHours
                      ? errors.estimatedHours
                      : ""
                  }
                />

                <select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" label="Select status" />
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <textarea
                  name="taskDescription"
                  value={values.taskDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Task Description"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                type="submit"
                label="Add Task"
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                // disabled={isSubmitting || loading}
              />
            </Form>
          )}
        </Formik>
        <table className="w-full border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-100 border-b">
              <th className="py-3 px-4 text-left text-blue-800">User ID</th>
              <th className="py-3 px-4 text-left text-blue-800">Title</th>
              <th className="py-3 px-4 text-left text-blue-800">Description</th>
              <th className="py-3 px-4 text-left text-blue-800">Start Time</th>
              <th className="py-3 px-4 text-left text-blue-800">Status</th>
              <th className="py-3 px-4 text-center text-blue-800">Actions</th>
            </tr>
          </thead>
          {/* <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition duration-300"
                >
                  <td className="py-3 px-4 text-gray-700">{task.userId}</td>
                  <td className="py-3 px-4 text-gray-700">{task.title}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {task.description}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{task.startTime}</td>
                  <td className="py-3 px-4 text-gray-700">{task.status}</td>
                  <td className="py-3 px-4 text-center flex justify-center space-x-2">
                    <button
                      className="text-yellow-600 hover:text-yellow-700 transition duration-300"
                      aria-label="Edit"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-700 transition duration-300"
                      aria-label="Delete"
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default WorkDiaryPage;
