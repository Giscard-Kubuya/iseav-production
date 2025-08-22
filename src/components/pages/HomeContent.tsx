'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomeContent() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [professorsOffset, setProfessorsOffset] = useState(0)
  const [partnersOffset, setPartnersOffset] = useState(0)
  const [isProfessorsManualControl, setIsProfessorsManualControl] = useState(false)
  const [isPartnersManualControl, setIsPartnersManualControl] = useState(false)

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      title: "Bienvenue chez INFONET",
      subtitle: "Solutions IT & Technologies Numériques - Burundi",
      description: "Votre partenaire technologique de confiance pour transformer votre entreprise",
      primaryAction: { text: "Nos Services", href: "/services" },
      secondaryAction: { text: "Demander un Devis", href: "/contact" }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      title: "Développement Web Professionnel",
      subtitle: "Sites Web Modernes & Performants",
      description: "Créez votre présence en ligne avec nos solutions web sur mesure et responsive",
      primaryAction: { text: "Découvrir", href: "/services#web-development" },
      secondaryAction: { text: "Portfolio", href: "/portfolio" }
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      title: "Connectivité Internet Fiable",
      subtitle: "Solutions de Connectivité Professionnelle",
      description: "Internet haut débit et réseaux d'entreprise pour une connectivité optimale",
      primaryAction: { text: "Nos Offres", href: "/services#connectivity" },
      secondaryAction: { text: "Support 24/7", href: "/contact" }
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      title: "Sécurité & Innovation",
      subtitle: "Systèmes de Sécurité Avancés",
      description: "Protégez vos biens avec nos solutions de surveillance et sécurité de pointe",
      primaryAction: { text: "Sécurité", href: "/services#security" },
      secondaryAction: { text: "Consultation", href: "/contact" }
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10s
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  // Arrow control handlers for professors section
  const professorsPrevious = () => {
    setIsProfessorsManualControl(true)
    setProfessorsOffset(prev => {
      const newOffset = Math.min(prev + 320, 500)
      console.log('Previous clicked, current offset:', prev, 'new offset:', newOffset)
      return newOffset
    })
    // Reset manual control after animation
    setTimeout(() => setIsProfessorsManualControl(false), 5000)
  }

  const professorsNext = () => {
    setIsProfessorsManualControl(true)
    setProfessorsOffset(prev => {
      const newOffset = Math.max(prev - 320, -2000)
      console.log('Next clicked, current offset:', prev, 'new offset:', newOffset)
      return newOffset
    })
    // Reset manual control after animation
    setTimeout(() => setIsProfessorsManualControl(false), 5000)
  }

  // Arrow control handlers for partners section
  const partnersPrevious = () => {
    setIsPartnersManualControl(true)
    setPartnersOffset(prev => {
      const newOffset = Math.min(prev + 280, 500)
      console.log('Partners Previous clicked, current offset:', prev, 'new offset:', newOffset)
      return newOffset
    })
    // Reset manual control after animation
    setTimeout(() => setIsPartnersManualControl(false), 5000)
  }

  const partnersNext = () => {
    setIsPartnersManualControl(true)
    setPartnersOffset(prev => {
      const newOffset = Math.max(prev - 280, -2000)
      console.log('Partners Next clicked, current offset:', prev, 'new offset:', newOffset)
      return newOffset
    })
    // Reset manual control after animation
    setTimeout(() => setIsPartnersManualControl(false), 5000)
  }


  return (
    <>
      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Images */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center text-white">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`transition-all duration-700 ${
                    index === currentSlide
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ display: index === currentSlide ? 'block' : 'none' }}
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
                    <span className="bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                      {slide.title}
                    </span>
                  </h1>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-blue-100 animate-fade-in-up delay-200">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-600">
                    <Link 
                      href={slide.primaryAction.href}
                      className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 group"
                    >
                      <span className="group-hover:scale-105 transition-transform duration-300">
                        {slide.primaryAction.text}
                      </span>
                    </Link>
                    <Link 
                      href={slide.secondaryAction.href}
                      className="border-2 border-white/50 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-sm group"
                    >
                      <span className="group-hover:scale-105 transition-transform duration-300">
                        {slide.secondaryAction.text}
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-1000 ease-linear"
            style={{ 
              width: isAutoPlaying ? '100%' : '0%',
              animation: isAutoPlaying ? 'progress 5s linear infinite' : 'none'
            }}
          />
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes slide-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes slide-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-left {
          animation: slide-left 30s linear infinite;
        }

        .animate-slide-right {
          animation: slide-right 25s linear infinite;
        }

        .group.paused .animate-slide-left,
        .group.paused .animate-slide-right {
          animation-play-state: paused;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>

      {/* Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <div 
                className="text-4xl font-bold text-blue-600 mb-2 animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                200+
              </div>
              <div className="text-gray-600 font-medium">Projets Réalisés</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <div
                className="text-4xl font-bold text-green-600 mb-2 animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                150+
              </div>
              <div className="text-gray-600 font-medium">Clients Satisfaits</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <div
                className="text-4xl font-bold text-blue-600 mb-2 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                10+
              </div>
              <div className="text-gray-600 font-medium">Années d'Expérience</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <div
                className="text-4xl font-bold text-green-600 mb-2 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                24/7
              </div>
              <div className="text-gray-600 font-medium">Support Technique</div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Actualités & Réalisations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos derniers projets et innovations dans le domaine des 
              technologies de l'information et solutions numériques
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-6xl">🌐</span>
              </div>
              <div className="p-6">
                <div className="text-sm text-green-600 mb-2 font-semibold">
                  15 Janvier 2025
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Nouveau Centre de Données INFONET
                </h3>
                <p className="text-gray-600 mb-4">
                  INFONET inaugure son nouveau centre de données haute performance 
                  pour améliorer ses services d'hébergement...
                </p>
                <Link
                  href="/blog/centre-donnees-infonet"
                  className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center"
                >
                  Lire la suite
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <span className="text-white text-6xl">🤝</span>
              </div>
              <div className="p-6">
                <div className="text-sm text-green-600 mb-2 font-semibold">
                  10 Janvier 2025
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Partenariat avec Microsoft Burundi
                </h3>
                <p className="text-gray-600 mb-4">
                  INFONET devient partenaire certifié Microsoft pour offrir 
                  des solutions cloud Azure à ses clients...
                </p>
                <Link
                  href="/blog/partenariat-microsoft"
                  className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center"
                >
                  Lire la suite
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                <span className="text-white text-6xl">🏆</span>
              </div>
              <div className="p-6">
                <div className="text-sm text-green-600 mb-2 font-semibold">
                  5 Janvier 2025
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Prix Meilleure Entreprise IT 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  INFONET remporte le prix de la meilleure entreprise IT du Burundi 
                  pour ses innovations technologiques...
                </p>
                <Link
                  href="/blog/prix-entreprise-it-2024"
                  className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center"
                >
                  Lire la suite
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 text-lg"
            >
              Voir toutes les actualités
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* IT Excellence */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                Excellence Technologique
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                INFONET se distingue par son approche innovante des solutions IT et 
                technologies numériques. Nos services sont conçus pour répondre aux 
                défis contemporains de la transformation digitale des entreprises au Burundi.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-xl">💻</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Solutions Sur Mesure</h3>
                    <p className="text-gray-600">Développement personnalisé adapté aux besoins spécifiques de votre entreprise</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Technologies Modernes</h3>
                    <p className="text-gray-600">Utilisation des dernières technologies et standards internationaux</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/services"
                  className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Découvrir nos services
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl p-8">
                <div className="h-full bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-8xl mb-4 block">💻</span>
                    <h3 className="text-2xl font-bold">Innovation & Technologie</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Notre Équipe d'Experts IT
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe de professionnels qualifiés dédiés à l'excellence technologique et à l'innovation
            </p>
          </div>
          
          <div className="relative overflow-hidden group">
            {/* Navigation Arrows for Professors */}
            <button
              onClick={professorsPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg group/btn"
            >
              <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={professorsNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg group/btn"
            >
              <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div 
              className={`flex space-x-8 transition-transform duration-500 ${!isProfessorsManualControl ? 'animate-slide-left group-hover:pause' : ''}`}
              style={{ 
                transform: `translateX(${professorsOffset}px)`
              }}
            >
              {/* Expert 1 */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Jean-Baptiste Niyonzima"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Jean-Baptiste Niyonzima</h3>
                  <p className="text-blue-600 font-semibold text-center mb-3">Directeur Technique</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Ingénieur en informatique spécialisé en architecture cloud et sécurité réseau
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Cloud</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Sécurité</span>
                  </div>
                </div>
              </div>

              {/* Expert 2 */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1594736797933-d0dadb11fcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Arlette Uwimana"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Arlette Uwimana</h3>
                  <p className="text-green-600 font-semibold text-center mb-3">Chef Développement Web</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Développeuse Full-Stack spécialisée en React, Node.js et applications mobiles
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">React</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">Mobile</span>
                  </div>
                </div>
              </div>

              {/* Expert 3 */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Marc Ndikumana"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Marc Ndikumana</h3>
                  <p className="text-blue-600 font-semibold text-center mb-3">Ingénieur Réseau</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Spécialiste en infrastructure réseau et systèmes de télécommunications
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs">Réseaux</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Télécom</span>
                  </div>
                </div>
              </div>

              {/* Expert 4 */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Espérance Mukamana"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Espérance Mukamana</h3>
                  <p className="text-green-600 font-semibold text-center mb-3">Responsable Cybersécurité</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Experte en sécurité informatique et protection des données d'entreprise
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Sécurité</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs">Protection</span>
                  </div>
                </div>
              </div>

              {/* Expert 5 */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Claudine Nibigira"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Claudine Nibigira</h3>
                  <p className="text-blue-600 font-semibold text-center mb-3">Directrice Innovation</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Intelligence artificielle et solutions d'automatisation d'entreprise
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">IA</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Innovation</span>
                  </div>
                </div>
              </div>

              {/* Duplicate first expert for seamless loop */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Jean-Baptiste Niyonzima"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Jean-Baptiste Niyonzima</h3>
                  <p className="text-blue-600 font-semibold text-center mb-3">Directeur Technique</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Ingénieur en informatique spécialisé en architecture cloud et sécurité réseau
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Cloud</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Sécurité</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Nos Partenaires Technologiques
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborations d'excellence avec les leaders mondiaux de la technologie
            </p>
          </div>
          
          <div className="relative overflow-hidden group">
            {/* Navigation Arrows for Partners */}
            <button
              onClick={partnersPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg group/btn"
            >
              <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={partnersNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg group/btn"
            >
              <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div 
              className={`flex space-x-8 items-center transition-transform duration-500 ${!isPartnersManualControl ? 'animate-slide-right group-hover:pause' : ''}`}
              style={{ 
                transform: `translateX(${partnersOffset}px)`
              }}>
              {/* Partner 1 - Microsoft */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1633419461186-7d40a38105ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Microsoft"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">Microsoft</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Cloud Solutions</p>
              </div>

              {/* Partner 2 - Google */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Google Cloud"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">Google Cloud</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Infrastructure Cloud</p>
              </div>

              {/* Partner 3 - AWS */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Amazon AWS"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">Amazon AWS</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Services Cloud</p>
              </div>

              {/* Partner 4 - Cisco */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Cisco"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">Cisco</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Réseaux & Sécurité</p>
              </div>

              {/* Partner 5 - Oracle */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Oracle"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">Oracle</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Bases de Données</p>
              </div>

              {/* Partner 6 - HP Enterprise */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="HP Enterprise"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">HP Enterprise</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Serveurs & Infrastructure</p>
              </div>

              {/* Partner 7 - IBM */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="IBM"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">IBM</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Solutions d'Entreprise</p>
              </div>

              {/* Duplicate first partner for seamless loop */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1633419461186-7d40a38105ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Microsoft"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">Microsoft</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Cloud Solutions</p>
              </div>
            </div>
          </div>
          
          {/* Partnership Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Partenaires Technologiques</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-gray-600">Solutions Déployées</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-600">Pays d'Afrique de l'Est</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Transformez Votre Entreprise Aujourd'hui</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Découvrez comment INFONET peut révolutionner votre infrastructure IT et accélérer votre transformation digitale au Burundi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Demander un Devis Gratuit
            </Link>
            <Link 
              href="/services" 
              className="border-2 border-green-400 text-green-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-400 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Découvrir nos Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}