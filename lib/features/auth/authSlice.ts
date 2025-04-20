import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "vendor" | "customer" | "admin"
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Simulating API calls with local storage for demo purposes
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login for demo
      if (email === "vendor@example.com" && password === "password") {
        const user = {
          id: "v1",
          name: "Demo Vendor",
          email: "vendor@example.com",
          role: "vendor" as const,
          avatar: "/placeholder.svg?height=40&width=40",
        }

        localStorage.setItem("user", JSON.stringify(user))
        return user
      }

      if (email === "customer@example.com" && password === "password") {
        const user = {
          id: "c1",
          name: "Demo Customer",
          email: "customer@example.com",
          role: "customer" as const,
          avatar: "/placeholder.svg?height=40&width=40",
        }

        localStorage.setItem("user", JSON.stringify(user))
        return user
      }

      return rejectWithValue("Invalid email or password")
    } catch (error) {
      return rejectWithValue("Login failed. Please try again.")
    }
  },
)

export const register = createAsyncThunk(
  "auth/register",
  async (
    userData: { name: string; email: string; password: string; role: "vendor" | "customer" },
    { rejectWithValue },
  ) => {
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error) {
      return rejectWithValue("Registration failed. Please try again.")
    }
  },
)

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user")
  return null
})

export const checkAuth = createAsyncThunk("auth/check", async () => {
  const userStr = localStorage.getItem("user")
  if (userStr) {
    return JSON.parse(userStr) as User
  }
  return null
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder.addCase(login.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Register cases
    builder.addCase(register.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
    })
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    // Logout case
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null
      state.isAuthenticated = false
    })

    // Check auth case
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload
        state.isAuthenticated = true
      }
    })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
