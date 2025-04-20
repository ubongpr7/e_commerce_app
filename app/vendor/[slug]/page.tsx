"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/products/product-card"
import { useAppSelector } from "@/redux/hooks"
import { MapPin, Mail, Phone, Globe, Star, Package, Calendar, ChevronRight } from "lucide-react"

export default function VendorPage() {
  const { slug } = useParams()
  const { products } = useAppSelector((state) => state.products)
  const [vendor, setVendor] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch vendor data from an API
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Find the vendor from the first product that matches the slug
      const foundVendor = products.find((p) => p.vendor.slug === slug)?.vendor

      if (foundVendor) {
        setVendor({
          ...foundVendor,
          coverImage: "/placeholder.svg?height=300&width=1200",
          logo: "/placeholder.svg?height=120&width=120",
          description:
            "A trusted vendor providing high-quality products for our customers. We pride ourselves on excellent customer service and fast shipping.",
          address: "123 Market St, San Francisco, CA 94103",
          phone: "+1 (555) 123-4567",
          email: "contact@example.com",
          website: "https://example.com",
          joinedDate: "January 2022",
          rating: 4.7,
          reviewCount: 128,
          productCount: 42,
        })
      }

      setLoading(false)
    }, 1000)
  }, [slug, products])

  if (loading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="flex h-96 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!vendor) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="flex h-96 flex-col items-center justify-center">
            <h1 className="mb-4 text-2xl font-bold">Vendor Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The vendor you are looking for does not exist or has been removed.
            </p>
            <Link href="/vendors">
              <Button>Browse Vendors</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  // Filter products by this vendor
  const vendorProducts = products.filter((product) => product.vendor.id === vendor.id)

  return (
    <MainLayout>
      <div className="container py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <Link href="/vendors" className="hover:text-primary">
            Vendors
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="text-foreground">{vendor.name}</span>
        </div>

        {/* Vendor Header */}
        <div className="relative mb-8">
          <div className="relative h-[200px] w-full overflow-hidden rounded-t-lg md:h-[250px]">
            <Image
              src={vendor.coverImage || "/placeholder.svg"}
              alt={`${vendor.name} cover`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col items-center rounded-b-lg border border-t-0 bg-background p-6 md:flex-row md:items-start md:gap-6">
            <div className="relative -mt-16 h-24 w-24 overflow-hidden rounded-full border-4 border-background md:h-32 md:w-32">
              <Image src={vendor.logo || "/placeholder.svg"} alt={vendor.name} fill className="object-cover" />
            </div>
            <div className="mt-4 flex-1 text-center md:mt-0 md:text-left">
              <h1 className="text-2xl font-bold md:text-3xl">{vendor.name}</h1>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{vendor.rating}</span>
                  <span className="text-muted-foreground">({vendor.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>{vendor.productCount} products</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {vendor.joinedDate}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 md:mt-0">
              <Button variant="outline">Follow</Button>
              <Button>Contact</Button>
            </div>
          </div>
        </div>

        {/* Vendor Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Products</h2>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <select className="rounded-md border px-3 py-2">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {vendorProducts.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">No products found for this vendor.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {vendorProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}

                {/* Add more mock products to fill the grid */}
                {[...Array(Math.max(0, 8 - vendorProducts.length))].map((_, i) => (
                  <ProductCard
                    key={`mock-${i}`}
                    product={{
                      id: `mock-${i}`,
                      name: `Product ${i + 1}`,
                      slug: `product-${i + 1}`,
                      price: 99.99,
                      compareAtPrice: i % 2 === 0 ? 129.99 : 0,
                      description: "This is a sample product description.",
                      images: ["/placeholder.svg?height=400&width=400"],
                      category: "electronics",
                      rating: 4.5,
                      inStock: true,
                      isNew: i % 3 === 0,
                      onSale: i % 2 === 0,
                      vendor: vendor,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="mb-4 text-xl font-semibold">About {vendor.name}</h2>
                  <p className="text-muted-foreground">{vendor.description}</p>
                  <p className="mt-4 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia,
                    nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia,
                    nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Shipping & Returns</h3>
                  <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    <li>Free shipping on orders over $50</li>
                    <li>Standard shipping takes 3-5 business days</li>
                    <li>Express shipping available for an additional fee</li>
                    <li>30-day return policy for most items</li>
                    <li>Contact customer service for return authorization</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{vendor.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{vendor.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{vendor.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 flex-shrink-0 text-primary" />
                      <Link
                        href={vendor.website}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {vendor.website.replace(/^https?:\/\//, "")}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-6">
                  <h3 className="mb-4 text-lg font-semibold">Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Customer Reviews</h2>
              <Button>Write a Review</Button>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="rounded-lg border p-6 text-center">
                  <div className="mb-2 text-5xl font-bold">{vendor.rating}</div>
                  <div className="mb-4 flex justify-center">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(vendor.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                        />
                      ))}
                  </div>
                  <p className="text-muted-foreground">Based on {vendor.reviewCount} reviews</p>

                  <div className="mt-6 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex w-16 justify-end">
                          <span>{rating} stars</span>
                        </div>
                        <div className="h-2 flex-1 rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${0.6 * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                {/* Sample reviews */}
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">John Doe</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array(5)
                                .fill(null)
                                .map((_, j) => (
                                  <Star
                                    key={j}
                                    className={`h-3 w-3 ${j < 5 - (i % 2) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                                  />
                                ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(Date.now() - i * 86400000 * 7).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h5 className="font-medium">Great vendor, highly recommend!</h5>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies
                        lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel
                        ultricies lacinia.
                      </p>
                    </div>
                  ))}

                <div className="flex justify-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
