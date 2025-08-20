'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FacultiesContent() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const departments = [
    { id: 'all', name: 'Toutes les Facultés', count: 4 },
    { id: 'agriculture', name: 'Sciences Agronomiques', count: 8 },
    { id: 'biotechnology', name: 'Biotechnologies', count: 6 },
    { id: 'food', name: 'Technologie Alimentaire', count: 5 },
    { id: 'research', name: 'Recherche & Innovation', count: 4 }
  ]

  const faculties = [
    {
      id: 1,
      department: 'agriculture',
      name: 'Dr. Amina Benali',
      title: 'Professeure en Agronomie',
      specialization: 'Agriculture Durable & Gestion des Ressources',
      education: 'PhD en Sciences Agronomiques, Université de Montpellier',
      experience: '15 ans d\'expérience',
      research: ['Agriculture de Précision', 'Irrigation Intelligente', 'Sols Durables', 'Cultures Biologiques'],
      publications: '45+ publications internationales',
      email: 'a.benali@iseav-aru.edu.tn',
      office: 'Bureau 301, Bâtiment Principal',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-green-500 to-emerald-600',
      achievements: ['Prix Excellence Recherche 2023', 'Membre Académie Tunisienne']
    },
    {
      id: 2,
      department: 'agriculture',
      name: 'Pr. Mohamed Trabelsi',
      title: 'Directeur du Département Agronomie',
      specialization: 'Phytopathologie & Protection des Cultures',
      education: 'Doctorat d\'État, INAT Tunis',
      experience: '20 ans d\'expérience',
      research: ['Maladies des Plantes', 'Biocontrôle', 'Résistance Variétale', 'IPM Strategies'],
      publications: '60+ articles scientifiques',
      email: 'm.trabelsi@iseav-aru.edu.tn',
      office: 'Bureau 205, Bâtiment Principal',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-blue-500 to-indigo-600',
      achievements: ['Directeur de 12 thèses', 'Expert FAO']
    },
    {
      id: 3,
      department: 'biotechnology',
      name: 'Dr. Salma Khadhraoui',
      title: 'Professeure en Biotechnologies',
      specialization: 'Biotechnologies Végétales & Génomique',
      education: 'PhD Biotechnologie, Université Paris-Saclay',
      experience: '12 ans d\'expérience',
      research: ['Génomique Fonctionnelle', 'Marqueurs Moléculaires', 'Amélioration Génétique', 'CRISPR Applications'],
      publications: '38+ publications peer-reviewed',
      email: 's.khadhraoui@iseav-aru.edu.tn',
      office: 'Laboratoire Biotech, Niveau 2',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-purple-500 to-pink-600',
      achievements: ['Bourse Marie Curie', 'Startup Biotech fondée']
    },
    {
      id: 4,
      department: 'biotechnology',
      name: 'Pr. Karim Mansouri',
      title: 'Professeur en Microbiologie',
      specialization: 'Microbiologie Appliquée & Fermentation',
      education: 'Doctorat Microbiologie, Université Lyon 1',
      experience: '18 ans d\'expérience',
      research: ['Fermentation Industrielle', 'Probiotiques', 'Bioremediation', 'Enzymes Microbiennes'],
      publications: '52+ articles internationaux',
      email: 'k.mansouri@iseav-aru.edu.tn',
      office: 'Laboratoire Microbiologie',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-cyan-500 to-blue-600',
      achievements: ['Brevet International', 'Collaboration Danone']
    },
    {
      id: 5,
      department: 'food',
      name: 'Dr. Fatma Zahra Ben Ahmed',
      title: 'Professeure en Technologie Alimentaire',
      specialization: 'Innovation Alimentaire & Emballage',
      education: 'PhD Food Science, AgroParisTech',
      experience: '14 ans d\'expérience',
      research: ['Emballage Intelligent', 'Aliments Fonctionnels', 'Conservation Naturelle', 'Nanotechnologies'],
      publications: '41+ publications scientifiques',
      email: 'f.benahmed@iseav-aru.edu.tn',
      office: 'Laboratoire Alimentaire, Aile Sud',
      image: 'https://images.unsplash.com/photo-1594736797933-d0dadb11fcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-orange-500 to-red-600',
      achievements: ['Prix Innovation Alimentaire', 'Partenariat Nestlé']
    },
    {
      id: 6,
      department: 'food',
      name: 'Pr. Noureddine Boudhrioua',
      title: 'Directeur Laboratoire Qualité',
      specialization: 'Contrôle Qualité & Sécurité Alimentaire',
      education: 'Doctorat d\'État en Sciences Alimentaires',
      experience: '22 ans d\'expérience',
      research: ['HACCP', 'Analyse Sensorielle', 'Microbiologie Alimentaire', 'Traçabilité'],
      publications: '55+ articles peer-reviewed',
      email: 'n.boudhrioua@iseav-aru.edu.tn',
      office: 'Laboratoire Qualité, RDC',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-amber-500 to-orange-600',
      achievements: ['Consultant ISO 22000', 'Expert ANSES']
    },
    {
      id: 7,
      department: 'research',
      name: 'Dr. Rim Guesmi',
      title: 'Directrice de Recherche',
      specialization: 'Intelligence Artificielle & Agriculture',
      education: 'PhD Computer Science, INRIA France',
      experience: '10 ans d\'expérience',
      research: ['IA pour Agriculture', 'Machine Learning', 'IoT Agricole', 'Big Data'],
      publications: '35+ publications internationales',
      email: 'r.guesmi@iseav-aru.edu.tn',
      office: 'Centre Innovation, Étage 3',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-indigo-500 to-purple-600',
      achievements: ['Projet H2020', 'Startup AgriTech']
    },
    {
      id: 8,
      department: 'research',
      name: 'Pr. Ahmed Oueslati',
      title: 'Vice-Recteur Recherche',
      specialization: 'Économie Agricole & Développement',
      education: 'PhD Économie Agricole, Université de Wageningen',
      experience: '25 ans d\'expérience',
      research: ['Économie Rurale', 'Chaînes de Valeur', 'Politiques Agricoles', 'Développement Durable'],
      publications: '70+ publications & rapports',
      email: 'a.oueslati@iseav-aru.edu.tn',
      office: 'Bureau Rectorat, 4ème étage',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-teal-500 to-green-600',
      achievements: ['Conseiller Ministère', 'Expert Banque Mondiale']
    }
  ]

  const filteredFaculties = selectedDepartment === 'all' 
    ? faculties 
    : faculties.filter(faculty => faculty.department === selectedDepartment)

  const stats = [
    { label: 'Professeurs Titulaires', value: '25+', icon: '👨‍🏫' },
    { label: 'Docteurs & PhD', value: '40+', icon: '🎓' },
    { label: 'Publications Annuelles', value: '150+', icon: '📚' },
    { label: 'Projets de Recherche', value: '30+', icon: '🔬' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-800/70 to-cyan-700/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
                <span className="bg-gradient-to-r from-cyan-300 to-amber-300 bg-clip-text text-transparent">
                  Nos Facultés
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-cyan-100 animate-fade-in-up delay-200">
                Excellence Académique & Expertise de Pointe
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Découvrez notre corps professoral d'élite, composé d'experts reconnus internationalement 
                dans leurs domaines de spécialisation.
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

      {/* Faculty Departments */}
      <section id="faculties" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Notre <span className="bg-gradient-to-r from-cyan-600 to-amber-500 bg-clip-text text-transparent">Corps Professoral</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des experts reconnus internationalement, passionnés par l'enseignement et la recherche d'excellence
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((department) => (
              <button
                key={department.id}
                onClick={() => setSelectedDepartment(department.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedDepartment === department.id
                    ? 'bg-gradient-to-r from-cyan-600 to-amber-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {department.name}
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                  {department.count}
                </span>
              </button>
            ))}
          </div>

          {/* Faculty Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredFaculties.map((faculty, index) => (
              <div
                key={faculty.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Faculty Header */}
                <div className="relative h-32 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${faculty.color} opacity-90`} />
                  
                  <div className="absolute inset-0 flex items-center justify-between p-6">
                    {/* Faculty Photo */}
                    <div className="flex items-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src={faculty.image} 
                          alt={faculty.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 text-white">
                        <h3 className="text-xl font-bold group-hover:scale-105 transition-transform duration-300">
                          {faculty.name}
                        </h3>
                        <p className="text-white/90 font-medium">{faculty.title}</p>
                      </div>
                    </div>

                    {/* Contact Icon */}
                    <div className="text-white/80 group-hover:text-white transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Faculty Content */}
                <div className="p-6">
                  {/* Specialization */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
                      Spécialisation
                    </h4>
                    <p className="text-gray-700 font-medium">{faculty.specialization}</p>
                  </div>

                  {/* Education & Experience */}
                  <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Formation</div>
                      <div className="font-medium text-gray-700 text-sm">{faculty.education}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Expérience</div>
                      <div className="font-semibold text-cyan-600">{faculty.experience}</div>
                    </div>
                  </div>

                  {/* Research Areas */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                      Domaines de Recherche
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {faculty.research.map((area, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-amber-50 text-cyan-700 rounded-full text-sm font-medium hover:from-cyan-100 hover:to-amber-100 transition-colors duration-300"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Distinctions
                    </h4>
                    <div className="space-y-2">
                      {faculty.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Publications & Contact */}
                  <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Publications</div>
                      <div className="font-semibold text-purple-600">{faculty.publications}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Bureau</div>
                      <div className="font-medium text-gray-700 text-sm">{faculty.office}</div>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${faculty.email}`}
                      className="flex-1 bg-gradient-to-r from-cyan-600 to-amber-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contacter
                    </a>
                    <Link
                      href={`/faculties/profile/${faculty.id}`}
                      className="px-4 py-3 border-2 border-cyan-600 text-cyan-600 rounded-lg font-semibold hover:bg-cyan-600 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      Profil
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Centers */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Centres de <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">Recherche</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Des infrastructures de recherche de pointe pour l'innovation et l'excellence scientifique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Centre AgriTech',
                description: 'Technologies agricoles innovantes et agriculture de précision',
                icon: '🌱',
                projects: '12 projets actifs'
              },
              {
                name: 'Laboratoire Biotech',
                description: 'Biotechnologies végétales et amélioration génétique',
                icon: '🧬',
                projects: '8 projets en cours'
              },
              {
                name: 'Centre Alimentaire',
                description: 'Innovation alimentaire et développement produits',
                icon: '🥗',
                projects: '15 collaborations'
              },
              {
                name: 'Hub Innovation',
                description: 'Intelligence artificielle et technologies émergentes',
                icon: '🚀',
                projects: '6 startups incubées'
              }
            ].map((center, index) => (
              <div 
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center group-hover:transform group-hover:scale-105 transition-all duration-300">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-amber-500 rounded-full flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-300">
                    {center.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {center.name}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {center.description}
                  </p>
                  <div className="text-sm text-cyan-400 font-medium">
                    {center.projects}
                  </div>
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
            Rejoignez Notre Communauté Académique
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Découvrez les opportunités de collaboration, de recherche et d'innovation 
            avec notre corps professoral d'exception.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/research" 
              className="bg-white text-cyan-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Explorer la Recherche
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