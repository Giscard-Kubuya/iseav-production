'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ResearchProjectsContent() {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const projectStatuses = [
    { id: 'all', name: 'Tous les Projets', count: 25 },
    { id: 'active', name: 'En Cours', count: 12 },
    { id: 'completed', name: 'Terminés', count: 8 },
    { id: 'planned', name: 'Planifiés', count: 5 }
  ]

  const categories = [
    { id: 'all', name: 'Tous les Domaines', color: 'from-gray-500 to-gray-600' },
    { id: 'agriculture', name: 'Agriculture Durable', color: 'from-green-500 to-emerald-600' },
    { id: 'biotechnology', name: 'Biotechnologies', color: 'from-purple-500 to-violet-600' },
    { id: 'food', name: 'Sciences Alimentaires', color: 'from-orange-500 to-red-600' },
    { id: 'environment', name: 'Environnement', color: 'from-teal-500 to-cyan-600' },
    { id: 'technology', name: 'Technologies', color: 'from-blue-500 to-indigo-600' }
  ]

  const projects = [
    {
      id: 1,
      title: 'SmartFarm: Agriculture de Précision IoT',
      status: 'active',
      category: 'agriculture',
      leader: 'Dr. Amina Benali',
      startDate: '2022-01-15',
      endDate: '2025-01-15',
      budget: '€250,000',
      funding: 'EU Horizon 2020',
      team: 12,
      publications: 15,
      description: 'Développement d\'un écosystème IoT complet pour l\'agriculture de précision, incluant capteurs, drones, et IA prédictive pour optimiser les rendements tout en réduisant l\'impact environnemental.',
      objectives: [
        'Déployer 500+ capteurs IoT dans 10 exploitations pilotes',
        'Développer des algorithmes ML pour prédiction de rendements',
        'Créer une plateforme de gestion agricole intelligente',
        'Réduire de 30% l\'usage d\'eau et pesticides'
      ],
      milestones: [
        { title: 'Phase 1: Développement capteurs', completed: true, date: '2022-06-30' },
        { title: 'Phase 2: Déploiement pilote', completed: true, date: '2023-03-15' },
        { title: 'Phase 3: IA et algorithmes', completed: false, date: '2024-09-30' },
        { title: 'Phase 4: Commercialisation', completed: false, date: '2024-12-31' }
      ],
      partners: ['Microsoft Research', 'John Deere', 'Ministère Agriculture'],
      technologies: ['IoT', 'Machine Learning', 'Computer Vision', 'Big Data'],
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-green-500 to-emerald-600',
      icon: '🚜',
      impact: 'Augmentation de 25% des rendements, réduction de 40% de l\'usage d\'eau'
    },
    {
      id: 2,
      title: 'CRISPR-Med: Édition Génomique Cultures Méditerranéennes',
      status: 'active',
      category: 'biotechnology',
      leader: 'Pr. Salma Khadhraoui',
      startDate: '2023-02-01',
      endDate: '2026-02-01',
      budget: '€320,000',
      funding: 'ANR France, IRCC Tunisie',
      team: 8,
      publications: 12,
      description: 'Programme de recherche avancée utilisant CRISPR-Cas9 pour développer des variétés de cultures méditerranéennes résistantes à la sécheresse et aux maladies, adaptées au changement climatique.',
      objectives: [
        'Identifier 50+ gènes de résistance au stress hydrique',
        'Développer 5 variétés de tomates résistantes',
        'Créer des lignées d\'oliviers tolérants à la sécheresse',
        'Valider l\'efficacité en conditions réelles'
      ],
      milestones: [
        { title: 'Cartographie génomique', completed: true, date: '2023-08-31' },
        { title: 'Premiers prototypes CRISPR', completed: true, date: '2024-02-28' },
        { title: 'Tests en serre', completed: false, date: '2024-12-31' },
        { title: 'Validation terrain', completed: false, date: '2025-08-31' }
      ],
      partners: ['Institut Pasteur', 'CIRAD', 'Université Wageningen'],
      technologies: ['CRISPR-Cas9', 'Génomique', 'Marqueurs Moléculaires', 'Phénotypage'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-purple-500 to-violet-600',
      icon: '🧬',
      impact: 'Nouvelles variétés résistantes pour 1000+ agriculteurs méditerranéens'
    },
    {
      id: 3,
      title: 'PackSmart: Emballages Alimentaires Intelligents',
      status: 'active',
      category: 'food',
      leader: 'Dr. Fatma Zahra Ben Ahmed',
      startDate: '2022-09-01',
      endDate: '2024-12-31',
      budget: '€180,000',
      funding: 'EU LIFE+, Industrie',
      team: 10,
      publications: 18,
      description: 'Innovation en emballages alimentaires avec capteurs intégrés pour monitoring temps réel de la fraîcheur, prolongation durée de vie et réduction drastique du gaspillage alimentaire.',
      objectives: [
        'Développer capteurs biodégradables intégrés',
        'Créer app mobile de traçabilité consommateur',
        'Réduire de 50% le gaspillage alimentaire',
        'Commercialiser 3 produits innovants'
      ],
      milestones: [
        { title: 'Prototypes capteurs', completed: true, date: '2023-03-31' },
        { title: 'Tests industriels', completed: true, date: '2023-09-30' },
        { title: 'Application mobile', completed: false, date: '2024-06-30' },
        { title: 'Lancement commercial', completed: false, date: '2024-12-31' }
      ],
      partners: ['Tetra Pak', 'Carrefour', 'Laboratoires Unilever'],
      technologies: ['Nanotechnologies', 'Capteurs', 'IoT', 'Blockchain'],
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-orange-500 to-red-600',
      icon: '📦',
      impact: 'Réduction de 45% du gaspillage alimentaire dans la chaîne distribution'
    },
    {
      id: 4,
      title: 'BioClean: Bioremédiation Sols Agricoles',
      status: 'completed',
      category: 'environment',
      leader: 'Pr. Ahmed Oueslati',
      startDate: '2021-01-01',
      endDate: '2023-12-31',
      budget: '€150,000',
      funding: 'UNEP, Banque Mondiale',
      team: 6,
      publications: 22,
      description: 'Développement de solutions biologiques innovantes pour décontamination des sols agricoles pollués par métaux lourds et pesticides, utilisant microorganismes sélectionnés.',
      objectives: [
        'Identifier 20+ souches microbiennes dépolluantes',
        'Développer protocoles de bioremédiation',
        'Traiter 100 hectares de sols contaminés',
        'Former 200 agriculteurs aux techniques'
      ],
      milestones: [
        { title: 'Isolation microorganismes', completed: true, date: '2021-06-30' },
        { title: 'Tests laboratoire', completed: true, date: '2022-03-31' },
        { title: 'Validation terrain', completed: true, date: '2023-06-30' },
        { title: 'Transfert technologique', completed: true, date: '2023-12-31' }
      ],
      partners: ['ANPE Tunisie', 'Université Montpellier', 'WWF'],
      technologies: ['Microbiologie', 'Biotechnologies', 'Génie Environnemental', 'Bioinformatique'],
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-teal-500 to-green-600',
      icon: '🌍',
      impact: '150 hectares décontaminés, 95% réduction pollution métaux lourds'
    },
    {
      id: 5,
      title: 'AgroAI: Intelligence Artificielle Prédictive',
      status: 'planned',
      category: 'technology',
      leader: 'Dr. Rim Guesmi',
      startDate: '2024-09-01',
      endDate: '2027-09-01',
      budget: '€400,000',
      funding: 'EU Digital Europe, Google.org',
      team: 15,
      publications: 0,
      description: 'Plateforme IA révolutionnaire combinant données satellitaires, IoT et machine learning pour prédictions agricoles ultra-précises et conseil automatisé aux agriculteurs.',
      objectives: [
        'Développer IA prédictive multi-cultures',
        'Intégrer données satellitaires temps réel',
        'Créer assistant virtuel agriculteur',
        'Déployer dans 15 pays méditerranéens'
      ],
      milestones: [
        { title: 'Architecture système', completed: false, date: '2024-12-31' },
        { title: 'Algorithmes ML', completed: false, date: '2025-06-30' },
        { title: 'Intégration satellitaire', completed: false, date: '2026-03-31' },
        { title: 'Déploiement international', completed: false, date: '2027-09-01' }
      ],
      partners: ['Google Research', 'ESA', 'FAO'],
      technologies: ['Intelligence Artificielle', 'Deep Learning', 'Satellites', 'Cloud Computing'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-500 to-indigo-600',
      icon: '🤖',
      impact: 'Prédictions 90% précises, +35% productivité agricole'
    },
    {
      id: 6,
      title: 'NutriBoost: Aliments Fonctionnels Personnalisés',
      status: 'active',
      category: 'food',
      leader: 'Dr. Noureddine Boudhrioua',
      startDate: '2023-06-01',
      endDate: '2025-12-31',
      budget: '€220,000',
      funding: 'Industrie, EU Health',
      team: 9,
      publications: 8,
      description: 'Recherche en développement d\'aliments fonctionnels personnalisés basés sur profils nutritionnels individuels, utilisant biotechnologies et nanotechnologies alimentaires.',
      objectives: [
        'Développer 10 formulations d\'aliments fonctionnels',
        'Créer système de personnalisation nutritionnelle',
        'Valider bénéfices santé cliniquement',
        'Lancer 3 produits commerciaux'
      ],
      milestones: [
        { title: 'Recherche formulations', completed: true, date: '2023-12-31' },
        { title: 'Prototypes produits', completed: false, date: '2024-06-30' },
        { title: 'Études cliniques', completed: false, date: '2025-03-31' },
        { title: 'Commercialisation', completed: false, date: '2025-12-31' }
      ],
      partners: ['Nestlé Research', 'Danone', 'Université Cornell'],
      technologies: ['Nanotechnologies', 'Nutrition', 'Biotechnologies', 'Formulation'],
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-pink-500 to-rose-600',
      icon: '🍎',
      impact: 'Amélioration santé nutritionnelle 10,000+ consommateurs'
    }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesCategory && matchesSearch
  })

  const stats = [
    { label: 'Projets Actifs', value: '12', icon: '🚀', description: 'Recherches en cours' },
    { label: 'Budget Total', value: '€2.5M', icon: '💰', description: 'Financement 2024' },
    { label: 'Publications', value: '150+', icon: '📚', description: 'Articles scientifiques' },
    { label: 'Brevets', value: '8', icon: '💡', description: 'Innovations protégées' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'planned': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '⚡'
      case 'completed': return '✅'
      case 'planned': return '🎯'
      default: return '📋'
    }
  }

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
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 via-teal-800/75 to-blue-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-cyan-300 via-white to-emerald-300 bg-clip-text text-transparent">
                  Projets de Recherche
                </span>
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-cyan-100 animate-fade-in-up delay-200">
                Innovation & Découvertes Scientifiques
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Découvrez nos projets de recherche révolutionnaires qui transforment l'agriculture, 
                les biotechnologies et les sciences appliquées pour un avenir durable.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Project Icons */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-400/20 rounded-full animate-bounce delay-1000 flex items-center justify-center text-2xl">🔬</div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-teal-400/20 rounded-full animate-bounce delay-1500 flex items-center justify-center text-xl">🚀</div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-cyan-400/20 rounded-full animate-bounce delay-2000 flex items-center justify-center text-lg">💡</div>

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

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Rechercher un projet, chef de projet ou technologie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-full focus:border-emerald-500 focus:outline-none transition-colors duration-300"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-6">
            {/* Status Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Statut du Projet</h3>
              <div className="flex flex-wrap gap-3">
                {projectStatuses.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => setSelectedStatus(status.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedStatus === status.id
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.name}
                    <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                      {status.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Domaine de Recherche</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nos <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Projets</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {filteredProjects.length} projets de recherche selon vos critères
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Header */}
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
                  
                  {/* Project Status */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)} backdrop-blur-sm`}>
                      {getStatusIcon(project.status)} {project.status === 'active' ? 'En Cours' : project.status === 'completed' ? 'Terminé' : 'Planifié'}
                    </span>
                  </div>

                  {/* Project Stats */}
                  <div className="absolute top-4 right-4 text-right">
                    <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800 mb-2">
                      {project.team} chercheurs
                    </div>
                    <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800">
                      {project.budget}
                    </div>
                  </div>

                  {/* Project Icon & Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl mr-3">
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  {/* Project Leader & Timeline */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Chef de Projet</div>
                      <div className="font-semibold text-gray-800">{project.leader}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Durée</div>
                      <div className="font-semibold text-emerald-600">
                        {new Date(project.startDate).getFullYear()} - {new Date(project.endDate).getFullYear()}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Objectives */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                      Objectifs Clés
                    </h4>
                    <div className="space-y-2">
                      {project.objectives.slice(0, 3).map((objective, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {objective}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Milestones Progress */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Progression
                    </h4>
                    <div className="space-y-2">
                      {project.milestones.map((milestone, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <span className={`w-3 h-3 rounded-full mr-3 ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          <span className={milestone.completed ? 'text-green-700 font-medium' : 'text-gray-600'}>
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact & Results */}
                  {project.impact && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Impact & Résultats
                      </h4>
                      <p className="text-sm text-green-700 font-medium">{project.impact}</p>
                    </div>
                  )}

                  {/* Funding & Publications */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Financement</div>
                      <div className="font-semibold text-amber-600 text-sm">{project.funding}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Publications</div>
                      <div className="font-semibold text-blue-600">{project.publications} articles</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/research/projects/${project.id}`}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      Détails Complets
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

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Participez à l'Innovation
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed">
            Rejoignez nos équipes de recherche et contribuez aux découvertes scientifiques 
            qui façonnent l'avenir de l'agriculture et des sciences appliquées.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/research/centers" 
              className="bg-white text-emerald-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Centres de Recherche
            </Link>
            <Link 
              href="/contact" 
              className="border-3 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Collaborer
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}