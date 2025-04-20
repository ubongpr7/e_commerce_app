import { MainLayout } from "@/components/layouts/main-layout"
import { HomeBanner } from "@/components/home/home-banner"
import { FeaturedProducts } from "@/components/home/featured-products"
import { ProductListing } from "@/components/home/product-listing"
import { FeaturedVendors } from "@/components/home/featured-vendors"
import { CallToAction } from "@/components/home/call-to-action"

export default function HomePage() {
  return (
    <MainLayout>
      <HomeBanner />
      <FeaturedProducts />
      <ProductListing />
      <FeaturedVendors />
      <CallToAction />
    </MainLayout>
  )
}
