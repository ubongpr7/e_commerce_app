"use client"

import type React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setTheme, type ThemeType } from "@/lib/features/theme/themeSlice"

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector((state) => state.theme.theme)

  // Handle theme changes from next-themes
  const handleThemeChange = (theme: ThemeType) => {
    if (theme !== currentTheme) {
      dispatch(setTheme(theme))
    }
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={currentTheme}
      value={{
        light: "light",
        dark: "dark",
        system: "system",
      }}
      onValueChange={handleThemeChange as (value: string) => void}
    >
      {children}
    </NextThemesProvider>
  )
}
