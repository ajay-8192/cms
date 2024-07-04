import { combineReducers } from "redux";
import loginReducer from "./loginSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import locationSlice from "./locationSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  location: locationSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login', 'location']
};

const persistReducers = persistReducer(persistConfig, rootReducer);

const makeStore = () => configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(makeStore);
