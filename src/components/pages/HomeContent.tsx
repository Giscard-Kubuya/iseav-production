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
      image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      title: "Bienvenue à ISEAV WALUNGU",
      subtitle: "Institut Supérieur d'Études Agronomiques et Vétérinaires",
      description: "Formant les leaders de demain dans l'agriculture et les sciences appliquées",
      primaryAction: { text: "Candidater maintenant", href: "/admissions" },
      secondaryAction: { text: "Découvrir nos formations", href: "/visit" }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      title: "Excellence Académique",
      subtitle: "Innovation dans l'Enseignement Agricole",
      description: "Des programmes de pointe alliant tradition et technologies modernes pour une formation complète",
      primaryAction: { text: "Nos Programmes", href: "/academics" },
      secondaryAction: { text: "Visite Virtuelle", href: "/virtual-tour" }
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      title: "Recherche & Innovation",
      subtitle: "Laboratoires de Pointe",
      description: "Découvrez nos installations modernes et participez à des projets de recherche révolutionnaires",
      primaryAction: { text: "Nos Recherches", href: "/research" },
      secondaryAction: { text: "Laboratoires", href: "/facilities" }
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      title: "Vie Étudiante Dynamique",
      subtitle: "Campus Moderne & Accueillant",
      description: "Un environnement stimulant favorisant l'épanouissement personnel et académique",
      primaryAction: { text: "Vie Campus", href: "/student-life" },
      secondaryAction: { text: "Activités", href: "/activities" }
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
                    <span className="bg-gradient-to-r from-cyan-300 to-amber-300 bg-clip-text text-transparent">
                      {slide.title}
                    </span>
                  </h1>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-cyan-100 animate-fade-in-up delay-200">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-600">
                    <Link 
                      href={slide.primaryAction.href}
                      className="bg-gradient-to-r from-cyan-600 to-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25 group"
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
            className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 transition-all duration-1000 ease-linear"
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
                500+
              </div>
              <div className="text-gray-600 font-medium">Étudiants</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
              <div
                className="text-4xl font-bold text-yellow-600 mb-2 animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                25+
              </div>
              <div className="text-gray-600 font-medium">Enseignants</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <div
                className="text-4xl font-bold text-blue-600 mb-2 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                12
              </div>
              <div className="text-gray-600 font-medium">Spécialités</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
              <div
                className="text-4xl font-bold text-yellow-600 mb-2 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                95%
              </div>
              <div className="text-gray-600 font-medium">Taux d'employabilité</div>
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
              Découvrez les dernières nouvelles de notre institut et nos avancées 
              dans les domaines de l'agriculture et des technologies appliquées
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-6xl">🌱</span>
              </div>
              <div className="p-6">
                <div className="text-sm text-yellow-600 mb-2 font-semibold">
                  15 Janvier 2025
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Nouveau laboratoire d'agriculture durable
                </h3>
                <p className="text-gray-600 mb-4">
                  ISEAV WALUNGU inaugure son nouveau laboratoire de recherche en agriculture 
                  durable, équipé des dernières technologies...
                </p>
                <Link
                  href="/news/laboratoire-agriculture-durable"
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
              <div className="h-48 bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                <span className="text-white text-6xl">🤝</span>
              </div>
              <div className="p-6">
                <div className="text-sm text-yellow-600 mb-2 font-semibold">
                  10 Janvier 2025
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Partenariat avec l'industrie agroalimentaire
                </h3>
                <p className="text-gray-600 mb-4">
                  Signature d'accords avec les leaders de l'industrie agroalimentaire 
                  congolaise pour des stages et projets...
                </p>
                <Link
                  href="/news/partenariat-agroalimentaire"
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
              <div className="h-48 bg-gradient-to-br from-blue-500 to-yellow-500 flex items-center justify-center">
                <span className="text-white text-6xl">🏆</span>
              </div>
              <div className="p-6">
                <div className="text-sm text-yellow-600 mb-2 font-semibold">
                  5 Janvier 2025
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Prix d'excellence académique 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  ISEAV WALUNGU reçoit le prix national d'excellence pour l'innovation 
                  dans l'enseignement agricole...
                </p>
                <Link
                  href="/news/prix-excellence-2024"
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
              href="/news"
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

      {/* Academic Excellence */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                Excellence Académique
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                ISEAV WALUNGU se distingue par son approche innovante de l'enseignement agricole et 
                des sciences appliquées. Nos programmes académiques sont conçus pour répondre aux 
                défis contemporains de l'agriculture moderne et du développement durable.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-600 text-xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Formation Pratique</h3>
                    <p className="text-gray-600">Apprentissage concret dans nos laboratoires et fermes d'application</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-600 text-xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Perspective Internationale</h3>
                    <p className="text-gray-600">Échanges et partenariats avec des institutions mondiales</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/academics"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Découvrir nos programmes
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-yellow-500 rounded-3xl p-8">
                <div className="h-full bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-8xl mb-4 block">📚</span>
                    <h3 className="text-2xl font-bold">Innovation & Tradition</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Nos Professeurs & Conférenciers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe d'experts passionnés dédiés à l'excellence académique et à la formation pratique
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
              {/* Professor 1 */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Dr. Mwami Furaha"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Dr. Mwami Furaha</h3>
                  <p className="text-cyan-600 font-semibold text-center mb-3">Directeur Agronomie</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Spécialiste en phytopathologie et protection des cultures avec 20 ans d'expérience
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Agronomie</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Recherche</span>
                  </div>
                </div>
              </div>

              {/* Professor 2 */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1594736797933-d0dadb11fcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Dr. Grace Kahindo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Dr. Grace Kahindo</h3>
                  <p className="text-cyan-600 font-semibold text-center mb-3">Professeure Biotechnologies</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Experte en biotechnologies végétales et génomique avec formation internationale
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Biotech</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">Génomique</span>
                  </div>
                </div>
              </div>

              {/* Professor 3 */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Pr. Jean-Claude Mukendi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Pr. Jean-Claude Mukendi</h3>
                  <p className="text-cyan-600 font-semibold text-center mb-3">Professeur Microbiologie</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Spécialiste en microbiologie appliquée et fermentation industrielle
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs">Microbiologie</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Innovation</span>
                  </div>
                </div>
              </div>

              {/* Professor 4 */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Dr. Esperance Nyota"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Dr. Esperance Nyota</h3>
                  <p className="text-cyan-600 font-semibold text-center mb-3">Professeure Technologie Alimentaire</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Innovation alimentaire et développement de produits durables
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Alimentaire</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs">Innovation</span>
                  </div>
                </div>
              </div>

              {/* Professor 5 */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Dr. Claudine Bahati"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Dr. Claudine Bahati</h3>
                  <p className="text-cyan-600 font-semibold text-center mb-3">Directrice de Recherche</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Intelligence artificielle appliquée à l'agriculture moderne
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">IA</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">AgriTech</span>
                  </div>
                </div>
              </div>

              {/* Duplicate first few for seamless loop */}
              <div className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="p-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                      alt="Dr. Mwami Furaha"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2 text-center">Dr. Mwami Furaha</h3>
                  <p className="text-cyan-600 font-semibold text-center mb-3">Directeur Agronomie</p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    Spécialiste en phytopathologie et protection des cultures avec 20 ans d'expérience
                  </p>
                  <div className="flex justify-center space-x-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Agronomie</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Recherche</span>
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
              Nos Partenaires Stratégiques
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborations d'excellence avec des institutions de renommée internationale
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
              {/* Partner 1 - Université de Kinshasa */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Université de Kinshasa"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">Université de Kinshasa</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Enseignement Supérieur</p>
              </div>

              {/* Partner 2 - Ministère Agriculture */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Ministère Agriculture RDC"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">Ministère Agriculture</h3>
                <p className="text-xs text-gray-600 text-center mt-1">République Démocratique du Congo</p>
              </div>

              {/* Partner 3 - CGIAR */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="CGIAR Research"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">CGIAR</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Recherche Agricole Mondiale</p>
              </div>

              {/* Partner 4 - FAO */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="FAO Congo"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">FAO Congo</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Organisation des Nations Unies</p>
              </div>

              {/* Partner 5 - Union Européenne */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Union Européenne"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">Union Européenne</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Coopération Internationale</p>
              </div>

              {/* Partner 6 - Banque Mondiale */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Banque Mondiale"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">Banque Mondiale</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Financement & Développement</p>
              </div>

              {/* Partner 7 - ONU */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1515847049296-a281d6401047?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="ONU Développement"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">PNUD</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Programme des Nations Unies</p>
              </div>

              {/* Duplicate first few for seamless loop */}
              <div className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                   onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('paused')}
                   onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('paused')}>
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Université de Kinshasa"
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 text-center">Université de Kinshasa</h3>
                <p className="text-xs text-gray-600 text-center mt-1">Enseignement Supérieur</p>
              </div>
            </div>
          </div>
          
          {/* Partnership Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Partenaires Internationaux</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Projets Collaboratifs</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-amber-600 mb-2">8</div>
              <div className="text-gray-600">Pays Partenaires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Rejoignez l'Excellence</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Découvrez comment ISEAV WALUNGU peut transformer votre avenir académique et professionnel dans l'agriculture et les sciences appliquées
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admissions" 
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Candidater maintenant
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-yellow-400 text-yellow-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}