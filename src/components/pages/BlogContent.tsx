'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useBlogPostsFront } from '@/hooks/useBlogPostsFront'
import { NewsSkeleton } from '@/components/ui/LoadingSkeleton'

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState('all')

  // Fetch blog posts from API
  const { blogPosts, loading, error } = useBlogPostsFront({ category: activeCategory })

  const categories = [
    { id: 'all', name: 'Tous les Articles' },
    { id: 'community', name: 'Développement Communautaire' },
    { id: 'projects', name: 'Nos Projets' },
    { id: 'social', name: 'Impact Social' },
    { id: 'education', name: 'Éducation' },
    { id: 'health', name: 'Santé' }
  ]

  const filteredArticles = blogPosts || []
  const featuredArticles = blogPosts.filter(article => article.featured) || []

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
                  Blog CEPAC
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-blue-100 animate-fade-in-up delay-200">
                Actualités & Perspectives Communautaires
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Restez informés de nos activités et des enjeux du développement communautaire
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

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }, (_, index) => (
                <NewsSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-600">
              <p className="text-xl">Erreur lors du chargement des articles</p>
              <p className="mt-2">{error}</p>
            </div>
          ) : featuredArticles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredArticles.slice(0, 3).map((article, index) => (
                <Link key={article.id} href={`/blog/${article.id}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={article.featured_image || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
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
                      <span>{new Date(article.publish_date || article.created_at).toLocaleDateString('fr-FR')}</span>
                      <span className="mx-2">•</span>
                      <span>5 min de lecture</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {article.excerpt || article.content?.substring(0, 150) + '...'}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags && article.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {article.category && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          {article.category}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Par {article.author || 'CEPAC'}</span>
                      <span className="text-blue-600 font-semibold text-sm">
                        Lire la suite →
                      </span>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p className="text-xl">Aucun article en vedette disponible.</p>
            </div>
          )}
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
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }, (_, index) => (
                <NewsSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-600">
              <p className="text-xl">Erreur lors du chargement des articles</p>
              <p className="mt-2">{error}</p>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <Link key={article.id} href={`/blog/${article.id}`}>
                  <article className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer">
                  <div className="relative">
                    <img
                      src={article.featured_image || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
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
                      <time>{new Date(article.publish_date || article.created_at).toLocaleDateString('fr-FR')}</time>
                      <span className="mx-2">•</span>
                      <span>5 min de lecture</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {article.excerpt || article.content?.substring(0, 120) + '...'}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags && article.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {article.category && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                          {article.category}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{article.author || 'CEPAC'}</span>
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
          ) : (
            <div className="text-center text-gray-600">
              <p className="text-xl">Aucun article disponible dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Restez Informés
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Recevez nos dernières actualités et informations sur nos projets communautaires directement dans votre boîte mail
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
              { name: 'Développement Rural', count: '12 articles', icon: '🌾' },
              { name: 'Éducation Communautaire', count: '8 articles', icon: '🎓' },
              { name: 'Santé Publique', count: '15 articles', icon: '🏥' },
              { name: 'Agriculture Durable', count: '6 articles', icon: '🌱' }
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