'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdminSidebarProps {
  isOpen?: boolean
  onToggle?: () => void
}

export default function AdminSidebar({ isOpen = true, onToggle }: AdminSidebarProps = {}) {
  const pathname = usePathname()
  
  const menuItems = [
    { href: '/admin', label: 'Tableau de bord', icon: '📊' },
    
    // Content Management
    { href: '/admin/hero-slides', label: 'Bannières Accueil', icon: '🖼️' },
    { href: '/admin/actualites', label: 'Actualités Projet', icon: '📰' },
    { href: '/admin/blog', label: 'Articles & Publications', icon: '📝' },
    { href: '/admin/galerie', label: 'Galerie Photos', icon: '📸' },

    // Team & Organization
    { href: '/admin/team-experts', label: 'Équipe Projet', icon: '👨‍💼' },
    { href: '/admin/leadership', label: 'Direction & Coordination', icon: '👔' },
    { href: '/admin/services', label: 'Services & Programmes', icon: '🎯' },
    
    // Partners & Community
    { href: '/admin/technology-partners', label: 'Partenaires', icon: '🤝' },
    { href: '/admin/testimonials', label: 'Témoignages', icon: '💬' },

    // Project Information
    { href: '/admin/company-statistics', label: 'Statistiques Projet', icon: '📈' },
    { href: '/admin/company-values', label: 'Valeurs & Mission', icon: '💎' },
    { href: '/admin/company-journey', label: 'Histoire du Projet', icon: '🛣️' },

    // Contact & Location
    { href: '/admin/contact-info', label: 'Informations Contact', icon: '📞' },
    { href: '/admin/business-hours', label: 'Horaires d\'Ouverture', icon: '🕒' },
    { href: '/admin/location', label: 'Localisation', icon: '📍' },
    { href: '/admin/social-media', label: 'Réseaux Sociaux', icon: '📱' },

    // Users & Recruitment  
    { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: '👥' },
    { href: '/admin/recrutement', label: 'Recrutement', icon: '🎯' },
    { href: '/admin/commentaires', label: 'Messages', icon: '💭' },

    // System
    { href: '/admin/parametres', label: 'Paramètres', icon: '⚙️' }
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-gradient-to-b from-blue-900 to-blue-800 shadow-xl border-r border-blue-700 h-screen
        transform transition-transform duration-300 ease-in-out lg:transform-none
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-lg">Administration CEPAC</h1>
              <p className="text-blue-200 text-xs lg:text-sm">8e CEPAC Projet-Beni - ONG</p>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onToggle}
              className="lg:hidden text-white hover:text-blue-200 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      
        {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onToggle} // Close mobile menu on navigation
                    className={`
                      flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                      ${isActive 
                        ? 'bg-blue-100 text-blue-800 shadow-lg' 
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                      }
                    `}
                  >
                    <span className={`text-lg transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`}>{item.icon}</span>
                    <span className="text-xs lg:text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}