"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VendorCard } from "@/components/vendors/vendor-card";

// Mock vendors - replace with your actual data or Redux slice
const featuredVendors = [
  {
    id: "1",
    name: "TechGadgets",
    logo: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The latest electronic gadgets and accessories.",
    productCount: 42,
    rating: 4.7,
    slug: "tech-gadgets",
  },
  {
    id: "2",
    name: "FashionHub",
    logo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Trendy clothing and accessories for all seasons.",
    productCount: 128,
    rating: 4.5,
    slug: "fashion-hub",
  },
  {
    id: "3",
    name: "HomeEssentials",
    logo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/443378/pexels-photo-443378.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "home-essentials",
  },
  {
    id: "4",
    name: "TechGadgets",
    logo: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The latest electronic gadgets and accessories.",
    productCount: 42,
    rating: 4.7,
    slug: "tech-gadgets",
  },
  {
    id: "5",
    name: "FashionHub",
    logo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Trendy clothing and accessories for all seasons.",
    productCount: 128,
    rating: 4.5,
    slug: "fashion-hub",
  },
  {
    id: "6",
    name: "HomeEssentials",
    logo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/443378/pexels-photo-443378.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "home-essentials",
  },
  {
    id: "7",
    name: "TechGadgets",
    logo: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The latest electronic gadgets and accessories.",
    productCount: 42,
    rating: 4.7,
    slug: "tech-gadgets",
  },
  {
    id: "8",
    name: "FashionHub",
    logo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Trendy clothing and accessories for all seasons.",
    productCount: 128,
    rating: 4.5,
    slug: "fashion-hub",
  },
  {
    id: "9",
    name: "HomeEssentials",
    logo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/443378/pexels-photo-443378.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "home-essentials",
  },
  {
    id: "10",
    name: "TechGadgets",
    logo: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The latest electronic gadgets and accessories.",
    productCount: 42,
    rating: 4.7,
    slug: "tech-gadgets",
  },
  {
    id: "11",
    name: "FashionHub",
    logo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Trendy clothing and accessories for all seasons.",
    productCount: 128,
    rating: 4.5,
    slug: "fashion-hub",
  },
  {
    id: "12",
    name: "HomeEssentials",
    logo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/443378/pexels-photo-443378.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "home-essentials",
  },
  {
    id: "13",
    name: "TechGadgets",
    logo: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The latest electronic gadgets and accessories.",
    productCount: 42,
    rating: 4.7,
    slug: "tech-gadgets",
  },
  {
    id: "14",
    name: "FashionHub",
    logo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Trendy clothing and accessories for all seasons.",
    productCount: 128,
    rating: 4.5,
    slug: "fashion-hub",
  },
  {
    id: "15",
    name: "HomeEssentials",
    logo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/443378/pexels-photo-443378.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "home-essentials",
  },
  {
    id: "16",
    name: "TechGadgets",
    logo: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The latest electronic gadgets and accessories.",
    productCount: 42,
    rating: 4.7,
    slug: "tech-gadgets",
  },
  {
    id: "17",
    name: "FashionHub",
    logo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Trendy clothing and accessories for all seasons.",
    productCount: 128,
    rating: 4.5,
    slug: "fashion-hub",
  },
  {
    id: "18",
    name: "HomeEssentials",
    logo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/443378/pexels-photo-443378.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "home-essentials",
  },
  {
    id: "19",
    name: "TechGadgets",
    logo: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The latest electronic gadgets and accessories.",
    productCount: 42,
    rating: 4.7,
    slug: "tech-gadgets",
  },
  {
    id: "20",
    name: "FashionHub",
    logo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Trendy clothing and accessories for all seasons.",
    productCount: 128,
    rating: 4.5,
    slug: "fashion-hub",
  },
  {
    id: "21",
    name: "HomeEssentials",
    logo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/443378/pexels-photo-443378.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "home-essentials",
  },
];

export default function FeaturedVendors() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="lg:bg-white lg:mx-16 lg:mt-2 lg:rounded-md lg:px-4 lg:py-0]">
      <div className="flex flex-col items-center justify-center">
        <Link href={"/"}>
          <div className="bg-black text-white lg:flex rounded-md flex-row justify-between px-3 h-14 lg:w-[950px] xl:w-[1200px] py-2 hidden">
            <div>
              <h1 className="text-base lg:mt-1.5 font-semibold lg:text-lg">Top Vendors</h1>
            </div>

            <div className="flex flex-row items-center text-white text-xs lg:text-base lg:mt-1.5">
              <p>See All</p>
              <ChevronRight className="h-4 w-4 ml-2" /> {/* Add Chevron icon here */}
            </div>
          </div>
        </Link>

        {/* Scroll area with chevrons */}
        <div className="relative w-full group">
          <div
            ref={scrollRef}
            className="overflow-x-auto max-w-full mt-0 snap-x snap-mandatory flex gap-4 py-2 scrollbar-hide"
          >
            {featuredVendors.map((vendor) => (
              <div key={vendor.id} className="flex-shrink-0 snap-start">
                <VendorCard vendor={vendor} />
              </div>
            ))}
          </div>

          {/* Scroll buttons (only on lg and on hover) */}
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
        </div>
      </div>
    </section>
  );
}
