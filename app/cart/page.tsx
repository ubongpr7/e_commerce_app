"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MainLayout } from "@/components/layouts/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { updateQuantity, removeFromCart, clearCart } from "@/redux/cart/cartSlice"
import { useToast } from "@/components/ui/use-toast"
import { Trash, ShoppingCart, CreditCard } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils";

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

    toast({
      title: "Invalid promo code",
      description: "The promo code you entered is invalid or has expired",
      variant: "destructive",
    })
  }

  return (
    <MainLayout>
      <div className="container max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-gray-900">
        <div className="text-gray-900 text-xs p-4 font-medium">YOUR CART</div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed px-3 lg:px-5 py-16 bg-white border-gray-200">
            <ShoppingCart className="mb-4 h-16 w-16 text-gray-500" />
            <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
            <p className="mb-6 text-center text-gray-500">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="rounded-lg border bg-white border-gray-200">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-500">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                <Separator className="bg-gray-200" />

                {items.map((item) => (
                  <div key={item.id}>
                    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 p-4">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            <Link href={`/product/${item.productId}`} className="hover:text-orange-600">
                              {item.name}
                            </Link>
                          </h3>
                          {item.variantName && (
                            <p className="text-sm text-gray-500">Variant: {item.variantName}</p>
                          )}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="mt-1 flex items-center gap-1 text-xs md:text-gray-500 text-red-500 hover:text-red-500"
                          >
                            <Trash className="h-3 w-3" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 flex justify-between md:justify-center text-gray-900">
                        <span className="md:hidden text-xs font-medium text-gray-900">Price:</span>
                        {formatCurrency(item.price)}
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-between md:justify-center">
                        <span className="md:hidden font-medium text-gray-900 text-xs">Quantity:</span>
                        <div className="flex w-24 items-center rounded-md ml-auto md:ml-0">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none text-gray-900 hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </Button>
                          <div className="flex h-8 w-8 items-center justify-center text-gray-900">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none text-gray-900 hover:bg-gray-100"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 flex justify-between md:justify-end font-medium text-gray-900">
                        <span className="md:hidden font-medium text-gray-900 text-xs">Total:</span>
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                    <Separator className="bg-gray-200" />
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row justify-between gap-4 p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearCart}
                    className="bg-transparent hover:bg-gray-100 text-gray-900 border-gray-200"
                  >
                    Clear Cart
                  </Button>
                  <Link href="/products">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent hover:bg-gray-100 text-gray-900 border-gray-200"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="rounded-lg border p-6 bg-white border-gray-200">
                <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-gray-900">{formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span className="text-gray-900">{formatCurrency(tax)}</span>
                  </div>
                  <Separator className="my-2 bg-gray-200" />
                  <div className="flex justify-between font-medium text-gray-900">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex gap-2 mb-2 flex-col sm:flex-row">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-gray-100 text-gray-900 border-gray-200"
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyPromoCode}
                      className="bg-transparent hover:bg-gray-100 text-gray-900 border-gray-200"
                    >
                      Apply
                    </Button>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full gap-2 bg-orange-600 hover:bg-orange-700 text-white">
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
