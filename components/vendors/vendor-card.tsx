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
    <Card className="overflow-hidden transition-all hover:shadow-md bg-white text-gray-800">
      <div className="relative h-[120px] w-full">
        <Image
          src={vendor.coverImage || "/placeholder.svg"}
          alt={vendor.name}
          fill
          className="object-cover"
        />
        <div className="absolute -bottom-12 left-4 rounded-full border-4 border-white">
          <Image
            src={vendor.logo || "/placeholder.svg"}
            width={80}
            height={80}
            alt={vendor.name}
            className="rounded-full bg-white"
          />
        </div>
      </div>
      <CardContent className="pt-16">
        <Link href={`/vendor/${vendor.slug}`}>
          <h3 className="mb-2 text-xl font-semibold hover:text-orange-600">{vendor.name}</h3>
        </Link>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{vendor.description}</p>
        <div className="mb-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span>{vendor.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Package className="h-4 w-4" />
            <span>{vendor.productCount} products</span>
          </div>
        </div>
        <Link href={`/vendor/${vendor.slug}`}>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-gray-500">
            Visit Store
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
