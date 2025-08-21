'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null)

  const toggleMobileSubmenu = (submenu: string) => {
    setMobileActiveSubmenu(mobileActiveSubmenu === submenu ? null : submenu)
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setMobileActiveSubmenu(null)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            {/* Contact Information - Left */}
            <div className="flex items-center space-x-4 lg:space-x-8">
              <div className="flex items-center space-x-2 group">
                <svg className="w-4 h-4 text-amber-200 group-hover:text-amber-100 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <a href="mailto:contact@iseav-walungu.edu.cd" className="hover:text-amber-200 transition-colors duration-300 group-hover:underline">
                  contact@iseav-walungu.edu.cd
                </a>
              </div>
              <div className="hidden sm:flex items-center space-x-2 group">
                <svg className="w-4 h-4 text-amber-200 group-hover:text-amber-100 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <a href="tel:+243971234567" className="hover:text-amber-200 transition-colors duration-300 group-hover:underline">
                  +243 97 123 4567
                </a>
              </div>
            </div>
            
            {/* Social Media Icons - Right */}
            <div className="flex items-center space-x-3">
              <a href="#" className="group">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.120.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.766-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.052 0.059c-6.627 0-11.993 5.367-11.993 11.993 0 5.301 3.435 9.801 8.206 11.388.599.111.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-11.993-12-11.993z"/>
                  </svg>
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative flex items-center min-h-24 sm:h-28 lg:h-32">
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 w-full items-center">
              {/* Left Navigation */}
              <nav className="flex space-x-6 justify-start">
                <div className="relative group">
                  <button className="text-gray-600 hover:text-cyan-600 font-medium flex items-center transition-all duration-300 hover:scale-105">
                    Académique 
                    <span className="ml-1 text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
                  </button>
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-2 w-56 z-50 border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-300 ease-out">
                    <Link href="/academics" className="block px-4 py-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-cyan-50 hover:text-amber-600 transition-all duration-200 hover:pl-6">Programmes d'études</Link>
                    <Link href="/academics/faculties" className="block px-4 py-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-cyan-50 hover:text-amber-600 transition-all duration-200 hover:pl-6">Facultés</Link>
                    <Link href="/academics/courses" className="block px-4 py-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-cyan-50 hover:text-amber-600 transition-all duration-200 hover:pl-6">Catalogue des cours</Link>
                    <Link href="/academics/calendar" className="block px-4 py-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-cyan-50 hover:text-amber-600 transition-all duration-200 hover:pl-6">Calendrier académique</Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="text-gray-600 hover:text-cyan-600 font-medium flex items-center transition-all duration-300 hover:scale-105">
                    Recherche 
                    <span className="ml-1 text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
                  </button>
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-2 w-56 z-50 border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-95 group-hover:scale-100 transition-all duration-300 ease-out">
                    <Link href="/research/projects" className="block px-4 py-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-cyan-50 hover:text-amber-600 transition-all duration-200 hover:pl-6">Projets de recherche</Link>
                    <Link href="/research/centers" className="block px-4 py-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-cyan-50 hover:text-amber-600 transition-all duration-200 hover:pl-6">Centres de recherche</Link>
                    <Link href="/research/publications" className="block px-4 py-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-cyan-50 hover:text-amber-600 transition-all duration-200 hover:pl-6">Publications</Link>
                  </div>
                </div>

                <Link href="/admissions" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors duration-200">Admissions</Link>
              </nav>

              {/* Centered Logo */}
              <div className="flex justify-center">
                <Link href="/" className="flex flex-col items-center group">
                  <div className="w-20 h-20 mb-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <img 
                      src="/images/logos/logo_extracted.png" 
                      alt="ISEAV WALUNGU Logo"
                      className="w-full h-full object-contain rounded-lg shadow-sm transition-all duration-500 group-hover:brightness-110 group-hover:shadow-lg group-hover:shadow-amber-200/50"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent group-hover:from-cyan-700 group-hover:to-amber-600 transition-all duration-300 group-hover:scale-105 pb-2 border-b-2 border-gradient-to-r from-cyan-600 to-amber-500 relative">
                      ISEAV WALUNGU
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-cyan-600 to-amber-500 group-hover:w-80 transition-all duration-300"></div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Right Navigation & Actions */}
              <div className="flex items-center justify-end space-x-6">
                <nav className="flex space-x-6">
                  <Link href="/student-life" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors duration-200 whitespace-nowrap">Vie étudiante</Link>
                  <Link href="/about" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors duration-200 whitespace-nowrap">À propos</Link>
                </nav>
                <div className="flex items-center space-x-4">
                  <Link href="/student-portal" className="text-gray-600 hover:text-cyan-600 transition-all duration-300 hover:scale-110 group flex items-center space-x-2 whitespace-nowrap">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden xl:inline text-sm font-medium">Étudiant</span>
                  </Link>
                  <Link href="/contact" className="bg-gradient-to-r from-cyan-600 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-cyan-700 hover:to-amber-600 transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap">
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex lg:hidden items-center justify-between w-full">
              {/* Mobile spacer */}
              <div className="w-8"></div>
              
              {/* Centered Logo - Mobile */}
              <div className="flex-1 flex justify-center">
                <Link href="/" className="flex flex-col items-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mb-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <img 
                      src="/images/logos/logo_extracted.png" 
                      alt="ISEAV WALUNGU Logo"
                      className="w-full h-full object-contain rounded-lg shadow-sm transition-all duration-500 group-hover:brightness-110 group-hover:shadow-lg group-hover:shadow-amber-200/50"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent group-hover:from-cyan-700 group-hover:to-amber-600 transition-all duration-300 group-hover:scale-105">
                      ISEAV WALUNGU
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300 max-w-xs text-center leading-tight group-hover:text-cyan-600 px-2">
                      Institut Supérieur d'Études Agronomiques et Vétérinaires
                    </div>
                  </div>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center">
                <button 
                  className="text-gray-600 hover:text-cyan-600 transition-all duration-300 hover:scale-110 focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="relative w-6 h-6">
                    <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                    <span className={`absolute h-0.5 w-6 bg-current top-3 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gradient-to-br from-white to-gray-50 border-t border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-2 max-h-96 overflow-y-auto">
              
              {/* Academic Menu with Submenu */}
              <div className="space-y-1">
                <button 
                  onClick={() => toggleMobileSubmenu('academic')}
                  className="w-full flex items-center justify-between py-4 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium"
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                    Académique
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${mobileActiveSubmenu === 'academic' ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileActiveSubmenu === 'academic' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-6 space-y-1">
                    <Link href="/academics" onClick={closeMobileMenu} className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium">
                      <span className="flex items-center">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full mr-3"></span>
                        Programmes d'études
                      </span>
                    </Link>
                    <Link href="/academics/faculties" onClick={closeMobileMenu} className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium">
                      <span className="flex items-center">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full mr-3"></span>
                        Facultés
                      </span>
                    </Link>
                    <Link href="/academics/courses" onClick={closeMobileMenu} className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium">
                      <span className="flex items-center">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full mr-3"></span>
                        Catalogue des cours
                      </span>
                    </Link>
                    <Link href="/academics/calendar" onClick={closeMobileMenu} className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium">
                      <span className="flex items-center">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full mr-3"></span>
                        Calendrier académique
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Research Menu with Submenu */}
              <div className="space-y-1">
                <button 
                  onClick={() => toggleMobileSubmenu('research')}
                  className="w-full flex items-center justify-between py-4 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium"
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                    Recherche
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${mobileActiveSubmenu === 'research' ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileActiveSubmenu === 'research' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-6 space-y-1">
                    <Link href="/research/projects" onClick={closeMobileMenu} className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium">
                      <span className="flex items-center">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full mr-3"></span>
                        Projets de recherche
                      </span>
                    </Link>
                    <Link href="/research/centers" onClick={closeMobileMenu} className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium">
                      <span className="flex items-center">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full mr-3"></span>
                        Centres de recherche
                      </span>
                    </Link>
                    <Link href="/research/publications" onClick={closeMobileMenu} className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium">
                      <span className="flex items-center">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full mr-3"></span>
                        Publications
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Regular Menu Items */}
              <Link href="/admissions" onClick={closeMobileMenu} className="block py-4 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Admissions
                </span>
              </Link>
              
              <Link href="/student-life" onClick={closeMobileMenu} className="block py-4 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  Vie étudiante
                </span>
              </Link>
              
              <Link href="/about" onClick={closeMobileMenu} className="block py-4 text-gray-600 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-amber-50 rounded-lg px-4 transition-all duration-300 font-medium">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  À propos
                </span>
              </Link>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                <Link href="/student-portal" onClick={closeMobileMenu} className="block py-3 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Portail Étudiant</span>
                </Link>
                <Link href="/contact" onClick={closeMobileMenu} className="block py-3 text-center bg-gradient-to-r from-cyan-600 to-amber-500 text-white rounded-lg font-medium hover:from-cyan-700 hover:to-amber-600 transition-all duration-300">
                  Nous Contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}