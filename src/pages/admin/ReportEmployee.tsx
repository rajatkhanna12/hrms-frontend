import React from "react";

const ReportEmployee: React.FC = () => {
  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      position: "Developer",
      tasks: [
        {
          date: "2024-08-01",
          task: "Fix bugs in the login module",
          status: "Completed",
        },
        {
          date: "2024-08-02",
          task: "Implement new features for dashboard",
          status: "In Progress",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      position: "Manager",
      tasks: [
        {
          date: "2024-08-01",
          task: "Review team performance",
          status: "Completed",
        },
        {
          date: "2024-08-02",
          task: "Plan strategy meeting for next quarter",
          status: "Pending",
        },
      ],
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-500">
        Employee Daily Task Report
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Tasks
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                {employee.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                {employee.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                {employee.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                {employee.position}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="space-y-2">
                  {employee.tasks.map((task, index) => (
                    <div
                      key={index}
                      className="border p-2 rounded-md shadow-sm bg-gray-50"
                    >
                      <p className="font-medium text-gray-700">{task.date}</p>
                      <p className="text-gray-700">{task.task}</p>
                      <p
                        className={`font-semibold ${
                          task.status === "Completed"
                            ? "text-green-500"
                            : task.status === "In Progress"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {task.status}
                      </p>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportEmployee;
