'use client'

import { useState } from 'react'

interface StudentProfileProps {
  studentData: any
}

export default function StudentProfile({ studentData }: StudentProfileProps) {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: studentData.firstName,
    lastName: studentData.lastName,
    email: studentData.email,
    phone: '+216 98 765 432',
    address: '15 Avenue Habib Bourguiba, Ariana 2080',
    emergencyContact: 'Ahmed Ben Salem',
    emergencyPhone: '+216 71 234 567',
    dateOfBirth: '1998-05-15',
    placeOfBirth: 'Tunis, Tunisie',
    nationality: 'Tunisienne',
    cin: '12345678',
    bloodType: 'O+',
    medicalConditions: 'Aucune'
  })

  const academicInfo = {
    studentId: studentData.studentId,
    program: studentData.program,
    year: studentData.year,
    department: studentData.department,
    enrollmentDate: studentData.enrollmentDate,
    expectedGraduation: '2025-06-30',
    advisor: 'Prof. Mahmoud Sellami',
    status: studentData.status,
    totalCredits: 180,
    completedCredits: 120,
    currentGPA: 15.8,
    overallGPA: 15.5,
    academicStanding: 'Bon Standing'
  }

  const documents = [
    {
      name: 'Carte d\'Étudiant',
      type: 'ID',
      issueDate: '2024-09-15',
      expiryDate: '2025-09-14',
      status: 'Active',
      downloadUrl: '#'
    },
    {
      name: 'Certificat d\'Inscription',
      type: 'Certificate',
      issueDate: '2024-09-01',
      expiryDate: null,
      status: 'Valid',
      downloadUrl: '#'
    },
    {
      name: 'Relevé de Notes S1',
      type: 'Transcript',
      issueDate: '2024-02-15',
      expiryDate: null,
      status: 'Valid',
      downloadUrl: '#'
    },
    {
      name: 'Attestation de Scolarité',
      type: 'Certificate',
      issueDate: '2024-11-01',
      expiryDate: '2025-10-31',
      status: 'Active',
      downloadUrl: '#'
    }
  ]

  const activities = [
    {
      title: 'Club Robotique & IA',
      role: 'Membre Actif',
      period: '2023 - Présent',
      description: 'Participation aux projets de robotique agricole et développement d\'applications IA'
    },
    {
      title: 'Association Étudiante Sciences',
      role: 'Vice-Président',
      period: '2024 - Présent',
      description: 'Organisation d\'événements scientifiques et coordination des activités étudiantes'
    },
    {
      title: 'Équipe Hackathon AgriTech',
      role: 'Développeur',
      period: '2023',
      description: '2ème place au concours national d\'innovation agricole'
    },
    {
      title: 'Tutorat Étudiants 1ère Année',
      role: 'Tuteur',
      period: '2023 - 2024',
      description: 'Accompagnement pédagogique en mathématiques et statistiques'
    }
  ]

  const achievements = [
    {
      title: 'Bourse d\'Excellence Académique',
      date: '2024-09',
      type: 'Academic',
      description: 'Bourse de mérite pour résultats exceptionnels (Top 5%)',
      icon: '🏆'
    },
    {
      title: 'Prix Innovation AgriTech',
      date: '2024-05',
      type: 'Competition',
      description: '1ère place au concours d\'innovation technologique',
      icon: '🥇'
    },
    {
      title: 'Certification IoT Agriculture',
      date: '2024-03',
      type: 'Certification',
      description: 'Certification professionnelle en technologies IoT',
      icon: '📜'
    },
    {
      title: 'Stage d\'Excellence Internationale',
      date: '2023-07',
      type: 'Internship',
      description: 'Stage recherche à l\'INRA France (2 mois)',
      icon: '🌍'
    }
  ]

  const preferences = {
    language: 'Français',
    notifications: {
      email: true,
      sms: false,
      grades: true,
      events: true,
      deadlines: true,
      general: false
    },
    privacy: {
      profileVisible: true,
      contactVisible: false,
      achievementsVisible: true
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
    // Show success message
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50 border-green-200'
      case 'Valid': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'Expired': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const renderPersonalInfo = () => (
    <div className="space-y-8">
      {/* Profile Picture and Basic Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
              <img 
                src={studentData.avatar} 
                alt={`${studentData.firstName} ${studentData.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              📷
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {formData.firstName} {formData.lastName}
            </h2>
            <div className="space-y-2 text-gray-600">
              <p className="text-lg font-semibold text-blue-600">{academicInfo.program}</p>
              <p>Numéro Étudiant: {academicInfo.studentId}</p>
              <p>{academicInfo.year} • {academicInfo.department}</p>
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(academicInfo.status)}`}>
                {academicInfo.status}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                isEditing 
                  ? 'bg-gray-500 text-white hover:bg-gray-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isEditing ? 'Annuler' : 'Modifier'}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-300 hover:scale-105"
              >
                Sauvegarder
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations Personnelles</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date de Naissance</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Lieu de Naissance</label>
            <input
              type="text"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nationalité</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">CIN</label>
            <input
              type="text"
              name="cin"
              value={formData.cin}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none resize-vertical' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact d'Urgence</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom du Contact</label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone d'Urgence</label>
            <input
              type="tel"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations Médicales</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Groupe Sanguin</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Conditions Médicales</label>
            <input
              type="text"
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Aucune condition particulière"
              className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                isEditing ? 'border-blue-300 focus:border-blue-500 focus:outline-none' : 'border-gray-200 bg-gray-50'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderAcademicInfo = () => (
    <div className="space-y-8">
      {/* Academic Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Parcours Académique</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">{academicInfo.currentGPA}</div>
            <div className="text-sm text-gray-600">Moyenne Actuelle</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">{academicInfo.completedCredits}/{academicInfo.totalCredits}</div>
            <div className="text-sm text-gray-600">Crédits Complétés</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">{Math.round((academicInfo.completedCredits / academicInfo.totalCredits) * 100)}%</div>
            <div className="text-sm text-gray-600">Progression</div>
          </div>
        </div>
        
        <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Programme:</span>
              <span className="font-semibold">{academicInfo.program}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Année d'études:</span>
              <span className="font-semibold">{academicInfo.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Département:</span>
              <span className="font-semibold">{academicInfo.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Conseiller académique:</span>
              <span className="font-semibold">{academicInfo.advisor}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Date d'inscription:</span>
              <span className="font-semibold">{academicInfo.enrollmentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Diplômation prévue:</span>
              <span className="font-semibold">{academicInfo.expectedGraduation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Statut académique:</span>
              <span className="font-semibold text-green-600">{academicInfo.academicStanding}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Moyenne générale:</span>
              <span className="font-semibold">{academicInfo.overallGPA}/20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Progression du Programme</h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Crédits complétés</span>
              <span className="text-sm text-gray-500">{academicInfo.completedCredits}/{academicInfo.totalCredits}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${(academicInfo.completedCredits / academicInfo.totalCredits) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1ère Année</div>
              <div className="text-sm text-gray-600">60/60 crédits</div>
              <div className="text-green-600 font-semibold">✓ Complété</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">2ème Année</div>
              <div className="text-sm text-gray-600">60/60 crédits</div>
              <div className="text-green-600 font-semibold">✓ Complété</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3ème Année</div>
              <div className="text-sm text-gray-600">30/60 crédits</div>
              <div className="text-orange-600 font-semibold">⏳ En cours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDocuments = () => (
    <div className="space-y-6">
      {documents.map((doc, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-2xl">
                {doc.type === 'ID' ? '🆔' : doc.type === 'Certificate' ? '📜' : '📄'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{doc.name}</h3>
                <p className="text-gray-600">Émis le {doc.issueDate}</p>
                {doc.expiryDate && (
                  <p className="text-sm text-gray-500">Expire le {doc.expiryDate}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(doc.status)}`}>
                {doc.status}
              </div>
              <a
                href={doc.downloadUrl}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105"
              >
                Télécharger
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderActivities = () => (
    <div className="space-y-8">
      {/* Activities */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Activités Extracurriculaires</h3>
        
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-bold text-gray-900">{activity.title}</h4>
                <span className="text-sm text-gray-500">{activity.period}</span>
              </div>
              <div className="text-blue-600 font-semibold mb-2">{activity.role}</div>
              <p className="text-gray-600">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Réalisations & Distinctions</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{achievement.title}</h4>
                  <div className="text-sm text-blue-600 font-semibold mb-2">{achievement.date}</div>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                  <div className="mt-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {achievement.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'academic': return renderAcademicInfo()
      case 'documents': return renderDocuments()
      case 'activities': return renderActivities()
      default: return renderPersonalInfo()
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          👤 Mon Profil
        </h1>
        <p className="text-gray-600">Gérez vos informations personnelles et académiques</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-200">
          {[
            { id: 'personal', name: 'Informations Personnelles', icon: '👤' },
            { id: 'academic', name: 'Parcours Académique', icon: '🎓' },
            { id: 'documents', name: 'Documents', icon: '📄' },
            { id: 'activities', name: 'Activités & Réalisations', icon: '🏆' }
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