import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  token: string | null
  customerId: string | null
  isLoggedIn: boolean
  login: (token: string, customerId: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      customerId: null,
      isLoggedIn: false,
      login: (token, customerId) => set({ token, customerId, isLoggedIn: true }),
      logout: () => set({ token: null, customerId: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
