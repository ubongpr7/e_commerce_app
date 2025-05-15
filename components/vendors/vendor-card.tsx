import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Package } from "lucide-react";

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
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Link href={`/vendor/${vendor.slug}`} className="block group">
      <Card className="overflow-hidden transition-all bg-white shadow-sm hover:shadow-lg hover:scale-[1.015] text-gray-800 w-[200px] lg:w-[250px]">
        <div className="relative h-[50px] lg:h-[70px] w-full">
          <Image
            src={vendor.coverImage || "/placeholder.svg"}
            alt={vendor.name}
            fill
            className="object-cover"
          />
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white">
            <Image
              src={vendor.logo || "/placeholder.svg"}
              width={80}
              height={80}
              alt={vendor.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

      <CardContent className="pt-12 -mb-3">
        <h3 className="mb-2 text-xl font-semibold hover:text-orange-600 line-clamp-1 text-center">{vendor.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600 leading-tight text-center">{vendor.description}</p>
        <div className=" flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span>{vendor.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 line-clamp-1">
            <Package className="h-4 w-4" />
            <span>{vendor.productCount} products</span>
          </div>
        </div>
        <Button variant="outline" className="w-full hidden border-gray-300 text-gray-700 hover:border-gray-500">
          Visit Store
        </Button>
      </CardContent>
    </Card>
    </Link >
  );
}
