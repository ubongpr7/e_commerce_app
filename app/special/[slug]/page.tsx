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
import { getSpecialBySlug } from "@/redux/features/special/specialSlice"
import { useToast } from "@/components/ui/use-toast"
import { ChevronRight, Star } from "lucide-react"

export default function SpecialPage() {
    const { slug } = useParams()
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const { special, loading, error } = useAppSelector((state) => state.specials)

    useEffect(() => {
        if (slug) {
            dispatch(getSpecialBySlug(slug as string))
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

    if (error || !special) {
        return (
            <MainLayout>
                <div className="container py-8">
                    <div className="flex h-96 flex-col items-center justify-center">
                        <h1 className="mb-4 text-2xl font-bold">Special Not Found</h1>
                        <p className="mb-6 text-gray-500">The special you're looking for does not exist or has been removed.</p>
                        <Link href="/specials">
                            <Button>Browse Specials</Button>
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
                    <Link href="/specials" className="hover:text-gray-900">Specials</Link>
                    <ChevronRight className="mx-1 h-4 w-4" />
                    <Link href={`/specials?category=${special.category}`} className="capitalize hover:text-gray-900">
                        {special.category}
                    </Link>
                    <ChevronRight className="mx-1 h-4 w-4" />
                    <span className="truncate text-gray-900">{special.name}</span>
                </div>

                {/* Special Details */}
                <div className="gap-8 md:grid md:grid-cols-2 p-3">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden rounded-lg border">
                        <Image
                            src={special.image || "/placeholder.svg"}
                            alt={special.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Info */}
                    <div className="space-y-6">
                        <div>
                            <Link
                                href={`/vendor/${special.vendor.slug}`}
                                className="text-sm text-gray-500 hover:text-gray-900"
                            >
                                {special.vendor.name}
                            </Link>
                            <h1 className="mt-1 text-3xl font-bold">{special.name}</h1>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="flex items-center">
                                    {Array(5).fill(null).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.floor(special.rating) ? "fill-gray-900 text-gray-900" : "fill-gray-200 text-gray-200"}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-medium">{special.rating}</span>
                                <span className="text-sm text-gray-500">(50+ reviews)</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-2xl font-bold text-gray-900">${special.price.toFixed(2)}</p>
                            {special.duration && <p className="text-sm text-gray-500">{special.duration}</p>}
                            {special.location && <p className="text-sm text-gray-500">{special.location}</p>}
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 font-medium">Description</h3>
                                <p className="text-gray-500">{special.description}</p>
                            </div>

                            <div>
                                <Button className="w-full">Book Special</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-12">
                    <Tabs defaultValue="details">
                        <TabsList className="w-full justify-start lg:px-5">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="amenities">Amenities</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details" className="mt-6 px-3 lg:px-5">
                            <p className="text-gray-700 leading-relaxed">{special.longDescription || "Full special details go here."}</p>
                        </TabsContent>
                        <TabsContent value="amenities" className="mt-6 px-3 lg:px-5">
                            {special.amenities && special.amenities.length > 0 ? (
                                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                                    {special.amenities.map((amenity, idx) => (
                                        <li key={idx}>{amenity}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No special amenities listed.</p>
                            )}
                        </TabsContent>
                        <TabsContent value="reviews" className="mt-6 px-3 lg:px-5">
                            {/* You can integrate special reviews here later */}
                            <p className="text-gray-500">User reviews will appear here.</p>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </MainLayout>
    )
}
