'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PortfolioProject {
  id: number
  title: string
  client: string
  category: 'web' | 'mobile' | 'desktop' | 'cloud' | 'security' | 'network'
  status: 'completed' | 'in_progress' | 'planned'
  startDate: string
  endDate: string
  budget: number
  team: string[]
  technologies: string[]
  featured: boolean
  description: string
  image: string
}

export default function PortfolioManagement() {
  const [projects, setProjects] = useState<PortfolioProject[]>([
    {
      id: 1,
      title: 'Système de Gestion Hospitalière CHU Kamenge',
      client: 'CHU Kamenge',
      category: 'web',
      status: 'completed',
      startDate: '2024-03-15',
      endDate: '2024-12-20',
      budget: 85000,
      team: ['Jean-Baptiste Niyonzima', 'Espérance Mukamana', 'Arlette Uwimana'],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      featured: true,
      description: 'Développement complet d\'un système de gestion hospitalière intégré',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Application Mobile E-Banking BRB',
      client: 'Banque de la République du Burundi',
      category: 'mobile',
      status: 'completed',
      startDate: '2024-01-10',
      endDate: '2024-08-30',
      budget: 120000,
      team: ['Jean-Baptiste Niyonzima', 'Patrick Ndayizeye'],
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
      featured: true,
      description: 'Application mobile sécurisée pour les services bancaires en ligne',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Plateforme E-Commerce Burundi Market',
      client: 'Burundi Market Ltd',
      category: 'web',
      status: 'in_progress',
      startDate: '2024-11-01',
      endDate: '2025-04-15',
      budget: 95000,
      team: ['Arlette Uwimana', 'Espérance Mukamana'],
      technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'AWS'],
      featured: false,
      description: 'Marketplace en ligne pour les produits locaux burundais',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ])

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter || project.status === filter
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      setProjects(projects.filter(project => project.id !== id))
    }
  }

  const handleToggleFeatured = (id: number) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, featured: !project.featured } : project
    ))
  }

  const handleStatusChange = (id: number, newStatus: 'completed' | 'in_progress' | 'planned') => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, status: newStatus } : project
    ))
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

  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0)
  const completedProjects = projects.filter(p => p.status === 'completed').length
  const inProgressProjects = projects.filter(p => p.status === 'in_progress').length

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
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
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
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={project.image}
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
                  <span className="font-medium">${project.budget.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Période:</span>
                  <span className="font-medium">{project.startDate} - {project.endDate}</span>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Technologies:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Équipe:</span>
                  <p className="text-sm font-medium">{project.team.length} membre(s)</p>
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

      {filteredProjects.length === 0 && (
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