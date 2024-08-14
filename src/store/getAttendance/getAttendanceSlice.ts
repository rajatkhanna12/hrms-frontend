import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from '../../service/axiosInstance';
import { apiUri } from '../../service/apiEndPoints';
import axios from 'axios';


export const getAttendance = createAsyncThunk(
  "getAttendance",
  async (
    params: {
      userId: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const {   userId } = params;
      const response = await apiInstance.get(
        `${apiUri.getAttendance.getAttendance}?userId=${userId}`,
        {userId}
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);


const getAttendanceSlice = createSlice({
  name: 'getAttendance',
  initialState: {
    data: [],
    isError: false,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(getAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isError = false;
      })

      .addCase(getAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(getAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isError = true;
      });
  },
});

export default getAttendanceSlice.reducer;
