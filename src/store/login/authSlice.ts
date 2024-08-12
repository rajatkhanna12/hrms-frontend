import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from '../../service/axiosInstance';
import axios from 'axios';
import { apiUri } from '../../service/apiEndPoints';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiInstance.post(apiUri.auth.login, credentials);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      token: null as string | null,
      userName: null as string | null,
      userRole: null as string | null,
      loading: false,
      error: null as string | null,
      userId:null as number | null
    },
    reducers: {
      logout: (state) => {
        state.token = null;
        state.userName = null;
        state.userRole = null;
        localStorage.removeItem('userInfo');
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.token = action.payload.data.token;
          state.userName = action.payload.data.userName;
          state.userRole = action.payload.data.userRole;
          state.userId = action.payload.data.userId;
          localStorage.setItem('userInfo', JSON.stringify({
            token: action.payload.data.token,
            userName: action.payload.data.userName,
            userRole: action.payload.data.userRole,
            userId:action.payload.data.userId
          }));
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  

export const { logout } = authSlice.actions;
export default authSlice.reducer;
