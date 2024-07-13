import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userLoggedIn: boolean,
  userDetails: object
};

const initialState: UserState = {
  userLoggedIn: false,
  userDetails: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<object>) => {
      state.userLoggedIn = true,
      state.userDetails = {
          ...action.payload
      }
    },
    removeUserDetails: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUserDetails, removeUserDetails } = userSlice.actions;

export default userSlice.reducer;
