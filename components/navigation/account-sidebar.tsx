"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { User, CreditCard, Settings, LinkIcon, Mail, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppSelector } from "@/redux/hooks"
import { cn } from "@/lib/utils"

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
  const user = useAppSelector((state) => state.auth)

  return (
    <div className="flex h-screen flex-col border-l border-gray-200  bg-white  text-gray-900 ">
      <div className="flex h-16 items-center border-b px-6 border-gray-200 ">
        <span className="font-bold">Account</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={""} alt={"User"} />
          <AvatarFallback>{ "U"}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h3 className="font-medium">{ "User Name"}</h3>
          <p className="text-sm text-gray-500 ">{"user@example.com"}</p>
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-500",
                  isActive ? "bg-gray-100  text-gray-900 " : "text-gray-500 "
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.title}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="border-t p-6 border-gray-200 ">
        <div className="flex items-center gap-3 rounded-lg bg-gray-100  p-3 text-gray-900 ">
          <Mail className="h-4 w-4" />
          <div className="flex-1 text-sm">
            <p className="font-medium">Need help?</p>
            <p className="text-gray-500 ">Our team is here for you</p>
          </div>
        </div>
      </div>
    </div>
  )
}