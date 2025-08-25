'use client'

import { useState } from 'react'
import { useJobOffersFront } from '@/hooks/useJobOffersFront'
import { useCompanyValuesFront } from '@/hooks/useCompanyValuesFront'

interface JobListing {
  id: number
  title: string
  department: string
  location: string
  type: string
  salary: string
  experience: string
  description: string
  requirements: string[]
  benefits: string[]
  featured: boolean
}

export default function RecrutementContent() {
  const [selectedJob, setSelectedJob] = useState<any | null>(null)
  
  // Fetch job offers and company values from API
  const { jobOffers, loading: jobsLoading, error: jobsError } = useJobOffersFront()
  const { companyValues, loading: valuesLoading, error: valuesError } = useCompanyValuesFront()
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    motivation: '',
    cv: null as File | null
  })

  const handleJobSelect = (job: any) => {
    setSelectedJob(job)
    setApplicationForm(prev => ({ ...prev, position: job.title }))
  }

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Candidature envoyée avec succès! Nous vous contacterons bientôt.')
    setSelectedJob(null)
    setApplicationForm({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      motivation: '',
      cv: null
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Rejoignez l'équipe
              <span className="block text-green-300">INFONET</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Construisons ensemble l'avenir numérique du Burundi
            </p>
            <button
              onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 hover:scale-105 transform"
            >
              Découvrir nos offres
            </button>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chez INFONET, nous croyons en des valeurs qui nous guident vers l'excellence
            </p>
          </div>

          {valuesLoading ? (
            <div className="text-center">
              <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-xl text-gray-600">Chargement des valeurs...</p>
            </div>
          ) : valuesError ? (
            <div className="text-center text-red-600">
              <p className="text-xl">Erreur lors du chargement des valeurs</p>
            </div>
          ) : companyValues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues.map((value, index) => (
                <div
                  key={value.id}
                  className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-blue-600 mb-4 flex justify-center text-4xl">
                    {value.icon || '🏆'}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p className="text-xl">Aucune valeur d'entreprise disponible.</p>
            </div>
          )}
        </div>
      </section>

      {/* Job Listings */}
      <section id="jobs" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Offres d'Emploi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos opportunités de carrière et rejoignez une équipe passionnée
            </p>
          </div>

          {jobsLoading ? (
            <div className="text-center">
              <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-xl text-gray-600">Chargement des offres d'emploi...</p>
            </div>
          ) : jobsError ? (
            <div className="text-center text-red-600">
              <p className="text-xl">Erreur lors du chargement des offres</p>
            </div>
          ) : jobOffers.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {jobOffers.map((job, index) => (
                <div
                  key={job.id}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border-2 hover:scale-105 transform ${
                    job.featured ? 'border-green-500' : 'border-transparent'
                  }`}
                  onClick={() => handleJobSelect(job)}
                >
                  {job.featured && (
                    <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      Offre en vedette
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{job.department}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">📍</span>
                      <span className="text-sm">{job.location || 'Bujumbura, Burundi'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">⏰</span>
                      <span className="text-sm">{job.type === 'fulltime' ? 'Temps plein' : job.type === 'parttime' ? 'Temps partiel' : job.type === 'contract' ? 'Contrat' : job.type === 'internship' ? 'Stage' : 'Temps plein'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">💼</span>
                      <span className="text-sm">{job.level === 'junior' ? 'Junior' : job.level === 'middle' ? 'Intermédiaire' : job.level === 'senior' ? 'Senior' : job.level === 'lead' ? 'Lead' : 'Selon expérience'}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">💰</span>
                      <span className="text-sm">{job.salary_min && job.salary_max ? `${job.salary_min}-${job.salary_max} ${job.salary_currency}` : 'Négociable'}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.description}
                  </p>
                  
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 hover:scale-105 transform">
                    Postuler maintenant
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p className="text-xl">Aucune offre d'emploi disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto transform scale-100 transition-transform duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedJob.title}
                  </h2>
                  <p className="text-blue-600 font-semibold">{selectedJob.department}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Job Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Description du poste</h3>
                  <p className="text-gray-600 mb-6">{selectedJob.description}</p>

                  <h3 className="text-lg font-semibold mb-4">Exigences</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedJob.requirements && selectedJob.requirements.length > 0 ? selectedJob.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">{req}</span>
                      </li>
                    )) : (
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-600">Formation et expérience requises selon le poste</span>
                      </li>
                    )}
                  </ul>

                  <h3 className="text-lg font-semibold mb-4">Avantages</h3>
                  <ul className="space-y-2">
                    {selectedJob.benefits && selectedJob.benefits.length > 0 ? selectedJob.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">❤️</span>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    )) : (
                      <>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">❤️</span>
                          <span className="text-gray-600">Environnement de travail stimulant</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">❤️</span>
                          <span className="text-gray-600">Formation continue</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">❤️</span>
                          <span className="text-gray-600">Évolution de carrière</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Application Form */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Postuler pour ce poste</h3>
                  <form onSubmit={handleApplicationSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicationForm.name}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicationForm.phone}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Années d'expérience
                      </label>
                      <select
                        value={applicationForm.experience}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, experience: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="0-1">0-1 an</option>
                        <option value="1-3">1-3 ans</option>
                        <option value="3-5">3-5 ans</option>
                        <option value="5+">5+ ans</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lettre de motivation *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={applicationForm.motivation}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, motivation: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CV (PDF) *
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        required
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, cv: e.target.files?.[0] || null }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold hover:scale-105 transform"
                      >
                        Envoyer la candidature
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedJob(null)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vous ne trouvez pas le poste idéal ?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Envoyez-nous votre candidature spontanée. Nous sommes toujours à la recherche de talents exceptionnels.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 hover:scale-105 transform"
            >
              Candidature spontanée
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}