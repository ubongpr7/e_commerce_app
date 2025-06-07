"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import ServiceCard from "@/components/services/service-card"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchServiceBySlug } from "@/redux/features/service/servicesSlice"
import { addToBookings } from "@/redux/booking/bookingSlice"
import { useToast } from "@/components/ui/use-toast"
import { Heart, Share2, Calendar, Star, Clock, Shield, ChevronRight, ChevronLeft } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import type { Service } from "@/types/service"

export default function ServicePage() {
    const { slug } = useParams()
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const { service, loading, error } = useAppSelector((state) => state.services)
    const [activeImage, setActiveImage] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [liked, setLiked] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    useEffect(() => {
        if (slug) {
            dispatch(fetchServiceBySlug(slug as string))
        }
    }, [dispatch, slug])

    const handleBookService = () => {
        if (service) {
            dispatch(
                addToBookings({
                    service,
                    bookingDate: (selectedDate || new Date()).toISOString(),
                })
            )
            toast({
                title: "Service Booked",
                description: `${service.name} has been added to your bookings`,
            })
        }
    }


    if (loading) {
        return (
            <MainLayout>
                <div className="container py-8">
                    <div className="flex h-96 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-900 border-t-transparent"></div>
                    </div>
                </div>
            </MainLayout>
        )
    }

    if (error || !service) {
        return (
            <MainLayout>
                <div className="py-8 px-3 lg:px-5">
                    <div className="flex h-96 flex-col items-center justify-center">
                        <h1 className="mb-4 text-2xl font-bold">Service Not Found</h1>
                        <p className="mb-6 text-gray-500">
                            The service you are looking for does not exist or has been removed.
                        </p>
                        <Link href="/services">
                            <Button>Browse Services</Button>
                        </Link>
                    </div>
                </div>
            </MainLayout>
        )
    }

    // Mock related services
    const relatedServices = Array(4)
        .fill(null)
        .map((_, i) => ({
            id: `related-${i}`,
            name: `Related Service ${i + 1}`,
            slug: `related-service-${i + 1}`,
            price: 50 + i * 15,
            description: "This is a related service that students also viewed.",
            images: ["/placeholder.svg"],
            school: service.school,
            longDescription: "This is a longer description for the related service that provides more details.",
            category: service.category,
            requirements: ["Requirement 1", "Requirement 2"],
            location: "Online",
            availability: ["Monday", "Wednessday", "Friday"],
            rating: 4.0 + i * 0.2,
            vendor: service.vendor,
            duration: `${i + 1} hour${i > 0 ? 's' : ''}`,
            isNew: i === 0,
            isPopular: i % 2 === 0,
        }))

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })
    }

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })
    }

    return (
        <MainLayout>
            <div className="container py-8 px-3 lg:px-5">
                {/* Breadcrumbs */}
                <div className="-mb-2 flex items-center text-xs lg:text-sm p-3 text-gray-500">
                    <Link href="/" className="hover:text-gray-900">
                        Home
                    </Link>
                    <ChevronRight className="mx-1 h-3 w-3" />
                    <Link href="/services" className="hover:text-gray-900">
                        Services
                    </Link>
                    <ChevronRight className="mx-1 h-3 w-3" />
                    <Link href={`/services?category=${service.category}`} className="capitalize truncate hover:text-gray-900">
                        {service.category}
                    </Link>
                    <ChevronRight className="mx-1 h-3 w-3" />
                    <span className="truncate text-gray-900">{service.name}</span>
                </div>

                <div className="gap-8 md:grid md:grid-cols-2 p-3">
                    {/* Service Image */}
                    <div className="space-y-4">
                        <div className="relative aspect-square lg:h-[510px] w-full overflow-hidden rounded-lg border">
                            <Image
                                src={service.images[activeImage] || "/placeholder.svg"}
                                alt={service.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {service.isNew && (
                                <Badge className="absolute left-2 top-2 bg-green-500 text-white hover:bg-green-600">New</Badge>
                            )}
                            {service.isPopular && (
                                <Badge className="absolute right-2 top-2 bg-blue-500 text-white hover:bg-blue-600">Popular</Badge>
                            )}
                        </div>
                        <div className="flex gap-2 overflow-auto pb-2 scrollbar-hide">
                            {service.images.slice(0, 7).map((image, index) => (
                                <button
                                    key={index}
                                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${activeImage === index ? "ring-2 ring-gray-900" : ""
                                        }`}
                                    onClick={() => setActiveImage(index)}
                                >
                                    <Image
                                        src={image || "/placeholder.svg"}
                                        alt={`${service.name} - Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                            {/* Add placeholder thumbnails if less than 4 images */}
                            {Array(Math.max(0, 7 - service.images.length))
                                .fill(null)
                                .map((_, index) => (
                                    <div
                                        key={`placeholder-${index}`}
                                        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100"
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-6">
                        <div>
                            <Link
                                href={`/vendor/${service.vendor.slug}`}
                                className="text-sm text-gray-500 hover:text-gray-900"
                            >
                                {service.vendor.name}
                            </Link>
                            <h1 className="mt-1 text-3xl font-bold">{service.name}</h1>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="flex items-center">
                                    {Array(5)
                                        .fill(null)
                                        .map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(service.rating) ? "fill-yellow-500 text-yellow-500" : "fill-gray-200 text-gray-200"}`}
                                            />
                                        ))}
                                </div>
                                <span className="text-sm font-medium">{service.rating}</span>
                                <span className="text-sm text-gray-500">(42 reviews)</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(service.price)}
                                </span>
                                {service.duration && (
                                    <Badge variant="outline" className="text-gray-700">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {service.duration}
                                    </Badge>
                                )}
                            </div>
                            {service.location && (
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium">Location:</span> {service.location}
                                </p>
                            )}
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 font-medium">Description</h3>
                                <p className="text-gray-500">{service.description}</p>
                            </div>

                            {service.longDescription && (
                                <div>
                                    <h3 className="mb-2 font-medium">Details</h3>
                                    <p className="text-gray-500">{service.longDescription}</p>
                                </div>
                            )}

                            {service.requirements && service.requirements.length > 0 && (
                                <div>
                                    <h3 className="mb-2 font-medium">Requirements</h3>
                                    <ul className="list-disc pl-5 text-gray-500">
                                        {service.requirements.map((req, i) => (
                                            <li key={i}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div>
                                <h3 className="mb-2 font-medium">Booking Date</h3>
                                <input
                                    type="date"
                                    className="border p-2 rounded w-full"
                                    onChange={(e) => setSelectedDate(e.target.valueAsDate)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="hidden flex-wrap gap-2 lg:flex bottom-0 bg-gray-50 p-4">
                                <Button className="flex-1 gap-2" size="lg" onClick={handleBookService}>
                                    <Calendar className="h-5 w-5" />
                                    Book Service
                                </Button>
                                <Button variant="outline" size="icon" className="h-11 w-11" onClick={() => setLiked(!liked)}>
                                    <Heart className={cn(
                                        "h-5 w-5 transition-colors",
                                        liked ? "fill-red-500 text-red-500" : "text-gray-700 group-hover:text-red-500"
                                    )} />
                                </Button>
                                <Button variant="outline" size="icon" className="h-11 w-11">
                                    <Share2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-gray-500" />
                                <span>Verified {service.vendor.name} provider</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span>Flexible scheduling available</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Tabs */}
                <div className="mt-5">
                    <Tabs defaultValue="details">
                        <TabsList className="w-full justify-start">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            <TabsTrigger value="provider">About Provider</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="mt-6 px-3 lg:px-5">
                            <Card className="p-4">
                                <h3 className="mb-2 font-semibold">Service Details</h3>
                                <div className="prose max-w-none text-gray-500">
                                    {service.longDescription || service.description}
                                    {service.requirements && (
                                        <>
                                            <h4 className="font-medium mt-4">Requirements:</h4>
                                            <ul className="list-disc pl-5">
                                                {service.requirements.map((req, i) => (
                                                    <li key={i}>{req}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </Card>
                        </TabsContent>
                        <TabsContent value="reviews" className="mt-6 px-3">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">Student Reviews</h3>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {Array(5)
                                                    .fill(null)
                                                    .map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < Math.floor(service.rating) ? "fill-yellow-500 text-yellow-500" : "fill-gray-200 text-gray-200"}`}
                                                        />
                                                    ))}
                                            </div>
                                            <span className="text-sm">Based on 42 reviews</span>
                                        </div>
                                    </div>
                                    <Button>Write a Review</Button>
                                </div>
                                {/* Sample reviews would go here */}
                            </div>
                        </TabsContent>
                        <TabsContent value="provider" className="mt-6 px-3 lg:px-5">
                            <Card className="p-4">
                                <h3 className="mb-2 font-semibold">About {service.vendor.name}</h3>
                                <div className="prose max-w-none text-gray-500">
                                    <p>This provider has been verified by our platform and has a rating of {service.rating} stars.</p>
                                    <p>Contact them directly for any questions about this service.</p>
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Mobile Booking Button */}
                <div className="flex flex-wrap gap-2 sticky lg:hidden bottom-0 bg-gray-50 p-4">
                    <Button className="flex-1 gap-2" size="lg" onClick={handleBookService}>
                        <Calendar className="h-5 w-5" />
                        Book Service
                    </Button>
                    <Button variant="outline" size="icon" className="h-11 w-11" onClick={() => setLiked(!liked)}>
                        <Heart className={cn(
                            "h-5 w-5 transition-colors",
                            liked ? "fill-red-500 text-red-500" : "text-gray-700 group-hover:text-red-500"
                        )} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-11 w-11">
                        <Share2 className="h-5 w-5" />
                    </Button>
                </div>

                {/* Related Services */}
                <div className="mt-16 px-3 lg:px-5 relative w-full group">
                    <h2 className="-mb-14 lg:mb-2 text-lg lg:text-2xl font-bold">Related Services</h2>
                    <>
                        <div
                            ref={scrollRef}
                            className="overflow-x-auto max-w-full mt-0 snap-x snap-mandatory flex gap-4 py-2 scrollbar-hide"
                        >
                            {relatedServices.slice(0, 20).map((service) => (
                                <div key={service.id} className="flex-shrink-0 snap-start lg:mt-0 mt-16">
                                    <ServiceCard key={service.id} service={service} />
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
                    </>
                </div>
            </div>
        </MainLayout>
    )
}