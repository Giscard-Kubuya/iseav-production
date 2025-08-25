"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useHeroSlides } from "@/hooks/useHeroSlides";
import { useCompanyStats } from "@/hooks/useCompanyStats";
import { useLatestNews } from "@/hooks/useLatestNews";
import { useTeamExperts } from "@/hooks/useTeamExperts";
import { useTechnologyPartners } from "@/hooks/useTechnologyPartners";

export default function HomeContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [professorsOffset, setProfessorsOffset] = useState(0);
  const [partnersOffset, setPartnersOffset] = useState(0);
  const [isProfessorsManualControl, setIsProfessorsManualControl] =
    useState(false);
  const [isPartnersManualControl, setIsPartnersManualControl] = useState(false);

  // Fetch data from API
  const {
    heroSlides,
    loading: heroLoading,
    error: heroError,
  } = useHeroSlides();
  const {
    companyStats,
    loading: statsLoading,
    error: statsError,
  } = useCompanyStats();
  const { news, loading: newsLoading, error: newsError } = useLatestNews(3);
  const {
    teamExperts,
    loading: teamLoading,
    error: teamError,
  } = useTeamExperts(6);
  const {
    technologyPartners,
    loading: partnersLoading,
    error: partnersError,
  } = useTechnologyPartners(10);

  // Transform API data to match component structure
  const slides = (heroSlides || [])
    .filter((slide) => slide.is_active)
    .sort((a, b) => a.display_order - b.display_order)
    .map((slide) => ({
      id: slide.id,
      image: slide.image_url,
      title: slide.title,
      subtitle: slide.subtitle || "",
      description: slide.description,
      primaryAction: {
        text: slide.primary_action_text || "En savoir plus",
        href: slide.primary_action_url || "/services",
      },
      secondaryAction: {
        text: slide.secondary_action_text || "Contact",
        href: slide.secondary_action_url || "/contact",
      },
    }));

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Arrow control handlers for professors section
  const professorsPrevious = () => {
    setIsProfessorsManualControl(true);
    setProfessorsOffset((prev) => {
      const newOffset = Math.min(prev + 320, 500);
      console.log(
        "Previous clicked, current offset:",
        prev,
        "new offset:",
        newOffset
      );
      return newOffset;
    });
    // Reset manual control after animation
    setTimeout(() => setIsProfessorsManualControl(false), 5000);
  };

  const professorsNext = () => {
    setIsProfessorsManualControl(true);
    setProfessorsOffset((prev) => {
      const newOffset = Math.max(prev - 320, -2000);
      console.log(
        "Next clicked, current offset:",
        prev,
        "new offset:",
        newOffset
      );
      return newOffset;
    });
    // Reset manual control after animation
    setTimeout(() => setIsProfessorsManualControl(false), 5000);
  };

  // Arrow control handlers for partners section
  const partnersPrevious = () => {
    setIsPartnersManualControl(true);
    setPartnersOffset((prev) => {
      const newOffset = Math.min(prev + 280, 500);
      console.log(
        "Partners Previous clicked, current offset:",
        prev,
        "new offset:",
        newOffset
      );
      return newOffset;
    });
    // Reset manual control after animation
    setTimeout(() => setIsPartnersManualControl(false), 5000);
  };

  const partnersNext = () => {
    setIsPartnersManualControl(true);
    setPartnersOffset((prev) => {
      const newOffset = Math.max(prev - 280, -2000);
      console.log(
        "Partners Next clicked, current offset:",
        prev,
        "new offset:",
        newOffset
      );
      return newOffset;
    });
    // Reset manual control after animation
    setTimeout(() => setIsPartnersManualControl(false), 5000);
  };

  // Show loading state or fallback
  if (heroLoading) {
    return (
      <section className="relative h-screen overflow-hidden bg-gradient-to-r from-blue-900 to-green-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl">Chargement...</p>
          </div>
        </div>
      </section>
    );
  }

  if (heroError || slides.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden bg-gradient-to-r from-blue-900 to-green-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Bienvenue chez INFONET
            </h1>
            <p className="text-xl mb-8">
              Votre partenaire technologique de confiance
            </p>
            <Link
              href="/services"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100"
            >
              Découvrir nos services
            </Link>
          </div>
        </div>
      </section>
    );
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
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
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
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ display: index === currentSlide ? "block" : "none" }}
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
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
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
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 group"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-1000 ease-linear"
            style={{
              width: isAutoPlaying ? "100%" : "0%",
              animation: isAutoPlaying ? "progress 5s linear infinite" : "none",
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
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
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
          {statsLoading ? (
            <div className="text-center">
              <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div
              className={`grid gap-8 text-center ${
                (companyStats || []).length <= 2
                  ? "md:grid-cols-2"
                  : (companyStats || []).length === 3
                  ? "md:grid-cols-3"
                  : "md:grid-cols-4"
              }`}
            >
              {(companyStats || [])
                .filter((stat) => stat.is_active)
                .sort((a, b) => a.display_order - b.display_order)
                .map((stat) => (
                  <div
                    key={stat.id}
                    className={`transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-${stat.color_from.replace(
                      "-",
                      "-50"
                    )} to-${stat.color_to.replace("-", "-100")} p-6 rounded-lg`}
                  >
                    <div
                      className={`text-4xl font-bold text-${
                        stat.color_from
                      } mb-2 ${stat.show_animation ? "animate-bounce" : ""}`}
                      style={{ animationDelay: `${stat.animation_delay}ms` }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
            </div>
          )}
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

          {newsLoading ? (
            <div className="text-center">
              <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Chargement des actualités...</p>
            </div>
          ) : (news || []).length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {(news || []).slice(0, 3).map((article) => {
                const categoryColors = {
                  company: "from-blue-500 to-blue-600",
                  projects: "from-green-500 to-green-600",
                  partnerships: "from-purple-500 to-purple-600",
                  events: "from-orange-500 to-orange-600",
                  awards: "from-yellow-500 to-yellow-600",
                };

                const categoryEmojis = {
                  company: "🏢",
                  projects: "🚀",
                  partnerships: "🤝",
                  events: "📅",
                  awards: "🏆",
                };

                return (
                  <article
                    key={article.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div
                      className={`h-48 bg-gradient-to-br ${
                        categoryColors[article.category] ||
                        "from-blue-500 to-blue-600"
                      } flex items-center justify-center relative`}
                    >
                      {article.featured_image ? (
                        <img
                          src={article.featured_image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-6xl">
                          {categoryEmojis[article.category] || "📰"}
                        </span>
                      )}
                      {article.urgent && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          URGENT
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-green-600 mb-2 font-semibold">
                        {new Date(article.publish_date).toLocaleDateString(
                          "fr-FR"
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt ||
                          (article.content || "").substring(0, 120) + "..."}
                      </p>
                      <Link
                        href={`/actualites/${article.id}`}
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
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Aucune actualité disponible pour le moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/actualites"
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
                INFONET se distingue par son approche innovante des solutions IT
                et technologies numériques. Nos services sont conçus pour
                répondre aux défis contemporains de la transformation digitale
                des entreprises au Burundi.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-xl">💻</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      Solutions Sur Mesure
                    </h3>
                    <p className="text-gray-600">
                      Développement personnalisé adapté aux besoins spécifiques
                      de votre entreprise
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white text-xl">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      Technologies Modernes
                    </h3>
                    <p className="text-gray-600">
                      Utilisation des dernières technologies et standards
                      internationaux
                    </p>
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
                    <h3 className="text-2xl font-bold">
                      Innovation & Technologie
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
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Notre Équipe d'Experts IT
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe de professionnels qualifiés dédiés à l'excellence
              technologique et à l'innovation
            </p>
          </div>

          {teamLoading ? (
            <div className="text-center">
              <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Chargement de l'équipe...</p>
            </div>
          ) : (teamExperts || []).length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {(teamExperts || [])
                .filter((expert) => expert.is_active)
                .sort((a, b) => a.display_order - b.display_order)
                .map((expert) => (
                  <div
                    key={expert.id}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="p-6 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                        {expert.image_url ? (
                          <img
                            src={expert.image_url}
                            alt={expert.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold">
                            {expert.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">
                        {expert.name}
                      </h3>
                      <p
                        className={`${
                          expert.is_featured
                            ? "text-green-600"
                            : "text-blue-600"
                        } font-semibold mb-3`}
                      >
                        {expert.position}
                      </p>
                      {expert.bio && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {expert.bio}
                        </p>
                      )}
                      {(expert.specializations || []).length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {(expert.specializations || [])
                            .slice(0, 3)
                            .map((spec, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                              >
                                {spec}
                              </span>
                            ))}
                        </div>
                      )}
                      {expert.experience_years && (
                        <p className="text-xs text-gray-500">
                          {expert.experience_years} années d'expérience
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Aucun expert disponible pour le moment.</p>
            </div>
          )}
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
              Collaborations d'excellence avec les leaders mondiaux de la
              technologie
            </p>
          </div>

          {partnersLoading ? (
            <div className="text-center">
              <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">
                Chargement des partenaires...
              </p>
            </div>
          ) : (technologyPartners || []).length > 0 ? (
            <div className="relative overflow-hidden group">
              {/* Navigation Arrows for Partners */}
              {(technologyPartners || []).length > 3 && (
                <>
                  <button
                    onClick={partnersPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg group/btn"
                  >
                    <svg
                      className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300"
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
                    onClick={partnersNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg group/btn"
                  >
                    <svg
                      className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300"
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
                </>
              )}

              <div
                className={`flex space-x-8 items-center transition-transform duration-500 ${
                  !isPartnersManualControl &&
                  (technologyPartners || []).length > 3
                    ? "animate-slide-right group-hover:pause"
                    : ""
                } ${
                  (technologyPartners || []).length <= 3 ? "justify-center" : ""
                }`}
                style={{
                  transform:
                    (technologyPartners || []).length > 3
                      ? `translateX(${partnersOffset}px)`
                      : "none",
                }}
              >
                {(technologyPartners || [])
                  .filter((partner) => partner.is_active)
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((partner) => (
                    <div
                      key={partner.id}
                      className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                      onMouseEnter={(e) =>
                        e.currentTarget
                          .closest(".group")
                          ?.classList.add("paused")
                      }
                      onMouseLeave={(e) =>
                        e.currentTarget
                          .closest(".group")
                          ?.classList.remove("paused")
                      }
                    >
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        {partner.logo_url ? (
                          <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                            {partner.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 text-center">
                        {partner.name}
                      </h3>
                      {partner.partnership_type && (
                        <p className="text-xs text-gray-600 text-center mt-1">
                          {partner.partnership_type}
                        </p>
                      )}
                    </div>
                  ))}

                {/* Add duplicate partners for seamless loop if more than 3 */}
                {(technologyPartners || []).length > 3 &&
                  (technologyPartners || [])
                    .filter((partner) => partner.is_active)
                    .sort((a, b) => a.display_order - b.display_order)
                    .slice(0, 3)
                    .map((partner) => (
                      <div
                        key={`duplicate-${partner.id}`}
                        className="flex-shrink-0 w-64 h-40 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center p-6 cursor-pointer border border-gray-200"
                        onMouseEnter={(e) =>
                          e.currentTarget
                            .closest(".group")
                            ?.classList.add("paused")
                        }
                        onMouseLeave={(e) =>
                          e.currentTarget
                            .closest(".group")
                            ?.classList.remove("paused")
                        }
                      >
                        <div className="w-16 h-16 mb-3 flex items-center justify-center">
                          {partner.logo_url ? (
                            <img
                              src={partner.logo_url}
                              alt={partner.name}
                              className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                              {partner.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 text-center">
                          {partner.name}
                        </h3>
                        {partner.partnership_type && (
                          <p className="text-xs text-gray-600 text-center mt-1">
                            {partner.partnership_type}
                          </p>
                        )}
                      </div>
                    ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Aucun partenaire disponible pour le moment.</p>
            </div>
          )}

          {/* Dynamic Partnership Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {(technologyPartners || []).filter((p) => p.is_active).length}+
              </div>
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
          <h2 className="text-4xl font-bold mb-6">
            Transformez Votre Entreprise Aujourd'hui
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Découvrez comment INFONET peut révolutionner votre infrastructure IT
            et accélérer votre transformation digitale au Burundi
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
  );
}
