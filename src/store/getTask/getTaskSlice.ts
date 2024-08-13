import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from '../../service/axiosInstance';
import { apiUri } from '../../service/apiEndPoints';
import axios from 'axios';

export const getTask = createAsyncThunk(
  'getTask',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiInstance.get(apiUri.getTask.getTask);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);


const getTaskSlice = createSlice({
  name: 'getTask',
  initialState: {
    data: [],
    isError: false,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(getTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isError = false;
      })

      .addCase(getTask.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(getTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isError = true;
      });
  },
});

export default getTaskSlice.reducer;
