import React from "react";

const dummyEmployees = [
  {
    id: "1",
    name: "John Doe",
    userName: "johndoe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    departmentName: "Engineering",
    roleName: "Software Engineer",
  },
  {
    id: "2",
    name: "Jane Smith",
    userName: "janesmith",
    email: "jane.smith@example.com",
    phoneNumber: "987-654-3210",
    departmentName: "Marketing",
    roleName: "Marketing Specialist",
  },
];

const EmployeeList: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Employee List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.departmentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.roleName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
