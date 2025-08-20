'use client'

import { useState } from 'react'

interface StudentDepartmentProps {
  studentData: any
}

export default function StudentDepartment({ studentData }: StudentDepartmentProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const departmentInfo = {
    name: 'Département des Sciences Appliquées',
    head: 'Prof. Mahmoud Sellami',
    email: 'sciences-appliquees@iseav-aru.tn',
    phone: '+216 71 123 789',
    location: 'Bâtiment A, 2ème étage',
    students: 340,
    programs: 5,
    faculty: 28,
    labs: 8
  }

  const faculty = [
    {
      name: 'Prof. Mahmoud Sellami',
      title: 'Chef de Département',
      specialization: 'Biotechnologie Végétale',
      email: 'mahmoud.sellami@iseav-aru.tn',
      phone: '+216 71 123 789',
      office: 'Bureau A201',
      hours: 'Lun-Mer 14h-16h',
      courses: ['Biotechnologie Végétale', 'Génétique Moléculaire'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Dr. Sonia Khadhraoui',
      title: 'Professeure Associée',
      specialization: 'Agriculture de Précision',
      email: 'sonia.khadhraoui@iseav-aru.tn',
      phone: '+216 71 123 790',
      office: 'Bureau A203',
      hours: 'Mar-Jeu 10h-12h',
      courses: ['Agriculture de Précision', 'Systèmes IoT'],
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b9e3?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Dr. Ahmed Ben Ali',
      title: 'Maître de Conférences',
      specialization: 'Chimie Analytique',
      email: 'ahmed.benali@iseav-aru.tn',
      phone: '+216 71 123 791',
      office: 'Bureau A205',
      hours: 'Lun-Jeu 15h-17h',
      courses: ['Chimie Organique', 'Analyse Instrumentale'],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Dr. Leila Mansouri',
      title: 'Professeure Assistante',
      specialization: 'Statistiques Appliquées',
      email: 'leila.mansouri@iseav-aru.tn',
      phone: '+216 71 123 792',
      office: 'Bureau A207',
      hours: 'Mar-Ven 09h-11h',
      courses: ['Statistiques Appliquées', 'Biostatistiques'],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ]

  const courses = [
    {
      code: 'BTV301',
      name: 'Biotechnologie Végétale',
      professor: 'Prof. Mahmoud Sellami',
      credits: 6,
      hours: 45,
      schedule: 'Lun 10h-12h, Mer 14h-16h',
      classroom: 'Amphithéâtre A',
      description: 'Techniques modernes de biotechnologie appliquées aux plantes'
    },
    {
      code: 'AGP302',
      name: 'Agriculture de Précision',
      professor: 'Dr. Sonia Khadhraoui',
      credits: 5,
      hours: 40,
      schedule: 'Mar 08h-10h, Jeu 14h-16h',
      classroom: 'Salle 201',
      description: 'Technologies IoT et intelligence artificielle en agriculture'
    },
    {
      code: 'CHO304',
      name: 'Chimie Organique',
      professor: 'Dr. Ahmed Ben Ali',
      credits: 5,
      hours: 40,
      schedule: 'Lun 14h-16h, Ven 10h-12h',
      classroom: 'Laboratoire 1',
      description: 'Chimie organique appliquée aux sciences du vivant'
    },
    {
      code: 'STA303',
      name: 'Statistiques Appliquées',
      professor: 'Dr. Leila Mansouri',
      credits: 4,
      hours: 30,
      schedule: 'Mer 10h-12h, Ven 14h-16h',
      classroom: 'Salle Informatique',
      description: 'Analyse statistique et traitement de données'
    }
  ]

  const labs = [
    {
      name: 'Laboratoire de Biotechnologie',
      code: 'LAB-BT01',
      capacity: 20,
      equipment: ['Microscopes électroniques', 'Séquenceurs ADN', 'Incubateurs'],
      responsible: 'Prof. Mahmoud Sellami',
      schedule: 'Lun-Ven 08h-18h',
      location: 'Bâtiment B, RDC'
    },
    {
      name: 'Laboratoire de Chimie Analytique',
      code: 'LAB-CH01',
      capacity: 16,
      equipment: ['Spectromètres', 'Chromatographes', 'Balances analytiques'],
      responsible: 'Dr. Ahmed Ben Ali',
      schedule: 'Lun-Ven 08h-17h',
      location: 'Bâtiment A, 1er étage'
    },
    {
      name: 'Salle Informatique IoT',
      code: 'LAB-IT01',
      capacity: 25,
      equipment: ['Ordinateurs', 'Capteurs IoT', 'Cartes Arduino'],
      responsible: 'Dr. Sonia Khadhraoui',
      schedule: 'Lun-Ven 08h-20h',
      location: 'Bâtiment C, 2ème étage'
    }
  ]

  const announcements = [
    {
      title: 'Calendrier des Examens Finaux',
      date: '2024-12-01',
      type: 'Examens',
      priority: 'Haute',
      content: 'Les examens finaux du semestre 2 auront lieu du 15 au 22 décembre 2024. Consultez le planning détaillé sur le portail étudiant.',
      author: 'Secrétariat Académique'
    },
    {
      title: 'Conférence Biotechnologie et Innovation',
      date: '2024-11-28',
      type: 'Événement',
      priority: 'Moyenne',
      content: 'Conférence internationale sur les dernières avancées en biotechnologie végétale le 5 décembre 2024 à 14h en Amphithéâtre A.',
      author: 'Prof. Mahmoud Sellami'
    },
    {
      title: 'Nouveau Logiciel Statistique',
      date: '2024-11-25',
      type: 'Ressources',
      priority: 'Basse',
      content: 'Installation du logiciel R Studio dans la salle informatique. Formation disponible sur demande.',
      author: 'Service Informatique'
    },
    {
      title: 'Projet de Fin d\'Études',
      date: '2024-11-20',
      type: 'Académique',
      priority: 'Haute',
      content: 'Date limite pour le dépôt des sujets de PFE : 30 novembre 2024. Formulaire disponible au secrétariat.',
      author: 'Coordination PFE'
    }
  ]

  const events = [
    {
      title: 'Soutenance de Thèse - Dr. Amira Zouari',
      date: '2024-12-10',
      time: '14:00',
      location: 'Salle de Conférence',
      type: 'Soutenance',
      description: 'Thèse sur l\'optimisation des rendements agricoles par l\'IA'
    },
    {
      title: 'Séminaire Agriculture Durable',
      date: '2024-12-12',
      time: '10:00',
      location: 'Amphithéâtre A',
      type: 'Séminaire',
      description: 'Présentation des dernières recherches en agriculture durable'
    },
    {
      title: 'Journée Portes Ouvertes Laboratoires',
      date: '2024-12-15',
      time: '09:00',
      location: 'Tous les laboratoires',
      type: 'Visite',
      description: 'Découverte des équipements et projets de recherche'
    }
  ]

  const resources = [
    {
      name: 'Bibliothèque Numérique',
      description: 'Accès aux revues scientifiques et ouvrages spécialisés',
      link: '#',
      type: 'Documentation',
      icon: '📚'
    },
    {
      name: 'Plateforme E-Learning',
      description: 'Cours en ligne et ressources pédagogiques',
      link: '#',
      type: 'Formation',
      icon: '💻'
    },
    {
      name: 'Réservation Laboratoires',
      description: 'Système de réservation des créneaux de TP',
      link: '#',
      type: 'Réservation',
      icon: '🔬'
    },
    {
      name: 'Support Technique',
      description: 'Assistance pour équipements et logiciels',
      link: '#',
      type: 'Support',
      icon: '🛠️'
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'text-red-600 bg-red-50 border-red-200'
      case 'Moyenne': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Basse': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Examens': return 'text-red-600 bg-red-50'
      case 'Événement': return 'text-blue-600 bg-blue-50'
      case 'Ressources': return 'text-green-600 bg-green-50'
      case 'Académique': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'faculty':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {faculty.map((prof, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
                    <img src={prof.image} alt={prof.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{prof.name}</h3>
                    <p className="text-blue-600 font-semibold">{prof.title}</p>
                    <p className="text-gray-600 text-sm">{prof.specialization}</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-3">📧</span>
                    <a href={`mailto:${prof.email}`} className="hover:text-blue-600 transition-colors">
                      {prof.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-3">📞</span>
                    <a href={`tel:${prof.phone}`} className="hover:text-blue-600 transition-colors">
                      {prof.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-3">🚪</span>
                    <span>{prof.office}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-3">🕒</span>
                    <span>{prof.hours}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Cours enseignés</h4>
                  <div className="flex flex-wrap gap-2">
                    {prof.courses.map((course, courseIndex) => (
                      <span key={courseIndex} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'courses':
        return (
          <div className="space-y-6">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                  <div className="mt-4 lg:mt-0 text-right">
                    <div className="text-2xl font-bold text-blue-600">{course.credits}</div>
                    <div className="text-sm text-gray-600">Crédits</div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-2">📋</span>
                    <span>Code: {course.code}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-2">👨‍🏫</span>
                    <span>{course.professor}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-2">🕒</span>
                    <span>{course.hours}h</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-2">📍</span>
                    <span>{course.classroom}</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-1">Horaires</h4>
                  <p className="text-blue-800 text-sm">{course.schedule}</p>
                </div>
              </div>
            ))}
          </div>
        )
      
      case 'labs':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {labs.map((lab, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{lab.name}</h3>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{lab.capacity}</div>
                    <div className="text-sm text-gray-600">Places</div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-3">🏷️</span>
                    <span>Code: {lab.code}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-3">👨‍🔬</span>
                    <span>{lab.responsible}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-3">🕒</span>
                    <span>{lab.schedule}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="w-5 h-5 mr-3">📍</span>
                    <span>{lab.location}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Équipements</h4>
                  <div className="flex flex-wrap gap-2">
                    {lab.equipment.map((equipment, equipIndex) => (
                      <span key={equipIndex} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        {equipment}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105">
                  Réserver un Créneau
                </button>
              </div>
            ))}
          </div>
        )
      
      case 'resources':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl">
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.name}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {resource.type}
                      </span>
                      <a 
                        href={resource.link}
                        className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                      >
                        Accéder →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      
      default:
        return (
          <div className="space-y-8">
            {/* Department Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">{departmentInfo.students}</div>
                <div className="text-sm text-gray-600">Étudiants</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">{departmentInfo.faculty}</div>
                <div className="text-sm text-gray-600">Enseignants</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">{departmentInfo.programs}</div>
                <div className="text-sm text-gray-600">Programmes</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                <div className="text-3xl font-bold text-orange-600 mb-2">{departmentInfo.labs}</div>
                <div className="text-sm text-gray-600">Laboratoires</div>
              </div>
            </div>

            {/* Announcements and Events */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">📢</span>
                  Annonces Récentes
                </h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {announcements.map((announcement, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                        <div className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{announcement.content}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>{announcement.date}</span>
                          <span className={`px-2 py-1 rounded ${getTypeColor(announcement.type)}`}>
                            {announcement.type}
                          </span>
                        </div>
                        <span>Par {announcement.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-3">📅</span>
                  Événements à Venir
                </h2>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{event.title}</h3>
                        <div className="text-xs text-gray-500">{event.type}</div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                      <div className="flex items-center text-xs text-gray-500 space-x-4">
                        <span>📅 {event.date}</span>
                        <span>🕒 {event.time}</span>
                        <span>📍 {event.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-8">
      {/* Department Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🏫 {departmentInfo.name}
            </h1>
            <p className="text-gray-600">Votre département académique</p>
          </div>
          <div className="mt-4 lg:mt-0 text-right">
            <div className="text-lg font-semibold text-blue-600">{departmentInfo.head}</div>
            <div className="text-sm text-gray-600">Chef de Département</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div className="flex items-center text-gray-600">
            <span className="w-5 h-5 mr-3">📧</span>
            <a href={`mailto:${departmentInfo.email}`} className="hover:text-blue-600 transition-colors">
              {departmentInfo.email}
            </a>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-5 h-5 mr-3">📞</span>
            <a href={`tel:${departmentInfo.phone}`} className="hover:text-blue-600 transition-colors">
              {departmentInfo.phone}
            </a>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-5 h-5 mr-3">📍</span>
            <span>{departmentInfo.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="w-5 h-5 mr-3">🎓</span>
            <span>{studentData.program}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-200">
          {[
            { id: 'overview', name: 'Vue d\'ensemble', icon: '📊' },
            { id: 'faculty', name: 'Corps Enseignant', icon: '👨‍🏫' },
            { id: 'courses', name: 'Mes Cours', icon: '📚' },
            { id: 'labs', name: 'Laboratoires', icon: '🔬' },
            { id: 'resources', name: 'Ressources', icon: '🛠️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-0 px-4 py-4 text-sm font-medium transition-all duration-300 hover:bg-gray-50 ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}