'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout, hasPermission } = useAuth()
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  const isActive = (path: string) => {
    if (path === '/admin' && pathname === '/admin') return true
    if (path !== '/admin' && pathname.startsWith(path)) return true
    return false
  }

  const menuItems = [
    {
      title: 'Dashboard',
      icon: '📊',
      href: '/admin',
      active: pathname === '/admin',
      permission: 'analytics.view'
    },
    {
      title: 'Blog',
      icon: '📝',
      href: '/admin/blog',
      active: pathname.startsWith('/admin/blog'),
      permission: 'blog.create'
    },
    {
      title: 'Actualités',
      icon: '📰',
      href: '/admin/actualites',
      active: pathname.startsWith('/admin/actualites'),
      permission: 'actualites.create'
    },
    {
      title: 'Portfolio',
      icon: '💼',
      href: '/admin/portfolio',
      active: pathname.startsWith('/admin/portfolio'),
      permission: 'portfolio.create'
    },
    {
      title: 'Galerie',
      icon: '🖼️',
      href: '/admin/galerie',
      active: pathname.startsWith('/admin/galerie'),
      permission: 'gallery.create'
    },
    {
      title: 'Recrutement',
      icon: '👥',
      href: '/admin/recrutement',
      active: pathname.startsWith('/admin/recrutement'),
      permission: 'jobs.create'
    },
    {
      title: 'Commentaires',
      icon: '💬',
      href: '/admin/commentaires',
      active: pathname.startsWith('/admin/commentaires'),
      permission: 'comments.moderate'
    },
    {
      title: 'Utilisateurs',
      icon: '👤',
      href: '/admin/utilisateurs',
      active: pathname.startsWith('/admin/utilisateurs'),
      permission: 'users.view'
    },
    {
      title: 'Paramètres',
      icon: '⚙️',
      href: '/admin/parametres',
      active: pathname.startsWith('/admin/parametres'),
      permission: 'settings.edit'
    }
  ]

  const visibleMenuItems = menuItems.filter(item => 
    !item.permission || hasPermission(item.permission)
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href="/admin" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
              I
            </div>
            <span className="text-xl font-bold text-gray-900">INFONET Admin</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* User profile */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <img 
              src={user?.avatar || 'https://via.placeholder.com/40'} 
              alt={user?.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
              <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <div className="px-3">
            {visibleMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-3 mb-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  item.active
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.title}
              </Link>
            ))}
          </div>
        </nav>

        {/* Quick Stats */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div className="text-center">
              <div className="font-semibold text-gray-900">24</div>
              <div>Articles</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">156</div>
              <div>Commentaires</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-400 hover:text-gray-600 lg:hidden"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:block text-gray-400 hover:text-gray-600 mr-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Administration INFONET
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.586 11l-7.071 7.071-1.414-1.414 7.071-7.071M15 3c1.1 0 2 .9 2 2v6l-2-2-2 2V5c0-1.1.9-2 2-2z" />
                </svg>
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User menu */}
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                >
                  <img 
                    src={user?.avatar || 'https://via.placeholder.com/32'} 
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-sm text-left">
                    <div className="font-medium text-gray-900">{user?.name}</div>
                    <div className="text-gray-500 capitalize">{user?.role}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Mon Profil
                    </Link>
                    <Link
                      href="/admin/parametres"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Paramètres
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={() => {
                        logout()
                        setUserMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>

              {/* View site link */}
              <Link 
                href="/"
                target="_blank"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Voir le site
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}