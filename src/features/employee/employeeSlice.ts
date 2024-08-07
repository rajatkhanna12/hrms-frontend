// src/slices/employeeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmployeeState {
  employees: Array<{ name: string; email: string; position: string; phone: string; department: string; userId: string; empCode: string; password: string }>;
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee(state, action: PayloadAction<{ name: string; email: string; position: string; phone: string; department: string; userId: string; empCode: string; password: string }>) {
      state.employees.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
