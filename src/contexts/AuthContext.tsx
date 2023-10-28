import React, { createContext, useContext, useState, ReactNode } from 'react'

type UserData = {
  id: number
  email: string
  password: string
}

type AuthContextType = {
  user: UserData | null
  error: string | null
  login: (userData: UserData) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const login = (userData: UserData) => {
    if (
      userData.email === 'admin@gmail.com' &&
      userData.password === 'Password123!'
    ) {
      setUser(userData)
    } else {
      setError('Tài khoản hoặc mật khẩu không chính xác')
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
