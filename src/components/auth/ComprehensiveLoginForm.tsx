"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import CepacLogo from "@/components/ui/CepacLogo";

interface LoginError {
  type: 'auth' | 'network' | 'server' | 'validation' | 'session'
  message: string
  details?: string
}

export default function ComprehensiveLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle redirect after login
  const redirectTo = searchParams.get('redirect') || '/admin';
  const sessionExpired = searchParams.get('session') === 'expired';
  
  useEffect(() => {
    // Show session expired message
    if (sessionExpired) {
      setError({
        type: 'session',
        message: 'Votre session a expiré',
        details: 'Veuillez vous reconnecter pour continuer'
      });
    }
    
    // Redirect if already authenticated
    if (isAuthenticated && !sessionExpired) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, redirectTo, sessionExpired, router]);

  const validateForm = (): boolean => {
    if (!formData.email) {
      setError({
        type: 'validation',
        message: 'Veuillez saisir votre adresse email'
      });
      return false;
    }
    
    if (!formData.email.includes('@')) {
      setError({
        type: 'validation',
        message: 'Format d\'adresse email invalide'
      });
      return false;
    }
    
    if (!formData.password) {
      setError({
        type: 'validation',
        message: 'Veuillez saisir votre mot de passe'
      });
      return false;
    }
    
    if (formData.password.length < 3) {
      setError({
        type: 'validation',
        message: 'Le mot de passe doit contenir au moins 3 caractères'
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      // Validate form
      if (!validateForm()) {
        setLoading(false);
        return;
      }

      // Try API authentication first
      try {
        const { authApi } = await import("@/lib/api-services");
        
        const response = await authApi.login({
          email: formData.email,
          password: formData.password,
        });

        if (response.data?.data) {
          const { user, token, expires_in } = response.data.data;

          // Create user object for auth context
          const userObj = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as "admin" | "editor" | "author" | "subscriber",
            avatar: user.avatar || 
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3B82F6&color=white&size=256`,
          };

          // Use auth context login method
          login(userObj, token);
          
          setSuccessMessage("Connexion réussie! Redirection en cours...");
          
          // Add small delay for UX, then redirect
          setTimeout(() => {
            router.push(redirectTo);
          }, 1000);
          
          return;
        }
      } catch (apiError: any) {
        console.error("API Authentication failed:", apiError);
        
        // Handle different API errors
        if (apiError.response?.status === 401) {
          setError({
            type: 'auth',
            message: 'Email ou mot de passe incorrect',
            details: 'Veuillez vérifier vos identifiants et réessayer'
          });
        } else if (apiError.response?.status === 429) {
          setError({
            type: 'auth',
            message: 'Trop de tentatives de connexion',
            details: 'Veuillez attendre quelques minutes avant de réessayer'
          });
        } else if (apiError.response?.status === 403) {
          setError({
            type: 'auth',
            message: 'Accès non autorisé',
            details: 'Votre compte n\'a pas les permissions nécessaires'
          });
        } else if (apiError.code === 'ECONNREFUSED' || apiError.response?.status === 404) {
          // API not available, try demo accounts
          console.log("API not available, trying demo authentication...");
          
          // Demo accounts for development
          const demoAccounts = [
            { email: "admin@cepac-beni.org", password: "admin123", role: "admin", name: "Administrateur CEPAC" },
            { email: "admin@8ecepac.org", password: "cepac2024", role: "admin", name: "Admin Principal" },
            { email: "demo@cepac.cd", password: "demo123", role: "editor", name: "Éditeur Demo" }
          ];
          
          const demoUser = demoAccounts.find(acc => 
            acc.email.toLowerCase() === formData.email.toLowerCase() && 
            acc.password === formData.password
          );
          
          if (demoUser) {
            const userObj = {
              id: Date.now(), // Temporary ID for demo
              name: demoUser.name,
              email: demoUser.email,
              role: demoUser.role as "admin" | "editor" | "author" | "subscriber",
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(demoUser.name)}&background=059669&color=white&size=256`,
            };

            // Use demo token
            const demoToken = `demo_token_${Date.now()}`;
            login(userObj, demoToken);
            
            setSuccessMessage("Connexion démo réussie! Redirection en cours...");
            
            setTimeout(() => {
              router.push(redirectTo);
            }, 1000);
            
            return;
          } else {
            setError({
              type: 'auth',
              message: 'Identifiants incorrects',
              details: 'API non disponible. Utilisez les comptes démo ci-dessous.'
            });
          }
        } else {
          setError({
            type: 'network',
            message: 'Erreur de connexion au serveur',
            details: 'Vérifiez votre connexion internet et réessayez'
          });
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError({
        type: 'server',
        message: 'Erreur système',
        details: 'Une erreur inattendue s\'est produite. Veuillez réessayer.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getErrorColor = (type: string): string => {
    switch (type) {
      case 'auth': return 'red';
      case 'network': return 'orange';
      case 'server': return 'red';
      case 'validation': return 'yellow';
      case 'session': return 'blue';
      default: return 'red';
    }
  };

  const getErrorIcon = (type: string): string => {
    switch (type) {
      case 'auth': return '🔒';
      case 'network': return '🌐';
      case 'server': return '⚠️';
      case 'validation': return '📝';
      case 'session': return '⏱️';
      default: return '❌';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header with CEPAC Logo */}
        <div className="text-center">
          <CepacLogo size={100} showText={false} />
          <h1 className="mt-6 text-3xl font-bold text-white">Administration CEPAC</h1>
          <p className="mt-2 text-blue-200">8e CEPAC Projet-Beni - Organisation Non Gouvernementale</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <div>
                  <div className="font-medium">{successMessage}</div>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className={`bg-${getErrorColor(error.type)}-50 border border-${getErrorColor(error.type)}-200 text-${getErrorColor(error.type)}-700 px-4 py-3 rounded-lg`}>
                <div className="flex items-start">
                  <span className="mr-2 text-lg">{getErrorIcon(error.type)}</span>
                  <div>
                    <div className="font-medium">{error.message}</div>
                    {error.details && (
                      <div className="text-sm mt-1 opacity-90">{error.details}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="admin@8ecepac.org"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe *
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.758 6.758M9.878 9.878a3 3 0 004.242 4.242m0-4.242L15.12 15.12M15.12 15.12l3.12 3.12m-3.12-3.12a3 3 0 004.242-4.242M6.758 6.758L3.636 3.636m3.122 3.122A9.97 9.97 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <Link href="/admin/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>
        </div>

        {/* Demo Accounts Info */}
        <div className="bg-blue-800/30 backdrop-blur-sm border border-blue-300/30 rounded-lg p-4 text-white">
          <div className="text-center mb-3">
            <h3 className="font-semibold text-blue-100">Comptes de démonstration</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center bg-white/10 rounded px-3 py-2">
              <span>admin@8ecepac.org</span>
              <span className="text-blue-200">cepac2024</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 rounded px-3 py-2">
              <span>admin@cepac-beni.org</span>
              <span className="text-blue-200">admin123</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 rounded px-3 py-2">
              <span>demo@cepac.cd</span>
              <span className="text-blue-200">demo123</span>
            </div>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center">
          <Link href="/" className="text-sm text-blue-200 hover:text-white transition-colors duration-200">
            ← Retour au site principal
          </Link>
        </div>
      </div>
    </div>
  );
}