"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/products/product-card"
import { fetchFeaturedProducts } from "@/redux/features/product/productsSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

export function FeaturedProducts() {
  const dispatch = useAppDispatch()
  const { featuredProducts, loading } = useAppSelector((state) => state.products)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })
  }

  return (
    <section className="container py-12 md:py-16">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-2 hidden lg:block text-3xl font-bold text-gray-900 md:text-4xl">
          Featured Products
        </h2>
        <p className="mb-8 hidden lg:block max-w-3xl text-center text-gray-500">
          Discover our handpicked selection of top products from our trusted vendors
        </p>

        {/* Scroll area with hover group */}
        <div className="relative w-full group">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-[340px] w-[250px] animate-pulse rounded-lg bg-gray-100"
                />
              ))}
            </div>
          ) : (
            <>
              <div
                ref={scrollRef}
                className="overflow-x-auto max-w-full snap-x snap-mandatory flex gap-4 py-4 scrollbar-hide"
              >
                {featuredProducts.slice(0, 20).map((product) => (
                  <div key={product.id} className="flex-shrink-0 snap-start">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Chevron buttons - visible only on hover (large screens only) */}
              <button
                onClick={scrollLeft}
                className="hidden lg:group-hover:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-800 text-white rounded-full w-10 h-10 z-10 transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={scrollRight}
                className="hidden lg:group-hover:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-800 text-white rounded-full w-10 h-10 z-10 transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        <div className="mt-10">
          <Link href="/products">
            <Button
              variant="default"
              size="lg"
              className="text-white bg-orange-600 hover:bg-orange-700"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
