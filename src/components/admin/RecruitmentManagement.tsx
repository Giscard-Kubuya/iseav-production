'use client'

import { useState } from 'react'
import Link from 'next/link'

interface JobOffer {
  id: number
  title: string
  department: string
  type: 'fulltime' | 'parttime' | 'contract' | 'internship'
  level: 'junior' | 'middle' | 'senior' | 'lead'
  location: 'bujumbura' | 'gitega' | 'remote' | 'hybrid'
  salary: {
    min: number
    max: number
    currency: 'BIF' | 'USD'
  }
  status: 'active' | 'paused' | 'closed' | 'draft'
  publishDate: string
  deadline: string
  applicationsCount: number
  viewsCount: number
  featured: boolean
  urgent: boolean
  description: string
}

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
  
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([
    {
      id: 1,
      title: 'Développeur Full Stack Senior',
      department: 'Développement',
      type: 'fulltime',
      level: 'senior',
      location: 'bujumbura',
      salary: { min: 1200, max: 1800, currency: 'USD' },
      status: 'active',
      publishDate: '2025-01-15',
      deadline: '2025-02-15',
      applicationsCount: 23,
      viewsCount: 456,
      featured: true,
      urgent: false,
      description: 'Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe dynamique.'
    },
    {
      id: 2,
      title: 'Analyste Cybersécurité',
      department: 'Sécurité IT',
      type: 'fulltime',
      level: 'middle',
      location: 'hybrid',
      salary: { min: 800, max: 1200, currency: 'USD' },
      status: 'active',
      publishDate: '2025-01-10',
      deadline: '2025-02-10',
      applicationsCount: 15,
      viewsCount: 234,
      featured: false,
      urgent: true,
      description: 'Poste d\'analyste en cybersécurité pour protéger nos infrastructures critiques.'
    },
    {
      id: 3,
      title: 'Stagiaire Développement Mobile',
      department: 'Développement',
      type: 'internship',
      level: 'junior',
      location: 'bujumbura',
      salary: { min: 200000, max: 300000, currency: 'BIF' },
      status: 'active',
      publishDate: '2025-01-08',
      deadline: '2025-01-28',
      applicationsCount: 45,
      viewsCount: 789,
      featured: false,
      urgent: false,
      description: 'Stage de 6 mois en développement d\'applications mobiles.'
    }
  ])

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

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

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
    active: 'Actif',
    paused: 'En pause',
    closed: 'Fermé',
    draft: 'Brouillon'
  }

  const filteredJobs = jobOffers.filter(job => {
    const matchesFilter = filter === 'all' || 
                         job.status === filter || 
                         job.department === filter ||
                         job.type === filter
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleDeleteJob = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre d\'emploi ?')) {
      setJobOffers(jobOffers.filter(job => job.id !== id))
    }
  }

  const handleToggleFeatured = (id: number) => {
    setJobOffers(jobOffers.map(job => 
      job.id === id ? { ...job, featured: !job.featured } : job
    ))
  }

  const handleToggleUrgent = (id: number) => {
    setJobOffers(jobOffers.map(job => 
      job.id === id ? { ...job, urgent: !job.urgent } : job
    ))
  }

  const handleStatusChange = (id: number, newStatus: 'active' | 'paused' | 'closed') => {
    setJobOffers(jobOffers.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    ))
  }

  const handleApplicationStatusChange = (id: number, newStatus: JobApplication['status']) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ))
  }

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      closed: 'bg-red-100 text-red-800',
      draft: 'bg-gray-100 text-gray-800'
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
              Offres d'Emploi ({jobOffers.length})
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
                    <option value="active">Actifs</option>
                    <option value="paused">En pause</option>
                    <option value="closed">Fermés</option>
                    <option value="draft">Brouillons</option>
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
                      <p className="text-xl font-bold text-gray-900">{jobOffers.length}</p>
                      <p className="text-gray-600 text-sm">Total Offres</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">✅</div>
                    <div>
                      <p className="text-xl font-bold text-green-600">{jobOffers.filter(j => j.status === 'active').length}</p>
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
                      <p className="text-xl font-bold text-purple-600">{jobOffers.filter(j => j.featured).length}</p>
                      <p className="text-gray-600 text-sm">En vedette</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jobs list */}
              <div className="space-y-4">
                {filteredJobs.map((job) => (
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
                            <span className="font-medium">Salaire:</span> {job.salary.min}-{job.salary.max} {job.salary.currency}
                          </div>
                          <div>
                            <span className="font-medium">Deadline:</span> {job.deadline}
                          </div>
                          <div>
                            <span className="font-medium">Candidatures:</span> {job.applicationsCount}
                          </div>
                          <div>
                            <span className="font-medium">Vues:</span> {job.viewsCount}
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

      {filteredJobs.length === 0 && activeTab === 'jobs' && (
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