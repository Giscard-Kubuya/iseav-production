'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ActualitesContent() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Toutes les Actualités' },
    { id: 'company', name: 'Entreprise' },
    { id: 'projects', name: 'Projets' },
    { id: 'partnerships', name: 'Partenariats' },
    { id: 'events', name: 'Événements' },
    { id: 'awards', name: 'Récompenses' }
  ]

  const actualites = [
    {
      id: 1,
      title: 'INFONET remporte le Prix Innovation IT Burundi 2025',
      category: 'awards',
      excerpt: 'Notre entreprise a été récompensée pour son excellence en transformation digitale au Burundi.',
      content: 'Contenu complet de l\'actualité...',
      author: 'Direction INFONET',
      date: '20 Janvier 2025',
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      urgent: true,
      featured: true,
      tags: ['Récompense', 'Innovation', 'Excellence']
    },
    {
      id: 2,
      title: 'Nouveau Partenariat avec Microsoft pour le Cloud Computing',
      category: 'partnerships',
      excerpt: 'INFONET devient partenaire officiel Microsoft pour les solutions cloud au Burundi.',
      content: 'Contenu complet du partenariat...',
      author: 'Équipe Partenariats',
      date: '18 Janvier 2025',
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      urgent: false,
      featured: true,
      tags: ['Microsoft', 'Cloud', 'Partenariat']
    },
    {
      id: 3,
      title: 'Lancement du Système de Gestion Hospitalière pour CHU Kamenge',
      category: 'projects',
      excerpt: 'Mise en service du nouveau système informatique pour améliorer la gestion des patients.',
      content: 'Détails du projet hospitalier...',
      author: 'Équipe Projets',
      date: '15 Janvier 2025',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      urgent: false,
      featured: false,
      tags: ['Santé', 'Système', 'CHU Kamenge']
    },
    {
      id: 4,
      title: 'Formation Gratuite en Cybersécurité pour 100 Étudiants',
      category: 'events',
      excerpt: 'INFONET organise une formation intensive en cybersécurité pour les étudiants burundais.',
      content: 'Programme de formation...',
      author: 'Équipe Formation',
      date: '12 Janvier 2025',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      urgent: false,
      featured: false,
      tags: ['Formation', 'Cybersécurité', 'Étudiants']
    },
    {
      id: 5,
      title: 'Ouverture du Nouveau Centre de Données INFONET',
      category: 'company',
      excerpt: 'Inauguration de notre centre de données de nouvelle génération à Bujumbura.',
      content: 'Détails du centre de données...',
      author: 'Direction Technique',
      date: '10 Janvier 2025',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      urgent: true,
      featured: true,
      tags: ['Infrastructure', 'Data Center', 'Innovation']
    },
    {
      id: 6,
      title: 'Signature d\'un Accord avec l\'Université du Burundi',
      category: 'partnerships',
      excerpt: 'Partenariat stratégique pour la recherche et l\'innovation technologique.',
      content: 'Accord université...',
      author: 'Équipe Académique',
      date: '8 Janvier 2025',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      urgent: false,
      featured: false,
      tags: ['Université', 'Recherche', 'Innovation']
    }
  ]

  const filteredActualites = activeCategory === 'all' 
    ? actualites 
    : actualites.filter(actualite => actualite.category === activeCategory)

  const urgentNews = actualites.filter(actualite => actualite.urgent)
  const featuredNews = actualites.filter(actualite => actualite.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-green-700/90" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-300 via-white to-green-300 bg-clip-text text-transparent">
                  Actualités INFONET
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
                Suivez nos dernières actualités, projets et réalisations
              </p>
              
              {/* Urgent News Ticker */}
              {urgentNews.length > 0 && (
                <div className="bg-red-600/20 backdrop-blur-sm border border-red-300/30 rounded-lg p-4 max-w-4xl mx-auto">
                  <div className="flex items-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-4 animate-pulse">
                      🚨 URGENT
                    </span>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-lg">{urgentNews[0].title}</h3>
                      <p className="text-blue-200 text-sm">{urgentNews[0].excerpt}</p>
                    </div>
                    <Link href={`/actualites/${urgentNews[0].id}`} className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors ml-4">
                      Lire →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Actualités à la Une
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les nouvelles les plus importantes d'INFONET
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredNews.slice(0, 3).map((actualite, index) => (
              <Link key={actualite.id} href={`/actualites/${actualite.id}`}>
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={actualite.image}
                      alt={actualite.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        À LA UNE
                      </span>
                    </div>
                    {actualite.urgent && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                          URGENT
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                        {categories.find(cat => cat.id === actualite.category)?.name}
                      </span>
                      <span className="text-xs text-gray-500">{actualite.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {actualite.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {actualite.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {actualite.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Par {actualite.author}</span>
                      <span className="text-blue-600 font-semibold text-sm">
                        Lire la suite →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActualites.map((actualite, index) => (
              <Link key={actualite.id} href={`/actualites/${actualite.id}`}>
                <article className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer">
                  <div className="relative">
                    <img
                      src={actualite.image}
                      alt={actualite.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {categories.find(cat => cat.id === actualite.category)?.name}
                      </span>
                    </div>
                    {actualite.urgent && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                          🚨
                        </span>
                      </div>
                    )}
                    {actualite.featured && (
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                      <span>{actualite.date}</span>
                      <span>{actualite.author}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {actualite.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {actualite.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {actualite.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{actualite.author}</span>
                      <span className="text-blue-600 font-semibold flex items-center">
                        Lire l'actualité
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Restez informé de nos actualités
          </h2>
          <p className="text-xl mb-8">
            Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles d'INFONET
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:ring-4 focus:ring-white/30 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 hover:scale-105 transform"
            >
              S'abonner
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}