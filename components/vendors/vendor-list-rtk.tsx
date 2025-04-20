"use client"

import { useGetVendorsQuery } from "@/redux/features/vendor/vendorsApi"
import { VendorCard } from "@/components/vendors/vendor-card"
import { Button } from "@/components/ui/button"

export function VendorListRTK() {
  const { data: vendors, isLoading, error, refetch } = useGetVendorsQuery()

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-[300px] animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
        <h3 className="mb-2 text-xl font-semibold">Error loading vendors</h3>
        <p className="mb-4 text-center text-muted-foreground">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    )
  }

  if (!vendors || vendors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
        <h3 className="mb-2 text-xl font-semibold">No Vendors Found</h3>
        <p className="text-center text-muted-foreground">There are no vendors available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  )
}
