"use client"

import { useEffect } from "react"
import { useAppSelector } from "@/lib/hooks"
import { applyTheme, getSystemTheme } from "@/lib/utils/theme-utils"

export function ThemeInitializer() {
  const currentTheme = useAppSelector((state) => state.theme.theme)

  useEffect(() => {
    // Apply theme on initial load and when it changes
    if (currentTheme === "system") {
      applyTheme(getSystemTheme())

      // Listen for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = () => applyTheme(getSystemTheme())
      mediaQuery.addEventListener("change", handleChange)

      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      applyTheme(currentTheme)
    }
  }, [currentTheme])

  return null
}
