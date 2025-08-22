'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Demo accounts for the template
  const demoAccounts = [
    { email: 'admin@infonet.bi', password: 'admin123', role: 'admin', name: 'Jean-Baptiste Niyonzima' },
    { email: 'editor@infonet.bi', password: 'editor123', role: 'editor', name: 'Espérance Mukamana' },
    { email: 'author@infonet.bi', password: 'author123', role: 'author', name: 'Arlette Uwimana' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Check demo accounts
      const account = demoAccounts.find(
        acc => acc.email === formData.email && acc.password === formData.password
      )

      if (account) {
        // Store auth info in localStorage (in production, use secure HTTP-only cookies)
        const authData = {
          user: {
            id: Date.now(),
            name: account.name,
            email: account.email,
            role: account.role,
            avatar: `https://images.unsplash.com/photo-${account.role === 'admin' ? '1472099645785-5658abf4ff4e' : account.role === 'editor' ? '1494790108755-2616b612b786' : '1438761681033-6461ffad8d80'}?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`
          },
          token: `demo_token_${Date.now()}`,
          expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }
        
        localStorage.setItem('admin_auth', JSON.stringify(authData))
        
        // Redirect to admin dashboard
        router.push('/admin')
      } else {
        setError('Email ou mot de passe incorrect')
      }
    } catch (error) {
      setError('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (account: typeof demoAccounts[0]) => {
    setFormData({
      email: account.email,
      password: account.password,
      remember: false
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Adresse email
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="admin@infonet.bi"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Votre mot de passe"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.758 6.758M9.878 9.878a3 3 0 004.242 4.242m0-4.242L15.12 15.12M15.12 15.12l3.12 3.12m-3.12-3.12a3 3 0 004.242-4.242M6.758 6.758L3.636 3.636m3.122 3.122A9.97 9.97 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={formData.remember}
              onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
              Se souvenir de moi
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </div>
      </form>

      {/* Demo accounts section */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Comptes de démonstration</h3>
          <div className="space-y-2">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => handleDemoLogin(account)}
                className="w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{account.role === 'admin' ? 'Administrateur' : account.role === 'editor' ? 'Éditeur' : 'Auteur'}</span>
                  <span className="text-gray-500">{account.email}</span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Cliquez sur un compte pour remplir automatiquement le formulaire
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link href="/" className="text-sm text-green-600 hover:text-green-500">
          ← Retour au site principal
        </Link>
      </div>
    </div>
  )
}