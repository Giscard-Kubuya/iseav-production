'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ActualiteEditorProps {
  mode: 'create' | 'edit'
  id?: string
}

export default function ActualiteEditor({ mode, id }: ActualiteEditorProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Direction INFONET',
    category: 'company' as 'company' | 'projects' | 'partnerships' | 'events' | 'awards',
    urgent: false,
    featured: false,
    status: 'draft' as 'draft' | 'published',
    publishDate: '',
    metaTitle: '',
    metaDescription: '',
    image: ''
  })

  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)

  const categories = [
    { value: 'company', label: 'Entreprise' },
    { value: 'projects', label: 'Projets' },
    { value: 'partnerships', label: 'Partenariats' },
    { value: 'events', label: 'Événements' },
    { value: 'awards', label: 'Récompenses' }
  ]

  useEffect(() => {
    if (mode === 'edit' && id) {
      // En production, ceci ferait appel à une API pour récupérer l'actualité
      const mockData = {
        title: 'INFONET remporte le Prix Innovation IT Burundi 2025',
        content: '<p>INFONET, leader en solutions informatiques au Burundi, vient de remporter le prestigieux Prix Innovation IT Burundi 2025...</p>',
        author: 'Direction INFONET',
        category: 'awards' as const,
        urgent: true,
        featured: true,
        status: 'published' as const,
        publishDate: '2025-01-20',
        metaTitle: 'INFONET Prix Innovation IT 2025 | Actualités',
        metaDescription: 'INFONET remporte le Prix Innovation IT Burundi 2025 pour ses solutions innovantes.',
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
      setFormData(mockData)
    }
  }, [mode, id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // En production, ceci ferait appel à une API
      await new Promise(resolve => setTimeout(resolve, 1000))

      alert(mode === 'create' ? 'Actualité créée avec succès!' : 'Actualité mise à jour avec succès!')
      router.push('/admin/actualites')
    } catch (error) {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveDraft = async () => {
    const updatedData = { ...formData, status: 'draft' as const }
    setFormData(updatedData)
    setSaving(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Brouillon sauvegardé!')
    } catch (error) {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Créer une Nouvelle Actualité' : 'Modifier l\'Actualité'}
          </h1>
          <p className="text-gray-600">
            {mode === 'create' ? 'Rédigez une nouvelle actualité' : 'Modifiez le contenu de votre actualité'}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/actualites"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </Link>
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder brouillon'}
          </button>
          <button
            onClick={() => setPreview(!preview)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {preview ? 'Éditer' : 'Aperçu'}
          </button>
        </div>
      </div>

      {!preview ? (
        /* Editor Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'actualité *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Entrez le titre de votre actualité"
                />
              </div>

              {/* Content */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu de l'actualité *
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={20}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                  placeholder="Écrivez votre actualité en HTML. Vous pouvez utiliser des balises comme <h2>, <p>, <ul>, <li>, etc."
                />
                <p className="text-xs text-gray-500 mt-2">
                  Astuce: Utilisez HTML pour le formatage. Exemple: &lt;h2&gt;Titre de section&lt;/h2&gt;
                </p>
              </div>

              {/* SEO */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Optimisation SEO</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre Meta (SEO)
                    </label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Titre optimisé pour les moteurs de recherche"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description Meta (SEO)
                    </label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Description pour les moteurs de recherche"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Publication</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de publication
                    </label>
                    <input
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="urgent"
                      checked={formData.urgent}
                      onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="urgent" className="ml-2 block text-sm text-gray-900">
                      Actualité urgente
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      Actualité en vedette
                    </label>
                  </div>
                </div>
              </div>

              {/* Category and Author */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Catégorie et Auteur</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auteur
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Image de couverture</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de l'image
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image && (
                    <div className="mt-3">
                      <img
                        src={formData.image}
                        alt="Aperçu"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
                >
                  {saving ? 'Sauvegarde...' : (mode === 'create' ? 'Publier l\'actualité' : 'Mettre à jour')}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        /* Preview */
        <div className="bg-white rounded-lg shadow p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full mr-4">
                  {categories.find(c => c.value === formData.category)?.label}
                </span>
                <span>Par {formData.author}</span>
                <span className="mx-2">•</span>
                <span>{formData.publishDate || 'Date non définie'}</span>
                {formData.urgent && (
                  <span className="ml-4 bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                    🚨 Urgent
                  </span>
                )}
                {formData.featured && (
                  <span className="ml-2 bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                    ⭐ En vedette
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {formData.title || 'Titre de l\'actualité'}
              </h1>
              {formData.image && (
                <img 
                  src={formData.image} 
                  alt={formData.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"
                />
              )}
            </div>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.content || '<p>Contenu de l\'actualité...</p>' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}