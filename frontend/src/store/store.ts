import { configureStore } from '@reduxjs/toolkit';

import userSlice from "./reducers/userSlice";
import projectSlice from "./reducers/projectSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    project: projectSlice
  },
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;