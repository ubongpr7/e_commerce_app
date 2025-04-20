"use client"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import Link from "next/link"
import { ProductCard } from "@/components/products/product-card"
import { fetchFeaturedProducts } from "@/redux/features/product/productsSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

export function FeaturedProducts() {
  const dispatch = useAppDispatch()
  const { featuredProducts, loading } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  return (
    <section className="container py-12 md:py-16">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-2 text-3xl font-bold md:text-4xl">Featured Products</h2>
        <p className="mb-8 max-w-3xl text-center text-muted-foreground">
          Discover our handpicked selection of top products from our trusted vendors
        </p>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[340px] w-[250px] animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
     
        <div className="mt-10">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
