'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdmissionsContent() {
  const [selectedProgram, setSelectedProgram] = useState('all')
  const [currentStep, setCurrentStep] = useState(1)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    level: '',
    motivation: ''
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const programs = [
    { id: 'all', name: 'Tous les Programmes', count: 12 },
    { id: 'licence', name: 'Programmes Licence', count: 6 },
    { id: 'master', name: 'Programmes Master', count: 4 },
    { id: 'doctorat', name: 'Programmes Doctorat', count: 2 }
  ]

  const admissionRequirements = [
    {
      level: 'licence',
      title: 'Admission en Licence',
      icon: '🎓',
      color: 'from-blue-500 to-indigo-600',
      requirements: [
        'Baccalauréat Sciences Expérimentales ou Mathématiques',
        'Moyenne générale ≥ 12/20',
        'Mention au Baccalauréat recommandée',
        'Maîtrise du français (niveau B2 minimum)',
        'Test d\'aptitude en sciences'
      ],
      documents: [
        'Copie certifiée du Baccalauréat',
        'Relevé de notes détaillé',
        'Certificat de naissance',
        'Photos d\'identité récentes',
        'Certificat médical'
      ],
      deadlines: {
        application: '30 Juin 2024',
        documents: '15 Juillet 2024',
        tests: '20-25 Juillet 2024',
        results: '5 Août 2024'
      },
      fees: {
        application: '50 TND',
        tuition: '2,500-3,000 TND/an'
      }
    },
    {
      level: 'master',
      title: 'Admission en Master',
      icon: '🎯',
      color: 'from-purple-500 to-violet-600',
      requirements: [
        'Licence dans un domaine connexe',
        'Moyenne ≥ 14/20 en Licence',
        'Projet de recherche ou stage validé',
        'Lettres de recommandation (2)',
        'Entretien de motivation obligatoire'
      ],
      documents: [
        'Diplôme de Licence certifié',
        'Relevés de notes complets',
        'Lettres de recommandation',
        'Projet de mémoire (esquisse)',
        'CV détaillé et portfolio'
      ],
      deadlines: {
        application: '15 Mai 2024',
        documents: '30 Mai 2024',
        interviews: '10-15 Juin 2024',
        results: '25 Juin 2024'
      },
      fees: {
        application: '75 TND',
        tuition: '4,000-4,500 TND/an'
      }
    },
    {
      level: 'doctorat',
      title: 'Admission en Doctorat',
      icon: '🔬',
      color: 'from-emerald-500 to-teal-600',
      requirements: [
        'Master avec mention (≥ 15/20)',
        'Projet de recherche innovant',
        'Directeur de thèse confirmé',
        'Publications scientifiques (bonus)',
        'Entretien scientifique approfondi'
      ],
      documents: [
        'Diplômes Master et Licence',
        'Mémoire de Master complet',
        'Projet de thèse détaillé',
        'Accord du directeur de thèse',
        'Portfolio de recherche'
      ],
      deadlines: {
        application: '30 Avril 2024',
        documents: '15 Mai 2024',
        defense: '1-5 Juin 2024',
        results: '15 Juin 2024'
      },
      fees: {
        application: '100 TND',
        tuition: '5,000 TND/an'
      }
    }
  ]

  const admissionSteps = [
    {
      step: 1,
      title: 'Candidature en Ligne',
      description: 'Remplissez le formulaire de candidature et téléchargez vos documents',
      icon: '📝',
      duration: '15-30 min',
      details: [
        'Création de compte personnel',
        'Formulaire de candidature détaillé',
        'Upload des documents requis',
        'Choix du programme d\'études',
        'Paiement des frais de dossier'
      ]
    },
    {
      step: 2,
      title: 'Évaluation du Dossier',
      description: 'Notre commission examine votre parcours et vos qualifications',
      icon: '🔍',
      duration: '5-7 jours',
      details: [
        'Vérification des documents',
        'Évaluation académique',
        'Analyse des motivations',
        'Vérification des prérequis',
        'Notification de présélection'
      ]
    },
    {
      step: 3,
      title: 'Tests & Entretiens',
      description: 'Évaluations spécialisées selon le programme choisi',
      icon: '💬',
      duration: '1-2 jours',
      details: [
        'Tests d\'aptitude scientifique',
        'Entretien de motivation',
        'Évaluation linguistique',
        'Présentation de projet (Master/Doctorat)',
        'Assessment technique'
      ]
    },
    {
      step: 4,
      title: 'Résultats & Inscription',
      description: 'Réception des résultats et finalisation de l\'inscription',
      icon: '🎉',
      duration: '2-3 jours',
      details: [
        'Publication des résultats',
        'Confirmation d\'admission',
        'Paiement des frais de scolarité',
        'Inscription administrative',
        'Préparation de la rentrée'
      ]
    }
  ]

  const scholarships = [
    {
      name: 'Bourse d\'Excellence Académique',
      amount: '100% frais de scolarité',
      criteria: 'Moyenne ≥ 16/20, Leadership démontré',
      deadline: '15 Juin 2024',
      icon: '🏆',
      color: 'from-gold-500 to-yellow-600'
    },
    {
      name: 'Bourse de Mérite Social',
      amount: '50-75% frais de scolarité',
      criteria: 'Situation financière, Dossier académique solide',
      deadline: '30 Juin 2024',
      icon: '🤝',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Bourse Recherche & Innovation',
      amount: '3,000 TND + frais',
      criteria: 'Projet innovant, Publications scientifiques',
      deadline: '1er Mai 2024',
      icon: '🚀',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      name: 'Aide Financière d\'Urgence',
      amount: 'Variable selon besoin',
      criteria: 'Difficultés financières imprévisibles',
      deadline: 'Toute l\'année',
      icon: '💙',
      color: 'from-blue-500 to-cyan-600'
    }
  ]

  const stats = [
    { label: 'Taux d\'Admission', value: '78%', icon: '📊', description: 'Candidatures acceptées en 2023' },
    { label: 'Étudiants Internationaux', value: '25%', icon: '🌍', description: 'Diversité culturelle' },
    { label: 'Bourses Attribuées', value: '€450K', icon: '💰', description: 'Soutien financier total' },
    { label: 'Délai de Réponse', value: '10 jours', icon: '⚡', description: 'Traitement des dossiers' }
  ]

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(Math.min(currentStep + 1, 4))
  }

  const filteredRequirements = selectedProgram === 'all' 
    ? admissionRequirements 
    : admissionRequirements.filter(req => req.level === selectedProgram)

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 via-purple-800/75 to-cyan-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-cyan-300 via-white to-amber-300 bg-clip-text text-transparent">
                  Admissions
                </span>
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-cyan-100 animate-fade-in-up delay-200">
                Rejoignez l'Excellence Académique
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Découvrez comment intégrer ISEAV-ARU et transformer votre passion en expertise. 
                Un processus d'admission transparent et des opportunités exceptionnelles vous attendent.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-600">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="bg-gradient-to-r from-cyan-500 to-amber-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:from-cyan-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-cyan-500/25"
                >
                  Candidater Maintenant
                </button>
                <Link 
                  href="#requirements"
                  className="border-3 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-indigo-900 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                >
                  Voir les Exigences
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-amber-400/20 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-purple-400/20 rounded-full animate-bounce delay-2000"></div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-1500 {
          animation-delay: 1.5s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group transform hover:scale-110 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-full flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500 shadow-lg group-hover:shadow-2xl">
                    {stat.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-5xl font-bold text-gray-800 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Processus d'<span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">Admission</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un parcours en 4 étapes simples pour rejoindre notre communauté d'excellence
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-24 left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-1 md:w-full md:h-1 h-full bg-gray-200 rounded-full">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-amber-500 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: currentStep >= 1 ? `${(currentStep / 4) * 100}%` : '0%',
                  height: '100%'
                }}
              ></div>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {admissionSteps.map((step, index) => (
                <div
                  key={step.step}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    currentStep >= step.step ? 'transform scale-105' : ''
                  }`}
                  onClick={() => setCurrentStep(step.step)}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Step Circle */}
                  <div className={`relative w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                    currentStep >= step.step
                      ? 'bg-gradient-to-r from-cyan-500 to-amber-500 text-white shadow-lg scale-110'
                      : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                  }`}>
                    {currentStep > step.step ? '✓' : step.step}
                  </div>

                  {/* Step Content */}
                  <div className={`text-center p-6 rounded-2xl transition-all duration-500 ${
                    currentStep >= step.step
                      ? 'bg-gradient-to-br from-cyan-50 to-amber-50 shadow-lg'
                      : 'bg-gray-50 group-hover:bg-gray-100'
                  }`}>
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="text-sm font-semibold text-cyan-600 mb-4">⏱️ {step.duration}</div>
                    
                    {/* Step Details */}
                    <div className={`space-y-2 transition-all duration-500 ${
                      currentStep === step.step ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}>
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Exigences d'<span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">Admission</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les critères spécifiques selon votre niveau d'études
            </p>
          </div>

          {/* Program Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-4 p-2 bg-white rounded-full shadow-lg">
              {programs.map((program) => (
                <button
                  key={program.id}
                  onClick={() => setSelectedProgram(program.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedProgram === program.id
                      ? 'bg-gradient-to-r from-cyan-600 to-amber-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {program.name}
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {program.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Requirements Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredRequirements.map((req, index) => (
              <div
                key={req.level}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Header */}
                <div className={`p-8 bg-gradient-to-r ${req.color} text-white`}>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {req.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{req.title}</h3>
                  <div className="text-white/90">
                    Frais: {req.fees.tuition}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Requirements */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                      Critères d'Admission
                    </h4>
                    <div className="space-y-3">
                      {req.requirements.map((requirement, idx) => (
                        <div key={idx} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-sm">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                      Documents Requis
                    </h4>
                    <div className="space-y-2">
                      {req.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          {doc}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deadlines */}
                  <div className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                    <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                      Calendrier Important
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-500">Candidature</div>
                        <div className="font-semibold text-orange-600">{req.deadlines.application}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Documents</div>
                        <div className="font-semibold text-orange-600">{req.deadlines.documents}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Tests</div>
                        <div className="font-semibold text-orange-600">{req.deadlines.tests || req.deadlines.interviews || req.deadlines.defense}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Résultats</div>
                        <div className="font-semibold text-green-600">{req.deadlines.results}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => setCurrentStep(1)}
                    className={`w-full bg-gradient-to-r ${req.color} text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Postuler - {req.fees.application}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Bourses & <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">Aides Financières</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nous soutenons l'excellence académique avec des programmes de bourses généreux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scholarships.map((scholarship, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-4 border border-white/20"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${scholarship.color} rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-500`}>
                  {scholarship.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-center group-hover:text-yellow-300 transition-colors duration-300">
                  {scholarship.name}
                </h3>
                
                <div className="text-3xl font-bold text-center mb-4 text-yellow-300">
                  {scholarship.amount}
                </div>
                
                <p className="text-gray-300 text-sm mb-4 text-center leading-relaxed">
                  {scholarship.criteria}
                </p>
                
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-3">Date limite:</div>
                  <div className="text-sm font-semibold text-orange-300">{scholarship.deadline}</div>
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-amber-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105">
                  Candidater
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">Candidature</span> Express
            </h2>
            <p className="text-xl text-gray-600">
              Commencez votre candidature en quelques minutes
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-all duration-300 group-hover:border-gray-300"
                    placeholder="Votre prénom"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-all duration-300 group-hover:border-gray-300"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-all duration-300 group-hover:border-gray-300"
                    placeholder="votre.email@exemple.com"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-all duration-300 group-hover:border-gray-300"
                    placeholder="+216 XX XXX XXX"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Programme d'Intérêt *</label>
                  <select
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-all duration-300 group-hover:border-gray-300"
                  >
                    <option value="">Sélectionner un programme</option>
                    <option value="agro">Sciences Agronomiques</option>
                    <option value="biotech">Biotechnologies</option>
                    <option value="food">Technologie Alimentaire</option>
                  </select>
                </div>
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Niveau d'Études *</label>
                  <select
                    required
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-all duration-300 group-hover:border-gray-300"
                  >
                    <option value="">Sélectionner un niveau</option>
                    <option value="licence">Licence</option>
                    <option value="master">Master</option>
                    <option value="doctorat">Doctorat</option>
                  </select>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lettre de Motivation *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.motivation}
                  onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-all duration-300 group-hover:border-gray-300"
                  placeholder="Expliquez vos motivations et vos objectifs académiques..."
                />
              </div>

              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-600 to-amber-500 text-white px-12 py-4 rounded-full text-lg font-bold hover:from-cyan-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
                >
                  Soumettre ma Candidature
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  * Champs obligatoires. Vos données sont protégées et confidentielles.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Votre Avenir Commence Ici
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed">
            Rejoignez une communauté d'excellence où l'innovation, la recherche et l'entrepreneuriat 
            se rencontrent pour créer les leaders de demain.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-purple-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Questions ? Contactez-nous
            </Link>
            <Link 
              href="/academics" 
              className="border-3 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Explorer nos Programmes
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}