"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { toast, useToast } from "@/components/ui/use-toast"
import { useAppDispatch } from "@/redux/hooks"
// import {  } from "@/redux/features/authAPISlice"
import { useLoginMutation } from "@/redux/features/authApiSlice"
import router from "next/router"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
})

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [login, { isLoading }] = useLoginMutation()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await login({
        email: values.email,
        password: values.password,
      }),
        toast({
          title: "Login successful",
          description: "You have been logged in successfully",
        })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      // setIsSubmitting(false)
    }
  }

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-8 bg-gray-100  text-gray-900 ">
      <div className="mx-auto w-full max-w-md space-y-6 bg-white  rounded-lg shadow-md p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 ">Welcome Back</h1>
          <p className="mt-2 text-gray-500 ">Sign in to your account to continue</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 ">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} className="bg-gray-100  text-gray-900  border-gray-200 " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-gray-900 ">Password</FormLabel>
                    <Link href="/forgot-password" className="text-xs text-blue-500 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="bg-gray-100  text-gray-900  border-gray-200 " />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-gray-200  focus:ring-blue-500" />
                  </FormControl>
                  <FormLabel className="text-sm font-normal text-gray-900 ">Remember me</FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading || isSubmitting}>
              {isLoading || isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-gray-500 ">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 "></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white  px-2 text-gray-500 ">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full bg-gray-100  text-gray-900  border-gray-200  hover:bg-gray-200 ">
            Google
          </Button>
          <Button variant="outline" className="w-full bg-gray-100  text-gray-900  border-gray-200  hover:bg-gray-200 ">
            Facebook
          </Button>
        </div>
      </div>
    </div>
  )
}