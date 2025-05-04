import { MainLayout } from "@/components/layouts/main-layout"
import Banner from "@/components/home/home-banner"
import { FeaturedProducts } from "@/components/home/featured-products"
import { ProductListing } from "@/components/home/product-listing"
import { FeaturedVendors } from "@/components/home/featured-vendors"
import { CallToAction } from "@/components/home/call-to-action"
import Category1 from "@/components/categories/Category1"

export default function HomePage() {
  return (
    <main>
      <MainLayout>
        

        <Banner />

        <div className="p-3 lg:p-5">
          <Category1 />
          <FeaturedProducts />
          <ProductListing />
          <FeaturedVendors />
          <CallToAction />
        </div>

      </MainLayout>
    </main>
  )
}
