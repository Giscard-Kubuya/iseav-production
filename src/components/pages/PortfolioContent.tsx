"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortfolioProjectsFront } from "@/hooks/usePortfolioProjectsFront";
import { useCompanyStatsFront } from "@/hooks/useCompanyStatsFront";
import { useTestimonialsFront } from "@/hooks/useTestimonialsFront";

export default function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch projects, company stats, and testimonials from API
  const { portfolioProjects, loading, error } = usePortfolioProjectsFront();
  const { companyStats, loading: statsLoading, error: statsError } = useCompanyStatsFront();
  const { testimonials, loading: testimonialsLoading, error: testimonialsError } = useTestimonialsFront({ limit: 3 });

  const categories = [
    { id: "all", name: "Tous les Projets" },
    { id: "web", name: "Développement Web" },
    { id: "mobile", name: "Applications Mobiles" },
    { id: "network", name: "Infrastructure Réseau" },
    { id: "security", name: "Sécurité IT" },
  ];

  // Mock projects removed - now using API

  const filteredProjects =
    activeCategory === "all"
      ? portfolioProjects
      : portfolioProjects.filter(
          (project) => project.category === activeCategory
        );

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/75 to-green-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-blue-300 via-white to-green-300 bg-clip-text text-transparent">
                  Notre Portfolio
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-blue-100 animate-fade-in-up delay-200">
                Découvrez nos Réalisations Technologiques
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Plus de 200 projets réalisés avec succès pour nos clients au
                Burundi et en Afrique de l'Est
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="text-center">
              <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-xl text-gray-600">
                Chargement des projets...
              </p>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">
              <p className="text-xl">Erreur lors du chargement des projets</p>
              <p className="mt-2">{error}</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Link key={project.id} href={`/portfolio/${project.id}`}>
                  <div
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          project.featured_image ||
                          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        }
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white">
                          <p className="text-sm font-semibold">
                            {project.client}
                          </p>
                          <p className="text-xs">
                            {new Date(project.start_date).getFullYear()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                      <span className="inline-flex items-center text-blue-600 font-semibold hover:text-green-600 transition-colors duration-300">
                        Voir le Projet
                        <svg
                          className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
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
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p className="text-xl">
                Aucun projet disponible dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Nos Réussites en Chiffres
              </span>
            </h2>
          </div>

          {statsLoading ? (
            <div className="text-center">
              <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-xl text-gray-600">Chargement des statistiques...</p>
            </div>
          ) : statsError ? (
            <div className="text-center text-red-600">
              <p className="text-xl">Erreur lors du chargement des statistiques</p>
            </div>
          ) : companyStats.length > 0 ? (
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {companyStats.map((stat, index) => (
                <div key={stat.id} className="transform hover:scale-105 transition-transform duration-300">
                  <div className={`text-5xl font-bold mb-2 ${index % 2 === 0 ? 'text-blue-600' : 'text-green-600'}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          ) : (
            // Fallback to static data if no dynamic stats available
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-gray-600 font-medium">Projets Réalisés</div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-green-600 mb-2">150+</div>
                <div className="text-gray-600 font-medium">
                  Clients Satisfaits
                </div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600 font-medium">
                  Taux de Satisfaction
                </div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">Support Client</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ce que Disent nos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Clients
              </span>
            </h2>
          </div>

          {testimonialsLoading ? (
            <div className="text-center">
              <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-xl text-gray-600">Chargement des témoignages...</p>
            </div>
          ) : testimonialsError ? (
            <div className="text-center text-red-600">
              <p className="text-xl">Erreur lors du chargement des témoignages</p>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.client_photo_url || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80`}
                      alt={testimonial.client_name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.client_name}
                      </h4>
                      <p className="text-sm text-blue-600">
                        {testimonial.client_position}, {testimonial.client_company}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 fill-current ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Fallback to static testimonials if no dynamic data available
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "INFONET a transformé notre infrastructure IT. Leur expertise et professionnalisme sont remarquables.",
                  author: "Jean Ndayisenga",
                  position: "Directeur IT, BDI Commerce",
                  avatar:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
                },
                {
                  quote:
                    "L'application mobile qu'ils ont développée a révolutionné notre service client. Excellent travail !",
                  author: "Marie Uwimana",
                  position: "Chef Marketing, TransBurundi",
                  avatar:
                    "https://images.unsplash.com/photo-1494790108755-2616c63bff07?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
                },
                {
                  quote:
                    "Support technique exceptionnel et solutions innovantes. INFONET dépasse toujours nos attentes.",
                  author: "Paul Nkurunziza",
                  position: "Responsable Sécurité, Université du Burundi",
                  avatar:
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.author}
                      </h4>
                      <p className="text-sm text-blue-600">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à Démarrer votre Projet ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Rejoignez plus de 150 entreprises qui nous font confiance pour leurs
            solutions IT
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Demander un Devis
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Voir nos Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
