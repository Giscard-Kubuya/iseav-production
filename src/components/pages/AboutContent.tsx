'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLeadership } from '@/hooks/useLeadership'
import { useCompanyJourney } from '@/hooks/useCompanyJourney'
import { useCompanyValues } from '@/hooks/useCompanyValues'
import { useWebsiteSettings } from '@/hooks/useWebsiteSettings'

export default function AboutContent() {
  const [isVisible, setIsVisible] = useState(false)
  
  // Fetch data from APIs
  const { leadership, loading: leadershipLoading, error: leadershipError } = useLeadership(10)
  const { companyJourney, loading: journeyLoading, error: journeyError } = useCompanyJourney(10)
  const { companyValues, loading: valuesLoading, error: valuesError } = useCompanyValues(10)
  const { mission, vision, loading: settingsLoading, error: settingsError } = useWebsiteSettings()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Mock leadership data removed - now using API

  // Mock data removed - now using API


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              À Propos d'
              <span className="block text-green-300">INFONET</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Depuis 2010, nous sommes le partenaire technologique de confiance des entreprises burundaises et régionales
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {settingsLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Chargement des informations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {mission || 'Accompagner la transformation digitale des entreprises burundaises en proposant des solutions technologiques innovantes, fiables et adaptées aux besoins locaux. Nous nous engageons à faire du Burundi un hub technologique régional.'}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {vision || 'Être la référence en matière de solutions IT en Afrique de l\'Est, reconnue pour notre expertise technique, notre innovation constante et notre impact positif sur le développement économique et social de la région.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ces valeurs guident nos actions et définissent notre culture d'entreprise
            </p>
          </div>
          {valuesLoading ? (
            <div className="text-center">
              <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Chargement des valeurs...</p>
            </div>
          ) : companyValues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyValues
                .filter(value => value.is_active)
                .sort((a, b) => a.display_order - b.display_order)
                .map((value) => (
                  <div key={value.id} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${value.color || 'from-blue-500 to-cyan-500'} rounded-full flex items-center justify-center text-2xl`}>
                      {value.icon || '🎯'}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Aucune valeur disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Équipe Dirigeante</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe expérimentée et passionnée qui guide INFONET vers l'excellence
            </p>
          </div>
          {leadershipLoading ? (
            <div className="text-center">
              <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Chargement de l'équipe dirigeante...</p>
            </div>
          ) : leadership.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {leadership
                .filter(leader => leader.is_active)
                .sort((a, b) => a.display_order - b.display_order)
                .map((leader) => (
                  <div key={leader.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    <div className="p-8">
                      <div className="flex items-start space-x-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100">
                          {leader.image_url ? (
                            <img 
                              src={leader.image_url} 
                              alt={leader.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                              {leader.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                          <p className="font-semibold mb-2 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                            {leader.position}
                          </p>
                          {leader.education && (
                            <p className="text-gray-600 text-sm mb-3">{leader.education}</p>
                          )}
                          {leader.experience && (
                            <p className="text-gray-500 text-sm">{leader.experience}</p>
                          )}
                        </div>
                      </div>
                      
                      {leader.bio && (
                        <div className="mt-6">
                          <p className="text-gray-600">{leader.bio}</p>
                        </div>
                      )}

                      {leader.expertise && leader.expertise.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-gray-900 mb-2">Domaines d'expertise:</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {leader.expertise.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {leader.achievements && leader.achievements.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Réalisations principales:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {leader.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Aucun dirigeant disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Parcours</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              13 années d'innovation, de croissance et d'impact dans l'écosystème IT burundais
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>
            
            {journeyLoading ? (
              <div className="text-center">
                <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Chargement du parcours de l'entreprise...</p>
              </div>
            ) : companyJourney.length > 0 ? (
              <div className="space-y-12">
                {companyJourney
                  .filter(milestone => milestone.is_active)
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((milestone, index) => (
                    <div key={milestone.id} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Timeline dot */}
                      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center text-sm font-bold z-10">
                        {milestone.icon || '📅'}
                      </div>
                      
                      {/* Content */}
                      <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center mb-3">
                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                              {milestone.year}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-4">{milestone.description}</p>
                          {milestone.details && milestone.details.length > 0 && (
                            <ul className="space-y-2">
                              {milestone.details.map((detail, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-500">
                                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                <p>Aucune étape du parcours disponible pour le moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Rejoignez plus de 150 entreprises qui nous font confiance pour leur transformation digitale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 hover:scale-105 transform">
              Discutons de votre projet
            </Link>
            <Link href="/services" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 hover:scale-105 transform">
              Découvrir nos services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}