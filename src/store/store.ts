import {
  configureStore,
  combineReducers,
  EnhancedStore,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./login/authSlice";
import employeeReducer from "./addEmployee/addEmployeeSlice";
import attendanceReducer from "../features/attendance/attendanceSlice";
import sidebarReducer from "./dashboard/sidebarSlice";
import employeeListSliceReducer from "./empList/employeeListSlice";
import createTaskSliceReducer from "./createTask/createtaskSlice";
// import getTaskSliceReducer from "./getTask/getTaskSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  addEmployee: employeeReducer,
  attendance: attendanceReducer,
  sidebar: sidebarReducer,
  employeeList: employeeListSliceReducer,
  createTask: createTaskSliceReducer,
  // getTask: getTaskSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: EnhancedStore = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
