"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@/types/product";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/cart/cartSlice";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "horizontal";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all hover:shadow-md bg-white text-gray-800",
        variant === "horizontal" && "flex flex-row"
      )}
    >
      <div
        className={cn(
          "relative",
          variant === "default" && "aspect-square",
          variant === "horizontal" && "h-[180px] w-[180px] flex-shrink-0"
        )}
      >
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist button */}
        <div className="absolute right-2 top-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-100 hover:bg-gray-200"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute left-2 top-2 z-10 space-y-1">
          {product.onSale && (
            <Badge className="bg-red-500 text-white hover:bg-red-600">Sale</Badge>
          )}
          {product.isNew && (
            <Badge className="bg-green-500 text-white hover:bg-green-600">New</Badge>
          )}
        </div>
      </div>

      <div className={cn(variant === "horizontal" && "flex flex-1 flex-col")}>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <Link
              href={`/vendor/${product.vendor.slug}`}
              className="text-gray-500 hover:text-blue-600"
            >
              {product.vendor.name}
            </Link>
            <div className="flex items-center text-yellow-500">
              <Star className="mr-1 h-4 w-4 fill-current" />
              <span className="font-medium text-gray-700">{product.rating}</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="mb-2 line-clamp-2 font-semibold hover:text-blue-600">
              {product.name}
            </h3>
          </Link>

          <div className="mb-2 flex items-center gap-2">
            <span className="font-bold text-blue-600">${product.price.toFixed(2)}</span>
            {product.compareAtPrice > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {variant === "horizontal" && (
            <p className="mb-2 line-clamp-2 text-sm text-gray-500">{product.description}</p>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full gap-2 bg-orange-600 text-white hover:bg-orange-700" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
