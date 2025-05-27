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
    images: ["https://images.pexels.com/photos/3756770/pexels-photo-3756770.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "electronics-gadgets",
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
      name: "Jerry's Tech",
      slug: "jerry-tech",
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
    images: ["https://images.pexels.com/photos/14016877/pexels-photo-14016877.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "fashion-wear",
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
      name: "Favy's Fashion",
      slug: "favy-fashion",
    },
  },
  {
    id: "3",
    name: "Professional Kitchen Mixer",
    slug: "professional-kitchen-mixer",
    price: 349.99,
    compareAtPrice: 0,
    description: "A high-quality kitchen mixer for professional and home chefs. Multiple attachments included.",
    images: ["https://images.pexels.com/photos/1450907/pexels-photo-1450907.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "home-essentials",
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
      name: "Bright Home",
      slug: "bright-home",
    },
  },
  {
    id: "4",
    name: "Mathematical Set",
    slug: "mathematical-set",
    price: 349.99,
    compareAtPrice: 0,
    description: "A high-quality kitchen mixer for professional and home chefs. Multiple attachments included.",
    images: ["https://images.pexels.com/photos/5412434/pexels-photo-5412434.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "study-materials",
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
      id: "4",
      name: "Kebby's Store",
      slug: "kebby-store",
    },
  }, 
  {
    id: "5",
    name: "AMD Billion Couch",
    slug: "amd-billion-couch",
    price: 349.99,
    compareAtPrice: 0,
    description: "A high-quality kitchen mixer for professional and home chefs. Multiple attachments included.",
    images: ["https://images.pexels.com/photos/1125135/pexels-photo-1125135.jpeg?auto=compress&cs=tinysrgb&w=800"],
    category: "office-supplies",
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
      id: "5",
      name: "Vite Homes",
      slug: "vite-homes",
    },
  },
  {
    id: "6",
    name: "Quick Meal Deals",
    slug: "quick-meal-deals",
    price: 349.99,
    compareAtPrice: 0,
    description: "A high-quality kitchen mixer for professional and home chefs. Multiple attachments included.",
    images: ["https://images.pexels.com/photos/4198043/pexels-photo-4198043.jpeg?auto=compress&cs=tinysrgb&w=800"],
    category: "food-grocery",
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
      id: "6",
      name: "Tasty Jay",
      slug: "tasty-jay",
    },
  },
  {
    id: "7",
    name: "Makeup Full Set",
    slug: "makeup-full-set",
    price: 349.99,
    compareAtPrice: 0,
    description: "A high-quality kitchen mixer for professional and home chefs. Multiple attachments included.",
    images: ["https://images.pexels.com/photos/1540408/pexels-photo-1540408.jpeg?auto=compress&cs=tinysrgb&w=800"],
    category: "beauty-health",
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
      id: "7",
      name: "Kay Beauty Home",
      slug: "kay-beauty-home",
    },
  },
  {
    id: "8",
    name: "Benz VIP Bike",
    slug: "benz-vip-bike",
    price: 349.99,
    compareAtPrice: 0,
    description: "A high-quality kitchen mixer for professional and home chefs. Multiple attachments included.",
    images: ["https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800"],
    category: "sporting-goods",
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
      id: "8",
      name: "Benz Global",
      slug: "benz-global",
    },
  },
  {
    id: "9",
    name: "GLE Pro 7",
    slug: "gle-pro-7",
    price: 349.99,
    compareAtPrice: 0,
    description: "A high-quality kitchen mixer for professional and home chefs. Multiple attachments included.",
    images: ["https://images.pexels.com/photos/14692379/pexels-photo-14692379.jpeg?auto=compress&cs=tinysrgb&w=800"],
    category: "automobile-goods",
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
      id: "9",
      name: "Benz Dealer",
      slug: "benz-dealer",
    },
  },
  {
    id: "10",
    name: "Metaverse Virtual Glass",
    slug: "metaverse-virtual-glass",
    price: 349.99,
    compareAtPrice: 0,
    description: "A high-quality kitchen mixer for professional and home chefs. Multiple attachments included.",
    images: ["https://images.pexels.com/photos/8097327/pexels-photo-8097327.jpeg?auto=compress&cs=tinysrgb&w=800"],
    category: "entertainment-games",
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
      id: "10",
      name: "Metaverse World",
      slug: "metaverse-world",
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
