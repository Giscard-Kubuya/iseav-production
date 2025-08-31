'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Employee {
  email: string
  firstName?: string
  lastName?: string
  department?: string
  position?: string
  loginTime: number
}

interface Message {
  id: string
  from: string
  subject: string
  content: string
  date: string
  read: boolean
  priority: 'low' | 'normal' | 'high'
}

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedAt: string
  category: string
}

interface JobApplication {
  id: string
  position: string
  department: string
  appliedAt: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  notes?: string
}

export default function DashboardContent() {
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'Direction CEPAC',
      subject: 'Réunion pédagogique - Vendredi 15h00',
      content: 'Bonjour, nous vous invitons à participer à la réunion pédagogique de ce vendredi à 15h00 en salle des professeurs.',
      date: '2024-01-15',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      from: 'RH CEPAC',
      subject: 'Mise à jour du règlement intérieur',
      content: 'Le nouveau règlement intérieur est disponible. Merci de le consulter et de confirmer votre lecture.',
      date: '2024-01-14',
      read: true,
      priority: 'normal'
    },
    {
      id: '3',
      from: 'Comptabilité',
      subject: 'Fiche de paie - Janvier 2024',
      content: 'Votre fiche de paie du mois de janvier est disponible dans vos documents.',
      date: '2024-01-12',
      read: true,
      priority: 'normal'
    }
  ])

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Fiche de paie - Janvier 2024.pdf',
      type: 'PDF',
      size: '245 KB',
      uploadedAt: '2024-01-12',
      category: 'Paie'
    },
    {
      id: '2',
      name: 'Planning des cours - Semestre 1.xlsx',
      type: 'Excel',
      size: '180 KB',
      uploadedAt: '2024-01-10',
      category: 'Pédagogie'
    },
    {
      id: '3',
      name: 'Règlement intérieur 2024.pdf',
      type: 'PDF',
      size: '320 KB',
      uploadedAt: '2024-01-08',
      category: 'Administration'
    }
  ])

  const [jobApplications, setJobApplications] = useState<JobApplication[]>([
    {
      id: '1',
      position: 'Enseignant Principal - Mathématiques',
      department: 'Enseignement',
      appliedAt: '2024-01-05',
      status: 'reviewed',
      notes: 'Candidature retenue pour entretien'
    },
    {
      id: '2',
      position: 'Coordinateur Pédagogique',
      department: 'Direction',
      appliedAt: '2023-12-15',
      status: 'accepted',
      notes: 'Félicitations! Poste obtenu'
    }
  ])

  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    content: ''
  })

  const [newReport, setNewReport] = useState({
    type: '',
    title: '',
    description: '',
    priority: 'normal' as 'low' | 'normal' | 'high',
    department: ''
  })

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('employeeAuth')
    if (!auth) {
      router.push('/inscription')
      return
    }

    try {
      const employeeData = JSON.parse(auth)
      setEmployee(employeeData)
      setIsLoading(false)
    } catch (error) {
      console.error('Auth error:', error)
      router.push('/inscription')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('employeeAuth')
    router.push('/')
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Add message to sent messages (in real app, would send to API)
    const message: Message = {
      id: Date.now().toString(),
      from: `${employee?.firstName} ${employee?.lastName}`,
      subject: newMessage.subject,
      content: newMessage.content,
      date: new Date().toISOString().split('T')[0],
      read: false,
      priority: 'normal'
    }

    // Reset form
    setNewMessage({ recipient: '', subject: '', content: '' })
    
    // Show success message
    alert('Message envoyé avec succès!')
  }

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Submit report (in real app, would send to API)
    console.log('Report submitted:', newReport)
    
    // Reset form
    setNewReport({
      type: '',
      title: '',
      description: '',
      priority: 'normal',
      department: ''
    })
    
    alert('Rapport soumis avec succès!')
  }

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ))
  }

  const getStatusBadge = (status: JobApplication['status']) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    }
    
    const labels = {
      pending: 'En attente',
      reviewed: 'En révision',
      accepted: 'Acceptée',
      rejected: 'Refusée'
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const getPriorityIcon = (priority: Message['priority']) => {
    if (priority === 'high') return '🔴'
    if (priority === 'normal') return '🟡'
    return '🟢'
  }

  const stats = [
    { label: 'Messages non lus', value: messages.filter(m => !m.read).length, icon: '📧', color: 'bg-blue-500' },
    { label: 'Documents', value: documents.length, icon: '📄', color: 'bg-green-500' },
    { label: 'Candidatures', value: jobApplications.length, icon: '💼', color: 'bg-purple-500' },
    { label: 'Rapports en attente', value: '2', icon: '📊', color: 'bg-orange-500' }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600">Chargement de votre espace...</p>
        </div>
      </div>
    )
  }

  if (!employee) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                CEPAC Dashboard
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">Espace Employé</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {employee.firstName} {employee.lastName}
                </p>
                <p className="text-sm text-gray-600">{employee.position}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg text-white text-xl mr-4`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Vue d\'ensemble', icon: '🏠' },
                { id: 'messages', name: 'Messages', icon: '💬' },
                { id: 'documents', name: 'Documents', icon: '📁' },
                { id: 'applications', name: 'Mes Candidatures', icon: '💼' },
                { id: 'compose', name: 'Nouveau Message', icon: '✍️' },
                { id: 'reports', name: 'Rapports', icon: '📊' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Bienvenue, {employee.firstName}!
                </h2>
                
                {/* Recent Activity */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">Messages Récents</h3>
                    <div className="space-y-3">
                      {messages.slice(0, 3).map((message) => (
                        <div key={message.id} className={`p-3 bg-white rounded-lg ${!message.read ? 'border-l-4 border-blue-500' : ''}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{message.from}</span>
                            <span className="text-xs text-gray-500">{getPriorityIcon(message.priority)}</span>
                          </div>
                          <p className="text-sm text-gray-700 truncate">{message.subject}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">Documents Récents</h3>
                    <div className="space-y-3">
                      {documents.slice(0, 3).map((doc) => (
                        <div key={doc.id} className="p-3 bg-white rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm truncate">{doc.name}</span>
                            <span className="text-xs text-gray-500">{doc.type}</span>
                          </div>
                          <p className="text-xs text-gray-500">{doc.category} • {doc.size}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-amber-800 mb-4">Actions Rapides</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => setActiveTab('compose')}
                      className="bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="text-2xl mb-2">✍️</div>
                      <div className="text-sm font-semibold">Nouveau Message</div>
                    </button>
                    <button 
                      onClick={() => setActiveTab('documents')}
                      className="bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="text-2xl mb-2">📁</div>
                      <div className="text-sm font-semibold">Mes Documents</div>
                    </button>
                    <button 
                      onClick={() => setActiveTab('reports')}
                      className="bg-white p-4 rounded-lg hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="text-2xl mb-2">📊</div>
                      <div className="text-sm font-semibold">Faire un Rapport</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Mes Messages</h2>
                  <button 
                    onClick={() => setActiveTab('compose')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    + Nouveau Message
                  </button>
                </div>
                
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                        !message.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                      }`}
                      onClick={() => markAsRead(message.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">{message.from}</span>
                          <span className="text-sm">{getPriorityIcon(message.priority)}</span>
                          {!message.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                        </div>
                        <span className="text-sm text-gray-500">{message.date}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{message.subject}</h3>
                      <p className="text-gray-600 text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Mes Documents</h2>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    + Télécharger Document
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {documents.map((doc) => (
                    <div key={doc.id} className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">
                          {doc.type === 'PDF' ? '📄' : doc.type === 'Excel' ? '📊' : '📁'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          doc.category === 'Paie' ? 'bg-green-100 text-green-800' :
                          doc.category === 'Pédagogie' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {doc.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{doc.name}</h3>
                      <div className="text-sm text-gray-500 mb-4">
                        <p>Type: {doc.type}</p>
                        <p>Taille: {doc.size}</p>
                        <p>Ajouté: {doc.uploadedAt}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          Télécharger
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                          Aperçu
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Job Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Mes Candidatures</h2>
                  <Link 
                    href="/recrutement"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Voir les Offres
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {jobApplications.map((application) => (
                    <div key={application.id} className="bg-white border rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{application.position}</h3>
                          <p className="text-gray-600">{application.department}</p>
                        </div>
                        {getStatusBadge(application.status)}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Date de candidature:</span>
                          <span className="ml-2">{application.appliedAt}</span>
                        </div>
                      </div>
                      {application.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700">Notes:</span>
                          <p className="text-gray-600 mt-1">{application.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compose Message Tab */}
            {activeTab === 'compose' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nouveau Message</h2>
                
                <form onSubmit={handleSendMessage} className="bg-white border rounded-xl p-6 space-y-6">
                  <div>
                    <label htmlFor="recipient" className="block text-sm font-semibold text-gray-700 mb-2">
                      Destinataire *
                    </label>
                    <select
                      id="recipient"
                      name="recipient"
                      value={newMessage.recipient}
                      onChange={(e) => setNewMessage({...newMessage, recipient: e.target.value})}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="">Sélectionnez un destinataire</option>
                      <option value="direction">Direction CEPAC</option>
                      <option value="rh">Ressources Humaines</option>
                      <option value="pedagogie">Coordination Pédagogique</option>
                      <option value="vie-scolaire">Vie Scolaire</option>
                      <option value="comptabilite">Comptabilité</option>
                      <option value="bibliotheque">Bibliothèque</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Objet *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                      rows={6}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-vertical"
                      placeholder="Tapez votre message ici..."
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Envoyer Message
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewMessage({ recipient: '', subject: '', content: '' })}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                      Effacer
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Faire un Rapport</h2>
                
                <form onSubmit={handleSubmitReport} className="bg-white border rounded-xl p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="reportType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Type de Rapport *
                      </label>
                      <select
                        id="reportType"
                        name="type"
                        value={newReport.type}
                        onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionnez un type</option>
                        <option value="incident">Rapport d'incident</option>
                        <option value="pedagogique">Rapport pédagogique</option>
                        <option value="maintenance">Demande de maintenance</option>
                        <option value="disciplinaire">Rapport disciplinaire</option>
                        <option value="suggestion">Suggestion d'amélioration</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                        Priorité *
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        value={newReport.priority}
                        onChange={(e) => setNewReport({...newReport, priority: e.target.value as 'low' | 'normal' | 'high'})}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="low">🟢 Faible</option>
                        <option value="normal">🟡 Normale</option>
                        <option value="high">🔴 Élevée</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="reportTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                      Titre du Rapport *
                    </label>
                    <input
                      type="text"
                      id="reportTitle"
                      name="title"
                      value={newReport.title}
                      onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Titre concis du rapport"
                    />
                  </div>

                  <div>
                    <label htmlFor="reportDepartment" className="block text-sm font-semibold text-gray-700 mb-2">
                      Département Concerné
                    </label>
                    <select
                      id="reportDepartment"
                      name="department"
                      value={newReport.department}
                      onChange={(e) => setNewReport({...newReport, department: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="">Sélectionnez un département</option>
                      <option value="direction">Direction</option>
                      <option value="pedagogie">Pédagogie</option>
                      <option value="administration">Administration</option>
                      <option value="vie-scolaire">Vie Scolaire</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="comptabilite">Comptabilité</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="reportDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                      Description Détaillée *
                    </label>
                    <textarea
                      id="reportDescription"
                      name="description"
                      value={newReport.description}
                      onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                      rows={8}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-vertical"
                      placeholder="Décrivez en détail la situation, les faits observés, les actions recommandées, etc."
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Soumettre Rapport
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewReport({ type: '', title: '', description: '', priority: 'normal', department: '' })}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                      Réinitialiser
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}