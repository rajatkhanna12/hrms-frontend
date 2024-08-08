import axios from "axios";
import { apiUri, baseURL } from "./apiEndPoints";

const apiInstance = axios.create({
  baseURL: baseURL,
});

const getToken = () => {
  const userInfo = localStorage.getItem("userInfo");
  console.log(userInfo, "userInfo23");
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

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await apiInstance.post(apiUri.auth.login, {
      userName: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await apiInstance.get("/GetUsers");
    return response.data;
  } catch (error) {
    console.error("Get Users failed", error);
    throw error;
  }
};

export const addEmployee = async (employeeData: {
  username: string;
  password: string;
  userCode: string;
  departmentId: number;
  name: string;
  phoneNumber: string;
  roleId: number;
  email: string;
  registerUser: string;
}) => {
  console.log("Sending request with data:", employeeData);
  try {
    const response = await apiInstance.post("/SaveUser", employeeData);
    return response.data;
  } catch (error) {
    console.error("Add Employee failed", error);
    throw error;
  }
};

export const createTask = async (taskData: {
  userId: string;
  title: string;
  description: string;
  startTime: string;
  status: string;
}) => {
  try {
    console.log('Sending request with data:', taskData);
    const response = await apiInstance.post('/api/Task/CreateTask', taskData);
    console.log('Response received:', response);
    return response.data;
  } catch (error: any) {
    console.error('Error creating task:', error.response ? error.response.data : error.message);
    throw error;
  }
};

