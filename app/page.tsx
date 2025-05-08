import { MainPageLayout } from "@/components/layouts/main-page-layout"
import Banner from "@/components/home/home-banner"
import { FeaturedProducts } from "@/components/home/featured-products"
import { ProductListing } from "@/components/home/product-listing"
import { FeaturedVendors } from "@/components/home/featured-vendors"
import { CallToAction } from "@/components/home/call-to-action"
import Category1 from "@/components/categories/Category1"
import Category2 from "@/components/categories/Category2"
import Category3 from "@/components/categories/Category3"
import { Zap } from "lucide-react"
import CountdownTimer from "@/components/timer/countdown-timer"
import Link from "next/link"
import DesktopTimer from "@/components/timer/desktop-timer"
import HoverImage1 from "@/components/hoverimages/hover-image1"
import HoverImage2 from "@/components/hoverimages/hoveer-image2"

export default function HomePage() {
  return (
    <main>
      <MainPageLayout>

        <div className="lg:hidden">
          <Banner />
        </div>

        <div className="hidden lg:flex flex-row justify-between px-8">
          <HoverImage1 />
          <Banner />
          <HoverImage2 />
        </div>

        <div className="p-3 lg:p-5">
          <Category1 />

          <div className="hidden lg:block">
            <FeaturedProducts />
          </div>

          <div className="">
            <Category2 />
          </div>


          <Link href={"/"}>
            <div className="bg-main-red mt-2 text-white flex flex-row justify-between px-3 h-14 w-full py-2 lg:hidden">
              <div className="flex flex-row gap-2">
                <Zap className="h-7 w-7 mt-2 text-gold fill-gold" />
                <div>
                  <h1 className="text-base lg:mt-1.5 font-semibold lg:text-lg">Flash Sales</h1>
                  <CountdownTimer targetDate="2025-04-18T00:00:00Z" repeatIntervalInSeconds={300} />
                </div>
              </div>

              <DesktopTimer targetDate="2025-04-18T00:00:00Z" repeatIntervalInSeconds={300} />

              <p className="text-white text-xs mr-2 lg:text-base lg:mt-1.5">See All</p>
            </div>
          </Link>

          <div className="lg:hidden">
            <FeaturedProducts />
          </div>

          <div className="lg:hidden">
            <Category3 />
          </div>


          <ProductListing />
          <FeaturedVendors />
          <CallToAction />
        </div>

      </MainPageLayout>
    </main>
  )
}
