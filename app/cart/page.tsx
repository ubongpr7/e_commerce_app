"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { updateQuantity, removeFromCart, clearCart } from "@/lib/features/cart/cartSlice"
import { useToast } from "@/components/ui/use-toast"
import { Trash, ShoppingCart, CreditCard } from "lucide-react"

export default function CartPage() {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const { items, subtotal, shipping, tax, total } = useAppSelector((state) => state.cart)
  const [promoCode, setPromoCode] = useState("")

  const handleQuantityChange = (itemId: string, quantity: number) => {
    dispatch(updateQuantity({ itemId, quantity }))
  }

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  const handleApplyPromoCode = () => {
    if (promoCode.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a promo code",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would call an API to validate the promo code
    toast({
      title: "Invalid promo code",
      description: "The promo code you entered is invalid or has expired",
      variant: "destructive",
    })
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
            <ShoppingCart className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
            <p className="mb-6 text-center text-muted-foreground">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-lg border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                <Separator />

                {items.map((item) => (
                  <div key={item.id}>
                    <div className="grid grid-cols-12 gap-4 p-4">
                      <div className="col-span-6 flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            <Link href={`/product/${item.productId}`} className="hover:text-primary">
                              {item.name}
                            </Link>
                          </h3>
                          {item.variantName && (
                            <p className="text-sm text-muted-foreground">Variant: {item.variantName}</p>
                          )}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                          >
                            <Trash className="h-3 w-3" />
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-center">${item.price.toFixed(2)}</div>
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="flex w-24 items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </Button>
                          <div className="flex h-8 w-8 items-center justify-center border-y">{item.quantity}</div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-end font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}

                <div className="flex justify-between p-4">
                  <Button variant="outline" size="sm" onClick={handleClearCart}>
                    Clear Cart
                  </Button>
                  <Link href="/products">
                    <Button variant="outline" size="sm">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <Button variant="outline" onClick={handleApplyPromoCode}>
                      Apply
                    </Button>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full gap-2">
                      <CreditCard className="h-4 w-4" />
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
