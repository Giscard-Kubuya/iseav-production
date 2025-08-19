'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Navigation Bar */}
      <div className="bg-cyan-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <div className="hidden sm:flex space-x-3 lg:space-x-6">
              <Link href="/news" className="hover:text-amber-200 transition-colors duration-200">Actualités</Link>
              <Link href="/events" className="hover:text-amber-200 transition-colors duration-200">Événements</Link>
              <Link href="/careers" className="hover:text-amber-200 transition-colors duration-200">Carrières</Link>
              <div className="relative">
                <button 
                  className="hover:text-amber-200 flex items-center transition-colors duration-200"
                  onClick={() => setActiveDropdown(activeDropdown === 'info' ? null : 'info')}
                >
                  Infos pour <span className="ml-1">▼</span>
                </button>
                {activeDropdown === 'info' && (
                  <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 shadow-lg rounded-lg py-2 w-48 z-50 border border-gray-200">
                    <Link href="/portal/student" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Étudiants</Link>
                    <Link href="/portal/parent" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Parents</Link>
                    <Link href="/teacher" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Enseignants</Link>
                    <Link href="/admin" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Personnel</Link>
                    <Link href="/alumni" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Diplômés</Link>
                    <Link href="/media" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Médias</Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Mobile - simplified links */}
            <div className="flex sm:hidden space-x-3">
              <Link href="/news" className="hover:text-amber-200 transition-colors duration-200">NEWS</Link>
              <Link href="/contact" className="hover:text-amber-200 transition-colors duration-200">CONTACT</Link>
            </div>
            
            <div className="hidden sm:flex space-x-3 lg:space-x-6">
              <Link href="/visit" className="hover:text-amber-200 transition-colors duration-200">Visite</Link>
              <Link href="/contact" className="hover:text-amber-200 font-semibold transition-colors duration-200">Contact Us</Link>
              <Link href="/directory" className="hover:text-amber-200 transition-colors duration-200">Annuaire</Link>
              <Link href="/login" className="hover:text-amber-200 transition-colors duration-200">Mon ISEAV-ARU</Link>
              <Link href="/az" className="hidden lg:block hover:text-amber-200 transition-colors duration-200">A-Z</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between min-h-20 sm:h-24">
            {/* Left Navigation - Desktop */}
            <nav className="hidden lg:flex space-x-6 flex-1">
              <div className="relative">
                <button 
                  className="text-gray-600 hover:text-cyan-600 font-medium flex items-center transition-colors duration-200"
                  onClick={() => setActiveDropdown(activeDropdown === 'academics' ? null : 'academics')}
                >
                  Académique <span className="ml-1 text-xs">▼</span>
                </button>
                {activeDropdown === 'academics' && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-2 w-56 z-50 border border-gray-200">
                    <Link href="/academics/programs" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Programmes d'études</Link>
                    <Link href="/academics/faculties" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Facultés</Link>
                    <Link href="/academics/courses" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Catalogue des cours</Link>
                    <Link href="/academics/calendar" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Calendrier académique</Link>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button 
                  className="text-gray-600 hover:text-cyan-600 font-medium flex items-center transition-colors duration-200"
                  onClick={() => setActiveDropdown(activeDropdown === 'research' ? null : 'research')}
                >
                  Recherche <span className="ml-1 text-xs">▼</span>
                </button>
                {activeDropdown === 'research' && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-2 w-56 z-50 border border-gray-200">
                    <Link href="/research/projects" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Projets de recherche</Link>
                    <Link href="/research/centers" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Centres de recherche</Link>
                    <Link href="/research/publications" className="block px-4 py-2 hover:bg-amber-50 hover:text-amber-600 transition-colors">Publications</Link>
                  </div>
                )}
              </div>

              <Link href="/admissions" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors duration-200">Admissions</Link>
            </nav>

            {/* Centered Logo */}
            <div className="flex items-center justify-center flex-1 lg:flex-none">
              <Link href="/" className="flex flex-col items-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <img 
                    src="/images/logos/iseav-logo.svg" 
                    alt="ISEAV-ARU Logo"
                    className="w-full h-full object-contain transition-all duration-500 group-hover:brightness-110"
                  />
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent group-hover:from-cyan-700 group-hover:to-amber-600 transition-all duration-300">
                    ISEAV-ARU
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300 max-w-xs">
                    Institut Supérieur d'Enseignement Appliqué et de Valorisation
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Navigation - Desktop */}
            <nav className="hidden lg:flex space-x-6 flex-1 justify-end">
              <Link href="/student-life" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors duration-200">Vie étudiante</Link>
              <Link href="/about" className="text-gray-600 hover:text-cyan-600 font-medium transition-colors duration-200">À propos</Link>
            </nav>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4 lg:hidden">
              <button className="text-gray-600 hover:text-cyan-600 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <button 
                className="text-gray-600 hover:text-cyan-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:flex items-center ml-6">
              <button className="text-gray-600 hover:text-cyan-600 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <Link href="/academics" className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg px-3 transition-all duration-200">Académique</Link>
              <Link href="/research" className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg px-3 transition-all duration-200">Recherche</Link>
              <Link href="/admissions" className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg px-3 transition-all duration-200">Admissions</Link>
              <Link href="/student-life" className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg px-3 transition-all duration-200">Vie étudiante</Link>
              <Link href="/about" className="block py-3 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg px-3 transition-all duration-200">À propos</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}