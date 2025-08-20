'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface StudentLoginFormProps {
  onLogin: (data: any) => void
}

export default function StudentLoginForm({ onLogin }: StudentLoginFormProps) {
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Mock student credentials for demo
  const mockStudents = [
    {
      studentId: '2024001',
      password: 'iseav123',
      firstName: 'Ahmed',
      lastName: 'Ben Salem',
      email: 'ahmed.bensalem@iseav-aru.tn',
      program: 'Licence en Sciences Agronomiques',
      year: '3ème année',
      department: 'Sciences Appliquées',
      enrollmentDate: '2022-09-15',
      status: 'Actif',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      studentId: '2024002',
      password: 'iseav456',
      firstName: 'Leila',
      lastName: 'Gharbi',
      email: 'leila.gharbi@iseav-aru.tn',
      program: 'Master en Agriculture Durable',
      year: '1ère année',
      department: 'Sciences Appliquées',
      enrollmentDate: '2024-09-15',
      status: 'Actif',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b9e3?w=150&h=150&fit=crop&crop=face'
    },
    {
      studentId: '2024003',
      password: 'iseav789',
      firstName: 'Mohamed',
      lastName: 'Trabelsi',
      email: 'mohamed.trabelsi@iseav-aru.tn',
      program: 'Licence en Biotechnologies',
      year: '2ème année',
      department: 'Sciences Appliquées',
      enrollmentDate: '2023-09-15',
      status: 'Actif',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Simulate API call delay
    setTimeout(() => {
      const student = mockStudents.find(
        s => s.studentId === formData.studentId && s.password === formData.password
      )

      if (student) {
        onLogin(student)
      } else {
        setError('Numéro étudiant ou mot de passe incorrect')
      }
      
      setIsSubmitting(false)
    }, 1500)
  }

  const stats = [
    { label: 'Étudiants Connectés', value: '1,200+', icon: '👥', description: 'Utilisateurs actifs' },
    { label: 'Services Disponibles', value: '15+', icon: '⚡', description: 'Services en ligne' },
    { label: 'Satisfaction', value: '98%', icon: '😊', description: 'Taux de satisfaction' },
    { label: 'Disponibilité', value: '24/7', icon: '🕒', description: 'Accès permanent' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen py-12">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Welcome Content */}
              <div className={`text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <div className="space-y-6 mb-12">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                      Portail
                    </span>
                    <br />
                    <span className="text-white">Étudiant</span>
                  </h1>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-100">
                    Votre Espace Personnel ISEAV-ARU
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
                    Accédez à vos bulletins, informations financières, planning des cours 
                    et toutes les ressources nécessaires à votre réussite académique.
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                      <div className="text-xs text-gray-400">{stat.description}</div>
                    </div>
                  ))}
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-blue-200 mb-4">Services Disponibles</h3>
                  {[
                    { icon: '📊', text: 'Bulletins et résultats en temps réel' },
                    { icon: '💰', text: 'Suivi financier et paiements' },
                    { icon: '📅', text: 'Planning des cours et examens' },
                    { icon: '📚', text: 'Ressources pédagogiques' },
                    { icon: '👨‍🏫', text: 'Communication avec les enseignants' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-300">
                      <span className="text-lg">{feature.icon}</span>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion Étudiant</h2>
                    <p className="text-gray-600">Connectez-vous avec vos identifiants ISEAV-ARU</p>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="text-red-500 text-xl mr-3">⚠️</div>
                        <div>
                          <h3 className="text-red-800 font-semibold">Erreur de connexion</h3>
                          <p className="text-red-700 text-sm">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 mb-2">
                        Numéro Étudiant *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="studentId"
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Ex: 2024001"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0v1m4-1v1" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                        Mot de passe *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Votre mot de passe"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                        >
                          {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:border-blue-500 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                      </label>
                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Mot de passe oublié ?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                        isSubmitting
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/25'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Connexion en cours...
                        </div>
                      ) : (
                        'Se Connecter'
                      )}
                    </button>
                  </form>

                  {/* Demo Credentials */}
                  <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-blue-800 font-semibold mb-2 flex items-center">
                      <span className="text-lg mr-2">💡</span>
                      Comptes de démonstration
                    </h3>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div><strong>Étudiant 1:</strong> 2024001 / iseav123</div>
                      <div><strong>Étudiant 2:</strong> 2024002 / iseav456</div>
                      <div><strong>Étudiant 3:</strong> 2024003 / iseav789</div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                      Problème de connexion ? 
                      <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                        Contactez le support
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-400/20 rounded-full animate-bounce delay-1000 flex items-center justify-center text-xl">🎓</div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-purple-400/20 rounded-full animate-bounce delay-1500 flex items-center justify-center text-lg">📚</div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-indigo-400/20 rounded-full animate-bounce delay-2000 flex items-center justify-center text-2xl">💻</div>
      </section>
    </>
  )
}