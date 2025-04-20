import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, BarChart, Package } from "lucide-react"

export function CallToAction() {
  return (
    <section className="container py-12 md:py-16">
      <div className="rounded-xl bg-gradient-to-r from-primary/90 to-primary/70 p-8 md:p-12">
        <div className="mx-auto max-w-3xl text-center text-white">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Become a Vendor Today</h2>
          <p className="mb-8 text-lg">
            Join our multivendor marketplace and start selling your products to thousands of customers. Manage your
            inventory, track sales, and grow your business with our comprehensive tools.
          </p>
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
              <ShoppingBag className="mx-auto mb-2 h-10 w-10" />
              <h3 className="mb-1 font-semibold">Easy Selling</h3>
              <p className="text-sm text-white/80">List your products quickly and start selling right away</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
              <Package className="mx-auto mb-2 h-10 w-10" />
              <h3 className="mb-1 font-semibold">Inventory Management</h3>
              <p className="text-sm text-white/80">Manage your stock effortlessly with our tools</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
              <BarChart className="mx-auto mb-2 h-10 w-10" />
              <h3 className="mb-1 font-semibold">Sales Analytics</h3>
              <p className="text-sm text-white/80">Get insights into your sales and customer behavior</p>
            </div>
          </div>
          <Link href="/vendor/register/start">
            <Button size="lg" variant="secondary">
              Register as a Vendor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
