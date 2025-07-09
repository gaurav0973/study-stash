import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.js"
import storage from "redux-persist/lib/storage";
import { persistReducer , persistStore } from "redux-persist";

const persistConfigAuth = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer  
    },
})

export const persistor = persistStore(store);
export default store;
