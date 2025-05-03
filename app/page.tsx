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
        <div className="bg-main-red text-white text-center w-full p-2 font-semibold text-base lg:hidden">
          SHOP YOUR STYLE
        </div>
        <Banner />
        <Category1 />
        <FeaturedProducts />
        <ProductListing />
        <FeaturedVendors />
        <CallToAction />
      </MainLayout>
    </main>
  )
}
