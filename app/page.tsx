import { MainLayout } from "@/components/layouts/main-layout"
import Banner from "@/components/home/home-banner"
import { FeaturedProducts } from "@/components/home/featured-products"
import { ProductListing } from "@/components/home/product-listing"
import { FeaturedVendors } from "@/components/home/featured-vendors"
import { CallToAction } from "@/components/home/call-to-action"

export default function HomePage() {
  return (
    <MainLayout>
      <Banner />

      <div className="bg-main-red mt-2 text-white text-center w-full p-2 font-semibold text-base md:hidden lg:hidden xl:hidden 2xl:hidden">
        SHOP YOUR STYLE
      </div>

      <FeaturedProducts />
      <ProductListing />
      <FeaturedVendors />
      <CallToAction />
    </MainLayout>
  )
}
