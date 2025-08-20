'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ResearchCentersContent() {
  const [selectedCenter, setSelectedCenter] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const centerCategories = [
    { id: 'all', name: 'Tous les Centres', count: 4 },
    { id: 'agritech', name: 'AgriTech', count: 1 },
    { id: 'biotech', name: 'Biotechnologies', count: 1 },
    { id: 'food', name: 'Sciences Alimentaires', count: 1 },
    { id: 'environment', name: 'Développement Durable', count: 1 }
  ]

  const researchCenters = [
    {
      id: 1,
      category: 'agritech',
      name: 'Centre AgriTech Innovation',
      director: 'Dr. Rim Guesmi',
      established: '2020',
      staff: 25,
      budget: '€800,000',
      description: 'Centre d\'excellence en technologies agricoles intelligentes, agriculture de précision et systèmes IoT pour l\'optimisation des rendements agricoles.',
      mission: 'Révolutionner l\'agriculture traditionnelle par l\'innovation technologique et l\'intelligence artificielle pour une production durable et efficace.',
      specialties: [
        'Intelligence Artificielle Agricole',
        'Internet des Objets (IoT)',
        'Robotique Agricole',
        'Big Data & Analytics',
        'Agriculture de Précision',
        'Drones et Télédétection'
      ],
      equipment: [
        'Laboratoire IA avec clusters GPU',
        'Flotte de 15 drones agricoles',
        '500+ capteurs IoT déployés',
        'Serre intelligente automatisée',
        'Robots agricoles autonomes',
        'Station météorologique avancée'
      ],
      achievements: [
        'Développement de 5 algorithmes IA brevetés',
        'Déploiement IoT dans 50+ exploitations',
        '25% d\'augmentation moyenne des rendements',
        'Réduction de 40% de l\'usage d\'eau',
        'Prix Innovation AgriTech 2023',
        'Partenariat avec Microsoft Azure'
      ],
      currentProjects: [
        'SmartFarm: Plateforme IoT complète',
        'AgroAI: Assistant virtuel agriculteur',
        'DroneSwarm: Surveillance automatisée',
        'PredictYield: Prédiction de rendements'
      ],
      partnerships: [
        'Microsoft Research',
        'John Deere',
        'Google Cloud',
        'FAO',
        'Ministère Agriculture Tunisie'
      ],
      facilities: [
        'Laboratoire IA (200m²)',
        'Hangar robotique (300m²)',
        'Serre expérimentale (500m²)',
        'Centre de données (100m²)',
        'Atelier prototypage (150m²)'
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-500 to-indigo-600',
      icon: '🚀'
    },
    {
      id: 2,
      category: 'biotech',
      name: 'Laboratoire Biotechnologies Avancées',
      director: 'Pr. Salma Khadhraoui',
      established: '2018',
      staff: 18,
      budget: '€650,000',
      description: 'Laboratoire de recherche de pointe en biotechnologies végétales, amélioration génétique et technologies CRISPR pour le développement de nouvelles variétés.',
      mission: 'Développer des solutions biotechnologiques innovantes pour l\'amélioration des cultures et la sécurité alimentaire face aux défis climatiques.',
      specialties: [
        'Édition Génomique CRISPR-Cas9',
        'Génomique Fonctionnelle',
        'Marqueurs Moléculaires',
        'Culture de Tissus Végétaux',
        'Protéomique Végétale',
        'Bioinformatique'
      ],
      equipment: [
        'Séquenceur ADN Illumina NovaSeq',
        'Système CRISPR complet',
        'Microscopes confocaux Zeiss',
        'PCR temps réel (qPCR)',
        'Électrophorèse capillaire',
        'Incubateurs culture cellulaire'
      ],
      achievements: [
        '12 variétés améliorées développées',
        '8 brevets biotechnologiques déposés',
        '50+ publications scientifiques',
        'Collaboration avec Institut Pasteur',
        'Formation 100+ étudiants/chercheurs',
        'Transfert technologique 15 entreprises'
      ],
      currentProjects: [
        'CRISPR-Med: Cultures méditerranéennes',
        'BioMarker: Sélection assistée',
        'PlantGen: Génomique comparative',
        'StressRes: Résistance au stress'
      ],
      partnerships: [
        'Institut Pasteur Tunis',
        'CIRAD France',
        'Université Wageningen',
        'Syngenta',
        'ICARDA'
      ],
      facilities: [
        'Laboratoire Génomique (250m²)',
        'Salle culture tissus (150m²)',
        'Serre confinée (400m²)',
        'Chambre froide -80°C',
        'Laboratoire Protéomique (200m²)'
      ],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-purple-500 to-violet-600',
      icon: '🧬'
    },
    {
      id: 3,
      category: 'food',
      name: 'Institut Sciences Alimentaires',
      director: 'Dr. Noureddine Boudhrioua',
      established: '2019',
      staff: 20,
      budget: '€700,000',
      description: 'Institut de recherche en technologies alimentaires, innovation en emballage, sécurité alimentaire et développement de nouveaux produits fonctionnels.',
      mission: 'Innover dans les technologies alimentaires pour améliorer la sécurité, la qualité nutritionnelle et la durabilité des systèmes alimentaires.',
      specialties: [
        'Technologies de Transformation',
        'Emballages Intelligents',
        'Microbiologie Alimentaire',
        'Aliments Fonctionnels',
        'Analyse Sensorielle',
        'Nanotechnologies Alimentaires'
      ],
      equipment: [
        'Chromatographes HPLC/GC-MS',
        'Spectromètres IR et UV-Vis',
        'Pilot plants transformation',
        'Laboratoire sensoriel certifié',
        'Microscopes électroniques',
        'Enceintes atmosphère contrôlée'
      ],
      achievements: [
        '15 produits alimentaires innovants',
        '6 technologies d\'emballage brevetées',
        'Réduction 45% gaspillage alimentaire',
        'Certification ISO 22000',
        'Partenariat avec 20+ industriels',
        'Prix Innovation Alimentaire 2022'
      ],
      currentProjects: [
        'PackSmart: Emballages intelligents',
        'NutriBoost: Aliments fonctionnels',
        'SafeFood: Sécurité alimentaire',
        'GreenPack: Emballages biodégradables'
      ],
      partnerships: [
        'Nestlé Research Center',
        'Tetra Pak',
        'Unilever',
        'Carrefour',
        'Danone'
      ],
      facilities: [
        'Laboratoire Chimie (300m²)',
        'Pilot Plant (400m²)',
        'Salle dégustation (100m²)',
        'Laboratoire Microbiologie (200m²)',
        'Zone stockage conditionnée (250m²)'
      ],
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-orange-500 to-red-600',
      icon: '🥗'
    },
    {
      id: 4,
      category: 'environment',
      name: 'Centre Développement Durable',
      director: 'Pr. Ahmed Oueslati',
      established: '2021',
      staff: 15,
      budget: '€500,000',
      description: 'Centre de recherche dédié aux solutions environnementales durables, bioremédiation, énergies renouvelables et adaptation au changement climatique.',
      mission: 'Développer des solutions durables pour la protection de l\'environnement et l\'adaptation de l\'agriculture au changement climatique.',
      specialties: [
        'Bioremédiation des Sols',
        'Énergies Renouvelables',
        'Agroécologie',
        'Gestion des Ressources Hydriques',
        'Changement Climatique',
        'Économie Circulaire'
      ],
      equipment: [
        'Stations météorologiques automatiques',
        'Analyseurs de sol multiparamètres',
        'Bioréacteurs pour bioremédiation',
        'Systèmes GIS et télédétection',
        'Capteurs qualité de l\'eau',
        'Laboratoire énergies renouvelables'
      ],
      achievements: [
        '150 hectares de sols décontaminés',
        '95% réduction pollution métaux lourds',
        '10 protocoles bioremédiation validés',
        'Formation 200+ agriculteurs',
        'Certification environnementale ISO 14001',
        'Projet pilote énergies renouvelables'
      ],
      currentProjects: [
        'BioClean: Bioremédiation avancée',
        'SolarAgri: Agrivoltaïsme',
        'WaterSmart: Gestion intelligente eau',
        'CircularFarm: Agriculture circulaire'
      ],
      partnerships: [
        'ANPE Tunisie',
        'Université Montpellier',
        'WWF Méditerranée',
        'Banque Mondiale',
        'Programme UNEP'
      ],
      facilities: [
        'Laboratoire Environnement (250m²)',
        'Serre bioclimatique (300m²)',
        'Station épuration pilote (200m²)',
        'Parc énergies renouvelables (500m²)',
        'Centre formation (150m²)'
      ],
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-green-500 to-emerald-600',
      icon: '🌱'
    }
  ]

  const filteredCenters = selectedCenter === 'all' 
    ? researchCenters 
    : researchCenters.filter(center => center.category === selectedCenter)

  const stats = [
    { label: 'Centres Actifs', value: '4', icon: '🏢', description: 'Installations de recherche' },
    { label: 'Chercheurs', value: '78', icon: '👥', description: 'Experts et doctorants' },
    { label: 'Équipements', value: '€3M', icon: '🔬', description: 'Valeur des installations' },
    { label: 'Brevets', value: '25+', icon: '💡', description: 'Innovations protégées' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 via-purple-800/75 to-teal-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
                  Centres de Recherche
                </span>
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-cyan-100 animate-fade-in-up delay-200">
                Infrastructures d'Excellence & Innovation
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Découvrez nos centres de recherche de pointe équipés des technologies les plus avancées 
                pour l'innovation scientifique et le développement technologique.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Research Icons */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-400/20 rounded-full animate-bounce delay-1000 flex items-center justify-center text-2xl">🏢</div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-400/20 rounded-full animate-bounce delay-1500 flex items-center justify-center text-xl">🔬</div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-teal-400/20 rounded-full animate-bounce delay-2000 flex items-center justify-center text-lg">⚗️</div>

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
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500 shadow-lg group-hover:shadow-2xl">
                    {stat.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-5xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Center Categories */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Domaines de Spécialisation</h3>
            <p className="text-gray-600">Explorez nos centres par domaine d'expertise</p>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-wrap gap-4 p-2 bg-gray-50 rounded-full">
              {centerCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCenter(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCenter === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-white hover:shadow-md'
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
        </div>
      </section>

      {/* Research Centers Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nos <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Centres</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Infrastructures de recherche de pointe au service de l'innovation scientifique
            </p>
          </div>

          <div className="space-y-16">
            {filteredCenters.map((center, index) => (
              <div
                key={center.id}
                className={`group ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex gap-12 items-center`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Center Image */}
                <div className="lg:w-1/2">
                  <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${center.image})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${center.color} opacity-70 group-hover:opacity-60 transition-opacity duration-300`} />
                    
                    {/* Center Icon */}
                    <div className="absolute top-6 left-6">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl">
                        {center.icon}
                      </div>
                    </div>

                    {/* Center Stats */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{center.staff}</div>
                          <div className="text-white/90 text-sm">Chercheurs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{center.established}</div>
                          <div className="text-white/90 text-sm">Fondé</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{center.budget}</div>
                          <div className="text-white/90 text-sm">Budget</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Content */}
                <div className="lg:w-1/2">
                  <div className="space-y-6">
                    {/* Center Header */}
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                        {center.name}
                      </h3>
                      <p className="text-lg text-gray-600 mb-4">
                        <span className="font-semibold">Directeur:</span> {center.director}
                      </p>
                      <p className="text-gray-700 leading-relaxed">{center.description}</p>
                    </div>

                    {/* Mission */}
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                        <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                        Mission
                      </h4>
                      <p className="text-purple-700 font-medium">{center.mission}</p>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                        <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                        Domaines d'Expertise
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {center.specialties.map((specialty, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                            {specialty}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                        <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                        Réalisations Clés
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {center.achievements.slice(0, 4).map((achievement, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <Link
                        href={`/research/centers/${center.id}`}
                        className={`flex-1 bg-gradient-to-r ${center.color} text-white px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center`}
                      >
                        Explorer le Centre
                      </Link>
                      <Link
                        href="/research/projects"
                        className="px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                      >
                        Projets
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment & Facilities Overview */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Équipements & <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Installations</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Technologies de pointe et infrastructures modernes pour l'excellence scientifique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: 'Intelligence Artificielle',
                items: ['Clusters GPU NVIDIA', 'Serveurs haute performance', 'Plateforme cloud Azure', 'Outils machine learning'],
                icon: '🤖',
                color: 'from-blue-500 to-indigo-600'
              },
              {
                category: 'Biotechnologies',
                items: ['Séquenceurs ADN', 'Système CRISPR', 'Microscopes confocaux', 'PCR temps réel'],
                icon: '🧬',
                color: 'from-purple-500 to-violet-600'
              },
              {
                category: 'Sciences Alimentaires',
                items: ['Chromatographes HPLC', 'Spectromètres IR', 'Pilot plants', 'Laboratoire sensoriel'],
                icon: '🥗',
                color: 'from-orange-500 to-red-600'
              },
              {
                category: 'Environnement',
                items: ['Stations météo auto', 'Analyseurs de sol', 'Systèmes GIS', 'Capteurs qualité eau'],
                icon: '🌱',
                color: 'from-green-500 to-emerald-600'
              }
            ].map((category, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-4 border border-white/20"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-500`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-center group-hover:text-cyan-300 transition-colors duration-300">
                  {category.category}
                </h3>
                
                <div className="space-y-2">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Rejoignez l'Excellence Scientifique
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed">
            Intégrez nos centres de recherche et participez aux découvertes qui façonnent 
            l'avenir de la science et de la technologie.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/research/projects" 
              className="bg-white text-purple-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Nos Projets de Recherche
            </Link>
            <Link 
              href="/contact" 
              className="border-3 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Collaborer avec Nous
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}