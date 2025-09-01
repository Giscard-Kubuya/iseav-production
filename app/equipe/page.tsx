"use client";

import { useState, useEffect } from "react";
import PageSEO from "@/components/layout/PageSEO";
import { useLeadership } from "@/hooks/useLeadership";

export default function EquipePage() {
  const [isVisible, setIsVisible] = useState(false);
  const { leadership, loading, error } = useLeadership();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading) {
    return (
      <PageSEO
        title="Projet 8e CEPAC Beni | Centre d’Actions Humanitaires et de
            Développement Communautaire"
        description="Projet 8e CEPAC Beni -
            Organisation humanitaire en RDC. Assistance sociale, projets innovants et
            promotion du bien-être des populations."
        keywords="CEPAC, Humanitaire, projet Beni"
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Chargement de l'équipe...</p>
            </div>
          </div>
        </div>
      </PageSEO>
    );
  }

  return (
    <PageSEO
      title="Projet 8e CEPAC Beni | Centre d’Actions Humanitaires et de
          Développement Communautaire"
      description="Projet 8e CEPAC Beni -
          Organisation humanitaire en RDC. Assistance sociale, projets innovants et
          promotion du bien-être des populations."
      keywords="CEPAC, Humanitaire, projet Beni"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Notre <span className="text-green-300">Équipe</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                Une équipe de professionnels expérimentés dévoués à l'excellence
                dans le développement communautaire et au service de nos
                missions
              </p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Notre <span className="text-blue-600">Équipe Dirigeante</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des leaders expérimentés et passionnés, engagés dans
                l'excellence de nos missions et le développement communautaire
              </p>
            </div>

            {error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg mb-4">
                  Erreur lors du chargement de l'équipe
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Réessayer
                </button>
              </div>
            ) : leadership.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg">
                  Notre équipe sera bientôt présentée
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {leadership
                  .filter((member) => member.is_active)
                  .sort(
                    (a, b) => (a.display_order || 0) - (b.display_order || 0)
                  )
                  .map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                    >
                      <div className="relative h-64">
                        {member.image_url ? (
                          <img
                            src={member.image_url}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                            <div className="text-white text-4xl font-bold">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          {member.is_featured && (
                            <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-medium ml-2">
                              ⭐ Vedette
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {member.name}
                        </h3>
                        <p className="text-blue-600 font-semibold mb-3">
                          {member.position}
                        </p>
                        {member.bio && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {member.bio}
                          </p>
                        )}

                        {member.experience_years && (
                          <div className="mb-4">
                            <span className="text-green-600 font-semibold text-sm">
                              {member.experience_years} ans d'expérience
                            </span>
                          </div>
                        )}

                        {member.education && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 mb-2">
                              Formation :
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {member.education}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center space-x-4">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                            >
                              <span className="mr-2">✉️</span>
                              Email
                            </a>
                          )}
                          {member.linkedin_url && (
                            <a
                              href={member.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                            >
                              <span className="mr-2">🔗</span>
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nos <span className="text-green-600">Valeurs d'Équipe</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Les valeurs qui nous unissent et nous guident dans notre mission
                de développement communautaire
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  Collaboration
                </h3>
                <p className="text-gray-600 text-sm">
                  Travail d'équipe et entraide pour l'impact communautaire
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-2">
                  Excellence
                </h3>
                <p className="text-gray-600 text-sm">
                  Recherche constante de la qualité dans nos programmes
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">❤️</span>
                </div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  Engagement
                </h3>
                <p className="text-gray-600 text-sm">
                  Dévouement sincère au service des communautés
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">💡</span>
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600 text-sm">
                  Solutions créatives pour le développement durable
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Rejoignez Notre Mission
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Vous partagez notre passion pour le développement communautaire ?
              Découvrez comment contribuer à nos programmes et rejoindre notre
              équipe d'experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/recrutement"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Opportunités de Carrière
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Nous Contacter
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageSEO>
  );
}
