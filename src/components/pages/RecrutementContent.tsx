'use client'

import { useState } from 'react'
import PageSEO from '@/components/layout/PageSEO'

type Position = {
  id: string
  title: string
  department: string
  type: string
  description: string
  requirements: string[]
  responsibilities: string[]
  featured?: boolean
}

const positions: Position[] = [
  {
    id: 'enseignant-primaire',
    title: 'Enseignant(e) Primaire',
    department: 'Éducation',
    type: 'Temps plein',
    description: 'Nous recherchons des enseignants passionnés pour accompagner nos élèves du primaire dans leur apprentissage et leur développement intégral.',
    requirements: [
      'Diplôme en Sciences de l\'Éducation ou équivalent',
      'Expérience minimum 2 ans dans l\'enseignement primaire',
      'Maîtrise du français écrit et parlé',
      'Capacité à travailler en équipe',
      'Patience et pédagogie avec les enfants'
    ],
    responsibilities: [
      'Enseigner selon le programme officiel',
      'Évaluer les progrès des élèves',
      'Participer aux réunions pédagogiques',
      'Communiquer avec les parents',
      'Organiser des activités éducatives'
    ],
    featured: true
  },
  {
    id: 'enseignant-college',
    title: 'Enseignant(e) Collège',
    department: 'Éducation',
    type: 'Temps plein',
    description: 'Poste d\'enseignant pour le cycle complémentaire avec spécialisation dans une matière spécifique.',
    requirements: [
      'Licence dans la matière d\'enseignement',
      'Formation pédagogique',
      'Expérience dans l\'enseignement secondaire',
      'Connaissance des programmes officiels',
      'Capacité d\'innovation pédagogique'
    ],
    responsibilities: [
      'Dispenser les cours de spécialité',
      'Préparer et corriger les évaluations',
      'Encadrer les activités parascolaires',
      'Participer à l\'orientation des élèves',
      'Contribuer aux projets éducatifs'
    ]
  },
  {
    id: 'directeur-adjoint',
    title: 'Directeur(trice) Adjoint(e)',
    department: 'Administration',
    type: 'Temps plein',
    description: 'Poste de direction pour seconder le directeur dans la gestion quotidienne de l\'établissement.',
    requirements: [
      'Master en Administration Scolaire ou équivalent',
      'Minimum 5 ans d\'expérience en éducation',
      'Compétences en gestion et leadership',
      'Excellentes capacités de communication',
      'Vision stratégique de l\'éducation'
    ],
    responsibilities: [
      'Assister le directeur dans la gestion',
      'Superviser le personnel enseignant',
      'Coordonner les activités pédagogiques',
      'Représenter l\'établissement',
      'Gérer les relations avec les partenaires'
    ],
    featured: true
  },
  {
    id: 'secretaire',
    title: 'Secrétaire Administratif(ve)',
    department: 'Administration',
    type: 'Temps plein',
    description: 'Poste de secrétariat pour assurer la gestion administrative efficace de l\'établissement.',
    requirements: [
      'Diplôme en Secrétariat ou équivalent',
      'Maîtrise des outils informatiques',
      'Expérience en secrétariat (2 ans minimum)',
      'Discrétion et organisation',
      'Excellentes compétences relationnelles'
    ],
    responsibilities: [
      'Accueil téléphonique et physique',
      'Gestion des dossiers administratifs',
      'Rédaction de correspondances',
      'Tenue des registres',
      'Support administratif aux équipes'
    ]
  },
  {
    id: 'surveillant',
    title: 'Surveillant(e) Général(e)',
    department: 'Vie Scolaire',
    type: 'Temps plein',
    description: 'Poste de surveillance pour assurer l\'encadrement bienveillant et la discipline des élèves.',
    requirements: [
      'Baccalauréat minimum',
      'Expérience en encadrement de jeunes',
      'Autorité naturelle et bienveillance',
      'Disponibilité et ponctualité',
      'Capacité de médiation'
    ],
    responsibilities: [
      'Surveiller les élèves',
      'Faire respecter le règlement',
      'Gérer les conflits',
      'Collaborer avec les enseignants',
      'Animer les temps d\'interclasse'
    ]
  },
  {
    id: 'comptable',
    title: 'Comptable',
    department: 'Finance',
    type: 'Temps plein',
    description: 'Poste comptable pour assurer une gestion financière rigoureuse de l\'établissement.',
    requirements: [
      'Licence en Comptabilité/Finance',
      'Expérience en comptabilité (3 ans minimum)',
      'Maîtrise des logiciels comptables',
      'Rigueur et précision',
      'Connaissance de la réglementation'
    ],
    responsibilities: [
      'Tenir la comptabilité générale',
      'Préparer les états financiers',
      'Gérer la trésorerie',
      'Contrôler les dépenses',
      'Établir les budgets prévisionnels'
    ]
  }
]

export default function RecrutementContent() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [showApplication, setShowApplication] = useState(false)
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    education: '',
    experience: '',
    motivation: '',
    cv: null as File | null,
    coverLetter: null as File | null
  })

  const handlePositionSelect = (position: Position) => {
    setSelectedPosition(position)
    setShowApplication(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setApplicationData({
      ...applicationData,
      [e.target.name]: file
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Candidature soumise avec succès ! Nous vous contacterons bientôt.')
    setShowApplication(false)
    setSelectedPosition(null)
    setApplicationData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      education: '',
      experience: '',
      motivation: '',
      cv: null,
      coverLetter: null
    })
  }

  return (
    <PageSEO
      title="Recrutement - 8e CEPAC Projet-Beni"
      description="Rejoignez l'équipe du 8e CEPAC Projet-Beni. Consultez nos offres d'emploi et postulez pour contribuer à l'excellence éducative."
      keywords="recrutement, emploi, enseignant, CEPAC, carrière, éducation, Bénin"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-blue-100">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Rejoignez Notre Équipe</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contribuez à l'excellence éducative au CEPAC et façonnez l'avenir de l'éducation au Bénin
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
            <span className="bg-white/20 px-4 py-2 rounded-full">✨ Environnement stimulant</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">📚 Formation continue</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🤝 Équipe collaborative</span>
          </div>
          <button
            onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Découvrir nos postes
          </button>
        </div>
      </section>

      {!showApplication && (
        <>
          {/* Why Join Us */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Pourquoi Nous <span className="text-amber-600">Rejoindre ?</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Des avantages qui font la différence pour votre épanouissement professionnel
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-8 rounded-xl bg-blue-50 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl text-white">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Mission Inspirante</h3>
                  <p className="text-gray-600">
                    Participez à une mission éducative qui transforme des vies et construit l'avenir
                  </p>
                </div>

                <div className="text-center p-8 rounded-xl bg-amber-50 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl text-white">📈</span>
                  </div>
                  <h3 className="text-xl font-bold text-amber-800 mb-4">Développement Professionnel</h3>
                  <p className="text-gray-600">
                    Formations continues, mentorat et opportunités d'évolution de carrière
                  </p>
                </div>

                <div className="text-center p-8 rounded-xl bg-blue-50 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl text-white">🤝</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Environnement Collaboratif</h3>
                  <p className="text-gray-600">
                    Travaillez avec une équipe passionnée dans un environnement bienveillant
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Positions Available */}
          <section id="positions" className="py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Postes <span className="text-blue-600">Disponibles</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Découvrez les opportunités de carrière qui correspondent à vos compétences
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {positions.map((position) => (
                  <div
                    key={position.id}
                    className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 ${
                      position.featured ? 'border-amber-500' : 'border-transparent hover:border-blue-200'
                    }`}
                    onClick={() => handlePositionSelect(position)}
                  >
                    <div className="p-8">
                      {position.featured && (
                        <div className="inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                          Poste en vedette
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {position.department}
                        </span>
                        <span className="text-amber-600 font-medium text-sm">{position.type}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{position.title}</h3>
                      
                      <p className="text-gray-600 mb-6 line-clamp-3">{position.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        <h4 className="font-semibold text-gray-800">Exigences principales :</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {position.requirements.slice(0, 2).map((req, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {req}
                            </li>
                          ))}
                          {position.requirements.length > 2 && (
                            <li className="text-blue-600 font-medium">
                              +{position.requirements.length - 2} autres exigences
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-blue-600 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105">
                        Postuler Maintenant
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Application Form */}
      {showApplication && selectedPosition && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Candidature pour : {selectedPosition.title}
                  </h2>
                  <p className="text-gray-600">{selectedPosition.department}</p>
                </div>
                <button
                  onClick={() => setShowApplication(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Position Details */}
              <div className="mb-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">Description du poste</h3>
                <p className="text-gray-700 mb-4">{selectedPosition.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Exigences :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedPosition.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Responsabilités :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedPosition.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Informations Personnelles</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={applicationData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={applicationData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={applicationData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={applicationData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date de naissance
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={applicationData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={applicationData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Informations Professionnelles</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Formation/Diplômes *
                      </label>
                      <textarea
                        name="education"
                        value={applicationData.education}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Décrivez votre formation académique et vos diplômes..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expérience professionnelle *
                      </label>
                      <textarea
                        name="experience"
                        value={applicationData.experience}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Décrivez votre expérience professionnelle pertinente..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lettre de motivation *
                      </label>
                      <textarea
                        name="motivation"
                        value={applicationData.motivation}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Expliquez pourquoi vous souhaitez rejoindre notre équipe..."
                      />
                    </div>
                  </div>
                </div>

                {/* File Uploads */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Documents</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CV (PDF) *
                      </label>
                      <input
                        type="file"
                        name="cv"
                        onChange={handleFileChange}
                        accept=".pdf"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lettre de motivation (PDF)
                      </label>
                      <input
                        type="file"
                        name="coverLetter"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowApplication(false)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Soumettre ma candidature
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!showApplication && (
        <section className="py-20 bg-gradient-to-r from-blue-800 to-amber-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Vous ne trouvez pas le poste idéal ?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Envoyez-nous votre candidature spontanée. Nous sommes toujours à la recherche de talents exceptionnels pour rejoindre notre équipe éducative.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Candidature spontanée
            </a>
          </div>
        </section>
      )}
      </div>
    </PageSEO>
  )
}