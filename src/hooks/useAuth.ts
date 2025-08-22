'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'author' | 'subscriber'
  avatar: string
}

interface AuthData {
  user: User | null
  token: string | null
  expiresAt: number | null
}

interface AuthContextType extends AuthData {
  login: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  hasRole: (role: string) => boolean
  hasPermission: (permission: string) => boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useAuthState() {
  const [authData, setAuthData] = useState<AuthData>({
    user: null,
    token: null,
    expiresAt: null
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing auth data on mount
    checkAuthState()
  }, [])

  const checkAuthState = () => {
    try {
      const stored = localStorage.getItem('admin_auth')
      if (stored) {
        const data = JSON.parse(stored)
        
        // Check if token is expired
        if (data.expiresAt && Date.now() > data.expiresAt) {
          logout()
        } else {
          setAuthData(data)
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = (user: User, token: string) => {
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    const data = { user, token, expiresAt }
    
    localStorage.setItem('admin_auth', JSON.stringify(data))
    setAuthData(data)
  }

  const logout = () => {
    localStorage.removeItem('admin_auth')
    setAuthData({ user: null, token: null, expiresAt: null })
    router.push('/admin/login')
  }

  const hasRole = (role: string): boolean => {
    if (!authData.user) return false
    
    const roleHierarchy = {
      subscriber: 0,
      author: 1,
      editor: 2,
      admin: 3
    }
    
    const userLevel = roleHierarchy[authData.user.role as keyof typeof roleHierarchy] || 0
    const requiredLevel = roleHierarchy[role as keyof typeof roleHierarchy] || 0
    
    return userLevel >= requiredLevel
  }

  const hasPermission = (permission: string): boolean => {
    if (!authData.user) return false
    
    const permissions = {
      admin: [
        'all',
        'blog.create', 'blog.edit', 'blog.delete', 'blog.publish',
        'actualites.create', 'actualites.edit', 'actualites.delete', 'actualites.publish',
        'portfolio.create', 'portfolio.edit', 'portfolio.delete', 'portfolio.publish',
        'gallery.create', 'gallery.edit', 'gallery.delete', 'gallery.upload',
        'jobs.create', 'jobs.edit', 'jobs.delete', 'jobs.publish',
        'users.create', 'users.edit', 'users.delete', 'users.view',
        'comments.moderate', 'comments.delete', 'comments.reply',
        'settings.edit', 'analytics.view'
      ],
      editor: [
        'blog.create', 'blog.edit', 'blog.publish',
        'actualites.create', 'actualites.edit', 'actualites.publish',
        'portfolio.edit', 'gallery.edit',
        'comments.moderate', 'comments.reply',
        'analytics.view'
      ],
      author: [
        'blog.create', 'blog.edit',
        'actualites.create', 'actualites.edit',
        'portfolio.create', 'comments.reply'
      ],
      subscriber: [
        'comments.create'
      ]
    }

    const userPermissions = permissions[authData.user.role] || []
    return userPermissions.includes(permission) || userPermissions.includes('all')
  }

  return {
    ...authData,
    login,
    logout,
    isAuthenticated: !!authData.user && !!authData.token,
    isLoading,
    hasRole,
    hasPermission
  }
}