'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AcademicsContent() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const programCategories = [
    { id: 'all', name: 'Tous les Programmes', count: 12 },
    { id: 'undergraduate', name: 'Licence', count: 6 },
    { id: 'graduate', name: 'Master', count: 4 },
    { id: 'doctorate', name: 'Doctorat', count: 2 }
  ]

  const programs = [
    {
      id: 1,
      category: 'undergraduate',
      title: 'Licence en Sciences Agronomiques',
      duration: '3 ans',
      credits: '180 ECTS',
      level: 'Licence',
      description: 'Formation complète en agriculture moderne, techniques de production végétale et animale, gestion durable des ressources.',
      specializations: ['Production Végétale', 'Élevage et Nutrition', 'Agriculture Biologique', 'Gestion des Sols'],
      admissionRequirements: 'Baccalauréat sciences expérimentales ou mathématiques',
      careerProspects: ['Ingénieur Agronome', 'Conseiller Agricole', 'Gestionnaire de Ferme', 'Technicien Spécialisé'],
      tuitionFee: '2,500 TND/an',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      category: 'undergraduate',
      title: 'Licence en Technologie Alimentaire',
      duration: '3 ans',
      credits: '180 ECTS',
      level: 'Licence',
      description: 'Expertise en transformation, conservation et qualité des produits alimentaires avec focus sur l\'innovation.',
      specializations: ['Transformation Alimentaire', 'Contrôle Qualité', 'Nutrition Appliquée', 'Biotechnologies'],
      admissionRequirements: 'Baccalauréat sciences expérimentales',
      careerProspects: ['Technologue Alimentaire', 'Responsable Qualité', 'Chef de Production', 'Nutritionniste'],
      tuitionFee: '2,800 TND/an',
      image: 'https://images.unsplash.com/photo-1556909086-f3d4b7999643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 3,
      category: 'undergraduate',
      title: 'Licence en Biotechnologies',
      duration: '3 ans',
      credits: '180 ECTS',
      level: 'Licence',
      description: 'Formation avancée en biotechnologies appliquées à l\'agriculture, l\'environnement et l\'industrie.',
      specializations: ['Biotechnologies Végétales', 'Microbiologie', 'Génétique Appliquée', 'Bioprocessus'],
      admissionRequirements: 'Baccalauréat sciences expérimentales avec mention',
      careerProspects: ['Biotechnologue', 'Chercheur', 'Ingénieur Bioprocessus', 'Consultant Technique'],
      tuitionFee: '3,000 TND/an',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 4,
      category: 'graduate',
      title: 'Master en Agriculture Durable',
      duration: '2 ans',
      credits: '120 ECTS',
      level: 'Master',
      description: 'Spécialisation en pratiques agricoles durables, gestion environnementale et innovation écologique.',
      specializations: ['Agroécologie', 'Agriculture de Précision', 'Gestion de l\'Eau', 'Énergies Renouvelables'],
      admissionRequirements: 'Licence en sciences agronomiques ou équivalent',
      careerProspects: ['Expert en Développement Durable', 'Consultant Environnemental', 'Chef de Projet', 'Formateur'],
      tuitionFee: '4,000 TND/an',
      image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 5,
      category: 'graduate',
      title: 'Master en Innovation Alimentaire',
      duration: '2 ans',
      credits: '120 ECTS',
      level: 'Master',
      description: 'Recherche et développement en technologies alimentaires, nouveaux produits et sécurité alimentaire.',
      specializations: ['R&D Alimentaire', 'Packaging Innovant', 'Aliments Fonctionnels', 'Traçabilité'],
      admissionRequirements: 'Licence en technologie alimentaire ou équivalent',
      careerProspects: ['Chef de Projet R&D', 'Responsable Innovation', 'Auditeur Qualité', 'Entrepreneur'],
      tuitionFee: '4,200 TND/an',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 6,
      category: 'doctorate',
      title: 'Doctorat en Sciences Agronomiques',
      duration: '3 ans',
      credits: 'Recherche',
      level: 'Doctorat',
      description: 'Recherche avancée en sciences agronomiques avec contribution originale à la connaissance scientifique.',
      specializations: ['Recherche Fondamentale', 'Innovation Technologique', 'Développement Durable', 'Biotechnologies'],
      admissionRequirements: 'Master en sciences agronomiques ou équivalent',
      careerProspects: ['Chercheur', 'Enseignant Universitaire', 'Expert International', 'Directeur R&D'],
      tuitionFee: '5,000 TND/an',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: 'from-indigo-500 to-purple-600'
    }
  ]

  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory)

  const stats = [
    { label: 'Programmes Actifs', value: '12+', icon: '📚' },
    { label: 'Étudiants Diplômés', value: '2,500+', icon: '🎓' },
    { label: 'Partenaires Industriels', value: '50+', icon: '🤝' },
    { label: 'Taux d\'Employabilité', value: '95%', icon: '💼' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-cyan-700/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
                <span className="bg-gradient-to-r from-cyan-300 to-amber-300 bg-clip-text text-transparent">
                  Programmes d'Études
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-cyan-100 animate-fade-in-up delay-200">
                Excellence Académique & Innovation
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Découvrez nos formations d'exception en agriculture, biotechnologies et sciences appliquées, 
                conçues pour former les leaders de demain.
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

      {/* Program Categories */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos <span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">Programmes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des formations d'excellence adaptées à tous les niveaux, de la licence au doctorat
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {programCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-600 to-amber-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredPrograms.map((program, index) => (
              <div
                key={program.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Program Image */}
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${program.image})` }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${program.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
                  
                  {/* Level Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800">
                      {program.level}
                    </span>
                  </div>

                  {/* Duration & Credits */}
                  <div className="absolute top-4 right-4 text-right">
                    <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800 mb-2">
                      {program.duration}
                    </div>
                    <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800">
                      {program.credits}
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                      {program.title}
                    </h3>
                  </div>
                </div>

                {/* Program Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Specializations */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                      Spécialisations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.specializations.map((spec, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-amber-50 text-cyan-700 rounded-full text-sm font-medium hover:from-cyan-100 hover:to-amber-100 transition-colors duration-300"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Frais de Scolarité</div>
                      <div className="font-semibold text-cyan-600">{program.tuitionFee}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Admission</div>
                      <div className="font-semibold text-amber-600 text-sm">{program.admissionRequirements}</div>
                    </div>
                  </div>

                  {/* Career Prospects */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                      Débouchés Professionnels
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {program.careerProspects.map((career, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                          {career}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/academics/programs/${program.id}`}
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-amber-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      En Savoir Plus
                    </Link>
                    <Link
                      href="/admissions"
                      className="px-4 py-3 border-2 border-cyan-600 text-cyan-600 rounded-lg font-semibold hover:bg-cyan-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      Candidater
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Processus d'<span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">Admission</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Un processus simple et transparent pour rejoindre l'excellence académique
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Candidature en Ligne',
                description: 'Complétez votre dossier de candidature sur notre plateforme sécurisée.',
                icon: '📝'
              },
              {
                step: '02',
                title: 'Évaluation du Dossier',
                description: 'Notre commission examine votre parcours académique et vos motivations.',
                icon: '🔍'
              },
              {
                step: '03',
                title: 'Entretien & Tests',
                description: 'Entretien personnalisé et tests d\'aptitude selon le programme choisi.',
                icon: '💬'
              },
              {
                step: '04',
                title: 'Admission & Inscription',
                description: 'Réception de votre lettre d\'admission et finalisation de l\'inscription.',
                icon: '🎓'
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500 to-amber-500 z-0"></div>
                )}
                
                <div className="relative z-10 text-center group-hover:transform group-hover:scale-105 transition-all duration-300">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-full flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="text-6xl font-bold text-cyan-400 mb-4 opacity-50">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/admissions"
              className="inline-flex items-center bg-gradient-to-r from-cyan-600 to-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Commencer ma Candidature
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Témoignages de <span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">Réussite</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les parcours inspirants de nos diplômés
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Amira Ben Salem',
                program: 'Master en Agriculture Durable',
                year: '2023',
                position: 'Directrice Technique, AgroTech Tunisia',
                testimonial: 'Les formations à ISEAV-ARU m\'ont donné les compétences nécessaires pour innover dans l\'agriculture durable. L\'approche pratique et les partenariats industriels ont été déterminants.',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b9e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
              },
              {
                name: 'Mohamed Trabelsi',
                program: 'Licence en Biotechnologies',
                year: '2022',
                position: 'Chercheur, Institut Pasteur de Tunis',
                testimonial: 'L\'excellence académique et l\'encadrement personnalisé m\'ont permis de poursuivre en recherche. Les laboratoires sont à la pointe de la technologie.',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
              },
              {
                name: 'Salma Khadhraoui',
                program: 'Licence en Technologie Alimentaire',
                year: '2021',
                position: 'Fondatrice, NutriNova Startup',
                testimonial: 'ISEAV-ARU m\'a donné l\'esprit entrepreneurial et les connaissances techniques pour créer ma startup dans l\'innovation alimentaire.',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.program} - {testimonial.year}</p>
                    <p className="text-sm font-medium text-amber-600">{testimonial.position}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed mb-4">
                  "{testimonial.testimonial}"
                </blockquote>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à Rejoindre l'Excellence ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Transformez votre passion en expertise avec nos programmes d'études innovants. 
            Votre avenir commence aujourd'hui à ISEAV-ARU.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/admissions" 
              className="bg-white text-cyan-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Postuler Maintenant
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}