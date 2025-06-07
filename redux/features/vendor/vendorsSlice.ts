import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Vendor } from "@/types/vendor"

interface VendorsState {
  vendors: Vendor[]
  featuredVendors: Vendor[]
  vendor: Vendor | null
  loading: boolean
  error: string | null
}


const initialState: VendorsState = {
  vendors: [],
  featuredVendors: [],
  vendor: null,
  loading: false,
  error: null,
}


// Updated vendor data with mock categories
const mockVendors = [
  {
    id: "1",
    name: "Tech Gadgets",
    category: "electronics-gadgets",
    logo: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The latest electronic gadgets and accessories.",
    productCount: 42,
    rating: 4.7,
    slug: "tech-gadgets",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "2",
    name: "Fashion Hub",
    category: "fashion-wear",
    logo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Trendy clothing and accessories for all seasons.",
    productCount: 128,
    rating: 4.5,
    slug: "fashion-hub",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "3",
    name: "Home Essential",
    category: "home-essentials",
    logo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/443378/pexels-photo-443378.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "home-essential",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "4",
    name: "Dave Dan",
    category: "study-materials",
    logo: "https://images.pexels.com/photos/433333/pexels-photo-433333.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "dave-dan",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "5",
    name: "Stanford",
    category: "office-supplies",
    logo: "https://images.pexels.com/photos/8533361/pexels-photo-8533361.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "stanford",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "6",
    name: "Dami Grocery",
    category: "food-gocery",
    logo: "https://images.pexels.com/photos/32397339/pexels-photo-32397339/free-photo-of-delicious-layered-yogurt-with-strawberries.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/32385197/pexels-photo-32385197/free-photo-of-close-up-of-dough-wrapped-sausages-on-tray.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "dami-grocery",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "7",
    name: "Favy Abia",
    category: "beauty-health",
    logo: "https://images.pexels.com/photos/13767162/pexels-photo-13767162.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "favy-abia",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "8",
    name: "Morgan SP",
    category: "sporting-goods",
    logo: "https://images.pexels.com/photos/6572984/pexels-photo-6572984.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/257970/pexels-photo-257970.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "morgan-sp",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "9",
    name: "Jed Auto",
    category: "automobile-goods",
    logo: "https://images.pexels.com/photos/8386126/pexels-photo-8386126.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/221028/pexels-photo-221028.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "jed-auto",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "10",
    name: "Game House",
    category: "entertainment-games",
    logo: "https://images.pexels.com/photos/2689343/pexels-photo-2689343.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/3852577/pexels-photo-3852577.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "game-house",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
]


// Fetch all vendors
export const fetchVendors = createAsyncThunk("vendors/fetchVendors", async (_, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return mockVendors
  } catch (error) {
    return rejectWithValue("Failed to fetch vendors")
  }
})

// Fetch featured vendors
export const fetchFeaturedVendors = createAsyncThunk("vendors/fetchFeaturedVendors", async (_, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return mockVendors // Filter if needed
  } catch (error) {
    return rejectWithValue("Failed to fetch featured vendors")
  }
})

// Fetch vendor by slug
export const fetchVendorBySlug = createAsyncThunk("vendors/fetchVendorBySlug", async (slug: string, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const vendor = mockVendors.find((v) => v.slug === slug)
    if (!vendor) {
      return rejectWithValue("Vendor not found")
    }
    return vendor
  } catch (error) {
    return rejectWithValue("Failed to fetch vendor")
  }
})

const vendorSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // All vendors
    builder.addCase(fetchVendors.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchVendors.fulfilled, (state, action: PayloadAction<Vendor[]>) => {
      state.loading = false
      state.vendors = action.payload
    })
    builder.addCase(fetchVendors.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Featured vendors
    builder.addCase(fetchFeaturedVendors.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchFeaturedVendors.fulfilled, (state, action: PayloadAction<Vendor[]>) => {
      state.loading = false
      state.featuredVendors = action.payload
    })
    builder.addCase(fetchFeaturedVendors.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Vendor by slug
    builder.addCase(fetchVendorBySlug.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchVendorBySlug.fulfilled, (state, action: PayloadAction<Vendor>) => {
      state.loading = false
      state.vendor = action.payload
    })
    builder.addCase(fetchVendorBySlug.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export default vendorSlice.reducer