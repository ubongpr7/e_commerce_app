"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Search,
  ShoppingCart,
  User,
  MenuIcon,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsDarkMode,
  setIsSidebarCollapsed,
} from "../../redux/state";

export function MainNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const cartItemCount = useAppSelector((state) => state.cart.items.length);
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white  ">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white ">
            <nav className="flex flex-col gap-4 text-gray-800 ">
              <Link href="/" className="text-xl font-bold">
                MultiVendor
              </Link>
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/vendors", label: "Vendors" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-blue-600 ",
                    {
                      "text-blue-600 ": pathname === href,
                    }
                  )}
                >
                  {label}
                </Link>
              ))}

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-blue-600 ",
                      {
                        "text-blue-600": pathname?.includes("/dashboard"),
                      }
                    )}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/account"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-blue-600 ",
                      {
                        "text-blue-600 ": pathname?.includes("/account"),
                      }
                    )}
                  >
                    Account
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-lg hover:text-blue-600 ">
                    Login
                  </Link>
                  <Link href="/register" className="text-lg hover:text-blue-600 ">
                    Register
                  </Link>
                </>
              )}
              <div className="flex items-center mt-2">
                <span className="mr-2 text-sm font-medium">Theme:</span>
                <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
                  {isDarkMode ? (
                    <Sun size={20} className="text-gray-400 hover:text-yellow-400" />
                  ) : (
                    <Moon size={20} className="text-gray-600 hover:text-blue-600" />
                  )}
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="hidden md:flex text-xl font-bold text-gray-800 ">
          MultiVendor
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle() }>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gray-100  p-6 no-underline outline-none focus:shadow-md"
                        href="/products"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">All Products</div>
                        <p className="text-sm text-gray-600 ">
                          Browse all products from our trusted vendors
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {[
                    { label: "Electronics", value: "electronics" },
                    { label: "Fashion", value: "fashion" },
                    { label: "Home & Kitchen", value: "home" },
                  ].map(({ label, value }) => (
                    <li key={value}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/products?category=${value}`}
                          className="block space-y-1 rounded-md p-3 transition-colors hover:bg-gray-200 "
                        >
                          <div className="text-sm font-medium">{label}</div>
                          <p className="text-sm text-gray-600 ">
                            {label === "Electronics"
                              ? "Latest gadgets and tech"
                              : label === "Fashion"
                              ? "Clothing and accessories"
                              : "Appliances and decor"}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/vendors" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Vendors
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className={cn("hidden md:block", isSearchOpen && "flex")}>
            <form className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 " />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-full bg-gray-100  pl-8 md:w-[200px] lg:w-[300px]"
              />
            </form>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            <span className="sr-only">Toggle search</span>
          </Button>

          {/* Theme Toggle */}
          <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
            {isDarkMode ? (
              <Moon size={20} className="text-blue-600" />
            ) : (
              <Sun size={20} className="text-yellow-400" />
            )}
          </button>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  Login
                </Button>
              </Link>
              <Link href="/vendor/register/start">
                <Button size="sm" className="hidden md:flex">
                  Become a Vendor
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
