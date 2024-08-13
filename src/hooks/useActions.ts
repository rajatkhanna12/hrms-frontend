import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { login, logout } from '../store/login/authSlice';
import { addEmployee } from '../store/addEmployee/addEmployeeSlice';
import { employeeList } from '../store/empList/employeeListSlice';
import { createTask } from '../store/createTask/createtaskSlice';

export const useApiActions = () => {
  const dispatch: AppDispatch = useDispatch();

  return {
    //@ts-ignore
    login: (credentials: { username: string, password: string }) => dispatch(login(credentials)),
    logout: () => dispatch(logout()),
    addEmployee: (params: {
      userName: string;
      password: string;
      userCode: string;
      departmentId: number;
      name: string;
      phoneNumber: string;
      email: string;
      roleId: number;
      //@ts-ignore
    }) => dispatch(addEmployee(params)),
    //@ts-ignore
    employeeList: () => dispatch(employeeList()),
    createTask: (params: {
      userId: number;
        taskTitle: string;
        taskDescription: string;
        updateDateTime: string;
        status: number;
        createdDate : string;
        estimatedHours : number ;
        id : number;
    }) => dispatch(createTask(params)),
    
    getTask: () => dispatch(getTask()),
  };
};
