"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, User, MenuIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { ThemeToggle } from "@/components/theme-toggle"

export function MainNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length)
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-xl font-bold">
                MultiVendor
              </Link>
              <Link
                href="/"
                className={cn("text-lg font-medium transition-colors hover:text-primary", {
                  "text-primary": pathname === "/",
                })}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={cn("text-lg font-medium transition-colors hover:text-primary", {
                  "text-primary": pathname === "/products",
                })}
              >
                Products
              </Link>
              <Link
                href="/vendors"
                className={cn("text-lg font-medium transition-colors hover:text-primary", {
                  "text-primary": pathname === "/vendors",
                })}
              >
                Vendors
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className={cn("text-lg font-medium transition-colors hover:text-primary", {
                      "text-primary": pathname?.includes("/dashboard"),
                    })}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/account"
                    className={cn("text-lg font-medium transition-colors hover:text-primary", {
                      "text-primary": pathname?.includes("/account"),
                    })}
                  >
                    Account
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={cn("text-lg font-medium transition-colors hover:text-primary", {
                      "text-primary": pathname === "/login",
                    })}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={cn("text-lg font-medium transition-colors hover:text-primary", {
                      "text-primary": pathname === "/register",
                    })}
                  >
                    Register
                  </Link>
                </>
              )}
              <div className="flex items-center">
                <span className="mr-2 text-sm font-medium">Theme:</span>
                <ThemeToggle />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 hidden md:flex">
          <span className="text-xl font-bold">MultiVendor</span>
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/products"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">All Products</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Browse all products from our trusted vendors
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/products?category=electronics"
                      >
                        <div className="text-sm font-medium leading-none">Electronics</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Latest gadgets and electronics
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/products?category=fashion"
                      >
                        <div className="text-sm font-medium leading-none">Fashion</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Clothing, shoes, and accessories
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/products?category=home"
                      >
                        <div className="text-sm font-medium leading-none">Home & Kitchen</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Everything for your home
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/vendors" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Vendors</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className={cn("search-container", isSearchOpen ? "flex" : "hidden md:flex")}>
            <form className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </form>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            <span className="sr-only">Toggle search</span>
          </Button>
          <ThemeToggle />
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">{cartItemCount}</Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                Login
              </Button>
            </Link>
          )}
          {!isLoggedIn && (
            <Link href="/vendor/register/start">
              <Button size="sm" className="hidden md:flex">
                Become a Vendor
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
