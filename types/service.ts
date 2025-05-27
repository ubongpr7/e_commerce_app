export interface Service {
  id: string
  name: string
  slug: string
  price: number
  description: string
  longDescription?: string
  requirements?: string[]
  image: string
  category: string
  rating: number
  vendor: {
    id: string
    name: string
    slug: string
  }
  duration?: string // optional: e.g. "30 mins", "1 hour"
  location?: string // optional: e.g. "Online", "Home visit"
  isNew?: boolean
  onSale?: boolean
  isPopular?: boolean
}
