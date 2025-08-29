'use client'

import { useAuth } from '@/hooks/useAuth'

export default function AdminHeader() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Administration INFONET</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <span className="sr-only">Notifications</span>
              🔔
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user?.name || 'Utilisateur'}</div>
                <div className="text-gray-500">{user?.email || 'user@infonet.bi'}</div>
              </div>
              <div className="relative">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-brand-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600"
                  title="Se déconnecter"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}