'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ServicesContent() {
  const [activeService, setActiveService] = useState(null)

  const services = [
    {
      id: 'web-development',
      title: 'Développement Web Professionnel',
      description: 'Sites web modernes, responsives et optimisés pour votre entreprise',
      icon: '🌐',
      features: ['Sites web responsives', 'E-commerce', 'CMS personnalisés', 'Maintenance et support'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'connectivity',
      title: 'Solutions de Connectivité Internet',
      description: 'Connexions internet fiables et rapides pour entreprises et particuliers',
      icon: '📡',
      features: ['Internet haut débit', 'Réseaux d\'entreprise', 'Wi-Fi professionnel', 'Support technique 24/7'],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'mobile-apps',
      title: 'Applications Mobiles Android',
      description: 'Applications mobiles natives performantes pour Android',
      icon: '📱',
      features: ['Apps Android natives', 'Interface utilisateur moderne', 'Intégration API', 'Publication Play Store'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'security',
      title: 'Systèmes de Sécurité',
      description: 'Solutions de surveillance et sécurité pour protéger vos biens',
      icon: '🔒',
      features: ['Caméras de surveillance', 'Systèmes d\'alarme', 'Contrôle d\'accès', 'Monitoring à distance'],
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'it-consulting',
      title: 'Conseil et Support IT',
      description: 'Expertise technique et accompagnement pour vos projets informatiques',
      icon: '💡',
      features: ['Audit informatique', 'Formation utilisateurs', 'Support technique', 'Stratégie IT'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'hosting',
      title: 'Hébergement et Domaines',
      description: 'Services d\'hébergement web sécurisés et fiables',
      icon: '🏗️',
      features: ['Hébergement web', 'Noms de domaine', 'Certificats SSL', 'Sauvegardes automatiques'],
      color: 'from-teal-500 to-teal-600'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/75 to-green-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-blue-300 via-white to-green-300 bg-clip-text text-transparent">
                  Nos Services
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-blue-100 animate-fade-in-up delay-200">
                Solutions IT Complètes pour votre Entreprise
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                De l'hébergement web au développement d'applications, nous offrons une gamme complète de services technologiques pour accompagner votre croissance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Nos Expertises
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions technologiques adaptées à vos besoins, avec l'expertise et la qualité que mérite votre entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-32 bg-gradient-to-r ${service.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    href="/contact"
                    className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 text-center block"
                  >
                    Demander un Devis
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi Choisir <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">INFONET</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre engagement : des solutions de qualité, un service client exceptionnel et une expertise reconnue
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Expertise Locale',
                description: 'Une connaissance approfondie du marché burundais et des besoins locaux',
                icon: '🎯',
                stat: '10+ années'
              },
              {
                title: 'Support 24/7',
                description: 'Une assistance technique disponible à tout moment pour vos urgences',
                icon: '🚀',
                stat: '24h/24 7j/7'
              },
              {
                title: 'Projets Réalisés',
                description: 'Des centaines de projets menés à bien pour nos clients satisfaits',
                icon: '✅',
                stat: '200+ projets'
              },
              {
                title: 'Équipe Qualifiée',
                description: 'Des professionnels certifiés et passionnés par les technologies',
                icon: '👥',
                stat: '15+ experts'
              }
            ].map((advantage, index) => (
              <div
                key={index}
                className="text-center group transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-300 shadow-lg group-hover:shadow-2xl">
                  {advantage.icon}
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {advantage.stat}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à Transformer votre Entreprise ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Obtenir un Devis Gratuit
            </Link>
            <Link
              href="/portfolio"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Voir nos Réalisations
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}