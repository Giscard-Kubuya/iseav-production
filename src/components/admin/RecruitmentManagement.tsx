'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useJobOffers, useJobOfferMutations } from '@/hooks/useJobOffers'
import { useDebounce } from '@/hooks/useApi'
import { JobOffer } from '@/lib/api'

interface JobApplication {
  id: number
  jobId: number
  candidateName: string
  candidateEmail: string
  candidatePhone: string
  resumeUrl: string
  coverLetter: string
  status: 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected'
  applicationDate: string
  score: number
}

export default function RecruitmentManagement() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data: jobOffers, loading, error, updateParams, refetch } = useJobOffers()
  const mutations = useJobOfferMutations()

  // Filter job offers locally to avoid API loop issues
  const filteredJobOffers = useMemo(() => {
    if (!jobOffers) return []
    
    return jobOffers.filter(job => {
      // Filter by department
      if (filter !== 'all' && ['Développement', 'Sécurité IT', 'Infrastructure', 'Support', 'Management'].includes(filter)) {
        if (job.department !== filter) return false
      }
      
      // Filter by status
      if (filter !== 'all' && ['draft', 'active', 'closed', 'filled'].includes(filter)) {
        if (job.status !== filter) return false
      }
      
      // Filter by search term
      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase()
        return job.title.toLowerCase().includes(searchLower) || 
               job.description?.toLowerCase().includes(searchLower)
      }
      
      return true
    })
  }, [jobOffers, filter, debouncedSearch])

  // Filters are now applied locally to avoid API loops

  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 1,
      jobId: 1,
      candidateName: 'Jean-Claude Niyonzima',
      candidateEmail: 'jc.niyonzima@email.com',
      candidatePhone: '+257 79 123 456',
      resumeUrl: 'https://example.com/cv1.pdf',
      coverLetter: 'Je suis très intéressé par ce poste...',
      status: 'interview',
      applicationDate: '2025-01-18',
      score: 85
    },
    {
      id: 2,
      jobId: 1,
      candidateName: 'Marie Uwimana',
      candidateEmail: 'marie.uwimana@email.com',
      candidatePhone: '+257 68 789 012',
      resumeUrl: 'https://example.com/cv2.pdf',
      coverLetter: 'Avec 5 ans d\'expérience...',
      status: 'reviewed',
      applicationDate: '2025-01-17',
      score: 78
    }
  ])

  const departments = ['Développement', 'Sécurité IT', 'Infrastructure', 'Support', 'Management']
  const jobTypes = {
    fulltime: 'Temps plein',
    parttime: 'Temps partiel',
    contract: 'Contrat',
    internship: 'Stage'
  }
  const levels = {
    junior: 'Junior',
    middle: 'Intermédiaire',
    senior: 'Senior',
    lead: 'Lead'
  }
  const locations = {
    bujumbura: 'Bujumbura',
    gitega: 'Gitega',
    remote: 'À distance',
    hybrid: 'Hybride'
  }
  const statusLabels = {
    published: 'Publié',
    draft: 'Brouillon',
    closed: 'Fermé',
    filled: 'Pourvu'
  }


  const handleDeleteJob = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre d\'emploi ?')) {
      try {
        await mutations.deleteJob(id, {
          onSuccess: () => {
            refetch()
          }
        })
      } catch (error) {
        console.error('Error deleting job offer:', error)
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

  const handleToggleUrgent = async (id: number) => {
    try {
      await mutations.toggleUrgent(id, {
        onSuccess: () => {
          refetch()
        }
      })
    } catch (error) {
      console.error('Error toggling urgent:', error)
    }
  }

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await mutations.updateStatus(id, newStatus, {
        onSuccess: () => {
          refetch()
        }
      })
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleApplicationStatusChange = (id: number, newStatus: JobApplication['status']) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ))
  }

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      closed: 'bg-red-100 text-red-800',
      filled: 'bg-blue-100 text-blue-800'
    }
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    )
  }

  const getApplicationStatusBadge = (status: string) => {
    const statusClasses = {
      pending: 'bg-blue-100 text-blue-800',
      reviewed: 'bg-yellow-100 text-yellow-800',
      interview: 'bg-purple-100 text-purple-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    }
    const statusLabels = {
      pending: 'En attente',
      reviewed: 'Examinée',
      interview: 'Entretien',
      accepted: 'Acceptée',
      rejected: 'Rejetée'
    }
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    )
  }

  const totalApplications = applications.length
  const pendingApplications = applications.filter(app => app.status === 'pending').length
  const interviewApplications = applications.filter(app => app.status === 'interview').length

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
        Erreur lors du chargement des offres d'emploi: {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion du Recrutement</h1>
          <p className="text-gray-600">Gérez vos offres d'emploi et candidatures</p>
        </div>
        <Link
          href="/admin/recrutement/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nouvelle Offre d'Emploi
        </Link>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Offres d'Emploi ({jobOffers?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Candidatures ({totalApplications})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'jobs' ? (
            <div className="space-y-6">
              {/* Filters and search */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Rechercher une offre d'emploi..."
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
                  <option value="all">Tous les emplois</option>
                  <optgroup label="Par statut">
                    <option value="published">Publiés</option>
                    <option value="draft">Brouillons</option>
                    <option value="closed">Fermés</option>
                    <option value="filled">Pourvus</option>
                  </optgroup>
                  <optgroup label="Par département">
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Par type">
                    {Object.entries(jobTypes).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">💼</div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{jobOffers?.length || 0}</p>
                      <p className="text-gray-600 text-sm">Total Offres</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">✅</div>
                    <div>
                      <p className="text-xl font-bold text-green-600">{jobOffers?.filter(j => j.status === 'active').length || 0}</p>
                      <p className="text-gray-600 text-sm">Actives</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">📝</div>
                    <div>
                      <p className="text-xl font-bold text-blue-600">{totalApplications}</p>
                      <p className="text-gray-600 text-sm">Candidatures</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">⭐</div>
                    <div>
                      <p className="text-xl font-bold text-purple-600">{jobOffers?.filter(j => j.featured).length || 0}</p>
                      <p className="text-gray-600 text-sm">En vedette</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jobs list */}
              <div className="space-y-4">
                {jobOffers && jobOffers.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex space-x-2">
                            {getStatusBadge(job.status)}
                            {job.featured && (
                              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                ⭐ Vedette
                              </span>
                            )}
                            {job.urgent && (
                              <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                                🚨 Urgent
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Département:</span> {job.department}
                          </div>
                          <div>
                            <span className="font-medium">Type:</span> {jobTypes[job.type]}
                          </div>
                          <div>
                            <span className="font-medium">Niveau:</span> {levels[job.level]}
                          </div>
                          <div>
                            <span className="font-medium">Localisation:</span> {locations[job.location]}
                          </div>
                          <div>
                            <span className="font-medium">Salaire:</span> {job.salary_min}-{job.salary_max} {job.salary_currency}
                          </div>
                          <div>
                            <span className="font-medium">Deadline:</span> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Non définie'}
                          </div>
                          <div>
                            <span className="font-medium">Candidatures:</span> {job.applications_count}
                          </div>
                          <div>
                            <span className="font-medium">Vues:</span> {job.views_count}
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-sm">{job.description}</p>
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        <Link
                          href={`/recrutement/${job.id}`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-900 text-sm"
                        >
                          Voir
                        </Link>
                        <Link
                          href={`/admin/recrutement/${job.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 text-sm"
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleToggleFeatured(job.id)}
                          className="text-yellow-600 hover:text-yellow-900 text-sm"
                        >
                          {job.featured ? 'Retirer vedette' : 'Mettre en vedette'}
                        </button>
                        <button
                          onClick={() => handleToggleUrgent(job.id)}
                          className="text-red-600 hover:text-red-900 text-sm"
                        >
                          {job.urgent ? 'Retirer urgent' : 'Marquer urgent'}
                        </button>
                        {job.status === 'active' ? (
                          <button
                            onClick={() => handleStatusChange(job.id, 'paused')}
                            className="text-orange-600 hover:text-orange-900 text-sm"
                          >
                            Mettre en pause
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(job.id, 'active')}
                            className="text-green-600 hover:text-green-900 text-sm"
                          >
                            Activer
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-600 hover:text-red-900 text-sm"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Applications Tab */
            <div className="space-y-6">
              {/* Applications stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">📩</div>
                    <div>
                      <p className="text-xl font-bold text-blue-600">{pendingApplications}</p>
                      <p className="text-gray-600 text-sm">En attente</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🎤</div>
                    <div>
                      <p className="text-xl font-bold text-purple-600">{interviewApplications}</p>
                      <p className="text-gray-600 text-sm">Entretiens</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">📊</div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{applications.reduce((avg, app) => avg + app.score, 0) / applications.length || 0}%</p>
                      <p className="text-gray-600 text-sm">Score moyen</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applications list */}
              <div className="space-y-4">
                {applications.map((application) => {
                  const job = jobOffers.find(j => j.id === application.jobId)
                  return (
                    <div key={application.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{application.candidateName}</h3>
                            {getApplicationStatusBadge(application.status)}
                            <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              Score: {application.score}%
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Poste:</span> {job?.title}
                            </div>
                            <div>
                              <span className="font-medium">Email:</span> {application.candidateEmail}
                            </div>
                            <div>
                              <span className="font-medium">Téléphone:</span> {application.candidatePhone}
                            </div>
                            <div>
                              <span className="font-medium">Date:</span> {application.applicationDate}
                            </div>
                          </div>
                          
                          <p className="text-gray-700 text-sm mb-3">{application.coverLetter}</p>
                          
                          <div className="flex space-x-4">
                            <a
                              href={application.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900 text-sm"
                            >
                              📄 Voir CV
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-4">
                          <select
                            value={application.status}
                            onChange={(e) => handleApplicationStatusChange(application.id, e.target.value as JobApplication['status'])}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="pending">En attente</option>
                            <option value="reviewed">Examinée</option>
                            <option value="interview">Entretien</option>
                            <option value="accepted">Acceptée</option>
                            <option value="rejected">Rejetée</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {(!jobOffers || jobOffers.length === 0) && activeTab === 'jobs' && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Aucune offre d'emploi trouvée</div>
          <p className="text-gray-400 mt-2">
            {searchTerm ? 'Essayez un autre terme de recherche' : 'Commencez par créer votre première offre d\'emploi'}
          </p>
        </div>
      )}
    </div>
  )
}