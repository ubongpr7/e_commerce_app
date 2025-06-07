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
import ProductCard from "@/components/products/product-card"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchProductBySlug } from "@/redux/features/product/productsSlice"
import { addToCart } from "@/redux/cart/cartSlice"
import { useToast } from "@/components/ui/use-toast"
import { Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils";

export default function ProductPage() {
  const { slug } = useParams()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const { product, loading, error } = useAppSelector((state) => state.products)
  const [selectedVariant, setSelectedVariant] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug as string))
    }
  }, [dispatch, slug])

  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0].id)
    }
  }, [product])

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          product,
          quantity,
          variantId: selectedVariant || undefined,
        }),
      )
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
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

  if (error || !product) {
    return (
      <MainLayout>
        <div className="py-8 px-3 lg:px-5">
          <div className="flex h-96 flex-col items-center justify-center">
            <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
            <p className="mb-6 text-gray-500">
              The product you are looking for does not exist or has been removed.
            </p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  const selectedVariantData = product.variants?.find((v) => v.id === selectedVariant)
  const currentPrice = selectedVariantData ? selectedVariantData.price : product.price
  const isOnSale = product.compareAtPrice > 0 && product.compareAtPrice > currentPrice
  const discountPercentage = isOnSale
    ? Math.round(((product.compareAtPrice - currentPrice) / product.compareAtPrice) * 100)
    : 0

  // Mock related products
  const relatedProducts = Array(8)
    .fill(null)
    .map((_, i) => ({
      id: `related-${i}`,
      name: `Related Product ${i + 1}`,
      slug: `related-product-${i + 1}`,
      price: 79.99 + i * 10,
      compareAtPrice: i % 2 === 0 ? 99.99 + i * 10 : 0,
      description: "This is a related product that customers also viewed.",
      images: ["/placeholder.svg?height=400&width=400"],
      category: product.category,
      rating: 4.0 + i * 0.2,
      inStock: true,
      isNew: i === 0,
      onSale: i % 2 === 0,
      vendor: product.vendor,
      school: product.school,
    }))

  return (
    <MainLayout>

      {/* Desktop Breadcrumbs */}
      <div className="hidden lg:flex items-center text-xs lg:mx-16 lg:pl-4 p-3 text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <ChevronRight className="mx-1 h-3 w-3" />
        <Link href="/products" className="hover:text-gray-900">
          Products
        </Link>
        <ChevronRight className="mx-1 h-3 w-3" />
        <Link href={`/products?category=${product.category}`} className="capitalize truncate hover:text-gray-900">
          {product.category}
        </Link>
        <ChevronRight className="mx-1 h-3 w-3" />
        <span className="truncate text-gray-900">{product.name}</span>
      </div>

      <div className="py-0 mx-0 lg:py-3 lg:px-3 lg:mx-20 lg:shadow-xl lg:rounded-lg lg:bg-white">

        {/* Mobile Breadcrumbs */}
        <div className="-mb-2 flex items-center text-xs lg:hidden p-3 text-gray-500">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <ChevronRight className="mx-1 h-3 w-3" />
          <Link href="/products" className="hover:text-gray-900">
            Products
          </Link>
          <ChevronRight className="mx-1 h-3 w-3" />
          <Link href={`/products?category=${product.category}`} className="capitalize truncate hover:text-gray-900">
            {product.category}
          </Link>
          <ChevronRight className="mx-1 h-3 w-3" />
          <span className="truncate text-gray-900">{product.name}</span>
        </div>

        <div className="gap-8 md:grid md:grid-cols-2 p-3">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square lg:h-[300px] lg:w-[300px] w-full overflow-hidden rounded-lg border">
              <Image
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isNew && (
                <Badge className="absolute left-2 top-2 bg-green-500 text-white hover:bg-green-600">New</Badge>
              )}
              {isOnSale && (
                <Badge className="absolute left-2 top-2 bg-red-500 text-white hover:bg-red-600">
                  {discountPercentage}% Off
                </Badge>
              )}
            </div>
            <div className="flex gap-2 overflow-auto pb-2 scrollbar-hide">
              {product.images.slice(0, 7).map((image, index) => (
                <button
                  key={index}
                  className={`relative lg:h-10 lg:w-10 h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${activeImage === index ? "ring-2 ring-gray-900" : ""
                    }`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
              {/* Add placeholder thumbnails if less than 4 images */}
              {Array(Math.max(0, 7 - product.images.length))
                .fill(null)
                .map((_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100"
                  />
                ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Link
                href={`/vendor/${product.vendor.slug}`}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                {product.vendor.name}
              </Link>
              <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-gray-500">(124 reviews)</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex lg:flex-row flex-col items-start lg:items-center gap-2">
                {isOnSale && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                )}
                <div className="flex flex-row justify-between">
                  <span className="text-2xl font-bold text-gray-900 mr-2">{formatCurrency(currentPrice)}</span>
                  {isOnSale && (
                    <Badge variant="outline" className="text-red-500 border-red-200">
                      Save {formatCurrency(product.compareAtPrice - currentPrice)}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500">{product.inStock ? "In Stock" : "Out of Stock"}</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium -mt-10">Description</h3>
                <p className="text-gray-500">{product.description}</p>
              </div>

              {product.variants && product.variants.length > 0 && (
                <div>
                  <h3 className="mb-2 font-medium">Variants</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <Button
                        key={variant.id}
                        variant={selectedVariant === variant.id ? "default" : "outline"}
                        className="h-9"
                        disabled={!variant.inStock}
                        onClick={() => setSelectedVariant(variant.id)}
                      >
                        {variant.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="mb-2 font-medium">Quantity</h3>
                <div className="flex w-32 items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-r-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <div className="flex h-9 w-10 items-center justify-center border-y">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-l-none"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="hidden flex-wrap gap-2 lg:flex bottom-0 bg-white p-4">
                <Button className="flex-1 gap-2" size="lg" onClick={handleAddToCart} disabled={!product.inStock}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11" onClick={() => setLiked(!liked)}>
                  <Heart className={cn(
                    "h-5 w-5 transition-colors",
                    liked ? "fill-orange-600 stroke-orange-600" : "text-gray-700 group-hover:text-orange-600"
                  )} />
                  <span className="sr-only">Add to Wishlist</span>
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share Product</span>
                </Button>
              </div>
            </div>

            <div className="grid gap-2 text-sm -mt-10">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-gray-500" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-500" />
                <span>2 year warranty on all products</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-gray-500" />
                <span>30 day money back guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-5">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6 px-3 lg:px-5">
              <Card className="p-4">
                <h3 className="mb-2 font-semibold">Product Details</h3>
                <div className="prose max-w-none text-gray-500 text-sm lg:text-base leading-normal">
                  <p>{product.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
                    nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
                    nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                  </p>
                  <ul>
                    <li>High-quality materials for durability</li>
                    <li>Designed for comfort and ease of use</li>
                    <li>Versatile functionality for various needs</li>
                    <li>Modern aesthetic that complements any setting</li>
                  </ul>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6 px-3 lg:px-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="p-4">
                  <h3 className="mb-2 font-semibold">Dimensions</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Height</span>
                      <span>10 inches</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Width</span>
                      <span>6 inches</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Depth</span>
                      <span>4 inches</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Weight</span>
                      <span>2 lbs</span>
                    </li>
                  </ul>
                </Card>
                <Card className="p-4">
                  <h3 className="mb-2 font-semibold">Materials</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Main Body</span>
                      <span>Aluminum</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Finish</span>
                      <span>Matte Black</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Interior</span>
                      <span>Polyester</span>
                    </li>
                  </ul>
                </Card>
                <Card className="p-4">
                  <h3 className="mb-2 font-semibold">Technical Specifications</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Battery Life</span>
                      <span>10 hours</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Connectivity</span>
                      <span>Bluetooth 5.0</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Water Resistance</span>
                      <span>IPX4</span>
                    </li>
                  </ul>
                </Card>
                <Card className="p-4">
                  <h3 className="mb-2 font-semibold">Package Contents</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Main Product</span>
                      <span>1x</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">User Manual</span>
                      <span>1x</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Charging Cable</span>
                      <span>1x</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Warranty Card</span>
                      <span>1x</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 px-3">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "fill-gray-200 text-gray-200"}`}
                            />
                          ))}
                      </div>
                      <span className="text-sm">Based on 124 reviews</span>
                    </div>
                  </div>
                  <Button>Write a Review</Button>
                </div>

                <div className="space-y-4">
                  {/* Sample reviews */}
                  {Array(3)
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
                                      className={`h-3 w-3 ${j < 5 - i ? "fill-yellow-500 text-yellow-500" : "fill-gray-200 text-gray-200"}`}
                                    />
                                  ))}
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Badge variant="outline">Verified Purchase</Badge>
                        </div>
                        <h5 className="font-medium">Great product, highly recommend!</h5>
                        <p className="mt-1 text-sm text-gray-500">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies
                          lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel
                          ultricies lacinia.
                        </p>
                      </div>
                    ))}
                </div>

                <div className="flex justify-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-wrap gap-2 sticky lg:hidden bg-gray-50 bottom-0 p-4">
          <Button className="flex-1 gap-2" size="lg" onClick={handleAddToCart} disabled={!product.inStock}>
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
          <Button variant="outline" size="icon" className="h-11 w-11" onClick={() => setLiked(!liked)}>
            <Heart className={cn(
              "h-5 w-5 transition-colors",
              liked ? "fill-orange-600 stroke-orange-600" : "text-gray-700 group-hover:text-orange-600"
            )} />
            <span className="sr-only">Add to Wishlist</span>
          </Button>
          <Button variant="outline" size="icon" className="h-11 w-11">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share Product</span>
          </Button>
        </div>

        {/* Related Products */}
        <div className="mt-16 px-3 lg:px-5 relative w-full group">
          <h2 className="-mb-14 lg:mb-2 text-lg lg:text-2xl font-bold">You May Also Like</h2>
          <>
            <div
              ref={scrollRef}
              className="overflow-x-auto max-w-full mt-0 snap-x snap-mandatory flex gap-4 py-2 scrollbar-hide"
            >
              {relatedProducts.slice(0, 20).map((product) => (
                <div key={product.id} className="flex-shrink-0 snap-start lg:mt-0 mt-16">
                  <ProductCard key={product.id} product={product} />
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