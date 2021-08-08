import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface User {
  id: string;
  name: string;
  profileImgUrl: string;
}

const user: User = {
  id: '',
  profileImgUrl: '',
  name: '',
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
    updateUserProfile: (state, action: PayloadAction<User>) => {
      state.user.name = action.payload.name;
      state.user.profileImgUrl = action.payload.profileImgUrl;
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;

export const selectUser = (state: RootState): User => state.user.user;

export default userSlice.reducer;
