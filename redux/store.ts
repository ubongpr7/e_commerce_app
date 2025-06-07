import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./features/authSlice";
import { apiSlice } from "./services/apiSlice";
import globalReducer from "./state";
import cartReducer from  './cart/cartSlice';
import productsReducer from "./features/product/productsSlice"
import servicesReducer from "./features/service/servicesSlice"; // Add this import
import specialsReducer from "./features/special/specialSlice"
import vendorsReducer from "./features/vendor/vendorsSlice"

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = typeof window === "undefined" 
  ? createNoopStorage()
  : createWebStorage("local");

// Persist config for global slice only
const globalPersistConfig = {
  key: "global",
  storage,
  whitelist: ["isDarkMode", "isSidebarCollapsed"]
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productsReducer,
  services: servicesReducer, // ✅ Add this line
  specials: specialsReducer,
  vendors: vendorsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  global: persistReducer(globalPersistConfig, globalReducer),
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiSlice.middleware),
  });
};

export const persistor = persistStore(makeStore());

// Keep existing types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
