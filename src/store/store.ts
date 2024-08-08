import { configureStore, combineReducers, EnhancedStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import employeeReducer from '../features/employee/employeeSlice';
import attendanceReducer from '../features/attendance/attendanceSlice';
import authReducer from './login/authSlice';
import sidebarReducer from '../features/dashboard/sidebarSlice';

const rootReducer = combineReducers({
  employee: employeeReducer,
  attendance: attendanceReducer,
  auth: authReducer,
  sidebar: sidebarReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // You can specify specific reducers to persist here
  // blacklist: ['someReducer'], // Use this if you want to exclude a reducer from persisting
   whitelist: ['auth'], // Use this if you only want to persist specific reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store:EnhancedStore = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
