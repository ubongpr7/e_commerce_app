"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { User, CreditCard, Settings, LinkIcon, Mail, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

const accountLinks = [
  {
    title: "Profile",
    href: "/account/profile",
    icon: User,
  },
  {
    title: "Bank & Payments",
    href: "/account/bank",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/account/settings",
    icon: Settings,
  },
  {
    title: "Integrations",
    href: "/account/integrations",
    icon: LinkIcon,
  },
  {
    title: "Support",
    href: "/account/support",
    icon: HelpCircle,
  },
]

export function AccountSidebar() {
  const pathname = usePathname()
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <div className="flex h-screen flex-col border-l">
      <div className="flex h-16 items-center border-b px-6">
        <span className="font-bold">Account</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
          <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="font-medium">{user?.name || "User Name"}</h3>
          <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {accountLinks.map((link) => {
            const isActive = pathname === link.href
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
      <div className="border-t p-6">
        <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
          <Mail className="h-4 w-4" />
          <div className="flex-1 text-sm">
            <p className="font-medium">Need help?</p>
            <p className="text-muted-foreground">Our team is here for you</p>
          </div>
        </div>
      </div>
    </div>
  )
}
