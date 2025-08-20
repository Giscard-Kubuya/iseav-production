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
      name: 'Prof. Dr. Rachid Ben Mansour',
      position: 'Recteur & Fondateur',
      education: 'PhD Agriculture, Université de Californie Davis',
      experience: '25 ans en enseignement supérieur agricole',
      expertise: ['Gestion Universitaire', 'Politique Agricole', 'Innovation Pédagogique'],
      achievements: [
        'Création ISEAV-ARU en 2015',
        'Prix Excellence Éducation 2022',
        'Membre Conseil National Agriculture',
        'Auteur de 3 ouvrages académiques'
      ],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Dr. Leila Gharbi',
      position: 'Vice-Rectrice Académique',
      education: 'PhD Biotechnologies, Institut Pasteur Paris',
      experience: '18 ans en recherche et enseignement',
      expertise: ['Programmes Académiques', 'Assurance Qualité', 'Accréditation Internationale'],
      achievements: [
        'Accréditation EUR-ACE obtenue',
        'Partenariats 15 universités européennes',
        'Programme Erasmus+ coordinateur',
        '50+ publications scientifiques'
      ],
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b9e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-purple-500 to-violet-600'
    },
    {
      name: 'Prof. Mahmoud Sellami',
      position: 'Doyen Faculté Sciences Appliquées',
      education: 'Doctorat d\'État, INAT Tunis',
      experience: '22 ans en recherche agronomique',
      expertise: ['Recherche Scientifique', 'Innovation Technologique', 'Transfert de Technologie'],
      achievements: [
        'Directeur 25+ projets recherche',
        '€2M financements obtenus',
        '8 brevets déposés',
        'Consultant FAO'
      ],
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Dr. Sonia Bouaziz',
      position: 'Directrice Relations Internationales',
      education: 'PhD Management, HEC Paris',
      experience: '15 ans en coopération internationale',
      expertise: ['Partenariats Internationaux', 'Mobilité Étudiante', 'Projets Européens'],
      achievements: [
        'Accords 30+ universités mondiales',
        'Programme double-diplôme 5 pays',
        'Coordinatrice Erasmus Mundus',
        'Bourse Excellence 200+ étudiants'
      ],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      color: 'from-teal-500 to-cyan-600'
    }
  ]

  const milestones = [
    {
      year: '2015',
      title: 'Fondation ISEAV-ARU',
      description: 'Création de l\'institut avec vision innovation et excellence académique.',
      icon: '🏛️',
      details: [
        'Première promotion 50 étudiants',
        'Campus moderne 5 hectares',
        '3 programmes de formation',
        'Équipe fondatrice 15 experts'
      ]
    },
    {
      year: '2017',
      title: 'Accréditation Nationale',
      description: 'Reconnaissance officielle et accréditation tous programmes par l\'État.',
      icon: '🏆',
      details: [
        'Licence en Sciences Agronomiques',
        'Master en Agriculture Durable',
        'Certificat qualité ISO 9001',
        'Partenariat Ministère Agriculture'
      ]
    },
    {
      year: '2019',
      title: 'Expansion Internationale',
      description: 'Premiers partenariats européens et programmes d\'échange.',
      icon: '🌍',
      details: [
        'Accord Erasmus+ approuvé',
        'Partenariat 8 universités EU',
        'Double-diplôme France/Tunisie',
        'Mobilité 50+ étudiants/an'
      ]
    },
    {
      year: '2021',
      title: 'Innovation Technologique',
      description: 'Lancement centres recherche et laboratoires de pointe.',
      icon: '🔬',
      details: [
        'Centre AgriTech Innovation',
        'Laboratoire CRISPR-Cas9',
        'Plateforme IoT Agriculture',
        'Incubateur startup étudiant'
      ]
    },
    {
      year: '2023',
      title: 'Excellence Reconnue',
      description: 'Prix national excellence et classement top 3 instituts agricoles.',
      icon: '⭐',
      details: [
        'Prix Innovation Pédagogique',
        'Classement QS Emerging 2023',
        'Accréditation EUR-ACE',
        '95% taux employabilité'
      ]
    },
    {
      year: '2024',
      title: 'Vision 2030',
      description: 'Lancement plan stratégique développement et expansion régionale.',
      icon: '🚀',
      details: [
        'Campus 2ème site Sfax',
        'Programmes PhD lancés',
        'Partenariat Silicon Valley',
        'Objectif 2000 étudiants'
      ]
    }
  ]

  const facilities = [
    {
      name: 'Campus Principal Ariana',
      area: '12 hectares',
      description: 'Campus moderne avec infrastructures pédagogiques et recherche de pointe.',
      features: [
        'Amphithéâtres équipés technologie',
        'Laboratoires haute technologie',
        'Bibliothèque universitaire',
        'Espaces co-working étudiants',
        'Résidences universitaires',
        'Complexe sportif complet'
      ],
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: '🏫'
    },
    {
      name: 'Ferme Expérimentale',
      area: '25 hectares',
      description: 'Station de recherche et formation pratique avec cultures diversifiées.',
      features: [
        'Serres automatisées',
        'Parcelles expérimentales',
        'Élevage pilote',
        'Station météorologique',
        'Laboratoire analyse sols',
        'Équipements agriculture précision'
      ],
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: '🚜'
    },
    {
      name: 'Centre Innovation',
      area: '2,000 m²',
      description: 'Hub technologique dédié recherche, innovation et entrepreneuriat.',
      features: [
        'Laboratoires recherche',
        'FabLab et prototypage',
        'Espaces incubation',
        'Salles conférences',
        'Centre de données',
        'Studios multimédia'
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: '💡'
    }
  ]

  const stats = [
    { label: 'Années d\'Excellence', value: '9', icon: '🏆', description: 'Depuis 2015' },
    { label: 'Étudiants Diplômés', value: '2,500+', icon: '🎓', description: 'Alumni network' },
    { label: 'Partenaires Internationaux', value: '35+', icon: '🌍', description: 'Collaborations mondiales' },
    { label: 'Taux d\'Employabilité', value: '95%', icon: '💼', description: 'Insertion professionnelle' }
  ]

  const values = [
    {
      title: 'Excellence Académique',
      description: 'Pursuit de la plus haute qualité en enseignement, recherche et innovation.',
      icon: '🎯',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Innovation Continue',
      description: 'Adoption des dernières technologies et méthodes pédagogiques innovantes.',
      icon: '💡',
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Durabilité Environnementale',
      description: 'Engagement pour un développement agricole respectueux de l\'environnement.',
      icon: '🌱',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Ouverture Internationale',
      description: 'Vision globale avec partenariats stratégiques et mobilité étudiante.',
      icon: '🌍',
      color: 'from-teal-500 to-cyan-600'
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-indigo-800/75 to-teal-700/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up">
                <span className="bg-gradient-to-r from-cyan-300 via-white to-teal-300 bg-clip-text text-transparent">
                  À Propos
                </span>
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-cyan-100 animate-fade-in-up delay-200">
                Excellence, Innovation & Leadership
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up delay-400">
                Découvrez l'histoire, la mission et les valeurs qui font d'ISEAV-ARU 
                un leader de l'enseignement supérieur en sciences appliquées.
              </p>
            </div>
          </div>
        </div>

        {/* Floating About Icons */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-bounce delay-1000 flex items-center justify-center text-2xl">🏛️</div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-teal-400/20 rounded-full animate-bounce delay-1500 flex items-center justify-center text-xl">🏆</div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-400/20 rounded-full animate-bounce delay-2000 flex items-center justify-center text-lg">⭐</div>

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
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500 shadow-lg group-hover:shadow-2xl">
                    {stat.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-5xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-gray-700 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Notre <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Mission</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>ISEAV-ARU</strong> a pour mission de former les leaders de demain dans les domaines 
                  de l'agriculture durable, des biotechnologies et des sciences appliquées, en combinant 
                  excellence académique et innovation technologique.
                </p>
                <p>
                  Nous nous engageons à développer les compétences techniques et humaines nécessaires 
                  pour relever les défis alimentaires et environnementaux du 21ème siècle, tout en 
                  promouvant une approche durable et responsable de l'agriculture.
                </p>
                <p>
                  Notre approche pédagogique innovante associe formation théorique rigoureuse, 
                  expérience pratique en laboratoire et sur le terrain, et ouverture internationale 
                  pour préparer nos diplômés aux réalités du monde professionnel.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">🎯</span>
                  Vision 2030
                </h3>
                <p className="text-blue-700 leading-relaxed">
                  Devenir la référence régionale en enseignement supérieur agricole et sciences appliquées, 
                  reconnue pour l'excellence de ses programmes, l'innovation de sa recherche et l'impact 
                  de ses diplômés sur le développement durable.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-2xl border border-teal-100">
                <h3 className="text-2xl font-bold text-teal-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white mr-3">🌟</span>
                  Objectifs Stratégiques
                </h3>
                <ul className="text-teal-700 space-y-2">
                  <li>• Former 2000+ étudiants d'ici 2030</li>
                  <li>• Développer 50+ partenariats internationaux</li>
                  <li>• Lancer 10+ programmes innovants</li>
                  <li>• Créer 3 centres d'excellence régionaux</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nos <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes fondamentaux qui guident notre action et notre développement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-6 bg-gradient-to-r ${value.color} text-white`}>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                </div>

                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Notre <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Histoire</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Parcours d'excellence depuis notre création en 2015
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-teal-500"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-blue-500 z-10 flex items-center justify-center">
                    <div className="text-lg">{milestone.icon}</div>
                  </div>

                  {/* Milestone Card */}
                  <div className={`group w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-16 ml-20 md:ml-0' : 'md:ml-auto md:pl-16 ml-20 md:ml-0'
                  }`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                      {/* Year Badge */}
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4">
                        <div className="text-3xl font-bold">{milestone.year}</div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {milestone.description}
                        </p>

                        <div className="space-y-2">
                          {milestone.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Équipe <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Dirigeante</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leadership expérimenté et vision partagée pour l'excellence académique
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center p-8">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-blue-400 transition-colors duration-300">
                      <img 
                        src={leader.image} 
                        alt={leader.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {leader.name}
                    </h3>
                    <p className="text-lg font-semibold text-blue-600 mb-1">{leader.position}</p>
                    <p className="text-sm text-gray-600 mb-2">{leader.education}</p>
                    <p className="text-sm text-gray-500">{leader.experience}</p>
                  </div>
                </div>

                <div className="px-8 pb-8">
                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Domaines d'Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                      Réalisations Clés
                    </h4>
                    <div className="space-y-2">
                      {leader.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="w-1 h-1 bg-teal-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus & Facilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Campus & <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Installations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Infrastructures modernes conçues pour l'excellence académique et la recherche
            </p>
          </div>

          <div className="space-y-16">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className={`group ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex gap-12 items-center`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Facility Image */}
                <div className="lg:w-1/2">
                  <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transform group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${facility.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-teal-600/70 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Facility Icon */}
                    <div className="absolute top-6 left-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl">
                        {facility.icon}
                      </div>
                    </div>

                    {/* Area Badge */}
                    <div className="absolute bottom-6 right-6">
                      <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full font-bold text-gray-800">
                        {facility.area}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Facility Content */}
                <div className="lg:w-1/2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {facility.name}
                      </h3>
                      <p className="text-xl text-gray-700 leading-relaxed">{facility.description}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800 mb-4 flex items-center text-lg">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                        Équipements & Services
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {facility.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-teal-400 rounded-full mr-4"></span>
                            <span className="text-lg">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Rejoignez Notre Vision
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed">
            Intégrez une institution d'excellence qui forme les leaders de demain 
            dans l'agriculture durable et les sciences appliquées.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/admissions" 
              className="bg-white text-blue-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Candidater Maintenant
            </Link>
            <Link 
              href="/contact" 
              className="border-3 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}