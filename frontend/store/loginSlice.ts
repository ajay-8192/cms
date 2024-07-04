import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  userLoggedIn: boolean,
  userDetails: object
};

const initialState: LoginState = {
  userLoggedIn: false,
  userDetails: {}
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<object>) => {
      console.log('========> ', { state, action });
      state.userLoggedIn = true,
      state.userDetails = {
          ...action.payload
      }
    },
    removeUserDetails: state => {
      console.log('=========> ', { state });
      Object.assign(state, initialState);
    },
  },
});

export const { setUserDetails, removeUserDetails } = loginSlice.actions;

export default loginSlice.reducer;
