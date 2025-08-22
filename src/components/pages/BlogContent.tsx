'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tous les Articles' },
    { id: 'technology', name: 'Technologie' },
    { id: 'security', name: 'Sécurité IT' },
    { id: 'development', name: 'Développement' },
    { id: 'business', name: 'Business' }
  ]

  const articles = [
    {
      id: 1,
      title: 'Les Tendances Technologiques 2025 au Burundi',
      category: 'technology',
      excerpt: 'Découvrez les innovations qui vont transformer le paysage technologique burundais en 2025.',
      author: 'Jean-Baptiste Niyonzima',
      date: '15 Janvier 2025',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      tags: ['Innovation', 'Burundi', 'Tech 2025']
    },
    {
      id: 2,
      title: 'Comment Sécuriser votre Infrastructure IT',
      category: 'security',
      excerpt: 'Guide complet pour protéger votre entreprise contre les cybermenaces modernes.',
      author: 'Espérance Mukamana',
      date: '10 Janvier 2025',
      readTime: '12 min',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      tags: ['Cybersécurité', 'Protection', 'Enterprise']
    },
    {
      id: 3,
      title: 'Développement d\'Applications Mobiles : Best Practices',
      category: 'development',
      excerpt: 'Les meilleures pratiques pour créer des applications mobiles performantes et user-friendly.',
      author: 'Arlette Uwimana',
      date: '8 Janvier 2025',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      tags: ['Mobile App', 'Development', 'UX/UI']
    },
    {
      id: 4,
      title: 'Transformation Digitale : Guide pour PME',
      category: 'business',
      excerpt: 'Comment les petites et moyennes entreprises peuvent réussir leur transformation digitale.',
      author: 'Claudine Nibigira',
      date: '5 Janvier 2025',
      readTime: '15 min',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      tags: ['Digital Transformation', 'PME', 'Strategy']
    },
    {
      id: 5,
      title: 'Cloud Computing : Avantages pour les Entreprises',
      category: 'technology',
      excerpt: 'Pourquoi migrer vers le cloud et comment choisir la meilleure solution pour votre entreprise.',
      author: 'Marc Ndikumana',
      date: '3 Janvier 2025',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: false,
      tags: ['Cloud', 'AWS', 'Microsoft Azure']
    },
    {
      id: 6,
      title: 'Intelligence Artificielle dans les Entreprises',
      category: 'technology',
      excerpt: 'Comment l\'IA révolutionne les processus métier et améliore la productivité.',
      author: 'Claudine Nibigira',
      date: '1 Janvier 2025',
      readTime: '11 min',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      tags: ['AI', 'Machine Learning', 'Automation']
    }
  ]

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory)

  const featuredArticles = articles.filter(article => article.featured)

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/75 to-green-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-blue-300 via-white to-green-300 bg-clip-text text-transparent">
                  Blog INFONET
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-blue-100 animate-fade-in-up delay-200">
                Actualités & Insights Technologiques
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Restez informés des dernières tendances IT et des meilleures pratiques technologiques
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Articles à la Une
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredArticles.slice(0, 3).map((article, index) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      À la Une
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime} de lecture</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Par {article.author}</span>
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Link key={article.id} href={`/blog/${article.id}`}>
                <article className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer">
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  {article.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Populaire
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <time>{article.date}</time>
                    <span className="mx-2">•</span>
                    <span>{article.readTime} de lecture</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300">
                    <Link href={`/blog/${article.id}`}>
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{article.author}</span>
                    <span className="text-blue-600 font-semibold flex items-center">
                      Lire l'article
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Restez Informés
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Recevez nos derniers articles et insights technologiques directement dans votre boîte mail
          </p>
          
          <form className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/25"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                S'abonner
              </button>
            </div>
          </form>
          
          <p className="text-white/70 text-sm mt-4">
            Pas de spam, désinscription à tout moment
          </p>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Sujets Populaires
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Cloud Computing', count: '12 articles', icon: '☁️' },
              { name: 'Cybersécurité', count: '8 articles', icon: '🔒' },
              { name: 'Développement Web', count: '15 articles', icon: '💻' },
              { name: 'Intelligence Artificielle', count: '6 articles', icon: '🤖' }
            ].map((topic, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-blue-50 transition-colors duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{topic.name}</h3>
                <p className="text-blue-600 text-sm">{topic.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}