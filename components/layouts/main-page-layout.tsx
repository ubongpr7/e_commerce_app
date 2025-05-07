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
    <div className={`${isDarkMode ? 'dark' : 'light'} flex min-h-screen flex-col`}>
      <div
        className="w-full bg-no-repeat bg-center bg-contain"
        style={{
          backgroundImage: "url('https://sdmntpreastus2.oaiusercontent.com/files/00000000-ae60-61f6-afb7-e2ef20d2803a/raw?se=2025-05-07T06%3A50%3A02Z&sp=r&sv=2024-08-04&sr=b&scid=cdf7bbb5-b0b4-5054-b15f-91462f43284b&skoid=3f3a9132-9530-48ef-96b7-fee5a811733f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-07T02%3A17%3A18Z&ske=2025-05-08T02%3A17%3A18Z&sks=b&skv=2024-08-04&sig=QR2CXHslzvQSS32wylvlTUOFWSQjBSzj3zxFe0j5MwU%3D')", // Replace with your actual path
          height: "auto", // Let the content control the height
        }}
      >
        <MainNav />
        <main className="flex-1">{children}</main>
        <MainFooter />
      </div>
    </div>
  );
}
