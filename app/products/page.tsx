"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import ProductCard from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchProducts } from "@/redux/features/product/productsSlice"
import { Filter, Search, SlidersHorizontal, X } from "lucide-react"
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const { products, loading } = useAppSelector((state) => state.products)

  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedVendors, setSelectedVendors] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Get category from URL if present
  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by search term
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    // Filter by category
    if (selectedCategory && product.category !== selectedCategory) {
      return false
    }

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Filter by vendor
    if (selectedVendors.length > 0 && !selectedVendors.includes(product.vendor.id)) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.id).getTime() - new Date(a.id).getTime()
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  // Get unique vendors from products
  const vendors = [...new Map(products.map((product) => [product.vendor.id, product.vendor])).values()]

  // Get unique categories from products
  const categories = [...new Set(products.map((product) => product.category))]

  const handleVendorChange = (vendorId: string, checked: boolean) => {
    if (checked) {
      setSelectedVendors([...selectedVendors, vendorId])
    } else {
      setSelectedVendors(selectedVendors.filter((id) => id !== vendorId))
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setPriceRange([0, 500])
    setSelectedCategory(null)
    setSelectedVendors([])
    setSortBy("featured")
  }

  return (
    <MainLayout>
      <div className="py-2 px-3 lg:px-20">
        <div className="mb-8 flex flex-col space-y-4 lg:mt-4">
          <h1 className="text-lg font-bold md:text-2xl">Products</h1>
          <p className="max-w-3xl text-muted-foreground text-sm md:text-base">
            All the stuff you actually need—tech, fashion, school gear, and everyday essentials. No stress, no overspending.
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
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
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
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
          <div
            className={`${filtersOpen ? "fixed inset-0 z-50 bg-background p-6 md:static md:block md:p-0" : "hidden md:block"}`}
          >
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
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 font-medium">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex items-center justify-between">
                    <span>{formatCurrency(priceRange[0])}</span>
                    <span>{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 font-medium">Vendors</h3>
                <div className="space-y-2">
                  {vendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`vendor-${vendor.id}`}
                        checked={selectedVendors.includes(vendor.id)}
                        onCheckedChange={(checked) => handleVendorChange(vendor.id, checked as boolean)}
                      />
                      <label
                        htmlFor={`vendor-${vendor.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {vendor.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 font-medium">Product Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="in-stock" />
                    <label
                      htmlFor="in-stock"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="on-sale" />
                    <label
                      htmlFor="on-sale"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      On Sale
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="new-arrivals" />
                    <label
                      htmlFor="new-arrivals"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      New Arrivals
                    </label>
                  </div>
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

          {/* Products Grid */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">{sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"} found</span>
              </div>
              {(selectedCategory || selectedVendors.length > 0 || priceRange[0] > 0 || priceRange[1] < 500) && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 gap-1 text-xs">
                  <X className="h-3 w-3" />
                  Clear filters
                </Button>
              )}
            </div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-[340px] animate-pulse rounded-lg bg-muted" />
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="flex h-96 flex-col items-center justify-center rounded-lg border border-dashed">
                <h3 className="mb-2 text-xl font-semibold">No Products Found</h3>
                <p className="mb-6 text-center text-muted-foreground">
                  Try adjusting your filters or search term to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} page="explore" />
                ))}
              </div>
            )}

            {sortedProducts.length > 0 && (
              <div className="mt-10 flex justify-center mb-5">
                <Button variant="outline">Load More</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
