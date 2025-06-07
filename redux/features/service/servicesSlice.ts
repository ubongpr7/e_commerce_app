import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Service } from "@/types/service"

interface ServicesState {
  services: Service[]
  featuredServices: Service[]
  service: Service | null
  loading: boolean
  error: string | null
}

const initialState: ServicesState = {
  services: [],
  featuredServices: [],
  service: null,
  loading: false,
  error: null,
}

// Mock data for demo purposes
const mockServices: Service[] = [
  {
    id: "1",
    name: "Haircut & Styling",
    slug: "haircut-styling",
    price: 25,
    description: "Professional haircut and styling for men and women.",
    images: [
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600", 
      "https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    category: "beauty-fashion",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.8,
    vendor: {
      id: "1",
      name: "Favy's Salon",
      slug: "favys-salon",
    },
    duration: "45 mins",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "In-store",
    isNew: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "2",
    name: "Home Cleaning",
    slug: "home-cleaning",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "home-services",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "2",
      name: "CleanBee Services",
      slug: "cleanbee-services",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "3",
    name: "Event Photography",
    slug: "event-photography",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/3800848/pexels-photo-3800848.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "event-ushering",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "3",
      name: "Hago Heights",
      slug: "hago-heights",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "4",
    name: "Laundry Service",
    slug: "laundry-service",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/2517866/pexels-photo-2517866.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "laundry-cleaning",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "4",
      name: "Smart Vip",
      slug: "smart-vip",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "5",
    name: "Tutoring Service",
    slug: "tutoring-service",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "academic-tutoring",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "5",
      name: "Trinitate Academy",
      slug: "trinitate-academy",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "6",
    name: "Yummy delicious meals",
    slug: "yummy-meals-delivery",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/4392039/pexels-photo-4392039.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "food-delivery",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "6",
      name: "McDonald",
      slug: "mcdonald",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "7",
    name: "Transportation/Bolt",
    slug: "transport-service",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/7464395/pexels-photo-7464395.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "rides-bolts",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "7",
      name: "Easy Drive",
      slug: "easy-drive",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "8",
    name: "Health/Wellness Service",
    slug: "health-wellness",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/347135/pexels-photo-347135.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "health-wellness",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "8",
      name: "Rivon Hospitals",
      slug: "rivon-hospitals",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "9",
    name: "Tech repair",
    slug: "tech-repair",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/7285981/pexels-photo-7285981.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "tech-repair",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "9",
      name: "Slot Nigeria",
      slug: "slot-nigeria",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "10",
    name: "Career and Professional Development",
    slug: "career-dev",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/32213227/pexels-photo-32213227/free-photo-of-young-professional-holding-python-book-in-class.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "career-support",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "10",
      name: "Pacesetters",
      slug: "pacesetters",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "11",
    name: "Home & Dorm essential",
    slug: "home-dorm-essential",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/8963083/pexels-photo-8963083.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "essential-rentals",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "11",
      name: "Joy Rentals",
      slug: "joy-rentals",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "12",
    name: "Fashionable beauty",
    slug: "look-good",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600"],
    category: "beauty-fashion",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "12",
      name: "Lagos Spar",
      slug: "lagos-spar",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "13",
    name: "Professional art",
    slug: "professional-art-design",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    images: ["https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=800"],
    category: "artistry-services",
    school: "University of Lagos",
    isPopular: true,
    rating: 4.6,
    vendor: {
      id: "13",
      name: "Kemi Arts",
      slug: "kemi-arts",
    },
    duration: "2 hours",
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    longDescription: "Get a fresh haircut and style that suits your personality. Our experienced stylists are here to give you the look you desire.",
    location: "Home visit",
    isNew: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  // ... (include all your other mock services here)
]

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return mockServices
    } catch (error) {
      return rejectWithValue("Failed to fetch services")
    }
  }
)

export const fetchFeaturedServices = createAsyncThunk(
  "services/fetchFeaturedServices",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Return featured services (isNew or onSale)
      return mockServices.filter(service => service.isNew || service.isPopular)
    } catch (error) {
      return rejectWithValue("Failed to fetch featured services")
    }
  }
)

export const fetchServiceBySlug = createAsyncThunk(
  "services/fetchServiceBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const service = mockServices.find((s) => s.slug === slug)
      if (!service) {
        return rejectWithValue("Service not found")
      }
      return service
    } catch (error) {
      return rejectWithValue("Failed to fetch service")
    }
  }
)

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all services
    builder.addCase(fetchServices.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
      state.loading = false
      state.services = action.payload
    })
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Fetch featured services
    builder.addCase(fetchFeaturedServices.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchFeaturedServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
      state.loading = false
      state.featuredServices = action.payload
    })
    builder.addCase(fetchFeaturedServices.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Fetch service by slug
    builder.addCase(fetchServiceBySlug.pending, (state) => {
      state.loading = true
      state.error = null
      state.service = null // Clear previous service when fetching new one
    })
    builder.addCase(fetchServiceBySlug.fulfilled, (state, action: PayloadAction<Service>) => {
      state.loading = false
      state.service = action.payload
    })
    builder.addCase(fetchServiceBySlug.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export default servicesSlice.reducer