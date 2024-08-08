// import React from "react";
// import { useDispatch } from "react-redux";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import TextInput from "../../components/TextInput";
// import Button from "../../components/Button";
// import AddEmployeeIcon from "../../assets/icon/AddEmployeeIcon";
// import { addEmployee } from "../../utils/axiosInstance";
// import { setActiveSection } from "../../features/dashboard/sidebarSlice";

// const validationSchema = Yup.object({
//   userName: Yup.string().required("Username is required"),
//   password: Yup.string().required("Password is required"),
//   userCode: Yup.string().required("User Code is required"),
//   departmentId: Yup.string().required("Department ID is required"),
//   name: Yup.string().required("Name is required"),
//   phoneNumber: Yup.string().required("Phone Number is required"),
//   roleId: Yup.string().required("Role ID is required"),
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
// });

// const AddEmployee: React.FC = () => {
//   const dispatch = useDispatch();

//   const formik = useFormik({
//     initialValues: {
//       userName: "",
//       password: "",
//       userCode: "",
//       departmentId: "",
//       name: "",
//       phoneNumber: "",
//       roleId: "",
//       email: "",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const response = await addEmployee({
//           username: values.userName,
//           password: values.password,
//           userCode: values.userCode,
//           departmentId: parseInt(values.departmentId, 10),
//           name: values.name,
//           phoneNumber: values.phoneNumber,
//           roleId: parseInt(values.roleId, 10),
//           email: values.email,
//         });
//         console.log("Employee added successfully:", response);
//         dispatch(setActiveSection("profile"));
//       } catch (error: any) {
//         console.error(
//           "Failed to add employee:",
//           error.response?.data || error.message
//         );
//       }
//     },
//   });

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
//       <div className="bg-white p-8 md:p-6 rounded-lg shadow-lg max-w-4xl w-full">
//         <h2 className="text-2xl md:text-2xl font-bold mb-8 text-gray-500 text-center flex justify-center items-center">
//           <AddEmployeeIcon />
//           Add New Employee
//         </h2>
//         <form onSubmit={formik.handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <TextInput
//               name="userName"
//               label="Username"
//               labelStyle="text-gray-600"
//               type="text"
//               value={formik.values.userName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
//               placeholder="Enter Username"
//               error={formik.touched.userName && formik.errors.userName}
//             />
//             <TextInput
//               name="name"
//               label="Name"
//               labelStyle="text-gray-600"
//               type="text"
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
//               placeholder="Enter Name"
//               error={formik.touched.name && formik.errors.name}
//             />
//             <TextInput
//               name="phoneNumber"
//               label="Phone Number"
//               labelStyle="text-gray-600"
//               type="text"
//               value={formik.values.phoneNumber}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
//               placeholder="Enter Phone Number"
//               error={formik.touched.phoneNumber && formik.errors.phoneNumber}
//             />
//             <TextInput
//               name="email"
//               label="Email"
//               labelStyle="text-gray-600"
//               type="email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
//               placeholder="Enter Email"
//               error={formik.touched.email && formik.errors.email}
//             />
//             <TextInput
//               name="password"
//               label="Password"
//               labelStyle="text-gray-600"
//               type="password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
//               placeholder="Enter Password"
//               error={formik.touched.password && formik.errors.password}
//             />
//             <TextInput
//               name="userCode"
//               label="Emp Code"
//               labelStyle="text-gray-600"
//               type="text"
//               value={formik.values.userCode}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
//               placeholder="Enter Emp Code"
//               error={formik.touched.userCode && formik.errors.userCode}
//             />
//             <TextInput
//               name="departmentId"
//               label="Department ID"
//               labelStyle="text-gray-600"
//               type="text"
//               value={formik.values.departmentId}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
//               placeholder="Enter Department ID"
//               error={formik.touched.departmentId && formik.errors.departmentId}
//             />

//             <TextInput
//               name="roleId"
//               label="Role ID"
//               labelStyle="text-gray-600"
//               type="text"
//               value={formik.values.roleId}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
//               placeholder="Enter Role ID"
//               error={formik.touched.roleId && formik.errors.roleId}
//             />
//           </div>
//           <div className="flex justify-center">
//             <Button
//               type="submit"
//               className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
//               label="Add Employee"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;




import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import AddEmployeeIcon from "../../assets/icon/AddEmployeeIcon";
import { addEmployee } from "../../service/axiosInstance";
import { setActiveSection } from "../../features/dashboard/sidebarSlice";

const roles = [
  { id: 1, roleName: "Administrator" },
  { id: 2, roleName: "Employee" }
];

const validationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  userCode: Yup.string().required("User Code is required"),
  departmentId: Yup.string().required("Department ID is required"),
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  roleId: Yup.string().required("Role ID is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const AddEmployee: React.FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      userCode: "",
      departmentId: "",
      name: "",
      phoneNumber: "",
      roleId: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await addEmployee({
          username: values.userName,
          password: values.password,
          userCode: values.userCode,
          departmentId: parseInt(values.departmentId, 10),
          name: values.name,
          phoneNumber: values.phoneNumber,
          roleId: parseInt(values.roleId, 10),
          email: values.email,
        });
        console.log("Employee added successfully:", response);
        dispatch(setActiveSection("profile"));
      } catch (error: any) {
        console.error(
          "Failed to add employee:",
          error.response?.data || error.message
        );
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="bg-white p-8 md:p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl md:text-2xl font-bold mb-8 text-gray-500 text-center flex justify-center items-center">
          <AddEmployeeIcon />
          Add New Employee
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              name="userName"
              label="Username"
              labelStyle="text-gray-600"
              type="text"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Username"
              error={formik.touched.userName && formik.errors.userName}
            />
            <TextInput
              name="name"
              label="Name"
              labelStyle="text-gray-600"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Name"
              error={formik.touched.name && formik.errors.name}
            />
            <TextInput
              name="phoneNumber"
              label="Phone Number"
              labelStyle="text-gray-600"
              type="text"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Phone Number"
              error={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
            <TextInput
              name="email"
              label="Email"
              labelStyle="text-gray-600"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Email"
              error={formik.touched.email && formik.errors.email}
            />
            <TextInput
              name="password"
              label="Password"
              labelStyle="text-gray-600"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Password"
              error={formik.touched.password && formik.errors.password}
            />
            <TextInput
              name="userCode"
              label="Emp Code"
              labelStyle="text-gray-600"
              type="text"
              value={formik.values.userCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Emp Code"
              error={formik.touched.userCode && formik.errors.userCode}
            />
            <TextInput
              name="departmentId"
              label="Department ID"
              labelStyle="text-gray-600"
              type="text"
              value={formik.values.departmentId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-500"
              placeholder="Enter Department ID"
              error={formik.touched.departmentId && formik.errors.departmentId}
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
                value={formik.values.roleId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border text-gray-500 border-gray-300 p-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" label="Select Role" />
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
              {formik.touched.roleId && formik.errors.roleId && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.roleId}</p>
              )}
            </div>
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

