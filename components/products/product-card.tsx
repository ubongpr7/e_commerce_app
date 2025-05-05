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

  const imageUrl =
    product.images?.[0]?.startsWith("http") && product.images[0].length > 10
      ? product.images[0]
      : "https://images.pexels.com/photos/9836578/pexels-photo-9836578.jpeg?auto=compress&cs=tinysrgb&w=600";

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:scale-[1.015] max-w-[130px] lg:max-w-[180px]  w-full",
        variant === "horizontal" && "flex flex-row"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          variant === "default" && "aspect-square",
          variant === "horizontal" && "h-[130px] w-[130px] flex-shrink-0"
        )}
      >
        <Link href={`/product/${product.slug}`}>
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt="Product image"
              width={130}
              height={130}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
          </div>
        </Link>

        {/* Wishlist button */}
        <div className="absolute right-2 top-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 backdrop-blur hover:bg-white"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5 text-gray-700 group-hover:text-orange-600 transition-colors" />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute left-2 top-2 z-10 space-y-1">
          {product.onSale && (
            <Badge className="bg-red-500 mr-1 text-white hover:bg-red-600 shadow-sm">Sale</Badge>
          )}
          {product.isNew && (
            <Badge className="bg-green-500 mr-1 text-white hover:bg-green-600 shadow-sm">New</Badge>
          )}
        </div>
      </div>

      <div className={cn(variant === "horizontal" && "flex flex-1 flex-col")}>
        <CardContent className="p-2">
          <div className="mb-1 flex items-center justify-between text-xs">
            <Link
              href={`/vendor/${product.vendor.slug}`}
              className="text-gray-500 hover:text-orange-600 transition-colors text-xs lg:text-xs"
            >
              {product.vendor.name}
            </Link>
            <div className="flex items-center text-yellow-500">
              <Star className="mr-1 h-3 w-3 fill-current" />
              <span className="font-medium text-gray-700">{product.rating}</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="mb-1 line-clamp-1 leading-tight lg:text-base text-xs text-gray-800 transition-colors duration-200 hover:text-orange-600">
              {product.name}
            </h3>
          </Link>

          <div className="mb-1 flex items-center gap-2">
            <span className="text-gray-900 text-xs lg:text-sm">${product.price.toFixed(2)}</span>
            {product.compareAtPrice > 0 && (
              <span className="text-xs text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {variant === "horizontal" && (
            <p className="mb-1 text-xs text-gray-500 line-clamp-2">{product.description}</p>
          )}
        </CardContent>

        <CardFooter className="p-2 pt-0 hidden">
          <Button
            onClick={handleAddToCart}
            className="w-full gap-2 bg-orange-600 text-white hover:bg-orange-700 hover:shadow-orange-200 hover:shadow-lg transition-all"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
