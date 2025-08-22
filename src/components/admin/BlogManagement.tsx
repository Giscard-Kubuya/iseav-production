'use client'

import { useState } from 'react'
import Link from 'next/link'

interface BlogPost {
  id: number
  title: string
  author: string
  category: string
  status: 'published' | 'draft' | 'scheduled'
  publishDate: string
  views: number
  comments: number
  featured: boolean
}

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'Les Tendances Technologiques 2025 au Burundi',
      author: 'Jean-Baptiste Niyonzima',
      category: 'Technology',
      status: 'published',
      publishDate: '15 Jan 2025',
      views: 1247,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: 'Comment Sécuriser votre Infrastructure IT',
      author: 'Espérance Mukamana',
      category: 'Security',
      status: 'published',
      publishDate: '10 Jan 2025',
      views: 892,
      comments: 15,
      featured: false
    },
    {
      id: 3,
      title: 'Développement d\'Applications Mobiles : Best Practices',
      author: 'Arlette Uwimana',
      category: 'Development',
      status: 'draft',
      publishDate: '8 Jan 2025',
      views: 0,
      comments: 0,
      featured: false
    }
  ])

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' || post.status === filter
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setPosts(posts.filter(post => post.id !== id))
    }
  }

  const handleToggleFeatured = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, featured: !post.featured } : post
    ))
  }

  const handleStatusChange = (id: number, newStatus: 'published' | 'draft') => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: newStatus } : post
    ))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Publié</span>
      case 'draft':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Brouillon</span>
      case 'scheduled':
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Programmé</span>
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{status}</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Articles de Blog</h1>
          <p className="text-gray-600">Gérez tous vos articles de blog depuis cette interface</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nouvel Article
        </Link>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher un article..."
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
            <option value="all">Tous les statuts</option>
            <option value="published">Publiés</option>
            <option value="draft">Brouillons</option>
            <option value="scheduled">Programmés</option>
          </select>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📝</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              <p className="text-gray-600">Total Articles</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">✅</div>
            <div>
              <p className="text-2xl font-bold text-green-600">{posts.filter(p => p.status === 'published').length}</p>
              <p className="text-gray-600">Publiés</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">📋</div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{posts.filter(p => p.status === 'draft').length}</p>
              <p className="text-gray-600">Brouillons</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⭐</div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{posts.filter(p => p.featured).length}</p>
              <p className="text-gray-600">En vedette</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statistiques
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          {post.featured && (
                            <span className="ml-2 text-yellow-500">⭐</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{post.category}</div>
                        <div className="text-xs text-gray-400">{post.publishDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(post.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>👀 {post.views} vues</div>
                    <div>💬 {post.comments} commentaires</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/blog/${post.id}`}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Voir
                    </Link>
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleToggleFeatured(post.id)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      {post.featured ? 'Retirer vedette' : 'Mettre en vedette'}
                    </button>
                    {post.status === 'draft' ? (
                      <button
                        onClick={() => handleStatusChange(post.id, 'published')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Publier
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(post.id, 'draft')}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        Mettre en brouillon
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Aucun article trouvé</div>
          <p className="text-gray-400 mt-2">
            {searchTerm ? 'Essayez un autre terme de recherche' : 'Commencez par créer votre premier article'}
          </p>
        </div>
      )}
    </div>
  )
}