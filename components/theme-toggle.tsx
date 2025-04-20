"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setTheme, type ThemeType } from "@/lib/features/theme/themeSlice"
import { useEffect } from "react"

export function ThemeToggle() {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector((state) => state.theme.theme)
  const { setTheme: setNextTheme, theme: nextTheme } = useTheme()

  // Sync next-themes with Redux
  useEffect(() => {
    if (nextTheme && nextTheme !== currentTheme) {
      setNextTheme(currentTheme)
    }
  }, [currentTheme, nextTheme, setNextTheme])

  const handleThemeChange = (theme: ThemeType) => {
    dispatch(setTheme(theme))
    setNextTheme(theme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
