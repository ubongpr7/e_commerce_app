export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  inStock: boolean
}

export interface Vendor {
  id: string
  name: string
  slug: string
}

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice: number
  description: string
  images: string[]
  category: string
  rating: number
  inStock: boolean
  isNew: boolean
  onSale: boolean
  variants?: ProductVariant[]
  vendor: Vendor
}
