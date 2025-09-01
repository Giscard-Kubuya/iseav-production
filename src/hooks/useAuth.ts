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

  const checkAuthState = async () => {
    try {
      const stored = localStorage.getItem('admin_auth')
      if (stored) {
        const data = JSON.parse(stored)
        
        // Check if token is expired
        if (data.expiresAt && Date.now() > data.expiresAt) {
          console.log('Token expired, logging out...');
          logoutWithRedirect('session=expired');
        } else {
          // Verify token with API
          try {
            const { authApi } = await import('@/lib/api-services')
            
            // If it's a demo token, skip API verification
            if (data.token && data.token.startsWith('demo_token_')) {
              console.warn('Using demo authentication token')
              setAuthData(data)
            } else {
              // Verify real token with database
              const response = await authApi.me()
              if (response.data?.data) {
                // Update user data from API response
                const updatedAuthData = {
                  ...data,
                  user: {
                    ...response.data.data,
                    avatar: response.data.data.avatar || data.user?.avatar
                  }
                }
                setAuthData(updatedAuthData)
                localStorage.setItem('admin_auth', JSON.stringify(updatedAuthData))
              } else {
                logout()
              }
            }
          } catch (error: any) {
            console.error('Token verification failed:', error)
            
            // If it's a 401 error, the token is invalid
            if (error.response?.status === 401) {
              logout()
            } else {
              // For other errors, still allow access but log the issue
              console.warn('API verification failed, but allowing access:', error.message)
              setAuthData(data)
            }
          }
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
    
    // Clear any existing auth data first
    localStorage.removeItem('admin_auth')
    
    // Set new auth data
    localStorage.setItem('admin_auth', JSON.stringify(data))
    setAuthData(data)
    
    console.log('Auth login completed:', { userId: user.id, email: user.email, role: user.role })
  }

  const logoutWithRedirect = async (params?: string) => {
    console.log('Logout initiated with params:', params);
    
    try {
      const stored = localStorage.getItem('admin_auth')
      if (stored) {
        const data = JSON.parse(stored)
        
        // Only call API logout for real tokens (not demo tokens)
        if (data.token && !data.token.startsWith('demo_token_')) {
          try {
            const { authApi } = await import('@/lib/api-services')
            await authApi.logout()
            console.log('API logout successful')
          } catch (error) {
            console.error('API logout failed:', error)
            // Continue with local logout even if API call fails
          }
        } else {
          console.log('Demo token detected, skipping API logout')
        }
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }

    // Clear local auth data immediately
    localStorage.removeItem('admin_auth')
    console.log('LocalStorage cleared')
    
    // Reset state immediately
    setAuthData({ user: null, token: null, expiresAt: null })
    console.log('Auth state reset')
    
    // Force a small delay to ensure state updates are processed
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Navigate to login page with params
    const loginUrl = params ? `/admin/login?${params}` : '/admin/login';
    router.push(loginUrl);
    console.log('Redirected to login page:', loginUrl);
  }

  const logout = async () => {
    await logoutWithRedirect();
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