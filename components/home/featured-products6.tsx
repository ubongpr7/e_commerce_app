"use client"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "@/components/products/product-card"
import { fetchFeaturedProducts } from "@/redux/features/product/productsSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

export function FeaturedProducts6() {
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
        <section className="lg:bg-white lg:mx-16 lg:mt-2 lg:rounded-md lg:px-4 lg:py-0]">
            <div className="flex flex-col items-center justify-center">
                <h2 className="mb-2 hidden text-3xl font-bold text-gray-900">
                    Featured Products
                </h2>
                <p className="mb-8 hidden max-w-3xl text-center text-gray-500">
                    Discover our handpicked selection of top products from our trusted vendors
                </p>

                <Link href={"/"}>
                    <div className="bg-black text-white lg:flex rounded-md flex-row justify-between px-3 h-14 lg:w-[950px] xl:w-[1200px] py-2 hidden">
                        <div>
                            <h1 className="text-base lg:mt-1.5 font-semibold lg:text-lg">Beauty & Health</h1>
                        </div>

                        <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
                            <p>See All</p>
                            <ChevronRight className="h-4 w-4 ml-2" /> {/* Add Chevron icon here */}
                        </div>
                    </div>
                </Link>

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
                                className="overflow-x-auto max-w-full mt-14 lg:mt-0 snap-x snap-mandatory flex gap-4 py-4 lg:py-2 scrollbar-hide"
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
            </div>
        </section>
    )
}
