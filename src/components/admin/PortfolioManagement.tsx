'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePortfolioProjects, usePortfolioProjectMutations } from '@/hooks/usePortfolioProjects'
import { useDebounce } from '@/hooks/useApi'
import { PortfolioProject } from '@/lib/api'


export default function PortfolioManagement() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  // Prepare filters for API call
  const apiFilters = {
    category: filter !== 'all' && ['web', 'mobile', 'desktop', 'cloud', 'security', 'network'].includes(filter) ? filter : undefined,
    status: filter !== 'all' && ['completed', 'in_progress', 'planned'].includes(filter) ? filter : undefined,
    search: debouncedSearch || undefined,
  }

  const { data: projects, loading, error, updateParams, refetch } = usePortfolioProjects(apiFilters)
  const mutations = usePortfolioProjectMutations()

  // Update API params when filters change
  useEffect(() => {
    updateParams(apiFilters)
  }, [filter, debouncedSearch])

  const categories = {
    web: 'Applications Web',
    mobile: 'Applications Mobile',
    desktop: 'Applications Desktop',
    cloud: 'Solutions Cloud',
    security: 'Sécurité IT',
    network: 'Infrastructure Réseau'
  }

  const statusLabels = {
    completed: 'Terminé',
    in_progress: 'En cours',
    planned: 'Planifié'
  }

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await mutations.deleteProject(id, {
          onSuccess: () => {
            refetch()
          }
        })
      } catch (error) {
        console.error('Error deleting project:', error)
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Terminé</span>
      case 'in_progress':
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">En cours</span>
      case 'planned':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Planifié</span>
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{status}</span>
    }
  }

  const totalBudget = projects?.reduce((sum, project) => sum + (project.budget || 0), 0) || 0
  const completedProjects = projects?.filter(p => p.status === 'completed').length || 0
  const inProgressProjects = projects?.filter(p => p.status === 'in_progress').length || 0

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Erreur lors du chargement des projets: {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion du Portfolio</h1>
          <p className="text-gray-600">Gérez tous vos projets et réalisations</p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nouveau Projet
        </Link>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Rechercher un projet..."
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
            <option value="all">Tous les projets</option>
            <optgroup label="Par catégorie">
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </optgroup>
            <optgroup label="Par statut">
              <option value="completed">Terminés</option>
              <option value="in_progress">En cours</option>
              <option value="planned">Planifiés</option>
            </optgroup>
          </select>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">💼</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{projects?.length || 0}</p>
              <p className="text-gray-600">Total Projets</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">✅</div>
            <div>
              <p className="text-2xl font-bold text-green-600">{completedProjects}</p>
              <p className="text-gray-600">Terminés</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">⚡</div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{inProgressProjects}</p>
              <p className="text-gray-600">En cours</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">💰</div>
            <div>
              <p className="text-2xl font-bold text-purple-600">${totalBudget.toLocaleString()}</p>
              <p className="text-gray-600">Budget Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects && projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={project.featured_image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 flex space-x-2">
                {getStatusBadge(project.status)}
                {project.featured && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    ⭐ Vedette
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 text-xs bg-gray-900 text-white rounded-full">
                  {categories[project.category]}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{project.client}</p>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Budget:</span>
                  <span className="font-medium">${project.budget?.toLocaleString() || 'Non spécifié'}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Période:</span>
                  <span className="font-medium">{project.start_date} - {project.end_date || 'En cours'}</span>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Technologies:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(() => {
                      const technologies = project.technologies || []
                      return (
                        <>
                          {technologies.slice(0, 3).map((tech, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                              {tech}
                            </span>
                          ))}
                          {technologies.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                              +{technologies.length - 3}
                            </span>
                          )}
                        </>
                      )
                    })()}
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Équipe:</span>
                  <p className="text-sm font-medium">{project.team?.length || 0} membre(s)</p>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href={`/portfolio/${project.id}`}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  Voir
                </Link>
                <Link
                  href={`/admin/portfolio/${project.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900 text-sm"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleToggleFeatured(project.id)}
                  className="text-yellow-600 hover:text-yellow-900 text-sm"
                >
                  {project.featured ? 'Retirer vedette' : 'Mettre en vedette'}
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-600 hover:text-red-900 text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!projects || projects.length === 0) && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Aucun projet trouvé</div>
          <p className="text-gray-400 mt-2">
            {searchTerm ? 'Essayez un autre terme de recherche' : 'Commencez par créer votre premier projet'}
          </p>
        </div>
      )}
    </div>
  )
}