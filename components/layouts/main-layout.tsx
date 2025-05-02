'use client'
import type React from "react"
import { MainNav } from "@/components/navigation/main-nav"
import { MainFooter } from "@/components/navigation/main-footer"
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";


interface MainLayoutProps {
  children: React.ReactNode
}


export function MainLayout({ children }: MainLayoutProps) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.add('light')
    }
  })
  return (
    <div className={` ${isDarkMode ? 'dark' : 'light'} flex min-h-screen flex-col bg-gray-50`}>
      <MainNav />
      <div className="mt-28">
        <main className="flex-1">{children}</main>
      </div>

      <MainFooter />
    </div>
  )
}
