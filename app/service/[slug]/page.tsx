"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getServiceBySlug } from "@/redux/features/service/servicesSlice"
import { useToast } from "@/components/ui/use-toast"
import { ChevronRight, Star } from "lucide-react"

export default function ServicePage() {
    const { slug } = useParams()
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const { service, loading, error } = useAppSelector((state) => state.services)

    useEffect(() => {
        if (slug) {
            dispatch(getServiceBySlug(slug as string))
        }
    }, [dispatch, slug])

    if (loading) {
        return (
            <MainLayout>
                <div className="container py-8">
                    <div className="flex h-96 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-900 border-t-transparent" />
                    </div>
                </div>
            </MainLayout>
        )
    }

    if (error || !service) {
        return (
            <MainLayout>
                <div className="container py-8">
                    <div className="flex h-96 flex-col items-center justify-center">
                        <h1 className="mb-4 text-2xl font-bold">Service Not Found</h1>
                        <p className="mb-6 text-gray-500">The service you're looking for does not exist or has been removed.</p>
                        <Link href="/services">
                            <Button>Browse Services</Button>
                        </Link>
                    </div>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className="container py-8">
                {/* Breadcrumbs */}
                <div className="mb-6 flex items-center text-sm p-3 text-gray-500">
                    <Link href="/" className="hover:text-gray-900">Home</Link>
                    <ChevronRight className="mx-1 h-4 w-4" />
                    <Link href="/services" className="hover:text-gray-900">Services</Link>
                    <ChevronRight className="mx-1 h-4 w-4" />
                    <Link href={`/services?category=${service.category}`} className="capitalize hover:text-gray-900">
                        {service.category}
                    </Link>
                    <ChevronRight className="mx-1 h-4 w-4" />
                    <span className="truncate text-gray-900">{service.name}</span>
                </div>

                {/* Service Details */}
                <div className="gap-8 md:grid md:grid-cols-2 p-3">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden rounded-lg border">
                        <Image
                            src={service.image || "/placeholder.svg"}
                            alt={service.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Info */}
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
                                    {Array(5).fill(null).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.floor(service.rating) ? "fill-gray-900 text-gray-900" : "fill-gray-200 text-gray-200"}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-medium">{service.rating}</span>
                                <span className="text-sm text-gray-500">(50+ reviews)</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-2xl font-bold text-gray-900">${service.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">{service.duration} mins</p>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 font-medium">Description</h3>
                                <p className="text-gray-500">{service.description}</p>
                            </div>

                            <div>
                                <Button className="w-full">Book Service</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-12">
                    <Tabs defaultValue="details">
                        <TabsList className="w-full justify-start lg:px-5">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="requirements">Requirements</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="mt-6 px-3 lg:px-5">
                            <p className="text-gray-700 leading-relaxed">{service.longDescription || "Full service details go here."}</p>
                        </TabsContent>
                        <TabsContent value="requirements" className="mt-6 px-3 lg:px-5">
                            <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                {service.requirements?.map((req: string, idx: number) => (
                                    <li key={idx}>{req}</li>
                                )) || <li>No special requirements.</li>}
                            </ul>
                        </TabsContent>
                        <TabsContent value="reviews" className="mt-6 px-3 lg:px-5">
                            {/* You can integrate service reviews here later */}
                            <p className="text-gray-500">User reviews will appear here.</p>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </MainLayout>
    )
}
