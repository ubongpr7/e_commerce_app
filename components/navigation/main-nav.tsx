"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
import { Sheet, SheetContent, SheetTrigger, SheetOverlay } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  User,
  ShoppingCart,
  MenuIcon,
  X,
  Moon,
  Sun,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsDarkMode } from "../../redux/state";
import SanityClient from "@/lib/sanityClient";
import { urlForImage } from "@/lib/sanityImage";

import SchoolDropdown from "../store/school-dropdown";



type HeaderImageData = {
  mobileImage: any;
  mobileLink: string;
  mobileTitle: string;
  desktopImage: any;
  desktopLink: string;
  desktopTitle: string;
};

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const pathname = usePathname();
  const cartItemCount = useAppSelector((state) => state.cart.items.length);
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [headerData, setHeaderData] = useState<HeaderImageData | null>(null);

  useEffect(() => {
    const fetchHeaderImages = async () => {
      const query = `*[_type == "headerImages"][0]{
        mobileImage,
        mobileLink,
        mobileTitle,
        desktopImage,
        desktopLink,
        desktopTitle
      }`;
      const result = await SanityClient.fetch(query);
      setHeaderData(result);
    };

    fetchHeaderImages();
  }, []);

  // Lock body scroll when side sheets are open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isUserOpen ? "hidden" : "auto";
  }, [isMenuOpen, isUserOpen]);

  return (
    <>
      {headerData && (
        <>
          {/* Mobile Background Image */}
          <Link href={headerData.mobileLink} title={headerData.mobileTitle}>
            <img
              src={urlForImage(headerData.mobileImage).url()}
              alt={headerData.mobileTitle}
              className="lg:hidden w-full object-cover"
            />
          </Link>

          {/* Desktop Background Image */}
          <Link href={headerData.desktopLink} title={headerData.desktopTitle}>
            <img
              src={urlForImage(headerData.desktopImage).url()}
              alt={headerData.desktopTitle}
              className="hidden lg:block w-full object-cover"
            />
          </Link>
        </>
      )}

      <header className="sticky right-0 left-0 top-0 z-50 w-full mb-2 lg:mb-0 shadow-md bg-white">

        <div className="bg-gray-100 hidden lg:block text-center text-white w-full p-2">
          <SchoolDropdown />
        </div>

        <div className="container flex h-20 pl-6 pr-6 items-center justify-between lg:px-8">
          {/* Mobile Menu and Logo */}
          <div className="flex items-center lg:hidden gap-1 ml-2">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>

            <Link href="/" className="text-2xl tracking-widest font-bold text-gray-800">
              JEMFAVE
            </Link>
          </div>

          {/* Logo Desktop */}
          <Link href="/" className="hidden tracking-widest lg:flex text-3xl font-bold text-gray-800">
            JEMFAVE
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:block">
            <form className="relative w-full lg:w-auto flex flex-row gap-1">
              <Input
                type="text"
                placeholder="Search products, brands and categories..."
                className="w-full rounded-lg bg-gray-100 pl-4 lg:w-[300px]"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-orange-600 hover:bg-orange-700 rounded-lg"
              >
                <Search className="h-5 w-5 text-white" />
              </Button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <p className="text-base">Home</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <p className="text-base">Products</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] gap-3 p-4 lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-orange-600 text-black p-6 no-underline outline-none focus:shadow-md"
                          href="/products"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">All Products</div>
                          <p className="text-sm text-white">
                            Browse all products from our trusted vendors
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {[
                      { label: "Study Materials", value: "study" },
                      { label: "Electronic Gadgets", value: "electronic" },
                      { label: "Office Supplies", value: "office" },
                      { label: "Fashion & Apparel", value: "fashion" },
                      { label: "Food & Groceries", value: "food" },
                      { label: "Beauty & Health", value: "beauty" },
                      { label: "Home Essentials", value: "home" },
                      { label: "Sporting Goods", value: "sport" },
                      { label: "Automobile", value: "automobile" },
                      { label: "Entertainment", value: "entertainment" },
                    ].map(({ label, value }) => (
                      <li key={value}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/products?category=${value}`}
                            className="block space-y-1 rounded-md p-3 transition-colors hover:bg-gray-200"
                          >
                            <div className="text-sm font-medium">{label}</div>
                            <p className="text-sm text-gray-600">Subcategory</p>
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
                    <p className="text-base">Vendors</p>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Controls */}
          <div className="flex items-center mr-2 space-x-3">
            {/* Dark Mode Toggle */}
            <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))} className="hidden">
              {isDarkMode ? (
                <Moon size={25} className="text-orange-600" />
              ) : (
                <Sun size={25} className="text-orange-600" />
              )}
            </button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-20 w-20" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full text-xs flex items-center justify-center p-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Button (for mobile) */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsUserOpen(true)}>
              <User className="h-5 w-5" />
            </Button>

            {/* Desktop Login/Register */}
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="hidden lg:flex">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/login">
                  <Button size="sm" className="text-base bg-orange-600 hover:bg-orange-700">
                    Login
                  </Button>
                </Link>
                <Link href="/vendor/register/start">
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 hidden">
                    Become a Vendor
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Form */}
        <div className="lg:hidden px-4 -mt-3 mb-2.5">
          <form className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search products, brands and categories..."
              className="flex-1 h-8 text-sm bg-gray-100 rounded-full"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-orange-600 hover:bg-orange-700 rounded-full h-8 w-8"
            >
              <Search className="h-2 w-2 text-white" />
            </Button>
          </form>
        </div>

        {/* Sheets for Menu/User */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
            <div className="fixed top-0 left-0 z-50 w-64 h-full bg-white p-4">
              <nav className="flex flex-col gap-4">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
                <Link href="/vendors" onClick={() => setIsMenuOpen(false)}>Vendors</Link>
              </nav>
            </div>
          </>
        )}

        {isUserOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsUserOpen(false)} />
            <div className="fixed top-0 right-0 z-50 w-64 h-full bg-white p-4">
              <div className="flex flex-col gap-4">
                {isLoggedIn ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsUserOpen(false)}>Dashboard</Link>
                    <Link href="/account" onClick={() => setIsUserOpen(false)}>Account</Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsUserOpen(false)}>Login</Link>
                    <Link href="/register" onClick={() => setIsUserOpen(false)}>Register</Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        <div className="bg-main-red tracking-widest text-white text-center w-full p-1 font-bold text-sm lg:hidden animate-blink">
          SHOP YOUR STYLE
        </div>

        <div className="bg-main-red text-white tracking-widest text-center w-full p-2 font-semibold text-base hidden lg:block animate-blink">
          SHOP YOUR STYLE WITH BEST AFFORDABLE PRICES
        </div>
      </header>
    </>
  );
}
