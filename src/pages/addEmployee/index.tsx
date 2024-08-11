import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import AddEmployeeIcon from "../../assets/icon/AddEmployeeIcon";
import { useApiActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { toast } from "react-toastify";

const roles = [
  { id: 1, roleName: "Administrator" },
  { id: 2, roleName: "Employee" },
];

const validationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  userCode: Yup.string().required("User Code is required"),
  departmentId: Yup.number().required("Department ID is required"),
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  roleId: Yup.number().required("Role ID is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const initialSchema = {
  userName: "",
  password: "",
  userCode: "",
  departmentId: null,
  name: "",
  phoneNumber: "",
  roleId: null,
  email: "",
};

const AddEmployee: React.FC = () => {
  const { addEmployee ,logout} = useApiActions();
  const { isError, error, loading,message } = useTypedSelector(
    (state) => state.addEmployee
  );


  const handleSubmit = async (values: {
    userName: string;
    password: string;
    userCode: string;
    departmentId: number;
    name: string;
    phoneNumber: string;
    email: string;
    roleId:number;
  }) => {
    const resp = await addEmployee(values);
    
    // !isError &&  toast(resp?.payload) 
    // logout()
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="bg-white p-8 md:p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl md:text-2xl font-bold mb-8 text-gray-500 text-center flex justify-center items-center">
          <AddEmployeeIcon />
          Add New Employee
        </h2>
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
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  name="userName"
                  label="Username"
                  labelStyle="text-gray-600"
                  type="text"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
                  placeholder="Enter Username"
                  error={
                    touched.userName && errors.userName ? errors.userName : ""
                  }
                />
                <TextInput
                  name="name"
                  label="Name"
                  labelStyle="text-gray-600"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
                  placeholder="Enter Name"
                  error={touched.name && errors.name ? errors.name : ""}
                />
                <TextInput
                  name="phoneNumber"
                  label="Phone Number"
                  labelStyle="text-gray-600"
                  type="text"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
                  placeholder="Enter Phone Number"
                  error={
                    touched.phoneNumber && errors.phoneNumber
                      ? errors.phoneNumber
                      : ""
                  }
                />
                <TextInput
                  name="email"
                  label="Email"
                  labelStyle="text-gray-600"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
                  placeholder="Enter Email"
                  error={touched.email && errors.email ? errors.email : ""}
                />
                <TextInput
                  name="password"
                  label="Password"
                  labelStyle="text-gray-600"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
                  placeholder="Enter Password"
                  error={
                    touched.password && errors.password ? errors.password : ""
                  }
                />
                <TextInput
                  name="userCode"
                  label="Emp Code"
                  labelStyle="text-gray-600"
                  type="text"
                  value={values.userCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
                  placeholder="Enter Emp Code"
                  error={
                    touched.userCode && errors.userCode ? errors.userCode : ""
                  }
                />
                <TextInput
                  name="departmentId"
                  label="Department ID"
                  labelStyle="text-gray-600"
                  type="text"
                  value={values.departmentId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
                  placeholder="Enter Department ID"
                  error={
                    touched.departmentId && errors.departmentId
                      ? errors.departmentId
                      : ""
                  }
                />

                <div className="flex flex-col">
                  <label
                    htmlFor="roleId"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Role ID
                  </label>
                  <select
                    id="roleId"
                    name="roleId"
                    value={values.roleId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 block w-full border text-gray-500 border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" label="Select Role" />
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>
                  {touched.roleId && errors.roleId && (
                    <p className="text-red-500 text-sm mt-1">{errors.roleId}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
                  label= { loading ? "Loading..." : "Add Employee"}
                  
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddEmployee;
