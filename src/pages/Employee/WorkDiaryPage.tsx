import React, { useState } from "react";
import EditIcon from "../../assets/icon/EditIcon";
import TrashIcon from "../../assets/icon/TrashIcon";
import Button from "../../components/Button";

interface Task {
  title: string;
  description: string;
  startTime: string;
  status: string;
}

const WorkDiaryPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      title: "Task 1",
      description: "Description for Task 1",
      startTime: "10:00 AM",
      status: "Completed",
    },
    {
      title: "Task 2",
      description: "Description for Task 2",
      startTime: "11:00 AM",
      status: "In Progress",
    },
    {
      title: "Task 3",
      description: "Description for Task 3",
      startTime: "12:00 PM",
      status: "In Progress",
    },
    {
      title: "Task 4",
      description: "Description for Task 4",
      startTime: "1:00 PM",
      status: "Completed",
    },
  ]);

  const handleDelete = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-500">Work Diary</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="mb-6 flex justify-between items-center">
          <Button
            type="submit"
            label="Add New Task"
            className="text-white w-[15%] bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
          />
        </div>

        <table className="w-full border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-100 border-b">
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
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
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
