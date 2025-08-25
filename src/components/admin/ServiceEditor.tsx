'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { servicesApi } from '@/lib/api-services'
import { useServiceMutations } from '@/hooks/useServices'
import ImageUpload from './ImageUpload'

interface ServiceEditorProps {
  mode: 'create' | 'edit'
  id?: string
}

export default function ServiceEditor({ mode, id }: ServiceEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    detailed_description: '',
    icon: '',
    image_url: '',
    starting_price: '',
    price_unit: '',
    features: [] as string[],
    technologies: [] as string[],
    deliverables: [] as string[],
    duration_estimate: '',
    display_order: 0,
    is_featured: false,
    is_active: true,
    category: '',
  })

  const [featureInput, setFeatureInput] = useState('')
  const [techInput, setTechInput] = useState('')
  const [deliverableInput, setDeliverableInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const mutations = useServiceMutations()

  useEffect(() => {
    const loadData = async () => {
      if (mode === 'edit' && id) {
        try {
          setLoading(true)
          const response = await servicesApi.getById(parseInt(id))
          const service = response.data.data
          
          setFormData({
            name: service.name || '',
            description: service.description || '',
            detailed_description: service.detailed_description || '',
            icon: service.icon || '',
            image_url: service.image_url || '',
            starting_price: service.starting_price?.toString() || '',
            price_unit: service.price_unit || '',
            features: service.features || [],
            technologies: service.technologies || [],
            deliverables: service.deliverables || [],
            duration_estimate: service.duration_estimate || '',
            display_order: service.display_order || 0,
            is_featured: service.is_featured || false,
            is_active: service.is_active || true,
            category: service.category || '',
          })
        } catch (error) {
          console.error('Error loading service:', error)
          setErrors({ general: 'Erreur lors du chargement du service' })
        } finally {
          setLoading(false)
        }
      }
    }

    loadData()
  }, [mode, id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSaving(true)

    try {
      const payload = {
        ...formData,
        starting_price: formData.starting_price ? parseFloat(formData.starting_price) : undefined,
        display_order: parseInt(formData.display_order.toString()) || 0
      }

      if (mode === 'create') {
        await mutations.createService(payload, {
          onSuccess: () => {
            router.push('/admin/services')
          },
        })
      } else if (id) {
        await mutations.updateService(parseInt(id), payload, {
          onSuccess: () => {
            router.push('/admin/services')
          },
        })
      }
    } catch (error: any) {
      console.error('Error saving service:', error)
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        setErrors({ 
          general: error.response?.data?.message || 'Erreur lors de la sauvegarde' 
        })
      }
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        features: [...prev.features, featureInput.trim()] 
      }))
      setFeatureInput('')
    }
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      features: prev.features.filter((_, i) => i !== index) 
    }))
  }

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        technologies: [...prev.technologies, techInput.trim()] 
      }))
      setTechInput('')
    }
  }

  const removeTechnology = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      technologies: prev.technologies.filter((_, i) => i !== index) 
    }))
  }

  const addDeliverable = () => {
    if (deliverableInput.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        deliverables: [...prev.deliverables, deliverableInput.trim()] 
      }))
      setDeliverableInput('')
    }
  }

  const removeDeliverable = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      deliverables: prev.deliverables.filter((_, i) => i !== index) 
    }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Nouveau Service' : 'Modifier le Service'}
          </h1>
          <p className="text-gray-600">
            {mode === 'create' 
              ? 'Créez un nouveau service' 
              : 'Modifiez les informations du service'
            }
          </p>
        </div>
        <Link
          href="/admin/services"
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Retour à la liste
        </Link>
      </div>

      {/* Error Alert */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-6">Informations de base</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom du service *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Nom du service"
                required
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description courte *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Description courte du service"
                required
              />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="detailed_description" className="block text-sm font-medium text-gray-700 mb-2">
                Description détaillée
              </label>
              <textarea
                id="detailed_description"
                value={formData.detailed_description}
                onChange={(e) => handleInputChange('detailed_description', e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Description détaillée du service"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <input
                type="text"
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Catégorie du service"
              />
            </div>

            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                Icône (emoji)
              </label>
              <input
                type="text"
                id="icon"
                value={formData.icon}
                onChange={(e) => handleInputChange('icon', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="🚀"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image du service
              </label>
              <ImageUpload
                module="services"
                onImageUploaded={(imageData) => {
                  handleInputChange('image_url', imageData.url);
                }}
                currentImageUrl={formData.image_url}
                altText={formData.name}
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-6">Tarification</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="starting_price" className="block text-sm font-medium text-gray-700 mb-2">
                Prix de départ
              </label>
              <input
                type="number"
                id="starting_price"
                step="0.01"
                value={formData.starting_price}
                onChange={(e) => handleInputChange('starting_price', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="price_unit" className="block text-sm font-medium text-gray-700 mb-2">
                Unité de prix
              </label>
              <input
                type="text"
                id="price_unit"
                value={formData.price_unit}
                onChange={(e) => handleInputChange('price_unit', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="par heure, par projet, par mois..."
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="duration_estimate" className="block text-sm font-medium text-gray-700 mb-2">
                Durée estimée
              </label>
              <input
                type="text"
                id="duration_estimate"
                value={formData.duration_estimate}
                onChange={(e) => handleInputChange('duration_estimate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2-4 semaines, 3 mois, etc."
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-6">Fonctionnalités</h2>
          
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ajouter une fonctionnalité"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-6">Technologies</h2>
          
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ajouter une technologie"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Ajouter
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(index)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-6">Livrables</h2>
          
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={deliverableInput}
                onChange={(e) => setDeliverableInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDeliverable())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ajouter un livrable"
              />
              <button
                type="button"
                onClick={addDeliverable}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Ajouter
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.deliverables.map((deliverable, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
              >
                {deliverable}
                <button
                  type="button"
                  onClick={() => removeDeliverable(index)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-6">Paramètres</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="display_order" className="block text-sm font-medium text-gray-700 mb-2">
                Ordre d'affichage
              </label>
              <input
                type="number"
                id="display_order"
                value={formData.display_order}
                onChange={(e) => handleInputChange('display_order', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
                Service vedette
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => handleInputChange('is_active', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                Service actif
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/services"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={saving || mutations.loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving || mutations.loading ? 'Sauvegarde...' : (mode === 'create' ? 'Créer' : 'Mettre à jour')}
          </button>
        </div>
      </form>
    </div>
  )
}