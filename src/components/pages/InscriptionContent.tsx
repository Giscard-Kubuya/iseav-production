'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function InscriptionContent() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    position: '',
    password: '',
    confirmPassword: ''
  })

  const departments = [
    { id: 'direction', name: 'Direction' },
    { id: 'pedagogie', name: 'Pédagogie' },
    { id: 'administration', name: 'Administration' },
    { id: 'vie-scolaire', name: 'Vie Scolaire' },
    { id: 'enseignement', name: 'Enseignement' },
    { id: 'comptabilite', name: 'Comptabilité' },
    { id: 'bibliotheque', name: 'Bibliothèque' },
    { id: 'maintenance', name: 'Maintenance' }
  ]

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      
      // Simulate successful login
      if (loginData.email && loginData.password) {
        localStorage.setItem('employeeAuth', JSON.stringify({
          email: loginData.email,
          loginTime: Date.now()
        }))
        setSubmitStatus('login-success')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        setSubmitStatus('login-error')
        setTimeout(() => setSubmitStatus(''), 3000)
      }
    }, 2000)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate password confirmation
    if (registerData.password !== registerData.confirmPassword) {
      setSubmitStatus('password-mismatch')
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(''), 3000)
      return
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('register-success')
      
      // Auto login after successful registration
      setTimeout(() => {
        localStorage.setItem('employeeAuth', JSON.stringify({
          email: registerData.email,
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          department: registerData.department,
          position: registerData.position,
          loginTime: Date.now()
        }))
        router.push('/dashboard')
      }, 2000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-amber-50 to-blue-100 py-12">
      <div className="max-w-md mx-auto px-4">
        {/* Toggle Buttons */}
        <div className="bg-white rounded-2xl p-2 shadow-lg mb-8">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsLogin(true)}
              className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-amber-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-amber-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Inscription
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus === 'login-success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-green-500 text-xl mr-3">✅</div>
              <div>
                <h3 className="text-green-800 font-semibold">Connexion réussie!</h3>
                <p className="text-green-700">Redirection vers votre dashboard...</p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'register-success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-green-500 text-xl mr-3">🎉</div>
              <div>
                <h3 className="text-green-800 font-semibold">Compte créé avec succès!</h3>
                <p className="text-green-700">Connexion automatique en cours...</p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'login-error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-red-500 text-xl mr-3">❌</div>
              <div>
                <h3 className="text-red-800 font-semibold">Erreur de connexion</h3>
                <p className="text-red-700">Email ou mot de passe incorrect</p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'password-mismatch' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-red-500 text-xl mr-3">⚠️</div>
              <div>
                <h3 className="text-red-800 font-semibold">Erreur</h3>
                <p className="text-red-700">Les mots de passe ne correspondent pas</p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        {isLogin && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Connexion <span className="text-blue-600">Employé</span>
              </h1>
              <p className="text-gray-600">
                Accédez à votre espace personnel CEPAC
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  placeholder="votre.email@cepac-beni.edu.cd"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  placeholder="Votre mot de passe"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Mot de passe oublié?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-amber-600 text-white hover:from-blue-700 hover:to-amber-700 hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Connexion...
                  </div>
                ) : (
                  'Se Connecter'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Registration Form */}
        {!isLogin && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Inscription <span className="text-amber-600">Employé</span>
              </h1>
              <p className="text-gray-600">
                Créez votre compte pour rejoindre l'équipe CEPAC
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={registerData.lastName}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  placeholder="votre.email@cepac-beni.edu.cd"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    placeholder="+243 XX XX XX XX"
                  />
                </div>
                <div>
                  <label htmlFor="employeeId" className="block text-sm font-semibold text-gray-700 mb-2">
                    ID Employé *
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={registerData.employeeId}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    placeholder="EMP001"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">
                    Département *
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={registerData.department}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Sélectionnez un département</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
                    Poste *
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={registerData.position}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    placeholder="Enseignant, Directeur..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mot de passe *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    placeholder="Min. 8 caractères"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirmer le mot de passe *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    placeholder="Répétez le mot de passe"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  required 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                />
                <span className="ml-2 text-sm text-gray-600">
                  J'accepte les <Link href="#" className="text-blue-600 hover:text-blue-800">termes et conditions</Link> d'utilisation
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-600 to-blue-600 text-white hover:from-amber-700 hover:to-blue-700 hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Création du compte...
                  </div>
                ) : (
                  'Créer mon Compte'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}