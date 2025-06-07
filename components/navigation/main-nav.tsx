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
import NotificationBell from "../user/notification-bell";
import {
  UserRound,
  PartyPopper,
  PlaneTakeoff,
  Castle,
  TreePalm,
  Bed,
  GraduationCap,
  Home,
  BookTextIcon,
  TabletSmartphone,
  Plug,
  LampDesk,
  Popcorn,
  HandHeart,
  Sofa,
  CarFront,
  FilePenLine,
  Gamepad2,
  HandPlatter,
  ShoppingCart,
  MenuIcon,
  Wallet,
  Heart,
  CircleCheckBig,
  UserRoundPen,
  MapPinHouse,
  BellRing,
  CircleHelp,
  Plus,
  LogIn,
  Settings,
  LogOut,
  X,
  Moon,
  Sun,
  Search,
  Users,
  Sparkles,
  BookOpen,
  ShoppingBasket,
  Car,
  HeartPulse,
  MonitorSmartphone,
  Dumbbell,
  Briefcase,
  BedDouble,
  Shirt,
  Frame,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsDarkMode } from "../../redux/state";
import SanityClient from "@/lib/sanityClient";
import { urlForImage } from "@/lib/sanityImage";

import SchoolDropdown from "../store/school-dropdown";
import LogoutButton from "../user/logout-button";
import Image from "next/image";
import DesktopNavSearch from "./desktop-nav-search";
import MobileNavSearch from "./mobile-nav-search";



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
              className="md:hidden w-full object-cover"
            />
          </Link>

          {/* Desktop Background Image */}
          <Link href={headerData.desktopLink} title={headerData.desktopTitle}>
            <img
              src={urlForImage(headerData.desktopImage).url()}
              alt={headerData.desktopTitle}
              className="hidden md:block w-full object-cover"
            />
          </Link>
        </>
      )}

      <div className="bg-gray-100 hidden text-center text-white w-full lg:flex flex-row justify-start gap-80 px-[86px]">
        <Link href="/vendor/register/start">
          <Button className="w-full bg-gray-100 hover:bg-gray-100 rounded-md shadow-sm px-4 py-2 text-center tracking-widest text-xs lg:text-xs font-medium text-orange-600">
            Sell on Jemfave
          </Button>
        </Link>

        <SchoolDropdown />
      </div>

      <div className="bg-gray-100 lg:hidden text-center text-white w-full p-0">
        <SchoolDropdown />
      </div>

      <header className="sticky right-0 left-0 top-0 z-30 w-full mb-2 lg:mb-0 shadow-md bg-white">

        <div className="container flex h-20 pl-6 pr-6 items-center justify-between lg:px-[86px]">
          {/* Mobile Menu and Logo */}
          <div className="flex items-center lg:hidden gap-1 ml-2">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>

            <Link href="/" className="flex items-center gap-0 font-bold flex-row">
              {/* Logo Mobile */}
              <div className="bg-orange-600 text-white text-4xl rounded-full w-12 h-12 flex items-center justify-center font-bold">
                J
              </div>

              <div className="text-gray-900 font-bold text-3xl -ml-5">emfave</div>
            </Link>
          </div>

          <Link href="/" className="lg:flex hidden items-center gap-0 font-bold flex-row">
            {/* Logo Desktop */}
            <div className="bg-orange-600 text-white text-5xl rounded-full w-14 h-14 flex items-center justify-center font-bold">
              J
            </div>

            <div className="text-gray-900 font-bold text-4xl -ml-6">emfave</div>
          </Link>


          {/* Desktop Header Search */}
          <DesktopNavSearch />

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
                  <ul className="grid w-[500px] h-[500px] gap-3 p-4 lg:grid-cols-2 overflow-auto scrollbar-hide">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-orange-600 text-black p-6 no-underline outline-none focus:shadow-md"
                          href="/products"
                        >
                          <div className="mb-2 mt-4 text-lg font-bold">Products</div>
                          <p className="text-xs text-white">
                            All the stuff you actually need—tech, fashion, school gear, and everyday essentials. No stress, no overspending.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    {[
                      {
                        label: "Study Materials",
                        value: "study-materials",
                        icon: GraduationCap,
                        subcategory: "Textbooks · Past Questions · Notes",
                      },
                      {
                        label: "Electronic Gadgets",
                        value: "electronics-gadgets",
                        icon: TabletSmartphone,
                        subcategory: "Phones · Earbuds · Chargers",
                      },
                      {
                        label: "Office Supplies",
                        value: "office-supplies",
                        icon: FilePenLine,
                        subcategory: "Pens · Files · Stationery",
                      },
                      {
                        label: "Fashion & Apparel",
                        value: "fashion-wear",
                        icon: Shirt,
                        subcategory: "Clothes · Shoes · Accessories",
                      },
                      {
                        label: "Food & Groceries",
                        value: "food-grocery",
                        icon: ShoppingCart,
                        subcategory: "Snacks · Meals · Groceries",
                      },
                      {
                        label: "Beauty & Health",
                        value: "beauty-health",
                        icon: Heart,
                        subcategory: "Skincare · Wellness · Makeup",
                      },
                      {
                        label: "Home Essentials",
                        value: "home-essentials",
                        icon: Home,
                        subcategory: "Buckets · Mats · Bedding",
                      },
                      {
                        label: "Sporting Goods",
                        value: "sporting-goods",
                        icon: Dumbbell,
                        subcategory: "Sportswear · Equipment",
                      },
                      {
                        label: "Automobile Goods",
                        value: "automobile-goods",
                        icon: CarFront,
                        subcategory: "Car Fresheners · Mats",
                      },
                      {
                        label: "Entertainment & Games",
                        value: "entertainment-games",
                        icon: Gamepad2,
                        subcategory: "Board Games · Cards · Gadgets",
                      },
                    ].map(({ label, value, icon: Icon, subcategory }) => (
                      <li key={value}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/products?category=${value}`}
                            className="flex items-start gap-3 rounded-md p-3 hover:bg-gray-100 transition-colors"
                          >
                            <Icon className="w-6 h-6 mt-1 text-orange-600" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{label}</div>
                              <p className="text-xs text-gray-600">{subcategory}</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="hidden">
                <NavigationMenuTrigger>
                  <p className="text-base hidden">Services</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] h-[500px] gap-3 p-4 lg:grid-cols-2 overflow-auto scrollbar-hide">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-orange-600 text-black p-6 no-underline outline-none focus:shadow-md"
                          href="/services"
                        >
                          <div className="mb-2 mt-4 text-lg font-bold">Services</div>
                          <p className="text-xs text-white">
                            From laundry and tutoring to repairs and more. Real-life help, right when you need it. You chill, we handle it.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    {[
                      {
                        label: "Event Support & Ushering",
                        value: "event-ushering",
                        icon: Users,
                        subcategory: "Campus Events · Ushers · Setup",
                      },
                      {
                        label: "Home Services",
                        value: "home-services",
                        icon: Home,
                        subcategory: "Cooking · Cleaning · Washing",
                      },
                      {
                        label: "Laundry & Cleaning",
                        value: "laundry-cleaning",
                        icon: Sparkles,
                        subcategory: "Laundry · Cleaning Services",
                      },
                      {
                        label: "Tutoring & Academic Assistance",
                        value: "academic-tutoring",
                        icon: BookOpen,
                        subcategory: "Tutors · Assignments · Study Help",
                      },
                      {
                        label: "Grocery & Food Delivery",
                        value: "food-delivery",
                        icon: ShoppingBasket,
                        subcategory: "Groceries · Meals · Snacks",
                      },
                      {
                        label: "Rides & Bolts",
                        value: "rides-bolts",
                        icon: Car,
                        subcategory: "Campus Rides · Bolt",
                      },
                      {
                        label: "Health & Wellness",
                        value: "health-wellness",
                        icon: HeartPulse,
                        subcategory: "Fitness · Therapy · First Aid",
                      },
                      {
                        label: "Tech Support & Device Repair",
                        value: "tech-repair",
                        icon: MonitorSmartphone,
                        subcategory: "Phone Fix · Laptop Help",
                      },
                      {
                        label: "Career & Professional Development",
                        value: "career-support",
                        icon: Briefcase,
                        subcategory: "CV · Internships · Skills",
                      },
                      {
                        label: "Home & Dorm Essential Rental",
                        value: "essential-rentals",
                        icon: BedDouble,
                        subcategory: "Fan · Chair · Bedding",
                      },
                      {
                        label: "Beauty & Fashion",
                        value: "beauty-fashion",
                        icon: Shirt,
                        subcategory: "Clothing · Makeup · Accessories",
                      },
                      {
                        label: "Artistry & Creative Services",
                        value: "artistry-services",
                        icon: Shirt,
                        subcategory: "Paintings · Designs · Portraits",
                      },
                    ].map(({ label, value, icon: Icon, subcategory }) => (
                      <li key={value}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/services?category=${value}`}
                            className="flex items-start gap-3 rounded-md p-3 hover:bg-gray-100 transition-colors"
                          >
                            <Icon className="w-6 h-6 mt-1 text-orange-600" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{label}</div>
                              <p className="text-xs text-gray-600">{subcategory}</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="hidden">
                <NavigationMenuTrigger>
                  <p className="text-base hidden">Specials</p>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] h-[500px] gap-3 p-4 lg:grid-cols-2 overflow-auto scrollbar-hide">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-orange-600 text-black p-6 no-underline outline-none focus:shadow-md"
                          href="/specials"
                        >
                          <div className="mb-2 mt-4 text-lg font-bold">Specials</div>
                          <p className="text-xs text-white">
                            Flights, hostels, fun stuff, and exclusive perks. The kind of deals you don’t find just anywhere. Only for you.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    {[
                      {
                        label: 'Flights & Travels',
                        value: 'flights-travels',
                        icon: PlaneTakeoff,
                        subcategory: 'Campus Flights · Student Trips · Travels',
                      },
                      {
                        label: 'Hostels & Lodges',
                        value: 'hostels-lodges',
                        icon: Castle,
                        subcategory: 'Student Hostels · Short Stays · Lodging',
                      },
                      {
                        label: 'Recreation & Leisure',
                        value: 'recreation-leisure',
                        icon: TreePalm,
                        subcategory: 'Hangouts · Picnics · Events · Games',
                      },
                      {
                        label: 'Hotels & Suites',
                        value: 'hotels-suites',
                        icon: Bed,
                        subcategory: 'Hotels · Suites · Overnight Packages',
                      },
                      {
                        label: 'Fitness Centers',
                        value: 'fitness-centers',
                        icon: Activity,
                        subcategory: 'Gym · Workout · Training',
                      },
                    ].map(({ label, value, icon: Icon, subcategory }) => (
                      <li key={value}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/specials?category=${value}`}
                            className="flex items-start gap-3 rounded-md p-3 hover:bg-gray-100 transition-colors"
                          >
                            <Icon className="w-6 h-6 mt-1 text-orange-600" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{label}</div>
                              <p className="text-xs text-gray-600">{subcategory}</p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
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
              <Button variant="ghost" size="default" className="relative">
                <ShoppingCart className="h-7 w-7" />
                <div className="hidden md:block mr-0 text-base">Cart</div>
                {cartItemCount > 0 && (
                  <Badge className="absolute -right-1 md:left-1 md:top-0 -top-1 h-5 w-5 rounded-full text-xs flex items-center justify-center p-0">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link href="/wallet">
              <Button variant="ghost" size="icon" className="relative hidden">
                <Wallet className="h-7 w-7" />
              </Button>
            </Link>

            {/* User Button (for mobile) */}
            <Button variant="ghost" size="default" className="lg:hidden" onClick={() => setIsUserOpen(true)}>
              <UserRound className="h-7 w-7 -ml-5 md:ml-0" />
              <span className="hidden lg:hidden md:block mr-0 text-base">Account</span>
            </Button>

            {/* Desktop Login/Register */}
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="hidden lg:flex">
                  <UserRound className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/accounts/login">
                  <Button size="sm" className="text-base bg-orange-600 hover:bg-orange-700">
                    Login
                  </Button>
                </Link>
                <Link href="/vendor/register/start">
                  <Button variant="ghost" size="sm" className="bg-gray-50 hidden text-base">
                    Becomme a Vendor
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Header Search */}
        <MobileNavSearch />

        {/* Sheets for Menu/User */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
            <div className="fixed top-0 left-0 z-50 w-64 h-full bg-white pb-4 overflow-y-auto scrollbar-hide">
              <nav className="flex flex-col gap-4">
                <div className="bg-gray-900 text-white w-64 h-40 px-3 py-10 fixed top-0 left-0 z-10">
                  <div className="text-xs tracking-widest">Browse</div>
                  <Link href="/" className="flex items-center gap-0 font-bold flex-row" onClick={() => setIsMenuOpen(false)}>
                    {/* Logo Desktop */}
                    <div className="bg-orange-600 text-gray-900 text-4xl rounded-full w-12 h-12 flex items-center justify-center font-bold">
                      J
                    </div>

                    <div className="text-white font-bold text-3xl -ml-5">emfave</div>
                  </Link>
                </div>

                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <div className="px-3 mt-40 pt-2 flex flex-row justify-between hover:bg-gray-100 py-2">
                    <div className="text-base">Home</div>
                    <Home className="h-5 w-5 mt-1" />
                  </div>
                </Link>

                <hr className="border-t-8 -mt-4 border-gray-300 w-full" />

                <div className="">
                  <div className="text-lg font-semibold mb-3 px-3">Trending</div>

                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <div className="text-base hover:bg-gray-100 py-2 mb-2 px-3 hidden">Best Sellers</div>
                  </Link>

                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <div className="text-base hover:bg-gray-100 mb-2 py-2 px-3">New Arrival</div>
                  </Link>
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <div className="text-base hover:bg-gray-100 py-2 px-3 hidden">Movers & Shakers</div>
                  </Link>
                </div>

                <hr className="border-t-8 -mt-6 border-gray-300 w-full" />

                <div className="">
                  <div className="text-lg font-semibold mb-5 px-3">Categories</div>

                  <Link href={`/products?category=study-materials`} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                      <GraduationCap className="h-5 w-5" />
                      <div className="text-base">Study Materials</div>
                    </div>
                  </Link>

                  <Link href={`/products?category=electronics-gadgets`} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 py-2 mb-2 px-3">
                      <Plug className="h-5 w-5" />
                      <div className="text-base">Electronics Gadgets</div>
                    </div>
                  </Link>

                  <Link href={`/products?category=office-supplies`} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                      <LampDesk className="h-5 w-5" />
                      <div className="text-base">Office Supplies</div>
                    </div>
                  </Link>

                  <Link href={`/products?category=fashion-wear`} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                      <Shirt className="h-5 w-5" />
                      <div className="text-base">Fashion & Apparel</div>
                    </div>
                  </Link>

                  <Link href={`/products?category=food-grocery`} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                      <Popcorn className="h-5 w-5" />
                      <div className="text-base">Food & Groceries</div>
                    </div>
                  </Link>

                  <Link href={`/products?category=beauty-health`} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                      <HandHeart className="h-5 w-5" />
                      <div className="text-base">Beauty & Health</div>
                    </div>
                  </Link>

                  <Link href={`/products?category=home-essentials`} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                      <Sofa className="h-5 w-5" />
                      <div className="text-base">Home Essentials</div>
                    </div>
                  </Link>

                  <Link href={`/products?category=sporting-goods`} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                      <Dumbbell className="h-5 w-5" />
                      <div className="text-base">Sporting Goods</div>
                    </div>
                  </Link>

                  <Link href={`/products?category=entertainment-games`} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                      <Gamepad2 className="h-5 w-5" />
                      <div className="text-base">Entertainment</div>
                    </div>
                  </Link>

                  <Link href={`/products?category=automobile-goods`} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                      <CarFront className="h-5 w-5" />
                      <div className="text-base">Automobile</div>
                    </div>
                  </Link>

                  <Link href="/services" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3 hidden">
                      <HandPlatter className="h-5 w-5" />
                      <div className="text-base">Services</div>
                    </div>
                  </Link>

                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex-row justify-start gap-4 hover:bg-gray-100 py-2 px-3 hidden">
                      <Sparkles className="h-5 w-5" />
                      <div className="text-base">Extras</div>
                    </div>
                  </Link>

                  <hr className="border-t-8 mb-3 border-gray-300 w-full" />

                  <div className="hidden">
                    <div className="text-lg font-semibold mb-5 px-3">Services</div>

                    <Link href={`/services?category=beauty-fashion`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                        <Shirt className="h-5 w-5" />
                        <div className="text-base">Beauty & Fashion</div>
                      </div>
                    </Link>

                    <Link href={`/services?category=home-services`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 py-2 mb-2 px-3">
                        <Home className="h-5 w-5" />
                        <div className="text-base">Home Services</div>
                      </div>
                    </Link>

                    <Link href={`/services?category=event-ushering`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                        <Users className="h-5 w-5" />
                        <div className="text-base">Event & Ushering</div>
                      </div>
                    </Link>

                    <Link href={`/services?category=laundry-cleaning`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                        <Sparkles className="h-5 w-5" />
                        <div className="text-base">Laundry & Cleaning</div>
                      </div>
                    </Link>

                    <Link href={`/services?category=academic-tutoring`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                        <BookOpen className="h-5 w-5" />
                        <div className="text-base">Academic Tutoring</div>
                      </div>
                    </Link>

                    <Link href={`/services?category=food-delivery`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                        <ShoppingBasket className="h-5 w-5" />
                        <div className="text-base">Food Delivery</div>
                      </div>
                    </Link>

                    <Link href={`/services?category=rides-bolts`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                        <Car className="h-5 w-5" />
                        <div className="text-base">Rides & Bolts</div>
                      </div>
                    </Link>

                    <Link href={`/services?category=health-wellness`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                        <HeartPulse className="h-5 w-5" />
                        <div className="text-base">Health & Wellness</div>
                      </div>
                    </Link>

                    <Link href={`/services?category=tech-repair`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                        <MonitorSmartphone className="h-5 w-5" />
                        <div className="text-base">Tech Repair</div>
                      </div>
                    </Link>

                    <Link href={`/services?category=career-support`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                        <Briefcase className="h-5 w-5" />
                        <div className="text-base">Career Support</div>
                      </div>
                    </Link>

                    <Link href={`/services?category=essential-rentals`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                        <BedDouble className="h-5 w-5" />
                        <div className="text-base">Rental Services</div>
                      </div>
                    </Link>

                    <Link href={`/services?category=artistry-services`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 mb-2 hover:bg-gray-100 py-2 px-3">
                        <Frame className="h-5 w-5" />
                        <div className="text-base">Artistry Services</div>
                      </div>
                    </Link>

                    <hr className="border-t-8 mb-3 border-gray-300 w-full" />

                    <div className="text-lg font-semibold mb-5 px-3">Specials</div>

                    <Link href={`/specials?category=flights-travels`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                        <PlaneTakeoff className="h-5 w-5" />
                        <div className="text-base">Flights & Travels</div>
                      </div>
                    </Link>

                    <Link href={`/specials?category=hostels-lodges`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 py-2 mb-2 px-3">
                        <Castle className="h-5 w-5" />
                        <div className="text-base">Hostels & Lodges</div>
                      </div>
                    </Link>

                    <Link href={`/specials?category=recreation-leisure`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                        <TreePalm className="h-5 w-5" />
                        <div className="text-base">Recreation & Leisure</div>
                      </div>
                    </Link>

                    <Link href={`/specials?category=hotels-suites`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                        <Bed className="h-5 w-5" />
                        <div className="text-base">Hotels & Suites</div>
                      </div>
                    </Link>

                    <Link href={`/specials?category=fitness-centers`} onClick={() => setIsMenuOpen(false)}>
                      <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                        <Activity className="h-5 w-5" />
                        <div className="text-base">Fitness Centers</div>
                      </div>
                    </Link>

                    <hr className="border-t-8 border-gray-300 w-full mt-5" />
                  </div>

                  <Link href="/vendors" onClick={() => setIsMenuOpen(false)}>
                    <div className="hover:bg-gray-100 mt-2 py-2 px-3">
                      <div className="text-base">Our Vendors</div>
                    </div>
                  </Link>

                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <div className="hover:bg-gray-100 mt-2 py-2 px-3">
                      <div className="text-base">Sell on Jemfave</div>
                    </div>
                  </Link>

                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <div className="hover:bg-gray-100 mt-2 py-2 px-3">
                      <div className="text-base">Contact us</div>
                    </div>
                  </Link>

                  <Link className="hidden" href="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
                  <Link className="hidden" href="/vendors" onClick={() => setIsMenuOpen(false)}>Vendors</Link>
                </div>
              </nav>
            </div>
          </>
        )}

        {isUserOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsUserOpen(false)} />
            <div className="fixed top-0 right-0 z-50 w-64 h-full bg-white p-4">
              <div className="flex flex-col gap-4">
                <div className="bg-orange-600 text-black w-64 h-40 px-3 py-10 fixed top-0 right-0 z-10">
                  <div className="text-xs tracking-widest">Jemfave</div>
                  <div className="text-2xl font-bold">Student</div>
                </div>
                {isLoggedIn ? (
                  <>
                    <div className="">
                      <div className="text-lg font-semibold mb-5 px-3">My Account</div>

                      <Link href="/" onClick={() => setIsUserOpen(false)}>
                        <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                          <UserRoundPen className="h-5 w-5" />
                          <div className="text-base">Profile</div>
                        </div>
                      </Link>

                      <Link href="/" onClick={() => setIsUserOpen(false)}>
                        <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                          <Wallet className="h-5 w-5" />
                          <div className="text-base">Wallet</div>
                        </div>
                      </Link>

                      <Link href="/" onClick={() => setIsUserOpen(false)}>
                        <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                          <CircleCheckBig className="h-5 w-5" />
                          <div className="text-base">Orders</div>
                        </div>
                      </Link>

                      <Link href="/" onClick={() => setIsUserOpen(false)}>
                        <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                          <Heart className="h-5 w-5" />
                          <div className="text-base">Saved Items</div>
                        </div>
                      </Link>

                      <Link href="/" onClick={() => setIsUserOpen(false)}>
                        <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                          <MapPinHouse className="h-5 w-5" />
                          <div className="text-base">Address</div>
                        </div>
                      </Link>

                      <Link href="/" onClick={() => setIsUserOpen(false)}>
                        <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                          <BellRing className="h-5 w-5" />
                          <div className="text-base">Notifications</div>
                        </div>
                      </Link>

                      <Link href="/" onClick={() => setIsUserOpen(false)}>
                        <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                          <Settings className="h-5 w-5" />
                          <div className="text-base">Settings</div>
                        </div>
                      </Link>

                      <Link href="/" onClick={() => setIsUserOpen(false)}>
                        <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                          <CircleHelp className="h-5 w-5" />
                          <div className="text-base">Support/Help</div>
                        </div>
                      </Link>

                      <Link href="/" onClick={() => setIsUserOpen(false)}>
                        <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                          <LogOut className="h-5 w-5" />
                          <div className="text-base">
                            <LogoutButton />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-40">
                      <div className="text-lg font-semibold mb-5 px-3">My Account</div>

                      <Link href="/accounts/login" onClick={() => setIsUserOpen(false)}>
                        <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                          <LogIn className="h-5 w-5" />
                          <div className="text-base">Login</div>
                        </div>
                      </Link>

                      <Link href="/accounts/register" onClick={() => setIsUserOpen(false)}>
                        <div className="flex flex-row justify-start gap-4 hover:bg-gray-100 mb-2 py-2 px-3">
                          <Plus className="h-5 w-5" />
                          <div className="text-base">Register</div>
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        <div className="bg-main-red tracking-widest text-white text-center w-full p-1 font-bold text-sm lg:hidden animate-blink">
          SHOP YOUR STYLE
        </div>

        <div className="bg-black text-white tracking-widest text-center w-full p-2 font-semibold text-base hidden lg:block animate-blink">
          SHOP YOUR STYLE WITH BEST AFFORDABLE PRICES
        </div>
      </header>
    </>
  );
}
