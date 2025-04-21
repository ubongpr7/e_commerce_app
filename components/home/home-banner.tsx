"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface BannerSlide {
  id: string
  imageUrl: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
}

const bannerSlides: BannerSlide[] = [
  {
    id: "1",
    imageUrl: "/placeholder.svg?height=600&width=1200",
    title: "Summer Collection",
    description: "Discover our new summer collection with amazing discounts",
    ctaText: "Shop Now",
    ctaLink: "/products?category=summer",
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg?height=600&width=1200",
    title: "New Vendors Join Daily",
    description: "Find unique products from our expanding vendor network",
    ctaText: "Explore Vendors",
    ctaLink: "/vendors",
  },
  {
    id: "3",
    imageUrl: "/placeholder.svg?height=600&width=1200",
    title: "Become a Vendor",
    description: "Join our platform and start selling your products today",
    ctaText: "Register Now",
    ctaLink: "/vendor/register/start",
  },
]

export function HomeBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerSlides.map((slide) => (
          <div key={slide.id} className="relative h-[300px] w-full flex-shrink-0 md:h-[400px] lg:h-[500px]">
            <Image
              src={slide.imageUrl || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gray-900/40 " />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center md:p-12">
              <h1 className="mb-2 text-3xl font-bold text-gray-50  md:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
              <p className="mb-6 max-w-lg text-lg text-gray-200  md:text-xl">
                {slide.description}
              </p>
              <Button 
                size="lg" 
                asChild
                className="bg-blue-600 text-white hover:bg-blue-700 "
              >
                <Link href={slide.ctaLink}>{slide.ctaText}</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-800/30 text-gray-50 hover:bg-gray-800/50 "
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gray-800/30 text-gray-50 hover:bg-gray-800/50 "
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 rounded-full bg-gray-300/50 transition-all duration-300 ",
              currentSlide === index && "w-4 bg-gray-50 "
            )}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}