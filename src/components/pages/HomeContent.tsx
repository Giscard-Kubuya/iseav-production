'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomeContent() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      title: "Bienvenue à ISEAV-ARU",
      subtitle: "Institut Supérieur d'Enseignement Appliqué et de Valorisation",
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
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
                  ISEAV-ARU inaugure son nouveau laboratoire de recherche en agriculture 
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
                  tunisienne pour des stages et projets...
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
                  ISEAV-ARU reçoit le prix national d'excellence pour l'innovation 
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
                ISEAV-ARU se distingue par son approche innovante de l'enseignement agricole et 
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

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Rejoignez l'Excellence</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Découvrez comment ISEAV-ARU peut transformer votre avenir académique et professionnel dans l'agriculture et les sciences appliquées
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