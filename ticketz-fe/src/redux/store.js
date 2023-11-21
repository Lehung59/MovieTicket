import { configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    PAUSE,
    PERSIST,
    FLUSH,
    REHYDRATE,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import reducer from "./slices";

const persistConfig = {
    key: "tickitz",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (defaultMiddleware) => {
        return defaultMiddleware({
            serializableCheck: {
                ignoredActions: [PAUSE, PERSIST, REHYDRATE, FLUSH],
            },
        });
    },
});

export default store;
