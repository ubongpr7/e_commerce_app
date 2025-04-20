import type React from "react"
import { MainNav } from "@/components/navigation/main-nav"
import { MainFooter } from "@/components/navigation/main-footer"


interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Server-safe margin container */}
      <div className="ml-4 flex-1 mr-4">
        <MainNav />
        <main className="flex-1">{children}</main>
        <MainFooter />
      </div>
    </div>
  )
}
