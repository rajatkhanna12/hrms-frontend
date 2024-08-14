import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../service/axiosInstance";
import axios from "axios";
import { apiUri } from "../../service/apiEndPoints";

export const saveAttendance = createAsyncThunk(
  "saveAttendance",
  async (
    params: {
      userId: number;
      punchIn: string;
      punchOut: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiInstance.post(
        apiUri.saveAttendance.saveAttendance,
        params
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      } else {
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

const saveAttendanceSlice = createSlice({
  name: "saveAttendance",
  initialState: {
    isError: false,
    loading: false,
    error: null as string | null,
    message: null as string | null,
    id: null as number | null,
    status: null as number | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isError = false;
        state.id = null;
        state.status = null;
      })
      .addCase(saveAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = action.payload.data.isError;
        state.message = action.payload.data.message;
        state.id = action.payload.data.id;
        state.status = action.payload.data.status;
      })
      .addCase(saveAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default saveAttendanceSlice.reducer;
