import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import type { Special } from "@/types/special"

interface SpecialsState {
    specials: Special[]
    featuredSpecials: Special[]
    special: Special | null
    loading: boolean
    error: string | null
}

const initialState: SpecialsState = {
    specials: [],
    featuredSpecials: [],
    special: null,
    loading: false,
    error: null,
}

const mockSpecials: Special[] = [
    {
        id: "1",
        name: "Ikangs Lodge",
        slug: "ikangs-lodge",
        price: 120,
        description: "Comfortable student lodge near main campus.",
        longDescription: "Spacious rooms with free WiFi, study areas, and 24/7 security.",
        amenities: ["WiFi", "24/7 Security", "Laundry Service", "Study Lounge"],
        image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "hostels-lodges",
        rating: 4.7,
        vendor: {
            id: "1",
            name: "Campus Stay Ltd.",
            slug: "campus-stay-ltd",
        },
        duration: "Per Night",
        location: "Main Campus Area",
        isNew: true,
        onSale: false,
        isPopular: true,
        availability: "Available",
    },
    {
        id: "2",
        name: "Greenfield Hotel",
        slug: "greenfield-hotel",
        price: 200,
        description: "Luxury hotel with pool and gym near the city center.",
        longDescription: "Enjoy your stay with premium amenities including a swimming pool, gym, and free breakfast.",
        amenities: ["Swimming Pool", "Gym Access", "Free Breakfast", "Free Parking"],
        image: "https://images.pexels.com/photos/136413/pexels-photo-136413.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "hotels-suites",
        rating: 4.9,
        vendor: {
            id: "2",
            name: "Greenfield Hospitality",
            slug: "greenfield-hospitality",
        },
        duration: "Per Night",
        location: "City Center",
        isNew: false,
        onSale: true,
        isPopular: true,
        availability: "Available",
    },
    {
        id: "3",
        name: "Airpeace Airline: Travel with steeze",
        slug: "airpeace-airline",
        price: 200,
        description: "Luxury hotel with pool and gym near the city center.",
        longDescription: "Enjoy your stay with premium amenities including a swimming pool, gym, and free breakfast.",
        amenities: ["Swimming Pool", "Gym Access", "Free Breakfast", "Free Parking"],
        image: "https://images.pexels.com/photos/731217/pexels-photo-731217.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "flights-travels",
        rating: 4.9,
        vendor: {
            id: "3",
            name: "Airpeace",
            slug: "airpeace",
        },
        duration: "Per Night",
        location: "City Center",
        isNew: true,
        onSale: true,
        isPopular: true,
        availability: "Available",
    },
    {
        id: "4",
        name: "PPK Premium Leisure and pleasure",
        slug: "premium-leisure",
        price: 200,
        description: "Luxury hotel with pool and gym near the city center.",
        longDescription: "Enjoy your stay with premium amenities including a swimming pool, gym, and free breakfast.",
        amenities: ["Swimming Pool", "Gym Access", "Free Breakfast", "Free Parking"],
        image: "https://images.pexels.com/photos/2521470/pexels-photo-2521470.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "recreation-leisure",
        rating: 4.9,
        vendor: {
            id: "4",
            name: "Pleasure Park",
            slug: "pleasure-park",
        },
        duration: "Per Night",
        location: "City Center",
        isNew: false,
        onSale: true,
        isPopular: true,
        availability: "Available",
    },
    {
        id: "5",
        name: "Top Notch Fitness Center: Get Fit, Stay Strong",
        slug: "stay-fit",
        price: 200,
        description: "Luxury hotel with pool and gym near the city center.",
        longDescription: "Enjoy your stay with premium amenities including a swimming pool, gym, and free breakfast.",
        amenities: ["Swimming Pool", "Gym Access", "Free Breakfast", "Free Parking"],
        image: "https://images.pexels.com/photos/4944978/pexels-photo-4944978.jpeg?auto=compress&cs=tinysrgb&w=800",
        category: "fitness-centers",
        rating: 4.9,
        vendor: {
            id: "5",
            name: "Bigsam gym",
            slug: "bigsam-gym",
        },
        duration: "Per Night",
        location: "City Center",
        isNew: false,
        onSale: true,
        isPopular: true,
        availability: "Available",
    },
    // Add more mock specials as needed
]

// Async thunk to simulate fetching specials (mocked)
export const fetchSpecials = createAsyncThunk(
    "specials/fetchSpecials",
    async () => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return mockSpecials
    }
)

const specialSlice = createSlice({
    name: "specials",
    initialState,
    reducers: {
        getAllSpecials: (state) => {
            state.specials = mockSpecials
        },
        getSpecialBySlug: (state, action: PayloadAction<string>) => {
            state.special = mockSpecials.find((s) => s.slug === action.payload) || null
        },
        getFeaturedSpecials: (state) => {
            state.featuredSpecials = mockSpecials.filter((s) => s.isNew || s.onSale || s.isPopular)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecials.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSpecials.fulfilled, (state, action: PayloadAction<Special[]>) => {
                state.specials = action.payload
                state.featuredSpecials = action.payload.filter((s) => s.isNew || s.onSale || s.isPopular)
                state.loading = false
            })
            .addCase(fetchSpecials.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to fetch specials"
            })
    },
})

export const { getAllSpecials, getSpecialBySlug, getFeaturedSpecials } = specialSlice.actions
export default specialSlice.reducer
