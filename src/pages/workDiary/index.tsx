  import React, { useEffect, useState } from "react";
  import Button from "../../components/Button";
  import * as Yup from "yup";
  import { Form, Formik } from "formik";
  import TextInput from "../../components/TextInput";
  import { useApiActions } from "../../hooks/useActions";
  import { useTypedSelector } from "../../hooks/useTypedSelector";
  import EditIcon from "../../assets/icon/EditIcon";
  import TrashIcon from "../../assets/icon/TrashIcon";


  const validationSchema = Yup.object({
    taskTitle: Yup.string().required("taskTitle is required"),
    taskDescription: Yup.string().required("taskDescription is required"),
    estimatedHours: Yup.number().required("estimatedHours is required"),
  });
  const WorkDiaryPage: React.FC = () => {
    const { createTask, getTask, updateTask } = useApiActions();
    const { userId } = useTypedSelector((state) => state.auth);
    const { data, loading } = useTypedSelector((state) => state.getTask);
    const [title,setTitle] = useState<string>("");
    const [estimateHour,setEstimateHour] = useState<number>();
    const [desc,setDesc] = useState<string>("")
    const [status,setStatus] = useState<number>(-1)
    const [isUpdate,setIsUpdate] = useState<boolean>(false)
    const [taskId,setTaskId] = useState<number>();

    useEffect(() => {
      getTask();
    }, []);

    const initialSchema = {
      userId: null,
      taskTitle: title,
      taskDescription: desc,
      createdDate: "",
      estimatedHours: estimateHour,
      status:status,
      id:taskId
    };
    const handleSubmit = async (values: {
      taskTitle: string;
      taskDescription: string;
      updateDateTime: string;
      estimatedHours: number;
      id: number;
      status: number;
    }) => {
      if(isUpdate)
      {
        const resp = await updateTask({taskId: values.id,status:values.status})
        alert(JSON.stringify(resp))

      }else{
      await createTask({
        ...values,
        userId,
        createdDate: new Date().toDateString(),
        status: status,
      });
    }
      getTask();
    };

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-500">Work Diary</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <Formik
            initialValues={initialSchema}
            validationSchema={validationSchema}
            enableReinitialize
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
                    defaultChecked={true}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" label="Select status" />
                    <option  value={0}>In Progress</option>
                    <option  value={1}>Completed</option>
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
                  label={isUpdate ? "Update Task  " :"Add Task"}
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
            <tbody>
              {data.length > 0 ? (
                data.map((task:any, index:number) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-100 transition duration-300"
                  >
                    <td className="py-3 px-4 text-gray-700">{task.userId}</td>
                    <td className="py-3 px-4 text-gray-700">{task.taskTitle}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {task.description}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{task.startTime}</td>
                    <td className="py-3 px-4 text-gray-700">{task.status}</td>
                    <td className="py-3 px-4 text-center flex justify-center space-x-2">
                      <button
                        onClick={() => {
                          setTitle(task.taskTitle)
                          setDesc(task.taskDescription)
                          setEstimateHour(task.estimatedHours)
                          setStatus(task.status)
                          setIsUpdate(true)
                          setTaskId(task.id)
                        }}
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
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default WorkDiaryPage;
