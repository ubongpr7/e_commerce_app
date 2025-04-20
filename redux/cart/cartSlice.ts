import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getCookie, setCookie } from "cookies-next"
import type { Product } from "@/types/product"

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  variantId?: string
  variantName?: string
}

interface CartState {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  return { subtotal, shipping, tax, total }
}

// Cookie configuration
const CART_COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
}

const getInitialState = (): CartState => {
  try {
    const savedCart = getCookie("cart")
    if (savedCart) {
      return JSON.parse(savedCart.toString()) as CartState
    }
  } catch (error) {
    console.error("Error parsing cart cookie:", error)
  }
  
  return {
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  }
}

const initialState: CartState = getInitialState()

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product
        quantity: number
        variantId?: string
      }>,
    ) => {
      const { product, quantity, variantId } = action.payload
      const variant = variantId ? product.variants?.find((v) => v.id === variantId) : undefined
      const price = variant ? variant.price : product.price

      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === product.id && (variantId ? item.variantId === variantId : !item.variantId),
      )

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += quantity
      } else {
        state.items.push({
          id: `${product.id}${variantId ? `-${variantId}` : ""}`,
          productId: product.id,
          name: product.name,
          price: price,
          image: product.images[0],
          quantity: quantity,
          variantId: variantId,
          variantName: variant?.name,
        })
      }

      const totals = calculateCartTotals(state.items)
      state.subtotal = totals.subtotal
      state.shipping = totals.shipping
      state.tax = totals.tax
      state.total = totals.total

      setCookie("cart", JSON.stringify(state), CART_COOKIE_OPTIONS)
    },

    updateQuantity: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      const { itemId, quantity } = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === itemId)

      if (itemIndex >= 0) {
        if (quantity > 0) {
          state.items[itemIndex].quantity = quantity
        } else {
          state.items.splice(itemIndex, 1)
        }

        const totals = calculateCartTotals(state.items)
        state.subtotal = totals.subtotal
        state.shipping = totals.shipping
        state.tax = totals.tax
        state.total = totals.total

        setCookie("cart", JSON.stringify(state), CART_COOKIE_OPTIONS)
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      const totals = calculateCartTotals(state.items)
      state.subtotal = totals.subtotal
      state.shipping = totals.shipping
      state.tax = totals.tax
      state.total = totals.total
      setCookie("cart", JSON.stringify(state), CART_COOKIE_OPTIONS)
    },

    clearCart: (state) => {
      state.items = []
      state.subtotal = 0
      state.shipping = 0
      state.tax = 0
      state.total = 0
      setCookie("cart", JSON.stringify(state), CART_COOKIE_OPTIONS)
    },
  },
})

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer