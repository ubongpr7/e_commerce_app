import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type ThemeType = "light" | "dark" | "system"

interface ThemeState {
  theme: ThemeType
}

// Try to get theme from localStorage if available
const getInitialState = (): ThemeState => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme") as ThemeType
    if (savedTheme) {
      return { theme: savedTheme }
    }
  }

  return { theme: "system" }
}

const initialState: ThemeState = getInitialState()

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload)
      }
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
