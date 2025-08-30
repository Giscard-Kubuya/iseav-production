'use client'

import { useState, useEffect } from 'react'
import { useGalleryItemMutations } from '@/hooks/useGalleryItems'
import { GalleryItem } from '@/lib/api'
import ImageUpload from './ImageUpload'

interface GalleryEditorProps {
  item?: GalleryItem
  onClose: () => void
  onSuccess: () => void
}

export default function GalleryEditor({ item, onClose, onSuccess }: GalleryEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'events' as 'events' | 'office' | 'team' | 'projects' | 'awards' | 'training',
    image_url: '',
    tags: '',
    featured: false,
    published: true,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutations = useGalleryItemMutations()

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || '',
        description: item.description || '',
        category: item.category,
        image_url: item.image_url || '',
        tags: item.tags ? (Array.isArray(item.tags) ? item.tags.join(', ') : '') : '',
        featured: item.featured || false,
        published: item.published !== undefined ? item.published : true,
      })
    }
  }, [item])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      const submitData = {
        title: formData.title,
        description: formData.description || undefined,
        category: formData.category,
        image_url: formData.image_url,
        tags: tagsArray.length > 0 ? JSON.stringify(tagsArray) : '',
        featured: formData.featured ? 1 : 0,
        published: formData.published ? 1 : 0,
      } as any // Type assertion to bypass TypeScript checking for API submission

      if (item) {
        await mutations.updateItem(item.id, submitData, {
          onSuccess: () => {
            onSuccess()
            onClose()
          }
        })
      } else {
        await mutations.createItem(submitData, {
          onSuccess: () => {
            onSuccess()
            onClose()
          }
        })
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const categories = {
    events: 'Événements',
    office: 'Bureaux', 
    team: 'Équipe',
    projects: 'Projets',
    awards: 'Récompenses',
    training: 'Formations'
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(3px)' }}>
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {item ? 'Modifier l\'image' : 'Ajouter une image'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Catégorie *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image de galerie *
            </label>
            <ImageUpload
              module="gallery"
              onImageUploaded={(imageData) => {
                setFormData(prev => ({ ...prev, image_url: imageData.url }));
              }}
              currentImageUrl={formData.image_url}
              altText={formData.title}
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="tag1, tag2, tag3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Séparez les tags par des virgules
            </p>
          </div>

          <div className="flex space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                En vedette
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                Publié
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Sauvegarde...' : (item ? 'Modifier' : 'Ajouter')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}