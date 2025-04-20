import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Package } from "lucide-react"

interface VendorCardProps {
  vendor: {
    id: string
    name: string
    logo: string
    coverImage: string
    description: string
    productCount: number
    rating: number
    slug: string
  }
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-[120px] w-full">
        <Image src={vendor.coverImage || "/placeholder.svg"} alt={vendor.name} fill className="object-cover" />
        <div className="absolute -bottom-12 left-4 rounded-full border-4 border-background">
          <Image
            src={vendor.logo || "/placeholder.svg"}
            width={80}
            height={80}
            alt={vendor.name}
            className="rounded-full bg-background"
          />
        </div>
      </div>
      <CardContent className="pt-16">
        <Link href={`/vendor/${vendor.slug}`}>
          <h3 className="mb-2 text-xl font-semibold hover:text-primary">{vendor.name}</h3>
        </Link>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{vendor.description}</p>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{vendor.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>{vendor.productCount} products</span>
          </div>
        </div>
        <Link href={`/vendor/${vendor.slug}`}>
          <Button variant="outline" className="w-full">
            Visit Store
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
