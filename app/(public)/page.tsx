'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 py-32">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-blue-900 mb-6 animate-fade-in">
              Bienvenue à ISEAV-ARU
            </h1>
            <p className="text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Institut Supérieur d'Enseignement Appliqué et de Valorisation d'Ariana - 
              Formant les leaders de demain dans l'agriculture et les sciences appliquées
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Link 
                href="/admissions"
                className="bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Candidater maintenant
              </Link>
              <Link 
                href="/visit"
                className="border-2 border-yellow-600 text-yellow-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Découvrir nos formations
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      {/* Our Teachers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Notre Équipe Pédagogique
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe d'experts passionnés et dévoués à l'excellence dans l'enseignement 
              agricole et les sciences appliquées
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Teacher 1 */}
            <div className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="/images/teachers/prof-1.jpg" 
                    alt="Professeur"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Dr. Ahmed Mansouri</h3>
                  <p className="text-yellow-600 font-semibold mb-3">Spécialiste Agriculture Durable</p>
                  <p className="text-gray-600 text-sm">
                    Expert en agriculture biologique et développement rural durable
                  </p>
                </div>
              </div>
            </div>

            {/* Teacher 2 */}
            <div className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="/images/teachers/t-2.jpg" 
                    alt="Professeur"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Dr. Salma Ben Ali</h3>
                  <p className="text-yellow-600 font-semibold mb-3">Sciences Alimentaires</p>
                  <p className="text-gray-600 text-sm">
                    Spécialiste en technologie alimentaire et sécurité nutritionnelle
                  </p>
                </div>
              </div>
            </div>

            {/* Teacher 3 */}
            <div className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="/images/teachers/t-5.jpg" 
                    alt="Professeur"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Prof. Mohamed Triki</h3>
                  <p className="text-yellow-600 font-semibold mb-3">Biotechnologies</p>
                  <p className="text-gray-600 text-sm">
                    Recherche en biotechnologies agricoles et génie génétique
                  </p>
                </div>
              </div>
            </div>

            {/* Teacher 4 */}
            <div className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="/images/teachers/t-7.jpg" 
                    alt="Professeur"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Dr. Karim Gharbi</h3>
                  <p className="text-yellow-600 font-semibold mb-3">Économie Agricole</p>
                  <p className="text-gray-600 text-sm">
                    Expert en économie rurale et développement agricole
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/about/faculty"
              className="inline-flex items-center bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Découvrir toute l'équipe
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Nos Partenaires */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Nos Partenaires Stratégiques
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des collaborations privilégiées avec des organisations de référence 
              pour enrichir la formation et favoriser l'insertion professionnelle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* ACAV */}
            <div className="group text-center">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="h-20 flex items-center justify-center mb-6">
                  <img 
                    src="/images/partners/acav_logo-.png" 
                    alt="ACAV - Association Centre Anti Volontaire"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-3">ACAV</h3>
                <p className="text-gray-600 text-sm">
                  Association Centre Anti Volontaire - Partenaire en développement rural et formation agricole
                </p>
              </div>
            </div>

            {/* IRERA */}
            <div className="group text-center">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="h-20 flex items-center justify-center mb-6">
                  <img 
                    src="/images/partners/irera_logo.png" 
                    alt="IRERA - Institut de Recherche et d'Enseignement en Agriculture"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-3">IRERA</h3>
                <p className="text-gray-600 text-sm">
                  Institut de Recherche et d'Enseignement - Collaboration en recherche appliquée et innovation
                </p>
              </div>
            </div>

            {/* Malteser */}
            <div className="group text-center">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="h-20 flex items-center justify-center mb-6">
                  <img 
                    src="/images/partners/malteser_logo-.svg" 
                    alt="Malteser International"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-3">Malteser International</h3>
                <p className="text-gray-600 text-sm">
                  Partenaire international en développement durable et coopération humanitaire
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Devenez Notre Partenaire
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Rejoignez notre réseau de partenaires stratégiques et contribuez à la formation 
                des futurs professionnels de l'agriculture et des sciences appliquées.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/partnerships"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                  Partenariat Académique
                </Link>
                <Link 
                  href="/contact"
                  className="border-2 border-yellow-600 text-yellow-700 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-50 hover:text-yellow-900 transition-colors duration-300"
                >
                  Nous Contacter
                </Link>
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

    </div>
  )
}