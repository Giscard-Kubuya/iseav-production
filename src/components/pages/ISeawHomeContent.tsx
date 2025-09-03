"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useHeroSlides } from "@/hooks/useHeroSlides";
import { useServicesFront } from "@/hooks/useServicesFront";
import { useLatestNews } from "@/hooks/useLatestNews";
import { useTeamExperts } from "@/hooks/useTeamExperts";
import { useCompanyValuesFront } from "@/hooks/useCompanyValuesFront";
import { useCompanyStatsFront } from "@/hooks/useCompanyStatsFront";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
import { useTechnologyPartners } from "@/hooks/useTechnologyPartners";
import { useWebsiteConfig } from "@/hooks/useWebsiteConfig";
import { useAboutFront } from "@/hooks/useAboutFront";
import {
  HeroSkeleton,
  ServiceSkeleton,
  NewsSkeleton,
  TeamMemberSkeleton,
  StatsSkeleton,
  CardSkeleton,
} from "@/components/ui/LoadingSkeleton";
import ModernPartnersGrid from "@/components/ui/ModernPartnersGrid";

export default function ISeawHomeContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // API hooks
  const { heroSlides, loading: slidesLoading } = useHeroSlides();
  const { services, loading: servicesLoading } = useServicesFront(3);
  const { news, loading: newsLoading } = useLatestNews(3);
  const { teamExperts, loading: teamLoading } = useTeamExperts();
  const { companyValues, loading: valuesLoading } = useCompanyValuesFront();
  const { companyStats, loading: statsLoading } = useCompanyStatsFront();
  const { settings: websiteSettings, loading: settingsLoading } =
    useWebsiteSettings();
  const { technologyPartners, loading: partnersLoading } =
    useTechnologyPartners();
  const { websiteConfig, loading: configLoading } = useWebsiteConfig();
  const { aboutData, loading: aboutLoading } = useAboutFront();

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
                  <h2 className="text-2xl md:text-3xl text-yellow-300 font-semibold mb-8 animate-fade-in-up delay-200">
                    {heroSlides[currentSlide].subtitle}
                  </h2>
                  <p className="text-xl text-gray-100 mb-12 max-w-3xl leading-relaxed animate-fade-in-up delay-400">
                    {heroSlides[currentSlide].description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-600">
                    <Link
                      href={heroSlides[currentSlide].primary_action_url || "#"}
                      className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:from-yellow-700 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                    >
                      {heroSlides[currentSlide].primary_action_text ||
                        "En savoir plus"}
                    </Link>
                    <Link
                      href={
                        heroSlides[currentSlide].secondary_action_url || "#"
                      }
                      className="border-2 border-yellow-400 text-yellow-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                    >
                      {heroSlides[currentSlide].secondary_action_text ||
                        "Nous contacter"}
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-white">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    ISEAV-WALUNGU
                  </h1>
                  <h2 className="text-2xl md:text-3xl text-yellow-300 font-semibold mb-8">
                    Institut Supérieur d'Études Agronomiques et Vétérinaires
                  </h2>
                  <p className="text-xl mb-12 max-w-3xl">
                    Formation de qualité en agronomie, agrovétérinaire, agroforesterie et gestion des ressources naturelles
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
                    index === currentSlide ? "bg-yellow-400" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Notre <span className="text-yellow-600">Impact</span> en Chiffres
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des résultats concrets qui témoignent de notre engagement envers
              l'excellence éducative en agriculture et vétérinaire
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsLoading
              ? Array.from({ length: 4 }, (_, index) => (
                  <StatsSkeleton key={index} />
                ))
              : companyStats.map((stat, index) => (
                  <div
                    key={stat.id}
                    className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg"
                    style={{
                      animationDelay: stat.animation_delay || `${index * 0.1}s`,
                    }}
                  >
                    <div
                      className={`text-4xl font-bold mb-2 ${
                        stat.text_color
                          ? `text-${stat.text_color}`
                          : index % 2 === 0
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-left mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  À Propos d'{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    ISEAV-WALUNGU
                  </span>
                </h2>
                {aboutLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  </div>
                ) : (
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {aboutData?.hero_subtitle ||
                      "Institut supérieur d'études agronomiques et vétérinaires dédié à la formation de qualité et au développement agricole en République Démocratique du Congo"}
                  </p>
                )}
              </div>

              <div className="space-y-6">
                {aboutLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ) : (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {aboutData?.organization_description ||
                      "Contribuer au développement agricole et vétérinaire, promouvoir l'innovation agricole et améliorer la sécurité alimentaire en République Démocratique du Congo à travers une formation de qualité et des programmes de recherche adaptés aux besoins locaux."}
                  </p>
                )}

                {aboutData?.achievements && (
                  <div className="grid grid-cols-3 gap-6 mt-12">
                    {aboutData.achievements.map((achievement, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {achievement.count}
                        </div>
                        <div className="text-sm text-gray-600">
                          {achievement.title}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link
                    href="/about"
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                  >
                    En Savoir Plus
                  </Link>
                  <Link
                    href="/services"
                    className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                  >
                    Nos Programmes
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-3xl shadow-lg">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Pourquoi Nous Choisir ?
                  </h3>
                  {aboutLoading ? (
                    Array.from({ length: 3 }, (_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))
                  ) : aboutData?.why_choose_us ? (
                    aboutData.why_choose_us.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-xl">
                          🌾
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            Excellence Académique
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Programmes accrédités et reconnus par le ministère
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-xl">
                          🔬
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            Recherche Appliquée
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Innovation et recherche adaptées au contexte local
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center text-xl">
                          🤝
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            Partenariats Solides
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Collaborations avec des institutions de renom
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-blue-600">Programmes</span> d'Études
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des formations de qualité autorisées par le Ministère de l'Enseignement Supérieur
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🌾</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Agronomie Générale
              </h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Formation complète en techniques agricoles modernes et durables
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Cycle de Licence (3 ans)</li>
                <li>• Cycle de Master (2 ans)</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🐄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Agrovétérinaire
              </h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Soins vétérinaires et santé animale pour l'agriculture
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Cycle de Licence (3 ans)</li>
                <li>• Cycle de Master (2 ans)</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🌲</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Agroforesterie
              </h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Intégration durable de l'agriculture et de la foresterie
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Cycle de Master (2 ans)</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Gestion des Ressources Naturelles
              </h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Conservation et valorisation durable des écosystèmes
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Cycle de Licence (3 ans)</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🏭</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Transformation des Produits Agricoles
              </h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                Technologie de transformation et valorisation agricole
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Cycle de Licence (3 ans)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-white">
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
                      <div className="text-sm text-yellow-600 font-semibold mb-2">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre <span className="text-blue-600">Équipe</span> Académique
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des experts dévoués au service de la formation agricole et vétérinaire
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
                    <p className="text-green-600 font-semibold mb-3">
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
        <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
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
      <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-24"></div>
              <div className="mx-4 text-blue-600 text-2xl">🤝</div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-24"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Partenaires
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Collaborations stratégiques pour l'excellence académique et la recherche
            </p>
          </div>

          {partnersLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 w-full">
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-2xl h-24 w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : technologyPartners.length > 0 ? (
            <>
              {/* Modern Partners Grid */}
              <ModernPartnersGrid partners={technologyPartners} />

              {/* Partnership Impact Statement */}
              <div className="mt-16 text-center">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
                    <div className="flex items-center justify-center space-x-8 text-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
                        <span className="text-2xl font-bold text-blue-600">
                          {technologyPartners.length}+
                        </span>
                        <span className="text-gray-600 font-medium">
                          Partenaires Académiques
                        </span>
                      </div>
                      <div className="hidden md:block w-px h-8 bg-gray-300"></div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                        <span className="text-2xl font-bold text-green-600">
                          10+
                        </span>
                        <span className="text-gray-600 font-medium">
                          Années d'Excellence
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <p className="text-gray-500">
                Aucun partenaire disponible pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez <span className="text-yellow-400">ISEAV-WALUNGU</span>
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Formez-vous dans un environnement d'excellence académique et contribuez au développement agricole du Sud-Kivu
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/inscription"
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:from-yellow-700 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              S'inscrire Maintenant
            </Link>
            <Link
              href="/contact"
              className="border-2 border-yellow-400 text-yellow-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}