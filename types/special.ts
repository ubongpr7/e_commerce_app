export interface Special {
    id: string
    name: string
    slug: string
    price: number // could represent base price, per night, per entry, etc.
    description: string
    longDescription?: string
    amenities?: string[] // e.g. ["WiFi", "Swimming Pool", "Gym Access"]
    image: string
    category: string // e.g. "Lodge", "Hotel", "Recreation", etc.
    rating: number
    vendor: {
        id: string
        name: string
        slug: string
    }
    duration?: string // e.g. "1 night", "3 days", "Weekend pass"
    location?: string // e.g. "Off Campus", "Main Campus Area", "City Center"
    isNew?: boolean
    onSale?: boolean
    isPopular?: boolean
    availability?: string // e.g. "Available", "Fully Booked", or "Seasonal"
}
