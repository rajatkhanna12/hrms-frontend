import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import signInImage from "../assets/images/signIn.avif";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { loginUser } from "../utils/axiosInstance";
import { loginSuccess, loginFailure } from "../features/login/authSlice";
import { RootState } from "../store/store";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginUser(username, password);
      const {
        token,
        data: { userRole },
      } = response;
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ token: response?.data?.token, username })
      );
      console.log(token, "userInfo", response?.data?.token);
      dispatch(loginSuccess({ token, username, userRole }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(
        loginFailure("Login failed. Please check your username and password.")
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative w-1/2 bg-gradient-to-r from-blue-500 to-purple-700 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${signInImage})` }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white text-gray-900">
        <div className="max-w-md w-full p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Log In
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextInput
                label="Username"
                value={username}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
                inputStyle="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <TextInput
                label="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                inputStyle="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>
            <Button type="submit" label="Sign In" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
