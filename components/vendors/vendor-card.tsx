import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface VendorCardProps {
  vendor: {
    id: string;
    name: string;
    logo: string;
    coverImage: string;
    description: string;
    productCount: number;
    rating: number;
    slug: string;
  };

  variant?: "default" | "horizontal";
  page?: "explore" | "default";
}

export function VendorCard({ vendor, variant = "default", page = "default" }: VendorCardProps) {
  return (
    <Link href={`/vendor/${vendor.slug}`} className="block group">
      <Card
        className={cn(
          "group relative overflow-hidden bg-white transition-all duration-300 ease-in-out shadow-sm hover:scale-[1.015] hover:shadow-lg",
          variant === "horizontal" && "flex flex-row",
          page !== "explore" && "hover:scale-[1.015] hover:shadow-lg",
          "w-full",
          page === "explore" ? "w-full lg:max-w-[280px]" : "lg:max-w-[260px] max-w-[210px]"
        )}
      >
        <div className="relative h-[50px] lg:h-[70px] w-full">
          <Image
            src={vendor.coverImage || "/placeholder.svg"}
            alt={vendor.name}
            fill
            className="object-cover"
          />
          <div className="absolute -bottom-12 left-2 w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white">
            <Image
              src={vendor.logo || "/placeholder.svg"}
              width={80}
              height={80}
              alt={vendor.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <CardContent className="pt-12 -mb-3 px-3">
          <div className="flex flex-row gap-4 justify-between">
            <h2 className="mb-2 text-base md:text-lg lg:text-xl font-semibold hover:text-orange-600 truncate text-left">
              {vendor.name}
            </h2>
            <div className="flex items-center gap-1 text-yellow-500 -mt-2">
              <Star className="h-3 w-3 fill-current" />
              <span>{vendor.rating}</span>
            </div>
          </div>

          <p className="mb-4 line-clamp-2 text-sm text-gray-600 leading-tight text-left">{vendor.description}</p>
          <div className=" flex flex-row gap-5 justify-between text-sm">

            <div className="flex items-center gap-0 text-gray-500 line-clamp-1">
              <Package className="h-3 w-3" />
              <span className="line-clamp-1">{vendor.productCount} products</span>
            </div>
          </div>
        </CardContent>

        <CardFooter
          className={cn(
            "p-2 pt-0 transition-all duration-300",
            page === "explore" ? "block" : "hidden"
          )}
        >
          <Button
            className="w-full gap-2 bg-orange-600 text-white hover:bg-orange-700 hover:shadow-orange-200 hover:shadow-lg transition-all"
          >
            Visit Store
          </Button>
        </CardFooter>
      </Card>
    </Link >
  );
}
