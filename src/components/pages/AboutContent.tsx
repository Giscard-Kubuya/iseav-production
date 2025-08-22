'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AboutContent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const leadership = [
    {
      name: 'Jean-Claude Ndayisenga',
      position: 'CEO & Fondateur',
      education: 'Master en Informatique, Université du Burundi',
      experience: '15 ans dans les technologies de l\'information',
      expertise: ['Direction Générale', 'Stratégie IT', 'Innovation Technologique'],
      achievements: [
        'Fondation INFONET en 2010',
        'Leader IT Burundi 2023',
        'Plus de 200 projets réalisés',
        'Partenaire Microsoft & Google'
      ],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Marie-Claire Nzeyimana',
      position: 'Directrice Technique',
      education: 'Ingénieur Système & Réseaux, ISTEEBU',
      experience: '12 ans en infrastructure IT',
      expertise: ['Architecture Système', 'Sécurité Informatique', 'Cloud Computing'],
      achievements: [
        'Certification Cisco & Microsoft',
        'Infrastructure 50+ entreprises',
        'Expert Cybersécurité régionale',
        'Formation 200+ techniciens'
      ],
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b9e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-purple-500 to-violet-600'
    },
    {
      name: 'Emmanuel Hakizimana',
      position: 'Chef Développement',
      education: 'Master Génie Logiciel, Université de Kigali',
      experience: '10 ans en développement logiciel',
      expertise: ['Développement Web', 'Applications Mobiles', 'DevOps'],
      achievements: [
        'Lead Developer 100+ projets',
        'Applications mobile 500k+ users',
        'Expert React & Node.js',
        'Mentor développeurs juniors'
      ],
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Consolée Uwimana',
      position: 'Directrice Relations Clients',
      education: 'Master Marketing Digital, INES Ruhengeri',
      experience: '8 ans en gestion de projets IT',
      expertise: ['Gestion de Projet', 'Support Client', 'Marketing Digital'],
      achievements: [
        'Satisfaction client 98%',
        'Portfolio 150+ clients fidèles',
        'Projets internationaux',
        'Certification PMP & Scrum'
      ],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-teal-500 to-cyan-600'
    }
  ]

  const milestones = [
    {
      year: '2010',
      title: 'Fondation INFONET',
      description: 'Création de l\'entreprise avec vision innovation et excellence technologique.',
      icon: '🚀',
      details: [
        'Premier bureau à Bujumbura',
        'Équipe fondatrice 3 experts',
        'Focus développement web',
        'Premiers clients locaux'
      ]
    },
    {
      year: '2015',
      title: 'Expansion Régionale',
      description: 'Ouverture vers les marchés régionaux et diversification des services.',
      icon: '🌍',
      details: [
        'Projets au Rwanda et RDC',
        'Services cloud computing',
        'Équipe de 15 spécialistes',
        '50+ projets réalisés'
      ]
    },
    {
      year: '2018',
      title: 'Transformation Digitale',
      description: 'Positionnement comme leader en transformation digitale au Burundi.',
      icon: '💻',
      details: [
        'Solutions IoT et Intelligence Artificielle',
        'Partenariats technologiques',
        '100+ clients entreprises',
        'Certification ISO 27001'
      ]
    },
    {
      year: '2020',
      title: 'Innovation & Croissance',
      description: 'Lancement de solutions innovantes et croissance accélérée.',
      icon: '⚡',
      details: [
        'Solutions e-commerce',
        'Applications mobiles',
        'Équipe de 30 experts',
        'Revenus multipliés par 3'
      ]
    },
    {
      year: '2023',
      title: 'Leadership Technologique',
      description: 'Reconnaissance comme leader IT et expansion internationale.',
      icon: '🏆',
      details: [
        'Prix Excellence IT Burundi',
        'Projets dans 5 pays',
        '200+ projets livrés',
        'Équipe de 45 spécialistes'
      ]
    }
  ]

  const values = [
    {
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque projet, en utilisant les meilleures technologies et pratiques.',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Innovation',
      description: 'L\'innovation est au cœur de notre ADN. Nous explorons constamment de nouvelles solutions.',
      icon: '💡',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Partenariat',
      description: 'Nous construisons des relations durables basées sur la confiance et la collaboration.',
      icon: '🤝',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Impact Social',
      description: 'Nos solutions contribuent au développement numérique et économique du Burundi.',
      icon: '🌱',
      color: 'from-orange-500 to-red-500'
    }
  ]


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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Accompagner la transformation digitale des entreprises burundaises en proposant des solutions technologiques innovantes, 
                fiables et adaptées aux besoins locaux. Nous nous engageons à faire du Burundi un hub technologique régional.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Être la référence en matière de solutions IT en Afrique de l'Est, reconnue pour notre expertise technique, 
                notre innovation constante et notre impact positif sur le développement économique et social de la région.
              </p>
            </div>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center text-2xl`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className={`h-2 bg-gradient-to-r ${leader.color}`}></div>
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                      <p className={`font-semibold mb-2 bg-gradient-to-r ${leader.color} bg-clip-text text-transparent`}>
                        {leader.position}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">{leader.education}</p>
                      <p className="text-gray-500 text-sm">{leader.experience}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Domaines d'expertise:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {leader.expertise.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
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
                </div>
              </div>
            ))}
          </div>
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
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center text-sm font-bold z-10">
                    {milestone.icon}
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
                      <ul className="space-y-2">
                        {milestone.details.map((detail, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-500">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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