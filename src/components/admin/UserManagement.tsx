'use client'

import { useState } from 'react'
import Link from 'next/link'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'author' | 'subscriber'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  lastLogin: string
  createdAt: string
  avatar: string
  permissions: string[]
  department: string
  phone: string
  loginCount: number
  articlesCount: number
  commentsCount: number
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Jean-Baptiste Niyonzima',
      email: 'jb.niyonzima@infonet.bi',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-01-22 14:30',
      createdAt: '2024-01-15',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      permissions: ['all'],
      department: 'Direction',
      phone: '+257 79 123 456',
      loginCount: 245,
      articlesCount: 12,
      commentsCount: 8
    },
    {
      id: 2,
      name: 'Espérance Mukamana',
      email: 'e.mukamana@infonet.bi',
      role: 'editor',
      status: 'active',
      lastLogin: '2025-01-22 11:15',
      createdAt: '2024-02-20',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      permissions: ['blog.edit', 'actualites.edit', 'comments.moderate'],
      department: 'Contenu',
      phone: '+257 68 789 012',
      loginCount: 189,
      articlesCount: 28,
      commentsCount: 15
    },
    {
      id: 3,
      name: 'Arlette Uwimana',
      email: 'a.uwimana@infonet.bi',
      role: 'author',
      status: 'active',
      lastLogin: '2025-01-21 16:45',
      createdAt: '2024-03-10',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      permissions: ['blog.create', 'actualites.create'],
      department: 'Marketing',
      phone: '+257 75 345 678',
      loginCount: 156,
      articlesCount: 15,
      commentsCount: 4
    },
    {
      id: 4,
      name: 'Patrick Ndayizeye',
      email: 'p.ndayizeye@infonet.bi',
      role: 'author',
      status: 'inactive',
      lastLogin: '2025-01-18 09:30',
      createdAt: '2024-04-05',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      permissions: ['blog.create'],
      department: 'Technique',
      phone: '+257 62 901 234',
      loginCount: 87,
      articlesCount: 7,
      commentsCount: 2
    },
    {
      id: 5,
      name: 'Marie-Claire Bizimana',
      email: 'mc.bizimana@gmail.com',
      role: 'subscriber',
      status: 'pending',
      lastLogin: 'Jamais connecté',
      createdAt: '2025-01-20',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      permissions: ['comments.create'],
      department: 'Externe',
      phone: '+257 79 567 890',
      loginCount: 0,
      articlesCount: 0,
      commentsCount: 0
    }
  ])

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const roles = {
    admin: 'Administrateur',
    editor: 'Éditeur',
    author: 'Auteur',
    subscriber: 'Abonné'
  }

  const statusLabels = {
    active: 'Actif',
    inactive: 'Inactif',
    pending: 'En attente',
    suspended: 'Suspendu'
  }

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.role === filter || user.status === filter
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleDeleteUser = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedUsers.length} utilisateur(s) ?`)) {
      setUsers(users.filter(user => !selectedUsers.includes(user.id)))
      setSelectedUsers([])
    }
  }

  const handleStatusChange = (id: number, newStatus: User['status']) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ))
  }

  const handleRoleChange = (id: number, newRole: User['role']) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ))
  }

  const handleSelectUser = (id: number) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(userId => userId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id))
    }
  }

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800'
    }
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    )
  }

  const getRoleBadge = (role: string) => {
    const roleClasses = {
      admin: 'bg-purple-100 text-purple-800',
      editor: 'bg-blue-100 text-blue-800',
      author: 'bg-green-100 text-green-800',
      subscriber: 'bg-gray-100 text-gray-800'
    }
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${roleClasses[role as keyof typeof roleClasses]}`}>
        {roles[role as keyof typeof roles]}
      </span>
    )
  }

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const pendingUsers = users.filter(u => u.status === 'pending').length
  const adminUsers = users.filter(u => u.role === 'admin').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600">Gérez les comptes utilisateurs et leurs permissions</p>
        </div>
        <div className="flex space-x-3">
          {selectedUsers.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Supprimer ({selectedUsers.length})
            </button>
          )}
          <button 
            onClick={() => {
              setEditingUser(null)
              setShowUserModal(true)
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nouvel Utilisateur
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les utilisateurs</option>
            <optgroup label="Par rôle">
              {Object.entries(roles).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </optgroup>
            <optgroup label="Par statut">
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
              <option value="pending">En attente</option>
              <option value="suspended">Suspendus</option>
            </optgroup>
          </select>
        </div>
        
        {filteredUsers.length > 0 && (
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedUsers.length === filteredUsers.length}
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Sélectionner tout ({filteredUsers.length})
              </span>
            </label>
            {selectedUsers.length > 0 && (
              <span className="text-sm text-gray-600">
                {selectedUsers.length} utilisateur(s) sélectionné(s)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👥</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              <p className="text-gray-600">Total Utilisateurs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">✅</div>
            <div>
              <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
              <p className="text-gray-600">Actifs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⏳</div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{pendingUsers}</p>
              <p className="text-gray-600">En attente</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👑</div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{adminUsers}</p>
              <p className="text-gray-600">Administrateurs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle & Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière connexion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-4"
                      />
                      <div className="flex items-center">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="h-10 w-10 rounded-full mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.phone}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>👆 {user.loginCount} connexions</div>
                    <div>📝 {user.articlesCount} articles</div>
                    <div>💬 {user.commentsCount} commentaires</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col space-y-1">
                      <div className="space-x-2">
                        <button
                          onClick={() => {
                            setEditingUser(user)
                            setShowUserModal(true)
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Modifier
                        </button>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as User['role'])}
                          className="text-xs border border-gray-300 rounded px-1 py-0.5"
                        >
                          {Object.entries(roles).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-x-2">
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                          className="text-xs border border-gray-300 rounded px-1 py-0.5"
                        >
                          {Object.entries(statusLabels).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Aucun utilisateur trouvé</div>
          <p className="text-gray-400 mt-2">
            {searchTerm ? 'Essayez un autre terme de recherche' : 'Commencez par créer votre premier utilisateur'}
          </p>
        </div>
      )}

      {/* User Modal would go here in a real implementation */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
            </h3>
            <p className="text-gray-600 mb-4">
              Cette fonctionnalité sera implémentée avec un formulaire complet dans la version finale.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}