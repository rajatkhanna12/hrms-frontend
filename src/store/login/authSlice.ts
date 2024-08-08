import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUri } from "../../service/apiEndPoints";

interface AuthState {
  token: string | null;
  username: string | null;
  userRole: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  username: null,
  userRole: null,
  loading: false,
  error: null,
};

// Define the async thunk
export const auth = createAsyncThunk(
  apiUri.auth.login,
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUri.auth.login, credentials);
      const { data } = response;

      // Return the data structure expected in the state
      return {
        token: data.token,
        username: data.username,
        userRole: data.userRole,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle known Axios errors
        return rejectWithValue(error.message);
      } else {
        // Handle unknown errors
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(auth.fulfilled, (state, action: PayloadAction<{ token: string; username: string; userRole: string }>) => {
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.userRole = action.payload.userRole;
        state.loading = false;
      })
      .addCase(auth.rejected, (state) => {
        state.loading = false;
        state.error = "Login failed";
      });
  },
});

export default authSlice.reducer;
