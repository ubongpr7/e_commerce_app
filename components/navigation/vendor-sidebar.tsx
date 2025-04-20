"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  ClipboardList,
  BarChart3,
  Tags,
  Box,
  TrendingUp,
  ChevronDown,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { logout } from "@/lib/features/auth/authSlice"
import { ThemeToggle } from "@/components/theme-toggle"

const vendorLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
    subLinks: [
      {
        title: "All Products",
        href: "/dashboard/products",
      },
      {
        title: "Add Product",
        href: "/dashboard/products/add",
      },
      {
        title: "Categories",
        href: "/dashboard/products/categories",
      },
    ],
  },
  {
    title: "Variants",
    href: "/dashboard/variants",
    icon: Layers,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    title: "Purchases",
    href: "/dashboard/purchases",
    icon: ClipboardList,
  },
  {
    title: "Stock",
    href: "/dashboard/stock",
    icon: Box,
  },
  {
    title: "Sales",
    href: "/dashboard/sales",
    icon: BarChart3,
  },
  {
    title: "Promotions",
    href: "/dashboard/promotions",
    icon: Tags,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: TrendingUp,
  },
]

export function VendorSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null)

  const handleLogout = () => {
    dispatch(logout())
    router.push("/")
  }

  return (
    <div className="flex h-screen flex-col border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Package className="h-6 w-6" />
          <span>Vendor Portal</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {vendorLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`)

            if (link.subLinks) {
              return (
                <Collapsible
                  key={link.href}
                  open={openCollapsible === link.title || pathname?.startsWith(link.href)}
                  onOpenChange={() => {
                    setOpenCollapsible(openCollapsible === link.title ? null : link.title)
                  }}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex w-full justify-start gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted",
                        isActive && "bg-muted",
                      )}
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.title}</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 pl-4 border-l">
                    {link.subLinks.map((subLink) => {
                      const isSubActive = pathname === subLink.href
                      return (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 hover:text-primary",
                            isSubActive ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {subLink.title}
                        </Link>
                      )
                    })}
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  isActive ? "bg-muted text-foreground" : "text-muted-foreground",
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.title}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium">Theme</span>
          <ThemeToggle />
        </div>
        <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
