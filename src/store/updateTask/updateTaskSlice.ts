import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../service/axiosInstance";
import axios from "axios";
import { apiUri } from "../../service/apiEndPoints";

export const updateTask = createAsyncThunk(
  "updateTask",
  async (
    params: {
      taskId: number;
      status: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiInstance.post(
        apiUri.updateTask.updateTask,
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

const updateTaskSlice = createSlice({
  name: "updateTask",
  initialState: {
    isError: false,
    loading: false,
    error: null as string | null,
    message: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isError = false;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = action.payload.data.isError;
        state.message = action.payload.data.message;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default updateTaskSlice.reducer;
