import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  activeSection: 'add' | 'report' | 'attendance' | 'profile' | 'workDiary';
}

const initialState: SidebarState = {
  activeSection: 'add',
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setActiveSection(state, action: PayloadAction<'add' | 'report' | 'attendance' | 'profile' | 'workDiary'>) {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = sidebarSlice.actions;
export default sidebarSlice.reducer;
