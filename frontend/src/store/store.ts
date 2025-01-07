import { configureStore } from '@reduxjs/toolkit';

import userSlice from "./reducers/userSlice";
import projectSlice from "./reducers/projectSlice";
import contentSlice from "./reducers/contentSlice";
import projectsSlice from "./reducers/projectsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    project: projectSlice,
    contents: contentSlice,
    projects: projectsSlice,
  },
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;