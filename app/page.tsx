import { MainPageLayout } from "@/components/layouts/main-page-layout"
import Banner from "@/components/home/home-banner"
import { FeaturedProducts } from "@/components/home/featured-products"
import FeaturedVendors from "@/components/home/featured-vendors"
import { CallToAction } from "@/components/home/call-to-action"
import Category1 from "@/components/categories/Category1"
import Category2 from "@/components/categories/Category2"
import Category3 from "@/components/categories/Category3"
import { Zap } from "lucide-react"
import CountdownTimer from "@/components/timer/countdown-timer"
import Link from "next/link"
import DesktopTimer from "@/components/timer/desktop-timer"
import HoverImage1 from "@/components/hoverimages/hover-image1"
import HoverImage2 from "@/components/hoverimages/hover-image2"
import ThreeImages from "@/components/threeimages/three-images"
import { ChevronRight } from "lucide-react"
import { FeaturedProducts2 } from "@/components/home/featured-products2"
import { FeaturedProducts3 } from "@/components/home/featured-products3"
import { FeaturedProducts4 } from "@/components/home/featured-products4"
import { FeaturedProducts5 } from "@/components/home/featured-products5"
import { FeaturedProducts6 } from "@/components/home/featured-products6"
import { FeaturedProducts7 } from "@/components/home/featured-products7"
import { FeaturedProducts8 } from "@/components/home/featured-products8"
import { FeaturedProducts9 } from "@/components/home/featured-products9"
import { FeaturedProducts10 } from "@/components/home/featured-products10"
import { FeaturedProducts11 } from "@/components/home/featured-products11"

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

          <div className="hidden lg:block">
            <FeaturedProducts2 />
          </div>

          <div className="hidden lg:block">
            <FeaturedProducts3 />
          </div>

          <div className="hidden lg:block">
            <FeaturedProducts4 />
          </div>

          <div className="hidden lg:block">
            <FeaturedProducts5 />
          </div>

          <div className="hidden lg:block">
            <FeaturedVendors />
          </div>

          <div className="hidden lg:block">
            <FeaturedProducts6 />
          </div>

          <div className="hidden lg:block">
            <FeaturedProducts7 />
          </div>

          <div className="hidden lg:block">
            <FeaturedProducts8 />
          </div>

          <div className="hidden lg:block">
            <FeaturedProducts9 />
          </div>

          <div className="hidden lg:block">
            <FeaturedProducts10 />
          </div>

          <div className="hidden lg:block">
            <FeaturedProducts11 />
          </div>

          <Link href="/">
            <div className="z-10 bg-main-red mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-14 w-full py-2 lg:hidden cursor-pointer">
              <div className="flex flex-row gap-2">
                <Zap className="h-7 w-7 mt-2 text-gold fill-gold" />
                <div>
                  <h1 className="text-base lg:mt-1.5 font-semibold lg:text-lg">Flash Sales</h1>
                  <CountdownTimer targetDate="2025-04-18T00:00:00Z" repeatIntervalInSeconds={300} />
                </div>
              </div>

              <DesktopTimer targetDate="2025-04-18T00:00:00Z" repeatIntervalInSeconds={300} />

              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden">
            <FeaturedProducts />
          </div>

          <div className="pb-2 mt-0 -mb-1">
            <hr className="border-t-8 mb-1 border-gray-300 lg:hidden right-0 left-0 absolute" />
          </div>

          <div className="lg:hidden">
            <Category3 />
          </div>

          <hr className="my-4 border-t-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <div className="hidden">
            <ThreeImages />
          </div>

          <hr className="border-b-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <Link href="/">
            <div className="z-10 bg-black mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-10 w-full py-2 lg:hidden cursor-pointer">
              <div className="text-base lg:text-lg font-semibold">
                Sponsored Products
              </div>
              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden -mt-4">
            <FeaturedProducts />
          </div>


          {/*HOME ESSENTIALS*/}
          <hr className="border-b-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <Link href="/">
            <div className="z-10 bg-black mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-10 w-full py-2 lg:hidden cursor-pointer">
              <div className="text-base lg:text-lg font-semibold">
                Home Essentials
              </div>
              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden -mt-4">
            <FeaturedProducts />
          </div>

          {/*SCHOOL DEALS*/}
          <hr className="border-b-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <Link href="/">
            <div className="z-10 bg-black mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-10 w-full py-2 lg:hidden cursor-pointer">
              <div className="text-base lg:text-lg font-semibold">
                School Deals
              </div>
              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden -mt-4">
            <FeaturedProducts />
          </div>

          {/*FASHION & APPAREL*/}
          <hr className="border-b-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <Link href="/">
            <div className="z-10 bg-black mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-10 w-full py-2 lg:hidden cursor-pointer">
              <div className="text-base lg:text-lg font-semibold">
                Fashion & Apparel
              </div>
              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden -mt-4">
            <FeaturedProducts />
          </div>

          {/*VENDORS*/}
          <hr className="border-b-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <Link href="/vendors">
            <div className="z-10 bg-black mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-10 w-full py-2 lg:hidden cursor-pointer">
              <div className="text-base lg:text-lg font-semibold">
                Top Vendors
              </div>
              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden mt-14 mb-1">
            <FeaturedVendors />
          </div>

          {/*BEAUTY & HEALTH*/}
          <hr className="border-b-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <Link href="/">
            <div className="z-10 bg-black mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-10 w-full py-2 lg:hidden cursor-pointer">
              <div className="text-base lg:text-lg font-semibold">
                Beauty & Health
              </div>
              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden -mt-4">
            <FeaturedProducts />
          </div>

          {/*SPORTING DEALS*/}
          <hr className="border-b-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <Link href="/">
            <div className="z-10 bg-black mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-10 w-full py-2 lg:hidden cursor-pointer">
              <div className="text-base lg:text-lg font-semibold">
                Sporting Deals
              </div>
              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden -mt-4">
            <FeaturedProducts />
          </div>

          {/*ENTERTAINMENT DEALS*/}
          <hr className="border-b-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <Link href="/">
            <div className="z-10 bg-black mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-10 w-full py-2 lg:hidden cursor-pointer">
              <div className="text-base lg:text-lg font-semibold">
                Entertainment Deals
              </div>
              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden -mt-4">
            <FeaturedProducts />
          </div>

          {/*AUTOMOBILE DEALS*/}
          <hr className="border-b-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <Link href="/">
            <div className="z-10 bg-black mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-10 w-full py-2 lg:hidden cursor-pointer">
              <div className="text-base lg:text-lg font-semibold">
                Automobile Deals
              </div>
              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden -mt-4">
            <FeaturedProducts />
          </div>

          {/*FOOD & GROCERIES*/}
          <hr className="border-b-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <Link href="/">
            <div className="z-10 bg-black mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-10 w-full py-2 lg:hidden cursor-pointer">
              <div className="text-base lg:text-lg font-semibold">
                Food & Groceries
              </div>
              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden -mt-4">
            <FeaturedProducts />
          </div>

          {/*ELECTRONICS & GADGETS*/}
          <hr className="border-b-8 border-gray-300 lg:hidden right-0 left-0 absolute" />

          <Link href="/">
            <div className="z-10 bg-black mt-2 absolute right-0 left-0 text-white flex flex-row justify-between px-3 h-10 w-full py-2 lg:hidden cursor-pointer">
              <div className="text-base lg:text-lg font-semibold">
                Electronics & Gadgets
              </div>
              <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                <p>See All</p>
                <ChevronRight className="h-3 w-3 ml-1" /> {/* Add Chevron icon here */}
              </div>
            </div>
          </Link>

          <div className="lg:hidden -mt-4">
            <FeaturedProducts />
          </div>

          <div className="hidden">
            <CallToAction />
          </div>
        </div>

      </MainPageLayout>
    </main>
  )
}
