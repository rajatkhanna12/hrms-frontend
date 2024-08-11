import React from "react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signInImage from "../../assets/images/signIn.avif";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useApiActions } from "../../hooks/useActions";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApiActions(); 
  const {loading} = useTypedSelector((state) => state.auth);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      const resultAction = await login(values);
      //@ts-ignore
      if (!resultAction.payload.isError) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        if (resultAction.payload) {
          toast.error(`Login failed: ${resultAction.payload?.message}`);
        } else {
          toast.error("Login failed: Unknown error");
        }
      }
    } catch (error) {
      toast.error(`An unexpected error occurred`);
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
                  // disabled={loading || isSubmitting}
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
