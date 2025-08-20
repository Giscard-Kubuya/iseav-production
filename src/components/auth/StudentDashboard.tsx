'use client'

import { useState, useEffect } from 'react'
import StudentResults from './dashboard/StudentResults'
import StudentFinances from './dashboard/StudentFinances'
import StudentDepartment from './dashboard/StudentDepartment'
import StudentProfile from './dashboard/StudentProfile'

interface StudentDashboardProps {
  studentData: any
  onLogout: () => void
}

export default function StudentDashboard({ studentData, onLogout }: StudentDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const menuItems = [
    {
      id: 'overview',
      name: 'Tableau de Bord',
      icon: '📊',
      description: 'Vue d\'ensemble de vos informations'
    },
    {
      id: 'results',
      name: 'Bulletins & Résultats',
      icon: '📈',
      description: 'Notes et bulletins scolaires'
    },
    {
      id: 'finances',
      name: 'Situation Financière',
      icon: '💰',
      description: 'Frais de scolarité et paiements'
    },
    {
      id: 'department',
      name: 'Mon Département',
      icon: '🏫',
      description: 'Informations départementales'
    },
    {
      id: 'profile',
      name: 'Mon Profil',
      icon: '👤',
      description: 'Informations personnelles'
    }
  ]

  const quickStats = [
    {
      label: 'Moyenne Générale',
      value: '15.8/20',
      icon: '📊',
      color: 'from-green-500 to-emerald-600',
      change: '+0.5 ce semestre'
    },
    {
      label: 'Crédits Validés',
      value: '120/180',
      icon: '📚',
      color: 'from-blue-500 to-indigo-600',
      change: '30 crédits ce semestre'
    },
    {
      label: 'Solde Financier',
      value: 'À jour',
      icon: '💳',
      color: 'from-purple-500 to-violet-600',
      change: 'Dernière échéance payée'
    },
    {
      label: 'Présence',
      value: '95%',
      icon: '👥',
      color: 'from-orange-500 to-red-600',
      change: 'Excellent assiduité'
    }
  ]

  const recentActivities = [
    {
      type: 'note',
      title: 'Nouvelle note disponible',
      description: 'Examen de Biotechnologie Végétale - 16/20',
      time: 'Il y a 2 heures',
      icon: '📝',
      color: 'text-green-600'
    },
    {
      type: 'payment',
      title: 'Paiement enregistré',
      description: 'Frais de scolarité S2 - 850 TND',
      time: 'Il y a 1 jour',
      icon: '💰',
      color: 'text-blue-600'
    },
    {
      type: 'course',
      title: 'Nouveau cours ajouté',
      description: 'Agriculture de Précision - Prof. M. Sellami',
      time: 'Il y a 3 jours',
      icon: '📚',
      color: 'text-purple-600'
    },
    {
      type: 'announcement',
      title: 'Annonce du département',
      description: 'Calendrier des examens de fin de semestre',
      time: 'Il y a 5 jours',
      icon: '📢',
      color: 'text-orange-600'
    }
  ]

  const upcomingEvents = [
    {
      title: 'Examen Biotechnologie',
      date: '2024-12-15',
      time: '09:00',
      location: 'Amphithéâtre A',
      type: 'exam'
    },
    {
      title: 'TP Agriculture de Précision',
      date: '2024-12-18',
      time: '14:00',
      location: 'Laboratoire 2',
      type: 'lab'
    },
    {
      title: 'Soutenance de Projet',
      date: '2024-12-20',
      time: '10:30',
      location: 'Salle de Conférence',
      type: 'presentation'
    }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'results':
        return <StudentResults studentData={studentData} />
      case 'finances':
        return <StudentFinances studentData={studentData} />
      case 'department':
        return <StudentDepartment studentData={studentData} />
      case 'profile':
        return <StudentProfile studentData={studentData} />
      default:
        return (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center text-2xl mb-4 mx-auto`}>
                    {stat.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.change}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">🔔</span>
                  Activités Récentes
                </h2>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${activity.color} bg-current bg-opacity-10`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                        <p className="text-gray-600 text-sm">{activity.description}</p>
                        <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">📅</span>
                  Événements à Venir
                </h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">
                          {event.type === 'exam' ? '📝' : event.type === 'lab' ? '🔬' : '🎤'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <p className="text-gray-600 text-sm flex items-center">
                          <span className="mr-4">📅 {event.date}</span>
                          <span className="mr-4">🕒 {event.time}</span>
                          <span>📍 {event.location}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Academic Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">📈</span>
                Progression Académique
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="w-full h-full bg-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ clipPath: 'polygon(0 0, 67% 0, 67% 100%, 0 100%)' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">67%</div>
                        <div className="text-xs text-gray-600">Progression</div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900">Programme Complet</h3>
                  <p className="text-gray-600 text-sm">120/180 crédits validés</p>
                </div>

                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="w-full h-full bg-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ clipPath: 'polygon(0 0, 85% 0, 85% 100%, 0 100%)' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">85%</div>
                        <div className="text-xs text-gray-600">Semestre</div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900">Semestre Actuel</h3>
                  <p className="text-gray-600 text-sm">25/30 crédits en cours</p>
                </div>

                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="w-full h-full bg-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full" style={{ clipPath: 'polygon(0 0, 95% 0, 95% 100%, 0 100%)' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">95%</div>
                        <div className="text-xs text-gray-600">Présence</div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900">Assiduité</h3>
                  <p className="text-gray-600 text-sm">Excellent niveau</p>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                <img 
                  src={studentData.avatar} 
                  alt={`${studentData.firstName} ${studentData.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Bonjour, {studentData.firstName} {studentData.lastName}
                </h1>
                <p className="text-gray-600 text-sm">
                  {studentData.program} • {studentData.year}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Numéro Étudiant</div>
                <div className="font-semibold text-gray-900">{studentData.studentId}</div>
              </div>
              <button
                onClick={onLogout}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Navigation</h2>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className={`text-xs ${activeSection === item.id ? 'text-blue-100' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}