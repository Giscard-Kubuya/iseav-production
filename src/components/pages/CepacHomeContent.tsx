"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CepacHomeContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // CEPAC-specific hero slides
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      title: "8e CEPAC Projet-Beni",
      subtitle: "Centre d'Excellence Éducative",
      description: "Formation de qualité pour l'épanouissement intégral de nos apprenants dans un cadre moderne et innovant",
      primaryAction: {
        text: "Découvrir nos programmes",
        href: "/programmes",
      },
      secondaryAction: {
        text: "Nous contacter",
        href: "/contact",
      },
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      title: "Éducation Primaire",
      subtitle: "Fondations Solides",
      description: "Un programme éducatif adapté pour construire les bases essentielles de l'apprentissage de nos élèves",
      primaryAction: {
        text: "Programme Primaire",
        href: "/programmes/primaire",
      },
      secondaryAction: {
        text: "Inscriptions",
        href: "/inscriptions",
      },
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80",
      title: "Cycle Complémentaire",
      subtitle: "Excellence Académique",
      description: "Préparation optimale pour les études secondaires avec un accompagnement personnalisé",
      primaryAction: {
        text: "Cycle Complémentaire",
        href: "/programmes/complementaire",
      },
      secondaryAction: {
        text: "Résultats",
        href: "/resultats",
      },
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

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
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/50 to-amber-700/70" />
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
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ display: index === currentSlide ? "block" : "none" }}
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
                    <span className="bg-gradient-to-r from-amber-300 to-blue-300 bg-clip-text text-transparent">
                      {slide.title}
                    </span>
                  </h1>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-amber-200 animate-fade-in-up delay-200">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-600">
                    <Link
                      href={slide.primaryAction.href}
                      className="bg-gradient-to-r from-blue-600 to-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25 group"
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

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-amber-400 scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
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

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Élèves Formés</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-amber-600 mb-2">25+</div>
              <div className="text-gray-600 font-medium">Enseignants Qualifiés</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
              <div className="text-gray-600 font-medium">Années d'Excellence</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-amber-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Taux de Réussite</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-blue-600">Programmes</span> Éducatifs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des programmes d'excellence adaptés à chaque niveau pour assurer 
              la réussite et l'épanouissement de nos apprenants
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-blue-800 mb-6">
                Éducation Primaire
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Notre programme d'éducation primaire offre une base solide avec 
                des méthodes pédagogiques modernes et un encadrement personnalisé 
                pour chaque apprenant.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Apprentissage Fondamental
                    </h4>
                    <p className="text-gray-600">
                      Maîtrise de la lecture, écriture et calcul avec des méthodes innovantes
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Éveil Scientifique
                    </h4>
                    <p className="text-gray-600">
                      Découverte des sciences et développement de l'esprit critique
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/programmes/primaire"
                className="bg-gradient-to-r from-blue-600 to-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                En savoir plus
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-amber-500 rounded-3xl p-8">
                <div className="h-full bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-8xl mb-4 block">📚</span>
                    <h3 className="text-2xl font-bold">
                      Éducation Primaire
                    </h3>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre <span className="text-blue-600">Équipe</span> Pédagogique
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des enseignants qualifiés et expérimentés, dédiés à l'excellence éducative et au développement de chaque apprenant
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full shadow-lg">
                <img 
                  src="/images/team/jean-akpo.jpg" 
                  alt="M. Jean AKPO - Directeur Pédagogique" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">M. Jean AKPO</h3>
              <p className="text-amber-600 font-semibold mb-3">Directeur Pédagogique</p>
              <p className="text-gray-600 text-sm">
                20+ années d'expérience en éducation primaire. Spécialiste en pédagogie moderne et développement curriculaire.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full shadow-lg">
                <img 
                  src="/images/team/marie-dossou.jpg" 
                  alt="Mme Marie DOSSOU - Coordinatrice Primaire" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1494790108755-2616c57f8873?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Mme Marie DOSSOU</h3>
              <p className="text-amber-600 font-semibold mb-3">Coordinatrice Primaire</p>
              <p className="text-gray-600 text-sm">
                Experte en méthodes d'enseignement innovantes. Formée aux approches pédagogiques internationales.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full shadow-lg">
                <img 
                  src="/images/team/paul-agbo.jpg" 
                  alt="M. Paul AGBO - Responsable Cycle Complémentaire" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">M. Paul AGBO</h3>
              <p className="text-amber-600 font-semibold mb-3">Responsable Cycle Complémentaire</p>
              <p className="text-gray-600 text-sm">
                Spécialiste en préparation aux examens. Excellence dans l'accompagnement vers le secondaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Actualités/News Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">Actualités</span> & Événements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Restez informés de nos dernières actualités, événements et succès de nos apprenants
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/actualites/cep-2024-results.jpg" 
                  alt="Excellents résultats au CEP 2024" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }}
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-amber-600 font-semibold mb-2">15 Décembre 2024</div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">Excellent résultats au CEP 2024</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Nos élèves du cycle complémentaire ont obtenu un taux de réussite de 98% au Certificat d'Études Primaires, plaçant notre école parmi les meilleures de la région.
                </p>
                <Link href="/actualites/cep-2024" className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                  Lire la suite →
                </Link>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/actualites/nouvelle-methode-apprentissage.jpg" 
                  alt="Nouvelle méthode d'apprentissage" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }}
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-amber-600 font-semibold mb-2">10 Décembre 2024</div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">Nouvelle méthode d'apprentissage</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Introduction d'une approche pédagogique innovante basée sur l'apprentissage par projets pour renforcer l'engagement des élèves.
                </p>
                <Link href="/actualites/nouvelle-methode" className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                  Lire la suite →
                </Link>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/actualites/journee-portes-ouvertes.jpg" 
                  alt="Journée Portes Ouvertes" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }}
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-amber-600 font-semibold mb-2">5 Décembre 2024</div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">Journée Portes Ouvertes</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Grande réussite de notre journée portes ouvertes avec plus de 200 familles venues découvrir nos infrastructures et programmes éducatifs.
                </p>
                <Link href="/actualites/portes-ouvertes" className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                  Lire la suite →
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-blue-600">Partenaires</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des collaborations solides pour offrir une éducation de qualité et des opportunités d'excellence à nos apprenants
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-blue-50 hover:shadow-lg transition-shadow">
              <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
                <img 
                  src="/images/partners/ministere-education-benin.jpg" 
                  alt="Ministère de l'Éducation de la RDC" 
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Ministère de l'Éducation</h3>
              <p className="text-gray-600">
                Partenaire institutionnel pour l'amélioration de la qualité de l'enseignement en RDC
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-amber-50 hover:shadow-lg transition-shadow">
              <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
                <img 
                  src="/images/partners/unesco-logo.jpg" 
                  alt="UNESCO - Éducation pour tous" 
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-4">UNESCO</h3>
              <p className="text-gray-600">
                Soutien pour l'éducation de qualité et le développement durable
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-blue-50 hover:shadow-lg transition-shadow">
              <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
                <img 
                  src="/images/partners/unicef-logo.jpg" 
                  alt="UNICEF - Protection enfance" 
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">UNICEF</h3>
              <p className="text-gray-600">
                Protection et éducation des enfants dans un environnement sain
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-amber-50 hover:shadow-lg transition-shadow">
              <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
                <img 
                  src="/images/partners/world-bank-logo.jpg" 
                  alt="Banque Mondiale - Financement éducation" 
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-4">Banque Mondiale</h3>
              <p className="text-gray-600">
                Financement de projets éducatifs et infrastructure scolaire
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-blue-50 hover:shadow-lg transition-shadow">
              <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
                <img 
                  src="/images/partners/cooperation-francaise.jpg" 
                  alt="Coopération Française - Développement" 
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-4">Coopération Française</h3>
              <p className="text-gray-600">
                Appui technique et formation des enseignants
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-amber-50 hover:shadow-lg transition-shadow">
              <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
                <img 
                  src="/images/partners/union-africaine.jpg" 
                  alt="Union Africaine - Éducation" 
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-4">Union Africaine</h3>
              <p className="text-gray-600">
                Programmes d'éducation continentaux et échanges internationaux
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-800 via-blue-700 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez l'Excellence Éducative
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Offrez à votre enfant une formation d'excellence dans un environnement 
            propice à l'apprentissage et à l'épanouissement personnel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inscriptions"
              className="bg-gradient-to-r from-amber-600 to-amber-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              S'inscrire Maintenant
            </Link>
            <Link
              href="/contact"
              className="border-2 border-amber-400 text-amber-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}