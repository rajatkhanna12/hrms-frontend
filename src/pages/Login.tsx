import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signInImage from "../assets/images/signIn.avif";
import { loginUser } from "../service/axiosInstance";
import { RootState } from "../store/store";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Login: React.FC = () => {
  const navigate = useNavigate();
  // const loading = useSelector((state: RootState) => state.auth.loading);
  const authState = useTypedSelector((state: RootState) => state.auth);
  const { loading, error, token, username, userRole } = authState;
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const response = await loginUser(values.username, values.password);
    if (response.message === "Login successful") {
      toast("Login successful!", {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          token: response?.data?.token,
          username: values.username,
        })
      );      navigate("/dashboard");
    } else {
      toast(response?.message, {
        position: "top-right",
        autoClose: 5000,
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <ToastContainer />
      <div className="relative w-1/2 bg-gradient-to-r from-blue-500 to-purple-700 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${signInImage})` }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-custom-blue text-gray-900">
        <div className="max-w-md w-full p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-600">
            Log In
          </h2>
          <Formik
            initialValues={initialValues}
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
                <TextInput
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter username"
                  error={
                    touched.username && errors.username ? errors.username : ""
                  }
                  className="mb-4"
                />
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter password"
                  error={
                    touched.password && errors.password ? errors.password : ""
                  }
                  className="mb-6"
                />
                <Button
                  type="submit"
                  label={loading ? "Signing In..." : "Sign In"}
                  disabled={loading || isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
