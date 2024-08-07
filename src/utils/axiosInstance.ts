import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://dev.softcodeq.com',
});

const getToken = () => {
  const userInfo = localStorage.getItem('userInfo');
  console.log(userInfo,"userInfo23")
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
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await apiInstance.post('/Login', {
      userName: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
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
  console.log('Sending request with data:', employeeData);
  try {
    const response = await apiInstance.post('/SaveUser', employeeData);
    return response.data;
  } catch (error) {
    console.error('Add Employee failed', error);
    throw error;
  }
};

  
