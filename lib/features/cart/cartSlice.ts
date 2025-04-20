import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
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
  const shipping = subtotal > 0 ? 10 : 0 // Simplified shipping calculation
  const tax = subtotal * 0.08 // Assuming 8% tax rate
  const total = subtotal + shipping + tax

  return { subtotal, shipping, tax, total }
}

// Try to get cart from localStorage, if available
const getInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart) as CartState
      return parsedCart
    }
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

      // Find the variant if variantId is provided
      const variant = variantId ? product.variants?.find((v) => v.id === variantId) : undefined

      // Get the correct price (from variant if selected)
      const price = variant ? variant.price : product.price

      // Check if this item is already in the cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === product.id && (variantId ? item.variantId === variantId : !item.variantId),
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        state.items[existingItemIndex].quantity += quantity
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.id}${variantId ? `-${variantId}` : ""}`,
          productId: product.id,
          name: product.name,
          price: price,
          image: product.images[0],
          quantity: quantity,
          variantId: variantId,
          variantName: variant?.name,
        }
        state.items.push(newItem)
      }

      // Update totals
      const totals = calculateCartTotals(state.items)
      state.subtotal = totals.subtotal
      state.shipping = totals.shipping
      state.tax = totals.tax
      state.total = totals.total

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state))
      }
    },

    updateQuantity: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      const { itemId, quantity } = action.payload

      const itemIndex = state.items.findIndex((item) => item.id === itemId)
      if (itemIndex >= 0) {
        if (quantity > 0) {
          state.items[itemIndex].quantity = quantity
        } else {
          // Remove item if quantity is 0 or negative
          state.items.splice(itemIndex, 1)
        }

        // Update totals
        const totals = calculateCartTotals(state.items)
        state.subtotal = totals.subtotal
        state.shipping = totals.shipping
        state.tax = totals.tax
        state.total = totals.total

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state))
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload

      state.items = state.items.filter((item) => item.id !== itemId)

      // Update totals
      const totals = calculateCartTotals(state.items)
      state.subtotal = totals.subtotal
      state.shipping = totals.shipping
      state.tax = totals.tax
      state.total = totals.total

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state))
      }
    },

    clearCart: (state) => {
      state.items = []
      state.subtotal = 0
      state.shipping = 0
      state.tax = 0
      state.total = 0

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state))
      }
    },
  },
})

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
