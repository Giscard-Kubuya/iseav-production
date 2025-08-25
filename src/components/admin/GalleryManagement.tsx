'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useGalleryItems, useGalleryItemMutations } from '@/hooks/useGalleryItems'
import { useDebounce } from '@/hooks/useApi'
import { GalleryItem } from '@/lib/api'
import GalleryEditor from './GalleryEditor'


export default function GalleryManagement() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [showEditor, setShowEditor] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data: galleryItems, loading, error, updateParams, refetch } = useGalleryItems()
  const mutations = useGalleryItemMutations()

  // Filter gallery items locally to avoid API loop issues
  const filteredGalleryItems = useMemo(() => {
    if (!galleryItems) return []
    
    return galleryItems.filter(item => {
      // Filter by category
      if (filter !== 'all' && ['events', 'office', 'team', 'projects', 'awards', 'training'].includes(filter)) {
        if (item.category !== filter) return false
      }
      
      // Filter by special flags
      if (filter === 'featured' && !item.featured) return false
      if (filter === 'published' && !item.published) return false
      
      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase()
        return item.title.toLowerCase().includes(searchLower) || 
               item.description?.toLowerCase().includes(searchLower)
      }
      
      return true
    })
  }, [galleryItems, filter, debouncedSearch])

  const categories = {
    events: 'Événements',
    office: 'Bureaux',
    team: 'Équipe',
    projects: 'Projets',
    awards: 'Récompenses',
    training: 'Formations'
  }

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      try {
        await mutations.deleteItem(id, {
          onSuccess: () => {
            refetch()
            setSelectedItems(prev => prev.filter(itemId => itemId !== id))
          }
        })
      } catch (error) {
        console.error('Error deleting gallery item:', error)
      }
    }
  }

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedItems.length} image(s) ?`)) {
      try {
        await Promise.all(selectedItems.map(id => mutations.deleteItem(id)))
        refetch()
        setSelectedItems([])
      } catch (error) {
        console.error('Error bulk deleting gallery items:', error)
      }
    }
  }

  const handleToggleFeatured = async (id: number) => {
    try {
      await mutations.toggleFeatured(id, {
        onSuccess: () => {
          refetch()
        }
      })
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  const handleTogglePublished = async (id: number) => {
    try {
      await mutations.togglePublished(id, {
        onSuccess: () => {
          refetch()
        }
      })
    } catch (error) {
      console.error('Error toggling published:', error)
    }
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === (galleryItems?.length || 0)) {
      setSelectedItems([])
    } else {
      setSelectedItems(galleryItems?.map(item => item.id) || [])
    }
  }

  const totalSize = (galleryItems?.length || 0) * 2.5 // Estimation en MB
  const totalViews = galleryItems?.reduce((sum, item) => sum + item.views, 0) || 0
  const totalDownloads = galleryItems?.reduce((sum, item) => sum + item.downloads, 0) || 0

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Erreur lors du chargement de la galerie: {error}
      </div>
    )
  }

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
          <button 
            onClick={() => setShowEditor(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Ajouter une Image
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
        
        {galleryItems && galleryItems.length > 0 && (
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.length === galleryItems.length}
                onChange={handleSelectAll}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Sélectionner tout ({galleryItems.length})
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
              <p className="text-2xl font-bold text-gray-900">{galleryItems?.length || 0}</p>
              <p className="text-gray-600">Total Images</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⭐</div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{galleryItems?.filter(item => item.featured).length || 0}</p>
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
        {filteredGalleryItems && filteredGalleryItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGalleryItems.map((item) => (
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
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => window.open(item.image_url, '_blank')}
                  />
                </div>

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.open(item.image_url, '_blank')}
                      className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                      title="Voir l'image"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => {
                        setEditingItem(item)
                        setShowEditor(true)
                      }}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(item.id)}
                      className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                      title="Basculer en vedette"
                    >
                      ⭐
                    </button>
                    <button
                      onClick={() => handleTogglePublished(item.id)}
                      className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                      title={item.published ? 'Rendre privé' : 'Publier'}
                    >
                      {item.published ? '🔒' : '🌐'}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      title="Supprimer"
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
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>👀 {item.views}</span>
                    <span>📥 {item.downloads}</span>
                  </div>
                  
                  {(() => {
                    const tags = item.tags || []
                    return tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-1 py-0.5 text-xs bg-gray-200 text-gray-700 rounded">
                            #{tag}
                          </span>
                        ))}
                        {tags.length > 2 && (
                          <span className="px-1 py-0.5 text-xs bg-gray-200 text-gray-700 rounded">
                            +{tags.length - 2}
                          </span>
                        )}
                      </div>
                    )
                  })()}
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

      {/* Gallery Editor Modal */}
      {showEditor && (
        <GalleryEditor
          item={editingItem || undefined}
          onClose={() => {
            setShowEditor(false)
            setEditingItem(null)
          }}
          onSuccess={() => {
            refetch()
          }}
        />
      )}
    </div>
  )
}