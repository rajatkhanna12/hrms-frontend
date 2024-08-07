// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employee/employeeSlice';
import attendanceReducer from '../features/attendance/attendanceSlice';
import authReducer from "../features/login/authSlice"

export const store :any = configureStore({
  reducer: {
    employee: employeeReducer,
    attendance: attendanceReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
