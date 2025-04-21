"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { DialogFooter } from "@/components/ui/dialog"
import { Upload } from "lucide-react"
import type { Product } from "@/types/product"
import Image from "next/image"

const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  compareAtPrice: z.coerce.number().min(0, "Compare at price must be at least 0"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean().default(true),
  isNew: z.boolean().default(false),
  onSale: z.boolean().default(false),
})

interface EditProductFormProps {
  product: Product
  onSuccess: () => void
}

export function EditProductForm({ product, onSuccess }: EditProductFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      sku: product.variants?.[0]?.sku || "",
      category: product.category,
      inStock: product.inStock,
      isNew: product.isNew,
      onSale: product.onSale,
    },
  })

  function onSubmit(values: z.infer<typeof productFormSchema>) {
    setIsSubmitting(true)

    // In a real app, this would call an API to update the product
    console.log(values)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Product updated",
        description: `${values.name} has been updated successfully.`,
      })
      onSuccess()
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="general" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100  rounded-md p-1">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 ">Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} className="bg-white  text-gray-900  border-gray-200 " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 ">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter product description" rows={5} {...field} className="bg-white  text-gray-900  border-gray-200 " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 ">Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white  text-gray-900  border-gray-200 ">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white  text-gray-900  border-gray-200 ">
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="home">Home & Kitchen</SelectItem>
                      <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="my-4">
              <h3 className="mb-2 text-sm font-medium text-gray-900 ">Product Images</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="relative h-32 w-full overflow-hidden rounded-md border border-gray-200  bg-gray-100 ">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <Button variant="destructive" size="icon" className="absolute right-1 top-1 h-6 w-6">
                    <span className="sr-only">Remove image</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </Button>
                </div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex h-32 flex-col items-center justify-center rounded-md border border-dashed border-gray-500  p-4 text-center hover:bg-gray-100 "
                  >
                    <Upload className="mb-2 h-8 w-8 text-gray-400 0" />
                    <p className="text-xs text-gray-400 0">Upload image</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 ">Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 ">$</span>
                        <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} className="pl-7 bg-white  text-gray-900  border-gray-200 " />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compareAtPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 ">Compare at Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 ">$</span>
                        <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} className="pl-7 bg-white  text-gray-900  border-gray-200 " />
                      </div>
                    </FormControl>
                    <FormDescription className="text-gray-500 ">Original price for showing discounts</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="onSale"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-gray-200  bg-white ">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-gray-200  focus:ring-blue-500" />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-gray-900 ">On Sale</FormLabel>
                    <FormDescription className="text-gray-500 ">Mark this product as being on sale</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 ">SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="SKU123" {...field} className="bg-white  text-gray-900  border-gray-200 " />
                  </FormControl>
                  <FormDescription className="text-gray-500 ">Stock Keeping Unit (unique identifier)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-gray-200  bg-white ">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-gray-200  focus:ring-blue-500" />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-gray-900 ">In Stock</FormLabel>
                    <FormDescription className="text-gray-500 ">Is this product currently in stock?</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isNew"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-gray-200  bg-white ">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-gray-200  focus:ring-blue-500" />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-gray-900 ">New Arrival</FormLabel>
                    <FormDescription className="text-gray-500 ">Mark this product as a new arrival</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Product"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}