export function getSystemTheme(): "light" | "dark" {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  return "light" // Default to light if not in browser
}

export function applyTheme(theme: string): void {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const root = document.documentElement

    // Remove existing theme classes
    root.classList.remove("light", "dark")

    // Apply the new theme
    if (theme === "system") {
      const systemTheme = getSystemTheme()
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }
}
