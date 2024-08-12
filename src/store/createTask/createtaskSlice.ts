import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../service/axiosInstance";
import axios from "axios";
import { apiUri } from "../../service/apiEndPoints";

export const createTask = createAsyncThunk(
  "createTask",
  async (
    params: {
        userId: number;
        taskTitle: string;
        taskDescription: string;
        updateDateTime: string;
        status: number;
        createdDate : string;
        estimatedHours : number ;
        id : number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiInstance.post(apiUri.createTask, params);
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

const createTaskSlice = createSlice({
  name: "createTask",
  initialState: {
    isError: false,
    loading: false,
    error: null as string | null,
    message:null as string | null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isError = false
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = action.payload.data.isError;
        state.message = action.payload.data.message;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default createTaskSlice.reducer;
