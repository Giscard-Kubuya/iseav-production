"use client";

import { useState, useEffect } from "react";
import PageSEO from "@/components/layout/PageSEO";
import { useAbout } from "@/hooks/useAbout";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const { about, loading, error } = useAbout();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (loading) {
    return (
      <PageSEO
        title="À Propos - Projet 8e CEPAC Beni"
        description="Découvrez l'histoire, la mission et les valeurs du Projet 8e CEPAC Beni, organisation dédiée au développement communautaire en République Démocratique du Congo."
        keywords="Projet CEPAC, à propos, histoire, mission, valeurs, développement communautaire, RDC, République Démocratique du Congo"
      >
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">
                Chargement des informations...
              </p>
            </div>
          </div>
        </div>
      </PageSEO>
    );
  }

  return (
    <PageSEO
      title={`À Propos - ${about?.hero_title || "Projet 8e CEPAC Beni"}`}
      description={
        about?.hero_subtitle ||
        "Découvrez l'histoire, la mission et les valeurs du Projet 8e CEPAC Beni, organisation dédiée au développement communautaire en République Démocratique du Congo."
      }
      keywords="CEPAC, à propos, histoire, mission, valeurs, développement communautaire, RDC, République Démocratique du Congo"
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
                À Propos du
                <span className="block text-green-300">
                  {about?.hero_title || "Projet 8e CEPAC Beni"}
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                {about?.hero_subtitle ||
                  "Organisation Non Gouvernementale dédiée au développement communautaire en République Démocratique du Congo"}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Notre Mission
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {about?.organization_description ||
                    "Contribuer au développement communautaire, promouvoir le bien-être social et améliorer les conditions de vie des populations en République Démocratique du Congo à travers des programmes innovants et adaptés aux besoins locaux."}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Notre Vision
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {about?.future_goals ||
                    "D'ici 2030, nous aspirons à étendre nos programmes à 10 nouvelles régions et toucher 2000 familles supplémentaires."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        {about?.why_choose_us && about.why_choose_us.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Pourquoi Nous Choisir
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Ces atouts définissent notre approche unique du développement
                  communautaire
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {about.why_choose_us.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Achievements Section */}
        {about?.achievements && about.achievements.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Nos Réalisations
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {about?.impact_statement ||
                    "Des résultats concrets qui témoignent de notre engagement"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {about.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {achievement.count}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Our Story Section */}
        {about?.our_story && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Notre Histoire
                </h2>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {about.our_story}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {about?.certifications && about.certifications.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Nos Certifications
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Reconnaissance officielle et agréments qui confirment notre
                  légitimité
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {about.certifications.map((certification, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                        🏅
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {certification.name}
                      </h3>
                      <div className="text-blue-600 font-semibold mb-3">
                        {certification.year}
                      </div>
                    </div>
                    <p className="text-gray-600 text-center">
                      {certification.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {about?.call_to_action_title || "Rejoignez Notre Mission"}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {about?.call_to_action_description ||
                "Rejoignez les communautés qui nous font confiance pour leur développement"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 hover:scale-105 transform inline-block"
              >
                Nous contacter
              </a>
              <a
                href="/recrutement"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform inline-block"
              >
                Rejoindre notre équipe
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageSEO>
  );
}
