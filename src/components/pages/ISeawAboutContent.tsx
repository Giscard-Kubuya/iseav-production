"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLeadership } from "@/hooks/useLeadership";
import { useCompanyJourney } from "@/hooks/useCompanyJourney";
import { useCompanyValues } from "@/hooks/useCompanyValues";
import { useWebsiteSettings } from "@/hooks/useWebsiteSettings";
import { useWebsiteConfig } from "@/hooks/useWebsiteConfig";
import { useAbout } from "@/hooks/useAbout";
import {
  TeamMemberSkeleton,
  CardSkeleton,
} from "@/components/ui/LoadingSkeleton";

export default function ISeawAboutContent() {
  const [isVisible, setIsVisible] = useState(false);

  // Fetch data from APIs
  const {
    leadership,
    loading: leadershipLoading,
    error: leadershipError,
  } = useLeadership(10);
  const {
    companyJourney,
    loading: journeyLoading,
    error: journeyError,
  } = useCompanyJourney(10);
  const {
    companyValues,
    loading: valuesLoading,
    error: valuesError,
  } = useCompanyValues(10);
  const {
    mission,
    vision,
    loading: settingsLoading,
    error: settingsError,
  } = useWebsiteSettings();
  const { websiteConfig, loading: configLoading } = useWebsiteConfig();
  const { about, loading: aboutLoading, error: aboutError } = useAbout();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white overflow-hidden agricultural-pattern">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {aboutLoading ? (
              <div className="animate-pulse">
                <div className="h-16 bg-white bg-opacity-20 rounded mb-6 mx-auto max-w-2xl"></div>
                <div className="h-8 bg-white bg-opacity-20 rounded mb-4 mx-auto max-w-4xl"></div>
                <div className="h-8 bg-white bg-opacity-20 rounded mx-auto max-w-3xl"></div>
              </div>
            ) : (
              <>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  À Propos de l'
                  <span className="block text-yellow-300">
                    {about?.hero_title || "ISEAV-WALUNGU"}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                  {about?.hero_subtitle ||
                    "Institut Supérieur d'Études Agronomiques et Vétérinaires dédié à l'excellence académique et au développement agricole en République Démocratique du Congo"}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {settingsLoading || configLoading || aboutLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">
                Chargement des informations...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🌾</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Notre Mission
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {websiteConfig?.mission ||
                    websiteConfig?.settings?.mission ||
                    mission ||
                    about?.organization_description ||
                    "Former des professionnels compétents en agronomie et médecine vétérinaire, contribuer au développement agricole durable et améliorer la sécurité alimentaire en République Démocratique du Congo à travers l'enseignement, la recherche et l'innovation adaptés aux défis locaux."}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Notre Vision
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {websiteConfig?.vision ||
                    websiteConfig?.settings?.vision ||
                    vision ||
                    "Devenir une référence en matière d'enseignement supérieur agricole et vétérinaire en Afrique centrale, reconnu pour l'excellence de ses formations, la qualité de ses recherches et son impact sur le développement rural et la transformation agricole de la région."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Programmes <span className="text-blue-600">Accrédités</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Formations autorisées par le Ministère de l'Enseignement Supérieur et Universitaire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First Cycle Programs */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                Premier Cycle (Licence)
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🌾</span>
                  <span>Gestion de l'Environnement et des Ressources Naturelles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">🏭</span>
                  <span>Transformation des Produits Agricoles</span>
                </li>
              </ul>
            </div>

            {/* Second Cycle Programs */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                Deuxième Cycle (Master)
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🌾</span>
                  <span>Agronomie Générale</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">🐄</span>
                  <span>Agrovétérinaire</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">🌲</span>
                  <span>Agroforesterie</span>
                </li>
              </ul>
            </div>

            {/* Research & Innovation */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                Recherche & Innovation
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">🔬</span>
                  <span>Recherche appliquée en agriculture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">💡</span>
                  <span>Innovation technologique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">🤝</span>
                  <span>Partenariats internationaux</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Authority Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Reconnaissance <span className="text-blue-600">Officielle</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre institut est officiellement reconnu par les autorités compétentes
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <span className="text-2xl">📜</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Arrêté Ministériel N° 0041/2021
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  Du 4 février 2021, relatif à la création et à l'organisation de nouveaux programmes d'études à l'Institut Supérieur d'Études Agronomiques et Vétérinaires de Walungu.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    <strong>Ministère :</strong> Enseignement Supérieur et Universitaire
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Province :</strong> Sud-Kivu, République Démocratique du Congo
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Référence :</strong> MINESU/CAB.MIN/TLL/MKP/JMB/2021
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Autorisation pour :</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Programmes du premier cycle</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Programmes du deuxième cycle</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Activités de recherche</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-blue-600">Valeurs</span> Fondamentales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident notre mission éducative et notre engagement envers l'excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuesLoading ? (
              Array.from({ length: 6 }, (_, index) => (
                <CardSkeleton key={index} />
              ))
            ) : companyValues && companyValues.length > 0 ? (
              companyValues.map((value, index) => (
                <div
                  key={value.id}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                    <span className="text-2xl">{value.icon || "⭐"}</span>
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))
            ) : (
              // Default values if API doesn't provide them
              [
                {
                  icon: "🌾",
                  title: "Excellence Académique",
                  description: "Nous nous engageons à offrir une formation de qualité supérieure, basée sur les dernières avancées scientifiques et pédagogiques."
                },
                {
                  icon: "🔬",
                  title: "Innovation",
                  description: "Nous encourageons la recherche appliquée et l'innovation technologique pour répondre aux défis agricoles actuels."
                },
                {
                  icon: "🤝",
                  title: "Collaboration",
                  description: "Nous valorisons les partenariats stratégiques et le travail d'équipe pour maximiser notre impact."
                },
                {
                  icon: "🌍",
                  title: "Développement Durable",
                  description: "Nous promouvons des pratiques agricoles respectueuses de l'environnement et socialement responsables."
                },
                {
                  icon: "🎯",
                  title: "Intégrité",
                  description: "Nous agissons avec transparence, honnêteté et respect dans toutes nos activités institutionnelles."
                },
                {
                  icon: "🏆",
                  title: "Impact Local",
                  description: "Nous nous concentrons sur les besoins spécifiques de notre région pour créer un impact positif durable."
                }
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                    <span className="text-2xl">{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      {leadership && leadership.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Notre <span className="text-blue-600">Direction</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Une équipe de leaders expérimentés guidant notre institution vers l'excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {leadershipLoading
                ? Array.from({ length: 3 }, (_, index) => (
                    <TeamMemberSkeleton key={index} />
                  ))
                : leadership.slice(0, 6).map((leader) => (
                    <div key={leader.id} className="text-center">
                      <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full shadow-lg">
                        {leader.image_url ? (
                          <img
                            src={leader.image_url}
                            alt={leader.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                            <span className="text-4xl text-gray-400">👤</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-blue-800 mb-2">
                        {leader.name}
                      </h3>
                      <p className="text-green-600 font-semibold mb-3">
                        {leader.position}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {leader.bio}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez <span className="text-yellow-300">ISEAV-WALUNGU</span>
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Découvrez nos programmes d'études et commencez votre parcours vers l'excellence en agriculture et médecine vétérinaire
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/inscription"
              className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:from-yellow-700 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Candidater Maintenant
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
    </div>
  );
}