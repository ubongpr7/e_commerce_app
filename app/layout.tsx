import type React from "react";
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import type { Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "@/redux/provider";
import NextTopLoader from "nextjs-toploader";
import "material-icons/iconfont/material-icons.css";
import "@/lib/fontawesome"; // Import once

export const metadata: Metadata = {
  title: "JEMFAVE",
  description: "Global Student Shopping Platform",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent pinch and double-tap zoom on iOS */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('touchstart', function(e) {
                if (e.touches.length > 1) {
                  e.preventDefault();
                }
              }, { passive: false });

              let lastTouchEnd = 0;
              document.addEventListener('touchend', function(e) {
                const now = new Date().getTime();
                if (now - lastTouchEnd <= 300) {
                  e.preventDefault();
                }
                lastTouchEnd = now;
              }, false);
            `,
          }}
        />
      </head>
      <body className="w-full h-full select-none">
        <NextTopLoader
          color="#f97316"
          height={4}
          showSpinner={false}
        />

        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
