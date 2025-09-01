"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useHeroSlides } from "@/hooks/useHeroSlides";
import { useServicesFront } from "@/hooks/useServicesFront";
import { useLatestNews } from "@/hooks/useLatestNews";
import { useTeamExperts } from "@/hooks/useTeamExperts";
import { useCompanyValuesFront } from "@/hooks/useCompanyValuesFront";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
import { useTechnologyPartners } from "@/hooks/useTechnologyPartners";
import { useWebsiteConfig } from "@/hooks/useWebsiteConfig";
import {
  HeroSkeleton,
  ServiceSkeleton,
  NewsSkeleton,
  TeamMemberSkeleton,
  StatsSkeleton,
  CardSkeleton,
} from "@/components/ui/LoadingSkeleton";
import PartnersCarousel from "@/components/ui/PartnersCarousel";

export default function CepacHomeContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // API hooks
  const { heroSlides, loading: slidesLoading } = useHeroSlides();
  const { services, loading: servicesLoading } = useServicesFront(3);
  const { news, loading: newsLoading } = useLatestNews(3);
  const { teamExperts, loading: teamLoading } = useTeamExperts();
  const { companyValues, loading: valuesLoading } = useCompanyValuesFront();
  const { settings: websiteSettings, loading: settingsLoading } = useWebsiteSettings();
  const { technologyPartners, loading: partnersLoading } =
    useTechnologyPartners();
  const { websiteConfig, loading: configLoading } = useWebsiteConfig();

  // Auto-play functionality for hero slides
  useEffect(() => {
    if (!isAutoPlaying || heroSlides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  // Loading state for hero section
  if (slidesLoading) {
    return <HeroSkeleton />;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        {heroSlides.length > 0 && (
          <div className="absolute inset-0">
            <Image
              key={currentSlide}
              src={heroSlides[currentSlide]?.image_url || ""}
              alt={heroSlides[currentSlide]?.title || "Hero Image"}
              fill
              className="object-cover opacity-20 animate-fadeIn"
              priority
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div key={currentSlide} className="max-w-4xl">
              {heroSlides[currentSlide] ? (
                <>
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl text-amber-300 font-semibold mb-8 animate-fade-in-up delay-200">
                    {heroSlides[currentSlide].subtitle}
                  </h2>
                  <p className="text-xl text-gray-100 mb-12 max-w-3xl leading-relaxed animate-fade-in-up delay-400">
                    {heroSlides[currentSlide].description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-600">
                    <Link
                      href={heroSlides[currentSlide].primary_action_url || "#"}
                      className="bg-gradient-to-r from-amber-600 to-amber-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                    >
                      {heroSlides[currentSlide].primary_action_text ||
                        "En savoir plus"}
                    </Link>
                    <Link
                      href={
                        heroSlides[currentSlide].secondary_action_url || "#"
                      }
                      className="border-2 border-amber-400 text-amber-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                    >
                      {heroSlides[currentSlide].secondary_action_text ||
                        "Nous contacter"}
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-white">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    8e CEPAC Projet-Beni
                  </h1>
                  <h2 className="text-2xl md:text-3xl text-amber-300 font-semibold mb-8">
                    Centre d'Excellence Éducative
                  </h2>
                  <p className="text-xl mb-12 max-w-3xl">
                    Éducation de qualité et développement communautaire
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        {heroSlides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-amber-400" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Notre <span className="text-amber-600">Impact</span> en Chiffres
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des résultats concrets qui témoignent de notre engagement envers
              l'excellence éducative
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {settingsLoading ? (
              Array.from({ length: 4 }, (_, index) => (
                <StatsSkeleton key={index} />
              ))
            ) : (
              <>
                <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600 font-medium">
                    Vistes Totales
                  </div>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-amber-600 mb-2">
                    25+
                  </div>
                  <div className="text-gray-600 font-medium">
                    Actions humanitaires
                  </div>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    15
                  </div>
                  <div className="text-gray-600 font-medium">
                    Années d'Excellence
                  </div>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-amber-600 mb-2">
                    98%
                  </div>
                  <div className="text-gray-600 font-medium">
                    Taux de Réussite
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des programmes d'excellence adaptés à chaque niveau pour assurer
              la réussite et l'épanouissement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <ServiceSkeleton key={index} />
                ))
              : services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                      <span className="text-2xl">{service.icon || "📚"}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Dernières <span className="text-blue-600">Actualités</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Restez informés de nos dernières activités et réalisations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <NewsSkeleton key={index} />
                ))
              : news.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {article.featured_image && (
                      <div className="h-48 overflow-hidden">
                        <Image
                          src={article.featured_image}
                          alt={article.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="text-sm text-amber-600 font-semibold mb-2">
                        {new Date(article.created_at).toLocaleDateString(
                          "fr-FR"
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-blue-800 mb-3">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {article.excerpt ||
                          article.content?.substring(0, 150) + "..."}
                      </p>
                      <Link
                        href={`/actualites/${article.id}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                      >
                        Lire la suite →
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre <span className="text-blue-600">Équipe</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels dévoués au service de l'éducation et du
              développement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <TeamMemberSkeleton key={index} />
                ))
              : teamExperts.slice(0, 3).map((member) => (
                  <div key={member.id} className="text-center">
                    <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full shadow-lg">
                      {member.image_url ? (
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-4xl text-gray-400">👤</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-blue-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-amber-600 font-semibold mb-3">
                      {member.position}
                    </p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      {companyValues.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos <span className="text-blue-600">Valeurs</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Les principes qui guident notre mission éducative
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valuesLoading
                ? Array.from({ length: 3 }, (_, index) => (
                    <CardSkeleton key={index} />
                  ))
                : companyValues.map((value) => (
                    <div
                      key={value.id}
                      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <span className="text-2xl">{value.icon || "⭐"}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-center leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Partenaires
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Des collaborations stratégiques avec des organisations
              internationales et locales pour renforcer notre impact
              communautaire
            </p>
          </div>

          {partnersLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {Array.from({ length: 6 }, (_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {/* Partners Carousel */}
              <div className="mb-16">
                <PartnersCarousel partners={technologyPartners} />
              </div>

              {/* Partnership Statistics */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div className="group">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      15+
                    </div>
                    <div className="text-gray-600 font-medium">
                      Partenaires Actifs
                    </div>
                  </div>
                  <div className="group">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      8
                    </div>
                    <div className="text-gray-600 font-medium">
                      Pays Partenaires
                    </div>
                  </div>
                  <div className="group">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">💼</span>
                    </div>
                    <div className="text-3xl font-bold text-amber-600 mb-2">
                      25+
                    </div>
                    <div className="text-gray-600 font-medium">
                      Projets Collaboratifs
                    </div>
                  </div>
                  <div className="group">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      5
                    </div>
                    <div className="text-gray-600 font-medium">
                      Années de Collaboration
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez la Famille <span className="text-amber-400">CEPAC</span>
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Offrez à vos enfants une éducation de qualité dans un environnement
            bienveillant et stimulant
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/inscription"
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
