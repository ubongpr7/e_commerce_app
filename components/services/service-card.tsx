// components/cards/ServiceCard.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency, cn } from "@/lib/utils"
import type { Service } from "@/types/service"

interface ServiceCardProps {
    service: Service;
    variant?: "default" | "horizontal";
    page?: "explore" | "default";
}

export default function ServiceCard({ service, variant = "default", page = "default" }: ServiceCardProps) {
    const [liked, setLiked] = useState(false)

    const imageUrl =
        service.image && service.image.startsWith("http") && service.image.length > 10
            ? service.image
            : "/placeholder-service.jpg"

    return (
        <Card
            className={cn(
                "group relative overflow-hidden bg-white transition-all duration-300 ease-in-out shadow-sm hover:scale-[1.015] hover:shadow-lg",
                variant === "horizontal" && "flex flex-row",
                page !== "explore" && "hover:scale-[1.015] hover:shadow-lg",
                "w-full",
                page === "explore" ? "w-full lg:max-w-[280px]" : "lg:max-w-[180px] max-w-[130px]"
            )}
        >
            {/* Image */}
            <div className="relative overflow-hidden aspect-square">
                <Link href={`/services/${service.slug}`}>
                    <div className="relative h-full w-full">
                        <Image
                            src={imageUrl}
                            alt={service.name}
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
                        onClick={() => setLiked(!liked)}
                    >
                        <Heart
                            className={cn(
                                "h-5 w-5 transition-colors",
                                liked ? "fill-red-500 stroke-red-500" : "text-gray-700 group-hover:text-orange-600"
                            )}
                        />
                    </Button>
                </div>

                {/* Optional Badges (example: New, Popular) */}
                {service.isNew && (
                    <div className="absolute left-2 top-2 z-10">
                        <Badge className="bg-green-500 text-white hover:bg-green-600 shadow-sm">New</Badge>
                    </div>
                )}
            </div>

            {/* Content */}
            <div>
                <CardContent className="p-2">
                    <div className="mb-1 flex items-center justify-between text-xs">
                        <Link
                            href={`/vendor/${service.vendor.slug}`}
                            className="text-gray-500 hover:text-orange-600 transition-colors text-xs lg:text-xs line-clamp-1"
                        >
                            {service.vendor.name}
                        </Link>
                        {service.rating && (
                            <div className="flex items-center text-yellow-500">
                                <Star className="mr-1 h-3 w-3 fill-current" />
                                <span className="font-medium text-gray-700">{service.rating}</span>
                            </div>
                        )}
                    </div>

                    <Link href={`/services/${service.slug}`}>
                        <h3 className="mb-1 line-clamp-1 leading-tight lg:text-sm text-xs text-gray-800 transition-colors duration-200 hover:text-orange-600">
                            {service.name}
                        </h3>

                        <p className="text-gray-500 text-xs lg:text-xs line-clamp-2">
                            {service.description}
                        </p>
                    </Link>

                    <div className="mb-1 text-gray-900 text-xs lg:text-sm font-medium hidden">
                        {formatCurrency(service.price)}
                    </div>
                </CardContent>

                {/* Footer with Book Now button */}
                <CardFooter
                    className={cn(
                        "p-2 pt-0 transition-all duration-300",
                        page === "explore" ? "block" : "hidden"
                    )}
                >
                    <Button
                        className="w-full gap-2 bg-orange-600 text-white hover:bg-orange-700 hover:shadow-orange-200 hover:shadow-lg transition-all"
                    >
                        Learn More
                    </Button>
                </CardFooter>
            </div>
        </Card>
    )
}
