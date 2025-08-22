'use client'

import { useState } from 'react'
import Link from 'next/link'

interface GalleryItem {
  id: number
  title: string
  description: string
  category: 'events' | 'office' | 'team' | 'projects' | 'awards' | 'training'
  imageUrl: string
  uploadDate: string
  uploader: string
  tags: string[]
  featured: boolean
  published: boolean
  views: number
  downloads: number
}

export default function GalleryManagement() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: 1,
      title: 'Cérémonie Prix Innovation IT 2025',
      description: 'INFONET reçoit le prestigieux Prix Innovation IT Burundi 2025',
      category: 'awards',
      imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      uploadDate: '2025-01-20',
      uploader: 'Direction INFONET',
      tags: ['prix', 'innovation', 'reconnaissance'],
      featured: true,
      published: true,
      views: 456,
      downloads: 23
    },
    {
      id: 2,
      title: 'Équipe INFONET 2025',
      description: 'Photo officielle de l\'équipe INFONET pour l\'année 2025',
      category: 'team',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      uploadDate: '2025-01-15',
      uploader: 'RH Department',
      tags: ['équipe', 'photo officielle', '2025'],
      featured: true,
      published: true,
      views: 234,
      downloads: 12
    },
    {
      id: 3,
      title: 'Formation Cloud Computing',
      description: 'Session de formation sur les technologies cloud organisée pour nos clients',
      category: 'training',
      imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      uploadDate: '2025-01-10',
      uploader: 'Équipe Formation',
      tags: ['formation', 'cloud', 'clients'],
      featured: false,
      published: true,
      views: 189,
      downloads: 8
    },
    {
      id: 4,
      title: 'Nouveaux Bureaux INFONET',
      description: 'Inauguration de nos nouveaux bureaux modernes à Bujumbura',
      category: 'office',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      uploadDate: '2024-12-15',
      uploader: 'Direction INFONET',
      tags: ['bureaux', 'inauguration', 'moderne'],
      featured: false,
      published: true,
      views: 312,
      downloads: 15
    }
  ])

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const categories = {
    events: 'Événements',
    office: 'Bureaux',
    team: 'Équipe',
    projects: 'Projets',
    awards: 'Récompenses',
    training: 'Formations'
  }

  const filteredItems = galleryItems.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter || 
                         (filter === 'featured' && item.featured) ||
                         (filter === 'published' && item.published)
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      setGalleryItems(galleryItems.filter(item => item.id !== id))
    }
  }

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedItems.length} image(s) ?`)) {
      setGalleryItems(galleryItems.filter(item => !selectedItems.includes(item.id)))
      setSelectedItems([])
    }
  }

  const handleToggleFeatured = (id: number) => {
    setGalleryItems(galleryItems.map(item => 
      item.id === id ? { ...item, featured: !item.featured } : item
    ))
  }

  const handleTogglePublished = (id: number) => {
    setGalleryItems(galleryItems.map(item => 
      item.id === id ? { ...item, published: !item.published } : item
    ))
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map(item => item.id))
    }
  }

  const totalSize = galleryItems.length * 2.5 // Estimation en MB
  const totalViews = galleryItems.reduce((sum, item) => sum + item.views, 0)
  const totalDownloads = galleryItems.reduce((sum, item) => sum + item.downloads, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion de la Galerie</h1>
          <p className="text-gray-600">Gérez toutes vos images et médias</p>
        </div>
        <div className="flex space-x-3">
          {selectedItems.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Supprimer ({selectedItems.length})
            </button>
          )}
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Uploader des Images
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher dans la galerie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">Toutes les images</option>
            <optgroup label="Par catégorie">
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </optgroup>
            <optgroup label="Par statut">
              <option value="featured">En vedette</option>
              <option value="published">Publiées</option>
            </optgroup>
          </select>
        </div>
        
        {filteredItems.length > 0 && (
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.length === filteredItems.length}
                onChange={handleSelectAll}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Sélectionner tout ({filteredItems.length})
              </span>
            </label>
            {selectedItems.length > 0 && (
              <span className="text-sm text-gray-600">
                {selectedItems.length} image(s) sélectionnée(s)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">🖼️</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{galleryItems.length}</p>
              <p className="text-gray-600">Total Images</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⭐</div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{galleryItems.filter(item => item.featured).length}</p>
              <p className="text-gray-600">En vedette</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">👀</div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</p>
              <p className="text-gray-600">Vues Total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">💾</div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{totalSize.toFixed(1)} MB</p>
              <p className="text-gray-600">Taille Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="bg-white rounded-lg shadow p-6">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Selection checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                </div>

                {/* Status badges */}
                <div className="absolute top-3 right-3 z-10 flex space-x-1">
                  {item.featured && (
                    <span className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-full">
                      ⭐
                    </span>
                  )}
                  {!item.published && (
                    <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                      Privé
                    </span>
                  )}
                </div>

                {/* Image */}
                <div className="aspect-square">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => window.open(item.imageUrl, '_blank')}
                  />
                </div>

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.open(item.imageUrl, '_blank')}
                      className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(item.id)}
                      className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      ⭐
                    </button>
                    <button
                      onClick={() => handleTogglePublished(item.id)}
                      className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {item.published ? '🔒' : '🌐'}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      {categories[item.category]}
                    </span>
                    <span>{item.uploadDate}</span>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>👀 {item.views}</span>
                    <span>📥 {item.downloads}</span>
                  </div>
                  
                  {item.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-1 py-0.5 text-xs bg-gray-200 text-gray-700 rounded">
                          #{tag}
                        </span>
                      ))}
                      {item.tags.length > 2 && (
                        <span className="px-1 py-0.5 text-xs bg-gray-200 text-gray-700 rounded">
                          +{item.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Aucune image trouvée</div>
            <p className="text-gray-400 mt-2">
              {searchTerm ? 'Essayez un autre terme de recherche' : 'Commencez par uploader vos premières images'}
            </p>
          </div>
        )}
      </div>

      {/* Upload modal would go here in a real implementation */}
    </div>
  )
}