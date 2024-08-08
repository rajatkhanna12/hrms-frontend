import React, { useState } from "react";
import EditIcon from "../../assets/icon/EditIcon";
import TrashIcon from "../../assets/icon/TrashIcon";
import Button from "../../components/Button";
import { createTask } from "../../service/axiosInstance";

interface Task {
  userId: string;
  title: string;
  description: string;
  startTime: string;
  status: string;
}

const WorkDiaryPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState<Task>({
    userId: "",
    title: "",
    description: "",
    startTime: "",
    status: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdTask = await createTask(newTask);
      console.log(createdTask, "createdTaskcreatedTask");
      setTasks([...tasks, createdTask]);
      setNewTask({
        userId: "",
        title: "",
        description: "",
        startTime: "",
        status: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDelete = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-500">Work Diary</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Task Title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="userId"
              value={newTask.userId}
              onChange={handleInputChange}
              placeholder="User ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="time"
              name="startTime"
              value={newTask.startTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Task Description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <Button
            type="submit"
            label="Add Task"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          />
        </form>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkDiaryPage;
