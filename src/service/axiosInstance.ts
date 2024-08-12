import axios from "axios";
import { apiUri, baseURL } from "./apiEndPoints";
import { useDispatch } from "react-redux";
import { useApiActions } from "../hooks/useActions";
import { useNavigate } from "react-router-dom";

export const apiInstance = axios.create({
  baseURL: baseURL,
});


const getToken = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    return token;
  }
  return null;
};

apiInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
   
    // error.message === "Request failed with status code 401" && logout()
      // navigate('/login')
    return Promise.reject(error);
  }
);


// export const createTask = async (taskData: {
//   userId: string;
//   title: string;
//   description: string;
//   startTime: string;
//   status: string;
// }) => {
//   try {
//     const response = await apiInstance.post("/api/Task/CreateTask", taskData);
//     return response.data;
//   } catch (error: any) {
//     console.error(
//       "Error creating task:",
//       error.response ? error.response.data : error.message
//     );
//     throw error;
//   }
// };
