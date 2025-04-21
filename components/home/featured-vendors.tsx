import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VendorCard } from "@/components/vendors/vendor-card";

const featuredVendors = [
  {
    id: "1",
    name: "TechGadgets",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    description: "The latest electronic gadgets and accessories.",
    productCount: 42,
    rating: 4.7,
    slug: "tech-gadgets",
  },
  {
    id: "2",
    name: "FashionHub",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    description: "Trendy clothing and accessories for all seasons.",
    productCount: 128,
    rating: 4.5,
    slug: "fashion-hub",
  },
  {
    id: "3",
    name: "HomeEssentials",
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=200&width=300",
    description: "Everything you need for your home and kitchen.",
    productCount: 85,
    rating: 4.8,
    slug: "home-essentials",
  },
];

export function FeaturedVendors() {
  return (
    <section className="bg-gray-100 ">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl text-gray-800 ">
            Our Top Vendors
          </h2>
          <p className="mb-8 max-w-3xl text-gray-600 ">
            Meet our most trusted vendors who consistently deliver quality products.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>

          <div className="mt-10">
            <Link href="/vendors">
              <Button variant="outline" size="lg" className="text-gray-800  border-gray-300 ">
                Explore All Vendors
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
