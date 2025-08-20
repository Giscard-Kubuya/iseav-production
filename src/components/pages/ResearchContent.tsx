'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ResearchContent() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const researchCategories = [
    { id: 'all', name: 'Tous les Domaines', count: 25 },
    { id: 'agriculture', name: 'Agriculture Durable', count: 8 },
    { id: 'biotechnology', name: 'Biotechnologies', count: 7 },
    { id: 'food', name: 'Sciences Alimentaires', count: 6 },
    { id: 'environment', name: 'Environnement', count: 4 }
  ]

  const researchAreas = [
    {
      id: 1,
      category: 'agriculture',
      title: 'Agriculture de Précision & IoT',
      description: 'Développement de systèmes intelligents pour optimiser la production agricole grâce aux technologies de l\'IoT, capteurs et intelligence artificielle.',
      leader: 'Dr. Amina Benali',
      team: 12,
      budget: '€250,000',
      duration: '2022-2025',
      publications: 15,
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-green-500 to-emerald-600',
      icon: '🌱',
      objectives: [
        'Optimiser l\'utilisation des ressources agricoles',
        'Développer des capteurs IoT pour l\'agriculture',
        'Créer des algorithmes prédictifs de rendement',
        'Réduire l\'impact environnemental'
      ],
      partners: ['Microsoft Research', 'John Deere', 'Ministère Agriculture'],
      funding: 'EU Horizon 2020, Gouvernement Tunisien'
    },
    {
      id: 2,
      category: 'biotechnology',
      title: 'Édition Génomique CRISPR',
      description: 'Recherche avancée en amélioration génétique des cultures méditerranéennes utilisant les technologies CRISPR-Cas9 pour la résistance aux stress.',
      leader: 'Pr. Karim Mansouri',
      team: 8,
      budget: '€180,000',
      duration: '2023-2026',
      publications: 12,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-purple-500 to-violet-600',
      icon: '🧬',
      objectives: [
        'Améliorer la résistance aux maladies',
        'Développer des variétés tolérantes à la sécheresse',
        'Créer des biomarqueurs génétiques',
        'Transférer les technologies aux agriculteurs'
      ],
      partners: ['Institut Pasteur', 'CIRAD', 'Université Wageningen'],
      funding: 'ANR France, IRCC Tunisie'
    },
    {
      id: 3,
      category: 'food',
      title: 'Emballages Alimentaires Intelligents',
      description: 'Innovation en technologies d\'emballage avec capteurs intégrés pour surveiller la fraîcheur et prolonger la durée de vie des aliments.',
      leader: 'Dr. Fatma Zahra Ben Ahmed',
      team: 10,
      budget: '€200,000',
      duration: '2022-2024',
      publications: 18,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-orange-500 to-red-600',
      icon: '📦',
      objectives: [
        'Réduire le gaspillage alimentaire',
        'Développer des capteurs biodégradables',
        'Améliorer la traçabilité alimentaire',
        'Commercialiser les innovations'
      ],
      partners: ['Tetra Pak', 'Carrefour', 'Laboratoires Unilever'],
      funding: 'EU LIFE+, Partenaires industriels'
    },
    {
      id: 4,
      category: 'environment',
      title: 'Bioremédiation des Sols',
      description: 'Développement de solutions biologiques pour la décontamination des sols agricoles pollués par les métaux lourds et pesticides.',
      leader: 'Pr. Ahmed Oueslati',
      team: 6,
      budget: '€120,000',
      duration: '2023-2025',
      publications: 8,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-teal-500 to-green-600',
      icon: '🌍',
      objectives: [
        'Identifier des microorganismes dépolluants',
        'Développer des protocoles de bioremédiation',
        'Tester l\'efficacité sur terrains contaminés',
        'Former les agriculteurs aux techniques'
      ],
      partners: ['ANPE Tunisie', 'Université Montpellier', 'WWF'],
      funding: 'Programme UNEP, Banque Mondiale'
    }
  ]

  const researchCenters = [
    {
      name: 'Centre AgriTech Innovation',
      director: 'Dr. Rim Guesmi',
      established: '2020',
      staff: 25,
      description: 'Centre d\'excellence en technologies agricoles intelligentes et agriculture de précision.',
      specialties: ['IoT Agricole', 'Intelligence Artificielle', 'Robotique', 'Big Data'],
      equipment: ['Drones agricoles', 'Capteurs IoT', 'Laboratoire IA', 'Serre intelligente'],
      icon: '🚀',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Laboratoire Biotechnologies',
      director: 'Pr. Salma Khadhraoui',
      established: '2018',
      staff: 18,
      description: 'Recherche avancée en biotechnologies végétales et amélioration génétique.',
      specialties: ['Génomique', 'Protéomique', 'CRISPR', 'Marqueurs Moléculaires'],
      equipment: ['Séquenceur ADN', 'Microscopes confocaux', 'PCR temps réel', 'Culture cellulaire'],
      icon: '🔬',
      color: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Institut Sciences Alimentaires',
      director: 'Dr. Noureddine Boudhrioua',
      established: '2019',
      staff: 20,
      description: 'Innovation en technologies alimentaires et sécurité des aliments.',
      specialties: ['Technologie Alimentaire', 'Emballage', 'Microbiologie', 'Nutrition'],
      equipment: ['Chromatographes', 'Spectromètres', 'Pilot plants', 'Laboratoire sensoriel'],
      icon: '🥗',
      color: 'from-orange-500 to-yellow-600'
    },
    {
      name: 'Centre Développement Durable',
      director: 'Pr. Mohamed Trabelsi',
      established: '2021',
      staff: 15,
      description: 'Recherche en agriculture durable et solutions environnementales.',
      specialties: ['Agroécologie', 'Bioremédiation', 'Énergies Renouvelables', 'Climat'],
      equipment: ['Stations météo', 'Analyseurs sol', 'Bioréacteurs', 'GIS/Télédétection'],
      icon: '🌱',
      color: 'from-green-500 to-emerald-600'
    }
  ]

  const stats = [
    { label: 'Projets Actifs', value: '25+', icon: '🔬', description: 'Recherches en cours' },
    { label: 'Publications/An', value: '150+', icon: '📚', description: 'Articles scientifiques' },
    { label: 'Financement', value: '€2.5M', icon: '💰', description: 'Budget recherche' },
    { label: 'Partenaires', value: '50+', icon: '🤝', description: 'Collaborations internationales' }
  ]

  const filteredResearch = selectedCategory === 'all' 
    ? researchAreas 
    : researchAreas.filter(area => area.category === selectedCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 via-teal-800/75 to-cyan-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-cyan-300 via-white to-emerald-300 bg-clip-text text-transparent">
                  Recherche & Innovation
                </span>
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-cyan-100 animate-fade-in-up delay-200">
                Excellence Scientifique & Découvertes
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Explorez nos programmes de recherche de pointe qui façonnent l'avenir de l'agriculture, 
                des biotechnologies et des sciences appliquées.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-600">
                <Link 
                  href="/research/projects"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-emerald-500/25"
                >
                  Nos Projets
                </Link>
                <Link 
                  href="/research/centers"
                  className="border-3 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white hover:text-emerald-900 transition-all duration-300 transform hover:scale-110 shadow-2xl"
                >
                  Centres de Recherche
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Research Icons */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-400/20 rounded-full animate-bounce delay-1000 flex items-center justify-center text-2xl">🔬</div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-teal-400/20 rounded-full animate-bounce delay-1500 flex items-center justify-center text-xl">🧬</div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-cyan-400/20 rounded-full animate-bounce delay-2000 flex items-center justify-center text-lg">⚗️</div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
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

        .delay-1000 {
          animation-delay: 1s;
        }

        .delay-1500 {
          animation-delay: 1.5s;
        }

        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group transform hover:scale-110 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500 shadow-lg group-hover:shadow-2xl">
                    {stat.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-5xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Centers Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Centres de <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Recherche</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Infrastructures de pointe dédiées à l'innovation et à l'excellence scientifique
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {researchCenters.map((center, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Center Header */}
                <div className={`p-8 bg-gradient-to-r ${center.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {center.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{center.name}</h3>
                      <p className="text-white/90">Directeur: {center.director}</p>
                      <p className="text-white/80 text-sm">Établi en {center.established}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{center.staff}</div>
                      <div className="text-white/90 text-sm">Chercheurs</div>
                    </div>
                  </div>
                </div>

                {/* Center Content */}
                <div className="p-8">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {center.description}
                  </p>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                      Spécialités
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {center.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-sm font-medium hover:from-emerald-100 hover:to-teal-100 transition-colors duration-300"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Equipment */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                      Équipements Clés
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {center.equipment.map((equipment, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          {equipment}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href="/research/centers"
                    className={`w-full bg-gradient-to-r ${center.color} text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center block`}
                  >
                    Explorer le Centre
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Domaines de <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Recherche</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Projets innovants qui transforment l'agriculture et les sciences appliquées
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-4 p-2 bg-white rounded-full shadow-lg">
              {researchCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Research Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredResearch.map((research, index) => (
              <div
                key={research.id}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Research Image */}
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${research.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${research.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
                  
                  {/* Research Icon */}
                  <div className="absolute top-4 left-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                      {research.icon}
                    </div>
                  </div>

                  {/* Research Stats */}
                  <div className="absolute top-4 right-4 text-right">
                    <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800 mb-2">
                      {research.team} chercheurs
                    </div>
                    <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800">
                      {research.budget}
                    </div>
                  </div>

                  {/* Research Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                      {research.title}
                    </h3>
                    <p className="text-white/90 text-sm">{research.duration}</p>
                  </div>
                </div>

                {/* Research Content */}
                <div className="p-8">
                  {/* Leader Info */}
                  <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Chef de Projet</div>
                      <div className="font-semibold text-gray-800">{research.leader}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Publications</div>
                      <div className="font-semibold text-emerald-600">{research.publications}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {research.description}
                  </p>

                  {/* Objectives */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                      Objectifs Clés
                    </h4>
                    <div className="space-y-2">
                      {research.objectives.map((objective, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {objective}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Partners */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Partenaires
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {research.partners.map((partner, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Funding */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                      Financement
                    </h4>
                    <p className="text-sm text-amber-700 font-medium">{research.funding}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/research/projects/${research.id}`}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      Détails du Projet
                    </Link>
                    <Link
                      href="/research/publications"
                      className="px-4 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      Publications
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Rejoignez l'Innovation Scientifique
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed">
            Participez à des recherches de pointe qui transforment l'agriculture et les sciences appliquées. 
            Ensemble, créons les solutions de demain.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/research/projects" 
              className="bg-white text-emerald-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Explorer nos Projets
            </Link>
            <Link 
              href="/contact" 
              className="border-3 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Collaborer avec Nous
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}