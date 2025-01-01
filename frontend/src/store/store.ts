import { configureStore } from '@reduxjs/toolkit';

import userSlice from "./reducers/userSlice";
import projectSlice from "./reducers/projectSlice";
import contentSlice from "./reducers/contentSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    project: projectSlice,
    contents: contentSlice,
  },
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;