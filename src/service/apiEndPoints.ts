import { getAttendance } from "../store/getAttendance/getAttendanceSlice";

const baseURL = "http://dev.softcodeq.com";

const apiUri = {
  auth: {
    login: "/Login",
  },
  employee: {
    addEmployee: "/SaveUser",
  },
  employeeList: {
    employeeList: "/GetUsers",
  },
  createTask: {
    createTask: "/api/Task/CreateTask",
  },
  getTask: {
    getTask: "/api/Task/GetTasks",
  },
  updateTask: {
    updateTask: "/api/Task/UpdateTask",
  },
  saveAttendance: {
    saveAttendance: "/SaveAttendance",
  },
  getAttendance: {
    getAttendance: "/GetAttendancesByUserId",
  },
};
export { apiUri, baseURL };
