'use client'

import type React from "react"
import { MainNav } from "@/components/navigation/main-nav"
import { MainFooter } from "@/components/navigation/main-footer"
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainPageLayout({ children }: MainLayoutProps) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.add('light')
    }
  }, [isDarkMode]);

  return (
    <div className={`${isDarkMode ? 'dark' : 'light'} flex min-h-screen flex-col bg-gray-50 lg:bg-orange-600`}>
      <div
        className="w-full bg-no-repeat bg-contain"
        style={{
          backgroundImage: `
            url(''),
            url('')
          `,
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundPosition: 'top left, bottom right',
          backgroundSize: 'contain, contain',
          height: "auto",
        }}
      >
        <MainNav />
        <main className="flex-1">{children}</main>
        <MainFooter />
      </div>
    </div>
  );
}
