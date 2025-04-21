import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, BarChart, Package } from "lucide-react";

export function CallToAction() {
  return (
    <section className="container py-12 md:py-16">
      <div className="rounded-xl bg-blue-700  p-8 md:p-12 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Become a Vendor Today</h2>
          <p className="mb-8 text-lg text-gray-100 ">
            Join our multivendor marketplace and start selling your products to thousands of customers. Manage your
            inventory, track sales, and grow your business with our comprehensive tools.
          </p>
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-blue-600/20 p-4 backdrop-blur ">
              <ShoppingBag className="mx-auto mb-2 h-10 w-10 text-white" />
              <h3 className="mb-1 font-semibold">Easy Selling</h3>
              <p className="text-sm text-gray-100/90 ">
                List your products quickly and start selling right away
              </p>
            </div>
            <div className="rounded-lg bg-blue-600/20 p-4 backdrop-blur ">
              <Package className="mx-auto mb-2 h-10 w-10 text-white" />
              <h3 className="mb-1 font-semibold">Inventory Management</h3>
              <p className="text-sm text-gray-100/90 ">
                Manage your stock effortlessly with our tools
              </p>
            </div>
            <div className="rounded-lg bg-blue-600/20 p-4 backdrop-blur ">
              <BarChart className="mx-auto mb-2 h-10 w-10 text-white" />
              <h3 className="mb-1 font-semibold">Sales Analytics</h3>
              <p className="text-sm text-gray-100/90 ">
                Get insights into your sales and customer behavior
              </p>
            </div>
          </div>
          <Link href="/vendor/register/start">
            <Button size="lg" variant="secondary" className="text-gray-900 ">
              Register as a Vendor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
