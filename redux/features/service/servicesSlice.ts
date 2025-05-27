import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
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

const mockServices: Service[] = [
  {
    id: "1",
    name: "Haircut & Styling: Professional haircut and styling for men and women.",
    slug: "haircut-styling",
    price: 25,
    description: "Professional haircut and styling for men and women.",
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "beauty-fashion",
    rating: 4.8,
    vendor: {
      id: "1",
      name: "Favy's Salon",
      slug: "favys-salon",
    },
    duration: "45 mins",
    location: "In-store",
    isNew: true,
    onSale: false,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "2",
    name: "Home Cleaning: Thorough home cleaning service for all room types.",
    slug: "home-cleaning",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    image: "https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "home-services",
    rating: 4.6,
    vendor: {
      id: "2",
      name: "CleanBee Services",
      slug: "cleanbee-services",
    },
    duration: "2 hours",
    location: "Home visit",
    isNew: false,
    onSale: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "3",
    name: "Event Photography: Capture your special moments with professional photography",
    slug: "event-photography",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    image: "https://images.pexels.com/photos/3800848/pexels-photo-3800848.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "event-ushering",
    rating: 4.6,
    vendor: {
      id: "3",
      name: "Hago Heights",
      slug: "hago-heights",
    },
    duration: "2 hours",
    location: "Home visit",
    isNew: false,
    onSale: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "4",
    name: "Laundry Service: Convenient laundry service for all your clothing needs",
    slug: "laundry-service",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    image: "https://images.pexels.com/photos/2517866/pexels-photo-2517866.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "laundry-cleaning",
    rating: 4.6,
    vendor: {
      id: "4",
      name: "Smart Vip",
      slug: "smart-vip",
    },
    duration: "2 hours",
    location: "Home visit",
    isNew: false,
    onSale: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "5",
    name: "Tutoring Service: Personalized tutoring for various subjects",
    slug: "tutoring-service",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    image: "https://images.pexels.com/photos/3771074/pexels-photo-3771074.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "academic-tutoring",
    rating: 4.6,
    vendor: {
      id: "5",
      name: "Trinitate Academy",
      slug: "trinitate-academy",
    },
    duration: "2 hours",
    location: "Home visit",
    isNew: false,
    onSale: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "6",
    name: "Yummy delicious meals delivered to your doorstep",
    slug: "yummy-meals-delivery",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    image: "https://images.pexels.com/photos/4392039/pexels-photo-4392039.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "food-delivery",
    rating: 4.6,
    vendor: {
      id: "6",
      name: "McDonald",
      slug: "mcdonald",
    },
    duration: "2 hours",
    location: "Home visit",
    isNew: false,
    onSale: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "7",
    name: "Transportation/Bolt Service: Reliable transportation for students",
    slug: "transport-service",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    image: "https://images.pexels.com/photos/7464395/pexels-photo-7464395.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "transport-serivices",
    rating: 4.6,
    vendor: {
      id: "7",
      name: "Easy Drive",
      slug: "easy-drive",
    },
    duration: "2 hours",
    location: "Home visit",
    isNew: false,
    onSale: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "8",
    name: "Health/Wellness Service: Your overall wellbeing is our maximum concern",
    slug: "health-wellness",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    image: "https://images.pexels.com/photos/347135/pexels-photo-347135.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "health-wellness",
    rating: 4.6,
    vendor: {
      id: "8",
      name: "Rivon Hospitals",
      slug: "rivon-hospitals",
    },
    duration: "2 hours",
    location: "Home visit",
    isNew: false,
    onSale: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "9",
    name: "Repair all your tech related items",
    slug: "tech-repair",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    image: "https://images.pexels.com/photos/7285981/pexels-photo-7285981.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "tech-repair",
    rating: 4.6,
    vendor: {
      id: "9",
      name: "Slot Nigeria",
      slug: "slot-nigeria",
    },
    duration: "2 hours",
    location: "Home visit",
    isNew: false,
    onSale: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "10",
    name: "Career and Professional Development: We help you build solid career and profession",
    slug: "career-dev",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    image: "https://images.pexels.com/photos/32213227/pexels-photo-32213227/free-photo-of-young-professional-holding-python-book-in-class.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "career-support",
    rating: 4.6,
    vendor: {
      id: "10",
      name: "Pacesetters",
      slug: "pacesetters",
    },
    duration: "2 hours",
    location: "Home visit",
    isNew: false,
    onSale: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "11",
    name: "Home & Dorm essential renting made super easy",
    slug: "home-dorm-essential",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    image: "https://images.pexels.com/photos/8963083/pexels-photo-8963083.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "essential-rentals",
    rating: 4.6,
    vendor: {
      id: "11",
      name: "Joy Rentals",
      slug: "joy-rentals",
    },
    duration: "2 hours",
    location: "Home visit",
    isNew: false,
    onSale: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
  {
    id: "12",
    name: "Look good for you self satisfaction and be super comfortable and happy",
    slug: "look-good",
    price: 80,
    description: "Thorough home cleaning service for all room types.",
    image: "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "beauty-fashion",
    rating: 4.6,
    vendor: {
      id: "12",
      name: "Lagos Spar",
      slug: "lagos-spar",
    },
    duration: "2 hours",
    location: "Home visit",
    isNew: false,
    onSale: true,
    requirements: [
      "Must bring student ID",
      "Service available only on weekdays",
      "Payment required upfront",
    ],
  },
]

// ✅ Async thunk — using mock for now
export const fetchServices = createAsyncThunk("services/fetchServices", async () => {
  // Simulate API delay (optional)
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockServices
})

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    getAllServices: (state) => {
      state.services = mockServices
    },
    getServiceBySlug: (state, action: PayloadAction<string>) => {
      state.service = mockServices.find((s) => s.slug === action.payload) || null
    },
    getFeaturedServices: (state) => {
      state.featuredServices = mockServices.filter((s) => s.isNew || s.onSale)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.services = action.payload
        state.featuredServices = action.payload.filter((s) => s.isNew || s.onSale)
        state.loading = false
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch services"
      })
  },
})

export const { getAllServices, getServiceBySlug, getFeaturedServices } = servicesSlice.actions
export default servicesSlice.reducer
