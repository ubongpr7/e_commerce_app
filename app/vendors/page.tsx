"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import { VendorCard } from "@/components/vendors/vendor-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Filter, Search, SlidersHorizontal, X, ChevronRight } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchVendors } from "@/redux/features/vendor/vendorsSlice"
import Link from "next/link"

export default function VendorsPage() {
  const dispatch = useAppDispatch()
  const { vendors, loading } = useAppSelector((state) => state.vendors)
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("featured")
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  useEffect(() => {
    dispatch(fetchVendors())
  }, [dispatch])

  const filteredVendors = vendors.filter((vendor) => {
    if (searchTerm && !vendor.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    if (selectedCategory && vendor.category !== selectedCategory) {
      return false
    }

    return true
  })

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.id).getTime() - new Date(a.id).getTime()
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const categories = [...new Set(vendors.map((vendor) => vendor.category))]

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
    setSortBy("featured")
  }

  return (
    <MainLayout>
      <div className="py-2 px-3 lg:px-5">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="mx-1 h-3 w-3" />
          <span className="text-foreground">Vendors</span>
        </div>

        <div className="mb-8 flex flex-col space-y-4 lg:mt-4">
          <h1 className="text-lg font-bold md:text-2xl">Vendors</h1>
          <p className="max-w-3xl text-muted-foreground text-sm md:text-base">
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
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="hidden" onClick={() => setFiltersOpen(!filtersOpen)}>
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          {/* Filters Sidebar */}
          <div className={`${filtersOpen ? "fixed inset-0 z-50 bg-background p-6 md:static md:block md:p-0" : "hidden md:block"}`}>
            <div className="flex items-center justify-between md:hidden">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-4 space-y-6">
              <div>
                <h3 className="mb-4 font-medium">Categories</h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="w-full justify-between capitalize"
                      onClick={() => {
                        if (category !== undefined) {
                          setSelectedCategory(category)
                        }
                      }}

                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={clearFilters}>
                Clear Filters
              </Button>

              <div className="pt-4 lg:hidden">
                <Button className="w-full" onClick={() => setFiltersOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Vendor Grid */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">{sortedVendors.length} {sortedVendors.length === 1 ? "vendor" : "vendors"} found</span>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
              {sortedVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} page="explore" />
              ))}
            </div>


            {sortedVendors.length > 0 && (
              <div className="mt-8 flex justify-center mb-4">
                <Button variant="outline">Load More</Button>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-lg bg-muted p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Become a Vendor</h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Join our marketplace and start selling your products to thousands of customers.
          </p>
          <Link href="/vendor/register/start">
            <Button size="lg">Register as a Vendor</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
