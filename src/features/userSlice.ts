import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface User {
  id: number;
  name: string;
  token: string;
}

const user: User = {
  id: 0,
  name: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = user;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState): User => state.user.user;

export default userSlice.reducer;
