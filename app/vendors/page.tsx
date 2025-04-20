"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { VendorCard } from "@/components/vendors/vendor-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronRight } from "lucide-react"
import Link from "next/link"

// Sample vendor data (would come from your API)
const allVendors = [
  {
    id: "1",
    name: "TechGadgets",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    description: "The latest electronic gadgets and accessories.",
    productCount: 42,
    rating: 4.7,
    slug: "tech-gadgets",
  },
  {
    id: "2",
    name: "FashionHub",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    description: "Trendy clothing and accessories for all seasons.",
    productCount: 128,
    rating: 4.5,
    slug: "fashion-hub",
  },
  {
    id: "3",
    name: "HomeEssentials",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "home-essentials",
  },
  // Add more mock vendors
  ...Array(9)
    .fill(null)
    .map((_, i) => ({
      id: `${i + 4}`,
      name: `Vendor ${i + 4}`,
      logo: "/placeholder.svg?height=80&width=80",
      coverImage: "/placeholder.svg?height=200&width=300",
      description: "A quality vendor providing excellent products and service.",
      productCount: Math.floor(50 * 100) + 20,
      rating: parseFloat((0.4 * 1.5 + 3.5).toFixed(1)),
      slug: `vendor-${i + 4}`,
    })),
]

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [vendors, setVendors] = useState(allVendors)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // Filter vendors based on search term
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Sort vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "products":
        return b.productCount - a.productCount
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="text-foreground">Vendors</span>
        </div>

        <div className="mb-8 flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">Our Vendors</h1>
          <p className="max-w-3xl text-muted-foreground">
            Browse our trusted vendors who provide quality products and excellent service. Find the perfect vendor for
            your needs and start shopping today.
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="products">Most Products</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[300px] animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : sortedVendors.length === 0 ? (
          <div className="flex h-96 flex-col items-center justify-center rounded-lg border border-dashed">
            <h3 className="mb-2 text-xl font-semibold">No Vendors Found</h3>
            <p className="mb-6 text-center text-muted-foreground">
              Try adjusting your search term to find what you're looking for.
            </p>
            <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {sortedVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}

        {sortedVendors.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        )}

        <div className="mt-16 rounded-lg bg-muted p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Become a Vendor</h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Join our marketplace and start selling your products to thousands of customers. Manage your inventory, track
            sales, and grow your business with our comprehensive tools.
          </p>
          <Link href="/vendor/register/start">
            <Button size="lg">Register as a Vendor</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
