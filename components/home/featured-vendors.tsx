"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VendorCard } from "@/components/vendors/vendor-card";

// Mock vendors - replace with your actual data or Redux slice
const featuredVendors = [
  {
    id: "1",
    name: "Tech Gadgets",
    category: "electronics-gadgets",
    logo: "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "The latest electronic gadgets and accessories.",
    productCount: 42,
    rating: 4.7,
    slug: "tech-gadgets",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "2",
    name: "Fashion Hub",
    category: "fashion-wear",
    logo: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Trendy clothing and accessories for all seasons.",
    productCount: 128,
    rating: 4.5,
    slug: "fashion-wear",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "3",
    name: "Home Essential",
    category: "home-essentials",
    logo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    coverImage: "https://images.pexels.com/photos/443378/pexels-photo-443378.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "home-essential",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "4",
    name: "Dave Dan",
    category: "study-materials",
    logo: "https://images.pexels.com/photos/433333/pexels-photo-433333.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "dave-dan",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "5",
    name: "Stanford",
    category: "office-supplies",
    logo: "https://images.pexels.com/photos/8533361/pexels-photo-8533361.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/372748/pexels-photo-372748.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "stanford",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "6",
    name: "Dami Grocery",
    category: "food-gocery",
    logo: "https://images.pexels.com/photos/32397339/pexels-photo-32397339/free-photo-of-delicious-layered-yogurt-with-strawberries.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/32385197/pexels-photo-32385197/free-photo-of-close-up-of-dough-wrapped-sausages-on-tray.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "dami-grocery",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "7",
    name: "Favy Abia",
    category: "beauty-health",
    logo: "https://images.pexels.com/photos/13767162/pexels-photo-13767162.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "favy-abia",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "8",
    name: "Morgan SP",
    category: "sporting-goods",
    logo: "https://images.pexels.com/photos/6572984/pexels-photo-6572984.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/257970/pexels-photo-257970.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "morgan-sp",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "9",
    name: "Jed Auto",
    category: "automobile-goods",
    logo: "https://images.pexels.com/photos/8386126/pexels-photo-8386126.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/221028/pexels-photo-221028.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "jed-auto",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
  },
  {
    id: "10",
    name: "Game House",
    category: "entertainment-games",
    logo: "https://images.pexels.com/photos/2689343/pexels-photo-2689343.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/3852577/pexels-photo-3852577.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "game-house",
    joinedDate: "2023-10-15",
    school: "University of Lagos",
    address: "123 Tech Street, Lagos",
    phone: "+234 123 4567",
    email: "yabatech@gmail.com",
    website: "https://techgadgets.example.com",
    reviewCount: 120,
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
        <Link href={"/vendors"}>
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
