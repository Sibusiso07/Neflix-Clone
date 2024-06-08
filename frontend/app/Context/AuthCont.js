"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
//   const router = useRouter()

  useEffect(() => {
    // Load user from storage or API
    const savedUser = null // Replace with actual logic
    setUser(savedUser)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
