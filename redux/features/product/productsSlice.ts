import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "@/types/product"

interface ProductsState {
  products: Product[]
  featuredProducts: Product[]
  product: Product | null
  loading: boolean
  error: string | null
}


const initialState: ProductsState = {
  products: [],
  featuredProducts: [],
  product: null,
  loading: false,
  error: null,
}

// Mock data for demo purposes
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    price: 199.99,
    compareAtPrice: 249.99,
    description:
      "Experience incredible sound quality with these premium wireless headphones. Featuring noise cancellation and long battery life.",
    images: ["/placeholder.svg?height=400&width=400"],
    category: "electronics",
    rating: 4.8,
    inStock: true,
    isNew: true,
    onSale: true,
    variants: [
      { id: "v1", name: "Black", sku: "WH-BLK", price: 199.99, inStock: true },
      { id: "v2", name: "White", sku: "WH-WHT", price: 199.99, inStock: true },
    ],
    vendor: {
      id: "1",
      name: "TechGadgets",
      slug: "tech-gadgets",
    },
  },
  {
    id: "2",
    name: "Designer Summer Dress",
    slug: "designer-summer-dress",
    price: 89.99,
    compareAtPrice: 119.99,
    description:
      "A beautiful summer dress perfect for any occasion. Made with lightweight fabric for comfort in hot weather.",
    images: ["/placeholder.svg?height=400&width=400"],
    category: "fashion",
    rating: 4.5,
    inStock: true,
    isNew: false,
    onSale: true,
    variants: [
      { id: "v3", name: "Small", sku: "SD-S", price: 89.99, inStock: true },
      { id: "v4", name: "Medium", sku: "SD-M", price: 89.99, inStock: true },
      { id: "v5", name: "Large", sku: "SD-L", price: 89.99, inStock: false },
    ],
    vendor: {
      id: "2",
      name: "FashionHub",
      slug: "fashion-hub",
    },
  },
  {
    id: "3",
    name: "Professional Kitchen Mixer",
    slug: "professional-kitchen-mixer",
    price: 349.99,
    compareAtPrice: 0,
    description: "A high-quality kitchen mixer for professional and home chefs. Multiple attachments included.",
    images: ["/placeholder.svg?height=400&width=400"],
    category: "home",
    rating: 4.9,
    inStock: true,
    isNew: true,
    onSale: false,
    variants: [
      { id: "v6", name: "Red", sku: "KM-RED", price: 349.99, inStock: true },
      { id: "v7", name: "Black", sku: "KM-BLK", price: 349.99, inStock: true },
      { id: "v8", name: "Silver", sku: "KM-SLV", price: 369.99, inStock: true },
    ],
    vendor: {
      id: "3",
      name: "HomeEssentials",
      slug: "home-essentials",
    },
  },
  {
    id: "4",
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    price: 149.99,
    compareAtPrice: 179.99,
    description:
      "Track your fitness goals with this smart watch. Features heart rate monitoring, step counting, and more.",
    images: ["/placeholder.svg?height=400&width=400"],
    category: "electronics",
    rating: 4.6,
    inStock: true,
    isNew: false,
    onSale: true,
    variants: [
      { id: "v9", name: "Black", sku: "FW-BLK", price: 149.99, inStock: true },
      { id: "v10", name: "Blue", sku: "FW-BLU", price: 149.99, inStock: true },
    ],
    vendor: {
      id: "1",
      name: "TechGadgets",
      slug: "tech-gadgets",
    },
  },
]

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return mockProducts
  } catch (error) {
    return rejectWithValue("Failed to fetch products")
  }
})

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Return a subset of products as featured
      return mockProducts
    } catch (error) {
      return rejectWithValue("Failed to fetch featured products")
    }
  },
)

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const product = mockProducts.find((p) => p.slug === slug)
      if (!product) {
        return rejectWithValue("Product not found")
      }
      return product
    } catch (error) {
      return rejectWithValue("Failed to fetch product")
    }
  },
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.loading = false
      state.products = action.payload
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Fetch featured products
    builder.addCase(fetchFeaturedProducts.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchFeaturedProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.loading = false
      state.featuredProducts = action.payload
    })
    builder.addCase(fetchFeaturedProducts.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Fetch product by slug
    builder.addCase(fetchProductBySlug.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchProductBySlug.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false
      state.product = action.payload
    })
    builder.addCase(fetchProductBySlug.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export default productsSlice.reducer
