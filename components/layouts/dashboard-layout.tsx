"use client"

import type React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { VendorSidebar } from "@/components/navigation/vendor-sidebar"
import { AccountSidebar } from "@/components/navigation/account-sidebar"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setIsSidebarCollapsed } from "@/redux/state"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Determine if we're in account pages or vendor dashboard pages
  const isAccountPage = pathname?.includes("/account")

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Left Sidebar - Vendor Dashboard Navigation */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          !isSidebarCollapsed ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <VendorSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
          <Button variant="ghost" className="lg:hidden" onClick={toggleSidebar}>
            {!isSidebarCollapsed ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-xl font-bold">Vendor Dashboard</h1>
          <Button variant="ghost" className="lg:hidden" onClick={() => setRightSidebarOpen(!rightSidebarOpen)}>
            {rightSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle account menu</span>
          </Button>
        </header>
        <main className="p-4 lg:p-6">{children}</main>
      </div>

      {/* Right Sidebar - Account Navigation */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          rightSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <AccountSidebar />
      </div>
    </div>
  )
}
