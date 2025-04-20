"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/product-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { fetchProducts } from "@/lib/features/products/productsSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"

// Sample categories for the tabs
const categories = [
  { id: "all", name: "All Products" },
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "home", name: "Home & Kitchen" },
  { id: "beauty", name: "Beauty" },
]

export function ProductListing() {
  const dispatch = useAppDispatch()
  const { products, loading } = useAppSelector((state) => state.products)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <section className="container py-12 md:py-16">
      <div className="flex flex-col items-center">
        <h2 className="mb-2 text-3xl font-bold md:text-4xl">Explore Our Products</h2>
        <p className="mb-8 max-w-3xl text-center text-muted-foreground">
          Browse through our extensive collection of quality products from trusted vendors
        </p>

        <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              {loading ? (
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-[340px] animate-pulse rounded-lg bg-muted" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}

                    {/* Add more mock products to fill the grid */}
                    {[...Array(Math.max(0, 10 - filteredProducts.length))].map((_, i) => (
                      <ProductCard
                        key={`mock-${i}`}
                        product={{
                          id: `mock-${i}`,
                          name: `Product ${i + 1}`,
                          slug: `product-${i + 1}`,
                          price: 99.99,
                          compareAtPrice: i % 2 === 0 ? 129.99 : 0,
                          description: "This is a sample product description.",
                          images: ["/placeholder.svg?height=400&width=400"],
                          category: category.id,
                          rating: 4.5,
                          inStock: true,
                          isNew: i % 3 === 0,
                          onSale: i % 2 === 0,
                          vendor: {
                            id: "mock-vendor",
                            name: "Sample Vendor",
                            slug: "sample-vendor",
                          },
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8">
          <Link href="/products">
            <Button size="lg">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
