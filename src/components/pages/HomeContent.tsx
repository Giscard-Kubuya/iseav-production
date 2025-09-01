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
import { useTestimonialsFront } from "@/hooks/useTestimonialsFront";
import { useTechnologyPartners } from "@/hooks/useTechnologyPartners";
import {
  HeroSkeleton,
  ServiceSkeleton,
  NewsSkeleton,
  TeamMemberSkeleton,
  StatsSkeleton,
  CardSkeleton,
} from "@/components/ui/LoadingSkeleton";

export default function HomeContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // API hooks for dynamic content
  const { heroSlides, loading: slidesLoading } = useHeroSlides();
  const { services, loading: servicesLoading } = useServicesFront(6);
  const { news, loading: newsLoading } = useLatestNews(3);
  const { teamExperts, loading: teamLoading } = useTeamExperts();
  const { companyValues, loading: valuesLoading } = useCompanyValuesFront();
  const { companyStats, loading: statsLoading } = useCompanyStatsFront();
  const { testimonials, loading: testimonialsLoading } = useTestimonialsFront({ limit: 3 });
  const { technologyPartners, loading: partnersLoading } = useTechnologyPartners();

  // Auto-play for hero slides
  useEffect(() => {
    if (!isAutoPlaying || heroSlides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Loading state for initial page load
  if (slidesLoading) {
    return <HeroSkeleton />;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {heroSlides.length > 0 && (
          <div className="absolute inset-0">
            <Image
              src={heroSlides[currentSlide]?.image_url || "/images/hero-default.jpg"}
              alt={heroSlides[currentSlide]?.title || "CEPAC Projet-Beni"}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent"></div>
        
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="max-w-4xl">
              {heroSlides[currentSlide] ? (
                <>
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl text-amber-300 font-semibold mb-8">
                    {heroSlides[currentSlide].subtitle}
                  </h2>
                  <p className="text-xl text-gray-100 mb-12 max-w-3xl leading-relaxed">
                    {heroSlides[currentSlide].description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Link
                      href={heroSlides[currentSlide].primary_action_url || "/services"}
                      className="bg-gradient-to-r from-amber-600 to-amber-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                    >
                      {heroSlides[currentSlide].primary_action_text || "Découvrir nos programmes"}
                    </Link>
                    <Link
                      href={heroSlides[currentSlide].secondary_action_url || "/contact"}
                      className="border-2 border-amber-400 text-amber-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                    >
                      {heroSlides[currentSlide].secondary_action_text || "Nous contacter"}
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-white text-center">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    8e CEPAC Projet-Beni
                  </h1>
                  <h2 className="text-2xl md:text-3xl text-amber-300 font-semibold mb-8">
                    Développement Communautaire et Social
                  </h2>
                  <p className="text-xl mb-12 max-w-3xl mx-auto">
                    Organisation Non Gouvernementale dédiée au développement durable des communautés en République Démocratique du Congo
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                      href="/services"
                      className="bg-gradient-to-r from-amber-600 to-amber-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Nos Programmes
                    </Link>
                    <Link
                      href="/contact"
                      className="border-2 border-amber-400 text-amber-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Nous Contacter
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Navigation */}
        {heroSlides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all duration-300"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Notre <span className="text-amber-600">Impact</span> en Chiffres
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des résultats concrets qui témoignent de notre engagement pour le développement communautaire
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsLoading ? (
              Array.from({ length: 4 }, (_, index) => (
                <StatsSkeleton key={index} />
              ))
            ) : companyStats.length > 0 ? (
              companyStats.map((stat) => (
                <div key={stat.id} className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))
            ) : (
              // Default stats if no API data
              <>
                <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">2500+</div>
                  <div className="text-gray-600 font-medium">Bénéficiaires Directs</div>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-amber-600 mb-2">12</div>
                  <div className="text-gray-600 font-medium">Projets Actifs</div>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">25</div>
                  <div className="text-gray-600 font-medium">Communautés Servies</div>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-amber-600 mb-2">7</div>
                  <div className="text-gray-600 font-medium">Années d'Expérience</div>
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
              Nos <span className="text-blue-600">Programmes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des interventions ciblées pour le développement durable des communautés locales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesLoading ? (
              Array.from({ length: 6 }, (_, index) => (
                <ServiceSkeleton key={index} />
              ))
            ) : (
              services.map((service) => (
                <div key={service.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <span className="text-2xl">{service.icon || "🤝"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{service.description}</p>
                  <div className="mt-6 text-center">
                    <Link
                      href={`/services/${service.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      En savoir plus →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Values Section */}
      {companyValues.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Nos <span className="text-blue-600">Valeurs</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Les principes qui guident notre action communautaire
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valuesLoading ? (
                Array.from({ length: 3 }, (_, index) => (
                  <CardSkeleton key={index} />
                ))
              ) : (
                companyValues.map((value) => (
                  <div key={value.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                      <span className="text-2xl">{value.icon || "⭐"}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Latest News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Dernières <span className="text-blue-600">Actualités</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Suivez nos dernières activités et réalisations sur le terrain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsLoading ? (
              Array.from({ length: 3 }, (_, index) => (
                <NewsSkeleton key={index} />
              ))
            ) : (
              news.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                      {new Date(article.created_at).toLocaleDateString("fr-FR")}
                    </div>
                    <h3 className="text-xl font-bold text-blue-800 mb-3">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt || article.content?.substring(0, 150) + "..."}
                    </p>
                    <Link
                      href={`/actualites/${article.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                    >
                      Lire la suite →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {news.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/actualites"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Voir toutes les actualités
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Témoignages de nos <span className="text-blue-600">Bénéficiaires</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                L'impact de nos programmes raconté par ceux qui les vivent
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonialsLoading ? (
                Array.from({ length: 3 }, (_, index) => (
                  <CardSkeleton key={index} />
                ))
              ) : (
                testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900">{testimonial.client_name}</h4>
                      {testimonial.client_position && (
                        <p className="text-gray-500 text-sm">{testimonial.client_position}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre <span className="text-blue-600">Équipe</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels expérimentés dédiés au développement communautaire
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamLoading ? (
              Array.from({ length: 3 }, (_, index) => (
                <TeamMemberSkeleton key={index} />
              ))
            ) : (
              teamExperts.slice(0, 3).map((member) => (
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
                  <h3 className="text-xl font-bold text-blue-800 mb-2">{member.name}</h3>
                  <p className="text-amber-600 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </div>
              ))
            )}
          </div>

          {teamExperts.length > 3 && (
            <div className="text-center mt-12">
              <Link
                href="/equipe"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Voir toute l'équipe
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez notre <span className="text-amber-400">Mission</span>
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Ensemble, construisons un avenir meilleur pour les communautés de la République Démocratique du Congo
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-amber-600 to-amber-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Nous Soutenir
            </Link>
            <Link
              href="/services"
              className="border-2 border-amber-400 text-amber-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-400 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Découvrir nos Programmes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}