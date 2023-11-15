import { configureStore } from "@reduxjs/toolkit";
import {
    PERSIST,
  } from "redux-persist";
  
const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (defaultMiddleware) => {
    return defaultMiddleware({
      serializableCheck: {
        ignoredActions: [PAUSE, PERSIST],
      },
    });
  },
});

export default store;
