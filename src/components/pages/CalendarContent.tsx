'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CalendarContent() {
  const [selectedSemester, setSelectedSemester] = useState('current')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const semesters = [
    { id: 'current', name: 'Semestre Actuel', period: 'Septembre 2024 - Janvier 2025' },
    { id: 'next', name: 'Prochain Semestre', period: 'Février 2025 - Juin 2025' },
    { id: 'summer', name: 'Session d\'Été', period: 'Juillet 2025 - Août 2025' }
  ]

  const categories = [
    { id: 'all', name: 'Tous les Événements', color: 'from-gray-500 to-gray-600' },
    { id: 'academic', name: 'Académique', color: 'from-blue-500 to-indigo-600' },
    { id: 'exams', name: 'Examens', color: 'from-red-500 to-pink-600' },
    { id: 'holidays', name: 'Vacances', color: 'from-green-500 to-emerald-600' },
    { id: 'events', name: 'Événements', color: 'from-purple-500 to-violet-600' },
    { id: 'deadlines', name: 'Échéances', color: 'from-orange-500 to-amber-600' }
  ]

  const academicEvents = [
    {
      id: 1,
      title: 'Rentrée Académique 2024-2025',
      date: '2024-09-15',
      category: 'academic',
      type: 'Début des cours',
      description: 'Début officiel de l\'année académique pour tous les programmes',
      color: 'from-blue-500 to-indigo-600',
      icon: '🎓'
    },
    {
      id: 2,
      title: 'Inscriptions Pédagogiques',
      date: '2024-09-01',
      endDate: '2024-09-14',
      category: 'deadlines',
      type: 'Échéance Administrative',
      description: 'Période d\'inscription aux cours et validation des parcours',
      color: 'from-orange-500 to-amber-600',
      icon: '📝'
    },
    {
      id: 3,
      title: 'Examens Partiels S1',
      date: '2024-11-04',
      endDate: '2024-11-15',
      category: 'exams',
      type: 'Évaluations',
      description: 'Première session d\'examens partiels du semestre',
      color: 'from-red-500 to-pink-600',
      icon: '📋'
    },
    {
      id: 4,
      title: 'Vacances d\'Automne',
      date: '2024-10-28',
      endDate: '2024-11-03',
      category: 'holidays',
      type: 'Congés',
      description: 'Pause académique - Suspension des cours',
      color: 'from-green-500 to-emerald-600',
      icon: '🍂'
    },
    {
      id: 5,
      title: 'Salon de l\'Innovation Agricole',
      date: '2024-12-10',
      endDate: '2024-12-12',
      category: 'events',
      type: 'Événement Institutionnel',
      description: 'Exposition des projets étudiants et innovations technologiques',
      color: 'from-purple-500 to-violet-600',
      icon: '🚀'
    },
    {
      id: 6,
      title: 'Examens Finaux S1',
      date: '2025-01-13',
      endDate: '2025-01-25',
      category: 'exams',
      type: 'Évaluations Finales',
      description: 'Session d\'examens finaux du premier semestre',
      color: 'from-red-500 to-pink-600',
      icon: '📊'
    },
    {
      id: 7,
      title: 'Vacances d\'Hiver',
      date: '2024-12-23',
      endDate: '2025-01-06',
      category: 'holidays',
      type: 'Congés',
      description: 'Période de vacances hivernales',
      color: 'from-green-500 to-emerald-600',
      icon: '❄️'
    },
    {
      id: 8,
      title: 'Début Semestre 2',
      date: '2025-02-03',
      category: 'academic',
      type: 'Nouveau Semestre',
      description: 'Reprise des cours pour le second semestre',
      color: 'from-blue-500 to-indigo-600',
      icon: '📚'
    },
    {
      id: 9,
      title: 'Stage Professionnel L3',
      date: '2025-03-15',
      endDate: '2025-05-15',
      category: 'academic',
      type: 'Formation Pratique',
      description: 'Période de stage obligatoire pour les étudiants de 3ème année',
      color: 'from-blue-500 to-indigo-600',
      icon: '💼'
    },
    {
      id: 10,
      title: 'Conférence Internationale AgriTech',
      date: '2025-04-20',
      endDate: '2025-04-22',
      category: 'events',
      type: 'Conférence Scientifique',
      description: 'Conférence internationale sur les technologies agricoles',
      color: 'from-purple-500 to-violet-600',
      icon: '🌍'
    },
    {
      id: 11,
      title: 'Soutenance Mémoires Master',
      date: '2025-06-10',
      endDate: '2025-06-20',
      category: 'academic',
      type: 'Soutenances',
      description: 'Période de soutenance des mémoires de fin d\'études Master',
      color: 'from-blue-500 to-indigo-600',
      icon: '🎯'
    },
    {
      id: 12,
      title: 'Cérémonie de Remise des Diplômes',
      date: '2025-07-05',
      category: 'events',
      type: 'Cérémonie Officielle',
      description: 'Remise solennelle des diplômes aux nouveaux diplômés',
      color: 'from-purple-500 to-violet-600',
      icon: '🏆'
    }
  ]

  const filteredEvents = selectedCategory === 'all' 
    ? academicEvents 
    : academicEvents.filter(event => event.category === selectedCategory)

  const stats = [
    { label: 'Semaines de Cours', value: '32', icon: '📅' },
    { label: 'Sessions d\'Examen', value: '4', icon: '📝' },
    { label: 'Événements Académiques', value: '25+', icon: '🎓' },
    { label: 'Périodes de Stage', value: '3', icon: '💼' }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const formatDateRange = (startDate: string, endDate?: string) => {
    if (!endDate) return formatDate(startDate)
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-teal-800/70 to-cyan-700/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
                <span className="bg-gradient-to-r from-cyan-300 to-amber-300 bg-clip-text text-transparent">
                  Calendrier Académique
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-cyan-100 animate-fade-in-up delay-200">
                Planification & Organisation de l'Année
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Consultez toutes les dates importantes, événements académiques et échéances 
                pour une année universitaire parfaitement organisée.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
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
      `}</style>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-full flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Controls */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Semester Selection */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sélectionner la Période</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {semesters.map((semester) => (
                <button
                  key={semester.id}
                  onClick={() => setSelectedSemester(semester.id)}
                  className={`p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                    selectedSemester === semester.id
                      ? 'bg-gradient-to-r from-cyan-600 to-amber-500 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <h4 className="font-semibold mb-1">{semester.name}</h4>
                  <p className="text-sm opacity-90">{semester.period}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Filtrer par Catégorie</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Événements <span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">Académiques</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calendrier détaillé des événements, examens et dates importantes de l'année universitaire
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-amber-500"></div>

            <div className="space-y-12">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-cyan-500 z-10 group-hover:scale-125 transition-transform duration-300">
                    <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-amber-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* Event Card */}
                  <div className={`group w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-16 ml-20 md:ml-0' : 'md:ml-auto md:pl-16 ml-20 md:ml-0'
                  }`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                      {/* Event Header */}
                      <div className={`p-6 bg-gradient-to-r ${event.color}`}>
                        <div className="flex items-center justify-between">
                          <div className="text-white">
                            <div className="text-3xl mb-2">{event.icon}</div>
                            <h3 className="text-xl font-bold mb-1 group-hover:scale-105 transition-transform duration-300">
                              {event.title}
                            </h3>
                            <p className="text-white/90 font-medium text-sm">{event.type}</p>
                          </div>
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className="p-6">
                        <div className="mb-4">
                          <div className="flex items-center text-gray-600 mb-2">
                            <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold">
                              {formatDateRange(event.date, event.endDate)}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-4">
                          {event.description}
                        </p>

                        {/* Event Actions */}
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 bg-gradient-to-r ${event.color} text-white rounded-full text-sm font-medium`}>
                            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                          </span>
                          
                          <button className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center transition-colors duration-300">
                            En savoir plus
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Actions <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">Rapides</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Accédez rapidement aux services et informations académiques essentiels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Inscriptions',
                description: 'Gérer vos inscriptions et choix de cours',
                icon: '📝',
                link: '/admissions',
                color: 'from-blue-500 to-indigo-600'
              },
              {
                title: 'Examens',
                description: 'Consulter calendrier et résultats d\'examens',
                icon: '📊',
                link: '/student-portal/exams',
                color: 'from-red-500 to-pink-600'
              },
              {
                title: 'Cours',
                description: 'Accéder au catalogue complet des cours',
                icon: '📚',
                link: '/academics/courses',
                color: 'from-purple-500 to-violet-600'
              },
              {
                title: 'Support',
                description: 'Assistance et services étudiants',
                icon: '🎯',
                link: '/contact',
                color: 'from-green-500 to-emerald-600'
              }
            ].map((action, index) => (
              <Link
                key={index}
                href={action.link}
                className="group block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center transform hover:scale-105 transition-all duration-300 bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Restez Informé de l'Actualité Académique
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Abonnez-vous aux notifications pour recevoir les mises à jour importantes 
            du calendrier académique directement dans votre messagerie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/student-portal" 
              className="bg-white text-cyan-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Portail Étudiant
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}