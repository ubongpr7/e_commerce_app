import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import StoreProvider from "@/redux/provider"
import NextTopLoader from 'nextjs-toploader';


export const metadata: Metadata = {
  title: "MultiVendor Marketplace",
  description: "A multivendor e-commerce platform connecting customers with quality vendors",
    
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body >
      <NextTopLoader />

        <StoreProvider>
            {children}
        </StoreProvider>
      </body>
    </html>
  )
}
