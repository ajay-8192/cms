import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userLoggedIn: boolean;
  userDetails: {
    email: string;
    name: string;
  };
}

const initialState: UserState = {
  userLoggedIn: false,
  userDetails: {
    email: '',
    name: ''
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<{ user: object }>) => {
      console.log('====> action', { action });
      
      (state.userLoggedIn = true),
        (state.userDetails = {
          ...state.userDetails,
          ...action.payload.user,
        });
    },
    removeUserDetails: (state) => {
      state.userLoggedIn = false;
      state.userDetails = { email: '', name: '' };
    },
  },
});

export const { setUserDetails, removeUserDetails } = userSlice.actions;

export default userSlice.reducer;
