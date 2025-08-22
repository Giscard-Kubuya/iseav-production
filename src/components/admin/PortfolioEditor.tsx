'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface PortfolioEditorProps {
  mode: 'create' | 'edit'
  id?: string
}

export default function PortfolioEditor({ mode, id }: PortfolioEditorProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'web' as 'web' | 'mobile' | 'desktop' | 'cloud' | 'security' | 'network',
    status: 'planned' as 'completed' | 'in_progress' | 'planned',
    startDate: '',
    endDate: '',
    budget: '',
    team: '',
    technologies: '',
    featured: false,
    description: '',
    content: '',
    image: '',
    gallery: '',
    challenges: '',
    solutions: '',
    results: '',
    testimonial: '',
    clientLogo: '',
    liveDemoUrl: '',
    githubUrl: ''
  })

  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)

  const categories = [
    { value: 'web', label: 'Applications Web' },
    { value: 'mobile', label: 'Applications Mobile' },
    { value: 'desktop', label: 'Applications Desktop' },
    { value: 'cloud', label: 'Solutions Cloud' },
    { value: 'security', label: 'Sécurité IT' },
    { value: 'network', label: 'Infrastructure Réseau' }
  ]

  const statusOptions = [
    { value: 'planned', label: 'Planifié' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'completed', label: 'Terminé' }
  ]

  useEffect(() => {
    if (mode === 'edit' && id) {
      // En production, ceci ferait appel à une API pour récupérer le projet
      const mockData = {
        title: 'Système de Gestion Hospitalière CHU Kamenge',
        client: 'CHU Kamenge',
        category: 'web' as const,
        status: 'completed' as const,
        startDate: '2024-03-15',
        endDate: '2024-12-20',
        budget: '85000',
        team: 'Jean-Baptiste Niyonzima, Espérance Mukamana, Arlette Uwimana',
        technologies: 'React, Node.js, PostgreSQL, Docker, Redis, Nginx',
        featured: true,
        description: 'Développement complet d\'un système de gestion hospitalière intégré pour moderniser les processus administratifs et médicaux.',
        content: '<p>Le CHU Kamenge, principal hôpital universitaire du Burundi, avait besoin d\'un système moderne pour gérer ses opérations...</p>',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        gallery: 'https://example.com/gallery1.jpg, https://example.com/gallery2.jpg',
        challenges: 'Intégration avec les systèmes existants, formation du personnel, migration des données',
        solutions: 'Architecture modulaire, interface intuitive, formation progressive, migration par étapes',
        results: 'Réduction de 40% du temps de traitement, amélioration de la satisfaction patient, digitalisation complète',
        testimonial: 'INFONET a transformé notre façon de travailler. Le système est intuitif et a considérablement amélioré notre efficacité.',
        clientLogo: 'https://example.com/chu-logo.png',
        liveDemoUrl: 'https://demo.chu-kamenge.bi',
        githubUrl: ''
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

      alert(mode === 'create' ? 'Projet créé avec succès!' : 'Projet mis à jour avec succès!')
      router.push('/admin/portfolio')
    } catch (error) {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveDraft = async () => {
    const updatedData = { ...formData, status: 'planned' as const }
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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Créer un Nouveau Projet' : 'Modifier le Projet'}
          </h1>
          <p className="text-gray-600">
            {mode === 'create' ? 'Ajoutez un nouveau projet à votre portfolio' : 'Modifiez les détails de votre projet'}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/portfolio"
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
              {/* Basic Info */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de base</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre du projet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nom du projet"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nom du client"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget (USD)
                    </label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Équipe (séparés par des virgules)
                    </label>
                    <input
                      type="text"
                      value={formData.team}
                      onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Jean Dupont, Marie Martin"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description courte *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description courte du projet pour les listes"
                />
              </div>

              {/* Detailed Content */}
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu détaillé
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="Description détaillée du projet en HTML"
                />
              </div>

              {/* Project Details */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Détails du projet</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Défis rencontrés
                    </label>
                    <textarea
                      value={formData.challenges}
                      onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Principaux défis du projet"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Solutions apportées
                    </label>
                    <textarea
                      value={formData.solutions}
                      onChange={(e) => setFormData({ ...formData, solutions: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Solutions mises en place"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Résultats obtenus
                    </label>
                    <textarea
                      value={formData.results}
                      onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Résultats et impacts mesurables"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Témoignage client
                    </label>
                    <textarea
                      value={formData.testimonial}
                      onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Citation du client sur le projet"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Category */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Statut & Catégorie</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {statusOptions.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      Projet en vedette
                    </label>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Technologies</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies utilisées
                  </label>
                  <textarea
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="React, Node.js, PostgreSQL, Docker"
                  />
                  <p className="text-xs text-gray-500 mt-1">Séparez les technologies par des virgules</p>
                </div>
              </div>

              {/* Images */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Images</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image principale
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo client
                    </label>
                    <input
                      type="url"
                      value={formData.clientLogo}
                      onChange={(e) => setFormData({ ...formData, clientLogo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Galerie (URLs séparées par des virgules)
                    </label>
                    <textarea
                      value={formData.gallery}
                      onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Liens</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Démo en ligne
                    </label>
                    <input
                      type="url"
                      value={formData.liveDemoUrl}
                      onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://demo.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Repository GitHub
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://github.com/user/repo"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                >
                  {saving ? 'Sauvegarde...' : (mode === 'create' ? 'Créer le projet' : 'Mettre à jour')}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        /* Preview */
        <div className="bg-white rounded-lg shadow p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {categories.find(c => c.value === formData.category)?.label}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {statusOptions.find(s => s.value === formData.status)?.label}
                  </span>
                  {formData.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      ⭐ En vedette
                    </span>
                  )}
                </div>
                {formData.budget && (
                  <span className="text-lg font-bold text-green-600">
                    ${parseInt(formData.budget).toLocaleString()}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {formData.title || 'Titre du projet'}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-6">
                <span>Client: <strong>{formData.client || 'Nom du client'}</strong></span>
                {formData.startDate && formData.endDate && (
                  <>
                    <span className="mx-4">•</span>
                    <span>{formData.startDate} - {formData.endDate}</span>
                  </>
                )}
              </div>
              
              {formData.image && (
                <img 
                  src={formData.image} 
                  alt={formData.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl mb-6"
                />
              )}
            </div>
            
            <div className="prose prose-lg max-w-none">
              {formData.description && (
                <p className="text-xl text-gray-700 mb-6">{formData.description}</p>
              )}
              
              <div dangerouslySetInnerHTML={{ 
                __html: formData.content || '<p>Contenu détaillé du projet...</p>' 
              }} />
              
              {formData.technologies && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Technologies utilisées</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.split(',').map((tech, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {formData.testimonial && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <blockquote className="text-lg italic text-gray-700">
                    "{formData.testimonial}"
                  </blockquote>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}