'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Comment {
  id: number
  author: string
  email: string
  content: string
  status: 'pending' | 'approved' | 'rejected' | 'spam'
  createdAt: string
  postId: number
  postTitle: string
  postType: 'blog' | 'actualite' | 'portfolio'
  likes: number
  replies: number
  isReply: boolean
  parentId?: number
  authorAvatar?: string
  authorWebsite?: string
  ipAddress: string
  userAgent: string
}

export default function CommentsManagement() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Marie Uwimana',
      email: 'marie.uwimana@gmail.com',
      content: 'Excellent article! Très informatif et bien écrit. J\'aimerais en savoir plus sur ce sujet.',
      status: 'approved',
      createdAt: '2025-01-22 10:30',
      postId: 1,
      postTitle: 'Les Tendances Technologiques 2025 au Burundi',
      postType: 'blog',
      likes: 5,
      replies: 2,
      isReply: false,
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      authorWebsite: 'https://marie-uwimana.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 2,
      author: 'Jean Niyonzima',
      email: 'jean.niyonzima@email.com',
      content: 'Merci pour ce partage, c\'est exactement ce que je cherchais.',
      status: 'approved',
      createdAt: '2025-01-22 09:15',
      postId: 1,
      postTitle: 'Les Tendances Technologiques 2025 au Burundi',
      postType: 'blog',
      likes: 3,
      replies: 0,
      isReply: true,
      parentId: 1,
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: 3,
      author: 'Patrick Bizimana',
      email: 'patrick.bizimana@yahoo.com',
      content: 'Félicitations pour ce prix bien mérité! INFONET continue de nous impressionner.',
      status: 'pending',
      createdAt: '2025-01-21 16:45',
      postId: 2,
      postTitle: 'INFONET remporte le Prix Innovation IT Burundi 2025',
      postType: 'actualite',
      likes: 0,
      replies: 0,
      isReply: false,
      ipAddress: '172.16.0.25',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15'
    },
    {
      id: 4,
      author: 'Anonymous User',
      email: 'spam@fake-domain.com',
      content: 'Click here for amazing deals! Buy now and get 90% off on everything!!!',
      status: 'spam',
      createdAt: '2025-01-21 14:20',
      postId: 1,
      postTitle: 'Les Tendances Technologiques 2025 au Burundi',
      postType: 'blog',
      likes: 0,
      replies: 0,
      isReply: false,
      ipAddress: '203.0.113.10',
      userAgent: 'Mozilla/5.0 (compatible; SomeBot/1.0; +http://www.somebot.com/)'
    },
    {
      id: 5,
      author: 'Claire Nibigira',
      email: 'claire.nibigira@infonet.bi',
      content: 'Super projet! L\'équipe a fait un travail remarquable. Bravo à tous!',
      status: 'approved',
      createdAt: '2025-01-20 11:30',
      postId: 3,
      postTitle: 'Système de Gestion Hospitalière CHU Kamenge',
      postType: 'portfolio',
      likes: 8,
      replies: 1,
      isReply: false,
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      ipAddress: '192.168.1.15',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  ])

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedComments, setSelectedComments] = useState<number[]>([])
  const [bulkAction, setBulkAction] = useState('')

  const statusLabels = {
    pending: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    spam: 'Spam'
  }

  const postTypeLabels = {
    blog: 'Article de blog',
    actualite: 'Actualité',
    portfolio: 'Projet'
  }

  const filteredComments = comments.filter(comment => {
    const matchesFilter = filter === 'all' || 
                         comment.status === filter || 
                         comment.postType === filter
    const matchesSearch = comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleStatusChange = (id: number, newStatus: Comment['status']) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, status: newStatus } : comment
    ))
  }

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      setComments(comments.filter(comment => comment.id !== id))
    }
  }

  const handleBulkAction = () => {
    if (selectedComments.length === 0 || !bulkAction) return
    
    if (bulkAction === 'delete') {
      if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedComments.length} commentaire(s) ?`)) {
        setComments(comments.filter(comment => !selectedComments.includes(comment.id)))
        setSelectedComments([])
      }
    } else {
      setComments(comments.map(comment => 
        selectedComments.includes(comment.id) 
          ? { ...comment, status: bulkAction as Comment['status'] }
          : comment
      ))
      setSelectedComments([])
    }
    setBulkAction('')
  }

  const handleSelectComment = (id: number) => {
    setSelectedComments(prev => 
      prev.includes(id) 
        ? prev.filter(commentId => commentId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([])
    } else {
      setSelectedComments(filteredComments.map(comment => comment.id))
    }
  }

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      spam: 'bg-gray-100 text-gray-800'
    }
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    )
  }

  const totalComments = comments.length
  const pendingComments = comments.filter(c => c.status === 'pending').length
  const approvedComments = comments.filter(c => c.status === 'approved').length
  const spamComments = comments.filter(c => c.status === 'spam').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Commentaires</h1>
          <p className="text-gray-600">Modérez et gérez tous les commentaires du site</p>
        </div>
        <div className="flex space-x-3">
          {selectedComments.length > 0 && (
            <div className="flex items-center space-x-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Actions en lot</option>
                <option value="approved">Approuver</option>
                <option value="pending">Mettre en attente</option>
                <option value="rejected">Rejeter</option>
                <option value="spam">Marquer comme spam</option>
                <option value="delete">Supprimer</option>
              </select>
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Appliquer ({selectedComments.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher dans les commentaires..."
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
            <option value="all">Tous les commentaires</option>
            <optgroup label="Par statut">
              <option value="pending">En attente</option>
              <option value="approved">Approuvés</option>
              <option value="rejected">Rejetés</option>
              <option value="spam">Spam</option>
            </optgroup>
            <optgroup label="Par type de contenu">
              <option value="blog">Articles de blog</option>
              <option value="actualite">Actualités</option>
              <option value="portfolio">Projets</option>
            </optgroup>
          </select>
        </div>
        
        {filteredComments.length > 0 && (
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedComments.length === filteredComments.length}
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Sélectionner tout ({filteredComments.length})
              </span>
            </label>
            {selectedComments.length > 0 && (
              <span className="text-sm text-gray-600">
                {selectedComments.length} commentaire(s) sélectionné(s)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">💬</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalComments}</p>
              <p className="text-gray-600">Total Commentaires</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⏳</div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{pendingComments}</p>
              <p className="text-gray-600">En attente</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">✅</div>
            <div>
              <p className="text-2xl font-bold text-green-600">{approvedComments}</p>
              <p className="text-gray-600">Approuvés</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🚫</div>
            <div>
              <p className="text-2xl font-bold text-red-600">{spamComments}</p>
              <p className="text-gray-600">Spam</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y divide-gray-200">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="p-6">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedComments.includes(comment.id)}
                  onChange={() => handleSelectComment(comment.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                
                <div className="flex-shrink-0">
                  {comment.authorAvatar ? (
                    <img
                      src={comment.authorAvatar}
                      alt={comment.author}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {comment.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {comment.author}
                      </h3>
                      {getStatusBadge(comment.status)}
                      <span className="text-xs text-gray-500">
                        {postTypeLabels[comment.postType]}
                      </span>
                      {comment.isReply && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Réponse
                        </span>
                      )}
                    </div>
                    <time className="text-sm text-gray-500">
                      {comment.createdAt}
                    </time>
                  </div>
                  
                  <div className="mt-1">
                    <p className="text-sm text-gray-600">{comment.email}</p>
                    {comment.authorWebsite && (
                      <a 
                        href={comment.authorWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {comment.authorWebsite}
                      </a>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm text-gray-900">{comment.content}</p>
                  </div>
                  
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>
                      Sur: <Link 
                        href={`/${comment.postType}/${comment.postId}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {comment.postTitle}
                      </Link>
                    </span>
                    <span>👍 {comment.likes}</span>
                    <span>💬 {comment.replies}</span>
                  </div>
                  
                  <div className="mt-3 flex items-center space-x-2">
                    <select
                      value={comment.status}
                      onChange={(e) => handleStatusChange(comment.id, e.target.value as Comment['status'])}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      {Object.entries(statusLabels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                    
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(comment.email)
                        alert('Email copié dans le presse-papiers')
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Copier email
                    </button>
                    
                    <button
                      onClick={() => alert(`IP: ${comment.ipAddress}\nUser Agent: ${comment.userAgent}`)}
                      className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Infos tech
                    </button>
                    
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredComments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Aucun commentaire trouvé</div>
          <p className="text-gray-400 mt-2">
            {searchTerm ? 'Essayez un autre terme de recherche' : 'Aucun commentaire pour le moment'}
          </p>
        </div>
      )}
    </div>
  )
}