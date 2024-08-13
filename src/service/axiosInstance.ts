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
