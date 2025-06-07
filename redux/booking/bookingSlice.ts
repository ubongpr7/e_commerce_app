import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getCookie, setCookie } from "cookies-next"
import type { Service } from "@/types/service"

interface BookingItem {
    id: string
    serviceId: string
    name: string
    price: number
    image: string
    bookingDate: Date | string
    duration?: string
    location?: string
    vendor: {
        id: string
        name: string
    }
}

interface BookingsState {
    items: BookingItem[]
    subtotal: number
    tax: number
    total: number
}

// Services typically don't have shipping costs
const calculateBookingTotals = (items: BookingItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0)
    const tax = subtotal * 0.08 // Adjust tax rate as needed
    const total = subtotal + tax
    return { subtotal, tax, total }
}

const BOOKINGS_COOKIE_OPTIONS = {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
}

const getInitialState = (): BookingsState => {
    try {
        const savedBookings = getCookie("bookings")
        if (savedBookings) {
            const parsed = JSON.parse(savedBookings.toString()) as BookingsState
            // Convert string dates back to Date objects
            parsed.items = parsed.items.map(item => ({
                ...item,
                bookingDate: new Date(item.bookingDate)
            }))
            return parsed
        }
    } catch (error) {
        console.error("Error parsing bookings cookie:", error)
    }

    return {
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
    }
}

const initialState: BookingsState = getInitialState()

const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        addToBookings: (
            state,
            action: PayloadAction<{
                service: Service
                bookingDate: Date | string
            }>,
        ) => {
            const { service, bookingDate } = action.payload
            const date = new Date(bookingDate) // Ensure we have a Date object

            // Check for existing booking at the same time
            const existingBookingIndex = state.items.findIndex(
                item => item.serviceId === service.id &&
                    new Date(item.bookingDate).getTime() === date.getTime()
            )

            if (existingBookingIndex >= 0) {
                // Update existing booking if needed
                state.items[existingBookingIndex].bookingDate = date
            } else {
                state.items.push({
                    id: `${service.id}-${date.getTime()}`, // Unique ID with timestamp
                    serviceId: service.id,
                    name: service.name,
                    price: service.price,
                    image: service.images[0],
                    bookingDate: date,
                    duration: service.duration,
                    location: service.location,
                    vendor: {
                        id: service.vendor.id,
                        name: service.vendor.name
                    }
                })
            }

            const totals = calculateBookingTotals(state.items)
            state.subtotal = totals.subtotal
            state.tax = totals.tax
            state.total = totals.total

            // Convert Dates to strings for cookie storage
            const cookieState = {
                ...state,
                items: state.items.map(item => ({
                    ...item,
                    bookingDate: item.bookingDate.toString()
                }))
            }
            setCookie("bookings", JSON.stringify(cookieState), BOOKINGS_COOKIE_OPTIONS)
        },

        updateBookingDate: (
            state,
            action: PayloadAction<{
                bookingId: string;
                newDate: Date | string
            }>
        ) => {
            const { bookingId, newDate } = action.payload
            const bookingIndex = state.items.findIndex(item => item.id === bookingId)

            if (bookingIndex >= 0) {
                state.items[bookingIndex].bookingDate = new Date(newDate)

                const totals = calculateBookingTotals(state.items)
                state.subtotal = totals.subtotal
                state.tax = totals.tax
                state.total = totals.total

                const cookieState = {
                    ...state,
                    items: state.items.map(item => ({
                        ...item,
                        bookingDate: item.bookingDate.toString()
                    }))
                }
                setCookie("bookings", JSON.stringify(cookieState), BOOKINGS_COOKIE_OPTIONS)
            }
        },

        cancelBooking: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            const totals = calculateBookingTotals(state.items)
            state.subtotal = totals.subtotal
            state.tax = totals.tax
            state.total = totals.total

            const cookieState = {
                ...state,
                items: state.items.map(item => ({
                    ...item,
                    bookingDate: item.bookingDate.toString()
                }))
            }
            setCookie("bookings", JSON.stringify(cookieState), BOOKINGS_COOKIE_OPTIONS)
        },

        clearBookings: (state) => {
            state.items = []
            state.subtotal = 0
            state.tax = 0
            state.total = 0
            setCookie("bookings", JSON.stringify(state), BOOKINGS_COOKIE_OPTIONS)
        },
    },
})

export const {
    addToBookings,
    updateBookingDate,
    cancelBooking,
    clearBookings
} = bookingsSlice.actions

export default bookingsSlice.reducer