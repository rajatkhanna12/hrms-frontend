import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import AddEmployeeIcon from "../../assets/icon/AddEmployeeIcon";
import { addEmployee } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
interface FormState {
  userName: string;
  password: string;
  userCode: string;
  departmentId: string;
  name: string;
  phoneNumber: string;
  roleId: string;
  email: string;
  registerUser: string;
}

const initialState: FormState = {
  userName: "",
  password: "",
  userCode: "",
  departmentId: "",
  name: "",
  phoneNumber: "",
  roleId: "",
  email: "",
  registerUser: "",
};

const AddEmployee: React.FC = () => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form data:", formState);
    try {
      const response = await addEmployee({
        username: formState.userName,
        password: formState.password,
        userCode: formState.userCode,
        departmentId: parseInt(formState.departmentId, 10),
        name: formState.name,
        phoneNumber: formState.phoneNumber,
        roleId: parseInt(formState.roleId, 10),
        email: formState.email,
        registerUser: formState.registerUser,
      });
      console.log("Employee added successfully:", response);
           navigate('/profile');
    } catch (error: any) {
      console.error(
        "Failed to add employee:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="bg-white p-8 md:p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl md:text-2xl font-bold mb-8 text-gray-500 text-center flex justify-center items-center">
          <AddEmployeeIcon />
          Add New Employee
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              name="userName"
              label="Username"
              labelStyle="text-gray-600"
              type="text"
              value={formState?.userName}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Username"
            />
            <TextInput
              name="password"
              label="Password"
              labelStyle="text-gray-600"
              type="password"
              value={formState?.password}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Password"
            />
            <TextInput
              name="userCode"
              label="User Code"
              labelStyle="text-gray-600"
              type="text"
              value={formState?.userCode}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter User Code"
            />
            <TextInput
              name="departmentId"
              label="Department ID"
              labelStyle="text-gray-600"
              type="text"
              value={formState?.departmentId}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Department ID"
            />
            <TextInput
              name="name"
              label="Name"
              labelStyle="text-gray-600"
              type="text"
              value={formState?.name}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Name"
            />
            <TextInput
              name="phoneNumber"
              label="Phone Number"
              labelStyle="text-gray-600"
              type="text"
              value={formState?.phoneNumber}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Phone Number"
            />
            <TextInput
              name="roleId"
              label="Role ID"
              labelStyle="text-gray-600"
              type="text"
              value={formState?.roleId}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Role ID"
            />
            <TextInput
              name="email"
              label="Email"
              labelStyle="text-gray-600"
              type="email"
              value={formState?.email}
              onChange={handleChange}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Email"
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
              label="Add Employee"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
