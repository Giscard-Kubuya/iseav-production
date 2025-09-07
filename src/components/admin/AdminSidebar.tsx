'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

interface AdminSidebarProps {
  isOpen?: boolean
  onToggle?: () => void
}

export default function AdminSidebar({ isOpen = true, onToggle }: AdminSidebarProps = {}) {
  const pathname = usePathname()
  
  const menuItems = [
    { href: '/admin', label: 'Tableau de Bord', icon: '📊' },
    
    // Academic Management
    { 
      category: 'Gestion Académique',
      items: [
        { href: '/admin/etudiants', label: 'Étudiants', icon: '👨‍🎓' },
        { href: '/admin/professeurs', label: 'Professeurs', icon: '👨‍🏫' },
        { href: '/admin/programmes', label: 'Programmes d\'Études', icon: '📚' },
        { href: '/admin/cours', label: 'Cours & Modules', icon: '📖' },
        { href: '/admin/examens', label: 'Examens & Évaluations', icon: '📝' },
        { href: '/admin/diplomes', label: 'Diplômes & Certificats', icon: '🎓' },
      ]
    },

    // Research & Innovation
    { 
      category: 'Recherche & Innovation',
      items: [
        { href: '/admin/projets-recherche', label: 'Projets de Recherche', icon: '🔬' },
        { href: '/admin/publications', label: 'Publications', icon: '📄' },
        { href: '/admin/laboratoires', label: 'Laboratoires', icon: '🧪' },
        { href: '/admin/partenariats', label: 'Partenariats Recherche', icon: '🤝' },
      ]
    },

    // Campus Management
    { 
      category: 'Gestion Campus',
      items: [
        { href: '/admin/infrastructures', label: 'Infrastructures', icon: '🏫' },
        { href: '/admin/residence', label: 'Résidence Étudiante', icon: '🏠' },
        { href: '/admin/bibliotheque', label: 'Bibliothèque', icon: '📚' },
        { href: '/admin/ferme-experimentale', label: 'Ferme Expérimentale', icon: '🚜' },
        { href: '/admin/equipements', label: 'Équipements', icon: '⚙️' },
      ]
    },

    // Communications
    { 
      category: 'Communications',
      items: [
        { href: '/admin/actualites', label: 'Actualités Institut', icon: '📰' },
        { href: '/admin/evenements', label: 'Événements', icon: '📅' },
        { href: '/admin/galerie', label: 'Galerie Photos', icon: '📸' },
        { href: '/admin/site-web', label: 'Contenu Site Web', icon: '🌐' },
      ]
    },

    // Administration
    { 
      category: 'Administration',
      items: [
        { href: '/admin/finance', label: 'Finances & Frais', icon: '💰' },
        { href: '/admin/personnel', label: 'Gestion Personnel', icon: '👥' },
        { href: '/admin/admissions', label: 'Processus Admission', icon: '📋' },
        { href: '/admin/alumni', label: 'Réseau Alumni', icon: '🎓' },
        { href: '/admin/rapports', label: 'Rapports & Statistiques', icon: '📊' },
        { href: '/admin/parametres', label: 'Paramètres Système', icon: '⚙️' }
      ]
    },

    // Keep only these two from CEPAC as requested
    { 
      category: 'Contenu des Pages',
      items: [
        { href: '/admin/page-content', label: 'Contenu des Pages', icon: '📝' },
      ]
    }
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
        w-64 bg-slate-800 shadow-xl border-r border-slate-700 h-screen
        transform transition-transform duration-300 ease-in-out lg:transform-none
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <div>
                <h1 className="text-white font-semibold text-base">ISEAV-WALUNGU</h1>
                <p className="text-slate-300 text-xs">Administration Académique</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onToggle}
              className="lg:hidden text-white hover:text-slate-300 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      
        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Dashboard Link */}
            {menuItems[0] && 'href' in menuItems[0] && (
              <div>
                <Link
                  href={menuItems[0].href!}
                  onClick={onToggle}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${pathname === menuItems[0].href!
                      ? 'bg-slate-700 text-slate-100 shadow-lg' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }
                  `}
                >
                  <span className="text-lg">{menuItems[0].icon!}</span>
                  <span className="text-sm font-medium">{menuItems[0].label!}</span>
                </Link>
              </div>
            )}

            {/* Menu Categories */}
            {menuItems.slice(1).map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-2">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3">
                  {section.category}
                </h3>
                <ul className="space-y-1">
                  {section.items?.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onToggle}
                          className={`
                            flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 group
                            ${isActive 
                              ? 'bg-slate-700 text-slate-100 shadow-lg' 
                              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                            }
                          `}
                        >
                          <span className={`text-base transition-transform duration-200 ${
                            isActive ? 'scale-110' : 'group-hover:scale-110'
                          }`}>{item.icon}</span>
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  )
}