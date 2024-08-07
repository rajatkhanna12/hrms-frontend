// src/features/attendance/attendanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AttendanceEntry {
  id: number;
  employeeUserID: string;
  punchIn: string;
  punchOut?: string;
  totalWorkHours?: string;
}

interface AttendanceState {
  attendanceData: AttendanceEntry[];
}

const initialState: AttendanceState = {
  attendanceData: [],
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    addPunchIn: (state, action: PayloadAction<{ employeeUserID: string }>) => {
      const now = new Date().toLocaleString();
      const { employeeUserID } = action.payload;
      state.attendanceData.push({
        id: state.attendanceData.length + 1,
        employeeUserID,
        punchIn: now,
      });
    },
    addPunchOut: (state, action: PayloadAction<{ employeeUserID: string }>) => {
      const now = new Date().toLocaleString();
      const index = state.attendanceData.findIndex(
        entry => entry.employeeUserID === action.payload.employeeUserID && !entry.punchOut
      );
      if (index !== -1) {
        const punchInDate = new Date(state.attendanceData[index].punchIn);
        const totalWorkHours =
          ((new Date().getTime() - punchInDate.getTime()) / (1000 * 60 * 60)).toFixed(2) + 'h';
        state.attendanceData[index] = {
          ...state.attendanceData[index],
          punchOut: now,
          totalWorkHours,
        };
      }
    },
  },
});

export const { addPunchIn, addPunchOut } = attendanceSlice.actions;
export default attendanceSlice.reducer;
