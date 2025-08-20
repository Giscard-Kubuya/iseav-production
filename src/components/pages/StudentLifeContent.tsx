'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function StudentLifeContent() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const categories = [
    { id: 'all', name: 'Tout', count: 25 },
    { id: 'activities', name: 'Activités', count: 8 },
    { id: 'services', name: 'Services', count: 7 },
    { id: 'clubs', name: 'Clubs & Associations', count: 6 },
    { id: 'facilities', name: 'Installations', count: 4 }
  ]

  const studentActivities = [
    {
      id: 1,
      category: 'activities',
      title: 'Semaine d\'Intégration AgriTech',
      description: 'Programme complet d\'accueil et d\'intégration pour les nouveaux étudiants avec ateliers, visites et activités team-building.',
      date: 'Septembre 2024',
      duration: '5 jours',
      participants: '300+ étudiants',
      activities: [
        'Cérémonie d\'accueil officielle',
        'Ateliers découverte des laboratoires',
        'Tournoi sportif inter-promotions',
        'Soirée culturelle et gastronomie',
        'Projet collaboratif innovation'
      ],
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-500 to-indigo-600',
      icon: '🎉'
    },
    {
      id: 2,
      category: 'clubs',
      title: 'Club Robotique & IA',
      description: 'Association étudiante dédiée au développement de robots agricoles et solutions IA pour l\'agriculture de précision.',
      members: '45 membres actifs',
      founded: '2021',
      achievements: '3 prix nationaux',
      projects: [
        'Robot autonome de semis',
        'Drone surveillance cultures',
        'App IA diagnostic maladies',
        'Système irrigation intelligent',
        'Plateforme IoT campus'
      ],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-purple-500 to-violet-600',
      icon: '🤖'
    },
    {
      id: 3,
      category: 'services',
      title: 'Centre de Carrière & Emploi',
      description: 'Service d\'accompagnement professionnel proposant orientation, stage, emploi et entrepreneuriat pour tous les étudiants.',
      services: [
        'Conseil en orientation professionnelle',
        'Recherche de stages et emplois',
        'Ateliers CV et entretiens',
        'Incubateur startup étudiante',
        'Réseau alumni et mentoring'
      ],
      stats: {
        'Taux d\'emploi': '95%',
        'Stages trouvés': '280/an',
        'Startups incubées': '12',
        'Entreprises partenaires': '150+'
      },
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-green-500 to-emerald-600',
      icon: '💼'
    },
    {
      id: 4,
      category: 'facilities',
      title: 'Campus Résidentiel',
      description: 'Résidences étudiantes modernes avec chambres individuelles, espaces communs, wifi haut débit et services intégrés.',
      capacity: '500 étudiants',
      buildings: '4 bâtiments',
      amenities: [
        'Chambres meublées climatisées',
        'Cuisine commune équipée',
        'Salle d\'étude 24h/24',
        'Espace détente et télévision',
        'Laverie automatique',
        'Sécurité et surveillance'
      ],
      rates: {
        'Chambre individuelle': '180 TND/mois',
        'Chambre partagée': '120 TND/mois',
        'Studio': '250 TND/mois'
      },
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-orange-500 to-red-600',
      icon: '🏠'
    },
    {
      id: 5,
      category: 'activities',
      title: 'Festival Innovation Agricole',
      description: 'Événement annuel majeur showcasing innovations étudiantes avec expo-science, concours, conférences et networking.',
      frequency: 'Annuel - Mai',
      duration: '3 jours',
      visitors: '2000+ visiteurs',
      competitions: [
        'Concours innovation technologique',
        'Pitch startup agritech',
        'Hackathon agriculture durable',
        'Expo projets de fin d\'études',
        'Forum emploi et stages'
      ],
      prizes: 'Plus de 15,000 TND de prix',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-teal-500 to-cyan-600',
      icon: '🏆'
    },
    {
      id: 6,
      category: 'services',
      title: 'Soutien Psychologique & Bien-être',
      description: 'Service d\'accompagnement psychologique et de bien-être pour supporter la réussite académique et personnelle.',
      team: '3 psychologues certifiés',
      availability: 'Lun-Ven 8h-17h',
      services_offered: [
        'Consultation psychologique individuelle',
        'Thérapie de groupe anti-stress',
        'Ateliers gestion du temps',
        'Programme méditation mindfulness',
        'Orientation académique personnalisée'
      ],
      statistics: {
        'Étudiants aidés/an': '250+',
        'Satisfaction': '94%',
        'Séances/mois': '180',
        'Ateliers/semestre': '24'
      },
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-pink-500 to-rose-600',
      icon: '🧘'
    }
  ]

  const studentServices = [
    {
      name: 'Bibliothèque Universitaire',
      description: 'Collection de 50,000+ ouvrages, espaces d\'étude, accès digital',
      hours: '7h-22h (Lun-Sam)',
      icon: '📚',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Centre Médical',
      description: 'Soins médicaux, infirmerie, urgences et prévention santé',
      hours: '8h-18h (Lun-Ven)',
      icon: '🏥',
      color: 'from-red-500 to-pink-600'
    },
    {
      name: 'Restaurant Universitaire',
      description: 'Repas équilibrés, menus variés, prix étudiants préférentiels',
      hours: '11h30-14h30 & 18h-21h',
      icon: '🍽️',
      color: 'from-orange-500 to-yellow-600'
    },
    {
      name: 'Transport Campus',
      description: 'Navettes gratuites campus-ville, liaisons inter-sites',
      hours: '7h-20h (Lun-Ven)',
      icon: '🚌',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Complexe Sportif',
      description: 'Terrains multisports, salle fitness, piscine, cours collectifs',
      hours: '6h-22h (7j/7)',
      icon: '🏃',
      color: 'from-purple-500 to-violet-600'
    },
    {
      name: 'Services Bancaires',
      description: 'Distributeurs ATM, services bancaires étudiants sur campus',
      hours: '24h/24 (ATM)',
      icon: '🏦',
      color: 'from-teal-500 to-cyan-600'
    }
  ]

  const filteredActivities = selectedCategory === 'all' 
    ? studentActivities 
    : studentActivities.filter(activity => activity.category === selectedCategory)

  const stats = [
    { label: 'Étudiants Actifs', value: '1,200+', icon: '🎓', description: 'Communauté étudiante' },
    { label: 'Clubs & Associations', value: '25+', icon: '🤝', description: 'Organisations étudiantes' },
    { label: 'Événements/An', value: '150+', icon: '🎪', description: 'Activités et événements' },
    { label: 'Taux Satisfaction', value: '96%', icon: '😊', description: 'Satisfaction vie étudiante' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-red-800/75 to-pink-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-yellow-300 via-white to-orange-300 bg-clip-text text-transparent">
                  Vie Étudiante
                </span>
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-orange-100 animate-fade-in-up delay-200">
                Expérience Universitaire Enrichissante
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Découvrez une vie étudiante dynamique et épanouissante avec des activités variées, 
                des services de qualité et une communauté bienveillante.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-600">
                <Link 
                  href="#activities"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-orange-500/25"
                >
                  Nos Activités
                </Link>
                <Link 
                  href="#services"
                  className="border-3 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-orange-900 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                >
                  Services Étudiants
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Student Life Icons */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-400/20 rounded-full animate-bounce delay-1000 flex items-center justify-center text-2xl">🎓</div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-red-400/20 rounded-full animate-bounce delay-1500 flex items-center justify-center text-xl">🎪</div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-pink-400/20 rounded-full animate-bounce delay-2000 flex items-center justify-center text-lg">🤝</div>

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
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500 shadow-lg group-hover:shadow-2xl">
                    {stat.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-5xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Services <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Étudiants</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un ensemble complet de services pour accompagner votre réussite académique et personnelle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentServices.map((service, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-6 bg-gradient-to-r ${service.color} text-white`}>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-white/90 text-sm">{service.hours}</p>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities & Programs */}
      <section id="activities" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Activités & <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Programmes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une vie étudiante riche en expériences, apprentissages et moments de partage
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-4 p-2 bg-white rounded-full shadow-lg">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Activities Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredActivities.map((activity, index) => (
              <div
                key={activity.id}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Activity Image */}
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${activity.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${activity.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
                  
                  {/* Activity Icon */}
                  <div className="absolute top-4 left-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                      {activity.icon}
                    </div>
                  </div>

                  {/* Activity Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                      {activity.title}
                    </h3>
                  </div>
                </div>

                {/* Activity Content */}
                <div className="p-8">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {activity.description}
                  </p>

                  {/* Activity Details */}
                  <div className="space-y-4 mb-6">
                    {activity.date && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        <span className="font-medium">Date:</span>
                        <span className="ml-2">{activity.date}</span>
                      </div>
                    )}
                    
                    {activity.duration && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        <span className="font-medium">Durée:</span>
                        <span className="ml-2">{activity.duration}</span>
                      </div>
                    )}

                    {activity.participants && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        <span className="font-medium">Participants:</span>
                        <span className="ml-2">{activity.participants}</span>
                      </div>
                    )}

                    {activity.members && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        <span className="font-medium">Membres:</span>
                        <span className="ml-2">{activity.members}</span>
                      </div>
                    )}
                  </div>

                  {/* Activity Lists */}
                  {activity.activities && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        Programme
                      </h4>
                      <div className="space-y-2">
                        {activity.activities.map((act, idx) => (
                          <div key={idx} className="flex items-start text-sm text-gray-600">
                            <span className="w-1 h-1 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {act}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activity.projects && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Projets Réalisés
                      </h4>
                      <div className="space-y-2">
                        {activity.projects.slice(0, 3).map((project, idx) => (
                          <div key={idx} className="flex items-start text-sm text-gray-600">
                            <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {project}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activity.services && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Services Proposés
                      </h4>
                      <div className="space-y-2">
                        {activity.services.slice(0, 3).map((service, idx) => (
                          <div key={idx} className="flex items-start text-sm text-gray-600">
                            <span className="w-1 h-1 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            {service}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Statistics */}
                  {activity.stats && (
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      {Object.entries(activity.stats).map(([key, value], idx) => (
                        <div key={idx}>
                          <div className="text-sm text-gray-500 mb-1">{key}</div>
                          <div className="font-semibold text-orange-600">{value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/student-life/${activity.id}`}
                      className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      En Savoir Plus
                    </Link>
                    <Link
                      href="/contact"
                      className="px-4 py-3 border-2 border-orange-600 text-orange-600 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      Rejoindre
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Life Highlights */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Vie sur le <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Campus</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Un environnement stimulant conçu pour favoriser l'épanouissement personnel et académique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Espaces d\'Étude',
                description: 'Bibliothèque moderne, salles de groupe, zones silencieuses',
                icon: '📚',
                features: ['Wi-Fi haut débit', 'Accès 24h/24', '500+ places', 'Ressources numériques']
              },
              {
                title: 'Activités Sportives',
                description: 'Complexe sportif complet avec équipements modernes',
                icon: '🏃',
                features: ['Terrain multisports', 'Salle de fitness', 'Cours collectifs', 'Piscine olympique']
              },
              {
                title: 'Vie Associative',
                description: 'Plus de 25 clubs et associations étudiantes actives',
                icon: '🤝',
                features: ['Clubs scientifiques', 'Associations culturelles', 'Projets humanitaires', 'Événements réguliers']
              },
              {
                title: 'Innovation Hub',
                description: 'Espaces de co-working et incubateur startup étudiant',
                icon: '💡',
                features: ['FabLab équipé', 'Mentoring expert', 'Financement projets', 'Réseau alumni']
              }
            ].map((highlight, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-4 border border-white/20"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-500">
                  {highlight.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-center group-hover:text-orange-300 transition-colors duration-300">
                  {highlight.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 text-center leading-relaxed">
                  {highlight.description}
                </p>
                
                <div className="space-y-2">
                  {highlight.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Rejoignez Notre Communauté
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed">
            Intégrez une communauté étudiante dynamique où chaque expérience contribue 
            à votre développement personnel et professionnel.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/admissions" 
              className="bg-white text-orange-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Candidater Maintenant
            </Link>
            <Link 
              href="/contact" 
              className="border-3 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}