import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/lib/features/auth/authSlice"
import productsReducer from "@/lib/features/products/productsSlice"
import cartReducer from "@/lib/features/cart/cartSlice"
import themeReducer from "@/lib/features/theme/themeSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    theme: themeReducer,
    // Add other reducers here
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
