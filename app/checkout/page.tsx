"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppSelector } from "@/redux/hooks"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Truck, ArrowLeft, ShieldCheck } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const { toast } = useToast()
  const { items, subtotal, shipping, tax, total } = useAppSelector((state) => state.cart)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitOrder = () => {
    setIsSubmitting(true)

    // In a real app, this would call an API to process the order
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Order placed successfully",
        description: "Your order has been placed and will be processed shortly.",
      })
      // Redirect to order confirmation page
      // router.push("/checkout/confirmation")
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
            <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
            <p className="mb-6 text-center text-muted-foreground">
              You need to add items to your cart before proceeding to checkout.
            </p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-gray-900 text-xs p-4 font-medium">Checkout</h1>
          <Link href="/cart">
            <Button variant="ghost" className="gap-2 text-gray-900 text-xs p-4 font-medium">
              <ArrowLeft className="h-1 w-1" />
              Back to Cart
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-lg font-semibold">Shipping Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" className="mt-1" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" className="mt-1" />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-lg font-semibold">Shipping Method</h2>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="font-medium">
                        Standard Shipping
                      </Label>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₦5.00</div>
                      <div className="text-sm text-muted-foreground">5-7 business days</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="font-medium">
                        Express Shipping
                      </Label>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₦15.00</div>
                      <div className="text-sm text-muted-foreground">2-3 business days</div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-lg font-semibold">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="font-medium">
                      Credit Card
                    </Label>
                  </div>
                  <div className="mt-2 flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="font-medium">
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit-card" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" className="mt-1" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="sm:col-span-2">
                        <Label htmlFor="expiration">Expiration Date</Label>
                        <Input id="expiration" placeholder="MM / YY" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="name-on-card">Name on Card</Label>
                      <Input id="name-on-card" className="mt-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-lg font-semibold">Additional Information</h2>
                <div>
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Special instructions for delivery or order"
                    className="mt-1 outline-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-20 rounded-lg border p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

              <div className="max-h-64 space-y-4 overflow-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      {item.variantName && <p className="text-sm text-muted-foreground">Variant: {item.variantName}</p>}
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>

                <Button className="w-full gap-2" onClick={handleSubmitOrder} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Place Order
                    </>
                  )}
                </Button>

                <div className="flex flex-col gap-2 rounded-lg bg-muted p-4 text-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Free shipping on orders over ₦50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
