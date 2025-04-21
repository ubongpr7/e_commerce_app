"use client"

import { useGetProductsQuery } from "@/redux/features/product/productAPISlice"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"

export function ProductListRTK() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery()

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-[340px] animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 p-8">
        <h3 className="mb-2 text-xl font-semibold">Error loading products</h3>
        <p className="mb-4 text-center text-gray-500">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
        <Button 
          onClick={() => refetch()}
          className="bg-gray-900 text-white hover:bg-gray-800"
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 p-8">
        <h3 className="mb-2 text-xl font-semibold">No Products Found</h3>
        <p className="text-center text-gray-500">There are no products available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}