import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  username: string | null;
  userRole: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  username: null,
  userRole: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; username: string; userRole: string }>) {
      const { token, username, userRole } = action.payload;
      state.token = token;
      state.username = username;
      state.userRole = userRole;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.username = null;
      state.userRole = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
