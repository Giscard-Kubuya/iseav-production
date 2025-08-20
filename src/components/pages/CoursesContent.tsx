'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CoursesContent() {
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const levels = [
    { id: 'all', name: 'Tous les Niveaux', count: 45 },
    { id: 'L1', name: 'Licence 1ère Année', count: 12 },
    { id: 'L2', name: 'Licence 2ème Année', count: 10 },
    { id: 'L3', name: 'Licence 3ème Année', count: 8 },
    { id: 'M1', name: 'Master 1ère Année', count: 8 },
    { id: 'M2', name: 'Master 2ème Année', count: 7 }
  ]

  const departments = [
    { id: 'all', name: 'Toutes les Filières', color: 'from-gray-500 to-gray-600' },
    { id: 'agro', name: 'Sciences Agronomiques', color: 'from-green-500 to-emerald-600' },
    { id: 'biotech', name: 'Biotechnologies', color: 'from-purple-500 to-violet-600' },
    { id: 'food', name: 'Technologie Alimentaire', color: 'from-orange-500 to-red-600' },
    { id: 'common', name: 'Tronc Commun', color: 'from-blue-500 to-indigo-600' }
  ]

  const semesters = [
    { id: 'all', name: 'Tous les Semestres' },
    { id: 'S1', name: 'Semestre 1' },
    { id: 'S2', name: 'Semestre 2' }
  ]

  const courses = [
    {
      id: 1,
      code: 'AGRO101',
      title: 'Introduction aux Sciences Agronomiques',
      level: 'L1',
      department: 'agro',
      semester: 'S1',
      credits: 6,
      hours: '45h (30h cours + 15h TP)',
      professor: 'Dr. Amina Benali',
      description: 'Cours d\'introduction aux principes fondamentaux de l\'agronomie, couvrant l\'étude des sols, des plantes et des systèmes de production agricole.',
      prerequisites: 'Baccalauréat Sciences Expérimentales',
      objectives: [
        'Comprendre les bases de l\'agronomie moderne',
        'Maîtriser les concepts de production végétale',
        'Identifier les différents types de sols',
        'Analyser les systèmes agricoles durables'
      ],
      content: [
        'Histoire et évolution de l\'agriculture',
        'Biologie végétale appliquée',
        'Pédologie et fertilité des sols',
        'Techniques de production végétale',
        'Agriculture durable et environnement'
      ],
      evaluation: 'Contrôle continu (40%) + Examen final (60%)',
      color: 'from-green-500 to-emerald-600',
      icon: '🌱'
    },
    {
      id: 2,
      code: 'MATH101',
      title: 'Mathématiques Appliquées',
      level: 'L1',
      department: 'common',
      semester: 'S1',
      credits: 5,
      hours: '60h (45h cours + 15h TD)',
      professor: 'Pr. Mohamed Trabelsi',
      description: 'Mathématiques fondamentales appliquées aux sciences agronomiques et biotechnologies.',
      prerequisites: 'Baccalauréat Mathématiques ou Sciences Expérimentales',
      objectives: [
        'Maîtriser les outils mathématiques de base',
        'Appliquer les statistiques aux sciences agricoles',
        'Résoudre des problèmes concrets',
        'Développer le raisonnement logique'
      ],
      content: [
        'Algèbre et analyse',
        'Statistiques descriptives',
        'Probabilités',
        'Fonctions et dérivées',
        'Applications aux sciences biologiques'
      ],
      evaluation: 'DS (30%) + TP (20%) + Examen final (50%)',
      color: 'from-blue-500 to-indigo-600',
      icon: '📊'
    },
    {
      id: 3,
      code: 'BIO201',
      title: 'Biochimie Structurale',
      level: 'L2',
      department: 'biotech',
      semester: 'S1',
      credits: 6,
      hours: '50h (35h cours + 15h TP)',
      professor: 'Dr. Salma Khadhraoui',
      description: 'Étude approfondie de la structure et fonction des biomolécules essentielles aux processus biologiques.',
      prerequisites: 'BIO101 - Biologie Générale',
      objectives: [
        'Comprendre la structure des biomolécules',
        'Analyser les mécanismes biochimiques',
        'Maîtriser les techniques d\'analyse',
        'Appliquer la biochimie aux biotechnologies'
      ],
      content: [
        'Structure des protéines',
        'Enzymologie',
        'Métabolisme cellulaire',
        'Acides nucléiques',
        'Techniques biochimiques'
      ],
      evaluation: 'TP (25%) + Contrôle continu (35%) + Examen (40%)',
      color: 'from-purple-500 to-violet-600',
      icon: '🧬'
    },
    {
      id: 4,
      code: 'FOOD301',
      title: 'Technologie de Transformation Alimentaire',
      level: 'L3',
      department: 'food',
      semester: 'S1',
      credits: 7,
      hours: '65h (40h cours + 25h TP)',
      professor: 'Dr. Fatma Zahra Ben Ahmed',
      description: 'Techniques avancées de transformation et conservation des aliments avec focus sur l\'innovation technologique.',
      prerequisites: 'FOOD201 - Chimie Alimentaire',
      objectives: [
        'Maîtriser les procédés de transformation',
        'Optimiser la conservation des aliments',
        'Innover dans les technologies alimentaires',
        'Assurer la qualité et sécurité alimentaire'
      ],
      content: [
        'Procédés thermiques',
        'Technologies émergentes',
        'Emballage alimentaire',
        'Contrôle qualité',
        'Innovation produit'
      ],
      evaluation: 'Projet (30%) + TP (30%) + Examen final (40%)',
      color: 'from-orange-500 to-red-600',
      icon: '🥗'
    },
    {
      id: 5,
      code: 'AGRO401',
      title: 'Agriculture de Précision',
      level: 'M1',
      department: 'agro',
      semester: 'S1',
      credits: 8,
      hours: '70h (45h cours + 25h projet)',
      professor: 'Dr. Rim Guesmi',
      description: 'Technologies modernes d\'agriculture de précision utilisant l\'IA, IoT et big data pour optimiser la production agricole.',
      prerequisites: 'AGRO301 - Systèmes de Production',
      objectives: [
        'Maîtriser les technologies de précision',
        'Utiliser l\'IA en agriculture',
        'Optimiser l\'utilisation des ressources',
        'Développer des solutions innovantes'
      ],
      content: [
        'Capteurs et IoT agricole',
        'Intelligence artificielle',
        'Cartographie des rendements',
        'Gestion différenciée des parcelles',
        'Durabilité et économie'
      ],
      evaluation: 'Projet innovant (40%) + Présentation (20%) + Examen (40%)',
      color: 'from-green-500 to-emerald-600',
      icon: '🚜'
    },
    {
      id: 6,
      code: 'BIO501',
      title: 'Génomique Fonctionnelle',
      level: 'M2',
      department: 'biotech',
      semester: 'S1',
      credits: 8,
      hours: '80h (50h cours + 30h recherche)',
      professor: 'Pr. Karim Mansouri',
      description: 'Analyse génomique avancée et applications en amélioration des plantes et biotechnologies.',
      prerequisites: 'BIO401 - Génétique Moléculaire',
      objectives: [
        'Maîtriser les outils génomiques',
        'Analyser l\'expression génique',
        'Développer des approches CRISPR',
        'Conduire des projets de recherche'
      ],
      content: [
        'Séquençage nouvelle génération',
        'Analyse bioinformatique',
        'Édition génomique CRISPR',
        'Marqueurs moléculaires',
        'Applications biotechnologiques'
      ],
      evaluation: 'Mémoire de recherche (50%) + Soutenance (30%) + Contrôle (20%)',
      color: 'from-purple-500 to-violet-600',
      icon: '🔬'
    },
    {
      id: 7,
      code: 'LANG101',
      title: 'Anglais Scientifique et Technique',
      level: 'L1',
      department: 'common',
      semester: 'S2',
      credits: 3,
      hours: '30h (cours + pratique)',
      professor: 'Dr. Sarah Johnson',
      description: 'Anglais spécialisé pour les sciences agronomiques et biotechnologies, communication scientifique.',
      prerequisites: 'Niveau B1 en anglais général',
      objectives: [
        'Maîtriser le vocabulaire scientifique',
        'Communiquer en contexte professionnel',
        'Rédiger des rapports techniques',
        'Présenter des travaux scientifiques'
      ],
      content: [
        'Vocabulaire technique spécialisé',
        'Rédaction scientifique',
        'Présentation orale',
        'Compréhension de publications',
        'Communication professionnelle'
      ],
      evaluation: 'Oral (40%) + Écrit (40%) + Projet (20%)',
      color: 'from-blue-500 to-indigo-600',
      icon: '🌍'
    },
    {
      id: 8,
      code: 'ECON201',
      title: 'Économie Agricole',
      level: 'L2',
      department: 'agro',
      semester: 'S2',
      credits: 5,
      hours: '45h (30h cours + 15h études de cas)',
      professor: 'Pr. Ahmed Oueslati',
      description: 'Principes économiques appliqués au secteur agricole, marchés et politiques agricoles.',
      prerequisites: 'AGRO101 - Introduction aux Sciences Agronomiques',
      objectives: [
        'Comprendre l\'économie agricole',
        'Analyser les marchés agricoles',
        'Évaluer les politiques publiques',
        'Optimiser la gestion économique'
      ],
      content: [
        'Microéconomie agricole',
        'Marchés et prix agricoles',
        'Politiques agricoles',
        'Gestion d\'exploitation',
        'Commerce international'
      ],
      evaluation: 'Étude de cas (30%) + Contrôle (30%) + Examen (40%)',
      color: 'from-green-500 to-emerald-600',
      icon: '💰'
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment
    const matchesSemester = selectedSemester === 'all' || course.semester === selectedSemester
    const matchesSearch = searchTerm === '' || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.professor.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesLevel && matchesDepartment && matchesSemester && matchesSearch
  })

  const stats = [
    { label: 'Cours Disponibles', value: '45+', icon: '📚' },
    { label: 'Heures de Formation', value: '2,400h', icon: '⏰' },
    { label: 'Professeurs Experts', value: '25+', icon: '👨‍🏫' },
    { label: 'Crédits ECTS', value: '180+', icon: '🎓' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/80 via-purple-800/70 to-cyan-700/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
                <span className="bg-gradient-to-r from-cyan-300 to-amber-300 bg-clip-text text-transparent">
                  Catalogue des Cours
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-cyan-100 animate-fade-in-up delay-200">
                Formation d'Excellence & Programmes Innovants
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Explorez notre offre complète de cours dans les domaines de l'agriculture, 
                des biotechnologies et des sciences appliquées.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
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
      `}</style>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-full flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
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
                placeholder="Rechercher un cours, code ou professeur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-full focus:border-cyan-500 focus:outline-none transition-colors duration-300"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-6">
            {/* Level Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Niveau d'Études</h3>
              <div className="flex flex-wrap gap-3">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedLevel === level.id
                        ? 'bg-gradient-to-r from-cyan-600 to-amber-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level.name}
                    <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                      {level.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Department and Semester Filters */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Filière</h3>
                <div className="flex flex-wrap gap-2">
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDepartment(dept.id)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedDepartment === dept.id
                          ? `bg-gradient-to-r ${dept.color} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {dept.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Semestre</h3>
                <div className="flex flex-wrap gap-2">
                  {semesters.map((semester) => (
                    <button
                      key={semester.id}
                      onClick={() => setSelectedSemester(semester.id)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedSemester === semester.id
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {semester.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos <span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">Cours</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {filteredCourses.length} cours disponibles selon vos critères de recherche
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Course Header */}
                <div className={`p-6 bg-gradient-to-r ${course.color}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      <div className="text-3xl mb-2">{course.icon}</div>
                      <div className="text-sm font-medium opacity-90 mb-1">{course.code}</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                        {course.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm opacity-90">
                        <span>{course.level}</span>
                        <span>•</span>
                        <span>{course.semester}</span>
                        <span>•</span>
                        <span>{course.credits} ECTS</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Volume Horaire</div>
                      <div className="font-semibold text-gray-700">{course.hours}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Professeur</div>
                      <div className="font-semibold text-cyan-600">{course.professor}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {course.description}
                  </p>

                  {/* Prerequisites */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      Prérequis
                    </h4>
                    <p className="text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
                      {course.prerequisites}
                    </p>
                  </div>

                  {/* Objectives */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Objectifs Pédagogiques
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {course.objectives.map((objective, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="w-1 h-1 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {objective}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Overview */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Contenu du Cours
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.content.map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium hover:from-blue-100 hover:to-indigo-100 transition-colors duration-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Evaluation */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Modalités d'Évaluation
                    </h4>
                    <p className="text-sm text-purple-700 font-medium">{course.evaluation}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/academics/courses/${course.id}`}
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-amber-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      Détails Complets
                    </Link>
                    <button className="px-4 py-3 border-2 border-cyan-600 text-cyan-600 rounded-lg font-semibold hover:bg-cyan-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                      Syllabus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Aucun cours trouvé</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à Commencer Votre Parcours Académique ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Découvrez nos programmes complets et rejoignez une communauté d'excellence 
            académique dans les sciences appliquées et l'innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admissions" 
              className="bg-white text-cyan-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Candidater Maintenant
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Conseil Pédagogique
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}