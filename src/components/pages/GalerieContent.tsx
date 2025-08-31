'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { galleryItemsApi } from '@/lib/api-services'
import { GalleryItem } from '@/lib/api'

export default function GalerieContent() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    { id: 'all', name: 'Tous', icon: '🖼️' },
    { id: 'office', name: 'Bureaux', icon: '🏢' },
    { id: 'projects', name: 'Projets', icon: '💻' },
    { id: 'team', name: 'Équipe', icon: '👥' },
    { id: 'events', name: 'Événements', icon: '🎉' },
    { id: 'training', name: 'Formation', icon: '🎓' },
    { id: 'awards', name: 'Récompenses', icon: '🏆' }
  ]

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch all published gallery items
        const response = await galleryItemsApi.getAll({
          published: true,
          per_page: 50
        })
        
        setGallery(response.data.data || [])
        
      } catch (err) {
        console.error('Error fetching gallery items:', err)
        setError('Impossible de charger la galerie')
      } finally {
        setLoading(false)
      }
    }
    
    fetchGalleryItems()
  }, [])

  const filteredGallery = activeCategory === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory)

  const openLightbox = async (image: GalleryItem) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
    
    // Increment view count
    try {
      await galleryItemsApi.incrementViews(image.id)
      // Update local state to reflect the view increment
      setGallery(gallery.map(item => 
        item.id === image.id ? { ...item, views: item.views + 1 } : item
      ))
    } catch (err) {
      console.error('Error incrementing views:', err)
    }
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    if (selectedImage) {
      const currentIndex = filteredGallery.findIndex(img => img.id === selectedImage.id)
      const nextIndex = (currentIndex + 1) % filteredGallery.length
      setSelectedImage(filteredGallery[nextIndex])
    }
  }

  const previousImage = () => {
    if (selectedImage) {
      const currentIndex = filteredGallery.findIndex(img => img.id === selectedImage.id)
      const prevIndex = (currentIndex - 1 + filteredGallery.length) % filteredGallery.length
      setSelectedImage(filteredGallery[prevIndex])
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-600">Chargement de la galerie...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error}</h2>
          <button 
            onClick={() => window.location.reload()} 
            className="text-blue-600 hover:text-blue-800"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/75 to-amber-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-blue-300 via-white to-amber-300 bg-clip-text text-transparent">
                  Galerie CEPAC
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-blue-100 animate-fade-in-up delay-200">
                Découvrez Notre Univers Éducatif
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Plongez dans notre galerie photo et découvrez nos salles de classe, activités, équipe éducative et moments marquants
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                Explorez par Catégorie
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                  item.featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openLightbox(item)}
              >
                <div className={`relative ${item.featured ? 'h-96' : 'h-64'} overflow-hidden`}>
                  <img
                    src={item.image_url}
                    alt={item.alt_text || item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {item.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">{new Date(item.created_at).getFullYear()}</span>
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Voir
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                Notre Galerie en Chiffres
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl font-bold text-blue-600 mb-2">{gallery.length}</div>
              <div className="text-gray-600 font-medium">Photos</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl font-bold text-green-600 mb-2">{gallery.filter(item => item.category === 'projects').length}</div>
              <div className="text-gray-600 font-medium">Projets Documentés</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl font-bold text-blue-600 mb-2">{gallery.filter(item => item.category === 'events').length}</div>
              <div className="text-gray-600 font-medium">Événements</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-4xl font-bold text-green-600 mb-2">{gallery.reduce((sum, item) => sum + item.views, 0).toLocaleString()}</div>
              <div className="text-gray-600 font-medium">Vues Total</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Rejoignez Notre Histoire
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Vous souhaitez faire partie de nos prochaines réalisations ? Contactez-nous !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Nos Services
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={closeLightbox}>
          <div className="relative max-w-4xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.alt_text || selectedImage.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}